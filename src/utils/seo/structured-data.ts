/**
 * @fileoverview JSON-LD structured data helpers.
 *
 * Structured data lets search engines understand the site as entities
 * (Organization, WebSite, Product, FAQPage) rather than just text — improving
 * rich results. Render the output through `<JsonLd>` (components/common).
 */

import { siteConfig } from "@/lib/site";
import type { FaqItem } from "@/data/mocks/home";
import type { Product } from "@/types/store";

const organizationId = `${siteConfig.url}/#organization`;

/**
 * Organization + WebSite schema for the site root. Emit once, in the root
 * layout. The two nodes are linked by `@id` so crawlers treat them as related.
 */
export function getSiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ElectronicsStore"],
        "@id": organizationId,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/android-icon-192x192.png`,
        telephone: siteConfig.phone,
        email: siteConfig.email,
        foundingDate: String(siteConfig.foundedYear),
        areaServed: { "@type": "Country", name: "Saudi Arabia" },
        currenciesAccepted: "SAR",
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.street,
          addressLocality: siteConfig.address.city,
          addressRegion: siteConfig.address.region,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.country,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        inLanguage: siteConfig.language,
        publisher: { "@id": organizationId },
      },
    ],
  };
}

export function getFaqStructuredData(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function getProductStructuredData(product: Product) {
  const url = `${siteConfig.url}/products/${product.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}/#product`,
    name: product.name,
    description: product.description,
    sku: product.slug,
    brand: { "@type": "Brand", name: "Apple" },
    url,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "SAR",
      price: product.price,
      priceValidUntil: "2026-12-31",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": organizationId },
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function getBreadcrumbStructuredData(items: readonly BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
