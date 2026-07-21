# World Beautification — Step 0 Baseline

## Status

Step 0 is complete. This document freezes the current visual and usability baseline before any world-level redesign begins.

- Runtime entry: `http://localhost:8773/?v=world-baseline`
- Automated baseline: **118 passing tests**
- Live-browser baseline: **no runtime errors**
- Experience remains a real-time, first-person, walkable 3D world.
- No runtime visuals or interaction behavior were changed during this audit.

## Visual north star

The redesigned world should feel like a luminous watercolor landscape that can be entered: soft but spatially convincing, detailed without clutter, composed around negative space, and increasingly responsive to the player's remembered actions.

Detail must come from material, silhouette, layering, light, motion and environmental cause—not from filling every empty area with props.

## Major-view audit

| View | What already works | What weakens the world | Usability contract to preserve |
| --- | --- | --- | --- |
| Entry | The pale path and water establish direction immediately. The distant gate is visible. The palette remains bright and calm. | The terrain is almost completely flat. Repeated circular stones create a procedural rhythm. Tree trunks and clustered canopies read as simple primitives. The horizon is exposed and spatial depth is weak. | The gate must remain legible from the opening position. The player must understand forward movement without a tutorial interruption. The path must remain broad and collision-safe. |
| Wallet field | The wallet is recognizable. The crying person is now visible from the pickup composition. Five environmental choices occupy distinct locations. | The choices still feel like separate objects placed on a field instead of parts of one garden clearing. Ground contact and foreground framing are weak. Reveal effects can feel detached from the material world. | Collecting the wallet must not freeze movement permanently or immediately select an outcome. All five routes must remain available and equally discoverable. The person must be visible without instantly opening their prompt. |
| Threshold | The opaque paper door, knocker and call point communicate a physical passage. The interaction has a strong release animation. | The approach becomes visually cramped. The repeated plaster texture is noisy at close range. Large flat walls dominate the frame and reduce the sense of a garden. The prompt competes with the object. | Four actions, Escape dismissal, the opaque closed state, physical wall removal, exhale response and passable opening must remain intact. No decorative detail may obstruct the opening. |
| Shared dual field | Shelter left, Circle right and final gate center are readable in one composition. Neither encounter is automatically selected from the central view. | Both encounters resemble isolated circular stages. The surrounding ground is flat and empty. Architecture is thin and exposed. The final pavilion reads as a large flat wall rather than layered destination architecture. | The central route must stay open. Either encounter must remain completable first. A neutral centered look must not invent a preference. Prompts must never overlap. |
| Quiet Shelter | The seated posture, water vessel and call point communicate a situation without written instruction. The compact option card is now shown only after a close approach. | The platform, pool, screens and character are not sufficiently integrated. Transparent panels resemble glass. The large vessel can dominate the foreground. Contact shadows and layered planting are limited. | Distant observation must remain text-free. The prompt may gently turn the view but must not move the player. All five choices, Escape and the later return response must remain functional. |
| Circle | The five-character arrangement and central figure are understandable. The open approach gap and restrained gestures support navigation. | The limestone court reads as a floating circular platform. The frame and paper are sparse. Character silhouettes remain more geometric than the Art Bible. The court needs surrounding planting and terrain integration. | Five equally weighted routes must remain. The west approach gap must stay walkable. Every direct route needs a complete physical sequence; continuing onward must remain a real walking decision. |
| Moon gate | It remains a strong central landmark and final destination. The circular opening survives at long range. | The enclosing wall is too flat and broad. Material scale is repetitive. Distant mountains are simple translucent shapes. The pavilion lacks depth, layered eaves, planting and foreground reveal. | The gate must remain visible through the journey, stay physically reachable and preserve pavilion entry, reflection and Escape recovery. It must remain the final reflection point. |
| Memory response | Footsteps, pigment, planting, paper and encounter memories already form a connected system. Changes remain behind the player. | Some responses read as overlays or isolated marks instead of pigment absorbed by real materials. Environmental propagation is visually quieter than the interaction cards and platforms. | Every visible change must have a factual trigger. Memory must persist, routes must remain distinguishable, and effects must never block movement or hide interaction subjects. |

## Primary visual problems, in priority order

