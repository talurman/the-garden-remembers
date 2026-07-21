import test from 'node:test';
import assert from 'node:assert/strict';
import {
  WALLET_OUTCOMES,
  walletConsequenceForAction,
  walletConsequenceProfile,
  walletOutcomeForAction,
  walletGrowthPalette,
  walletReflection
} from '../src/encounters/wallet-encounter.mjs';

test('the original five wallet actions retain distinct world outcomes', () => {
  assert.equal(walletOutcomeForAction('ask'), 'returned');
  assert.equal(walletOutcomeForAction('take'), 'carried');
  assert.equal(walletOutcomeForAction('document'), 'posted');
  assert.equal(walletOutcomeForAction('help'), 'signaled');
  assert.equal(walletOutcomeForAction('away'), 'ignored');
  assert.throws(() => walletOutcomeForAction('judge'));
});

test('every wallet path has a neutral factual reflection and growth palette', () => {
  for (const outcome of [null, 'returned', 'posted', 'signaled', 'carried', 'placed']) {
    const reflection = walletReflection({objectState:outcome ?? 'ground', outcome});
    assert.ok(reflection.action.length > 20);
    assert.ok(reflection.growth.length > 20);
    assert.equal(walletGrowthPalette(outcome).length, 2);
  }
});

test('every outcome has an equally complete consequence contract', () => {
  assert.deepEqual(WALLET_OUTCOMES, ['returned', 'posted', 'signaled', 'carried', 'ignored']);

  for (const outcome of WALLET_OUTCOMES) {
    const profile = walletConsequenceProfile(outcome);
    assert.equal(profile.outcome, outcome);
    assert.equal(profile.palette.length, 2);
    assert.equal(profile.immediate.beats.length, 3);
    assert.equal(profile.immediate.durationMs, 2800);
    assert.equal(profile.sound.frequencies.length, 3);
    assert.equal(profile.propagation.surfaces.length, 4);
    assert.deepEqual(profile.propagation.memoryKinds, ['pigment_echo', 'planting_echo', 'paper_convergence']);
    assert.ok(profile.delayed.echoId);
    assert.ok(profile.delayed.visualId);
    assert.ok(profile.delayed.soundMotifId);
    assert.ok(profile.reflection.action.length > 20);
    assert.ok(profile.reflection.growth.length > 20);
    assert.ok(Object.isFrozen(profile));
    assert.ok(Object.isFrozen(profile.immediate));
    assert.ok(Object.isFrozen(profile.propagation.surfaces));
  }
});

test('action lookup returns the matching consequence profile', () => {
  for (const action of ['ask', 'document', 'help', 'take', 'away']) {
    const profile = walletConsequenceForAction(action);
    assert.equal(profile.action, action);
    assert.equal(profile.outcome, walletOutcomeForAction(action));
  }
});

test('consequence profiles contain observations, not moral or diagnostic labels', () => {
  const prohibited = /good|bad|right|wrong|honest|selfish|empathetic|anxious|personality|score|reward|punish/i;
  for (const outcome of WALLET_OUTCOMES) {
    assert.equal(prohibited.test(JSON.stringify(walletConsequenceProfile(outcome))), false);
  }
});

test('unknown outcomes cannot silently borrow another consequence', () => {
  assert.throws(() => walletConsequenceProfile('judged'));
  assert.throws(() => walletConsequenceForAction('judge'));
});
