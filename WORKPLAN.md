# The Garden Remembers — Execution Workplan

## North star

Create an eight-to-twelve-minute continuous, real-time garden in which players gradually realize that the environment has retained specific traces of their presence. The experience must observe behavior without presenting itself as a test, judging choices, inferring personality, or turning memory into rewards.

The intended player thought is:

> “It remembered that.”

Not:

> “It gave me a result.”

## Source-of-truth policy

- The attached original is the behavioral reference and must remain untouched: `/Users/talurman/Desktop/psychological garden.html`.
- Its current SHA-256 is `5d39aa5f9ee7ba9bd8ee6dfab9c000ed3748d01c4937be478c92f4291fb1d1c0`.
- The workspace `legacy-prototype.html` is the byte-identical Phase 0 reference copy of the attached original. Its hash must remain equal to the source hash above until an explicitly named working branch is created.
- The current workspace `index.html` is a visual/technical exploration. It is useful evidence, but it is not automatically the gameplay baseline.
- The Desktop attachment remains the frozen external original; `legacy-prototype.html` is its workspace reference copy; `index.html` remains the separate visual/technical exploration.
- No phase may erase a working mechanic before its replacement passes the relevant acceptance gate.

## Non-negotiables

- Preserve a walkable real-time 3D garden and free exploration.
- Preserve the five encounters’ dramatic DNA, freedom of visit order, simple movement, proximity-based sound, persistent state, and the fifth encounter’s spatial decision principle.
- Preserve the original encounter choices when they are needed for comprehension, distribute them as equally emphasized landmarks, and explain each only when the player approaches it.
- Never expose scores, traits, value rankings, “good/bad” outcomes, completion checks, or a player-facing analysis dashboard.
- Record observable facts only. Never store or output diagnoses or unsupported psychological claims.
- The garden’s response must be neutral in valence: beautiful does not mean “correct,” and muted does not mean “wrong.”
- The final reflection must be grounded in recorded events and allow unresolved experiences to remain unresolved.
- Desktop keyboard, pointer, touch, reduced-motion, readable contrast, audio consent, and restartability are release requirements.

## Execution principles

1. Emotion before breadth.
2. One complete memory loop before five encounters.
3. Functional stability before visual polish.
4. Observable behavior before inferred meaning.
5. Delayed recognition before immediate spectacle.
6. Continuous world before isolated minigames.
7. Deterministic reflection before generative reflection.
8. Validate with players at every major gate.

---

## Phase 0 — Freeze, document and reproduce the original

### Work

- Copy the exact attached original into the workspace as a preserved baseline.
- Keep the current visual prototype separate until reconciliation.
- Record the original journey as a behavioral flow: park, entry modal, each pavilion, endings, dashboard and persistence.
- Capture reference views and timing for the hub and all five encounters.
- Build a preserve/redesign/remove inventory at function and interaction level.
- Document current controls, state transitions, stored data, sound triggers and pavilion lifecycle.

### Deliverables

- Frozen original.
- Working implementation copy.
- Behavioral flow map.
- Mechanic inventory.
- Regression checklist.

### Gate 0

The original can be run from entry through every pavilion, and each behavior we intend to preserve has an explicit regression test.

---

## Phase 1 — Stabilize the foundation without redesigning gameplay

### Work

- Repair pavilion lifecycle and message contracts.
- Remove duplicate injected declarations and incorrect close-function references.
- Ensure pavilion entry, exit, decisions and timing are recorded consistently.
- Fix movement delta spikes, stuck keys, modal re-entry, emergency exit, reload and persistence faults.
- Add real collision boundaries and safe position recovery.
- Establish keyboard, pointer and touch parity.
- Hide or development-gate the analysis dashboard immediately; retain raw observation tooling only for internal QA.
- Add a development-only event viewer showing facts, not scores.

### Deliverables

