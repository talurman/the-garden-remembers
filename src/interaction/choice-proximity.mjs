export function updateDismissedChoice(dismissedChoice, choices, clearance = 1.4) {
  if (!dismissedChoice) return null;
  const dismissed = choices.find(choice => choice.action === dismissedChoice);
  if (!dismissed || dismissed.distance > dismissed.radius + clearance) return null;
  return dismissedChoice;
}

export function nearestAvailableChoice(choices, dismissedChoice = null) {
  return choices
    .filter(choice => choice.action !== dismissedChoice && choice.distance < choice.radius)
    .sort((a, b) => a.distance - b.distance)[0] ?? null;
}
