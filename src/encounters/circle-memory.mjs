const SURFACES=Object.freeze(['cloth','court','water','path','planting','paper','moon-gate']);
const PROFILES=Object.freeze({
  intervene:{action:'intervene',outcome:'asymmetric-opening',palette:Object.freeze([0x69aaa3,0xeee5d2]),tempo:.8,visualId:'opened-spacing',frequencies:Object.freeze([196,261.63,329.63])},
  join:{action:'join',outcome:'compressed-shadow',palette:Object.freeze([0x66758d,0x91a38c]),tempo:.7,visualId:'nested-folds',frequencies:Object.freeze([174.61,220,277.18])},
  distract:{action:'distract',outcome:'outward-attention',palette:Object.freeze([0xd58d73,0xe2bd75]),tempo:.9,visualId:'outward-turn',frequencies:Object.freeze([220,293.66,392])},
  call:{action:'call',outcome:'warm-bridge',palette:Object.freeze([0xe0b66f,0x71aaa2]),tempo:.84,visualId:'reflected-path',frequencies:Object.freeze([246.94,329.63,440])},
  leave:{action:'leave',outcome:'open-passage',palette:Object.freeze([0x91a38c,0xeee7d7]),tempo:.62,visualId:'unoccupied-line',frequencies:Object.freeze([146.83,220,293.66])}
});
const clamp01=value=>Math.max(0,Math.min(1,Number(value)||0));
const smooth=value=>{const t=clamp01(value);return t*t*(3-2*t)};
const range=(value,start,end)=>smooth((value-start)/(end-start));

export function circleMemoryProfile(action){
  const profile=PROFILES[String(action)];
  if(!profile)throw new Error(`Unknown circle memory action: ${action}`);
  return Object.freeze({...profile,propagation:Object.freeze({originId:'the-circle',surfaces:SURFACES}),delayed:Object.freeze({echoId:`circle-${profile.action}-echo`,visualId:profile.visualId,locationId:'path-to-moon-gate'}),sound:Object.freeze({frequencies:profile.frequencies})});
}
export function createCircleMemory(action,startedAt,{timeScale=1}={}){
  const profile=circleMemoryProfile(action);
  if(!Number.isFinite(startedAt))throw new Error('Circle memory requires a finite start time.');
  if(!Number.isFinite(timeScale)||timeScale<=0)throw new Error('timeScale must be greater than zero.');
  return Object.freeze({profile,startedAt,canonicalDurationMs:6500,durationMs:6500/timeScale});
}
export function sampleCircleMemory(memory,now){
  const elapsedMs=Math.max(0,Number(now)-memory.startedAt),progress=clamp01(elapsedMs/memory.durationMs);
  return Object.freeze({progress,surfaces:Object.freeze({
    cloth:range(progress,0,.28),court:range(progress,.05,.38),water:range(progress,.14,.5),path:range(progress,.26,.64),planting:range(progress,.39,.77),paper:range(progress,.52,.89),moonGate:range(progress,.69,1)
  }),complete:elapsedMs>=memory.durationMs,settledOpacity:.22});
}
export function createCircleReturn(action,startedAt,{timeScale=1}={}){
  const profile=circleMemoryProfile(action);
  if(!Number.isFinite(startedAt))throw new Error('Circle return requires a finite start time.');
  if(!Number.isFinite(timeScale)||timeScale<=0)throw new Error('timeScale must be greater than zero.');
  return Object.freeze({action:profile.action,visualId:profile.visualId,startedAt,canonicalDurationMs:2700,durationMs:2700/timeScale});
}
export function sampleCircleReturn(memory,now){
  const progress=clamp01(Math.max(0,Number(now)-memory.startedAt)/memory.durationMs),arrival=range(progress,0,.3),recognition=range(progress,.12,.6),settling=range(progress,.5,1);
  return Object.freeze({progress,arrival,recognition:recognition*(1-settling*.72),settling,complete:progress>=1});
}
export const CIRCLE_MEMORY_ACTIONS=Object.freeze(Object.keys(PROFILES));
