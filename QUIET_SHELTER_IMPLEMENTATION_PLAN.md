# Third Interaction — The Quiet Shelter

## Implementation status — Steps 0–3 complete

- The five original action identities are frozen as `support`, `reach`, `water`, `call` and `leave`, with exact mappings back to the legacy IDs.
- Four actions resolve through a physical sequence; giving space resolves only after physical departure. Passing without opening the prompt remains a valid route.
- The allowed observation vocabulary is factual and contains no trait, clinical or moral fields.
- Wallet, threshold, movement, memory and reflection regression suites remain part of the required test run.
- **Step 1 complete:** the second garden chapter now extends beyond the threshold, the final moon gate has moved farther into the landscape, and a paper, limestone, textile and shallow-water shelter is composed beside the path with clear negative space and an uninterrupted walking route.
- **Step 2 complete:** the shelter now contains a slender seated cloth-led figure with a closed posture and restrained torso/fabric breathing, a weighted limestone-and-textile seat, a recognizable ceramic water vessel and an architectural aged-metal call point.
- All four elements are permanent scene objects visible before interaction. There are no icons, generic sparkles, visible tears, head bobbing or temporary prompt-only props.
- **Step 3 complete:** proximity and gaze now control a restrained spatial breath response shared by the figure, shelter textile, handmade paper and shallow-water rings. The scene records factual approach, retreat, orientation, stillness, departure and return signals.
- The five-choice contextual prompt appears only at close range while facing the person. It remains absent at a distance, and Escape closes it and restores control immediately.
- The camera/view convention was corrected so mouse look, keyboard turning, movement direction, interaction sensing and cinematic focus now agree.
- **Next step:** Step 4, implementing five equally substantial physical action sequences and resolving the currently staged shelter choice through visible cause and response.

## Purpose

The next interaction adapts the original third booth: a person sits alone, appears unsettled, and does not ask the player for anything.

The original five courses of action remain recognizable:

1. Offer quiet support.
2. Reach out gently.
3. Leave water.
4. Call for help.
5. Leave and give the person space.

This encounter is about how the player handles uncertain human boundaries. It must not tell the player whether intervention, distance, touch, water or outside help was correct.

## What must be preserved

- A human situation understood before text appears.
- Proximity-based breathing and environmental sound.
- The fact that the person has not requested anything.
- Five equally available courses of action.
- Walking away as a complete choice, not a failure state.
- Direct keyboard, pointer and touch control.
- The original tension between presence, physical contact, practical help, outside help and distance.

## What must change

- Remove the isolated room, iframe, start screen and ending overlay.
- Do not reuse the wallet encounter's crying-person performance.
- Remove cartoon tears, emojis, head wobbling, exaggerated gratitude and recoil.
- Replace punitive text such as “you disturbed him” with observable physical responses.
- Replace the full-screen phone and text conversation with an architectural call point.
- Do not claim that water calmed the person or that outside help solved the unseen situation.
- Keep the moon gate beyond this encounter as the final reflection point.

## Step 0 — Freeze the original behavior contract

Before scene work:

- Add a pure encounter contract for `support`, `reach`, `water`, `call` and `leave`.
- Preserve five actions and their original dramatic intent in automated tests.
- Define which actions resolve immediately and how physical departure resolves `leave`.
- Record only factual fields: approach, retreat, distance, orientation, dwell, action, interruption, completion and return.
- Add regression coverage for the finished wallet and threshold encounters.

Acceptance:

- No original course of action disappears.
- No profile contains moral, clinical or personality language.
- Existing wallet, threshold, movement and reflection tests remain green.

## Step 1 — Place the encounter in the continuous journey

- Extend the existing path beyond the threshold without loading or teleporting.
- Place a shallow paper-and-limestone shelter beside the route, not inside a separate room.
- Seat the person slightly off-axis, visible through fabric and planting before the player reaches them.
- Preserve a clear path around the shelter so continuing forward is always physically legible.
- Frame the distant moon gate beyond the shelter so the player understands that the journey continues.
- Keep enough negative space for the person's posture and the player's chosen distance to read.

