---
tags: [frontend, stable]
updated: 2026-09-24
---

# Catalog — UI Primitives

Files in `src/components/ui/` — design-system primitives: stateless, no
provider dependencies, token-coloured. Conventions: [[component-conventions]].
The visual language they implement is described in [[design-system]] and
decided in [[decisions-log]] ADR-0027.

| Component | File | Role |
|-----------|------|------|
| `<BracketButton>` | `bracket-button.tsx` | The one call-to-action control. `href` renders a `<Link>`, otherwise a `<button>`. `outline` sits on an opaque lattice panel with a full-white hairline; `primary` is the only filled surface on the site. Hover adds nothing to the box — four corner brackets converge on it (the `bracket-corners` utility) and the arrow nudges. |
| `<BrandMark>` / `<BrandLogo>` | `brand-mark.tsx` | The eight-point star mark (two squares 45° apart, in sand-gold) and the logo lockup linking home; the full store name is read to assistive tech. `BrandMark` takes SVG props so it can be nested inside other SVG art with a `width`/`height`. |
| `<Icon name>` | `icons.tsx` | Line icons on a 24-unit grid in `currentColor`. `arrow` points to the inline-end of an RTL page — it is the "forward" arrow on every CTA. |
| `<IndexNumeral>` · `<Chip>` · `<CornerGlyph>` | `labels.tsx` | "01" numerals (`aria-hidden`, the list carries order), hairline tag chips, and the corner glyph flipped per position for the hero's bracketed statements. |
| `<DisplayHeading>` · `<Lede>` | `motion-text.tsx` | The page's text motion — word-level `spring-text-engine` reveals. Words, never letters (Arabic letters join), and no `overflow` clipping (Arabic ascenders overrun the line box). `content-start` keeps wrapped lines packed when the flex container is stretched by a grid. See [[text-engine]]. |
| `<Float>` · `<IdleGlyph>` · `<WordmarkPlate>` | `idle-motion.tsx` | Idles that never stop — spring **loops**, never keyframes. The product art floats; the globe turns on a short perspective and the reticle pings; the wordmark plate breathes at 20%. Each pauses under reduced motion. |
| `<TiltCard>` | `tilt-card.tsx` | A card that leans toward the cursor with an artwork layer standing off its face at a constant depth. Three elements, one job each: the wrapper owns the lens, the surface the rotation, the layer its depth. Mouse only; flat on touch and under reduced motion. Keep the entrance on a separate ancestor — an element carries one transform. |

## Rules these primitives encode

- **Nothing is filled** except the primary action. Surfaces are the lattice or a
  hairline at 22% ivory (`border-rule`).
- **Every colour and length is a token** — `fill-accent`, `border-rule-strong`,
  `h-control`, `p-panel`. See [[design-system]].
- **Hover is colour only** (`transition-colors duration-[var(--duration-fast)] ease-entrance`);
  anything that moves is a spring.

## Related

[[components/store]] · [[components/common]] · [[components/animation-springs]] · [[design-system]]
