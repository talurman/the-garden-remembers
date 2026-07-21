# Original Behavioral Flow

## Complete journey

```text
Load hub
  -> restore completed pavilion IDs from localStorage
  -> explore park with tank controls and chase camera
  -> enter a pavilion proximity radius
  -> accept or decline an entry modal
  -> accept: load that pavilion template into an iframe
  -> approach its subject or spatial threshold
  -> choose through a menu (pavilions 1-4) or movement (pavilion 5)
  -> encounter resolves and displays an ending
  -> parent detects completion, closes iframe and restores hub
  -> pavilion ID is persisted and shown with a green check
  -> player is pushed away and entry is cooled down for 1.6 seconds
  -> explore another pavilion or open “Finish game”
  -> dashboard scores and classifies the recorded decisions
```

The visit order is free. A completed pavilion can be revisited. Completion changes only the hub marker; the pavilion itself restarts from its initial state.

## Hub state machine

| State | Entry | Player action | Exit |
|---|---|---|---|
| `park` | Initial load or pavilion exit | Rotate, move, approach any booth, open dashboard | Proximity under 7 opens entry modal |
| Entry modal | Booth approached | Left/right selection, Enter, pointer click | No returns to park; Yes loads booth |
| `booth` | Selected template copied into iframe `srcdoc` | Encounter-specific controls; Escape is emergency exit | Ending detector or emergency exit |
| Exit cooldown | Iframe removed | Hub is visible; immediate re-entry suppressed | 1.6 seconds then normal park state |
| Dashboard | “Finish game” or child message | Inspect generated analysis; close | Return to prior visible state |

Hub movement starts at `(0, 45)` facing toward pavilion 1. Forward speed is 8 world units per second. The nearest pavilion’s entry radius is reached after roughly 2.25 seconds of uninterrupted forward movement.

## Pavilion reference matrix

| Pavilion | Dramatic situation | Interaction threshold | Available behavior | Resolution | Approximate approach |
|---|---|---|---|---|---|
| 1 — Lost wallet | Wallet lies near another visitor | Player within 2 units of wallet | Ask, take, document, help, leave | Ask and take resolve; document/help force a retry; leave backs away | Start `z=9`, wallet `z=-3`; about 2.5 seconds |
| 2 — Hallway | Disturbing sound behind apartment door | Near-door distance drives sound and menu | Knock, listen, call police, ignore | Knock/listen return to choice; call and ignore resolve | Start `z=8`; about 4-5 seconds |
| 3 — Quiet room | A distressed seated figure | Proximity to the figure | Help, touch, offer water, call, leave | Each selection produces a authored outcome | Several seconds, depending on approach |
| 4 — Circle | Child surrounded by mocking adults | Enter the circle’s interaction radius | Intervene, join, distract, call child | Each selection produces a distinct social outcome | Start outside circle; about 1.5-2 seconds |
| 5 — Divided house | Warm and modern rooms pull from a corridor | Cross room zone or collide with end wall | Move toward either room, hesitate, remain | Warm room, modern room or 20-second timeout | Start `z=12`; split reached in about 5 seconds |

Approach values are timing references, not acceptance limits; frame rate and path shape affect them.

## Pavilion lifecycle

1. Hub detects booth proximity and stores the candidate booth.
2. Entry confirmation defaults to Yes.
3. Hub copies the matching HTML template into an iframe and hides the minimap.
4. A bridge script proxies dashboard/decision messages to the parent.
5. A 500 ms parent poll looks for an end overlay or a black resolved body.
6. A stable ending is auto-closed after roughly 1-1.5 seconds; Escape can close immediately.
7. Exit marks the booth complete in `psych_garden_completed_v1`, rebuilds booth markers, offsets the player by 12 units and applies the re-entry cooldown.

## Controls

| Context | Keyboard | Pointer | Touch |
|---|---|---|---|
| Hub movement | Up/down move; left/right rotate | UI buttons only | Not implemented in the original |
| Entry modal | Left/right change selection; Enter confirms | Click Yes/No | Browser click may work, but there is no designed touch control layer |
| Pavilions 1-4 | Arrows move; left/right navigate cards; Enter confirms | Choice cards are clickable | No dedicated touch movement |
| Pavilion 5 | Arrows move/turn | Start UI only | No dedicated touch movement |
| Any pavilion | Escape emergency-exits to hub | — | — |

## Stored and derived data

- `psych_garden_completed_v1`: JSON array of completed pavilion IDs.
- Runtime action log: intended to capture pavilion, action, label and reaction timing.
- Dashboard dimensions: 24 value scores initialized around 50 and altered by authored action weights.
- Derived output: dominant values, less-emphasized values, tags and reaction-time statements.

Only the completion set is durable world state. The scoring and classification model is contrary to the new north star and will not become player-facing memory.

## Sound triggers

- Audio contexts resume after the first user gesture.
- Pavilion 1 uses sparse generated ambient/UI cues.
- Pavilion 2 maps door proximity to disturbance volume and adds knock, UI, phone and siren cues.
- Pavilion 3 maps proximity to sobbing/breathing and adds UI, gasp and action tones.
- Pavilion 4 maps proximity to crowd intensity and adds chaos, calm and UI tones.
- Pavilion 5 crossfades procedural room signatures according to player position and reduces audio at resolution.

The original uses procedural Web Audio rather than external sound files. This is efficient and responsive, but most cues are abstract rather than material- or source-legible.

