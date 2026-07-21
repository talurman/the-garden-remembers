import {quietShelterBaselineAction,quietShelterRequiresDeparture} from './quiet-shelter-baseline.mjs';

export class QuietShelterEncounter{
  #history=[];
  #resolvedAction=null;
  #pendingDeparture=false;

  choose(actionId,at=Date.now()){
    const contract=quietShelterBaselineAction(actionId);
    if(this.#resolvedAction)return Object.freeze({accepted:false,reason:'resolved',action:actionId});
    if(this.#pendingDeparture)return Object.freeze({accepted:false,reason:'departure-pending',action:actionId});
    const event=Object.freeze({action:contract.id,at:Number(at),resolutionMode:contract.resolutionMode});
    this.#history.push(event);
    if(quietShelterRequiresDeparture(contract.id))this.#pendingDeparture=true;
    else this.#resolvedAction=contract.id;
    return Object.freeze({accepted:true,action:contract.id,resolved:this.#resolvedAction!=null,pendingDeparture:this.#pendingDeparture});
  }

  depart(at=Date.now()){
    if(this.#resolvedAction)return Object.freeze({accepted:false,action:this.#resolvedAction});
    if(!this.#pendingDeparture)this.#history.push(Object.freeze({action:'leave',at:Number(at),resolutionMode:'physical-departure',physical:true}));
    this.#resolvedAction='leave';
    this.#pendingDeparture=false;
    return Object.freeze({accepted:true,action:'leave',resolved:true,physical:true});
  }

  snapshot(){
    const counts={support:0,reach:0,water:0,call:0,leave:0};
    this.#history.forEach(event=>counts[event.action]++);
    return Object.freeze({resolved:this.#resolvedAction!=null,resolvedAction:this.#resolvedAction,pendingDeparture:this.#pendingDeparture,counts:Object.freeze(counts),history:Object.freeze([...this.#history])});
  }
}
