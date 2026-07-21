import test from 'node:test';
import assert from 'node:assert/strict';
import {CIRCLE_SEQUENCE_ACTIONS,createCircleSequence,sampleCircleSequence} from '../src/encounters/circle-sequence.mjs';

test('all four direct circle routes share one equal physical rhythm',()=>{
  assert.deepEqual(CIRCLE_SEQUENCE_ACTIONS,['intervene','join','distract','call']);
  const timelines=CIRCLE_SEQUENCE_ACTIONS.map(action=>createCircleSequence(action,1000));
  assert.deepEqual(new Set(timelines.map(timeline=>timeline.durationMs)).size,1);
  assert.deepEqual(new Set(timelines.map(timeline=>timeline.inputLockMs)).size,1);
  timelines.forEach(timeline=>assert.deepEqual(timeline.beats,['attention','cause','response','release','trace']));
});

test('circle sequence progresses cause before response and returns control before its trace settles',()=>{
  const timeline=createCircleSequence('intervene',1000);
  const cause=sampleCircleSequence(timeline,1900),response=sampleCircleSequence(timeline,2700),trace=sampleCircleSequence(timeline,4300),complete=sampleCircleSequence(timeline,4600);
  assert.ok(cause.cause>0);
  assert.ok(response.response>cause.response);
  assert.equal(trace.inputLocked,false);
  assert.ok(trace.trace>0);
  assert.equal(complete.complete,true);
});

test('leave is intentionally physical departure rather than an animated choice sequence',()=>{
  assert.throws(()=>createCircleSequence('leave',1000));
});

test('circle sequence validates timing inputs',()=>{
  assert.throws(()=>createCircleSequence('call',Number.NaN));
  assert.throws(()=>createCircleSequence('call',0,{timeScale:0}));
});
