export class MemoryDirector {
  #log;
  #state;
  #queue = [];
  #scheduled = new Set();
  #visitedLocations = new Set();
  #convergenceScheduled = false;
  #delays;

  constructor({observationLog, memoryState, snapshot = null, delays = {}}) {
    this.#log = observationLog;
    this.#state = memoryState;
    this.#delays = {immediate:180, delayed:12000, return:250, convergent:900, ...delays};
    if (snapshot != null) this.#restore(snapshot);
  }

  #restore(snapshot) {
    if (snapshot.schemaVersion !== 1 || !Array.isArray(snapshot.queue)) throw new Error('Unsupported memory-director data');
    this.#queue = snapshot.queue.filter(item =>
      item && item.id && Number.isFinite(item.dueAt) &&
      Array.isArray(item.triggerEventIds) && item.triggerEventIds.every(id => this.#log.findById(id))
    ).map(item => structuredClone(item)).sort((a,b) => a.dueAt - b.dueAt);
    this.#scheduled = new Set(Array.isArray(snapshot.scheduled) ? snapshot.scheduled.map(String) : []);
    this.#visitedLocations = new Set(Array.isArray(snapshot.visitedLocations) ? snapshot.visitedLocations.map(String) : []);
    this.#convergenceScheduled = Boolean(snapshot.convergenceScheduled) || [...this.#scheduled].some(id => id.includes(':paper_convergence:'));
  }

  observe(event) {
    this.#state.observe(event);
    if (event.type === 'environment.contact') {
      this.#schedule(event, 'immediate', this.#delays.immediate, event.locationId ?? 'path', 'pigment_echo');
    }
    if (event.type === 'location.entered' && event.locationId) {
      const priorVisits = this.#state.location(event.locationId)?.visits ?? 0;
      this.#visitedLocations.add(event.locationId);
      if (priorVisits > 1) this.#schedule(event, 'return', this.#delays.return, event.locationId, 'return_recognition');
      if (this.#visitedLocations.size >= 3 && !this.#convergenceScheduled) {
        this.#convergenceScheduled = true;
        this.#schedule(event, 'convergent', this.#delays.convergent, 'pavilion', 'paper_convergence');
      }
    }
    if (event.type === 'location.exited' && event.locationId) {
      this.#schedule(event, 'delayed', this.#delays.delayed, `${event.locationId}:downstream`, 'planting_echo');
    }
  }

  #schedule(event, layer, delayMs, targetId, kind) {
    const id = `${layer}:${kind}:${event.id}`;
    if (this.#scheduled.has(id)) return;
    this.#scheduled.add(id);
    const encounterId = event.metadata?.encounterId == null ? null : String(event.metadata.encounterId);
    const profileId = event.metadata?.profileId == null ? null : String(event.metadata.profileId);
    this.#queue.push({id, layer, dueAt: event.occurredAt + delayMs, targetId, kind, encounterId, profileId, triggerEventIds: [event.id]});
    this.#queue.sort((a, b) => a.dueAt - b.dueAt);
  }

  tick(now = Date.now()) {
    const due = [];
    while (this.#queue.length && this.#queue[0].dueAt <= now) {
      const response = this.#queue.shift();
      const change = this.#state.rememberWorldChange({...response, state: {intensity: 1}, visible: true});
      due.push(change);
    }
    return due;
  }

  pending() { return this.#queue.map(item => structuredClone(item)); }

  toJSON() {
    return {
      schemaVersion: 1,
      queue: this.pending(),
      scheduled: [...this.#scheduled],
      visitedLocations: [...this.#visitedLocations],
      convergenceScheduled: this.#convergenceScheduled
    };
  }
}
