function clamp01(value) {
  return Math.max(0, Math.min(1, Number(value) || 0));
}

function planarVector(from, to) {
  const x = Number(to.x) - Number(from.x);
  const z = Number(to.z) - Number(from.z);
  const distance = Math.hypot(x, z);
  return {x, z, distance};
}

export function senseThreshold({player, forward, target, farDistance = 24, nearDistance = 3.2}) {
  const toTarget = planarVector(player, target);
  const range = Math.max(.001, farDistance - nearDistance);
  const proximity = clamp01((farDistance - toTarget.distance) / range);
  const forwardLength = Math.max(.001, Math.hypot(Number(forward.x), Number(forward.z)));
  const directionLength = Math.max(.001, toTarget.distance);
  const dot = (Number(forward.x) * toTarget.x + Number(forward.z) * toTarget.z) / (forwardLength * directionLength);
  const facing = clamp01((dot - .18) / .78);
  const response = proximity * (.28 + facing * .72);
  return Object.freeze({
    distance: toTarget.distance,
    proximity,
    facing,
    response,
    zone: toTarget.distance < 4.2 ? 'close' : toTarget.distance < 11 ? 'near' : toTarget.distance < farDistance ? 'distant' : 'outside'
  });
}
