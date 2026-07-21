# Devpost submission copy

Replace the four bracketed fields before pasting this into Devpost.

## Project name

The Garden Remembers

## Tagline

A living garden that remembers how you move through it—without scoring or judging you.

## Links

- Live demo: `https://the-garden-remembers-tal.web.app`
- Demo video: `https://youtu.be/Ys1A-vPvSSk`
- Code repository: `https://github.com/talurman/the-garden-remembers`
- Codex `/feedback` Session ID: `[ADD SESSION ID]`

## Inspiration

I wanted to explore a simple question: what if a game could remember you without trying to explain you? A lot of “psychological” experiences turn choices into scores or personality labels. I wanted the opposite—a place that notices only what happened and lets memory live in the world itself.

## What it does

The Garden Remembers is a short first-person WebGL experience. You walk through a hand-painted garden, encounter a lost wallet and a paper threshold, and decide what to do through movement and proximity rather than a quiz. The garden records factual actions such as approaching, waiting, carrying, placing, leaving, and returning.

Those actions come back later. Pigment travels across the path, planting changes after you have moved on, sounds recur in new places, and the final paper reflection is assembled from events the garden actually observed. Every route receives a complete response; there are no points, moral labels, or “correct” endings.

## How I built it

The experience is a dependency-light static web app built with HTML, CSS, JavaScript modules, and Three.js. I separated movement, interaction, encounter state, and memory into testable modules. The memory pipeline has four layers: immediate echo, delayed memory, return recognition, and convergence near the ending.

The central rule is traceability. Every visible world memory must point back to a factual observation. The schema rejects diagnoses, empathy scores, anxiety scores, and moral scores. A 77-test Node suite covers movement, touch and keyboard parity, encounter branches, consequence timing, factual memory, and reflection.

## How I used Codex and GPT-5.6

Codex was my active workspace for the rebuild. I used it to audit and preserve the original prototype, map its interaction flow, refactor the memory model into small modules, implement the continuous garden, diagnose browser and lifecycle issues, and run regression checks after each change.

GPT-5.6, through Codex, was especially useful for reasoning across the whole system: converting the creative goal into a factual event contract, comparing every branch for equal depth, spotting input and state edge cases, and turning design rules into automated tests. I made the final creative calls and checked the generated work with both the test suite and clean browser runs. The model is not used at runtime, and no player data is sent to an AI service.

## Challenges

The hardest part was making the garden feel responsive without making it feel judgmental. Color, animation, or silence can accidentally imply that one action was rewarded and another was punished. I built a shared consequence contract so every path gets the same amount of care, then varied the physical expression instead of the value of the response.

The second challenge was continuity. The earlier version was a set of isolated scenes. Rebuilding it as one walkable world meant carefully stabilizing movement, input, encounter lifecycle, and persistent state before adding visual polish.

## Accomplishments

I am proud that the reflection is grounded in the journey without reading like a transaction log. I am also proud that the same experience works with keyboard, pointer, and touch input, and that 77 automated checks protect the design's non-diagnostic boundary.

## What I learned

Memory feels more convincing when it arrives late and slightly transformed. An instant reaction says “the system registered a click”; a response encountered somewhere else says “this place retained something.” I also learned that tests can protect a creative principle—not only code correctness—when the principle is expressed as a concrete contract.

## What's next

The next step is to add more path-native encounters that feed the same memory system, then run unprompted playtests to see whether players describe the garden as remembering them without being told that is the premise.

## Technologies

JavaScript, ES modules, Three.js, WebGL, Web Audio, HTML, CSS, Node.js test runner, Firebase Hosting, Codex, GPT-5.6
