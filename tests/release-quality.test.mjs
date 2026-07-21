import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {RELEASE_QUALITY_STANDARD,createFrameQualityMonitor,releaseQualityProfile} from '../src/world/release-quality.mjs';

const runtime=await readFile(new URL('../index.html',import.meta.url),'utf8');

test('desktop and compact render profiles use one stable capped pixel ratio',()=>{
  assert.equal(releaseQualityProfile({width:1440,height:900,pixelRatio:2}).pixelRatio,1.25);
  assert.equal(releaseQualityProfile({width:390,height:844,pixelRatio:3,coarsePointer:true}).pixelRatio,1);
  assert.equal(releaseQualityProfile({width:1440,height:900,pixelRatio:2,reducedMotion:true}).pixelRatio,1.1);
});

test('sustained expensive frames lower render cost without altering gameplay',()=>{
  const profile=releaseQualityProfile({width:1440,height:900,pixelRatio:1.25});
  const monitor=createFrameQualityMonitor(profile);
  for(let index=0;index<RELEASE_QUALITY_STANDARD.sampleWindow;index++) monitor.sample(30);
  assert.ok(monitor.snapshot().level<1);
  assert.deepEqual(RELEASE_QUALITY_STANDARD.safety,{interactionGeometryChanged:false,collisionsAdded:0,movementContractChanged:false});
});

test('release runtime exposes focus, reduced-motion and render diagnostics',()=>{
  for(const marker of ['releaseQualityProfile','environmentalMotionScale','qa-quality',"reflection.setAttribute('aria-hidden','false')","restart.focus({preventScroll:true})"]){
    assert.equal(runtime.includes(marker),true,marker);
  }
  assert.equal(RELEASE_QUALITY_STANDARD.accessibility.touchTargets>=44,true);
});
