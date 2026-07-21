const FORBIDDEN_KEY = /(personality|trait|diagnos|empathy|anxiety|courage|selfish|score|value_rank|psych)/i;

const VALID_TYPES = new Set([
  'session.started', 'session.ended',
  'location.entered', 'location.exited', 'location.passed', 'location.revisited',
  'movement.approached', 'movement.retreated', 'movement.backtracked', 'movement.still',
  'attention.oriented', 'attention.looked',
  'object.picked_up', 'object.placed', 'object.abandoned',
  'character.distance_changed',
  'interaction.started', 'interaction.interrupted', 'interaction.completed',
  'environment.contact', 'threshold.crossed'
]);

function assertPlainObject(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError(`${label} must be a plain object`);
  }
}

function cloneFactual(value, path = 'metadata') {
  if (value == null || ['string', 'number', 'boolean'].includes(typeof value)) return value;
  if (Array.isArray(value)) return value.map((item, index) => cloneFactual(item, `${path}[${index}]`));
  assertPlainObject(value, path);
  const result = {};
  for (const [key, child] of Object.entries(value)) {
    if (FORBIDDEN_KEY.test(key)) throw new Error(`Inference-like field is not allowed: ${path}.${key}`);
    result[key] = cloneFactual(child, `${path}.${key}`);
  }
  return result;
}

function deepFreeze(value) {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  Object.freeze(value);
  for (const child of Object.values(value)) deepFreeze(child);
  return value;
}

function normalizePosition(position) {
  if (position == null) return null;
  assertPlainObject(position, 'position');
  const x = Number(position.x);
  const z = Number(position.z);
  if (!Number.isFinite(x) || !Number.isFinite(z)) throw new TypeError('position requires finite x and z');
  return Object.freeze({x, z});
}

export class ObservationLog {
  #events = [];
  #sequence = 0;
  #clock;

  constructor({clock = () => Date.now()} = {}) {
    this.#clock = clock;
  }

  append(input) {
    assertPlainObject(input, 'observation');
    if (!VALID_TYPES.has(input.type)) throw new Error(`Unknown factual event type: ${input.type}`);
    const occurredAt = Number(input.occurredAt ?? this.#clock());
    if (!Number.isFinite(occurredAt)) throw new TypeError('occurredAt must be finite');
    const durationMs = input.durationMs == null ? null : Math.max(0, Number(input.durationMs));
    if (durationMs != null && !Number.isFinite(durationMs)) throw new TypeError('durationMs must be finite');

    const event = Object.freeze({
      id: `obs-${String(++this.#sequence).padStart(6, '0')}`,
      type: input.type,
      occurredAt,
      locationId: input.locationId == null ? null : String(input.locationId),
      subjectId: input.subjectId == null ? null : String(input.subjectId),
      position: normalizePosition(input.position),
      durationMs,
      metadata: deepFreeze(cloneFactual(input.metadata ?? {}))
    });
    this.#events.push(event);
    return event;
  }

  all() { return this.#events.slice(); }
  findById(id) { return this.#events.find(event => event.id === id) ?? null; }
  query({type, locationId, subjectId} = {}) {
    return this.#events.filter(event =>
      (!type || event.type === type) &&
      (!locationId || event.locationId === locationId) &&
      (!subjectId || event.subjectId === subjectId)
    );
  }

  toJSON() { return {schemaVersion: 1, sequence: this.#sequence, events: this.all()}; }

  static fromJSON(data, options) {
    assertPlainObject(data, 'observation data');
    if (data.schemaVersion !== 1 || !Array.isArray(data.events)) throw new Error('Unsupported observation data');
    const log = new ObservationLog(options);
    for (const saved of data.events) log.append(saved);
    return log;
  }
}

export const factualEventTypes = Object.freeze([...VALID_TYPES]);