- Stable baseline with the original content still recognizable.
- Unified event contract.
- Repeatable journey test.
- Desktop and touch input matrix.

### Gate 1

All five original encounters can be entered, completed, exited and revisited without console errors, broken state, accidental re-entry or lost input.

---

## Phase 2 — Create the observation and memory model

### Event vocabulary

Record only events such as:

- Entered, passed or revisited a location.
- Approach, retreat and repeated approach.
- Dwell duration and stillness.
- Looking duration and orientation toward a subject.
- Route, deviation, backtracking and return.
- Object pickup, placement and abandonment.
- Distance maintained from a character.
- Interruptions, unfinished interactions and sequence.
- Environmental contact: water, stones, plants, fabric and thresholds.

Do not create empathy, courage, anxiety, honesty or personality fields.

### Memory layers

1. **Immediate echo:** a subtle response within seconds.
2. **Delayed memory:** a related change after the player has moved on.
3. **Return memory:** a location recognizes a revisit.
4. **Convergent memory:** several traces meet near the pavilion and reflection.

### Architecture

- `ObservationLog`: append-only factual events.
- `MemoryState`: persistent world facts and transformed locations.
- `MemoryDirector`: schedules immediate, delayed, return and convergent responses.
- `EncounterController`: local behavior and state for each site.
- `WorldResponseSystem`: pigment, water, planting, paper, light and sound propagation.
- `ReflectionComposer`: selects grounded observations without interpretation.
- `InputController`: keyboard, pointer and touch parity.
- `AudioDirector`: sparse spatial sound with user consent.

### Gate 2

Every visible memory can be traced to a factual event, and deleting inference code does not reduce the experience’s ability to respond meaningfully.

---

## Phase 3 — Build one complete vertical slice: The Lost Place

This phase proves the thesis before expanding scope.

Focused completion plan: `WALLET_OUTCOME_IMPLEMENTATION_PLAN.md`. The next booth remains blocked until its stage-completion gate passes.

### Journey

1. Enter the garden.
2. Learn movement through stones, water and light.
3. Discover the lost object and searching visitor.
4. Pick up the centered wallet, explore five distributed possibilities, and confirm one through a contextual proximity prompt.
5. Receive a restrained immediate response.
6. Leave and encounter a delayed echo elsewhere.
7. Return and discover that the situation has evolved.
8. Reach a short reflection containing one or two grounded observations.

### Required behavioral possibilities

- Ask the nearby person.
- Keep the wallet.
- Photograph and report it.
- Call for help.
- Walk away.
- Return later.
- Notice the result in the person, object, papers, bell and growing garden.

No branch may be labeled correct, incorrect, complete or failed.

### Gate 3 — Thesis test

Test with at least five people who receive no explanation of the memory system.

Pass only if:

- At least four notice that an earlier action affected a later moment.
- At least three independently describe the garden as remembering or recognizing them.
- No more than one describes the experience as a personality test.
- Players can explain what changed without needing UI text.
- No branch feels like a punishment for an undesirable choice.

If this gate fails, improve the memory loop before adding another encounter.

---

## Phase 4 — Reconcile the continuous garden and visual system

### Work

- Reconcile the original hub structure with the stronger real-time visual exploration already in `index.html`.
- Preserve the garden as one continuous world; remove start screens and iframe-like emotional resets between sites.
- Keep a distant pavilion or moon gate as orientation, not an objective marker.
- Replace numbered booths with discoverable locations differentiated by material, acoustics and spatial composition.
- Use the Art Bible for light, material, composition, atmosphere and motion.
- Preserve negative space and readable routes without a minimap.
- Establish the color arc: cool ivory/sage/mist-blue, one turquoise/coral transition, then gold/peach with restrained indigo.
- Establish the material set: limestone, shallow water, handmade paper, mineral plaster and wind-responsive fabric.
- Maintain performance budgets before adding detail.

### Gate 4

