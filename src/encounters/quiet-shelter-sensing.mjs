function clamp01(value){
  return Math.max(0,Math.min(1,Number(value)||0));
}

export function senseQuietShelter({player,forward,target,farDistance=18,nearDistance=2.4}){
  const dx=Number(target.x)-Number(player.x),dz=Number(target.z)-Number(player.z),distance=Math.hypot(dx,dz);
  const forwardLength=Math.max(.001,Math.hypot(Number(forward.x),Number(forward.z))),directionLength=Math.max(.001,distance);
  const dot=(Number(forward.x)*dx+Number(forward.z)*dz)/(forwardLength*directionLength);
  const proximity=clamp01((farDistance-distance)/Math.max(.001,farDistance-nearDistance));
  const facing=clamp01((dot-.12)/.84);
  const presence=proximity*(.38+facing*.62);
  const promptEligible=distance<4.9&&facing>.55;
  return Object.freeze({
    distance,proximity,facing,presence,promptEligible,
    zone:distance<4.9?'close':distance<9.5?'near':distance<farDistance?'distant':'outside'
  });
}
