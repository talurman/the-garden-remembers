import test from 'node:test';
import assert from 'node:assert/strict';
import {walletConsequenceForAction} from '../src/encounters/wallet-encounter.mjs';
import {createDelayedEcho,sampleDelayedEcho} from '../src/encounters/delayed-echo.mjs';

test('all wallet outcomes receive equally substantial delayed echoes',()=>{
  const echoes=['ask','document','help','take','away'].map(action=>createDelayedEcho(walletConsequenceForAction(action),100));
  assert.equal(new Set(echoes.map(echo=>echo.echoId)).size,5);
  assert.equal(new Set(echoes.map(echo=>echo.visualId)).size,5);
  assert.equal(new Set(echoes.map(echo=>echo.soundMotifId)).size,5);
  assert.ok(echoes.every(echo=>echo.durationMs===4800&&echo.palette.length===2&&echo.frequencies.length===3));
});

test('a delayed echo cannot appear before its factual trigger time',()=>{
  const echo=createDelayedEcho(walletConsequenceForAction('ask'),1000);
  const before=sampleDelayedEcho(echo,200);
  assert.equal(before.progress,0);
  assert.equal(before.recognition,0);
  assert.equal(before.response,0);
});

test('recognition emerges, responds and settles without vanishing',()=>{
  const echo=createDelayedEcho(walletConsequenceForAction('help'),0);
  const middle=sampleDelayedEcho(echo,2400);
  const complete=sampleDelayedEcho(echo,4800);
  assert.ok(middle.recognition>0&&middle.response>0);
  assert.equal(complete.complete,true);
  assert.equal(complete.settling,1);
  assert.equal(complete.settledOpacity,.26);
});
