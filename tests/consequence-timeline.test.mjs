import test from 'node:test';
import assert from 'node:assert/strict';
import {walletConsequenceForAction} from '../src/encounters/wallet-encounter.mjs';
import {createConsequenceTimeline, sampleConsequenceTimeline} from '../src/encounters/consequence-timeline.mjs';

test('every wallet action receives the same three-beat physical timeline', () => {
  for (const action of ['ask', 'document', 'help', 'take', 'away']) {
    const timeline = createConsequenceTimeline(walletConsequenceForAction(action), 1000);
    assert.equal(timeline.action, action);
    assert.equal(timeline.durationMs, 2800);
    assert.equal(timeline.beats.length, 3);
    assert.equal(sampleConsequenceTimeline(timeline, 1000).inputLocked, true);
    assert.equal(sampleConsequenceTimeline(timeline, 3800).complete, true);
  }
});

test('the physical sequence releases movement before its settling beat ends', () => {
  const timeline = createConsequenceTimeline(walletConsequenceForAction('ask'), 0);
  const released = sampleConsequenceTimeline(timeline, timeline.inputLockMs + 1);
  assert.equal(released.inputLocked, false);
  assert.equal(released.complete, false);
  assert.ok(released.beatProgress[2] < 1);
});

test('test time scaling preserves the sequence while accelerating QA', () => {
  const timeline = createConsequenceTimeline(walletConsequenceForAction('help'), 50, {timeScale: 8});
  assert.equal(timeline.canonicalDurationMs, 2800);
  assert.equal(timeline.durationMs, 350);
  assert.equal(sampleConsequenceTimeline(timeline, 399).complete, false);
  assert.equal(sampleConsequenceTimeline(timeline, 400).complete, true);
});
