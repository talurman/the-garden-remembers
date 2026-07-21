import test from 'node:test';
import assert from 'node:assert/strict';
import {DualFieldAttentionTracker,senseDualField} from '../src/encounters/dual-field-attention.mjs';

const player={x:-.35,z:-105.4};
const toward=target=>{const dx=target.x-player.x,dz=target.z-player.z,length=Math.hypot(dx,dz);return{x:dx/length,z:dz/length}};
const shelter={x:-5.15,z:-115.4},circle={x:5.35,z:-116.15};

test('a neutral view down the center does not invent a first preference',()=>{
  const sense=senseDualField({player,forward:{x:0,z:-1}});
  assert.equal(sense.focused,null);
  assert.equal(sense.balanced,true);
});

test('both encounters can independently become the clear focus',()=>{
  assert.equal(senseDualField({player,forward:toward(shelter)}).focused,'quiet-shelter');
  assert.equal(senseDualField({player,forward:toward(circle)}).focused,'the-circle');
});

test('a brief camera sweep is not recorded as sustained attention',()=>{
  const tracker=new DualFieldAttentionTracker();
  tracker.update({now:0,player,forward:toward(shelter)});
  const result=tracker.update({now:420,player,forward:{x:0,z:-1}});
  assert.equal(result.snapshot.firstSustainedGaze,null);
  assert.equal(result.events.some(event=>event.kind==='attention.first-sustained'),false);
});

test('sustained gaze and a meaningful redirect are recorded factually',()=>{
  const tracker=new DualFieldAttentionTracker();
  tracker.update({now:0,player,forward:toward(shelter)});
  let result=tracker.update({now:980,player,forward:toward(shelter)});
  assert.equal(result.snapshot.firstSustainedGaze,'quiet-shelter');
  tracker.update({now:1100,player,forward:toward(circle)});
  result=tracker.update({now:1750,player,forward:toward(circle)});
  assert.equal(result.snapshot.activeAttention,'the-circle');
  assert.equal(result.snapshot.switches,1);
  assert.equal(result.events[0].kind,'attention.switched');
});

test('approach, timing, and retreat remain observable behavior rather than interpretation',()=>{
  const tracker=new DualFieldAttentionTracker();
  tracker.update({now:100,player,forward:{x:0,z:-1}});
  let result=tracker.update({now:900,player:{x:3.5,z:-112},forward:toward(circle)});
  const approach=result.events.find(event=>event.kind==='movement.first-approach');
  assert.equal(approach.encounterId,'the-circle');
  assert.equal(approach.timeFromEntryMs,800);
  result=tracker.update({now:1500,player:{x:0,z:-104},forward:{x:0,z:-1}});
  assert.equal(result.events.some(event=>event.kind==='movement.partial-retreat'&&event.encounterId==='the-circle'),true);
});