1. **Flat world silhouette** — the ground plane and exposed horizon make the experience feel small.
2. **Repeated procedural forms** — stepping stones, tree crowns, rocks and panels reveal repetition too quickly.
3. **Objects placed on top of terrain** — courts, structures and props lack believable transitions into soil, moss and water.
4. **Insufficient depth layering** — major views need foreground, middle-ground and borrowed distant scenery.
5. **Material scale inconsistency** — plaster, paper, water and limestone need distinct close-range behavior.
6. **Stage-like encounter islands** — important scenes are readable but visually separate from the living garden.
7. **Flat lighting hierarchy** — the world is luminous, but important surfaces and subjects need stronger large-scale light composition and contact grounding.
8. **Limited environmental motion hierarchy** — wind, water, cloth, planting and distant atmosphere need different rhythms.
9. **Interaction effects occasionally feel graphical** — cues should increasingly emerge from physical surfaces rather than floating marks or generic sparkle.
10. **Character and prop close-view quality** — silhouettes work, but hands, clothing construction, object joins and grounded poses require refinement.

## Usability lock

The following behavior is protected throughout every beautification step:

1. First-person keyboard, mouse, pointer and touch movement.
2. Stable camera yaw, pitch, field of view and reduced-motion behavior.
3. Collision sliding, world bounds and escape from all encounter areas.
4. Wallet collection and all five environmental outcomes.
5. Threshold sensing, four actions, wall release and open passage.
6. Shelter proximity rules, five actions and no forced camera relocation.
7. Circle proximity rules, five actions and a navigable approach gap.
8. Either-order completion of Shelter and Circle.
9. Persistent memory propagation and one-time return recognition.
10. The reachable moon gate, pavilion entry, personality reflection and Escape recovery.
11. Minimal interface, readable contrast and keyboard-focus visibility.
12. No permanent HUD, scores, diagnostic language or hidden mandatory instructions.

## Interaction-redesign permission

Interactions may become more beautiful, physical and detailed, but only under these rules:

- Existing behavioral choices and factual observation meaning must remain available.
- A new animation cannot delay control longer than the current interaction contract without an explicit reason.
- Camera changes may reframe gently but cannot teleport, trap or disorient the player.
- A visual cue may move into water, cloth, planting, stone, paper, sound or light, but it must remain equally understandable.
- Decorative geometry cannot become an invisible collision hazard.
- A changed interaction must work with keyboard, pointer and touch before it is accepted.
- Every new persistent world change must have a recorded player-action trigger.

## Performance and accessibility budgets

These are acceptance budgets for future steps, not measured claims about the current renderer:

- Preserve smooth movement on the current desktop target and a usable touch-device fallback.
- Prefer shared geometry, instancing and material reuse for vegetation and repeated detail.
- Use distant simplification and avoid high-cost transparency layers covering large portions of the screen.
- No animation may depend on a stable high frame rate to complete correctly.
- Reduced motion must retain information while removing large camera or environmental movement.
- Muted audio must never remove the only cue required to understand an interaction.
- Text contrast and focus indication must remain readable over every lighting phase.

## Per-step regression protocol

Every following step must pass this sequence before being considered complete:

1. Record the exact systems and views being changed.
2. Preserve a before reference for each major view.
3. Implement the visual change in an isolated, reversible layer.
4. Run the complete automated test suite.
5. Walk the affected section with keyboard and pointer controls.
6. Check touch controls and reduced motion when movement or interaction changed.
7. Verify collisions, prompt timing, Escape and onward navigation.
8. Compare the new composition against the Art Bible and this baseline.
9. Reject or simplify any detail that reduces clarity, performance or emotional focus.

## Step 1 readiness

Step 1 should begin with large-scale composition only:

- Sculpt the journey silhouette without changing encounter logic.
- Introduce terrain elevation and layered distant scenery.
- Frame the gate through vegetation and architecture.
- Integrate the Wallet, Threshold, Shelter and Circle into the land while preserving their current coordinates and trigger contracts initially.
- Keep all current collision targets visible during the first composition pass.

Small prop detailing should wait until the world silhouette and major views are approved.

## Step 1 completion — composition and terrain silhouette

Step 1 was implemented as an isolated visual layer. It changes the perceived scale and framing of the garden without changing the playable ground, encounter coordinates, trigger radii, camera height or collision contract.

### Added

- Ten organic outer berms beyond the playable world bounds to replace the exposed flat horizon with a softer land silhouette.
- Six framing groves outside the walkable corridor to create foreground and middle-ground depth.
- Four receding borrowed-scenery layers behind the pavilion so the destination remains legible without appearing pasted onto the horizon.
- Non-colliding land skirts around the Wallet, Shelter and Circle scenes, using open centers so the path, water and interaction courts remain untouched.
- A dedicated composition data module and safety tests so later visual passes can refine placement without mixing scenery with encounter logic.

### Usability verification

