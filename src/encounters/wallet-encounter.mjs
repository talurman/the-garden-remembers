const OUTCOME_BY_ACTION = Object.freeze({
  ask: 'returned',
  take: 'carried',
  document: 'posted',
  help: 'signaled',
  away: 'ignored'
});

function deepFreeze(value) {
  if (value == null || typeof value !== 'object' || Object.isFrozen(value)) return value;
  for (const nested of Object.values(value)) deepFreeze(nested);
  return Object.freeze(value);
}

const CONSEQUENCE_PROFILES = deepFreeze({
  returned: {
    action: 'ask',
    outcome: 'returned',
    immediate: {
      subjectId: 'crying-person',
      animationId: 'person-receives-wallet',
      durationMs: 2800,
      beats: ['person-looks-up', 'wallet-is-checked', 'tears-settle']
    },
    palette: [0xef806e, 0xf2c46f],
    sound: {
      motifId: 'coral-recognition',
      spatialSource: 'crying-person',
      frequencies: [392, 493.88, 659.25]
    },
    propagation: {
      originId: 'crying-person',
      surfaces: ['ground', 'water', 'planting', 'paper'],
      memoryKinds: ['pigment_echo', 'planting_echo', 'paper_convergence']
    },
    delayed: {
      echoId: 'coral-growth-return',
      locationId: 'path-to-pavilion',
      visualId: 'coral-gold-growth',
      soundMotifId: 'coral-recognition-distant'
    },
    reflection: {
      action: 'You carried the wallet to the person who was crying.',
      growth: 'Coral and gold growth followed the path beyond that moment.'
    }
  },
  posted: {
    action: 'document',
    outcome: 'posted',
    immediate: {
      subjectId: 'public-notice',
      animationId: 'notice-receives-report',
      durationMs: 2800,
      beats: ['new-notice-appears', 'papers-lift', 'wallet-settles']
    },
    palette: [0x43c8be, 0xa8ddd5],
    sound: {
      motifId: 'paper-current',
      spatialSource: 'public-notice',
      frequencies: [329.63, 440, 587.33]
    },
    propagation: {
      originId: 'public-notice',
      surfaces: ['ground', 'water', 'planting', 'paper'],
      memoryKinds: ['pigment_echo', 'planting_echo', 'paper_convergence']
    },
    delayed: {
      echoId: 'turquoise-paper-return',
      locationId: 'path-to-pavilion',
      visualId: 'turquoise-paper-bloom',
      soundMotifId: 'paper-current-distant'
    },
    reflection: {
      action: 'You left the wallet beneath the public notices.',
      growth: 'Turquoise pigment traveled from the notices into the planting ahead.'
    }
  },
  signaled: {
    action: 'help',
    outcome: 'signaled',
    immediate: {
      subjectId: 'phone-booth',
      animationId: 'phone-call-connects',
      durationMs: 2800,
      beats: ['receiver-lifts', 'distant-voice-answers', 'booth-light-settles']
    },
    palette: [0x526582, 0xf2c46f],
    sound: {
      motifId: 'indigo-call',
      spatialSource: 'phone-booth',
      frequencies: [440, 554.37, 659.25]
    },
    propagation: {
      originId: 'phone-booth',
      surfaces: ['ground', 'water', 'planting', 'paper'],
      memoryKinds: ['pigment_echo', 'planting_echo', 'paper_convergence']
    },
    delayed: {
      echoId: 'indigo-call-return',
      locationId: 'path-to-pavilion',
      visualId: 'indigo-gold-resonance',
      soundMotifId: 'indigo-call-distant'
    },
    reflection: {
      action: 'You called for help after finding the wallet.',
      growth: 'The phone booth’s call reached the paper at the pavilion.'
    }
  },
  carried: {
    action: 'take',
    outcome: 'carried',
    immediate: {
      subjectId: 'quiet-bench',
      animationId: 'wallet-remains-with-player',
      durationMs: 2800,
      beats: ['fabric-settles', 'wallet-remains-visible', 'player-continues']
    },
    palette: [0x526582, 0x43c8be],
    sound: {
      motifId: 'indigo-footfall',
      spatialSource: 'quiet-bench',
      frequencies: [293.66, 392, 523.25]
    },
    propagation: {
      originId: 'quiet-bench',
      surfaces: ['ground', 'water', 'planting', 'paper'],
      memoryKinds: ['pigment_echo', 'planting_echo', 'paper_convergence']
    },
    delayed: {
      echoId: 'indigo-trace-return',
      locationId: 'path-to-pavilion',
      visualId: 'indigo-aqua-footprint',
      soundMotifId: 'indigo-footfall-distant'
    },
    reflection: {
      action: 'You were still carrying the wallet when you reached the gate.',
      growth: 'Indigo pigment followed while you carried the wallet onward.'
    }
  },
  ignored: {
    action: 'away',
    outcome: 'ignored',
    immediate: {
      subjectId: 'return-stone',
      animationId: 'wallet-returns-to-origin',
      durationMs: 2800,
      beats: ['wallet-is-lowered', 'return-ring-settles', 'path-remains-open']
    },
    palette: [0x8eaa91, 0xef806e],
    sound: {
      motifId: 'sage-return',
      spatialSource: 'return-stone',
      frequencies: [261.63, 349.23, 440]
    },
    propagation: {
      originId: 'return-stone',
      surfaces: ['ground', 'water', 'planting', 'paper'],
      memoryKinds: ['pigment_echo', 'planting_echo', 'paper_convergence']
    },
    delayed: {
      echoId: 'sage-circle-return',
      locationId: 'path-to-pavilion',
      visualId: 'sage-coral-ring',
      soundMotifId: 'sage-return-distant'
    },
    reflection: {
      action: 'You put the wallet back where you found it and walked away.',
      growth: 'The garden continued to grow around what remained unresolved.'
    }
  }
});

export const WALLET_OUTCOMES = Object.freeze(Object.keys(CONSEQUENCE_PROFILES));

export function walletOutcomeForAction(action) {
  const outcome = OUTCOME_BY_ACTION[String(action)];
  if (!outcome) throw new Error(`Unknown wallet action: ${action}`);
  return outcome;
}

export function walletConsequenceProfile(outcome) {
  const profile = CONSEQUENCE_PROFILES[String(outcome)];
  if (!profile) throw new Error(`Unknown wallet outcome: ${outcome}`);
  return profile;
}

export function walletConsequenceForAction(action) {
  return walletConsequenceProfile(walletOutcomeForAction(action));
}

export function walletGrowthPalette(outcome) {
  const resolvedOutcome = CONSEQUENCE_PROFILES[outcome] ? outcome : 'ignored';
  return walletConsequenceProfile(resolvedOutcome).palette;
}

export function walletReflection({objectState, outcome}) {
  if (objectState === 'placed') {
    const resolvedOutcome = CONSEQUENCE_PROFILES[outcome] ? outcome : 'ignored';
    return Object.freeze({
      action: 'You moved the wallet and set it down somewhere else.',
      growth: walletConsequenceProfile(resolvedOutcome).reflection.growth
    });
  }

  const resolvedOutcome = CONSEQUENCE_PROFILES[outcome]
    ? outcome
    : CONSEQUENCE_PROFILES[objectState]
      ? objectState
      : 'ignored';
  return walletConsequenceProfile(resolvedOutcome).reflection;
}
