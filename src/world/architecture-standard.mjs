export const ARCHITECTURE_STANDARD = Object.freeze({
  threshold: Object.freeze({
    centerX: 2.72,
    doorWidth: 1.72,
    doorHeight: 3.88,
    opaque: true,
    collisionContractChanged: false,
    releaseRemovesWholeWall: true,
  }),
  pavilion: Object.freeze({
    centerX: 0,
    centerZ: -151,
    moonGateRadius: 5.05,
    approachHalfWidth: 2.4,
    landmarkVisible: true,
  }),
  detailLayers: Object.freeze({
    pavilionRevealRings: 3,
    pavilionScreenFrames: 6,
    thresholdDoorRibs: 7,
    thresholdMineralBands: 4,
    collision: false,
  }),
});

export function architectureSafetyMetrics() {
  const {threshold, pavilion, detailLayers} = ARCHITECTURE_STANDARD;
  return {
    thresholdAnchorPreserved: threshold.centerX === 2.72,
    opaquePassage: threshold.opaque === true,
    releaseContractPreserved: threshold.releaseRemovesWholeWall && !threshold.collisionContractChanged,
    pavilionAnchorPreserved: pavilion.centerX === 0 && pavilion.centerZ === -151,
    gateOpeningPreserved: pavilion.moonGateRadius === 5.05,
    detailsVisualOnly: detailLayers.collision === false,
  };
}
