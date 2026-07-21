export class ReflectionComposer {
  compose(observationLog, {maxLines = 3} = {}) {
    const events = observationLog.all();
    const lines = [];
    const byLocation = new Map();
    for (const event of events) {
      if (!event.locationId) continue;
      const list = byLocation.get(event.locationId) ?? [];
      list.push(event);
      byLocation.set(event.locationId, list);
    }

    for (const [locationId, list] of byLocation) {
      const entries = list.filter(event => event.type === 'location.entered');
      if (entries.length > 1) {
        const locationName = locationId.replaceAll('-', ' ');
        lines.push({text: `You returned to the ${locationName} after leaving it.`, eventIds: entries.map(event => event.id)});
      }
    }

    const retreats = events.filter(event => event.type === 'movement.retreated');
    const approaches = events.filter(event => event.type === 'movement.approached');
    if (retreats.length && approaches.length) {
      const approachText = approaches.length === 1 ? 'You approached once' : `You approached ${approaches.length} times`;
      const retreatText = retreats.length === 1 ? 'stepped away once' : `stepped away ${retreats.length} times`;
      lines.push({
        text: `${approachText} and ${retreatText} before continuing.`,
        eventIds: [...approaches, ...retreats].map(event => event.id)
      });
    }

    const stillness = events.filter(event => event.type === 'movement.still');
    const totalStillness = stillness.reduce((sum, event) => sum + (event.durationMs ?? 0), 0);
    if (totalStillness >= 3000) {
      lines.push({text: `You remained still for ${Math.round(totalStillness / 1000)} seconds.`, eventIds: stillness.map(event => event.id)});
    }

    return lines.slice(0, Math.max(0, maxLines)).map(line => Object.freeze(line));
  }
}
