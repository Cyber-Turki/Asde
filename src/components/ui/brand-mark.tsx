import Link from "next/link";
import type { SVGProps } from "react";

import { siteConfig } from "@/lib/site";

/**
 * The brand: an eight-point star — two squares turned 45° apart, the
 * geometric motif of Najdi ornament — in sand-gold, beside the wordmark.
 */
export type BrandMarkProps = SVGProps<SVGSVGElement>;

export const BrandMark = ({ className = "", ...props }: BrandMarkProps) => (
  <svg
    viewBox="0 0 32 32"
    aria-hidden="true"
    focusable="false"
    className={className}
    {...props}
  >
    <g className="fill-accent">
      <rect x="6" y="6" width="20" height="20" />
      <rect
        x="6"
        y="6"
        width="20"
        height="20"
        transform="rotate(45 16 16)"
      />
    </g>
    <circle cx="16" cy="16" r="5" className="fill-background" />
    <circle cx="16" cy="16" r="2" className="fill-accent" />
  </svg>
);

export interface BrandLogoProps {
  /** Mark height; the wordmark scales with it. */
  size?: "header" | "footer";
  className?: string;
}

const sizes: Record<NonNullable<BrandLogoProps["size"]>, string> = {
  header: "gap-2 text-lede [&>svg]:size-7",
  footer: "gap-3 text-title [&>svg]:size-10",
};

/** Logo lockup linking home; the full store name is read to assistive tech. */
export const BrandLogo = ({ size = "header", className = "" }: BrandLogoProps) => (
  <Link
    href="/"
    className={`inline-flex items-center font-bold leading-none ${sizes[size]} ${className}`}
  >
    <BrandMark />
    <span aria-hidden="true">{siteConfig.shortName}</span>
    <span className="sr-only">{siteConfig.name}</span>
  </Link>
);
