# Phase 0 View and Timing Reference

Reference viewport: 1280 × 720 desktop browser. Baseline: `legacy-prototype.html`, verified against the attached original on 2026-07-20.

This is a reconstruction target, not an aesthetic target. It records what the original communicates and when so later changes can be compared without accidentally deleting dramatic function.

| View | Original composition and readable event | Timing reference | Preserve in redesign | Do not preserve literally |
|---|---|---|---|---|
| Hub entry | Elevated chase view over a broad green field; straight central path; pavilion 1 centered ahead; four booths beyond; conical trees; minimap lower left; permanent controls and finish button | Interactive immediately; pavilion 1 threshold after about 2.25 seconds forward | Immediate agency, readable first landmark, freedom to choose another route | Random cones, numbered-box feeling, minimap, permanent HUD, analysis button |
| Pavilion 1 — Lost wallet | Narrow first-person space aligns player, wallet and nearby visitor; object becomes the visual question before the menu appears | Wallet menu after roughly 2.5 seconds of direct approach; authored resolutions play over several seconds | Noticeable lost object, relationship between object and person, ability to approach/leave/return | Choice cards, forced retry branches, moral implication |
| Pavilion 2 — Hallway | Long corridor terminates at apartment door; sound grows with proximity and creates the event before visible resolution | Door reached in roughly 4-5 seconds; knock/listen return to menu; call/ignore resolve after authored delay | Threshold tension, sound-as-guidance, approach/listen/withdraw | Menu, generic corridor box, binary “acted/ignored” framing |
| Pavilion 3 — Quiet room | Sparse enclosed room and isolated distressed figure; player closes interpersonal distance | Interaction after several seconds of approach; each selected action resolves through a short animation/text beat | Spaciousness, distance as meaning, stillness, water and leaving as possible actions | Moralized authored labels, required card selection |
| Pavilion 4 — Circle | Child centered inside a ring of adults; bodies and sound form a social boundary | Circle reached in roughly 1.5-2 seconds; selected branch resolves after a brief performance | Legible social geometry, outside/inside positions, the possibility of observation and diversion | The child as a scoring device, taunting caricature, explicit good/bad outcomes |
| Pavilion 5 — Divided house | Corridor opens toward warm and modern rooms; color and procedural audio pull laterally; no choice-card decision | Split reached after about 5 seconds; room boundary several seconds later; timeout at 20 seconds | Movement as choice, competing spatial atmospheres, hesitation between options | Visible countdown, timeout-as-result, simplistic warm-versus-modern judgment |
| Return to hub | Encounter iframe disappears; completed booth gains green check; player position jumps away from its threshold | Ending poll every 500 ms; stable end auto-closes after about 1-1.5 seconds; re-entry locked for 1.6 seconds | Clear return to exploration, persistence, safe re-entry prevention | Abrupt push, completion check, emotional reset |
| Analysis dashboard | Large near-black overlay covers the garden; lists elapsed time, choice count, visited pavilions, average reaction time, dominant and less-emphasized values, tags and heuristic interpretation | Opens immediately from permanent “Finish game” control | A deliberate final pause and review of the journey | Dashboard, rankings, scores, dark overlay, traits, diagnosis-adjacent language |

## Visual comparison questions for later phases

For every replacement view, verify:

1. What situation can the player understand without text?
2. What can the player do besides advancing?
3. Which visible or audible change is caused by their behavior?
4. What remains changed after they leave?
5. Is the moon gate or another compositional anchor maintaining orientation?
6. Is negative space carrying attention, or has decoration filled it?
7. Does any response accidentally read as reward, punishment or diagnosis?

## Phase 0 live observations

- The hub loads successfully as real-time Three.js and exposes its five-location layout.
- The dashboard opens and closes correctly from the hub.
- With no registered decisions it still displays ten value categories at a neutral score of 50 and states that it identifies tendencies from choices and timing; this validates the decision to remove it from the player experience.
- The dashboard itself warns that no decisions were recorded and asks whether pavilion clicks are emitting `DECISION`, matching the message-contract defects found in the source audit.

