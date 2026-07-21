import {normalizeYaw} from './planar-controller.mjs';

const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));

export function bufferLookInput(pending,{dx=0,dy=0},{maxEvent=64,maxPending=120}={}){
  const safeX=clamp(Number.isFinite(dx)?dx:0,-maxEvent,maxEvent);
  const safeY=clamp(Number.isFinite(dy)?dy:0,-maxEvent,maxEvent);
  return{
    x:clamp((pending?.x||0)+safeX,-maxPending,maxPending),
    y:clamp((pending?.y||0)+safeY,-maxPending,maxPending)
  };
}

export function consumeLookInput({yaw,pitch,pending,dt,sensitivityX=.00235,sensitivityY=.0019}){
  const safeDt=clamp(Number.isFinite(dt)?dt:0,0,.05),portion=1-Math.exp(-safeDt*30),consumeX=(pending?.x||0)*portion,consumeY=(pending?.y||0)*portion;
  return{
    yaw:normalizeYaw(yaw+consumeX*sensitivityX),
    pitch:clamp(pitch-consumeY*sensitivityY,-.32,.24),
    pending:{x:(pending?.x||0)-consumeX,y:(pending?.y||0)-consumeY}
  };
}
