import {thresholdBaselineAction} from './threshold-baseline.mjs';

export class ThresholdEncounter {
  #history = [];
  #resolvedAction = null;
  #pendingDeparture = false;

  choose(actionId, at = Date.now()) {
    const contract = thresholdBaselineAction(actionId);
    if (this.#resolvedAction) return Object.freeze({accepted:false, reason:'resolved', action:actionId});
    const event = Object.freeze({action:contract.id, at:Number(at), terminal:contract.terminal});
    this.#history.push(event);
    if (contract.id === 'leave') this.#pendingDeparture = true;
    if (contract.id === 'call') this.#resolvedAction = 'call';
    return Object.freeze({accepted:true, action:contract.id, terminal:contract.terminal, pendingDeparture:this.#pendingDeparture});
  }

  depart(at = Date.now()) {
    if (this.#resolvedAction) return Object.freeze({accepted:false, action:this.#resolvedAction});
    const wasPending = this.#pendingDeparture;
    this.#resolvedAction = 'leave';
    this.#pendingDeparture = false;
    if (!wasPending) this.#history.push(Object.freeze({action:'leave', at:Number(at), terminal:true, physical:true}));
    return Object.freeze({accepted:true, action:'leave', terminal:true, physical:true});
  }

  snapshot() {
    const counts = {knock:0,listen:0,call:0,leave:0};
    this.#history.forEach(event => counts[event.action]++);
    return Object.freeze({resolved:this.#resolvedAction != null,resolvedAction:this.#resolvedAction,pendingDeparture:this.#pendingDeparture,counts:Object.freeze(counts),history:Object.freeze([...this.#history])});
  }
}
