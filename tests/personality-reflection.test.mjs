import test from 'node:test';
import assert from 'node:assert/strict';
import {calculatePersonalityReflection} from '../src/memory/personality-reflection.mjs';

test('different movement patterns produce different personality reflections', () => {
  const exploratory=calculatePersonalityReflection({movement:{distance:80,lateral:30,turn:42},events:[{type:'movement.still',durationMs:5000},{type:'movement.retreated'}],walletOutcome:'returned',threshold:{counts:{listen:2,knock:1,call:0},resolvedAction:'leave'}});
  const direct=calculatePersonalityReflection({movement:{distance:110,lateral:2,turn:3},events:[],walletOutcome:'carried',threshold:{counts:{listen:0,knock:0,call:0},resolvedAction:'leave'}});
  assert.notEqual(exploratory.paragraph,direct.paragraph);
  assert.ok(exploratory.dimensions.exploration>direct.dimensions.exploration);
  assert.ok(exploratory.dimensions.deliberation>direct.dimensions.deliberation);
});

test('reflection stays factual rather than inferring personality or diagnosis', () => {
  const result=calculatePersonalityReflection({movement:{distance:60,lateral:8,turn:10},events:[{type:'attention.looked'}],walletOutcome:'reported',threshold:{counts:{listen:1},resolvedAction:'call'}});
  assert.match(result.paragraph,/garden|route|places/i);
  assert.doesNotMatch(result.paragraph,/\byou\b|personality|trait|curious|thoughtful|decisive|comfortable|diagnos|disorder|score|percentile/i);
});

test('revisits and mixed investigation increase adaptability without exposing a score', () => {
  const direct=calculatePersonalityReflection({movement:{distance:72,lateral:7,turn:8},events:[],walletOutcome:'returned',threshold:{counts:{knock:1,listen:0},history:[{action:'knock'}],resolvedAction:'leave'}});
  const revisiting=calculatePersonalityReflection({movement:{distance:72,lateral:7,turn:8},events:[{type:'movement.retreated'},{type:'location.entered',locationId:'threshold-place',metadata:{return:true}}],walletOutcome:'returned',threshold:{counts:{knock:1,listen:1},history:[{action:'knock'},{action:'listen'}],resolvedAction:'leave'}});
  assert.ok(revisiting.dimensions.adaptability>direct.dimensions.adaptability);
  assert.doesNotMatch(revisiting.paragraph,/\b\d+(?:\.\d+)?%?\b/);
});
