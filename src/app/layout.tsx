import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";

import { JsonLd } from "@/components/common/json-ld";
import { LazyCookie } from "@/components/common/Cookie";
import { AdaptiveGrid } from "@/components/common/grid";
import { ReducedMotion } from "@/components/common/reduced-motion";
import { CartDrawer } from "@/components/site/cart-drawer";
import { LatticeGround } from "@/components/site/lattice-ground";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { cookieCopy } from "@/data/mocks/cookie";
import { cartDrawerCopy, footerCopy, navCopy } from "@/data/mocks/site";
import { ScrollLayout } from "@/layouts/scroll-layout";
import { siteConfig } from "@/lib/site";
import {
  generateMetadata,
  generateViewport,
} from "@/utils/seo/generate-page-metadata";
import { getSiteStructuredData } from "@/utils/seo/structured-data";

import "@/app/globals.css";

// IBM Plex Sans Arabic — a static family, so the weights are listed.
const arabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = generateMetadata();
export const viewport: Viewport = generateViewport();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.language} dir="rtl">
      <body className={`${arabic.variable} lattice-ground font-sans`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-gutter-compact focus:top-4 focus:z-70 focus:bg-action-primary focus:px-4 focus:py-2 focus:text-action-primary-content"
        >
          {navCopy.skipLabel}
        </a>
        <JsonLd data={getSiteStructuredData()} />
        <ScrollLayout>
          <AdaptiveGrid />
          <ReducedMotion />
          <LazyCookie copy={cookieCopy} />
          <LatticeGround />
          <SiteHeader copy={navCopy} />
          {children}
          <SiteFooter copy={footerCopy} />
          <CartDrawer copy={cartDrawerCopy} />
        </ScrollLayout>
      </body>
    </html>
  );
}
