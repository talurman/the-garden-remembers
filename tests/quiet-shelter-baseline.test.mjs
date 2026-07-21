import test from 'node:test';
import assert from 'node:assert/strict';
import {
  QUIET_SHELTER_BASELINE_ACTIONS,QUIET_SHELTER_LEGACY_ACTION_IDS,QUIET_SHELTER_FACTUAL_OBSERVATIONS,
  quietShelterActionFromLegacy,quietShelterBaselineAction,quietShelterRequiresDeparture
} from '../src/encounters/quiet-shelter-baseline.mjs';

test('the original third booth retains exactly five recognizable actions',()=>{
  assert.deepEqual(QUIET_SHELTER_BASELINE_ACTIONS,['support','reach','water','call','leave']);
  assert.deepEqual(QUIET_SHELTER_LEGACY_ACTION_IDS,['help','touch','water','call','leave']);
  assert.equal(quietShelterActionFromLegacy('help').id,'support');
  assert.equal(quietShelterActionFromLegacy('touch').id,'reach');
  assert.throws(()=>quietShelterBaselineAction('judge'));
  assert.throws(()=>quietShelterActionFromLegacy('judge'));
});

test('four actions resolve through a sequence while leaving requires physical departure',()=>{
  for(const action of ['support','reach','water','call'])assert.equal(quietShelterRequiresDeparture(action),false);
  assert.equal(quietShelterRequiresDeparture('leave'),true);
});

test('every action is terminal, singular and immutable',()=>{
  for(const actionId of QUIET_SHELTER_BASELINE_ACTIONS){
    const action=quietShelterBaselineAction(actionId);
    assert.equal(action.terminal,true);
    assert.equal(action.repeatable,false);
    assert.equal(Object.isFrozen(action),true);
  }
});

test('the baseline uses only factual observation types and neutral language',()=>{
  assert.deepEqual(QUIET_SHELTER_FACTUAL_OBSERVATIONS,[
    'location.entered','location.exited','movement.approached','movement.retreated','movement.still',
    'attention.oriented','interaction.started','interaction.interrupted','interaction.completed',
    'object.placed','environment.contact'
  ]);
  const prohibited=/good|bad|right|wrong|brave|coward|empathy|anxiety|diagnos|personality|score|reward|punish|success|failure/i;
  for(const action of QUIET_SHELTER_BASELINE_ACTIONS)assert.equal(prohibited.test(JSON.stringify(quietShelterBaselineAction(action))),false);
});
