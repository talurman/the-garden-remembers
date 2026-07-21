import test from 'node:test';
import assert from 'node:assert/strict';
import {CircleEncounter} from '../src/encounters/circle-encounter.mjs';

test('each direct circle route resolves once without rewriting the outcome',()=>{
  for(const action of ['intervene','join','distract','call']){
    const encounter=new CircleEncounter(),result=encounter.choose(action,1000);
    assert.equal(result.accepted,true);
    assert.equal(result.resolved,true);
    assert.equal(encounter.snapshot().resolvedAction,action);
    assert.equal(encounter.choose('leave',1100).accepted,false);
  }
});

test('continue onward remains pending until physical departure',()=>{
  const encounter=new CircleEncounter(),choice=encounter.choose('leave',1000);
  assert.equal(choice.accepted,true);
  assert.equal(choice.pendingDeparture,true);
  assert.equal(encounter.snapshot().resolved,false);
  assert.equal(encounter.depart(1500).accepted,true);
  assert.equal(encounter.snapshot().resolvedAction,'leave');
});

test('passing the circle without opening its prompt is a complete route',()=>{
  const encounter=new CircleEncounter(),result=encounter.depart(1200),snapshot=encounter.snapshot();
  assert.equal(result.accepted,true);
  assert.equal(snapshot.resolvedAction,'leave');
  assert.equal(snapshot.history[0].physical,true);
  assert.equal(snapshot.counts.leave,1);
});
