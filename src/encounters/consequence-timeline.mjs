function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function smoothstep(value) {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

function rangedProgress(progress, start, end) {
  return smoothstep((progress - start) / (end - start));
}

export function createConsequenceTimeline(profile, startedAt, {timeScale = 1} = {}) {
  if (!profile?.immediate || profile.immediate.beats.length !== 3) {
    throw new Error('A wallet consequence requires exactly three immediate beats.');
  }
  if (!Number.isFinite(startedAt)) throw new Error('A consequence timeline requires a finite start time.');
  if (!Number.isFinite(timeScale) || timeScale <= 0) throw new Error('timeScale must be greater than zero.');

  return Object.freeze({
    action: profile.action,
    outcome: profile.outcome,
    animationId: profile.immediate.animationId,
    beats: profile.immediate.beats,
    startedAt,
    canonicalDurationMs: profile.immediate.durationMs,
    durationMs: profile.immediate.durationMs / timeScale,
    inputLockMs: Math.min(1100, profile.immediate.durationMs * 0.38) / timeScale
  });
}

export function sampleConsequenceTimeline(timeline, now) {
  const elapsedMs = Math.max(0, now - timeline.startedAt);
  const progress = clamp01(elapsedMs / timeline.durationMs);
  return Object.freeze({
    elapsedMs,
    progress,
    eased: smoothstep(progress),
    beatProgress: Object.freeze([
      rangedProgress(progress, 0, 0.38),
      rangedProgress(progress, 0.22, 0.76),
      rangedProgress(progress, 0.58, 1)
    ]),
    inputLocked: elapsedMs < timeline.inputLockMs,
    complete: elapsedMs >= timeline.durationMs
  });
}
