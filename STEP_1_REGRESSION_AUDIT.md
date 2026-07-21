# Step 1 Full Regression Audit

Audit date: 2026-07-20

Verified build: `stable-prototype.html`

## Live browser results

| Claimed repair | Verification | Result |
|---|---|---|
| Normal player UI hides analysis and QA | Loaded without query parameters; only the movement hint was exposed | Pass |
| QA is development-gated | `?debug=1` exposed factual events and jump controls | Pass |
| Pavilion loading | Opened all five through isolated QA jumps | Pass |
| Escape with iframe focus | Focused each pavilion’s internal start control and pressed Escape | Pass in all five |
| Emergency exit does not complete | QA log contained `ENTER` and `emergency_exit`, with no decision/completion event | Pass |
| Canonical IDs | QA log used `booth1` through `booth5` consistently | Pass |
| Touch/pointer movement | Reached pavilion 3’s choice state through touch-control taps | Pass |
| Pointer choice parity | Selected “עזרה שקטה” directly; encounter resolved and returned | Pass |
| Automatic return | Completion removed the iframe and restored the garden | Pass |
| Dark-scene false completion | Pavilion 5 remained active after 2.4 seconds on its dark scene | Pass |
| Escape after encounter start | Exited pavilion 5 while its internal running view held focus | Pass |
| Completion persistence | Reload retained the completed pavilion marker and green minimap state | Pass |
| Console health | Final test paths produced no warning or error entries | Pass |
| Frozen source | Attached original and `legacy-prototype.html` remain byte-identical | Pass |

## Source-level checks

- No `closeBooth` reference remains.
- No injected duplicate `BOOTH_ID` declaration remains.
- The bridge now appends even when browser template parsing removes `<body>` tags.
- Parent and child contexts both clear held keys on focus/visibility loss.
- All frame deltas are clamped.
- Pavilion exits are idempotent and validate the active pavilion.
- Emergency exits pass `completed=false`.
- Saved completion IDs are validated and sorted.
- Hub movement clamps finite bounds and slides along pavilion colliders.

## Audit conclusion

Step 1 is closed. Later phases may replace its UI and scene structure, but they must retain these verified behavioral guarantees.

