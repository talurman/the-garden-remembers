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
  if (exploration>.62&&deliberation>.55) opening='The garden holds a route that ranged outward, paused, and turned back across places already visited.';
  else if (exploration>.62) opening='The garden holds a route that ranged outward and tested more than one direction.';
  else if (deliberation>.58) opening='The garden holds the pauses and changes of direction that occurred before the route continued.';
  else opening='The garden holds a continuous line of movement, with color settling behind each step.';

  let social;
  if (responsiveness>.62&&selfDirection>.55) social='The human places retained both the responses that were made and the directions that continued beyond them.';
  else if (responsiveness>.62) social='The human places retained the moments when attention turned toward them.';
  else if (selfDirection>.58) social='The human places remained present while the route continued under its own momentum.';
  else social='The human places retained both the distance that was kept and the moments when attention turned toward them.';

  let closing;
  if(adaptability>.56&&commitment>.58) closing='The route changed as new details appeared, then carried one consequence forward.';
  else if(adaptability>.56) closing='The route returned to earlier places and changed as new details appeared.';
  else if(commitment>.64) closing='One direction continued far enough for its consequence to remain visible.';
  else closing='Several possibilities remain visible, alongside the route that reached this place.';

  return Object.freeze({paragraph:`${opening} ${social} ${closing}`,dimensions:Object.freeze({exploration,deliberation,responsiveness,selfDirection,commitment,adaptability})});
}
