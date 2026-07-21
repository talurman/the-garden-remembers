import test from 'node:test';
import assert from 'node:assert/strict';
import {EncounterResponseRouter} from '../src/encounters/response-router.mjs';

test('memory responses route by encounter identity', () => {
  const router = new EncounterResponseRouter();
  const walletReceived = [];
  const thresholdReceived = [];
  router.register('wallet', change => walletReceived.push(change));
  router.register('threshold', change => thresholdReceived.push(change));
  const walletChange = {encounterId:'wallet', profileId:'returned', kind:'pigment_echo'};
  const thresholdChange = {encounterId:'threshold', profileId:'listen', kind:'paper_echo'};
  assert.equal(router.route(walletChange), true);
  assert.equal(router.route(thresholdChange), true);
  assert.deepEqual(walletReceived, [walletChange]);
  assert.deepEqual(thresholdReceived, [thresholdChange]);
  assert.equal(router.route({encounterId:'unregistered', kind:'pigment_echo'}), false);
});

test('an encounter handler cannot be silently overwritten', () => {
  const router = new EncounterResponseRouter();
  router.register('wallet', () => {});
  assert.throws(() => router.register('wallet', () => {}), /already registered/);
});
