export const SURFACE_MATERIAL_STANDARD = Object.freeze({
  textureResolution: 512,
  surfaces: Object.freeze({
    ground: Object.freeze({roughness: 1, bumpScale: 0.018, repeat: [5, 15]}),
    path: Object.freeze({roughness: 0.98, bumpScale: 0.012, repeat: [2, 18]}),
    limestone: Object.freeze({roughness: 0.92, bumpScale: 0.045, repeat: [3, 3]}),
    streambed: Object.freeze({roughness: 1, repeat: [2.4, 16]}),
    water: Object.freeze({opacityMin: 0.36, opacityMax: 0.58, depthWrite: false}),
  }),
  detailLayers: Object.freeze({
    pathEdgeWash: Object.freeze({widthOffset: 0.72, collision: false}),
    visibleStreambed: Object.freeze({widthInset: 0.34, collision: false}),
    stoneMossSeams: Object.freeze({count: 48, collision: false}),
  }),
});

export function surfaceSafetyMetrics() {
  const {detailLayers, surfaces} = SURFACE_MATERIAL_STANDARD;
  return {
    visualOnlyLayers: Object.values(detailLayers).every((layer) => layer.collision === false),
    steppingStoneCount: detailLayers.stoneMossSeams.count,
    translucentWater: surfaces.water.depthWrite === false && surfaces.water.opacityMin < surfaces.water.opacityMax,
    textureResolution: SURFACE_MATERIAL_STANDARD.textureResolution,
  };
}
