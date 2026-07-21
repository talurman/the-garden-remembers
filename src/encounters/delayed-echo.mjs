const clamp01=value=>Math.max(0,Math.min(1,value));
const smooth=value=>{const t=clamp01(value);return t*t*(3-2*t)};
const range=(value,start,end)=>smooth((value-start)/(end-start));

export function createDelayedEcho(profile,startedAt,{timeScale=1}={}){
  if(!profile?.delayed?.echoId||!profile?.delayed?.visualId)throw new Error('A delayed echo requires a defined memory identity.');
  if(!Number.isFinite(startedAt))throw new Error('A delayed echo requires a finite start time.');
  if(!Number.isFinite(timeScale)||timeScale<=0)throw new Error('timeScale must be greater than zero.');
  return Object.freeze({
    outcome:profile.outcome,
    echoId:profile.delayed.echoId,
    visualId:profile.delayed.visualId,
    soundMotifId:profile.delayed.soundMotifId,
    palette:profile.palette,
    frequencies:profile.sound.frequencies,
    locationId:profile.delayed.locationId,
    startedAt,
    canonicalDurationMs:4800,
    durationMs:4800/timeScale
  });
}

export function sampleDelayedEcho(echo,now){
  const elapsedMs=Math.max(0,now-echo.startedAt),progress=clamp01(elapsedMs/echo.durationMs);
  return Object.freeze({
    progress,
    recognition:range(progress,0,.38),
    response:range(progress,.18,.78),
    settling:range(progress,.62,1),
    complete:elapsedMs>=echo.durationMs,
    settledOpacity:.26
  });
}
