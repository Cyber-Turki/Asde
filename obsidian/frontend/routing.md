---
tags: [frontend, stable]
updated: 2026-09-24
---

# Routing

Next.js 16 App Router. The defining convention: **routes delegate to views**.

> [!warning]
> Per `AGENTS.md`, this version of Next.js may differ from older knowledge. Heed
> deprecation notices before writing routing code.

## Route → View delegation

`app/**/page.tsx` files contain **no UI logic**. They import a component from
`src/views/` and render it. ADR: [[decisions-log]] ADR-0003.

```tsx
// src/app/page.tsx
import { HomeView } from "@/views/home";

export default function Home() {
  return <HomeView />;
}
```

All layout and UI logic lives in the view. Views are **Server Components**;
client-only animation is isolated in leaf components — see
[[component-conventions]] hard rule #6.

A view may also export its route's metadata and static params, so the route
file still imports **only** from `@/views/` (the `verify.sh` check greps
single-line imports — keep them on one line):

```tsx
// src/app/products/[slug]/page.tsx
import { ProductView, generateProductMetadata, productStaticParams } from "@/views/product";

export const dynamicParams = false;
export const generateStaticParams = productStaticParams;
export const generateMetadata = generateProductMetadata;
```

## Current routes

| Route | File | View | Notes |
|-------|------|------|-------|
| `/` | `src/app/page.tsx` | `views/home.tsx` → `HomeView` | the five screens — [[components/store]] |
| `/products` | `src/app/products/page.tsx` | `views/products.tsx` → `ProductsView` | `?category=iphone\|accessories\|smart-devices`; the route awaits `searchParams` and passes it down |
| `/products/[slug]` | `src/app/products/[slug]/page.tsx` | `views/product.tsx` → `ProductView` | static per product; `dynamicParams = false` |
| `/cart` | `src/app/cart/page.tsx` | `views/cart.tsx` → `CartView` | `noindex`; checkout |
| `/policies` | `src/app/policies/page.tsx` | `views/policies.tsx` → `PoliciesView` | `#returns`, `#privacy`, `#terms`; `/privacy-policy` redirects here (`next.config.ts`) |
| `/api/order` | `src/app/api/order/route.ts` | — | order submission — [[api-architecture]] |

## Special files

`src/app/` carries the App Router special files:

| File | Role |
|------|------|
| `layout.tsx` | Root layout — provider tree, font, `metadata` + `viewport`, JSON-LD |
| `loading.tsx` | Suspense fallback — its presence enables streaming |
| `error.tsx` | Route-segment error boundary (Client Component) |
| `not-found.tsx` | 404 page — served with a 404 status |
| `robots.ts` / `sitemap.ts` | Generate `/robots.txt` and `/sitemap.xml` — see [[seo-metadata]] |
| `api/<resource>/route.ts` | API endpoints (Route Handlers) — see [[api-architecture]] |
| `src/proxy.ts` | **Replaces `middleware.ts`** — see below. Not present by default. |

## `middleware.ts` is gone — it is `proxy.ts`

Next.js 16 renamed it: the file is `proxy.ts` and the exported function is
`proxy`. It runs on **Node**; the Edge runtime is not supported and cannot be
configured. This is exactly the kind of breaking change `AGENTS.md` warns about —
training data will confidently write `middleware.ts`, and
`.claude/scripts/verify.sh` FAILs if it finds one.

Keep it thin, per Next's own guidance: routing, rewrites, redirects, and cheap
cookie checks. Not authorisation — that belongs in the data layer (for Supabase,
RLS; see [[database-supabase]]). Every matched route runs Node before serving, so
keep the `matcher` tight or static marketing pages get dragged through it.

## Adding a route

1. Create `src/app/<route>/page.tsx` — keep it ~3 lines, delegate to a view.
2. Create `src/views/<route>.tsx` — the actual page component.
3. Use route groups `app/(feature)/` to scope feature pages without affecting the URL.
4. Follow the [[new-page]] playbook.

## Layouts

- `src/app/layout.tsx` — the **root layout**. Holds the provider tree
  (`ScrollLayout` → `AdaptiveGrid` / `ReducedMotion` / `Cookie` → children),
  loads the Onest font and `globals.css`, exports `metadata` + `viewport`, and
  renders the JSON-LD script. See [[data-flow]].
- Reusable layout *wrappers* (not route layouts) live in `src/layouts/` —
  e.g. [[smooth-scroll|ScrollLayout]].

## Navigation

Use **standard Next.js navigation** — `<Link>` from `next/link` and `useRouter`
from `next/navigation`. ADR: [[decisions-log]] ADR-0005.

```tsx
import Link from 'next/link';
import { useRouter } from 'next/navigation';
```

> [!note]
> Earlier drafts of `generic-layout-prompt.md` referenced `<AnimLink>` /
> `useAnimRouter()`. Those were never built and the convention is dropped — use
> `next/link` directly.

## SEO per route

Each route exports `metadata` via the shared generator — see [[seo-metadata]].

## Related

[[system-overview]] · [[component-conventions]] · [[new-page]] · [[qa-verification]]
