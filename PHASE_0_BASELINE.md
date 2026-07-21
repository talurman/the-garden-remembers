# Phase 0 Baseline Manifest

Date: 2026-07-20

## Canonical files

| Role | File | SHA-256 | Mutation policy |
|---|---|---|---|
| Frozen external original | `/Users/talurman/Desktop/psychological garden.html` | `5d39aa5f9ee7ba9bd8ee6dfab9c000ed3748d01c4937be478c92f4291fb1d1c0` | Never edit. |
| Workspace reference copy | `legacy-prototype.html` | `5d39aa5f9ee7ba9bd8ee6dfab9c000ed3748d01c4937be478c92f4291fb1d1c0` | Keep byte-identical during redesign. |
| Stabilized gameplay branch | `stable-prototype.html` | `b9805c2bf537eeba6fa068fa1831c230f36b45372eada92a68829ef1f4dfecdf` | Repair lifecycle and input here; never back-port into the frozen reference. |
| Factual memory integration branch | `memory-prototype.html` | `ee4831489669739e4a689e1ccae8373653d555565bea14f5d935e7be41b5d46c` | Preserve the five-pavilion journey while proving factual observation, persistence and traceable memory. |
| Lost Place vertical slice | `lost-place-prototype.html` | `ba1270656e4d86cba277a4b649d4037e6635893d63cbd63f31314a7bfc1cde37` | Player-visible thesis prototype; advance only after the Gate 3 unprompted player test. |
| Current integrated experience | `index.html` | `0c30ce221afc09b31650f7b4685a39963179db4671b2d42030442c872cd4dc72` | Canonical English player-facing build: Art Bible garden plus the path-native wallet memory loop. |
| Execution sequence | `WORKPLAN.md` | changes as work advances | Source for phase boundaries and gates. |

The two original hashes were checked with `shasum -a 256` and the files were checked byte-for-byte with `cmp`.

## Baseline reading

The attached original is a third-person garden hub containing five iframe-isolated encounters. It already has the essential conceptual seed: the player moves through space, approaches situations, chooses, and leaves persistent completion traces. Its strongest behavioral design is the fifth encounter, where the decision is made through movement rather than a card.

It does not yet embody “the garden remembers.” The hub records pavilion completion and a value-scoring dashboard, while the garden itself does not retain or replay specific traces of behavior. The redesign must preserve the journey’s dramatic DNA while replacing analysis, moralized outcomes, and isolated menus with observable action and environmental memory.

## Separation rule

- Audit and regression evidence always references `legacy-prototype.html`.
- New implementation work must not overwrite `legacy-prototype.html`.
- Phase 1 implementation work begins in `stable-prototype.html`.
- `index.html` is now the canonical integrated build; visual and gameplay changes must be verified together here.
- Before any preserved behavior is removed, its replacement must pass the gate defined in `REGRESSION_CHECKLIST.md`.

## Phase 0 completion record

- Exact original preserved externally and reproduced byte-identically in the workspace.
- Current visual exploration kept separate.
- Original journey, controls, state, data, sound, timing and lifecycle documented.
- Preserve/redesign/remove decisions recorded at mechanic level.
- Regression coverage defined for the hub and every encounter.
