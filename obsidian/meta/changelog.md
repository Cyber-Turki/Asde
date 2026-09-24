---
tags: [meta, changelog]
updated: 2026-09-24
---

# Changelog

Chronological log of notable changes to **this project**. Newest first.
Human-curated — not a mirror of `git log`.

Log a change here when it would surprise someone returning in six months: a new
dependency, a new route or section, a convention bent, a bug whose cause is worth
remembering. Routine commits do not need an entry.

For *why* the conventions are what they are, see [[decisions-log]].

---

## Baseline — built from `next16-claude-starter` v0.1.0

What the starter ships, so the first project entry has something to diff against:

| Area | What is there |
|------|---------------|
| Framework | Next.js 16 App Router · React 19 · TypeScript · Yarn · Node ≥ 20.19 |
| Styling | Tailwind v4, CSS-only config, three-tier design tokens ([[design-system]]) |
| Motion | Vendored spring engine + `spring-text-engine`, shared rAF ticker, reduced-motion ([[animation-system]]) |
| Layout | Adaptive scaling grid — root font-size tracks the viewport ([[design-system]]) |
| Scroll | Lenis smooth scroll + Zustand scroll store ([[smooth-scroll]]) |
| Server | `app/api` route handlers, zod-validated env, `{ data }`/`{ error }` envelope ([[api-architecture]]) |
| SEO | Metadata generator, `robots.ts`, `sitemap.ts`, JSON-LD ([[seo-metadata]]) |
| Agent harness | 8 commands, 7 path-scoped rules, 11 skills, 4 subagents, `verify.sh` ([[agent-harness]]) |
| Not included | CMS, database, auth, payments, i18n, tests — added per project ([[backend/README]]) |

The home view (`src/views/home.tsx`, route `/`) ships empty on purpose — start
there ([[new-page]]).

<!-- Log this project's changes below, newest first, under a `## YYYY-MM-DD` heading. -->

## 2026-09-24 — `ai-design-vault` vendored as the design reference

