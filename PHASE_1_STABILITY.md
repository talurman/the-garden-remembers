# Phase 1 — Stability Record

Working implementation: `stable-prototype.html`

Current verified SHA-256: `b9805c2bf537eeba6fa068fa1831c230f36b45372eada92a68829ef1f4dfecdf`.

The Phase 0 reference remains unchanged. This phase repairs the original architecture without applying the Art Bible redesign or converting the encounters.

## Repairs implemented

### Lifecycle and messages

- Normalized both message forms: `actionId`/`actionLabel` and `action`/`label`.
- Replaced the injected duplicate `BOOTH_ID` declaration with a bridge-specific identifier.
- Connected every pavilion entry to the factual visit timer.
- Replaced the undefined `closeBooth` message path with the real, idempotent `exitBooth` path.
- Guarded exit messages against stale or mismatched pavilion IDs.
- Made bridge completion the preferred lifecycle signal; retained end-overlay polling only as a compatibility fallback.
- Removed the unsafe “dark body means complete” fallback that prematurely closed pavilion 5.
- Unified IDs as `booth1` through `booth5` in observation records.
- Added the missing spatial-resolution decision event to pavilion 5.
- Distinguished completion exit from emergency/QA exit so recovery does not falsely mark progress.

### Movement and recovery

- Clamped frame deltas to 50 ms in the hub and every pavilion.
- Clears held keys on window blur and document visibility loss in both parent and child contexts.
- Added finite world boundaries and collision sliding around pavilion volumes.
- Added invalid-position recovery instead of allowing non-finite or trapped movement.
- Corrected cancel/exit displacement so the player moves away from a threshold rather than further inside it.
- Added idempotent re-entry cooldown and active-pavilion validation.
- Preserved Escape as a safe non-completing exit.
- Forwarded Escape from the focused pavilion iframe to the parent lifecycle controller; iframe focus no longer swallows emergency exit.

### Keyboard, pointer and touch parity

- Added holdable touch/pointer controls for forward, reverse, rotation and confirmation.
- Routed the same controls into the active pavilion iframe.
- Added a minimum tap impulse so touch taps remain useful while long presses stay continuous.
- Added missing pointer selection handlers to pavilions 3 and 4.
- Existing keyboard controls and clickable entry modal remain intact.

### Observation and player-facing UI

- The value-analysis button and dashboard are hidden in the normal experience.
- `?debug=1` enables a factual QA event viewer and encounter jump controls.
- The QA viewer lists only entered locations, observed choices, exits and timing.
- No score, dominant value, trait or diagnosis is calculated for the QA output.
- `?touch=1` forces touch controls for desktop testing.

## Repeatable QA route

Run:

```text
http://localhost:<port>/stable-prototype.html?debug=1&touch=1
```

The `B1`–`B5` controls enter a pavilion without changing its internal behavior. `Exit` exercises a safe non-completing return. “אירועי QA” exposes the session’s factual contract without appearing in the normal player URL.

## Live verification completed

| Area | Verification | Result |
|---|---|---|
| Default hub | Loads as real-time Three.js; QA dashboard absent unless enabled | Pass |
| Pavilion 1 | Entered, started, reached choice through touch movement, selected an action, resolved, auto-returned, recorded decision and exit | Pass |
| Pavilion 2 | Entered, started, reached door through touch movement, selected police action, resolved and auto-returned | Pass |
| Pavilion 3 | Entered, reached choice through touch movement, selected through repaired pointer handler, resolved, recorded and auto-returned | Pass |
| Pavilion 4 | Entered, reached choice through touch movement, selected through repaired pointer handler, resolved, recorded and auto-returned | Pass |
| Pavilion 5 | Entered, remained active on its dark scene, reached timeout, recorded `time_expired`, auto-returned with no console warning/error | Pass |
| QA viewer | Shows canonical factual enter/decision/exit events; no value scores | Pass |
| Touch controls | Reach a menu through repeated taps and support held input | Pass |
| Emergency/QA exit | Returns to hub without marking completion | Pass |
| Frozen source | Desktop original and `legacy-prototype.html` remain byte-identical | Pass |

## Remaining Gate 1 verification

Before declaring Gate 1 closed:

1. Complete the release-device coarse-pointer/mobile viewport pass.
2. Complete the release keyboard-only accessibility pass.

All five pavilion lifecycle paths have passed live completion and automatic-return testing. Device-specific release coverage continues in Phase 8.

No visual redesign should begin until these checks pass.