The player can move continuously from the garden into and out of the vertical-slice encounter without a new start screen, control reset, visual discontinuity or loss of remembered state.

---

## Phase 5 — Convert the remaining encounters, one at a time

Each encounter must pass its own behavior, memory and non-judgment review before the next begins.

### Recommended order

1. **The Divided House** — preserve the original spatial-choice strength; remove the countdown and support remaining between spaces.
2. **The Quiet Shelter** — recognize distance, waiting, water, approach, withdrawal and return.
3. **The Threshold** — recognize listening, orientation, waiting, knocking, seeking another presence and leaving.
4. **The Circle** — recognize social positioning, intervention, observation, diversion, following and withdrawal; conduct an additional sensitivity review.

### Encounter acceptance checklist

- No choice card is required for the primary interaction.
- Doing nothing is legible to the system.
- Leaving is a valid state, not failure.
- Return produces a changed situation.
- At least one memory propagates beyond the encounter.
- Immediate feedback does not reveal a moral score.
- The encounter remains understandable without explanatory text.
- The player can exit without completing a prescribed action.

### Gate 5

All five encounter spaces share one input language, one world state, one visual language and one memory system while retaining distinct emotional identities.

---

## Phase 6 — Build the cross-garden memory composition

### Work

- Propagate pigment from steps to water, planting, paper, canopy and pavilion.
- Preserve transformed state behind the player.
- Allow earlier sounds, colors, object states and spatial relationships to recur later.
- Ensure ignored places remain quiet rather than appearing incomplete.
- Create meaningful return routes and optional re-observation.
- Select a small number of cross-site relationships; avoid combinatorial spectacle.

### Memory-quality test

For every response, answer:

1. What exact player event caused it?
2. Why does it appear here?
3. Why does it appear now?
4. Can the player recognize the relationship?
5. Does it imply judgment?

Remove any response that cannot answer all five.

### Gate 6

At least three delayed or cross-site memories are recognizable in a normal journey, and the world never feels like a reward machine.

---

## Phase 7 — Reflection and OpenAI integration

### Deterministic reflection first

- Select three to five high-confidence observations.
- Prefer sequence, hesitation, return, attention and unfinished actions.
- Avoid superlatives, comparisons, motives and personality language.
- Allow silence when insufficient evidence exists.
- End by returning interpretive ownership to the player.

Example structure:

> You approached the quiet shelter three times before sitting nearby.
>
> After the path opened, you returned to the place you had left unfinished.
>
> One threshold remained untouched.
>
> The garden remembers what happened. What it meant is yours.

### OpenAI role

- Use the model only after deterministic selection identifies permissible evidence.
- Give it a compact, structured event summary rather than raw tracking data.
- Require every sentence to cite an event internally before it may be shown.
- Ban diagnoses, traits, motives, advice and value judgments in the system contract.
- Reject or regenerate unsupported claims.
- Keep a complete deterministic fallback for offline, failed or unsafe responses.
- Do not expose model terminology, loading states or “AI analysis” to the player.
- Keep session data local by default and disclose any transmission before it occurs.

### Gate 7

Every reflection sentence is factually grounded, non-diagnostic and emotionally more effective than the deterministic fallback—or the fallback ships instead.

---

## Phase 8 — Sound, pacing, accessibility and performance

### Sound

- Use sparse spatial sources: footsteps, shallow water, bamboo, fabric, wind and distant resonance.
- Change tonal character through interaction without introducing constant music.
- Keep sound sources spatially understandable.
- Provide mute and reduced-audio options without a permanent HUD.

### Pacing

- Target eight to twelve minutes for a first journey.
- Do not require all five spaces.
- Ensure recognition occurs before the final pavilion.
- Leave enough quiet time for players to notice delayed change.

### Accessibility

