# Phase 0 Mechanic Inventory

Decisions below protect the original’s strongest ideas without treating every existing implementation detail as sacred.

| Current mechanic or function | Decision | Why | Required evolution |
|---|---|---|---|
| Free visit order across five situations | Preserve | Curiosity and self-directed sequencing are central behavioral evidence. | Express the encounters as discoverable places in one garden. |
| Spatial approach before interaction | Preserve | The player already commits through movement before being asked to choose. | Make approach, retreat, orientation and dwell first-class observations. |
| Simple direct movement | Preserve, stabilize | Low cognitive load keeps attention on the garden. | Add collision sliding, safe recovery, responsive delta handling and keyboard/touch parity. |
| Proximity-shaped sound | Preserve, redesign | It naturally teaches attention and distance. | Give cues visible spatial sources and material identities; remove constant generic beds. |
| Persistent completed-pavilion set | Redesign | It proves persistence but reduces memory to completion. | Store factual events and transformed world states without checkmarks. |
| Pavilion revisit | Preserve | Returning is essential to proving memory. | A revisit must find an evolved situation rather than a reset iframe. |
| Fifth encounter’s movement-based choice | Preserve as model | It is the original’s most embodied mechanic. | Remove the overt countdown and let lingering between spaces remain meaningful. |
| Pavilions 1-4 choice-card menus | Replace | They reveal the experiment and collapse behavior into declared answers. | Translate choices into distance, waiting, carrying, placing, listening and leaving. |
| Iframe-isolated pavilion worlds | Replace incrementally | They reset controls, atmosphere and memory at every encounter. | Move encounters into a continuous world after lifecycle stability is proven. |
| Entry confirmation modal | Simplify, then remove | It prevents accidental entry but interrupts immersion. | First stabilize proximity; later make thresholds readable in architecture, light and sound. |
| Green completion checks and minimap | Remove from player view | They imply objectives and completionism. | Use landmark composition, path legibility and environmental change. |
| “Finish game” button | Replace | It makes reflection a dashboard command. | Let the pavilion become available through the journey and remembered state. |
| Value-score dashboard | Remove from experience | It diagnoses and judges instead of reflecting observation. | Retain a development-only factual event viewer; compose deterministic, non-diagnostic reflection. |
| Authored moral outcome copy | Rewrite | “Helped,” “became part of the problem,” and similar lines tell the player how to read themselves. | Describe only what visibly happened and allow ambiguity. |
| Procedural Web Audio | Preserve selectively | It avoids asset weight and supports real-time parameter changes. | Combine restrained synthesis with material-aware footsteps, water, fabric and distant resonance. |
| End-overlay auto-detection | Replace after stabilization | It is brittle DOM inference, but it currently returns the player to the hub. | Use a unified explicit encounter-complete event contract. |
| Emergency Escape exit | Preserve | It is essential recovery. | Keep it available without framing departure as failure. |
| Player position push and cooldown after exit | Preserve intent, redesign behavior | It prevents instant modal re-entry. | Replace the abrupt push with safe threshold placement and debouncing. |
| Fixed random low-poly hub dressing | Remove | Random cones and boxes obscure composition and undermine the Art Bible. | Use deterministic, asymmetric masses and protected negative space. |

## Known implementation defects to repair in Phase 1

1. Pavilion proxies send `actionId` and `actionLabel`, while the parent integration expects `action` and `label`; decisions can arrive empty.
2. The injected bridge redeclares `BOOTH_ID`, creating a fatal duplicate declaration in affected pavilion documents.
3. `onBoothEnter` exists but is not called consistently, so visit counts and reaction timing are incomplete.
4. A close-message path calls undefined `closeBooth`; the hub’s actual function is `exitBooth`.
5. Pavilion 5 resolves spatially but does not emit equivalent decision/profile data.
6. Hub and encounter movement use independent input code, with no designed touch parity and insufficient stuck-key recovery.
7. Pavilion completion is inferred by polling presentation state rather than received as an explicit lifecycle event.

These defects do not justify redesigning the encounters in Phase 0. Phase 1 repairs them while keeping the original journey recognizable.

