import test from 'node:test';
import assert from 'node:assert/strict';
import {QUIET_SHELTER_MEMORY_ACTIONS,createQuietShelterMemory,quietShelterMemoryProfile,sampleQuietShelterMemory} from '../src/encounters/quiet-shelter-memory.mjs';

test('every shelter choice reaches the same seven connected surfaces',()=>{
  assert.deepEqual(QUIET_SHELTER_MEMORY_ACTIONS,['support','reach','water','call','leave']);
  for(const action of QUIET_SHELTER_MEMORY_ACTIONS){
    const profile=quietShelterMemoryProfile(action);
    assert.deepEqual(profile.propagation.surfaces,['cloth','shelter','water','path','planting','downstream-paper','moon-gate']);
    assert.equal(profile.palette.length,2);
    assert.equal(profile.sound.frequencies.length,3);
  }
});

test('shelter pigment travels outward in a legible sequence',()=>{
  const memory=createQuietShelterMemory('water',0),early=sampleQuietShelterMemory(memory,memory.durationMs*.22),middle=sampleQuietShelterMemory(memory,memory.durationMs*.58),late=sampleQuietShelterMemory(memory,memory.durationMs*.86);
  assert.ok(early.surfaces.cloth>early.surfaces.path);
  assert.ok(middle.surfaces.path>middle.surfaces.moonGate);
  assert.ok(late.surfaces.downstreamPaper>0);
  assert.ok(late.surfaces.moonGate>0);
});

test('completed propagation settles without disappearing',()=>{
  const memory=createQuietShelterMemory('leave',100,{timeScale:4}),frame=sampleQuietShelterMemory(memory,2000);
  assert.equal(frame.complete,true);
  assert.equal(frame.surfaces.moonGate,1);
  assert.ok(frame.settledOpacity>0);
});

test('memory profiles remain observational and non-moralizing',()=>{
  const text=JSON.stringify(QUIET_SHELTER_MEMORY_ACTIONS.map(quietShelterMemoryProfile)).toLowerCase();
  for(const forbidden of ['good','bad','right','wrong','selfish','empathetic','anxious','success','failure'])assert.equal(text.includes(forbidden),false);
});
