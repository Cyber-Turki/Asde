import { useId } from "react";

import { BrandMark } from "@/components/ui/brand-mark";

/**
 * Inline SVG renders of the devices — the iPhone, iPad and Watch. Every fill
 * is a token utility, so a re-theme recolours the art with the page.
 */

const ScreenGradient = ({ id }: { id: string }) => (
  <defs>
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" className="[stop-color:var(--device-screen-start)]" />
      <stop offset="1" className="[stop-color:var(--device-screen-end)]" />
    </linearGradient>
  </defs>
);

export const IphoneShape = () => {
  const screen = useId();
  return (
    <svg viewBox="0 0 320 660" className="h-full w-auto" aria-hidden="true">
      <ScreenGradient id={screen} />
      <rect x="2" y="150" width="8" height="34" rx="3" className="fill-device-frame-light" />
      <rect x="2" y="204" width="8" height="58" rx="3" className="fill-device-frame-light" />
      <rect x="2" y="272" width="8" height="58" rx="3" className="fill-device-frame-light" />
      <rect x="310" y="210" width="8" height="96" rx="3" className="fill-device-frame-light" />
      <rect x="8" y="8" width="304" height="644" rx="56" className="fill-device-frame" />
      <rect x="14" y="14" width="292" height="632" rx="50" className="fill-device-body" />
      <rect x="26" y="26" width="268" height="608" rx="40" fill={`url(#${screen})`} />
      <path
        d="M26 66c0-22 18-40 40-40h150L26 340z"
        className="fill-device-glass"
      />
      <rect x="116" y="42" width="88" height="26" rx="13" className="fill-surface-line" />
      <g transform="translate(112 232) scale(3)">
        <BrandMark width={32} height={32} />
      </g>
      <text
        x="160"
        y="418"
        textAnchor="middle"
        fontSize="34"
        fontWeight="700"
        className="fill-foreground"
      >
        الخليج
      </text>
      <rect x="112" y="606" width="96" height="6" rx="3" className="fill-content-faint" />
    </svg>
  );
};

export const IpadShape = () => {
  const screen = useId();
  return (
    <svg viewBox="0 0 480 340" className="h-full w-auto" aria-hidden="true">
      <ScreenGradient id={screen} />
      <rect x="4" y="4" width="472" height="332" rx="30" className="fill-device-frame" />
      <rect x="9" y="9" width="462" height="322" rx="26" className="fill-device-body" />
      <rect x="24" y="24" width="432" height="292" rx="14" fill={`url(#${screen})`} />
      <path d="M24 38c0-8 6-14 14-14h230L24 220z" className="fill-device-glass" />
      <circle cx="240" cy="16" r="3" className="fill-surface-line" />
      <g transform="translate(208 138) scale(2)">
        <BrandMark width={32} height={32} />
      </g>
    </svg>
  );
};

export const WatchShape = () => {
  const screen = useId();
  return (
    <svg viewBox="0 0 320 480" className="h-full w-auto" aria-hidden="true">
      <ScreenGradient id={screen} />
      <rect x="96" y="0" width="128" height="130" rx="18" className="fill-device-body" />
      <rect x="96" y="350" width="128" height="130" rx="18" className="fill-device-body" />
      <rect x="60" y="112" width="200" height="256" rx="58" className="fill-device-frame" />
      <rect x="68" y="120" width="184" height="240" rx="52" className="fill-device-body" />
      <rect x="80" y="132" width="160" height="216" rx="44" fill={`url(#${screen})`} />
      <path d="M80 176c0-24 20-44 44-44h84L80 276z" className="fill-device-glass" />
      <rect x="258" y="184" width="14" height="44" rx="6" className="fill-device-frame-light" />
      <rect x="258" y="250" width="12" height="28" rx="5" className="fill-device-frame-light" />
      <g transform="translate(128 196) scale(2)">
        <BrandMark width={32} height={32} />
      </g>
      <text
        x="160"
        y="300"
        textAnchor="middle"
        fontSize="28"
        fontWeight="600"
        className="fill-foreground"
      >
        9:41
      </text>
    </svg>
  );
};
