const clamp01=value=>Math.max(0,Math.min(1,value));
const smooth=value=>{const t=clamp01(value);return t*t*(3-2*t)};

export function createThresholdRelease(startedAt,{timeScale=1}={}){
  if(!Number.isFinite(startedAt))throw new Error('Threshold release requires a finite start time.');
  if(!Number.isFinite(timeScale)||timeScale<=0)throw new Error('timeScale must be greater than zero.');
  return Object.freeze({startedAt,canonicalDurationMs:2600,durationMs:2600/timeScale});
}

export function sampleThresholdRelease(release,now){
  const elapsed=Math.max(0,now-release.startedAt),linear=clamp01(elapsed/release.durationMs),progress=smooth(linear);
  return Object.freeze({progress,door:progress,breath:linear>=1?0:Math.sin(linear*Math.PI),passageOpen:progress>=.48,complete:linear>=1});
}
