import test from 'node:test';
import assert from 'node:assert/strict';
import {CIRCLE_MEMORY_ACTIONS,circleMemoryProfile,createCircleMemory,createCircleReturn,sampleCircleMemory,sampleCircleReturn} from '../src/encounters/circle-memory.mjs';

test('all five circle routes propagate across the same seven connected surfaces',()=>{
  assert.deepEqual(CIRCLE_MEMORY_ACTIONS,['intervene','join','distract','call','leave']);
  CIRCLE_MEMORY_ACTIONS.forEach(action=>assert.deepEqual(circleMemoryProfile(action).propagation.surfaces,['cloth','court','water','path','planting','paper','moon-gate']));
});
test('circle pigment travels outward and settles without disappearing',()=>{
  const memory=createCircleMemory('call',0),early=sampleCircleMemory(memory,900),middle=sampleCircleMemory(memory,3700),done=sampleCircleMemory(memory,7000);
  assert.ok(early.surfaces.cloth>early.surfaces.path);
  assert.ok(middle.surfaces.path>middle.surfaces.moonGate);
  assert.equal(done.complete,true);assert.ok(done.settledOpacity>0);
});
test('every resolved route has one restrained return recognition',()=>{
  CIRCLE_MEMORY_ACTIONS.forEach(action=>{const memory=createCircleReturn(action,0),peak=sampleCircleReturn(memory,1300),done=sampleCircleReturn(memory,3000);assert.ok(peak.recognition>0);assert.equal(done.complete,true);assert.ok(done.recognition<peak.recognition)});
});
test('circle memory language remains physical and non-moralizing',()=>{
  const prohibited=/hero|bully|coward|good|bad|correct|wrong|diagnos|personality/i;
  CIRCLE_MEMORY_ACTIONS.forEach(action=>assert.equal(prohibited.test(JSON.stringify(circleMemoryProfile(action))),false));
});