- Keyboard, pointer and touch parity.
- Reduced motion and restrained head movement.
- No color-only interaction meaning.
- Readable Hebrew typography and correct RTL behavior.
- Captions or visual equivalents for essential spatial audio.
- Clear focus states for the few remaining controls.
- Safe restart and resume behavior.

### Performance

- Define budgets for draw calls, triangles, texture memory, dynamic lights, particles and audio nodes.
- Test representative low-power mobile hardware early.
- Prefer instancing, pooled effects, deterministic composition and distance-based simplification.
- Never trade movement responsiveness for decorative density.

### Gate 8

The complete journey runs without stuck states, input loss, major frame instability, unreadable UI or interaction paths that require sound or color alone.

---

## Phase 9 — Build Week polish and submission validation

### Full-journey QA matrix

- First-time desktop keyboard journey.
- Pointer-look and keyboard journey.
- Touch journey in portrait and landscape.
- Reduced-motion journey.
- Muted journey.
- Leave-and-return behavior for every encounter.
- Skip multiple encounters and still reach a valid reflection.
- Reload, restart and persisted-memory behavior.
- Slow, fast, exploratory and direct play styles.
- Network or OpenAI failure with deterministic fallback.

### Player-test success criteria

- Four of five players say the world remembered or recognized their behavior without being told beforehand.
- At least three recall one delayed environmental consequence.
- No more than one calls it a personality test.
- Reflection statements are understood as observations, not diagnoses.
- Players do not search for scores, quests or completion markers.
- The moon gate/pavilion remains a clear landmark without a minimap.
- Players want to replay to see how the garden changes.

### Submission package

- Stable hosted build.
- Sixty-to-ninety-second capture showing one complete memory loop.
- Short explanation of the invisible behavioral architecture.
- Privacy and safety statement.
- Known limitations and fallback behavior.
- Rehearsed demo path that survives skipped interactions.

### Gate 9

The build is submitted only when the remembered behavior—not the rendering technology or AI explanation—is the clearest thing a reviewer remembers afterward.

---

## Scope control

### Must ship

- One continuous garden.
- Stable movement and touch parity.
- Five encounter locations, with at least three deeply resolved if time forces a cut.
- Immediate, delayed, return and convergent memory.
- Persistent environmental traces.
- Grounded non-diagnostic reflection.
- Deterministic fallback.
- Full journey QA.

### Cut first if schedule tightens

- Additional creatures.
- Complex procedural weather.
- Large numbers of branching animations.
- Multiple endings.
- Voice narration.
- Account systems or cloud persistence.
- Decorative interactions without memory consequences.

### Never cut

- Movement responsiveness.
- The delayed-memory reveal.
- Return-state continuity.
- Non-judgmental language.
- Accessibility fundamentals.
- Reflection grounding.

## Working cadence

For every implementation phase:

1. State the emotional hypothesis.
2. Identify the original mechanic being preserved.
3. Implement the smallest end-to-end version.
4. Test function before polish.
5. Compare against the Art Bible and encounter intent.
6. Play from entry through reflection.
7. Record what players actually noticed.
8. Keep, revise or remove based on evidence.

No feature moves forward merely because it is technically impressive.

## Current execution status — 2026-07-20

- Phase 0: complete; the original and workspace reference remain byte-identical.
- Phase 1: complete; lifecycle, Escape recovery, persistence and keyboard/touch paths passed regression testing across all five pavilions.
- Phase 2: complete; factual observation, four memory layers, persistence and grounded reflection are integrated and covered by five automated tests.
- Phase 3: implementation proof integrated into the canonical `index.html`; untouched and acted-upon journeys pass technical QA, while the required five-person, unprompted thesis test remains open.
- Phase 4: complete for the current slice; Lost Place now exists inside the continuous Art Bible garden without an iframe or control reset.
- Phase 5: the literal Divided House side-room conversion was reviewed and removed. Original pavilion content will be rebuilt as human situations encountered directly along the path, beginning with the wallet encounter now integrated in `index.html`.
