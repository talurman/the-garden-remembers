export class EncounterResponseRouter {
  #handlers = new Map();

  register(encounterId, handler) {
    const id = String(encounterId);
    if (!id) throw new TypeError('Encounter response handlers require an encounter id.');
    if (typeof handler !== 'function') throw new TypeError('Encounter response handlers must be functions.');
    if (this.#handlers.has(id)) throw new Error(`Encounter response handler already registered: ${id}`);
    this.#handlers.set(id, handler);
    return () => this.#handlers.delete(id);
  }

  route(change) {
    if (!change?.encounterId) return false;
    const handler = this.#handlers.get(String(change.encounterId));
    if (!handler) return false;
    handler(change);
    return true;
  }

  has(encounterId) {
    return this.#handlers.has(String(encounterId));
  }
}

