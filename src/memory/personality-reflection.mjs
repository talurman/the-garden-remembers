const clamp = value => Math.max(0, Math.min(1, value));

export function calculatePersonalityReflection({movement = {}, events = [], walletOutcome = null, threshold = {}, shelter = {}, circle = {}, dualField = {}} = {}) {
  const distance = Math.max(1, Number(movement.distance) || 0);
  const lateral = Math.max(0, Number(movement.lateral) || 0);
  const turning = Math.max(0, Number(movement.turn) || 0);
  const counts = type => events.filter(event => event.type === type).length;
  const stillnessSeconds = events.filter(event => event.type === 'movement.still').reduce((sum,event)=>sum+(event.durationMs||0),0)/1000;
  const retreats = counts('movement.retreated');
  const returns = events.filter(event => event.metadata?.return === true).length;
  const attention = counts('attention.looked') + counts('attention.oriented');
  const thresholdCounts = threshold.counts ?? {};
  const thresholdHistory = Array.isArray(threshold.history) ? threshold.history : [];
  const investigativeActions = thresholdHistory.filter(event => event.action === 'knock' || event.action === 'listen').map(event => event.action);
  const interactionVariety = new Set(investigativeActions).size;
  const thresholdReturns = events.filter(event => event.locationId === 'threshold-place' && event.metadata?.return === true).length;
  const shelterEvents=events.filter(event=>event.locationId==='quiet-shelter');
  const shelterAction=shelter.resolvedAction??shelterEvents.findLast?.(event=>event.type==='interaction.completed')?.metadata?.action??null;
  const shelterReturns=shelterEvents.filter(event=>event.type==='location.revisited'||event.metadata?.return===true).length;
  const shelterRetreats=shelterEvents.filter(event=>event.type==='movement.retreated').length;
  const shelterStillnessSeconds=shelterEvents.filter(event=>event.type==='movement.still').reduce((sum,event)=>sum+(event.durationMs||0),0)/1000;
  const shelterEnteredAt=shelterEvents.find(event=>event.type==='location.entered')?.occurredAt;
  const shelterActionAt=shelterEvents.find(event=>event.type==='interaction.started')?.occurredAt;
  const shelterObservationSeconds=Number.isFinite(shelterEnteredAt)&&Number.isFinite(shelterActionAt)?Math.max(0,(shelterActionAt-shelterEnteredAt)/1000):0;
  const shelterResponsiveness={support:.28,reach:.24,water:.22,call:.3,leave:.04}[shelterAction]??0;
  const shelterSelfDirection={support:.08,reach:.14,water:.12,call:.1,leave:.3}[shelterAction]??0;
  const shelterAdaptability={support:.08,reach:.1,water:.1,call:.15,leave:.06}[shelterAction]??0;
  const circleEvents=events.filter(event=>event.locationId==='the-circle');
  const circleAction=circle.resolvedAction??circleEvents.findLast?.(event=>event.type==='interaction.completed')?.metadata?.action??null;
  const circleReturns=circleEvents.filter(event=>event.type==='location.revisited'||event.metadata?.return===true).length;
  const circleRetreats=circleEvents.filter(event=>event.type==='movement.retreated').length;
  const circleStillnessSeconds=circleEvents.filter(event=>event.type==='movement.still').reduce((sum,event)=>sum+(event.durationMs||0),0)/1000;
  const circleEnteredAt=circleEvents.find(event=>event.type==='location.entered')?.occurredAt;
  const circleActionAt=circleEvents.find(event=>event.type==='interaction.started')?.occurredAt;
  const circleObservationSeconds=Number.isFinite(circleEnteredAt)&&Number.isFinite(circleActionAt)?Math.max(0,(circleActionAt-circleEnteredAt)/1000):0;
  const sharedEvents=events.filter(event=>event.locationId==='shared-choice-field');
  const sustainedAttention=sharedEvents.filter(event=>event.metadata?.evidence==='attention.sustained').length;
  const attentionSwitches=Math.max(Number(dualField.meaningfulSwitches)||0,sharedEvents.filter(event=>event.metadata?.evidence==='attention.switched').length);
  const partialRetreats=sharedEvents.filter(event=>event.metadata?.evidence==='movement.partial-retreat').length;
  const circleResponsiveness={intervene:.24,join:.03,distract:.18,call:.21,leave:.03}[circleAction]??0;
  const circleSelfDirection={intervene:.12,join:.24,distract:.18,call:.14,leave:.29}[circleAction]??0;
  const circleAdaptability={intervene:.08,join:.06,distract:.14,call:.12,leave:.05}[circleAction]??0;
  const circleSocialOrientation={intervene:.23,join:.14,distract:.2,call:.22,leave:.04}[circleAction]??0;
  const pathVariation = clamp(lateral / distance * 3.1 + turning / distance * .5);

  const exploration = clamp(pathVariation*.68 + returns * .14 + thresholdReturns*.13+shelterReturns*.14+circleReturns*.15+attentionSwitches*.08);
  const deliberation = clamp(stillnessSeconds / 11 + retreats * .13 + (thresholdCounts.listen||0)*.2 + Math.max(0,(thresholdCounts.knock||0)-1)*.09+shelterStillnessSeconds/15+Math.min(shelterObservationSeconds,8)/34+shelterRetreats*.11+circleStillnessSeconds/15+Math.min(circleObservationSeconds,8)/34+circleRetreats*.11+partialRetreats*.08+sustainedAttention*.045);
  const responsiveness = clamp((['returned','reported','assisted'].includes(walletOutcome)?.38:.1) + (thresholdCounts.call||0)*.27 + attention*.065+shelterResponsiveness+circleResponsiveness);
  const selfDirection = clamp((['carried','ignored','replaced'].includes(walletOutcome)?.28:.12) + (threshold.resolvedAction==='leave'?.27:.08) + Math.max(0,1-deliberation)*.18+shelterSelfDirection+circleSelfDirection);
  const commitment = clamp(.3 + Math.min(distance,150)/330 + (threshold.resolvedAction?.16:0)+(shelterAction?.14:0)+(circleAction?.14:0) - retreats*.04-partialRetreats*.025);
  const adaptability = clamp(interactionVariety*.18 + thresholdReturns*.18 + returns*.09 + Math.min(retreats,3)*.07 + pathVariation*.16+shelterReturns*.17+shelterRetreats*.09+shelterAdaptability+circleReturns*.18+circleRetreats*.09+circleAdaptability+attentionSwitches*.11);
  const socialOrientation=clamp(attention*.06+sustainedAttention*.08+circleSocialOrientation+(shelterAction?.12:0));

  let opening;
  if (exploration>.62&&deliberation>.55) opening='Your pattern suggests an exploratory yet reflective personality: curiosity draws you outward, but you prefer to understand the shape of a situation before committing to it.';
  else if (exploration>.62) opening='Your pattern suggests a curious, self-directed personality that learns by moving, testing possibilities, and allowing the wider context to reveal itself.';
  else if (deliberation>.58) opening='Your pattern suggests a thoughtful, observant personality that gives uncertainty room instead of forcing an immediate answer.';
  else opening='Your pattern suggests a quietly decisive personality that trusts momentum and becomes clearer through action rather than prolonged analysis.';

  let social;
  if (responsiveness>.62&&selfDirection>.55) social='You seem responsive to other people without surrendering your own judgment, balancing concern with a strong sense of personal agency.';
  else if (responsiveness>.62) social='You appear sensitive to signals from other people and inclined to treat responsibility as something worth noticing rather than passing over.';
  else if(socialOrientation>.42&&deliberation>.48) social='You seem attentive to the social shape of a situation, taking time to read distance, attention, and unspoken boundaries before deciding how near to stand.';
  else if (selfDirection>.58&&responsiveness>.3) social='You appear comfortable relying on your own judgment while still leaving room for another person’s pace, boundaries, and unspoken signals.';
  else if (selfDirection>.58) social='You appear comfortable relying on your own judgment, even when the environment offers several competing invitations.';
  else social='You seem to balance independence with caution, neither rushing toward every signal nor dismissing it automatically.';

  let closing;
  if(adaptability>.56&&commitment>.58) closing='You are willing to revise your route as new information appears, yet once a direction feels earned you commit and carry its consequence forward.';
  else if(adaptability>.56) closing='You seem comfortable revisiting an impression and changing your approach when the wider situation asks for it.';
  else if(commitment>.64) closing='Once enough of the situation becomes clear, you tend to commit and carry the consequence forward.';
  else closing='You seem most comfortable keeping possibilities open until one direction feels genuinely earned.';

  return Object.freeze({paragraph:`${opening} ${social} ${closing}`,dimensions:Object.freeze({exploration,deliberation,responsiveness,selfDirection,commitment,adaptability,socialOrientation})});
}
