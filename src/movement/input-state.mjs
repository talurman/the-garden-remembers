function active(source, code) {
  return Boolean(source?.[code]);
}

export function movementInput({keys = {}, touchPulse = {}} = {}) {
  const pressed = code => active(keys, code) || Number(touchPulse?.[code]) > 0;
  return Object.freeze({
    forward: (pressed('KeyW') || pressed('ArrowUp') ? 1 : 0) - (pressed('KeyS') || pressed('ArrowDown') ? 1 : 0),
    strafe: (pressed('KeyD') ? 1 : 0) - (pressed('KeyA') ? 1 : 0),
    turn: (pressed('ArrowRight') ? 1 : 0) - (pressed('ArrowLeft') ? 1 : 0),
    sprint: pressed('ShiftLeft') || pressed('ShiftRight')
  });
}
