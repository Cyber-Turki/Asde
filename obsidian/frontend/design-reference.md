---
tags: [frontend, design-system, reference, stable]
updated: 2026-09-24
---

# Design Reference — `ai-design-vault`

Textura's stack-agnostic design vault, vendored **read-only** under
`reference/ai-design-vault/` (commit `f0cdc2b`, 2026-08-18). ADR: [[decisions-log]]
ADR-0026. What was copied and what was left out: `reference/README.md`.

> [!important] Apply the judgement, not the file structure
> The reference tells you *how to think* about layout, typography, colour,
> spacing and motion. It does **not** own this project's paths, packages,
> commands or harness — this vault does. Its "rule zero" (`stack.json`),
> `/adapt`, `.claude/` and folder layout are not installed and are not to be
> followed here.

## When to read it

Before building or changing **any UI** — a page, a section, a component, a
token, a motion. Read `reference/ai-design-vault/README.md` (the map) once, then
the note matching the work:

| Work | Read in the reference | Then here |
|---|---|---|
| Layout of a page or section; responsive behaviour | `workflows/new-page.md`, `workflows/generic-layout-prompt.md` §1 | [[new-page]], [[generic-layout-prompt]] |
| Typography — sizes, leading, tracking, fonts | `frontend/design-system.md` (namespaces, `--leading-display`), `frontend/text-motion.md` trap 3 | [[design-system]] → Typography, [[text-engine]] |
| Colour — palette, roles, dark mode, contrast | `frontend/design-system.md` → token tiers, "The starting theme" | [[design-system]], ADR-0015, ADR-0025 (contrast floors) |
| Spacing, radius, adaptive scaling | `frontend/design-system.md` → namespaces, "Adaptive scaling" | [[design-system]], [[components/common]] (grid), ADR-0008 |
| Motion — primitive choice, modes, staggers, scroll grammar, reduced motion | `frontend/motion-system.md`, `frontend/text-motion.md` | [[animation-system]], [[text-engine]], [[components/animation-springs]] |
| Component placement, props, data, semantics | `frontend/component-conventions.md`, `frontend/html-semantics.md` | [[component-conventions]], [[html-semantics]] |

**Not applicable here — do not follow:** `architecture/stack-profile.md`,
`workflows/adapt-stack.md`, `workflows/agent-harness.md` and
`frontend/motion-bindings.md`. The binding is fixed in this project:
`@react-spring/web` + `spring-text-engine` + `lenis` ([[tech-stack]]).

## Precedence

1. **This vault's hard rules and stack specifics win.** Next 16 APIs,
   `@react-spring/web`, `spring-text-engine`, Tailwind v4, Onest, `next/link`
   and `next/image`, the paths in [[folder-structure]], the protected engine.
2. **The reference fills the gaps.** Where this vault is silent or thinner, its
   judgement applies as if it were written here.
3. **Same thing, different words** — cite this vault's note and ADR number. The
   two share a lineage, but the reference's ADR numbers do **not** match this
   log's:

| Reference ADR | This log |
|---|---|
| 0001 — vault is the source of truth | ADR-0001, ADR-0006 |
| 0002 — spring-based motion, one binding | ADR-0002 |
| 0003 — routes delegate to views | ADR-0003 |
| 0004 — three-tier tokens | ADR-0004, ADR-0015 |
| 0005 — one shared render loop | ADR-0009 |
| 0006 — hooks enforce the workflow | ADR-0007 |
| 0011 — external calls server-side, one envelope | ADR-0011 |
| 0012 — a repeated pattern is a component | ADR-0012 |
| 0013 — narrow CSS-transition exception | ADR-0014 |
| 0007, 0008, 0010, 0015, 0016 — stack profile, motion contract, `verify.sh` skips, no vendor, no shipped code | n/a — machinery this project does not adopt |

## What the reference actually prescribes

It is a **grammar, not a palette**. It hands you no type scale, colour ramp or
spacing scale; it says how any such value must be encoded and constrained:

- **Every value is a token** in three tiers — `--raw-*` literal → purpose-named
  semantic role → `@theme inline` binding. Nothing raw in a class name. A
  missing value is added as Tier 1 + Tier 2 first, with its origin in a comment.
- **Semantic names describe purpose**, never appearance (`--action-primary`,
  not `--blue`). Dark mode overrides Tier 2 only.
- **Layout is mobile-first**, matches both the desktop and mobile frames
  exactly, and has no horizontal overflow down to 320px. The adaptive root
  font-size stays in sync with the grid config.
- **Typography:** leading ≥ 1.1 (`leading-display`) on any clipped text reveal;
  split-text containers are flex — pair `text-*` with `justify-*`, never
  `justify-between`; watch `text-*` sizes that ship `line-height: 1`.
- **Motion:** springs only, one binding; transform and opacity only; content
  exists in the DOM regardless of motion state; `prefers-reduced-motion` jumps
  to the end state; hover motion is off on touch; motion is never disabled
  globally; `from`/`to` value types match; per-frame work runs on the shared
  ticker; scroll positions use the `"<element-edge> <viewport-edge>[±=px]"`
  grammar.
- **CSS `transition-*` only** for hover/focus colour, opacity, border or a
  few-px nudge — token-backed timing, utilities only, never `@keyframes`.
- **A repeated pattern becomes a component**, not a CSS class; components stay
  under ~150 lines; every motion wrapper renders a semantic element.

## When a request contradicts it

Say so **before building**, in a sentence or two: name the reference note, state
the conflict, offer the compliant alternative. Proceed only on the user's
explicit call, and log the deviation in [[changelog]]. Typical triggers:

| Request | Conflicts with | Offer instead |
|---|---|---|
| CSS `@keyframes`, GSAP, framer-motion, a Lottie loop | `motion-system` → one spring binding | the matching spring primitive |
| A raw hex / px / ms in a class or inline style | `design-system` → the token rule | add the Tier 1 + Tier 2 token first |
| `leading-none` or tight leading on an animated heading | `text-motion` trap 3 | `leading-display`, or the negative-margin room trick |
| "Justify the words edge to edge" on split text | `text-motion` trap 2 | `justify-start` / `-center` / `-end` |
| Hide content until it animates in; render only on scroll | `motion-system` → content exists regardless | a reveal that changes appearance, never presence |
| Animate `width` / `height` / `top` / `margin` | `motion-system` → transform and opacity only | `scale` / `translate` / `opacity`, or a layout change without motion |
| Hover motion on touch; "turn all animation off on mobile" | `motion-system` → per-instance gating | `disableOnMobile` per instance |
| A one-off `.hero-title` global CSS class | ADR-0012 | a component |
| A fixed-px layout that must not scale | `design-system` → adaptive scaling | rem tokens on the grid, or an ADR that opts the page out |

A rule that only one of the two vaults has is not a contradiction — this vault's
hard rules always apply, and a reference rule with no counterpart here simply
applies too.

## Keeping it current

Re-copy from upstream and record the new commit in `reference/README.md` and
[[changelog]]. **Never edit files inside `reference/ai-design-vault/`** — a
local amendment belongs in this vault, as a note or an ADR.

## Related

[[design-system]] · [[animation-system]] · [[text-engine]] · [[new-page]] · [[ai-agent-guide]] · [[folder-structure]] · [[decisions-log]]
