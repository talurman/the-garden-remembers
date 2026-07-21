import test from 'node:test';
import assert from 'node:assert/strict';
import {BORROWED_SCENERY_LAYERS,ENCOUNTER_LAND_SKIRTS,SCENIC_BERMS,SCENIC_GROVES,compositionSafetyMetrics} from '../src/world/composition-layout.mjs';

test('scenic landforms remain outside the protected walkable corridor',()=>{
  const metrics=compositionSafetyMetrics();
  assert.ok(metrics.minBermAbsX>11.4);
  assert.ok(metrics.minGroveAbsX>12);
  assert.equal(metrics.gateFrameBalanced,true);
});

test('composition adds depth without inventing collision targets',()=>{
  assert.ok(SCENIC_BERMS.length>=8);
  assert.ok(SCENIC_GROVES.length>=6);
  for(const item of [...SCENIC_BERMS,...SCENIC_GROVES])assert.equal('collision' in item,false);
});

test('borrowed scenery layers recede with opacity and the encounter skirts preserve all anchors',()=>{
  for(let index=1;index<BORROWED_SCENERY_LAYERS.length;index++){
    assert.ok(BORROWED_SCENERY_LAYERS[index].z<BORROWED_SCENERY_LAYERS[index-1].z);
    assert.ok(BORROWED_SCENERY_LAYERS[index].opacity<BORROWED_SCENERY_LAYERS[index-1].opacity);
  }
  assert.deepEqual(ENCOUNTER_LAND_SKIRTS.map(item=>item.id),['wallet-clearing','quiet-shelter','the-circle']);
  assert.deepEqual(ENCOUNTER_LAND_SKIRTS.slice(1).map(item=>[item.x,item.z]),[[-5.15,-115.4],[5.35,-116.15]]);
});
