import type { ReactNode } from "react";

import { Icon } from "@/components/ui/icons";
import { padIndex } from "@/utils/format";

/** "01", "02" … Hidden from assistive tech: the list already carries order. */
export interface IndexNumeralProps {
  index: number;
  className?: string;
}

export const IndexNumeral = ({ index, className = "" }: IndexNumeralProps) => (
  <span
    aria-hidden="true"
    className={`text-caption tabular-nums text-content-faint ${className}`}
  >
    {padIndex(index)}
  </span>
);

/** Hairline tag chip — capacity, finish, chip name. */
export interface ChipProps {
  children: ReactNode;
  className?: string;
}

export const Chip = ({ children, className = "" }: ChipProps) => (
  <span
    className={`inline-flex h-8 items-center whitespace-nowrap border border-rule px-3 text-caption leading-none text-content-muted ${className}`}
  >
    {children}
  </span>
);

/**
 * Corner glyph for the hero's bracketed statements. One asset, flipped per
 * position — in this RTL page "start" is the right-hand side.
 */
export interface CornerGlyphProps {
  position: "top-start" | "top-end" | "bottom-start" | "bottom-end";
  className?: string;
}

const flips: Record<CornerGlyphProps["position"], string> = {
  "top-start": "-scale-x-100",
  "top-end": "",
  "bottom-start": "rotate-180",
  "bottom-end": "-scale-y-100",
};

export const CornerGlyph = ({ position, className = "" }: CornerGlyphProps) => (
  <Icon
    name="corner"
    className={`size-3 text-content-muted ${flips[position]} ${className}`}
  />
);
