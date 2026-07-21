# Phase 3 — Wallet Encounter Vertical Slice

Playable proof: `index.html`

The original low-fidelity `lost-place-prototype.html` remains only as an internal mechanics reference. Its factual interaction and memory loop have now been integrated into the visually stronger garden rather than developed as a competing player-facing build.

## What is now player-visible

- A continuous first-person garden path leading through the original wallet situation to a moon gate.
- The recognizable wallet sits at the center of the route. Reaching it picks it up and reveals five equally sparkling possibilities across the field.
- The crying person, public notice board, phone booth, quiet bench and return stone occupy different sides and depths so exploration is required.
- Approaching a possibility opens a short contextual confirmation, such as “He’s crying. Should we check with him?”, with an equal option to keep exploring.
- The crying person now retains the original’s readable rounded character language: hoodie, face, eyes, hands and legs, with a seated crying pose and visible tears that respond to the outcome.
- The wallet, crying person, notice papers, phone booth, bench or return stone visibly respond to the confirmed choice, and the garden carries its color forward.
- Footsteps leave persistent turquoise/coral pigment traces.
- Leaving the encounter schedules a delayed response in planting and the pavilion’s paper surface.
- Returning schedules a separate recognition response at the original site.
- The gate reflection describes only recorded behavior.
- Arrow keys now walk and turn like first-person controls; WASD provides forward/back and strafing; pointer-look and touch use the same orientation model.
- Reduced-motion preference removes nonessential transition timing.

## Observable event coverage

- `location.entered`, `location.exited`
- `movement.approached`, `movement.retreated`, `movement.still`
- `environment.contact`
- `object.picked_up`, `object.placed`

Each environmental response is created by `MemoryDirector` and stored in `MemoryState` with factual trigger IDs.

## Current branch policy

The player-facing proof now lives in the designed garden. Supporting files remain separate by purpose:

- `stable-prototype.html`: verified original-mechanics baseline.
- `memory-prototype.html`: full five-pavilion memory integration/QA branch.
- `index.html`: canonical integrated experience.

## Gate 3 status

Implementation proof is ready in the designed build. Automated checks verify all five original wallet outcomes, factual memory records and neutral reflections. Browser journeys verify the centered-wallet reveal, equal landmark visibility, keyboard turning, proximity confirmation and “keep exploring” path without runtime errors. The player-test gate is still open.

Required next test:

1. Give at least five people the slice without explaining memory.
2. Verify that four notice an earlier action affecting a later moment.
3. Verify that three independently describe recognition or remembering.
4. Confirm that no more than one describes it as a personality test.
5. Confirm that ignored, carried, returned and placed-elsewhere paths do not read as punishment.

The rejected side-room translation of the Divided House was removed after review. The next situations must also be stumbled upon along the path and must contribute to the same continuously growing world.
