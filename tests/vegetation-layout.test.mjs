import test from 'node:test';
import assert from 'node:assert/strict';
import {VEGETATION_CLUSTERS, WIND_PROFILES, vegetationSafetyMetrics} from '../src/world/vegetation-layout.mjs';

test('vegetation adds multiple plant families without collisions', () => {
  const metrics = vegetationSafetyMetrics();
  assert.equal(metrics.species, 4);
  assert.equal(metrics.allVisualOnly, true);
  assert.ok(metrics.count >= 24);
});

test('main route and dual encounter field retain generous clearance', () => {
  const metrics = vegetationSafetyMetrics();
  assert.equal(metrics.mainRouteClear, true);
  assert.equal(metrics.dualFieldClear, true);
  assert.equal(metrics.insideWorldBounds, true);
});

test('each vegetation species has its own restrained wind rhythm', () => {
  const species = new Set(VEGETATION_CLUSTERS.map(({species}) => species));
  for (const name of species) {
    assert.ok(WIND_PROFILES[name]);
    assert.ok(WIND_PROFILES[name].amplitude <= 0.03);
  }
});
