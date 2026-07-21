import test from 'node:test';
import assert from 'node:assert/strict';
import {ThresholdEncounter} from '../src/encounters/threshold-encounter.mjs';

test('knock and listen can repeat without resolving the threshold', () => {
  const encounter=new ThresholdEncounter();
  encounter.choose('knock',1);encounter.choose('listen',2);encounter.choose('knock',3);
  assert.deepEqual(encounter.snapshot().counts,{knock:2,listen:1,call:0,leave:0});
  assert.equal(encounter.snapshot().resolved,false);
});

test('call resolves once and rejects later actions', () => {
  const encounter=new ThresholdEncounter();
  assert.equal(encounter.choose('call',1).accepted,true);
  assert.equal(encounter.choose('knock',2).accepted,false);
  assert.equal(encounter.snapshot().resolvedAction,'call');
});

test('keep walking stays pending until physical departure', () => {
  const encounter=new ThresholdEncounter();
  encounter.choose('leave',1);assert.equal(encounter.snapshot().pendingDeparture,true);assert.equal(encounter.snapshot().resolved,false);
  encounter.depart(2);assert.equal(encounter.snapshot().resolvedAction,'leave');assert.equal(encounter.snapshot().pendingDeparture,false);
});
