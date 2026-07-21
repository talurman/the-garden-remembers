import {circleBaselineAction,circleRequiresDeparture} from './circle-baseline.mjs';

export class CircleEncounter{
  #history=[];
  #resolvedAction=null;
  #pendingDeparture=false;

  choose(actionId,at=Date.now()){
    const contract=circleBaselineAction(actionId);
    if(this.#resolvedAction)return Object.freeze({accepted:false,reason:'resolved',action:actionId});
    if(this.#pendingDeparture)return Object.freeze({accepted:false,reason:'departure-pending',action:actionId});
    const event=Object.freeze({action:contract.id,at:Number(at),resolutionMode:contract.resolutionMode});
    this.#history.push(event);
    if(circleRequiresDeparture(contract.id))this.#pendingDeparture=true;
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
    const counts={intervene:0,join:0,distract:0,call:0,leave:0};
    this.#history.forEach(event=>counts[event.action]++);
    return Object.freeze({resolved:this.#resolvedAction!=null,resolvedAction:this.#resolvedAction,pendingDeparture:this.#pendingDeparture,counts:Object.freeze(counts),history:Object.freeze([...this.#history])});
  }
}
