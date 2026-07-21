# Phase 2 — Factual Memory Model

## Implemented foundation

The memory system now exists as framework-independent ES modules under `src/memory/`:

- `ObservationLog`: append-only factual events with stable IDs, validation and serialization.
- `MemoryState`: location facts and traceable world changes.
- `MemoryDirector`: schedules immediate, delayed, return and convergent responses.
- `ReflectionComposer`: deterministic Hebrew reflection built only from recorded events.

## Safety boundary

The observation schema accepts actions such as entering, exiting, approaching, retreating, waiting, looking, carrying, placing and environmental contact. It rejects unknown event types and inference-like fields including personality, traits, diagnosis, empathy, anxiety, scores and value rankings.

Every world change must contain at least one valid `triggerEventId`. A response without a recorded cause cannot enter `MemoryState`.

## Current response vocabulary

| Layer | Current trigger | Neutral response token |
|---|---|---|
| Immediate | Environmental contact | `pigment_echo` |
| Delayed | Leaving a location | `planting_echo` downstream |
| Return | Entering a location more than once | `return_recognition` |
| Convergent | Entering at least three distinct locations | `paper_convergence` at pavilion |

These are semantic response instructions, not visual implementations. Step 3 will translate them into the first complete Lost Place memory loop.

## Deterministic reflection examples

- Returned to a named place after leaving it.
- Count of approaches and retreats before continuing.
- Total observed stillness when it exceeds three seconds.

Each line includes the IDs of the observations supporting it. No line assigns a quality or motive to the player.

## Verification

`node --test tests/memory-system.test.mjs`

The test suite verifies factual validation, forbidden inference rejection, trigger traceability, all four memory layers and deterministic reflection.

## Gate 2 completion

- Normalized pavilion entry, threshold contact, decision and exit events now feed `ObservationLog`.
- `ObservationLog`, `MemoryState` and pending director responses persist across reload.
- Immediate, delayed, return and convergent instructions are exposed through the factual QA adapter.
- Legacy value-inference profiles, scoring functions and unreachable diagnostic rendering were removed from the Step 2 build.
- Every QA memory response displays the observation IDs that caused it.
- Reload and revisit testing confirmed delayed memory persistence and `return_recognition` reconstruction.

Gate 2 is complete. Player-visible environmental performance begins in Step 3 rather than leaking development tokens into the experience.

Integration proof: `memory-prototype.html`.
