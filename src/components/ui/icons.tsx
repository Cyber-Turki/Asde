import type { ReactNode, SVGProps } from "react";

/**
 * Line icons drawn on a 24-unit grid, stroked in `currentColor`.
 * `arrow` points to the inline-end of an RTL page (left) — it is the
 * "forward" arrow on every call to action.
 */
export type IconName =
  | "globe"
  | "target"
  | "seal"
  | "shield"
  | "split"
  | "truck"
  | "headset"
  | "cart"
  | "menu"
  | "close"
  | "plus"
  | "minus"
  | "arrow"
  | "check"
  | "corner";

const glyphs: Record<IconName, ReactNode> = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18M5 7.5h14M5 16.5h14" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </>
  ),
  seal: (
    <>
      <path d="M12 2.5l2.2 1.6 2.7-.4 1 2.5 2.5 1-.4 2.7 1.6 2.2-1.6 2.2.4 2.7-2.5 1-1 2.5-2.7-.4L12 21.5l-2.2-1.6-2.7.4-1-2.5-2.5-1 .4-2.7L2.5 12l1.6-2.2-.4-2.7 2.5-1 1-2.5 2.7.4z" />
      <path d="M8.5 12l2.3 2.3 4.7-4.8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5l7.5 3v6c0 4.6-3.2 8.3-7.5 10-4.3-1.7-7.5-5.4-7.5-10v-6z" />
      <path d="M8.5 12l2.3 2.3 4.7-4.8" />
    </>
  ),
  split: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" strokeDasharray="2 2" />
    </>
  ),
  truck: (
    <>
      <path d="M2 6.5h11v9H2zM13 9.5h4.5l3.5 3.5v2.5H13z" />
      <circle cx="6" cy="17.5" r="2" />
      <circle cx="17" cy="17.5" r="2" />
    </>
  ),
  headset: (
    <>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3" y="12.5" width="4" height="6" rx="1.5" />
      <rect x="17" y="12.5" width="4" height="6" rx="1.5" />
      <path d="M19 18.5v1a2.5 2.5 0 0 1-2.5 2.5H13" />
    </>
  ),
  cart: (
    <>
      <path d="M5 8h14l-1 12H6z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  arrow: <path d="M20 12H4M10 6l-6 6 6 6" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  corner: <path d="M4 20V4h16" />,
};

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

export const Icon = ({ name, className = "", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    className={className}
    {...props}
  >
    {glyphs[name]}
  </svg>
);
