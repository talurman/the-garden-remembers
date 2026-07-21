const clamp = value => Math.max(0, Math.min(1, value));

export function calculatePersonalityReflection({movement = {}, events = [], walletOutcome = null, threshold = {}} = {}) {
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
  const pathVariation = clamp(lateral / distance * 3.1 + turning / distance * .5);

  const exploration = clamp(pathVariation*.78 + returns * .18 + thresholdReturns*.16);
  const deliberation = clamp(stillnessSeconds / 9 + retreats * .18 + (thresholdCounts.listen||0)*.24 + Math.max(0,(thresholdCounts.knock||0)-1)*.12);
  const responsiveness = clamp((['returned','reported','assisted'].includes(walletOutcome)?.48:.12) + (thresholdCounts.call||0)*.38 + attention*.09);
  const selfDirection = clamp((['carried','ignored','replaced'].includes(walletOutcome)?.34:.14) + (threshold.resolvedAction==='leave'?.36:.1) + Math.max(0,1-deliberation)*.24);
  const commitment = clamp(.34 + Math.min(distance,150)/300 + (threshold.resolvedAction?.24:0) - retreats*.06);
  const adaptability = clamp(interactionVariety*.22 + thresholdReturns*.24 + returns*.12 + Math.min(retreats,3)*.1 + pathVariation*.2);

  let opening;
  if (exploration>.62&&deliberation>.55) opening='Your pattern suggests an exploratory yet reflective personality: curiosity draws you outward, but you prefer to understand the shape of a situation before committing to it.';
  else if (exploration>.62) opening='Your pattern suggests a curious, self-directed personality that learns by moving, testing possibilities, and allowing the wider context to reveal itself.';
  else if (deliberation>.58) opening='Your pattern suggests a thoughtful, observant personality that gives uncertainty room instead of forcing an immediate answer.';
  else opening='Your pattern suggests a quietly decisive personality that trusts momentum and becomes clearer through action rather than prolonged analysis.';

  let social;
  if (responsiveness>.62&&selfDirection>.55) social='You seem responsive to other people without surrendering your own judgment, balancing concern with a strong sense of personal agency.';
  else if (responsiveness>.62) social='You appear sensitive to signals from other people and inclined to treat responsibility as something worth noticing rather than passing over.';
  else if (selfDirection>.58) social='You appear comfortable relying on your own judgment, even when the environment offers several competing invitations.';
  else social='You seem to balance independence with caution, neither rushing toward every signal nor dismissing it automatically.';

  let closing;
  if(adaptability>.56&&commitment>.58) closing='You are willing to revise your route as new information appears, yet once a direction feels earned you commit and carry its consequence forward.';
  else if(adaptability>.56) closing='You seem comfortable revisiting an impression and changing your approach when the wider situation asks for it.';
  else if(commitment>.64) closing='Once enough of the situation becomes clear, you tend to commit and carry the consequence forward.';
  else closing='You seem most comfortable keeping possibilities open until one direction feels genuinely earned.';

  return Object.freeze({paragraph:`${opening} ${social} ${closing}`,dimensions:Object.freeze({exploration,deliberation,responsiveness,selfDirection,commitment,adaptability})});
}
