function deepFreeze(value){
  if(value==null||typeof value!=='object'||Object.isFrozen(value))return value;
  for(const child of Object.values(value))deepFreeze(child);
  return Object.freeze(value);
}

const ACTIONS=deepFreeze({
  support:{
    id:'support',legacyActionId:'help',terminal:true,repeatable:false,resolutionMode:'physical-sequence',
    originalIntent:'Remain nearby and offer quiet presence.',subjectId:'seated-person'
  },
  reach:{
    id:'reach',legacyActionId:'touch',terminal:true,repeatable:false,resolutionMode:'physical-sequence',
    originalIntent:'Offer a restrained hand gesture without assuming contact.',subjectId:'seated-person'
  },
  water:{
    id:'water',legacyActionId:'water',terminal:true,repeatable:false,resolutionMode:'physical-sequence',
    originalIntent:'Place the existing water vessel within reach.',subjectId:'water-vessel'
  },
  call:{
    id:'call',legacyActionId:'call',terminal:true,repeatable:false,resolutionMode:'physical-sequence',
    originalIntent:'Use the nearby call point and receive an acknowledgement.',subjectId:'shelter-call-point'
  },
  leave:{
    id:'leave',legacyActionId:'leave',terminal:true,repeatable:false,resolutionMode:'physical-departure',
    originalIntent:'Continue along the path and preserve distance.',subjectId:'shelter-path'
  }
});

export const QUIET_SHELTER_BASELINE_ACTIONS=Object.freeze(Object.keys(ACTIONS));
export const QUIET_SHELTER_LEGACY_ACTION_IDS=Object.freeze(QUIET_SHELTER_BASELINE_ACTIONS.map(id=>ACTIONS[id].legacyActionId));

export const QUIET_SHELTER_FACTUAL_OBSERVATIONS=Object.freeze([
  'location.entered','location.exited','movement.approached','movement.retreated','movement.still',
  'attention.oriented','interaction.started','interaction.interrupted','interaction.completed',
  'object.placed','environment.contact'
]);

export function quietShelterBaselineAction(actionId){
  const action=ACTIONS[String(actionId)];
  if(!action)throw new Error(`Unknown quiet shelter action: ${actionId}`);
  return action;
}

export function quietShelterActionFromLegacy(legacyActionId){
  const action=Object.values(ACTIONS).find(candidate=>candidate.legacyActionId===String(legacyActionId));
  if(!action)throw new Error(`Unknown legacy quiet shelter action: ${legacyActionId}`);
  return action;
}

export function quietShelterRequiresDeparture(actionId){
  return quietShelterBaselineAction(actionId).resolutionMode==='physical-departure';
}
