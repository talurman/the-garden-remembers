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

test('reflection is a nuanced personality paragraph rather than an action or color summary', () => {
  const result=calculatePersonalityReflection({movement:{distance:60,lateral:8,turn:10},events:[{type:'attention.looked'}],walletOutcome:'reported',threshold:{counts:{listen:1},resolvedAction:'call'}});
  assert.match(result.paragraph,/personality/i);
  assert.doesNotMatch(result.paragraph,/you (walked|clicked|approached|returned the wallet|knocked)/i);
  assert.doesNotMatch(result.paragraph,/diagnos|disorder|score|percentile/i);
  assert.doesNotMatch(result.paragraph,/\bsteps?\b|\bcolou?r\b|pigment|flowers? bloomed/i);
});

test('revisits and mixed investigation increase adaptability without exposing a score', () => {
  const direct=calculatePersonalityReflection({movement:{distance:72,lateral:7,turn:8},events:[],walletOutcome:'returned',threshold:{counts:{knock:1,listen:0},history:[{action:'knock'}],resolvedAction:'leave'}});
  const revisiting=calculatePersonalityReflection({movement:{distance:72,lateral:7,turn:8},events:[{type:'movement.retreated'},{type:'location.entered',locationId:'threshold-place',metadata:{return:true}}],walletOutcome:'returned',threshold:{counts:{knock:1,listen:1},history:[{action:'knock'},{action:'listen'}],resolvedAction:'leave'}});
  assert.ok(revisiting.dimensions.adaptability>direct.dimensions.adaptability);
  assert.doesNotMatch(revisiting.paragraph,/\b\d+(?:\.\d+)?%?\b/);
});

test('quiet shelter evidence meaningfully refines the personality portrait',()=>{
  const common={movement:{distance:130,lateral:8,turn:10},events:[
    {type:'location.entered',locationId:'quiet-shelter',occurredAt:1000},
    {type:'interaction.started',locationId:'quiet-shelter',occurredAt:6500},
    {type:'movement.still',locationId:'quiet-shelter',durationMs:3600}
  ],walletOutcome:'carried',threshold:{counts:{listen:0,knock:0,call:0},resolvedAction:'leave'}};
  const presence=calculatePersonalityReflection({...common,shelter:{resolvedAction:'support'}});
  const distance=calculatePersonalityReflection({...common,shelter:{resolvedAction:'leave'}});
  assert.notEqual(presence.paragraph,distance.paragraph);
  assert.ok(presence.dimensions.responsiveness>distance.dimensions.responsiveness);
  assert.ok(distance.dimensions.selfDirection>presence.dimensions.selfDirection);
});

test('shelter return and retreat evidence increases adaptability without exposing the route',()=>{
  const base={movement:{distance:100,lateral:5,turn:7},walletOutcome:'returned',threshold:{counts:{},resolvedAction:'call'},shelter:{resolvedAction:'water'}};
  const direct=calculatePersonalityReflection({...base,events:[]});
  const returning=calculatePersonalityReflection({...base,events:[
    {type:'movement.retreated',locationId:'quiet-shelter'},
    {type:'location.revisited',locationId:'quiet-shelter',metadata:{return:true}}
  ]});
  assert.ok(returning.dimensions.adaptability>direct.dimensions.adaptability);
  assert.doesNotMatch(returning.paragraph,/quiet shelter|water|call point|action id|support/i);
});

test('dual-field attention and circle return refine the portrait without exposing encounter mechanics',()=>{
  const common={movement:{distance:125,lateral:12,turn:18},walletOutcome:'reported',threshold:{counts:{listen:1},resolvedAction:'leave'},shelter:{resolvedAction:'leave'},circle:{resolvedAction:'call'}};
  const direct=calculatePersonalityReflection({...common,events:[],dualField:{meaningfulSwitches:0}});
  const reflective=calculatePersonalityReflection({...common,events:[
    {type:'attention.oriented',locationId:'shared-choice-field',metadata:{evidence:'attention.sustained'}},
    {type:'attention.oriented',locationId:'shared-choice-field',metadata:{evidence:'attention.switched'}},
    {type:'movement.retreated',locationId:'shared-choice-field',metadata:{evidence:'movement.partial-retreat'}},
    {type:'location.revisited',locationId:'the-circle',metadata:{return:true}}
  ],dualField:{meaningfulSwitches:1}});
  assert.ok(reflective.dimensions.adaptability>direct.dimensions.adaptability);
  assert.ok(reflective.dimensions.deliberation>direct.dimensions.deliberation);
  assert.doesNotMatch(reflective.paragraph,/circle|shelter|bully|intervene|join|distract|action id|first|second/i);
});
