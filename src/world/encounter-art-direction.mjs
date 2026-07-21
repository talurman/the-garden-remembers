const clamp01=value=>Math.max(0,Math.min(1,Number(value)||0));
const smooth=value=>{const t=clamp01(value);return t*t*(3-2*t)};

export const ENCOUNTER_ART_DIRECTION=Object.freeze({
  wallet:Object.freeze({
    silhouette:'five-petal clearing',material:'leather + pinned paper',motion:'outward pigment release',memory:'coral thread',primary:0xd9826c,secondary:0x55bdb4
  }),
  threshold:Object.freeze({
    silhouette:'compressed vertical seam',material:'paper + aged metal',motion:'inhale then open',memory:'gold resonance',primary:0xe2b86f,secondary:0x6785a2
  }),
  shelter:Object.freeze({
    silhouette:'low protective canopy',material:'textile + still water',motion:'shared breath',memory:'turquoise hollow',primary:0x74b7ad,secondary:0xe7c99e
  }),
  circle:Object.freeze({
    silhouette:'broken social ring',material:'stone + translucent cloth',motion:'orbit then re-space',memory:'coral interval',primary:0xcf806b,secondary:0x6da9a2
  })
});

export function worldMemoryLevel(resolved={}){
  const keys=['wallet','threshold','shelter','circle'];
  return keys.reduce((total,key)=>total+(resolved[key]?1:0),0)/keys.length;
}

export function sampleEncounterArtDirection({distance=Infinity,resolved=false,time=0}={}){
  const proximity=smooth(1-clamp01((distance-2.4)/10.5));
  const memory=resolved?1:0;
  const breath=(Math.sin(time*.82)*.5+.5);
  return Object.freeze({
    proximity,
    memory,
    visibility:.09+proximity*.42+memory*.2,
    light:.18+proximity*1.35+memory*.78,
    scale:.92+proximity*.055+memory*.035+breath*.012*(.25+proximity),
    drift:(breath-.5)*(.035+proximity*.045),
    pulse:.16+breath*(.18+proximity*.28)+memory*.16
  });
}
