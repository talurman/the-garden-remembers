const LAYERS = new Set(['immediate', 'delayed', 'return', 'convergent']);

export class MemoryState {
  #log;
  #locations = new Map();
  #worldChanges = new Map();

  constructor(observationLog) {
    if (!observationLog?.findById) throw new TypeError('MemoryState requires an ObservationLog');
    this.#log = observationLog;
  }

  observe(event) {
    if (!event?.id || !this.#log.findById(event.id)) throw new Error('MemoryState only accepts recorded observations');
    if (!event.locationId) return;
    const current = this.#locations.get(event.locationId) ?? {
      visits: 0, approaches: 0, retreats: 0, backtracks: 0, stillnessMs: 0,
      firstEnteredAt: null, lastEnteredAt: null, lastExitedAt: null
    };
    if (event.type === 'location.entered') {
      current.visits += 1;
      current.firstEnteredAt ??= event.occurredAt;
      current.lastEnteredAt = event.occurredAt;
    }
    if (event.type === 'location.exited') current.lastExitedAt = event.occurredAt;
    if (event.type === 'movement.approached') current.approaches += 1;
    if (event.type === 'movement.retreated') current.retreats += 1;
    if (event.type === 'movement.backtracked') current.backtracks += 1;
    if (event.type === 'movement.still') current.stillnessMs += event.durationMs ?? 0;
    this.#locations.set(event.locationId, current);
  }

  location(id) {
    const value = this.#locations.get(String(id));
    return value ? structuredClone(value) : null;
  }

  rememberWorldChange({id, layer, targetId, kind, encounterId = null, profileId = null, triggerEventIds, state, visible = false}) {
    if (!id || !targetId || !kind) throw new Error('World changes require id, targetId and kind');
    if (!LAYERS.has(layer)) throw new Error(`Unknown memory layer: ${layer}`);
    if (!Array.isArray(triggerEventIds) || !triggerEventIds.length) throw new Error('World changes require factual triggers');
    for (const eventId of triggerEventIds) {
      if (!this.#log.findById(eventId)) throw new Error(`Unknown trigger observation: ${eventId}`);
    }
    const change = Object.freeze({
      id: String(id), layer, targetId: String(targetId), kind: String(kind),
      encounterId: encounterId == null ? null : String(encounterId),
      profileId: profileId == null ? null : String(profileId),
      triggerEventIds: Object.freeze(triggerEventIds.map(String)),
      state: structuredClone(state ?? {}), visible: Boolean(visible)
    });
    this.#worldChanges.set(change.id, change);
    return change;
  }

  reveal(id) {
    const change = this.#worldChanges.get(String(id));
    if (!change) return null;
    const revealed = Object.freeze({...change, visible: true});
    this.#worldChanges.set(revealed.id, revealed);
    return revealed;
  }

  visibleChanges() { return [...this.#worldChanges.values()].filter(change => change.visible); }
  allChanges() { return [...this.#worldChanges.values()]; }

  toJSON() {
    return {schemaVersion: 1, worldChanges: this.allChanges().map(change => structuredClone(change))};
  }

  static fromJSON(observationLog, data) {
    const state = new MemoryState(observationLog);
    for (const event of observationLog.all()) state.observe(event);
    if (data == null) return state;
    if (data.schemaVersion !== 1 || !Array.isArray(data.worldChanges)) throw new Error('Unsupported memory-state data');
    for (const saved of data.worldChanges) {
      const change = state.rememberWorldChange({...saved, visible:false});
      if (saved.visible) state.reveal(change.id);
    }
    return state;
  }
}

export const memoryLayers = Object.freeze([...LAYERS]);
