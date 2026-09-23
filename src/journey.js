// Physical screens remain stable; the active decision sequence determines navigation/progress.
export const recurringJourney = [0, 1, 2, 3, 4, 5, 6];
export const oneTimeJourney = [0, 1, 3, 4, 5, 6];
export function journeyProgress(step, oneTime) {
  const journey = oneTime ? oneTimeJourney : recurringJourney;
  // The one-time selection can be revisited, but is not an extra numbered decision.
  return { step: step === 2 && oneTime ? 1 : journey.indexOf(step), total: journey.length };
}
export function nextScreen(step, oneTime) {
  if (step === 2) return 3;
  const journey = oneTime ? oneTimeJourney : recurringJourney;
  return journey[Math.min(journey.indexOf(step) + 1, journey.length - 1)];
}
export function previousScreen(step, oneTime) {
  if (step === 3 || step === 2) return step === 3 ? 2 : 1;
  const journey = oneTime ? oneTimeJourney : recurringJourney;
  return journey[Math.max(0, journey.indexOf(step) - 1)];
}
