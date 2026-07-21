import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {CIRCLE_CHARACTER_STANDARD} from '../src/encounters/circle-character-standard.mjs';

const runtime=await readFile(new URL('../index.html',import.meta.url),'utf8');
const artBible=await readFile(new URL('../ART_BIBLE_V5_CHARACTER_DIRECTION.md',import.meta.url),'utf8');

test('the new character sheet is recorded as the canonical runtime direction',()=>{
  assert.match(artBible,/character-directions-v1\.png/);
  assert.match(artBible,/wallet character, Quiet Shelter character/i);
  assert.match(artBible,/all four surrounding people/i);
});

test('every visible encounter uses the contemporary faceted construction family',()=>{
  for(const marker of ['visitorJacketL','shelterCollarL','makeCharacterShoe','addFacetedHair',"characterDirection:'v5-contemporary-faceted'"]){
    assert.equal(runtime.includes(marker),true,marker);
  }
  assert.equal(CIRCLE_CHARACTER_STANDARD.every(person=>Number.isInteger(person.hair)),true);
  assert.equal(CIRCLE_CHARACTER_STANDARD.some(person=>/robe|cowl|hood/.test(person.silhouette)),false);
});

test('the updated cast preserves restrained emotional acting',()=>{
  assert.equal(CIRCLE_CHARACTER_STANDARD.find(person=>person.role==='center').gesture,'hands-near-face');
  assert.equal(runtime.includes('tearL.visible=tearR.visible=false'),true);
  assert.equal(runtime.includes('tearMaterial.opacity=0'),true);
});
