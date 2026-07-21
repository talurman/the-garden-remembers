const SURFACES=Object.freeze(['cloth','shelter','water','path','planting','downstream-paper','moon-gate']);
export const QUIET_SHELTER_MEMORY_LAYER_WEIGHTS=Object.freeze({
  local:.34,
  path:.28,
  downstream:.22,
  moonGate:.18,
  returnRecognition:.16
});

const PROFILES=Object.freeze({
  support:{action:'support',outcome:'shared-presence',palette:Object.freeze([0x91aec4,0xefe4ce]),tempo:.72,visualId:'paired-rhythms',frequencies:Object.freeze([196,246.94,329.63])},
  reach:{action:'reach',outcome:'offered-contact',palette:Object.freeze([0xd78876,0x526582]),tempo:.86,visualId:'open-fold',frequencies:Object.freeze([220,293.66,392])},
  water:{action:'water',outcome:'water-placed',palette:Object.freeze([0x53c4b8,0xd6b36f]),tempo:.8,visualId:'mineral-bloom',frequencies:Object.freeze([261.63,392,523.25])},
  call:{action:'call',outcome:'outside-signal',palette:Object.freeze([0x536987,0xe5bd72]),tempo:.94,visualId:'paired-signal',frequencies:Object.freeze([174.61,349.23,523.25])},
  leave:{action:'leave',outcome:'space-preserved',palette:Object.freeze([0x8fa38b,0xeee5d2]),tempo:.62,visualId:'closed-paper',frequencies:Object.freeze([146.83,220,293.66])}
});

const clamp01=value=>Math.max(0,Math.min(1,Number(value)||0));
const smooth=value=>{const t=clamp01(value);return t*t*(3-2*t)};
const range=(value,start,end)=>smooth((value-start)/(end-start));

export function quietShelterMemoryProfile(action){
  const profile=PROFILES[String(action)];
  if(!profile)throw new Error(`Unknown quiet shelter memory action: ${action}`);
  return Object.freeze({...profile,propagation:Object.freeze({originId:'quiet-shelter',surfaces:SURFACES}),delayed:Object.freeze({echoId:`shelter-${profile.action}-echo`,visualId:profile.visualId,locationId:'path-to-moon-gate'}),sound:Object.freeze({frequencies:profile.frequencies})});
}

export function createQuietShelterMemory(action,startedAt,{timeScale=1}={}){
  const profile=quietShelterMemoryProfile(action);
  if(!Number.isFinite(startedAt))throw new Error('Quiet shelter memory requires a finite start time.');
  if(!Number.isFinite(timeScale)||timeScale<=0)throw new Error('timeScale must be greater than zero.');
  return Object.freeze({profile,startedAt,canonicalDurationMs:6200,durationMs:6200/timeScale});
}

export function sampleQuietShelterMemory(memory,now){
  const elapsedMs=Math.max(0,Number(now)-memory.startedAt),progress=clamp01(elapsedMs/memory.durationMs);
  return Object.freeze({
    progress,
    surfaces:Object.freeze({
      cloth:range(progress,0,.3),shelter:range(progress,.06,.4),water:range(progress,.16,.52),path:range(progress,.28,.66),planting:range(progress,.4,.78),downstreamPaper:range(progress,.54,.9),moonGate:range(progress,.7,1)
    }),
    complete:elapsedMs>=memory.durationMs,settledOpacity:.22
  });
}

export function createQuietShelterReturn(action,startedAt,{timeScale=1}={}){
  const profile=quietShelterMemoryProfile(action);
  if(!Number.isFinite(startedAt))throw new Error('Quiet shelter return requires a finite start time.');
  if(!Number.isFinite(timeScale)||timeScale<=0)throw new Error('timeScale must be greater than zero.');
  return Object.freeze({action:profile.action,visualId:profile.visualId,startedAt,canonicalDurationMs:2600,durationMs:2600/timeScale});
}

export function sampleQuietShelterReturn(memory,now){
  const progress=clamp01((Math.max(0,Number(now)-memory.startedAt))/memory.durationMs);
  const arrival=range(progress,0,.3),recognition=range(progress,.12,.58),settling=range(progress,.48,1);
  return Object.freeze({progress,arrival,recognition:recognition*(1-settling*.72),settling,complete:progress>=1});
}

export const QUIET_SHELTER_MEMORY_ACTIONS=Object.freeze(Object.keys(PROFILES));
