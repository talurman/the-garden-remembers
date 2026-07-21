import test from 'node:test';
import assert from 'node:assert/strict';
import {nearestAvailableChoice, updateDismissedChoice} from '../src/interaction/choice-proximity.mjs';

const choices=[
  {action:'ask',distance:1.1,radius:1.65},
  {action:'help',distance:1.4,radius:1.65},
  {action:'away',distance:4.2,radius:1.55}
];

test('dismissing one nearby choice leaves other environmental choices available',()=>{
  assert.equal(nearestAvailableChoice(choices,'ask').action,'help');
});

test('a dismissed choice stays quiet until the player leaves its clearance area',()=>{
  assert.equal(updateDismissedChoice('ask',choices),'ask');
  const departed=choices.map(choice=>choice.action==='ask'?{...choice,distance:3.2}:choice);
  assert.equal(updateDismissedChoice('ask',departed),null);
});

test('returning after clearance makes the choice available again',()=>{
  const departed=choices.map(choice=>choice.action==='ask'?{...choice,distance:3.2}:choice);
  const dismissed=updateDismissedChoice('ask',departed);
  assert.equal(nearestAvailableChoice(choices,dismissed).action,'ask');
});
