const ACTIONS=Object.freeze(['support','reach','water','call']);

function clamp01(value){return Math.max(0,Math.min(1,Number(value)||0))}
function smoothstep(value){const t=clamp01(value);return t*t*(3-2*t)}
function range(progress,start,end){return smoothstep((progress-start)/(end-start))}

export function createQuietShelterSequence(action,startedAt,{timeScale=1}={}){
  if(!ACTIONS.includes(String(action)))throw new Error(`Unsupported quiet shelter sequence: ${action}`);
  if(!Number.isFinite(startedAt))throw new Error('A quiet shelter sequence requires a finite start time.');
  if(!Number.isFinite(timeScale)||timeScale<=0)throw new Error('timeScale must be greater than zero.');
  const canonicalDurationMs=3400;
  return Object.freeze({action:String(action),startedAt,canonicalDurationMs,durationMs:canonicalDurationMs/timeScale,inputLockMs:1120/timeScale,beats:Object.freeze(['attention','cause','response','release','trace'])});
}

export function sampleQuietShelterSequence(timeline,now){
  const elapsedMs=Math.max(0,Number(now)-timeline.startedAt),progress=clamp01(elapsedMs/timeline.durationMs);
  return Object.freeze({
    action:timeline.action,elapsedMs,progress,eased:smoothstep(progress),
    attention:range(progress,0,.27),cause:range(progress,.15,.52),response:range(progress,.32,.72),release:range(progress,.48,.78),trace:range(progress,.62,1),
    inputLocked:elapsedMs<timeline.inputLockMs,complete:elapsedMs>=timeline.durationMs
  });
}
