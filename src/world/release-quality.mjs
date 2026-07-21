const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));

export const RELEASE_QUALITY_STANDARD=Object.freeze({
  maxPixelRatio:Object.freeze({desktop:1.25,compact:1,motionReduced:1.1}),
  shadowMap:Object.freeze({desktop:512,compact:384}),
  slowFrameMs:24,
  recoveryFrameMs:18,
  sampleWindow:180,
  accessibility:Object.freeze({dialogFocus:true,escapeRecovery:true,touchTargets:44,reducedMotionInformationParity:true}),
  safety:Object.freeze({interactionGeometryChanged:false,collisionsAdded:0,movementContractChanged:false})
});

export function releaseQualityProfile({width=1280,height=720,pixelRatio=1,coarsePointer=false,reducedMotion=false}={}){
  const compact=coarsePointer||Math.min(width,height)<620;
  const cap=reducedMotion?RELEASE_QUALITY_STANDARD.maxPixelRatio.motionReduced:compact?RELEASE_QUALITY_STANDARD.maxPixelRatio.compact:RELEASE_QUALITY_STANDARD.maxPixelRatio.desktop;
  return Object.freeze({
    compact,reducedMotion,
    pixelRatio:clamp(Number(pixelRatio)||1,.75,cap),
    shadowMap:compact?RELEASE_QUALITY_STANDARD.shadowMap.compact:RELEASE_QUALITY_STANDARD.shadowMap.desktop,
    motionScale:reducedMotion?.22:1,
    antialias:true,powerPreference:'high-performance'
  });
}

export function createFrameQualityMonitor(profile){
  let frames=0,total=0,slow=0,level=1;
  return Object.freeze({
    sample(frameMs){const value=clamp(Number(frameMs)||16.67,1,100);frames++;total+=value;if(value>RELEASE_QUALITY_STANDARD.slowFrameMs)slow++;if(frames>=RELEASE_QUALITY_STANDARD.sampleWindow){const average=total/frames;if(average>RELEASE_QUALITY_STANDARD.slowFrameMs&&slow/frames>.45)level=Math.max(.82,level-.08);else if(average<RELEASE_QUALITY_STANDARD.recoveryFrameMs)level=Math.min(1,level+.04);frames=0;total=0;slow=0}return profile.pixelRatio*level},
    snapshot(){return Object.freeze({level,frames,averageMs:frames?total/frames:0,slowFrames:slow})}
  });
}
