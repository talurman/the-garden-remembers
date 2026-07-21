const TAU = Math.PI * 2;

export function normalizeYaw(yaw) {
  if (!Number.isFinite(yaw)) return 0;
  return ((yaw + Math.PI) % TAU + TAU) % TAU - Math.PI;
}

export function updateYaw(yaw, turnAxis, dt, turnSpeed = 1.35) {
  const safeDt = Math.max(0, Math.min(Number.isFinite(dt) ? dt : 0, 0.05));
  const axis = Math.max(-1, Math.min(1, Number(turnAxis) || 0));
  return normalizeYaw(yaw + axis * turnSpeed * safeDt);
}

export function updatePlanarVelocity({velocity, input, yaw, dt, walkSpeed = 4.15, sprintSpeed = 6.4}) {
  const safeDt = Math.max(0, Math.min(Number.isFinite(dt) ? dt : 0, 0.05));
  const forwardAxis = Math.max(-1, Math.min(1, Number(input?.forward) || 0));
  const strafeAxis = Math.max(-1, Math.min(1, Number(input?.strafe) || 0));
  const magnitude = Math.hypot(forwardAxis, strafeAxis);
  const speed = input?.sprint ? sprintSpeed : walkSpeed;
  let targetX = 0;
  let targetZ = 0;

  if (magnitude > 0) {
    const f = forwardAxis / magnitude;
    const s = strafeAxis / magnitude;
    targetX = (Math.sin(yaw) * f + Math.cos(yaw) * s) * speed;
    targetZ = (-Math.cos(yaw) * f + Math.sin(yaw) * s) * speed;
  }

  const response = magnitude > 0 ? 10.5 : 14;
  const blend = 1 - Math.exp(-safeDt * response);
  let x = velocity.x + (targetX - velocity.x) * blend;
  let z = velocity.z + (targetZ - velocity.z) * blend;
  if (magnitude === 0 && Math.hypot(x, z) < 0.025) x = z = 0;
  return {x, z};
}

export function resolvePlanarCollisions({position, velocity, obstacles, playerRadius = 0.34, bounds}) {
  let x = Number.isFinite(position.x) ? position.x : 0;
  let z = Number.isFinite(position.z) ? position.z : 0;
  let vx = Number.isFinite(velocity.x) ? velocity.x : 0;
  let vz = Number.isFinite(velocity.z) ? velocity.z : 0;

  for (let pass = 0; pass < 3; pass++) {
    let corrected = false;
    for (const obstacle of obstacles) {
      const minimum = obstacle.r + playerRadius;
      let dx = x - obstacle.x;
      let dz = z - obstacle.z;
      const distanceSquared = dx * dx + dz * dz;
      if (distanceSquared >= minimum * minimum) continue;
      let distance = Math.sqrt(distanceSquared);
      if (distance < 0.0001) {
        const velocityLength = Math.hypot(vx, vz) || 1;
        dx = -vx / velocityLength;
        dz = -vz / velocityLength;
        distance = 1;
      }
      const nx = dx / distance;
      const nz = dz / distance;
      x = obstacle.x + nx * minimum;
      z = obstacle.z + nz * minimum;
      const inwardSpeed = vx * nx + vz * nz;
      if (inwardSpeed < 0) {
        vx -= nx * inwardSpeed;
        vz -= nz * inwardSpeed;
      }
      corrected = true;
    }
    if (!corrected) break;
  }

  if (bounds) {
    const boundedX = Math.max(bounds.minX, Math.min(bounds.maxX, x));
    const boundedZ = Math.max(bounds.minZ, Math.min(bounds.maxZ, z));
    if (boundedX !== x && Math.sign(vx) === Math.sign(x - boundedX)) vx = 0;
    if (boundedZ !== z && Math.sign(vz) === Math.sign(z - boundedZ)) vz = 0;
    x = boundedX;
    z = boundedZ;
  }

  return {position:{x, z}, velocity:{x:vx, z:vz}};
}
