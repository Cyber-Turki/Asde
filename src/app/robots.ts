import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

/** Generates `/robots.txt`. The cart and the API are not for crawlers. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
