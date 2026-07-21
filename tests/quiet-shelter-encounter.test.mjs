import test from 'node:test';
import assert from 'node:assert/strict';
import {QuietShelterEncounter} from '../src/encounters/quiet-shelter-encounter.mjs';

test('support, reach, water and call each resolve the local encounter once',()=>{
  for(const action of ['support','reach','water','call']){
    const encounter=new QuietShelterEncounter(),result=encounter.choose(action,1000);
    assert.equal(result.accepted,true);
    assert.equal(result.resolved,true);
    assert.equal(encounter.snapshot().resolvedAction,action);
    assert.equal(encounter.choose('leave',1100).accepted,false);
  }
});

test('give space remains pending until the player physically leaves',()=>{
  const encounter=new QuietShelterEncounter();
  const choice=encounter.choose('leave',1000);
  assert.equal(choice.accepted,true);
  assert.equal(choice.resolved,false);
  assert.equal(choice.pendingDeparture,true);
  assert.equal(encounter.snapshot().resolved,false);
  assert.equal(encounter.depart(1300).accepted,true);
  assert.equal(encounter.snapshot().resolvedAction,'leave');
  assert.equal(encounter.snapshot().counts.leave,1);
});

test('walking past without opening the prompt remains a complete factual route',()=>{
  const encounter=new QuietShelterEncounter();
  const result=encounter.depart(1200),snapshot=encounter.snapshot();
  assert.equal(result.accepted,true);
  assert.equal(snapshot.resolvedAction,'leave');
  assert.equal(snapshot.history[0].physical,true);
  assert.equal(snapshot.counts.leave,1);
});
