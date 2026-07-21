import test from 'node:test';
import assert from 'node:assert/strict';
import {createQuietShelterSequence,sampleQuietShelterSequence} from '../src/encounters/quiet-shelter-sequence.mjs';

test('all four direct shelter actions receive the same five-beat physical sequence',()=>{
  for(const action of ['support','reach','water','call']){
    const timeline=createQuietShelterSequence(action,1000),start=sampleQuietShelterSequence(timeline,1000),end=sampleQuietShelterSequence(timeline,4400);
    assert.equal(timeline.canonicalDurationMs,3400);
    assert.deepEqual(timeline.beats,['attention','cause','response','release','trace']);
    assert.equal(start.inputLocked,true);
    assert.equal(end.complete,true);
  }
});

test('control returns before the quiet trace finishes',()=>{
  const timeline=createQuietShelterSequence('support',0),frame=sampleQuietShelterSequence(timeline,timeline.inputLockMs+1);
  assert.equal(frame.inputLocked,false);
  assert.equal(frame.complete,false);
  assert.ok(frame.trace<1);
});

test('sequence beats overlap into one continuous physical response',()=>{
  const timeline=createQuietShelterSequence('water',0),frame=sampleQuietShelterSequence(timeline,timeline.durationMs*.6);
  assert.ok(frame.cause>.9);
  assert.ok(frame.response>0);
  assert.ok(frame.release>0);
});

test('leave remains a physical departure instead of an artificial timeline',()=>{
  assert.throws(()=>createQuietShelterSequence('leave',0),/Unsupported/);
});
