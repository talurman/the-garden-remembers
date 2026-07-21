function deepFreeze(value){
  if(value==null||typeof value!=='object'||Object.isFrozen(value))return value;
  for(const child of Object.values(value))deepFreeze(child);
  return Object.freeze(value);
}

export const DUAL_FIELD_LAYOUT=deepFreeze({
  sharedObservationLineZ:-106.5,
  downstreamBoundaryZ:-126.5,
  centralPassage:{centerX:-.35,halfWidth:2.35},
  shelter:{id:'quiet-shelter',x:-5.15,z:-115.4,visualRadius:3.72},
  circle:{id:'the-circle',x:5.35,z:-116.15,visualRadius:3.18,courtScaleZ:.82},
  moonGate:{x:0,z:-151}
});

export function dualFieldMetrics(layout=DUAL_FIELD_LAYOUT){
  const depthDifference=Math.abs(layout.shelter.z-layout.circle.z);
  const anchorSeparation=Math.hypot(layout.circle.x-layout.shelter.x,layout.circle.z-layout.shelter.z);
  const centerGap=anchorSeparation-layout.shelter.visualRadius-layout.circle.visualRadius;
  const centralPassageWidth=layout.centralPassage.halfWidth*2;
  return Object.freeze({depthDifference,anchorSeparation,centerGap,centralPassageWidth,circleIsRight:layout.circle.x>layout.centralPassage.centerX,shelterIsLeft:layout.shelter.x<layout.centralPassage.centerX,gateIsDownstream:layout.moonGate.z<layout.downstreamBoundaryZ});
}
