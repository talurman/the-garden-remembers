import test from 'node:test';
import assert from 'node:assert/strict';
import {THRESHOLD_MEMORY_ACTIONS,thresholdMemoryProfile} from '../src/encounters/threshold-memory.mjs';

test('all threshold outcomes propagate through the same five connected surfaces',()=>{
  const profiles=THRESHOLD_MEMORY_ACTIONS.map(action=>thresholdMemoryProfile(action));
  profiles.forEach(profile=>assert.deepEqual(profile.propagation.surfaces,['wall','paper','water','planting','canopy']));
  assert.equal(new Set(profiles.map(profile=>profile.propagation.surfaces.length)).size,1);
  assert.equal(new Set(profiles.map(profile=>profile.palette.length)).size,1);
});

test('sequence modifiers preserve repeated and layered investigation',()=>{
  assert.equal(thresholdMemoryProfile('leave',[{action:'knock'},{action:'knock'}]).modifier,'repeated');
  assert.equal(thresholdMemoryProfile('call',[{action:'listen'},{action:'knock'}]).modifier,'layered');
  assert.equal(thresholdMemoryProfile('listen',[{action:'listen'}]).modifier,'single');
});

test('threshold profiles contain no moral result language',()=>{
  const prohibited=/correct|wrong|good|bad|success|failure|brave|selfish/i;
  THRESHOLD_MEMORY_ACTIONS.forEach(action=>assert.equal(prohibited.test(JSON.stringify(thresholdMemoryProfile(action))),false));
});