Acceptance:

- The player can approach, pass, retreat and return without entering a special mode.
- The person is noticeable but does not block navigation.
- The final gate remains visible as the long-range destination.

## Step 2 — Build the Art Bible character and object composition

### Character

- Build a slender, adult, cloth-led seated figure using the Art Bible proportions.
- Give this person a distinct identity from the wallet character while preserving the same handmade visual language.
- Use a closed profile: lowered gaze, gathered shoulders, hands mostly contained by cloth and grounded feet.
- Communicate uneven breathing through restrained torso and fabric movement, not head bobbing or visible tears.
- Keep facial detail minimal; posture must carry the situation from normal first-person distance.

### Objects

- Build a low limestone seat with a weighted textile.
- Place a recognizable ceramic water vessel within the composition from the beginning.
- Integrate an aged-metal call point into the shelter wall or post.
- Use translucent handmade-paper panels and shallow water as environmental response surfaces.
- Ensure every object has believable contact, construction detail and scale.

Acceptance:

- The person reads as human and emotionally contained without text.
- Water vessel, seat and call point are recognizable without icons.
- Nothing floats, sparkles generically or appears only after the prompt.

## Step 3 — Create discovery through sound, motion and distance

- Add sparse spatial breathing with an understandable source at the seated figure.
- Let proximity reveal more breath detail without making it frightening or medicalized.
- Synchronize nearby paper, textile and shallow water with the same restrained cadence for muted players.
- Record approach, retreat, gaze, maintained distance, stillness and return.
- Show no text while the player is merely observing from a distance.
- Open the contextual prompt only at close range and when the player is oriented toward the situation.

Prompt:

> Someone is sitting here alone. They have not asked for anything. What do you do?

Actions:

- Sit nearby.
- Offer a hand.
- Leave water within reach.
- Use the call point.
- Give them space.

Acceptance:

- The situation is understandable with audio muted.
- The prompt clarifies rather than explains the scene.
- Escape closes the prompt and immediately restores movement.

## Step 4 — Implement five equal physical action sequences

Each action follows the same production structure:

> attention → physical cause → human/environmental response → control returns → quiet trace

### Sit nearby

- The nearby textile settles and the player's viewpoint lowers only slightly, without a forced cinematic camera move.
- The figure's shoulders gradually release a small amount.
- Paired water rings begin at the two occupied positions.
- Do not describe the person as comforted or grateful.

### Offer a hand

- Present the gesture as an offer, not automatic contact.
- The figure turns slightly and makes a small, readable hand gesture that preserves their agency.
- The response may communicate a boundary without recoil, punishment or humiliation.
- Avoid deciding internally that the person accepted or rejected the player as a moral result.

### Leave water within reach

- Move the existing ceramic vessel to a clear position within reach.
- Leave condensation, water refraction and a broad turquoise response in nearby surfaces.
- The figure may notice the vessel, but the game must not claim they drank or improved.

### Use the call point

- Lift the architectural receiver with physical weight.
- Answer with a short distant acknowledgement and a restrained indigo/gold signal.
- Do not show a phone screen, chat bubbles, responder characters or a guaranteed outcome.

### Give them space

- Close the prompt and preserve full movement.
- Resolve only when the player physically crosses the downstream boundary.
- Let fabric, paper and water settle into a complete sage/ivory state so leaving never looks unimplemented.

Acceptance:

- All five actions receive comparable animation, sound, material response and duration.
- The camera finishes aligned with a valid walkable route.
- No branch uses praise, blame, success, failure or invented consequences.

## Step 5 — Propagate each choice through the garden

Create five distinct but equally substantial memory profiles:

| Action | Primary palette | Immediate response | Delayed memory |
|---|---|---|---|
| Sit nearby | Mist blue + warm ivory | Paired water rings and textile settling | Two quiet rhythms appear in downstream paper |
| Offer a hand | Restrained coral + indigo | Hand/fabric seam carries pigment outward | A single open fold returns in later canopy fabric |
| Leave water | Turquoise + mineral gold | Refraction spreads from vessel into basin and stones | Moist pigment edges bloom beside the later path |
| Use call point | Indigo + warm gold | Signal travels through metal, paper and water | Paired light reaches canopy and moon-gate paper |
| Give space | Sage + pale ivory | Shelter settles and negative space becomes more visible | Quiet closed-paper motif appears downstream |