- The main path remains open from entry through the dual encounter field and onward passage.
- No new collision target was added inside the playable bounds.
- Wallet, Shelter and Circle anchor coordinates are unchanged.
- The moon gate remains visible from the entry and dual-field views.
- Keyboard, mouse, touch, prompt, choice, memory and reflection behavior remain covered by the unchanged regression suite.
- The complete automated suite passes: **124 tests, 0 failures**.
- Live reduced-motion checks passed at entry, the dual-field encounter view and the completed Shelter journey passage.

### Deliberate constraint

Playable terrain elevation remains unchanged in this pass. The current first-person controller assumes a stable camera height, so visible sculpting is restricted to protected outer scenery until a terrain-aware locomotion system can be introduced and tested independently.

## Step 2 completion — painterly surfaces

Step 2 replaces the most obvious close-range placeholder surfaces while leaving route and encounter geometry intact.

### Added and refined

- Dedicated 512px procedural watercolor textures for moss, path paper, limestone and the streambed.
- Fine pores, mineral veins, short fibers and broad pigment washes at different scales to reduce obvious repetition.
- Softer path-edge washes that visually dissolve limestone and paper into moss without changing the walkable ribbon.
- Moss seams beneath all 48 stepping stones to ground them in the landscape.
- Two visible stone streambeds and 72 submerged pebbles beneath the existing waterways.
- A revised translucent water shader with shallow-bank variation, broad pigment flow and restrained caustic light.
- Stronger roughness and low bump response so stone, moss and path surfaces remain matte rather than plastic.

### Usability and performance verification

- Route geometry and interaction geometry are unchanged.
- Path-edge washes, streambeds, submerged pebbles and stone seams are visual-only and non-colliding.
- The existing 48 stepping stones remain in the same positions.
- A live automated walk reached Chapter Two at the expected position without collision or control regression.
- Entry and Wallet-area views were checked at close range with reduced motion enabled.
- The complete automated suite passes: **128 tests, 0 failures**.

## Step 3 completion — layered vegetation

Step 3 introduces authored plant families and wind behavior without adding collision or filling the protected negative space.

### Added and refined

- Twenty-six positioned planting clusters distributed along water banks, outer passage edges, the dual-field perimeter and the pavilion approach.
- Four distinct plant families: ferns, reeds, irises and low groundcover.
- Curved stems, paired fern leaflets, layered iris blades, restrained flowers and varied ground-hugging silhouettes.
- Separate subtle wind profiles for each species so vegetation does not move as one synchronized mass.
- Reduced-motion scaling that preserves the sense of a living garden while reducing movement to twenty-two percent.
- Shared geometry and materials where practical to keep the richer vegetation pass within a sensible rendering budget.

### Usability verification

- All 26 clusters are visual-only; the obstacle list and collision system are unchanged.
- Main-route clusters remain at least 5.2 world units from the center line.
- Dual-field clusters remain at least 10 world units from the center, preserving both encounter courts and the central onward route.
- Wallet choice landmarks, Shelter, Circle and the moon gate remain visible in their authored views.
- Entry, Wallet close view and dual-field composition were visually checked in the running experience.
- The complete automated suite passes: **131 tests, 0 failures**.

## Step 4 completion — architecture and landmark refinement

Step 4 strengthens the threshold and final pavilion as composed, handmade architectural moments without changing their navigation or interaction contracts.

### Added and refined

- The threshold door remains fully opaque and now uses a seven-rib handmade-paper construction, a limestone sill and a more legible frame.
- Four mineral edge courses ground the two plaster walls and reduce the appearance of floating slabs.
- Threshold response marks were softened from graphic rings into restrained pigment fields.
- Threshold and Shelter fabrics now use draped geometry with authored hems and folds instead of flat planes.
- Shelter and pavilion paper panels now have irregular handmade silhouettes and slightly stronger material presence.
- The pavilion gained framed screen bays, structural posts, stone plinths and a clearer layered moon-gate reveal.
- Legacy dotted plaster and paper surfaces were replaced with mineral pores, fibers and broad watercolor washes.
- Footstep pigment marks were tightened and lowered into the path so they remain behind the player without crossing the camera.

### Usability verification

- The threshold remains centered at x 2.72 with the original 1.72 by 3.88 door opening.
- The door remains opaque before release.
- All new architectural details join the existing whole-wall release and disappear with it.
- No collision target, trigger, approach width or pavilion coordinate changed.
- The released passage reports open and complete, with the wall removed and onward route unobstructed.
- Threshold near/far views and the pavilion approach were inspected in the running experience.
- The complete automated suite passes: **134 tests, 0 failures**.

## Step 5 completion — characters and interactive props

