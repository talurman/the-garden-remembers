import test from 'node:test';
import assert from 'node:assert/strict';
import {walletConsequenceForAction} from '../src/encounters/wallet-encounter.mjs';
import {createPigmentPropagation,samplePigmentPropagation} from '../src/encounters/pigment-propagation.mjs';

test('every outcome propagates through the same four connected surfaces',()=>{
  for(const action of ['ask','document','help','take','away']){
    const flow=createPigmentPropagation(walletConsequenceForAction(action),100);
    assert.deepEqual(flow.surfaces,['ground','water','planting','paper']);
    assert.equal(flow.durationMs,4300);
    assert.equal(flow.palette.length,2);
  }
});

test('surface responses overlap in a legible outward sequence',()=>{
  const flow=createPigmentPropagation(walletConsequenceForAction('ask'),0);
  const early=samplePigmentPropagation(flow,900);
  const middle=samplePigmentPropagation(flow,2400);
  const late=samplePigmentPropagation(flow,3900);
  assert.ok(early.surfaces.ground>0);
  assert.equal(early.surfaces.planting,0);
  assert.ok(middle.surfaces.ground>middle.surfaces.paper);
  assert.ok(middle.surfaces.water>0&&middle.surfaces.planting>0);
  assert.ok(late.surfaces.paper>0);
});

test('propagation settles without disappearing',()=>{
  const flow=createPigmentPropagation(walletConsequenceForAction('away'),0,{timeScale:4});
  const complete=samplePigmentPropagation(flow,1075);
  assert.equal(complete.complete,true);
  assert.equal(complete.settledOpacity,.2);
});
