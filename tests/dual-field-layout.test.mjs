import test from 'node:test';
import assert from 'node:assert/strict';
import {DUAL_FIELD_LAYOUT,dualFieldMetrics} from '../src/encounters/dual-field-layout.mjs';

test('the shelter and circle occupy opposite sides at the same journey depth',()=>{
  const metrics=dualFieldMetrics();
  assert.equal(metrics.shelterIsLeft,true);
  assert.equal(metrics.circleIsRight,true);
  assert.ok(metrics.depthDifference<1);
  assert.ok(metrics.centerGap>3.4);
});

test('the dual field preserves a broad center route and downstream gate',()=>{
  const metrics=dualFieldMetrics();
  assert.ok(metrics.centralPassageWidth>=4.6);
  assert.equal(metrics.gateIsDownstream,true);
  assert.ok(DUAL_FIELD_LAYOUT.sharedObservationLineZ>DUAL_FIELD_LAYOUT.shelter.z);
  assert.ok(DUAL_FIELD_LAYOUT.downstreamBoundaryZ<DUAL_FIELD_LAYOUT.circle.z);
  assert.equal(Object.isFrozen(DUAL_FIELD_LAYOUT),true);
});
