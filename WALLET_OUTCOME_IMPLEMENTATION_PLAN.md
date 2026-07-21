# Wallet Outcome Stage — Implementation Plan

## Objective

Finish the wallet encounter as a complete emotional memory loop before beginning the next booth:

> Discover → explore → confirm → witness a physical consequence → walk away → recognize the consequence later → reflect.

The outcome must never read as a reward, punishment, score or personality judgment. Every option receives equal production quality and an equally beautiful response.

## Locked starting point

- The wallet is centered on the route.
- Picking it up reveals five distributed landmarks.
- Every landmark sparkles with equal intensity.
- Proximity opens a contextual confirmation with a “Keep exploring” alternative.
- The five factual outcomes remain: returned, posted, signaled, carried and ignored.
- Arrow keys walk and turn; WASD walks and strafes.

This interaction structure is preserved while the consequence system is completed.

## Outcome direction

| Player action | Immediate physical result | Environmental language | Delayed recognition |
|---|---|---|---|
| Check with the crying person | The person looks up, checks the wallet and holds it carefully; their tears stop | Coral and warm gold | Coral/gold growth appears farther along the path and in pavilion paper |
| Photograph and report | A new notice appears; nearby papers lift and settle around the wallet | Turquoise and pale paper-blue | Turquoise pigment reappears in downstream planting and paper panels |
| Call from the phone booth | The receiver lifts, a distant voice answers and the booth softly illuminates | Restrained indigo and warm gold | A faint call tone returns near the pavilion; indigo reaches its panels |
| Keep the wallet | A short seated pause occurs; the wallet remains visible in the player’s hands | Indigo and blue-green | A narrow indigo trace follows the player and remains behind them |
| Put it back | The wallet returns to its original position and the return ring settles around it | Sage and restrained coral | Growth circles the unresolved place while the route ahead remains open |

## Execution sequence

### 1. Stabilize the outcome contract

Status: **Complete.** The five immutable consequence profiles and parity tests now live in `src/encounters/wallet-encounter.mjs` and `tests/wallet-encounter.test.mjs`.

- Move outcome-specific presentation into a data-driven profile in `src/encounters/wallet-encounter.mjs`.
- Give every outcome a palette, sound motif, immediate animation, propagation target, delayed echo and factual reflection.
- Keep observation events factual and traceable.
- Add automated parity checks so no outcome is missing a consequence layer.

Acceptance:

- Every outcome exposes the same required fields.
- No profile contains moral language or inferred traits.
- Existing outcome and memory tests continue to pass.

### 2. Complete the five immediate physical resolutions

Status: **Complete.** Every option now uses the shared three-beat consequence timeline, briefly releases input only during the essential action, and resolves through visible object or character motion before its factual observation is recorded.

- Animate the relevant character or object instead of relying on captions.
- Keep each sequence approximately two to four seconds.
- Lock movement only while necessary, then return control automatically.
- Preserve the selected landmark; fade the other four sparkles together.

Acceptance:

- A player can describe what physically happened without reading result text.
- No outcome looks more “successful” than another.
- The player can continue walking after every outcome.

### 3. Build one shared pigment-propagation system

Status: **Complete.** The selected landmark now launches one persistent, profile-colored flow through ground, water, stepping stones, planting and paper. This pass also upgraded the five encounter objects and replaced the accumulating movement/collision behavior with a bounded planar controller.

- Start a broad pigment wave at the selected landmark.
- Travel visibly through nearby ground or water toward the main path.
- Continue into stepping stones, planting and paper.
- Preserve the traveled route behind the player.
- Use graceful easing and surface response rather than particle explosions.

Acceptance:

- The propagation origin clearly matches the selected landmark.
- Color moves through at least three connected environmental surfaces.
- The effect remains legible from first-person view and does not obscure navigation.

### 4. Create the delayed memory beat

Status: **Complete after normal-journey visibility revision.** The first version passed the accelerated harness but could emerge behind a normally walking player. The echo is now composed from the player's position when it begins, appears ahead of their gaze after a shorter 2.8-second pause, and uses broad pigment marks, sculptural outcome forms, translucent paper veils, and environmental bounce light. It settles into the route without announcing itself or duplicating on return. Mouse look and keyboard movement share one bounded frame-based camera controller.

- Place the first delayed echo far enough from the encounter that the player believes it is finished.
- Reuse the selected palette and sound motif in a transformed form.
- Let the pavilion receive the final convergent echo.
- Do not announce that the garden remembered.

Acceptance:

- The delayed change cannot appear before the relevant factual action.
- Every outcome produces a distinct but equally substantial delayed echo.
- Returning toward the wallet does not duplicate or corrupt the sequence.

### 5. Finish the reflection and continuation

Status: **Complete.** Passing through the moon gate now keeps the pavilion visible and reveals three restrained lines: the recorded wallet action, the physical garden change carried forward, and one factual movement observation. Escape safely returns to the pavilion threshold without erasing the outcome or its memory.

- Use one factual sentence describing the player’s action.
- Use one sentence describing what the garden carried forward.
- Optionally include one additional grounded movement observation.
- Keep the moon gate as continuation and recognition, not a results screen.

Acceptance:

- No diagnosis, score, trait or moral interpretation appears.
- All reflection lines can be traced to recorded events.
- The ending makes sense for all five outcomes, including unresolved ones.

### 6. Visual and audio polish

Status: **Complete.** Outcome palettes now converge into the pavilion paper and gate light, spatial motifs retain their source direction, landmark signal strength remains equal before selection, non-selected signals recede together, and reduced-motion preference substantially reduces camera bob while preserving state changes.

- Match pigment colors across landmark, path, water, planting and pavilion.
- Improve material response on the wallet, phone booth, notice paper, fabric and character.
- Give every sound a spatial source and short decay.
- Balance sparkle brightness equally before selection and reduce all non-selected signals together afterward.
- Respect reduced-motion preferences without removing meaningful state changes.

Acceptance:

- No decorative glow competes with the five pre-choice landmarks.
- Lighting stays luminous and readable.
- Audio never becomes constant music or a dark ambient drone.

### 7. Complete journey QA

Status: **Complete for implementation and automated coverage.** All five accelerated end-to-end journeys reached their matching three-line, non-diagnostic reflection with completed consequence and pavilion-entry state. Shared input and choice-proximity modules now cover keyboard/touch parity, dismissal clearance, and revisit behavior. The final unprompted-recognition criterion remains a human playtest gate rather than a code assertion; see `WALLET_STAGE_QA.md`.

Test five full journeys—one for each outcome—plus dismissal and revisit paths.

Verify:

- Keyboard, pointer and touch navigation.
- Confirmation and “Keep exploring” behavior.
- Collision recovery and no stuck states.
- Immediate animation, propagation, delayed echo and reflection.
- Equal sparkle intensity before selection.
- Sparkle cleanup after selection.
- No console errors or duplicate memory events.
- Stable performance throughout the full journey.

## Stage-completion gate

The wallet stage is complete only when:

1. All five choices have a finished physical consequence.
2. All five propagate visibly into the garden.
3. All five return later as a delayed memory.
4. All five produce a factual, neutral reflection.
5. Every journey works with keyboard and touch controls.
6. At least one unprompted player recognizes that an earlier choice changed a later place.

Only after this gate passes do we begin the next booth interaction.
