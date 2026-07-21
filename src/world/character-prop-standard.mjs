export const CHARACTER_PROP_STANDARD=Object.freeze({
  direction:'v5-contemporary-faceted-watercolor',
  characters:Object.freeze({
    walletVisitor:Object.freeze({count:1,facialMarks:true,coveredFaceGesture:true,contactShadow:true,garmentSeams:true}),
    quietShelter:Object.freeze({count:1,facialMarks:true,contactShadow:true,garmentSeams:true}),
    circle:Object.freeze({count:5,facialMarks:true,contactShadow:true,garmentSeams:true})
  }),
  choices:Object.freeze({wallet:5,threshold:4,shelter:5,circle:5}),
  props:Object.freeze({wallet:'folded leather with card slots',callPoint:'recognizable handset, dial and cord',fabric:'draped woven textile',notice:'layered handmade paper'}),
  safety:Object.freeze({interactionGeometryChanged:false,collisionsAdded:0,cameraContractChanged:false})
});

export function characterPropSummary(){
  const characters=Object.values(CHARACTER_PROP_STANDARD.characters).reduce((sum,item)=>sum+item.count,0);
  const choices=Object.values(CHARACTER_PROP_STANDARD.choices).reduce((sum,count)=>sum+count,0);
  return Object.freeze({characters,choices,props:Object.keys(CHARACTER_PROP_STANDARD.props).length,...CHARACTER_PROP_STANDARD.safety});
}