Step 5 brings the encounter cast and choice objects into one contemporary faceted-watercolor construction language while preserving every existing choice, trigger and collision.

### Added and refined

- All seven visible characters now share facial marks, garment-edge construction and soft contact grounding.
- The crying visitor keeps the readable hands-over-face gesture and gains a layered bag flap, buckle and clearer clothing finish.
- The Quiet Shelter character gains facial definition, collar and hem construction without changing the seated pose or prompt distance.
- All five Circle figures receive the same finish while preserving their individual height, clothing silhouette, posture and authored gesture.
- The wallet gains visible card slots in addition to its fold, clasp, cards, stitches and crease.
- The phone booth again reads clearly as a call point through its handset, dial, speaker perforations and hanging cord.
- Notice papers and the bench textile now use irregular draped geometry rather than flat rectangular planes.

### Usability verification

- Wallet, Threshold, Shelter and Circle retain **19 total choices** with unchanged wording and behavior.
- No collision target, camera contract, trigger radius or interaction coordinate changed.
- All additions are visual-only children of existing groups.
- Entry, Wallet and shared dual-field views were inspected in the running experience.

## Step 6 completion — light, atmosphere and living pigment

Step 6 makes the garden-wide response feel environmental rather than like a collection of isolated effects.

### Added and refined

- Four luminous progression phases now describe the journey from cool ivory, sage and mist through turquoise/coral, gold/peach/indigo and a pale remembered sunset.
- Fourteen broad pigment fields settle into the route and remain spatially tied to the player's progress and accumulated memory.
- Three low-opacity atmospheric watercolor fields add large-scale turquoise, coral and gold bounce without darkening the world.
- Threshold arcs were replaced by hanging handmade-paper leaves; Shelter arcs became breathing cloth veils; Circle rings became low pigment intervals absorbed into the ground.
- The existing water, paper, planting, sky, fog, pavilion light and spatial sound systems remain the physical response channels.
- Reduced motion keeps every progression phase and material cue while limiting atmospheric drift.

### Usability verification

- The large floating encounter rings are removed from the runtime art-direction layer.
- Pigment and atmospheric fields are transparent, visual-only and non-colliding.
- The central dual-field route and the final moon-gate approach remain unobstructed.
- The completed journey reaches the `remembered-garden` phase at the pavilion while staying luminous and keeping the personality paragraph readable.
- The complete automated suite passes: **140 tests, 0 failures**.

## Step 7 completion — release polish, performance and accessibility

Step 7 verifies the complete experience as one continuous product and removes runtime costs that did not contribute to the visible frame.

### Performance refinements

- One stable device-quality profile now controls pixel ratio, shadow resolution and reduced-motion scale before and after resizing.
- Desktop pixel ratio is capped at 1.25, compact/coarse-pointer devices at 1.0 and reduced-motion rendering at 1.1.
- A conservative frame monitor can lower render resolution only after a sustained expensive sample window; it never changes movement or interaction timing.
- Distant Shelter, Circle and Threshold detail is paused until it enters a generous visual range.
- Small vegetation, hidden memory marks, zero-opacity effects and unreadable tree join detail no longer submit unnecessary draw calls.
- Persistent footstep pigment retains the latest 72 marks, keeping a meaningful trail without unbounded individual draws.
- In the local reduced-motion release check, entry draw calls fell from **2,667 to 1,223** and the shared encounter view rendered at **914 calls** while preserving its full composition.

### Accessibility refinements

- The final personality reflection is now a correctly labelled modal dialog with explicit hidden and inert states.
- Keyboard focus moves to “Begin again” when the reflection becomes available.
- Escape closes the reflection, restores the pavilion view and removes the dialog from the accessibility tree.
- Entry focus leaves the now-hidden opening button and returns to the experience surface.
- Closing an encounter menu clears held movement input and restores neutral focus without stealing focus from a newly opened dialog.
- Touch targets retain their 52px rendered size, above the 44px release minimum.
- Reduced motion preserves every informational color, material and memory phase while lowering environmental drift to twenty-two percent.

### Complete-journey verification

- Real keyboard input moved the player forward without drift or control switching.
- Real touch input moved the same movement axis and all four touch controls remained available.
- Wallet reveal, Threshold prompt, shared Shelter/Circle composition, final moon-gate entry and personality reflection were checked in the running experience.
- Threshold and encounter culling restores the complete scene before its approach range and never changes triggers or collisions.
- The final reflection contains a personality paragraph rather than action, step or color reporting.
- Release diagnostics confirm no interaction geometry, collision or movement contract changes.
- The complete automated suite passes: **143 tests, 0 failures**.
