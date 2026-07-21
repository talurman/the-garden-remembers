import test from 'node:test';
import assert from 'node:assert/strict';
import {bufferLookInput,consumeLookInput} from '../src/movement/look-controller.mjs';
import {updateYaw} from '../src/movement/planar-controller.mjs';

test('large pointer event bursts are bounded before reaching the camera',()=>{
  let pending={x:0,y:0};
  for(let i=0;i<100;i++)pending=bufferLookInput(pending,{dx:500,dy:-500});
  assert.deepEqual(pending,{x:120,y:-120});
  const frame=consumeLookInput({yaw:0,pitch:0,pending,dt:1/60});
  assert.ok(Math.abs(frame.yaw)<.12);
  assert.ok(Math.abs(frame.pitch)<.12);
});

test('mouse look decays instead of continuing after release',()=>{
  let state={yaw:0,pitch:0,pending:bufferLookInput({x:0,y:0},{dx:45,dy:18})};
  for(let i=0;i<60;i++)state=consumeLookInput({...state,dt:1/60});
  assert.ok(Math.abs(state.pending.x)<.001);
  assert.ok(Math.abs(state.pending.y)<.001);
});

test('keyboard turning composes with mouse look without resetting direction',()=>{
  const mouse=consumeLookInput({yaw:.6,pitch:-.1,pending:{x:30,y:0},dt:1/60});
  const combined=updateYaw(mouse.yaw,1,1/60);
  assert.ok(combined>mouse.yaw);
  assert.ok(mouse.yaw>.6);
});

test('vertical look always remains within the calm field-of-view range',()=>{
  const up=consumeLookInput({yaw:0,pitch:.23,pending:{x:0,y:-120},dt:.05});
  const down=consumeLookInput({yaw:0,pitch:-.31,pending:{x:0,y:120},dt:.05});
  assert.equal(up.pitch,.24);
  assert.equal(down.pitch,-.32);
});
