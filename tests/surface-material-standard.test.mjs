import test from 'node:test';
import assert from 'node:assert/strict';
import {SURFACE_MATERIAL_STANDARD, surfaceSafetyMetrics} from '../src/world/surface-material-standard.mjs';

test('surface detail layers remain visual-only', () => {
  assert.equal(surfaceSafetyMetrics().visualOnlyLayers, true);
  assert.equal(SURFACE_MATERIAL_STANDARD.detailLayers.pathEdgeWash.collision, false);
  assert.equal(SURFACE_MATERIAL_STANDARD.detailLayers.visibleStreambed.collision, false);
});

test('surface pass preserves the existing stepping-stone count', () => {
  assert.equal(surfaceSafetyMetrics().steppingStoneCount, 48);
});

test('water remains translucent so the stone streambed is visible', () => {
  const metrics = surfaceSafetyMetrics();
  assert.equal(metrics.translucentWater, true);
  assert.ok(SURFACE_MATERIAL_STANDARD.surfaces.water.opacityMin >= 0.3);
  assert.ok(SURFACE_MATERIAL_STANDARD.surfaces.water.opacityMax <= 0.65);
});

test('close-range textures use the detail budget', () => {
  assert.ok(surfaceSafetyMetrics().textureResolution >= 512);
});
