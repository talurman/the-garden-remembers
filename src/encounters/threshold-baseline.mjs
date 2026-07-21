function deepFreeze(value) {
  if (value == null || typeof value !== 'object' || Object.isFrozen(value)) return value;
  for (const child of Object.values(value)) deepFreeze(child);
  return Object.freeze(value);
}

const ACTIONS = deepFreeze({
  knock: {
    id: 'knock',
    legacyActionId: 'knock',
    terminal: false,
    repeatable: true,
    originalResult: 'Return control near the door after the knock sequence.'
  },
  listen: {
    id: 'listen',
    legacyActionId: 'listen',
    terminal: false,
    repeatable: true,
    originalResult: 'Open the sound briefly, then return control near the door.'
  },
  call: {
    id: 'call',
    legacyActionId: 'call',
    terminal: true,
    repeatable: false,
    originalResult: 'Resolve the local encounter after the call sequence.'
  },
  leave: {
    id: 'leave',
    legacyActionId: 'ignore',
    terminal: true,
    repeatable: false,
    originalResult: 'Resolve the local encounter by departing.'
  }
});

export const THRESHOLD_BASELINE_ACTIONS = Object.freeze(Object.keys(ACTIONS));
export const THRESHOLD_LEGACY_ACTION_IDS = Object.freeze(
  THRESHOLD_BASELINE_ACTIONS.map(actionId => ACTIONS[actionId].legacyActionId)
);

export function thresholdBaselineAction(actionId) {
  const action = ACTIONS[String(actionId)];
  if (!action) throw new Error(`Unknown threshold action: ${actionId}`);
  return action;
}

export function thresholdActionFromLegacy(legacyActionId) {
  const action = Object.values(ACTIONS).find(candidate => candidate.legacyActionId === String(legacyActionId));
  if (!action) throw new Error(`Unknown legacy threshold action: ${legacyActionId}`);
  return action;
}

export function thresholdActionIsTerminal(actionId) {
  return thresholdBaselineAction(actionId).terminal;
}

export function thresholdActionIsRepeatable(actionId) {
  return thresholdBaselineAction(actionId).repeatable;
}
