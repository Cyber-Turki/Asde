---
tags: [moc, home]
updated: 2026-09-24
---

# 🧠 الخليج للهواتف والأجهزة الذكية — Project Brain

This vault is the **single source of truth** for this project. It documents
how the project is built, why decisions were made, and how to extend it — for both
humans and AI agents (Claude Code, Cursor).

> [!info] What is this project?
> **الخليج للهواتف والأجهزة الذكية** (Al Khaleej Phones & Smart Devices) — an
> Arabic, RTL storefront for a Saudi smartphone shop: iPhones, accessories and
> smart devices at 2026 riyal prices, with a persisted cart and a checkout that
> closes the sale on WhatsApp. Built from Textura's `next16-claude-starter`
> (package name still `next16-claude-starter`): every motion is spring-based,
> there is no CMS or database yet (ADR-0028). Start at [[components/store]] for
> what is on the page and [[decisions-log]] ADR-0027 for the identity.

## 🗺️ Map of Content

### 00 — Meta
- [[meta/README|Meta overview]] — how to use and maintain this vault
- [[changelog]] — log of notable changes to **this** project (starts fresh per project)
- [[decisions-log]] — Architecture Decision Records: why the conventions are what they are

### 01 — Architecture
- [[system-overview]] — the big picture, request lifecycle, mental model
- [[tech-stack]] — every dependency and why it is here
- [[folder-structure]] — where everything lives and what belongs where
- [[data-flow]] — how state, scroll, and animation data move through the app
- [[environment-variables]] — config & secrets handling

### 02 — Frontend
- [[routing]] — App Router conventions, route → view delegation
- [[design-system]] — Tailwind v4 tokens, CSS layers, styling rules
- [[design-reference]] — the vendored `ai-design-vault`: how its layout, typography, colour, spacing and motion judgement applies here
- [[animation-system]] — the spring component library (the core of this starter)
- [[text-engine]] — `spring-text-engine` usage summary & project rules
- [[text-engine-reference]] — full `spring-text-engine` API reference
- [[smooth-scroll]] — Lenis integration + scroll store
- [[component-conventions]] — how to write & place components
- [[html-semantics]] — semantic, accessible, SEO-correct markup rules
- [[seo-metadata]] — metadata generation & bot detection
- [[components/animation-springs|Spring components catalog]]
- [[components/common|Common components catalog]]
- [[components/ui|UI primitives catalog]] — bracket button, brand mark, icons, text motion, idles, tilt card
- [[components/store|Site, store & home components catalog]] — chrome, cart, product card, the five screens, routes
- [[hooks]] — custom hooks catalog
- [[utils]] — utility functions catalog

### 03 — Backend
- [[backend/README|Backend overview]] — API layer, CMS & database
- [[api-architecture]] — `app/api` route-handler convention & secret handling
- [[cms-payload]] — Payload CMS, installed per project into this Next app
- [[database-supabase]] — Supabase Postgres: connections, keys, RLS, migrations

### 04 — Workflows
- [[ai-agent-guide]] — rules of engagement for AI agents working in this repo
- [[agent-harness]] — the `.claude/` execution layer: commands, rules, skills, agents
- [[new-page]] — playbook for implementing a new page/section
- [[generic-layout-prompt]] — fill-in prompt template for a new page/section
- [[figma-to-code]] — turning a Figma frame into components
- [[qa-verification]] — how work is checked before it is called done
- [[ship]] — the pre-launch gate and deployment
- [[seo-aeo]] — SEO & answer-engine visibility as an ongoing practice
- [[site-migration]] — protecting rankings when rebuilding a live site
- [[optimize-load]] — Lighthouse across laptop, tablet and mobile; all four categories into the green
- [[optimize-performance]] — measure the built page in real Chrome, fix what the numbers blame, prove it
- [[optimize-3d-scene]] — performance work on a three.js/WebGL scene

### Templates
- [[templates/component-note|Component note template]]
- [[templates/hook-note|Hook note template]]
- [[templates/adr-note|ADR template]]

## 🏷️ Tag legend

| Tag | Meaning |
|-----|---------|
| `#stable` | Documented and reliable — safe to depend on |
| `#wip` | Work in progress / partially documented |
| `#todo` | Needs attention or is unfinished |
| `#decision` | Records or relates to an architectural decision |
| `#do-not-modify` | Code that must not be edited (animation engine) |

## 🔌 Obsidian setup

Open this folder (`obsidian/`) as an Obsidian vault. Recommended:
- **Graph view** — see how specs, components, and hooks connect
- **Dataview plugin** — query notes (e.g. list all `#wip` pages)
- **Templates core plugin** — point it at the `templates/` folder
