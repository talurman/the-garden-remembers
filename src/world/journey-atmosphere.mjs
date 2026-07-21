const clamp01=value=>Math.max(0,Math.min(1,value));
const smooth=value=>{const t=clamp01(value);return t*t*(3-2*t)};

export function sampleJourneyAtmosphere(z,{entryZ=30,gateZ=-150}={}){
  const linear=clamp01((entryZ-Number(z))/(entryZ-gateZ)),progress=smooth(linear);
  return Object.freeze({progress,skyBlend:.58*progress,lightWarmth:.72*progress,treeWarmth:.16*progress,waterWarmth:.34*progress,fogLift:.00115*progress,exposureLift:.055*progress});
}
