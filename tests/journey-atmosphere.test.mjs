import test from 'node:test';
import assert from 'node:assert/strict';
import {sampleJourneyAtmosphere} from '../src/world/journey-atmosphere.mjs';

test('the garden warms gradually as the player moves toward the final gate',()=>{
  const entry=sampleJourneyAtmosphere(30),threshold=sampleJourneyAtmosphere(-88),shelter=sampleJourneyAtmosphere(-115),gate=sampleJourneyAtmosphere(-150);
  assert.ok(entry.progress<threshold.progress);
  assert.ok(threshold.progress<shelter.progress);
  assert.ok(shelter.progress<gate.progress);
  assert.equal(gate.progress,1);
});

test('the sunset progression remains luminous rather than darkening the world',()=>{
  for(const z of [30,0,-50,-88,-115,-150]){
    const atmosphere=sampleJourneyAtmosphere(z);
    assert.ok(atmosphere.exposureLift>=0);
    assert.ok(atmosphere.fogLift>=0);
    assert.ok(atmosphere.skyBlend<=.58);
    assert.ok(atmosphere.treeWarmth<=.16);
  }
});