Every profile must reach:

- Character cloth.
- Shelter material.
- Shallow water.
- Path or stepping stones.
- Planting.
- Downstream paper or canopy.
- The final moon-gate composition.

Acceptance:

- Each route is visually complete and equally memorable.
- Responses are broad pigment waves, not particle bursts.
- The primary response settles but never disappears completely.

## Step 6 — Build persistent and return memory

- Preserve the same person, shelter and objects after resolution.
- Do not automatically reopen the choice prompt on return.
- Recognize one physical return with a subtle gaze, cloth, water or paper response.
- Keep the selected object state stable: vessel position, call-point thread, textile impression or open negative space.
- Never invent what happened to the person while the player was away.
- Establish palette-priority rules so wallet, threshold and shelter memories can coexist without turning the garden multicolored or noisy.

Acceptance:

- Returning creates one recognition event, not duplicate choices or consequences.
- The chosen route can be inferred from the composition without UI text.
- Earlier encounter memories remain visible and distinguishable.

## Step 7 — Integrate the encounter into the final personality portrait

Use only factual evidence:

- Distance the player maintained from the figure.
- How long they observed before acting.
- Approach, retreat and return patterns.
- Whether they chose direct presence, offered contact, practical support, outside help or distance.
- Whether they interrupted or completed an action.
- Their movement shape before and after the encounter.

Use these signals internally to refine the existing dimensions, especially deliberation, responsiveness, self-direction and adaptability.

The final gate should still show one cohesive personality paragraph. It must not mention action IDs, expose dimensions, diagnose the player, call them empathetic or selfish, or declare one boundary decision correct.

Acceptance:

- Different combinations of movement and encounter behavior produce meaningfully different paragraphs.
- The same evidence always produces the same paragraph.
- The output remains tentative, nuanced, non-clinical and non-moralizing.

## Step 8 — Complete journey and accessibility QA

Test at minimum:

1. Pass without opening the prompt.
2. Approach, observe and retreat.
3. Sit nearby.
4. Offer a hand.
5. Leave water.
6. Use the call point.
7. Give space through physical departure.
8. Dismiss with Escape and continue walking.
9. Return after each resolved action.
10. Complete wallet → threshold → shelter → moon gate.
11. Keyboard, pointer and touch completion.
12. Muted-audio journey.
13. Reduced-motion journey.
14. Repeated long-session movement and collision stability.
15. Final reflection and Escape recovery.

Acceptance:

- No stuck keys, wall traps, camera jumps, duplicate prompts or duplicate memory events.
- The route remains readable at every action endpoint.
- Character acting remains restrained at normal viewing distance.
- All five branches have equal visual and sonic weight.
- Real-time performance remains stable after three accumulated memory systems.

## Completion gate

The Quiet Shelter is complete only when:

1. All five original actions remain recognizable.
2. The encounter is understandable without written instruction or audio.
3. The person is clearly distinct from the wallet character.
4. No branch claims a medical, emotional or moral outcome.
5. Every action changes character, object and environment together.
6. Every action leaves an immediate, delayed and persistent trace.
7. Return recognition works without reopening the prompt.
8. The final personality portrait incorporates the new evidence without exposing a score.
9. The complete three-encounter journey works on keyboard and touch.

Only after this gate passes should implementation begin on the original fourth encounter, The Circle.

## Explicit exclusions

- No separate room, pavilion, iframe or loading screen.
- No crying-person duplicate of the wallet encounter.
- No diagnosis or medical emergency claim.
- No automatic touching without an offered gesture.
- No exaggerated recoil, gratitude, emoji or visible tears.
- No full-screen phone interface.
- No correct answer, reward, punishment or failure state.
- No new gate before the final moon gate.
- No decorative object scattering to make the area feel fuller.
