function clamp01(value) { return Math.max(0, Math.min(1, value)); }
function smoothstep(value) { const t=clamp01(value); return t*t*(3-2*t); }
function range(progress,start,end){ return smoothstep((progress-start)/(end-start)); }

export function createPigmentPropagation(profile,startedAt,{timeScale=1}={}){
  if(!profile?.propagation?.surfaces?.length)throw new Error('Pigment propagation requires connected surfaces.');
  if(!Number.isFinite(startedAt))throw new Error('Pigment propagation requires a finite start time.');
  if(!Number.isFinite(timeScale)||timeScale<=0)throw new Error('timeScale must be greater than zero.');
  return Object.freeze({
    outcome:profile.outcome,
    originId:profile.propagation.originId,
    palette:profile.palette,
    surfaces:profile.propagation.surfaces,
    startedAt,
    canonicalDurationMs:4300,
    durationMs:4300/timeScale
  });
}

export function samplePigmentPropagation(propagation,now){
  const elapsedMs=Math.max(0,now-propagation.startedAt),progress=clamp01(elapsedMs/propagation.durationMs);
  return Object.freeze({
    progress,
    head:smoothstep(progress),
    surfaces:Object.freeze({
      ground:range(progress,0,.52),
      water:range(progress,.16,.68),
      planting:range(progress,.4,.86),
      paper:range(progress,.68,1)
    }),
    complete:elapsedMs>=propagation.durationMs,
    settledOpacity:.2
  });
}
