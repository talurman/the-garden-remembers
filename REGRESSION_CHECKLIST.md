# Original Regression Contract

This checklist defines what must remain possible while the prototype evolves. “Preserve” means preserve the player capability or dramatic function, not necessarily the original UI or implementation.

## Gate 0 audit status

- [x] External original and workspace reference have identical SHA-256 hashes.
- [x] Workspace reference loads as a real-time Three.js experience with no initial console error.
- [x] Hub entry view, five pavilion markers, chase camera, minimap, control hint and finish control are present.
- [x] Source-level state paths for all five pavilion journeys have been traced from start through resolution.
- [x] Every preserved behavior below has an explicit regression test.
- [x] Known integration faults are isolated and assigned to Phase 1 rather than hidden by visual changes.

## Hub regression tests

- [ ] Forward and reverse movement remain responsive at stable speed across frame rates.
- [ ] Left and right rotate without camera instability or a stuck key after focus loss.
- [ ] All five encounter locations can be reached in any order.
- [ ] Approaching a threshold reveals entry affordance; declining leaves the player in control.
- [ ] Accepting entry never double-opens, loses input or leaves the hub visible beneath the encounter.
- [ ] Exiting returns to a safe nearby position without immediate re-entry.
- [ ] Revisit remains possible after an encounter has changed.
- [ ] Restart and reload have an explicit, predictable persistence policy.
- [ ] Escape or an equivalent recovery path always returns control safely.

## Encounter regression tests

### 1 — Lost wallet / Lost Place

- [ ] The player can notice the object and continue without forced interaction.
- [ ] Approach, retreat, hesitation and return remain possible.
- [ ] Inspecting, taking/carrying, placing, leaving and approaching the visitor can be represented through action.
- [ ] No behavior is labeled correct, failed, selfish or helpful.
- [ ] A later return reveals a state caused by the recorded factual behavior.

### 2 — Hallway / Threshold

- [ ] Sound intensity communicates distance from the threshold.
- [ ] The player can listen, approach, withdraw, wait, knock/act or leave.
- [ ] Repeated approaches and partial engagement are recorded without forcing completion.
- [ ] The outcome remains spatially and acoustically understandable without a choice card.

### 3 — Quiet room / Quiet Shelter

- [ ] The player controls interpersonal distance and can remain still.
- [ ] Water, approach, withdrawal, waiting and leaving are available behaviors.
- [ ] Touching/helping is never the only completion path or implicitly scored as better.
- [ ] Sound responds calmly to proximity and has an understandable source.

### 4 — Circle

- [ ] The player can observe from outside, enter, reposition, interrupt, divert, follow or leave.
- [ ] Doing nothing and returning later are legible states, not failures.
- [ ] Crowd and child states change visibly without moralized summary text.
- [ ] Sensitivity review confirms the child is not used as a scoring prop.

### 5 — Divided house

- [ ] The primary choice remains embodied in movement, not a menu.
- [ ] Either room can be entered and the player can linger between them.
- [ ] There is no forced countdown or failure for indecision.
- [ ] Light and sound make both spatial pulls understandable without objective markers.
- [ ] Re-entering reflects the earlier route or dwell pattern.

## Lifecycle and observation tests

- [ ] One explicit contract handles encounter enter, observation, resolve, leave and revisit.
- [ ] Every visible memory maps back to one or more factual events.
- [ ] No stored or displayed field names a personality, value, diagnosis or moral score.
- [ ] Leaving an encounter unresolved is stored as a valid factual state.
- [ ] The garden preserves relevant transformed state behind the player and after revisits.
- [ ] Development telemetry is not visible in the player experience.

## Input, accessibility and performance tests

- [ ] Keyboard, pointer and touch can complete the same journey.
- [ ] Reduced-motion mode removes nonessential camera/particle motion without removing meaning.
- [ ] Audio begins only after consent or a user gesture and the experience remains understandable muted.
- [ ] Essential text is readable, focusable and operable without precise pointer input.
- [ ] Collision never traps the player; invalid positions recover safely.
- [ ] The complete journey remains real-time 3D and meets the agreed frame-time budget on target desktop and mobile devices.

## Regression rule

For each implementation phase, mark applicable items only after a live end-to-end run. A visual resemblance is not a pass. A replaced mechanic passes only when the player can still perform the underlying behavior and the emotional function is stronger or equal.

