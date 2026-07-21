import test from 'node:test';
import assert from 'node:assert/strict';
import {senseQuietShelter} from '../src/encounters/quiet-shelter-sensing.mjs';

const target={x:-5.7,z:-115.3};

test('quiet shelter presence grows with proximity and orientation',()=>{
  const distant=senseQuietShelter({player:{x:0,z:-98},forward:{x:0,z:-1},target});
  const nearFacing=senseQuietShelter({player:{x:-2,z:-112},forward:{x:-.75,z:-.66},target});
  const nearAway=senseQuietShelter({player:{x:-2,z:-112},forward:{x:.75,z:.66},target});
  assert.ok(nearFacing.presence>distant.presence);
  assert.ok(nearFacing.presence>nearAway.presence);
  assert.equal(nearFacing.zone,'near');
});

test('shelter prompt requires both close distance and deliberate orientation',()=>{
  const facing=senseQuietShelter({player:{x:-3.2,z:-113.3},forward:{x:-.72,z:-.7},target});
  const turnedAway=senseQuietShelter({player:{x:-3.2,z:-113.3},forward:{x:.72,z:.7},target});
  const tooFar=senseQuietShelter({player:{x:0,z:-106},forward:{x:-.58,z:-.82},target});
  assert.equal(facing.promptEligible,true);
  assert.equal(turnedAway.promptEligible,false);
  assert.equal(tooFar.promptEligible,false);
});

test('the shelter does not offer choices from the wider observation field',()=>{
  const observing=senseQuietShelter({player:{x:-2.4,z:-112.4},forward:{x:-.72,z:-.7},target});
  assert.ok(observing.presence>0);
  assert.equal(observing.promptEligible,false);
});

test('the shelter remains text-quiet outside its authored range',()=>{
  const sensed=senseQuietShelter({player:{x:0,z:-80},forward:{x:0,z:-1},target});
  assert.equal(sensed.presence,0);
  assert.equal(sensed.promptEligible,false);
  assert.equal(sensed.zone,'outside');
});
