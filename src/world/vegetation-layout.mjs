export const WIND_PROFILES = Object.freeze({
  fern: Object.freeze({speed: 0.42, amplitude: 0.018, secondary: 0.011}),
  reed: Object.freeze({speed: 0.58, amplitude: 0.027, secondary: 0.016}),
  iris: Object.freeze({speed: 0.49, amplitude: 0.022, secondary: 0.013}),
  groundcover: Object.freeze({speed: 0.31, amplitude: 0.009, secondary: 0.006}),
});

export const VEGETATION_CLUSTERS = Object.freeze([
  {id: 'entry-fern-left', species: 'fern', x: -5.25, z: 29, scale: 0.82, seed: 3, color: 0x71917d},
  {id: 'entry-iris-right', species: 'iris', x: 5.45, z: 25, scale: 0.86, seed: 7, color: 0x739d91},
  {id: 'entry-ground-left', species: 'groundcover', x: -9.35, z: 24, scale: 1.05, seed: 11, color: 0x829777},
  {id: 'bank-reed-right-a', species: 'reed', x: 6.1, z: 18, scale: 0.92, seed: 13, color: 0x789783},
  {id: 'bank-fern-left-a', species: 'fern', x: -5.55, z: 13, scale: 0.95, seed: 17, color: 0x668b78},
  {id: 'bank-ground-right-a', species: 'groundcover', x: 9.5, z: 10, scale: 1.12, seed: 19, color: 0x879d7d},
  {id: 'wallet-iris-left', species: 'iris', x: -5.25, z: 5.6, scale: 0.76, seed: 23, color: 0x789d91},
  {id: 'wallet-fern-right', species: 'fern', x: 5.4, z: -1.8, scale: 0.88, seed: 29, color: 0x6f907c},
  {id: 'middle-reed-left', species: 'reed', x: -6.05, z: -8, scale: 1.02, seed: 31, color: 0x779381},
  {id: 'middle-ground-right', species: 'groundcover', x: 9.75, z: -12, scale: 1.08, seed: 37, color: 0x84997a},
  {id: 'middle-iris-right', species: 'iris', x: 5.55, z: -18, scale: 0.9, seed: 41, color: 0x71998d},
  {id: 'middle-fern-left', species: 'fern', x: -5.7, z: -26, scale: 1.04, seed: 43, color: 0x688976},
  {id: 'far-reed-right', species: 'reed', x: 6.25, z: -33, scale: 1.08, seed: 47, color: 0x748f7e},
  {id: 'far-ground-left', species: 'groundcover', x: -9.8, z: -39, scale: 1.18, seed: 53, color: 0x7f9475},
  {id: 'passage-iris-left', species: 'iris', x: -8.85, z: -49, scale: 0.92, seed: 59, color: 0x749b90},
  {id: 'passage-fern-right', species: 'fern', x: 8.9, z: -54, scale: 1.05, seed: 61, color: 0x698978},
  {id: 'threshold-reed-left-a', species: 'reed', x: -9.55, z: -65, scale: 1.12, seed: 67, color: 0x718d7d},
  {id: 'threshold-ground-right-a', species: 'groundcover', x: 10.05, z: -70, scale: 1.2, seed: 71, color: 0x829778},
  {id: 'threshold-fern-left-b', species: 'fern', x: -9.75, z: -82, scale: 1.08, seed: 73, color: 0x668777},
  {id: 'threshold-iris-right-b', species: 'iris', x: 9.8, z: -91, scale: 0.98, seed: 79, color: 0x70998e},
  {id: 'dual-ground-left', species: 'groundcover', x: -10.15, z: -106, scale: 1.18, seed: 83, color: 0x7f9477},
  {id: 'dual-reed-right', species: 'reed', x: 10.1, z: -109, scale: 1.02, seed: 89, color: 0x748f81},
  {id: 'dual-fern-left', species: 'fern', x: -10.2, z: -126, scale: 1.02, seed: 97, color: 0x688979},
  {id: 'dual-iris-right', species: 'iris', x: 10.15, z: -128, scale: 0.92, seed: 101, color: 0x71988e},
  {id: 'pavilion-ground-left', species: 'groundcover', x: -8.9, z: -139, scale: 1.12, seed: 103, color: 0x879779},
  {id: 'pavilion-fern-right', species: 'fern', x: 8.8, z: -140, scale: 1.05, seed: 107, color: 0x6b8978},
].map((cluster) => Object.freeze({...cluster, collision: false})));

export function vegetationSafetyMetrics() {
  return {
    count: VEGETATION_CLUSTERS.length,
    species: new Set(VEGETATION_CLUSTERS.map(({species}) => species)).size,
    allVisualOnly: VEGETATION_CLUSTERS.every(({collision}) => collision === false),
    insideWorldBounds: VEGETATION_CLUSTERS.every(({x}) => Math.abs(x) <= 11.2),
    mainRouteClear: VEGETATION_CLUSTERS.filter(({z}) => z >= -55).every(({x}) => Math.abs(x) >= 5.2),
    dualFieldClear: VEGETATION_CLUSTERS.filter(({z}) => z <= -103 && z >= -131).every(({x}) => Math.abs(x) >= 10),
  };
}
