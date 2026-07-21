import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {CHARACTER_PROP_STANDARD,characterPropSummary} from '../src/world/character-prop-standard.mjs';

const runtime=await readFile(new URL('../index.html',import.meta.url),'utf8');

test('step 5 preserves every encounter choice and interaction contract',()=>{
  assert.deepEqual(CHARACTER_PROP_STANDARD.choices,{wallet:5,threshold:4,shelter:5,circle:5});
  assert.deepEqual(CHARACTER_PROP_STANDARD.safety,{interactionGeometryChanged:false,collisionsAdded:0,cameraContractChanged:false});
});

test('the complete encounter cast receives authored close-view finishing',()=>{
  assert.deepEqual(characterPropSummary(),{characters:7,choices:19,props:4,interactionGeometryChanged:false,collisionsAdded:0,cameraContractChanged:false});
  for(const marker of ['addCharacterFinish','characterContactShadow','propDetail:']) assert.equal(runtime.includes(marker),true,marker);
});

test('recognizable props keep their physical identifiers',()=>{
  for(const phrase of ['card slots','handset, dial and cord','draped woven textile','layered handmade paper']){
    assert.equal(Object.values(CHARACTER_PROP_STANDARD.props).some(value=>value.includes(phrase)),true,phrase);
  }
});
