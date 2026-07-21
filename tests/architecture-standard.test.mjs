import test from 'node:test';
import assert from 'node:assert/strict';
import {ARCHITECTURE_STANDARD, architectureSafetyMetrics} from '../src/world/architecture-standard.mjs';

test('threshold keeps its opaque door and original interaction anchor', () => {
  const metrics = architectureSafetyMetrics();
  assert.equal(metrics.thresholdAnchorPreserved, true);
  assert.equal(metrics.opaquePassage, true);
  assert.equal(ARCHITECTURE_STANDARD.threshold.doorWidth, 1.72);
  assert.equal(ARCHITECTURE_STANDARD.threshold.doorHeight, 3.88);
});

test('architectural refinement preserves the whole-wall release contract', () => {
  assert.equal(architectureSafetyMetrics().releaseContractPreserved, true);
  assert.equal(ARCHITECTURE_STANDARD.threshold.releaseRemovesWholeWall, true);
});

test('pavilion remains centered on the existing final approach', () => {
  const metrics = architectureSafetyMetrics();
  assert.equal(metrics.pavilionAnchorPreserved, true);
  assert.equal(metrics.gateOpeningPreserved, true);
  assert.equal(metrics.detailsVisualOnly, true);
});
