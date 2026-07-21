const clamp01=value=>Math.max(0,Math.min(1,Number(value)||0));
const smooth=value=>{const t=clamp01(value);return t*t*(3-2*t)};

export const EXPERIENCE_PROGRESSION=Object.freeze({
  phases:Object.freeze([
    Object.freeze({id:'first-light',palette:'ivory-sage-mist',minimum:.00}),
    Object.freeze({id:'pigment-awakening',palette:'turquoise-coral',minimum:.18}),
    Object.freeze({id:'warm-release',palette:'gold-peach-indigo',minimum:.48}),
    Object.freeze({id:'remembered-garden',palette:'luminous-sunset',minimum:.78})
  ]),
  responseSurfaces:Object.freeze(['sky','fog','water','path-pigment','planting','paper','pavilion']),
  soundSources:Object.freeze(['shallow-water','fabric','bamboo','wind','distant-resonance']),
  safety:Object.freeze({darkPhase:false,graphicBeaconRings:false,interactionGeometryChanged:false,collisionsAdded:0})
});

export function sampleExperienceProgression({journey=0,memory=0,time=0,reducedMotion=false}={}){
  const spatial=smooth(journey),remembered=smooth(memory),combined=clamp01(spatial*.62+remembered*.52);
  const phase=[...EXPERIENCE_PROGRESSION.phases].reverse().find(item=>combined>=item.minimum)||EXPERIENCE_PROGRESSION.phases[0];
  const breath=(reducedMotion?.22:1)*(Math.sin(Number(time)*.16)*.5+.5);
  return Object.freeze({
    phase:phase.id,combined,
    skyWarmth:clamp01(spatial*.7+remembered*.32),
    pigmentStrength:clamp01(remembered*.88+spatial*.18),
    foliageWarmth:clamp01(spatial*.42+remembered*.24),
    paperGlow:clamp01(spatial*.34+remembered*.55),
    pavilionWarmth:clamp01(Math.max(0,(spatial-.62)/.38)+remembered*.24),
    atmosphericBreath:breath
  });
}
