function deepFreeze(value){
  if(value==null||typeof value!=='object'||Object.isFrozen(value))return value;
  for(const child of Object.values(value))deepFreeze(child);
  return Object.freeze(value);
}

const ACTIONS=deepFreeze({
  intervene:{
    id:'intervene',legacyActionId:'intervene',terminal:true,repeatable:false,resolutionMode:'physical-sequence',
    originalIntent:'Enter the space between the surrounding figures and the center.',subjectId:'social-boundary'
  },
  join:{
    id:'join',legacyActionId:'join',terminal:true,repeatable:false,resolutionMode:'physical-sequence',
    originalIntent:'Take an open position aligned with the surrounding figures.',subjectId:'open-ring-position'
  },
  distract:{
    id:'distract',legacyActionId:'distract',terminal:true,repeatable:false,resolutionMode:'physical-sequence',
    originalIntent:'Create a nearby physical cue that redirects surrounding attention.',subjectId:'attention-cue'
  },
  call:{
    id:'call',legacyActionId:'call',terminal:true,repeatable:false,resolutionMode:'physical-sequence',
    originalIntent:'Direct a voice and open-hand gesture toward the figure in the center.',subjectId:'central-figure'
  },
  leave:{
    id:'leave',legacyActionId:'leave',terminal:true,repeatable:false,resolutionMode:'physical-departure',
    originalIntent:'Continue along the central route without entering the ring.',subjectId:'shared-path'
  }
});

export const CIRCLE_BASELINE_ACTIONS=Object.freeze(Object.keys(ACTIONS));
export const CIRCLE_LEGACY_ACTION_IDS=Object.freeze(CIRCLE_BASELINE_ACTIONS.map(id=>ACTIONS[id].legacyActionId));

export const CIRCLE_FACTUAL_OBSERVATIONS=Object.freeze([
  'location.entered','location.exited','location.passed','location.revisited',
  'movement.approached','movement.retreated','movement.backtracked','movement.still',
  'attention.oriented','attention.looked','interaction.started','interaction.interrupted',
  'interaction.completed','environment.contact'
]);

export function circleBaselineAction(actionId){
  const action=ACTIONS[String(actionId)];
  if(!action)throw new Error(`Unknown circle action: ${actionId}`);
  return action;
}

export function circleActionFromLegacy(legacyActionId){
  const action=Object.values(ACTIONS).find(candidate=>candidate.legacyActionId===String(legacyActionId));
  if(!action)throw new Error(`Unknown legacy circle action: ${legacyActionId}`);
  return action;
}

export function circleRequiresDeparture(actionId){
  return circleBaselineAction(actionId).resolutionMode==='physical-departure';
}
