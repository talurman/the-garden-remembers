import {DUAL_FIELD_LAYOUT} from './dual-field-layout.mjs';

const clamp01=value=>Math.max(0,Math.min(1,Number(value)||0));
const ENCOUNTERS=Object.freeze(['quiet-shelter','the-circle']);

function senseTarget(player,forward,target){
  const dx=target.x-player.x,dz=target.z-player.z,distance=Math.hypot(dx,dz),forwardLength=Math.max(.001,Math.hypot(forward.x,forward.z));
  const dot=(forward.x*dx+forward.z*dz)/(forwardLength*Math.max(.001,distance));
  const proximity=clamp01((18-distance)/10.5),facing=clamp01((dot-.18)/.8);
  return Object.freeze({distance,proximity,facing,presence:proximity*(.32+facing*.68)});
}

export function senseDualField({player,forward,layout=DUAL_FIELD_LAYOUT}){
  const shelter=senseTarget(player,forward,layout.shelter),circle=senseTarget(player,forward,layout.circle),scores={'quiet-shelter':shelter.presence,'the-circle':circle.presence},facingScores={'quiet-shelter':shelter.facing,'the-circle':circle.facing};
  const ordered=Object.entries(facingScores).sort((a,b)=>b[1]-a[1]),leader=ordered[0],runner=ordered[1],leaderPresence=scores[leader[0]];
  const focused=leader[1]>=.72&&leaderPresence>=.35&&leader[1]-runner[1]>=.13?leader[0]:null;
  return Object.freeze({
    entered:Math.min(shelter.distance,circle.distance)<18,
    focused,
    balanced:focused==null&&Math.max(...Object.values(scores))>=.3,
    shelter,circle,
    scores:Object.freeze(scores)
  });
}

export class DualFieldAttentionTracker{
  constructor({layout=DUAL_FIELD_LAYOUT,gazeDwellMs=950,switchDwellMs=620,approachDistance=7.8,retreatDistance=10}={}){
    this.layout=layout;this.gazeDwellMs=gazeDwellMs;this.switchDwellMs=switchDwellMs;this.approachDistance=approachDistance;this.retreatDistance=retreatDistance;
    this.entered=false;this.enteredAt=null;this.candidate=null;this.candidateAt=null;this.firstSustainedGaze=null;this.firstApproach=null;this.activeAttention=null;this.switches=0;this.approached=new Set();this.retreated=new Set();
  }

  update({now,player,forward}){
    const at=Number(now),sense=senseDualField({player,forward,layout:this.layout}),events=[];
    if(sense.entered&&!this.entered){this.entered=true;this.enteredAt=at;events.push(Object.freeze({kind:'field.entered',at}));}
    if(sense.focused!==this.candidate){this.candidate=sense.focused;this.candidateAt=sense.focused?at:null;}
    if(this.candidate){
      const required=this.activeAttention&&this.activeAttention!==this.candidate?this.switchDwellMs:this.gazeDwellMs,duration=at-this.candidateAt;
      if(duration>=required&&this.activeAttention!==this.candidate){
        if(!this.firstSustainedGaze){this.firstSustainedGaze=this.candidate;events.push(Object.freeze({kind:'attention.first-sustained',encounterId:this.candidate,at,durationMs:duration}));}
        else if(this.activeAttention){this.switches++;events.push(Object.freeze({kind:'attention.switched',from:this.activeAttention,to:this.candidate,at,durationMs:duration,switchIndex:this.switches}));}
        this.activeAttention=this.candidate;this.candidateAt=at;
      }
    }
    for(const encounterId of ENCOUNTERS){
      const sensed=encounterId==='quiet-shelter'?sense.shelter:sense.circle;
      if(sensed.distance<=this.approachDistance&&!this.approached.has(encounterId)){
        this.approached.add(encounterId);this.retreated.delete(encounterId);
        const first=this.firstApproach==null;if(first)this.firstApproach=encounterId;
        events.push(Object.freeze({kind:first?'movement.first-approach':'movement.approached-other',encounterId,at,distance:sensed.distance,timeFromEntryMs:this.enteredAt==null?null:at-this.enteredAt}));
      }else if(sensed.distance>=this.retreatDistance&&this.approached.has(encounterId)&&!this.retreated.has(encounterId)){
        this.retreated.add(encounterId);events.push(Object.freeze({kind:'movement.partial-retreat',encounterId,at,distance:sensed.distance}));
      }
    }
    return Object.freeze({sense,events:Object.freeze(events),snapshot:this.snapshot()});
  }

  snapshot(){return Object.freeze({entered:this.entered,enteredAt:this.enteredAt,firstSustainedGaze:this.firstSustainedGaze,firstApproach:this.firstApproach,activeAttention:this.activeAttention,switches:this.switches,approached:Object.freeze([...this.approached]),retreated:Object.freeze([...this.retreated])});}
}
