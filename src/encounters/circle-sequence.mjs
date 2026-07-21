const ACTIONS=Object.freeze(['intervene','join','distract','call']);

function clamp01(value){return Math.max(0,Math.min(1,Number(value)||0))}
function smoothstep(value){const t=clamp01(value);return t*t*(3-2*t)}
function range(progress,start,end){return smoothstep((progress-start)/(end-start))}

export function createCircleSequence(action,startedAt,{timeScale=1}={}){
  if(!ACTIONS.includes(String(action)))throw new Error(`Unsupported circle sequence: ${action}`);
  if(!Number.isFinite(startedAt))throw new Error('A circle sequence requires a finite start time.');
  if(!Number.isFinite(timeScale)||timeScale<=0)throw new Error('timeScale must be greater than zero.');
  const canonicalDurationMs=3600;
  return Object.freeze({
    action:String(action),startedAt,canonicalDurationMs,
    durationMs:canonicalDurationMs/timeScale,inputLockMs:1180/timeScale,
    beats:Object.freeze(['attention','cause','response','release','trace'])
  });
}

export function sampleCircleSequence(timeline,now){
  const elapsedMs=Math.max(0,Number(now)-timeline.startedAt),progress=clamp01(elapsedMs/timeline.durationMs);
  return Object.freeze({
    action:timeline.action,elapsedMs,progress,eased:smoothstep(progress),
    attention:range(progress,0,.24),cause:range(progress,.13,.48),response:range(progress,.3,.7),
    release:range(progress,.5,.79),trace:range(progress,.63,1),
    inputLocked:elapsedMs<timeline.inputLockMs,complete:elapsedMs>=timeline.durationMs
  });
}

export const CIRCLE_SEQUENCE_ACTIONS=ACTIONS;
