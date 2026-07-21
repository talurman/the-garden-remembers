const figure=(spec)=>Object.freeze({...spec,position:Object.freeze({...spec.position}),palette:Object.freeze({...spec.palette})});

export const CIRCLE_CHARACTER_STANDARD=Object.freeze([
  figure({
    id:'center',role:'center',height:1.34,position:{x:0,z:.04},turn:.12,
    palette:{outer:0xdedfd7,inner:0x789a96,accent:0xd88469},hair:0x596d72,
    silhouette:'layered-paper-jacket',layers:3,stance:'closed',gesture:'hands-near-face',
    headTilt:.16,torsoLean:.075,weightShift:-.025,gestureSide:-1
  }),
  figure({
    id:'north-east',role:'surrounding',height:1.79,position:{x:.87,z:-1.59},turn:-.50,
    palette:{outer:0xe4e2d7,inner:0x78908a,accent:0xc97d61},hair:0x444b48,
    silhouette:'cropped-overshirt',layers:3,stance:'forward-weight',gesture:'contained-inward',
    headTilt:.035,torsoLean:.025,weightShift:.045,gestureSide:-1
  }),
  figure({
    id:'south-east',role:'surrounding',height:1.87,position:{x:1.78,z:.42},turn:-1.79,
    palette:{outer:0xe7e4da,inner:0x7f8970,accent:0xd27f60},hair:0x5a4c42,
    silhouette:'knitted-vest',layers:2,stance:'quiet-upright',gesture:'low-open-hand',
    headTilt:-.025,torsoLean:.012,weightShift:-.035,gestureSide:1
  }),
  figure({
    id:'south-west',role:'surrounding',height:1.7,position:{x:.17,z:1.79},turn:-3.05,
    palette:{outer:0xe4e2d8,inner:0x769793,accent:0xd89273},hair:0x6a877f,
    silhouette:'paper-scarf',layers:3,stance:'back-weight',gesture:'contained-inward',
    headTilt:.055,torsoLean:.035,weightShift:.025,gestureSide:1
  }),
  figure({
    id:'north-west',role:'surrounding',height:1.82,position:{x:-1.48,z:-1.03},turn:.96,
    palette:{outer:0xe7e3d7,inner:0x79a7a2,accent:0xd88368},hair:0x986b55,
    silhouette:'belted-jacket',layers:2,stance:'turned-in',gesture:'hand-at-torso',
    headTilt:-.04,torsoLean:.045,weightShift:-.045,gestureSide:-1
  })
]);

export const circleCharacter=(id)=>CIRCLE_CHARACTER_STANDARD.find(character=>character.id===id)||null;
