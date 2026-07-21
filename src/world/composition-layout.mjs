const freezeList=list=>Object.freeze(list.map(item=>Object.freeze({...item})));

export const SCENIC_BERMS=freezeList([
  {id:'entry-left',x:-14.6,z:20,width:5.8,depth:13,height:1.05,color:0x829886,seed:11},
  {id:'entry-right',x:14.4,z:12,width:5.2,depth:11,height:.88,color:0x8ea18b,seed:17},
  {id:'wallet-left',x:-14.4,z:-7,width:5.4,depth:15,height:1.18,color:0x7f9582,seed:23},
  {id:'wallet-right',x:14.5,z:-25,width:5.5,depth:17,height:1.02,color:0x849987,seed:29},
  {id:'threshold-left',x:-14.2,z:-70,width:5.1,depth:15,height:1.2,color:0x829785,seed:31},
  {id:'threshold-right',x:14.3,z:-91,width:5.4,depth:18,height:1.08,color:0x899b88,seed:37},
  {id:'field-left',x:-14.4,z:-116,width:5.6,depth:14,height:1.1,color:0x879989,seed:41},
  {id:'field-right',x:14.4,z:-119,width:5.5,depth:15,height:1.16,color:0x809586,seed:43},
  {id:'gate-left',x:-14.6,z:-141,width:5.8,depth:14,height:1.28,color:0x87978a,seed:47},
  {id:'gate-right',x:14.5,z:-142,width:5.6,depth:14,height:1.22,color:0x8f9c89,seed:53}
]);

export const SCENIC_GROVES=freezeList([
  {id:'entry-frame-left',x:-13.1,z:25,scale:1.22,type:'pine',lean:-.08},
  {id:'entry-frame-right',x:13.3,z:19,scale:1.04,type:'maple',lean:.07},
  {id:'wallet-depth-left',x:-12.8,z:-20,scale:1.18,type:'pine',lean:-.05},
  {id:'threshold-depth-right',x:12.9,z:-75,scale:1.12,type:'maple',lean:.07},
  {id:'gate-frame-left',x:-13.1,z:-132,scale:1.28,type:'pine',lean:-.08},
  {id:'gate-frame-right',x:13.1,z:-136,scale:1.22,type:'maple',lean:.08}
]);

export const BORROWED_SCENERY_LAYERS=freezeList([
  {id:'near-sage',z:-154,color:0x91a69c,opacity:.2,height:7,offset:.6},
  {id:'middle-mist',z:-166,color:0xa8b8af,opacity:.17,height:13,offset:2.1},
  {id:'far-blue',z:-178,color:0x91a5ae,opacity:.13,height:19,offset:4.2},
  {id:'last-ivory',z:-187,color:0xc6cec4,opacity:.09,height:23,offset:6.1}
]);

export const ENCOUNTER_LAND_SKIRTS=freezeList([
  {id:'wallet-clearing',x:0,z:0,innerRadius:3.35,radius:7.2,scaleZ:.72,color:0x8c9d88},
  {id:'quiet-shelter',x:-5.15,z:-115.4,innerRadius:3.55,radius:4.45,scaleZ:.86,color:0x91a08e},
  {id:'the-circle',x:5.35,z:-116.15,innerRadius:3.05,radius:4.05,scaleZ:.82,color:0x889b89}
]);

export function compositionSafetyMetrics({berms=SCENIC_BERMS,groves=SCENIC_GROVES}={}){
  const minBermAbsX=Math.min(...berms.map(item=>Math.abs(item.x)-item.width*.5));
  const minGroveAbsX=Math.min(...groves.map(item=>Math.abs(item.x)));
  const gateGroves=groves.filter(item=>item.id.startsWith('gate-frame'));
  const gateFrameBalanced=gateGroves.length===2&&gateGroves[0].x<0&&gateGroves[1].x>0;
  return Object.freeze({minBermAbsX,minGroveAbsX,gateFrameBalanced,bermCount:berms.length,groveCount:groves.length});
}
