const SURFACES=Object.freeze(['wall','paper','water','planting','canopy']);

const PROFILES=Object.freeze({
  knock:{action:'knock',outcome:'knock-echo',palette:Object.freeze([0xd98771,0xe7bd78,0x77b9ad]),tempo:1.08,sourceId:'door-knocker'},
  listen:{action:'listen',outcome:'listening-echo',palette:Object.freeze([0x536987,0x6fc7bd,0xd8cfaa]),tempo:.78,sourceId:'paper-door'},
  call:{action:'call',outcome:'call-echo',palette:Object.freeze([0xe5bd6d,0x526582,0x83c9bd]),tempo:.94,sourceId:'call-point'},
  leave:{action:'leave',outcome:'departure-echo',palette:Object.freeze([0x829a83,0xd9d2bd,0x73b8ad]),tempo:.68,sourceId:'threshold-path'}
});

export function thresholdMemoryProfile(action,history=[]){
  const base=PROFILES[String(action)];if(!base)throw new Error(`Unknown threshold memory action: ${action}`);
  const investigations=history.filter(event=>event.action==='knock'||event.action==='listen');
  const modifier=investigations.length>1?(new Set(investigations.map(event=>event.action)).size>1?'layered':'repeated'):'single';
  return Object.freeze({...base,palette:base.palette,propagation:Object.freeze({originId:base.sourceId,surfaces:SURFACES}),delayed:Object.freeze({echoId:`threshold-${base.action}-echo`,visualId:`threshold-${base.action}-canopy`,soundMotifId:`threshold-${base.action}-motif`,locationId:'threshold-downstream'}),sound:Object.freeze({frequencies:Object.freeze(base.action==='knock'?[126,189,252]:base.action==='listen'?[174,261,348]:base.action==='call'?[294,440,587]:[147,220,294])}),modifier});
}

export const THRESHOLD_MEMORY_ACTIONS=Object.freeze(Object.keys(PROFILES));
