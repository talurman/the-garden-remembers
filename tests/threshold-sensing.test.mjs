import test from 'node:test';
import assert from 'node:assert/strict';
import {senseThreshold} from '../src/encounters/threshold-sensing.mjs';

test('threshold response strengthens with proximity and orientation', () => {
  const target = {x:2.72,z:-87.42};
  const distant = senseThreshold({player:{x:0,z:-60},forward:{x:0,z:-1},target});
  const nearFacing = senseThreshold({player:{x:2.72,z:-80},forward:{x:0,z:-1},target});
  const nearAway = senseThreshold({player:{x:2.72,z:-80},forward:{x:0,z:1},target});
  assert.ok(nearFacing.response > distant.response);
  assert.ok(nearFacing.response > nearAway.response);
  assert.equal(nearFacing.zone, 'near');
});

test('threshold sensing remains quiet outside its authored range', () => {
  const sensed = senseThreshold({player:{x:0,z:-40},forward:{x:0,z:-1},target:{x:2.72,z:-87.42}});
  assert.equal(sensed.proximity, 0);
  assert.equal(sensed.response, 0);
  assert.equal(sensed.zone, 'outside');
});

test('close-range visual response remains present when audio orientation is weak', () => {
  const sensed = senseThreshold({player:{x:2.72,z:-85},forward:{x:0,z:1},target:{x:2.72,z:-87.42}});
  assert.equal(sensed.zone, 'close');
  assert.ok(sensed.response > 0);
  assert.equal(sensed.facing, 0);
});
