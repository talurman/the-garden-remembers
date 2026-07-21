import test from 'node:test';
import assert from 'node:assert/strict';
import {CIRCLE_CHARACTER_STANDARD,circleCharacter} from '../src/encounters/circle-character-standard.mjs';

test('the circle contains one central person and four surrounding people',()=>{
  assert.equal(CIRCLE_CHARACTER_STANDARD.filter(person=>person.role==='center').length,1);
  assert.equal(CIRCLE_CHARACTER_STANDARD.filter(person=>person.role==='surrounding').length,4);
});

test('the figures use credible varied proportions and authored silhouettes',()=>{
  const center=circleCharacter('center');
  const surrounding=CIRCLE_CHARACTER_STANDARD.filter(person=>person.role==='surrounding');
  assert.ok(center.height>=1.28&&center.height<=1.42);
  assert.ok(surrounding.every(person=>person.height>=1.65&&person.height<=1.9));
  assert.ok(surrounding.every(person=>person.height>center.height));
  assert.equal(new Set(surrounding.map(person=>person.height)).size,4);
  assert.equal(new Set(CIRCLE_CHARACTER_STANDARD.map(person=>person.silhouette)).size,5);
  assert.ok(CIRCLE_CHARACTER_STANDARD.every(person=>person.layers>=2&&person.layers<=3));
});

test('postures communicate the situation without theatrical or judgmental language',()=>{
  const serialized=JSON.stringify(CIRCLE_CHARACTER_STANDARD).toLowerCase();
  for(const forbidden of ['bully','victim','bad','good','cry','tear','laugh','guilty','rescue']){
    assert.equal(serialized.includes(forbidden),false,forbidden);
  }
  assert.equal(circleCharacter('center').gesture,'hands-near-face');
  assert.ok(CIRCLE_CHARACTER_STANDARD.filter(person=>person.role==='surrounding').every(person=>person.gesture!=='hands-near-face'));
});

test('the circle preserves an approach gap on the path-facing west side',()=>{
  const surrounding=CIRCLE_CHARACTER_STANDARD.filter(person=>person.role==='surrounding');
  assert.ok(surrounding.every(person=>Math.hypot(person.position.x,person.position.z)>=1.75));
  assert.ok(surrounding.every(person=>Math.hypot(person.position.x,person.position.z)<=1.95));
  assert.equal(surrounding.some(person=>person.position.x<-.3&&person.position.z>.15),false);
});

test('the standard is immutable and addressable by id',()=>{
  assert.ok(Object.isFrozen(CIRCLE_CHARACTER_STANDARD));
  assert.ok(CIRCLE_CHARACTER_STANDARD.every(person=>Object.isFrozen(person)&&Object.isFrozen(person.position)&&Object.isFrozen(person.palette)));
  assert.equal(circleCharacter('missing'),null);
});
