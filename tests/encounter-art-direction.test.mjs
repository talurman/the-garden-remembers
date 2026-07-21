import test from 'node:test';
import assert from 'node:assert/strict';
import {ENCOUNTER_ART_DIRECTION,sampleEncounterArtDirection,worldMemoryLevel} from '../src/world/encounter-art-direction.mjs';

test('each encounter owns a distinct silhouette, material, motion and memory trace',()=>{
  const profiles=Object.values(ENCOUNTER_ART_DIRECTION);
  for(const key of ['silhouette','material','motion','memory']){
    assert.equal(new Set(profiles.map(profile=>profile[key])).size,profiles.length);
  }
});

test('world memory accumulates across the complete journey',()=>{
  assert.equal(worldMemoryLevel({}),0);
  assert.equal(worldMemoryLevel({wallet:true,threshold:true}),.5);
  assert.equal(worldMemoryLevel({wallet:true,threshold:true,shelter:true,circle:true}),1);
});

test('an encounter beacon is stronger near the player and remains changed after resolution',()=>{
  const far=sampleEncounterArtDirection({distance:18,time:0});
  const near=sampleEncounterArtDirection({distance:2,time:0});
  const remembered=sampleEncounterArtDirection({distance:18,resolved:true,time:0});
  assert.ok(near.visibility>far.visibility);
  assert.ok(near.light>far.light);
  assert.ok(remembered.visibility>far.visibility);
});
