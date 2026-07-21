import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeYaw, resolvePlanarCollisions, updatePlanarVelocity, updateYaw} from '../src/movement/planar-controller.mjs';

test('sustained movement converges instead of accelerating over time', () => {
  let velocity = {x:0,z:0};
  for (let frame = 0; frame < 60 * 60; frame++) {
    velocity = updatePlanarVelocity({velocity,input:{forward:1,strafe:0},yaw:0,dt:1/60});
  }
  assert.ok(Math.abs(Math.hypot(velocity.x,velocity.z)-4.15)<0.001);
});

test('diagonal movement has the same maximum speed as straight movement', () => {
  let straight={x:0,z:0},diagonal={x:0,z:0};
  for(let i=0;i<180;i++){
    straight=updatePlanarVelocity({velocity:straight,input:{forward:1,strafe:0},yaw:.4,dt:1/60});
    diagonal=updatePlanarVelocity({velocity:diagonal,input:{forward:1,strafe:1},yaw:.4,dt:1/60});
  }
  assert.ok(Math.abs(Math.hypot(straight.x,straight.z)-Math.hypot(diagonal.x,diagonal.z))<0.001);
});

test('turning remains bounded during a long session', () => {
  let yaw=0;
  for(let i=0;i<60*60*4;i++)yaw=updateYaw(yaw,1,1/60);
  assert.equal(yaw,normalizeYaw(yaw));
  assert.ok(yaw>=-Math.PI&&yaw<=Math.PI);
});

test('collision response removes inward velocity and preserves sliding', () => {
  const result=resolvePlanarCollisions({position:{x:.2,z:.2},velocity:{x:-2,z:-3},obstacles:[{x:0,z:0,r:1}],playerRadius:.34,bounds:{minX:-10,maxX:10,minZ:-10,maxZ:10}});
  assert.ok(Math.hypot(result.position.x,result.position.z)>=1.3399);
  const normalLength=Math.hypot(result.position.x,result.position.z);
  const inward=result.velocity.x*result.position.x/normalLength+result.velocity.z*result.position.z/normalLength;
  assert.ok(inward>=-0.00001);
  assert.ok(Math.hypot(result.velocity.x,result.velocity.z)>0);
});

test('world bounds cancel pressure against the edge', () => {
  const result=resolvePlanarCollisions({position:{x:12,z:0},velocity:{x:5,z:-1},obstacles:[],bounds:{minX:-11.4,maxX:11.4,minZ:-48.2,maxZ:30}});
  assert.equal(result.position.x,11.4);
  assert.equal(result.velocity.x,0);
  assert.equal(result.velocity.z,-1);
});
