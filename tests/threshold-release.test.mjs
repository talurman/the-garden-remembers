import test from 'node:test';
import assert from 'node:assert/strict';
import {createThresholdRelease,sampleThresholdRelease} from '../src/encounters/threshold-release.mjs';

test('the threshold remains closed before release and opens during the exhale',()=>{
  const release=createThresholdRelease(1000);
  assert.equal(sampleThresholdRelease(release,1000).passageOpen,false);
  assert.equal(sampleThresholdRelease(release,2300).passageOpen,true);
});

test('release completes as a stable open passage',()=>{
  const release=createThresholdRelease(1000);
  const frame=sampleThresholdRelease(release,4000);
  assert.equal(frame.complete,true);
  assert.equal(frame.door,1);
  assert.equal(frame.breath,0);
});
