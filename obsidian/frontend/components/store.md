---
tags: [frontend, stable]
updated: 2026-09-24
---

# Catalog — Site, Store & Home Components

The storefront's feature components: the site chrome in `src/components/site/`,
the commerce pieces in `src/components/store/`, and the home screens in
`src/components/home/`. Data comes in through props from the copy modules in
`src/data/mocks/` (see [[component-conventions]]); the domain types are in
`src/types/store.ts`. Decisions: [[decisions-log]] ADR-0027, ADR-0028.

## `components/site/` — chrome

| Component | File | Role |
|-----------|------|------|
| `<SiteHeader copy>` | `site-header.tsx` | Pinned for the whole page. Logo and cart against the margins, the nav centred on the canvas. From `lg` the sticky wrapper is zero-height and the bar goes absolute so the hero starts at the top; below it the bar is in flow on an opaque lattice backdrop. The backdrop lives on the wrapper because the bar carries an entrance transform. |
| `<NavLinks>` | `nav-links.tsx` | The primary list. `aria-current` needs the query string (the category links share one pathname), so it reads `useSearchParams` inside a Suspense boundary. |
| `<MobileMenu>` | `mobile-menu.tsx` | Full-screen panel below `lg`; `useTransition` mount/unmount, Escape closes, scroll locked through [[smooth-scroll]]. |
| `<SiteFooter copy>` | `site-footer.tsx` | Logo, link columns, contact `<address>`, the newsletter form, a rule, the closing line with VAT / CR placeholders. |
| `<NewsletterForm>` | `newsletter-form.tsx` | A **real** form — labelled email input, submit with a visually-hidden name, custom checkbox. No endpoint yet: submit is handled in place. |
| `<CartDrawer copy>` | `cart-drawer.tsx` | The cart as a drawer from the inline-end edge, `role="dialog"`, Escape and backdrop close, scroll locked. Slides on a transform, so it takes the bars-only surface (`lattice-bars`). |
| `<CartLineItem>` | `cart-line-item.tsx` | One line: art thumb, name link, quantity stepper, remove. |
| `<LatticeGround>` | `lattice-ground.tsx` | The pointer field — one writer for the page. Publishes `--pointer-x/y` and the lagging pair on `:root` from the shared ticker; never starts on a coarse pointer or under reduced motion. The lattice CSS in `src/style/index.css` reads them. |

## `components/store/` — commerce

| Component | File | Role |
|-----------|------|------|
| `<DeviceArt kind title?>` | `device-art.tsx` (+ `device-shapes.tsx`, `accessory-shapes.tsx`) | Inline SVG renders of every product, token-coloured so they sit on the lattice as lit objects rather than pictures. With `title` it is an image; without, decoration. Swap for `next/image` photography per product when it exists. |
| `<ProductCard>` | `product-card.tsx` | Index, badge/corner, title link, price, art in its own 3D layer, and a band where tag chips and the add-to-cart button trade on hover / focus-within — shown permanently on a coarse pointer (`pointer-coarse:`). Entrance on the `<li>`, tilt on the surface inside. |
| `<Price>` · `<Instalment>` | `price.tsx` | Shelf price with optional strike-through, and the 4-payment instalment line. Prices are VAT-inclusive; formatting in `src/utils/format.ts`. |
| `<AddToCartButton>` | `add-to-cart-button.tsx` | Adds one unit, confirms in place for 1.6 s. |
| `<CheckoutForm copy lineItem>` | `checkout-form.tsx` | Lines, totals (net / VAT share / total) and the delivery form posted to `/api/order`; on success clears the cart and offers the WhatsApp confirmation link. Waits for cart hydration before rendering. |

## `components/home/` — the five screens

| Component | File | Screen |
|-----------|------|--------|
| `<ProductJourney art>` | `product-journey.tsx` | The stage. Sticky inside a region wrapping the hero and "why us"; `<SpringTrigger mode="scrub">` grows, drops, slides and turns the art between the two screens. Transforms a box no wider than the art (a full-width wrapper widened the document). Below `lg` the stage never lays out. |
| `<Hero copy product>` | `hero.tsx` | Wordmark plate, bracketed statements, the product box (mobile only — the stage draws it on desktop), the `h1` claim, the CTA, two corner cards with idle glyphs. Absolute at artboard coordinates from `lg`; a flow column below. |
| `<WhyUs copy>` | `why-us.tsx` | Headline and standfirst at the inline-start, five numbered rows on opaque panels at the inline-end, the arrived product between. |
| `<Collections copy products>` | `collections.tsx` | Four `<ProductCard>`s in equal shares, standfirst tucked under the row's far end. |
| `<Categories copy categories counts>` | `categories.tsx` | Three tiles into the catalogue with product counts. |
| `<Faq copy>` | `faq.tsx` | A `<dl>` — each row one `<div>` with an opacity-only reveal so the opaque panel can sit on it (a `<dl>` allows no nested wrappers). Pairs with `FAQPage` JSON-LD. |

## Views and routes

| Route | View | Notes |
|-------|------|-------|
| `/` | `views/home.tsx` | Server Component assembling the five screens; emits FAQ JSON-LD. |
| `/products?category=` | `views/products.tsx` | Catalogue with category tabs (`aria-current`), count, empty state. |
| `/products/[slug]` | `views/product.tsx` | Static per product (`productStaticParams`, `generateProductMetadata`); breadcrumb, Product + BreadcrumbList JSON-LD, specs `<dl>`, related products. |
| `/cart` | `views/cart.tsx` | `noindex`; the checkout form. |
| `/policies` | `views/policies.tsx` | Returns, privacy, terms — anchored sections; `/privacy-policy` redirects here. |

## Related

[[components/ui]] · [[components/common]] · [[routing]] · [[api-architecture]] · [[hooks]] · [[design-system]]
