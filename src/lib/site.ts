/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper.
 *
 * Contact, VAT and CR values are PLACEHOLDERS — replace them with the real
 * registered details before launch (see obsidian/workflows/ship.md).
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "الخليج للهواتف والأجهزة الذكية",
  shortName: "الخليج",
  legalName: "مؤسسة الخليج للهواتف والأجهزة الذكية",
  description:
    "متجر سعودي لهواتف آيفون والإكسسوارات والأجهزة الذكية الأصلية، بأسعار 2026 شاملة الضريبة، مع ضمان سنتين وتوصيل لكل مدن المملكة.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Default Open Graph / Twitter share image (path under `public/`). */
  ogImage: "/open-graph.png",
  twitterHandle: "@alkhaleejphones",
  author: "الخليج للهواتف والأجهزة الذكية",
  /** Browser theme-color (address bar / PWA) — the lattice cell green. */
  themeColor: "#071f15",
  language: "ar",
  locale: "ar_SA",
  /** Placeholder contact details — all-zero number, never a real line. */
  phone: "+966500000000",
  whatsapp: "966500000000",
  email: "hello@example.com",
  address: {
    street: "طريق الملك فهد",
    city: "الرياض",
    region: "منطقة الرياض",
    postalCode: "12211",
    country: "SA",
  },
  vatNumber: "3000000000000003",
  crNumber: "1010000000",
  foundedYear: 2022,
} as const;
