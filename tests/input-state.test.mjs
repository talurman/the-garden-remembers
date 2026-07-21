import test from 'node:test';
import assert from 'node:assert/strict';
import {movementInput} from '../src/movement/input-state.mjs';

test('keyboard and touch forward input resolve to the same movement axis', () => {
  assert.deepEqual(movementInput({keys:{ArrowUp:true}}), movementInput({touchPulse:{ArrowUp:.12}}));
  assert.equal(movementInput({keys:{KeyW:true}}).forward, 1);
  assert.equal(movementInput({keys:{KeyS:true}}).forward, -1);
});

test('arrow keys turn while WASD preserves strafing', () => {
  assert.deepEqual(movementInput({keys:{ArrowLeft:true}}), {forward:0,strafe:0,turn:-1,sprint:false});
  assert.deepEqual(movementInput({keys:{KeyA:true}}), {forward:0,strafe:-1,turn:0,sprint:false});
});

test('opposing inputs cancel and sprint works from either shift key', () => {
  const input=movementInput({keys:{KeyW:true,ArrowDown:true,KeyA:true,KeyD:true,ShiftRight:true}});
  assert.deepEqual(input,{forward:0,strafe:0,turn:0,sprint:true});
});
