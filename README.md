# The Garden Remembers

**The Garden Remembers** is a short, first-person WebGL experience about a place that retains traces of how you move through it. The garden records observable actions—approaching, waiting, leaving, returning, carrying, and placing—then lets those actions reappear through color, sound, planting, paper, and the final reflection.

It does not assign scores, traits, diagnoses, or “good” and “bad” outcomes. The design goal is for the player to think, “It remembered that,” rather than, “It judged me.”

## What is in this build

- A continuous, explorable Three.js garden with keyboard, pointer, and touch controls.
- A lost-wallet encounter with five spatially distributed responses.
- A threshold encounter that supports knocking, listening, calling, leaving, and returning.
- Immediate, delayed, return, and convergent environmental memories.
- A deterministic reflection composed only from factual observations.
- Reduced-motion support and a restartable journey.

The canonical player-facing build is `index.html`. Earlier prototypes and design records are kept in the repository as development evidence; they are not required to run the current experience.

## Run locally

No install or API key is required. You only need a modern browser and a local static server because the app uses ES modules.

```bash
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173).

The experience loads Three.js and the Assistant font from public CDNs, so the first load requires an internet connection.

### Controls

- `WASD`: move and strafe
- Arrow keys: walk and turn
- `Shift`: move faster
- Pointer drag: look around
- `Enter`: pass through the final gate
- Touch controls: available on touch/coarse-pointer devices

## Test

The logic tests use Node's built-in test runner and have no package dependencies.

```bash
npm test
```

This runs the complete suite under `tests/`, covering movement, input parity, encounter routes, neutral consequence contracts, factual memory, delayed echoes, reflection, and threshold behavior.

## Architecture

- `src/memory/`: append-only observations, traceable world memory, scheduling, and reflection.
- `src/encounters/`: encounter state, sensing, consequences, delayed echoes, and propagation.
- `src/interaction/`: contextual prompts, proximity rules, and accessible action menus.
- `src/movement/`: bounded movement, collision response, keyboard/touch parity, and pointer look.
- `tests/`: dependency-free unit and contract tests.

Every visible memory is required to reference the factual event that triggered it. Inference-like fields such as personality, empathy, anxiety, diagnosis, and moral scores are rejected by the memory schema.

## How Codex and GPT-5.6 were used

Codex was the active development environment throughout the redesign. I used it to inspect and preserve the original prototype, map the existing interaction flow, split the memory system into testable modules, implement and debug the continuous garden, run regression tests, and review the experience against its non-judgmental design rules.

GPT-5.6, through Codex, helped reason across the larger system: translating the creative goal into a factual event contract, checking that all encounter branches received equally complete consequences, finding lifecycle and input edge cases, and turning design decisions into executable tests and release documentation. I kept the final creative direction and interaction choices human-led, and verified generated code through the test suite and fresh browser runs.

GPT-5.6 is a development collaborator, not a runtime dependency: the submitted experience does not send player observations to an external model or API.

## Privacy and sample data

No account, backend, test account, or sample dataset is needed. Player observations remain in the current browser session and are used only to drive the local experience.

## Deploy to Firebase Hosting

Build the minimal static release directory:

```bash
npm run build
```

Then deploy with the Firebase CLI after selecting a Firebase project:

```bash
firebase deploy --only hosting
```

`firebase.json` serves the generated `public/` directory and applies long-lived caching only to the immutable module files.
