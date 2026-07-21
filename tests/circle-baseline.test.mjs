import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CIRCLE_BASELINE_ACTIONS,CIRCLE_LEGACY_ACTION_IDS,CIRCLE_FACTUAL_OBSERVATIONS,
  circleActionFromLegacy,circleBaselineAction,circleRequiresDeparture
} from '../src/encounters/circle-baseline.mjs';

test('the original fourth booth retains exactly five recognizable routes',()=>{
  assert.deepEqual(CIRCLE_BASELINE_ACTIONS,['intervene','join','distract','call','leave']);
  assert.deepEqual(CIRCLE_LEGACY_ACTION_IDS,['intervene','join','distract','call','leave']);
  for(const action of CIRCLE_BASELINE_ACTIONS)assert.equal(circleActionFromLegacy(action).id,action);
  assert.throws(()=>circleBaselineAction('judge'));
  assert.throws(()=>circleActionFromLegacy('judge'));
});

test('four circle routes use physical sequences while onward requires departure',()=>{
  for(const action of ['intervene','join','distract','call'])assert.equal(circleRequiresDeparture(action),false);
  assert.equal(circleRequiresDeparture('leave'),true);
});

test('circle contracts are terminal, singular and factual',()=>{
  for(const actionId of CIRCLE_BASELINE_ACTIONS){
    const action=circleBaselineAction(actionId);
    assert.equal(action.terminal,true);
    assert.equal(action.repeatable,false);
    assert.equal(Object.isFrozen(action),true);
  }
  assert.ok(CIRCLE_FACTUAL_OBSERVATIONS.includes('attention.oriented'));
  assert.ok(CIRCLE_FACTUAL_OBSERVATIONS.includes('movement.backtracked'));
  assert.ok(CIRCLE_FACTUAL_OBSERVATIONS.includes('location.revisited'));
});

test('the circle baseline contains no moral, clinical or personality result language',()=>{
  const prohibited=/good|bad|right|wrong|hero|villain|brave|coward|empathy|anxiety|diagnos|personality|score|reward|punish|success|failure|saved|problem/i;
  for(const action of CIRCLE_BASELINE_ACTIONS)assert.equal(prohibited.test(JSON.stringify(circleBaselineAction(action))),false);
});
