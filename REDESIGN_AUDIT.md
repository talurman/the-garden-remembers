# The Garden Remembers - Redesign Audit

Source of truth: `output/pdf/the-garden-remembers-art-bible-v3-specific.pdf` and `assets/art_bible/sheets_v3/`.

## What already supports the Art Bible

- Real-time first-person movement through a walkable Three.js garden.
- A moon gate remains visible from the opening position and functions as the destination.
- High-key ivory, sage, mist-blue, turquoise, coral and gold are already represented.
- The environment changes globally after the player advances: light, water, planting, paper and canopy respond together.
- Footsteps are event-driven and leave visible traces.
- UI is sparse and Hebrew typography uses a light, airy weight.
- Paper panels, water, distant mountains and a restrained reflection ending already support the intended vocabulary.
- Desktop keyboard, pointer-look and coarse-pointer controls are present.

## Problems found before editing

### Visual and compositional

- The route is a wide, perfectly straight runway. It reveals the gate but does not use turns, framed views, ma or asymmetric staging.
- Repeated spheres, cylinders, cones and evenly spaced flowers read as placeholder low-poly assets.
- Rocks and tree rotations use `Math.random()`, making the composition non-deterministic.
- The scene is overexposed; the moon gate and paper panels lose their edges against the sky.
- Water is a pair of flat transparent planes without refraction, depth cues, shoreline or meaningful flow.
- Materials use flat colors without limestone pores, moss seams, plaster pigment edges or paper fibers.
- Environmental color is initially too timid and then largely uniform; there is little readable propagation through space.
- The large centered reaction title behaves like an overlay rather than an environmental response.
- Petal particles are distributed broadly and decoratively instead of guiding attention.

### Interaction and movement

- Normal movement is slow for the length of the route; the complete walk takes roughly thirty seconds of uninterrupted forward input.
- Collision is only a rectangular world clamp. Trees, rocks, shorelines and the pavilion do not participate.
- The pavilion prompt is based only on forward progress, so it can appear while the player is far to one side.
- Pointer-look only changes yaw, and yaw is clamped around the starting direction; vertical inspection and turning back are unavailable.
- Touch offers forward and lateral buttons but no reverse control.
- Footsteps spawn identical neon rings at the player and at both water channels, even when the player is nowhere near water.
- The reflection is fixed copy and does not reference the observable route taken.

### Sound and performance

- The base sound is a constant filtered noise bed, which conflicts with the rule against generic wall-to-wall ambience.
- Footsteps are abstract oscillator notes with no material distinction or spatial source.
- Hundreds of separate flower meshes and per-step mesh allocation create unnecessary draw calls and garbage collection.
- Lighting relies on broad point lights rather than spatially legible bounce regions.

## Redesign mapping

| Current element | Art Bible rule | Precise cut | Required change |
|---|---|---|---|
| Straight sand runway | Nature: ma, asymmetry and framed views | Nature A/C/D, pages 5-6 | Replace with a gently curving stepping-stone route, two pauses of open space, and asymmetric planting masses while preserving legibility. |
| Bare distant gate | Camera: meaningful horizon and threshold | Camera A/B/D, pages 11-12 | Keep the gate visible, strengthen its silhouette, frame it with a foreground branch and borrowed mountains, and avoid central clutter. |
| Random repeated trees | Nature: sculptural foliage, not dense scattering | Nature A/C/D, pages 5-6 | Use deterministic clusters, shaped trunks, layered canopies and deliberate negative space. |
| Flat water strips | Materials: shallow water and visible refraction | Materials D, pages 9-10 | Build shallow sculpted channels with animated normal distortion, caustic lines, colored depth and stone shore edges. |
| Flat stone and plaster colors | Materials: pores, moss, mineral grain and pigment edges | Materials A/C, pages 9-10 | Generate procedural canvas textures and material roughness/bump maps; add moss seams and watercolor pigment masks. |
| Transparent gate panels | Materials: handmade translucent paper | Materials B + UI C, pages 9-10 and 15-16 | Add fiber textures, soft alpha variation, warm backlight and wind deformation. |
| Neon ring footsteps | Motion: broad pigment propagation | Motion A-D, pages 7-8 | Replace rings with soft pigment pools and traveling shoreline waves that remain as colored marks. |
| One global color fade | Color: distinct emotional chapters | Color A-D, pages 19-20 | Stage cool ivory/sage, turquoise/coral awakening, then pavilion gold/peach with restrained indigo depth. |
| Uniform flower reveal | Interaction: local response, propagation, persistence | Interaction A-D, pages 21-22 | Trigger nearby planting first, then water, paper, canopy and gate in spatial order; preserve transformed state behind the player. |
| Center-screen reaction title | UI: environment performs the interface | UI B/D, pages 15-16 | Remove it; acknowledge the event through petals, stones, water and light. |
| Fixed camera corridor | Camera: human scale, foreground layering | Camera A/C/D, pages 11-12 | Keep a calm 52-degree FOV, allow full yaw and restrained pitch, add optional foreground frames without head-bob excess. |
| Progress-only pavilion prompt | UI: minimal text at real choice | UI A/C, pages 15-16 | Trigger by true gate proximity, anchor the prompt low and light, and retain click/Enter/touch access. |
| Fixed reflection card | Typography: patient rhythm and open margins | Typography C, pages 17-18 | Use handmade-paper texture, observable route language and no diagnostic labels. |
| Constant noise and synth steps | Sound: understandable near/mid/far sources | Sound A-D, pages 25-26 | Use material-aware foot transients, local water/fabric/bamboo sources and sparse distant resonance; no constant score. |
| World rectangle clamp | Direct, stable movement | Camera/Interaction production rules | Add shoreline and landmark colliders, slide along obstacles, recover safely from invalid positions and keep touch parity. |

## Preserve, redesign, simplify, remove

- Preserve: Three.js real-time structure, first-person movement, moon gate destination, footstep event timing, pavilion transition, reflection state, keyboard and touch input concepts.
- Redesign: terrain composition, path geometry, foliage silhouettes, all materials, water, pavilion, propagation logic, sound and movement/collision layer.
- Simplify: permanent chapter labels and explanatory captions; let the environment carry more of the guidance.
- Remove: centered reaction title, random asset placement, neon additive rings, constant noise bed, uniform gloss and progress-only entry detection.
