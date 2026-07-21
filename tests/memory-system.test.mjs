import test from 'node:test';
import assert from 'node:assert/strict';
import {ObservationLog, MemoryState, MemoryDirector, ReflectionComposer} from '../src/memory/index.mjs';

test('observations are append-only factual records', () => {
  const log = new ObservationLog({clock: () => 1000});
  const event = log.append({type:'movement.approached', locationId:'lost-place', position:{x:1,z:2}});
  assert.equal(event.id, 'obs-000001');
  assert.equal(event.occurredAt, 1000);
  assert.equal(Object.isFrozen(event.metadata), true);
  assert.throws(() => log.append({type:'movement.still', metadata:{personality:'patient'}}), /Inference-like/);
  assert.throws(() => log.append({type:'player.is_anxious'}), /Unknown factual/);
});

test('world changes cannot exist without recorded triggers', () => {
  const log = new ObservationLog();
  const state = new MemoryState(log);
  assert.throws(() => state.rememberWorldChange({id:'x',layer:'delayed',targetId:'pond',kind:'color',triggerEventIds:['missing']}), /Unknown trigger/);
  const contact = log.append({type:'environment.contact', locationId:'pond'});
  const change = state.rememberWorldChange({id:'x',layer:'immediate',targetId:'pond',kind:'pigment',triggerEventIds:[contact.id]});
  assert.deepEqual(change.triggerEventIds, [contact.id]);
});

test('director produces immediate, delayed, return and convergent memories', () => {
  let now = 0;
  const log = new ObservationLog({clock: () => now});
  const state = new MemoryState(log);
  const director = new MemoryDirector({observationLog:log, memoryState:state});
  const record = input => { const event = log.append({...input, occurredAt:now}); director.observe(event); return event; };

  record({type:'environment.contact', locationId:'path'});
  now = 200;
  assert.equal(director.tick(now)[0].layer, 'immediate');
  record({type:'location.entered', locationId:'a'});
  record({type:'location.exited', locationId:'a'});
  record({type:'location.entered', locationId:'b'});
  record({type:'location.entered', locationId:'c'});
  record({type:'location.entered', locationId:'a'});
  const layers = director.pending().map(item => item.layer);
  assert.ok(layers.includes('delayed'));
  assert.ok(layers.includes('return'));
  assert.ok(layers.includes('convergent'));
});

test('reflection is deterministic, factual and traceable', () => {
  const log = new ObservationLog();
  log.append({type:'location.entered', locationId:'הבריכה', occurredAt:0});
  log.append({type:'location.exited', locationId:'הבריכה', occurredAt:1000});
  log.append({type:'location.entered', locationId:'הבריכה', occurredAt:2000});
  log.append({type:'movement.still', locationId:'הבריכה', occurredAt:2200, durationMs:4200});
  const composer = new ReflectionComposer();
  const first = composer.compose(log);
  const second = composer.compose(log);
  assert.deepEqual(first, second);
  assert.ok(first.every(line => line.eventIds.length));
  assert.equal(first.some(line => /אישיות|אמפת|חרד|ציון/.test(line.text)), false);
});

test('memory state and delayed queue survive serialization', () => {
  const log = new ObservationLog();
  const state = new MemoryState(log);
  const director = new MemoryDirector({observationLog:log, memoryState:state});
  const entered = log.append({type:'location.entered', locationId:'threshold', occurredAt:10});
  director.observe(entered);
  const exited = log.append({type:'location.exited', locationId:'threshold', occurredAt:20});
  director.observe(exited);
  const restoredState = MemoryState.fromJSON(log, state.toJSON());
  const restoredDirector = new MemoryDirector({observationLog:log, memoryState:restoredState, snapshot:director.toJSON()});
  assert.equal(restoredState.location('threshold').visits, 1);
  assert.equal(restoredDirector.pending()[0].triggerEventIds[0], exited.id);
});

test('memory changes preserve encounter and profile identity', () => {
  let now = 0;
  const log = new ObservationLog({clock: () => now});
  const state = new MemoryState(log);
  const director = new MemoryDirector({observationLog:log, memoryState:state, delays:{immediate:10}});
  const event = log.append({
    type:'environment.contact',
    locationId:'lost-place',
    metadata:{encounterId:'wallet',profileId:'returned'}
  });
  director.observe(event);
  const pending = director.pending()[0];
  assert.equal(pending.encounterId, 'wallet');
  assert.equal(pending.profileId, 'returned');
  now = 10;
  const change = director.tick(now)[0];
  assert.equal(change.encounterId, 'wallet');
  assert.equal(change.profileId, 'returned');
});

test('paper convergence is scheduled once when later chapters add more locations', () => {
  const log = new ObservationLog();
  const state = new MemoryState(log);
  const director = new MemoryDirector({observationLog:log,memoryState:state,delays:{convergent:0}});
  for (const locationId of ['entry','wallet-place','pavilion','threshold-passage']) {
    director.observe(log.append({type:'location.entered',locationId}));
  }
  const changes = director.tick(Date.now() + 1);
  assert.equal(changes.filter(change => change.kind === 'paper_convergence').length, 1);
});
