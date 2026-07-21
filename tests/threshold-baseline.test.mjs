import test from 'node:test';
import assert from 'node:assert/strict';
import {
  THRESHOLD_BASELINE_ACTIONS,
  THRESHOLD_LEGACY_ACTION_IDS,
  thresholdActionFromLegacy,
  thresholdBaselineAction,
  thresholdActionIsRepeatable,
  thresholdActionIsTerminal
} from '../src/encounters/threshold-baseline.mjs';

test('the original second booth retains exactly four actions', () => {
  assert.deepEqual(THRESHOLD_BASELINE_ACTIONS, ['knock', 'listen', 'call', 'leave']);
  assert.deepEqual(THRESHOLD_LEGACY_ACTION_IDS, ['knock', 'listen', 'call', 'ignore']);
  assert.equal(thresholdActionFromLegacy('ignore').id, 'leave');
  assert.throws(() => thresholdBaselineAction('judge'));
  assert.throws(() => thresholdActionFromLegacy('judge'));
});

test('knock and listen remain repeatable non-terminal investigations', () => {
  for (const action of ['knock', 'listen']) {
    assert.equal(thresholdActionIsTerminal(action), false);
    assert.equal(thresholdActionIsRepeatable(action), true);
  }
});

test('call and physical departure remain terminal local resolutions', () => {
  for (const action of ['call', 'leave']) {
    assert.equal(thresholdActionIsTerminal(action), true);
    assert.equal(thresholdActionIsRepeatable(action), false);
  }
});

test('the frozen baseline describes behavior without trait or moral language', () => {
  const prohibited = /good|bad|right|wrong|brave|coward|empathy|anxiety|personality|score/i;
  for (const action of THRESHOLD_BASELINE_ACTIONS) {
    const contract = thresholdBaselineAction(action);
    assert.equal(Object.isFrozen(contract), true);
    assert.equal(prohibited.test(JSON.stringify(contract)), false);
  }
});