- **New top-level `reference/`** holding Textura's stack-agnostic
  [`ai-design-vault`](https://github.com/textura-agency/ai-design-vault) at
  commit `f0cdc2b` (2026-08-18) — its `obsidian/`, `README.md`, `AGENTS.md` and
  `LICENSE.md` only. Its `.claude/`, `install.sh`, `CLAUDE.md` and `.cursorrules`
  were **not** installed and its `/adapt` was not run: the app keeps this
  starter's harness and vault. ADR-0026.
- **New note [[design-reference]]** — which reference note to read for layout,
  typography, colour, spacing and motion, the precedence order when it and this
  vault differ, the ADR number mapping, and the rule that a request contradicting
  the reference is flagged before it is built.
- Registered in [[README]], [[ai-agent-guide]] (a "Design reference" section and
  a "Where to look" row), [[folder-structure]], the root `AGENTS.md`, and the
  path-scoped rules `motion.md` and `design-tokens.md`, so the pointer loads
  whenever a UI or token file is read.
- **No code or dependency changes.** `reference/` is outside the Tailwind
  `source("../")` scan, holds no TypeScript for `tsconfig` to pick up, and is
  not linted.

## 2026-09-24 — Project initialised from `next16-claude-starter`

- **Fresh project** created from the upstream starter
  `textura-agency/next16-claude-starter` at commit `6c6694b` (2026-09-18,
  "feat: add automatic load optimization flow"). The starter's git history was
  not carried over — this repository starts its own.
- **Setup verified** on Node 22.22 / Yarn 1.22: `yarn install` (lockfile
  unchanged), `.env` copied from `.env.example`, `yarn dev` serving `/`,
  `/robots.txt` and `/sitemap.xml`, `yarn lint`, `verify.sh` (0 FAIL) and
  `yarn build` all pass.
- **No code changes.** The home view (`src/views/home.tsx`, route `/`) is still
  empty — start there ([[new-page]]). `NEXT_PUBLIC_SITE_URL` in `.env` still
  holds the placeholder from `.env.example` ([[environment-variables]]).

## 2026-09-18 — `optimize-load`: Lighthouse as a measured workflow

- **New skill `optimize-load`** + `/load` command + [[optimize-load]]. Audits all
  four Lighthouse categories across **laptop, tablet and mobile**, medians of 3+
  runs, then fixes what the audit blames and re-measures. Hard rule 13 now routes
  by *which half* is slow — load → `optimize-load`, scroll jank after load →
  `optimize-performance` — because Lighthouse never scrolls and cannot see the
  second.
- **`references/runner.md`** carries the Lighthouse Node-API runner (three form
  factors, medians, per-audit failures by weight), a `PerformanceObserver` CLS
  probe — Lighthouse routinely reports shifts with **no node attached** — and the
  WCAG contrast arithmetic.
- **`references/fixes.md`** carries the fixes by weight (TBT 30 · LCP 25 · CLS 25),
  the LCP phase-breakdown table that names which fix applies, the measured
  contrast floors (**0.55 black on light, 0.46 white on black**), and the
  width-reservation pattern for figures that count up.
- **Findings worth carrying between projects**, all recorded: a single run is an
  anecdote (LCP swung 2.7→4.6s on an unchanged build); axe samples animated pages
  mid-reveal and reports artifacts; CLS sums distance, not frames, so speeding an
  animation up does nothing; and a CLS of 0 may just mean the trace ended early.
- **Ownership tidied so the skills cannot drift** — `seo-audit` §5 and
  [[seo-aeo]] now delegate Core Web Vitals to `optimize-load` instead of
  restating them (they were still advising a single Lighthouse run on one
  profile).
- **The ship gate now routes through it** — [[ship]] and the `ship-check` skill
  ask for all four categories ≥ 90 on all three profiles, medians of 3+, and name
  `optimize-performance` as the second pass Lighthouse cannot do.
- **No new dependency** — both scripts install into a scratch directory.
- See [[decisions-log]] ADR-0025 for why this is a second skill rather than an
  extension of the first.


## 2026-09-17 — performance becomes a measured workflow

- **New skill `optimize-performance`** + `/perf` command + [[optimize-performance]].
  Performance work now runs a loop — build, measure in real Chrome, attribute,
  fix one thing, re-measure — instead of applying a checklist. Hard rule 13 in
  `AGENTS.md` routes any "it's slow / janky / stutters" request into it; the old
  3D rule moved to 14.
- **The diagnostic it adds:** scroll the whole page twice and compare cold
  against warm. A page that stutters on the *first* pass and is smooth after is
  not slow — it is fetching and decoding lazy media inside the frames a reveal
  animation is running in. Lighthouse cannot see this (it never scrolls), and
  neither can you by hand, because you have already warmed the page.
- **References:** `references/measuring.md` carries the scroll bench (real wheel
  events over CDP, `requestAnimationFrame` deltas, long tasks, resource timing)
  and how to read it; `references/fixes.md` carries the fixes, most-likely first,
  including a `warmMedia` implementation with the four traps that make a naive
  version silently do nothing.
- **No new dependency** — the bench uses `playwright-core` installed in a scratch
  directory, not in the project.
- See [[decisions-log]] ADR-0024 for why this is a loop rather than a checklist.


## 2026-09-08

**`optimize-3d-scene` skill — resize no longer switched off on touch.** §13 of
the skill (and `patterns.md` §5 / §14) told agents to attach *no* `resize`
listener on the mobile tier, to dodge the iOS URL bar. That also removed the
only path that could react to a breakpoint drag, a rotation or DevTools
emulation being turned off, so a scene loaded as a phone kept its phone
framebuffer, frame budget, parked pointer and hidden desktop passes on a desktop
viewport and rendered skewed. The skill now listens on every tier, ignores
height-only changes on a coarse pointer, and re-reads the tier on a width
change or a pointer-media-query flip, with a `retune()` that re-applies DPR,
budget, visibility, draw range and pointer binding without compiling a program.
§2 and §11 of `SKILL.md` and the [[optimize-3d-scene]] workflow note were
updated to match; §14 gained a tier-switch round-trip check. Reasoning in
[[decisions-log]] ADR-0023. Measured on the project that surfaced it: phone
390×844 / 3 draws ↔ desktop 2160×1350 / 4 draws, program count unchanged.
