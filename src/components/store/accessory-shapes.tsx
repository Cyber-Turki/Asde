import { useId } from "react";

import { BrandMark } from "@/components/ui/brand-mark";

/** Inline SVG renders of the accessories and home devices. */

export const AirpodsShape = () => (
  <svg viewBox="0 0 320 320" className="h-full w-auto" aria-hidden="true">
    <rect x="52" y="150" width="216" height="150" rx="44" className="fill-device-frame-light" />
    <rect x="52" y="150" width="216" height="70" rx="34" className="fill-device-frame" />
    <rect x="130" y="204" width="60" height="6" rx="3" className="fill-surface-line" />
    <g className="fill-device-frame-light">
      <ellipse cx="118" cy="82" rx="24" ry="30" />
      <rect x="112" y="98" width="18" height="70" rx="9" />
      <ellipse cx="202" cy="82" rx="24" ry="30" />
      <rect x="190" y="98" width="18" height="70" rx="9" />
    </g>
    <g className="fill-surface-line">
      <circle cx="100" cy="78" r="6" />
      <circle cx="220" cy="78" r="6" />
    </g>
  </svg>
);

export const ChargerShape = () => (
  <svg viewBox="0 0 320 320" className="h-full w-auto" aria-hidden="true">
    <path
      d="M160 220v40c0 30 60 30 60 60"
      className="stroke-device-frame-light"
      strokeWidth="12"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="160" cy="130" r="104" className="fill-device-frame-light" />
    <circle cx="160" cy="130" r="88" className="fill-device-frame" />
    <circle cx="160" cy="130" r="60" className="fill-none stroke-content-faint" strokeWidth="4" />
    <circle cx="160" cy="130" r="14" className="fill-device-frame-light" />
  </svg>
);

export const CaseShape = () => (
  <svg viewBox="0 0 320 660" className="h-full w-auto" aria-hidden="true">
    <rect x="8" y="8" width="304" height="644" rx="58" className="fill-action-primary" />
    <rect x="22" y="22" width="276" height="616" rx="46" className="fill-surface-raised" />
    <rect x="176" y="36" width="112" height="112" rx="30" className="fill-surface-line" />
    <g className="fill-device-body">
      <circle cx="208" cy="68" r="14" />
      <circle cx="256" cy="68" r="14" />
      <circle cx="208" cy="116" r="14" />
      <circle cx="256" cy="116" r="14" />
    </g>
    <circle cx="160" cy="360" r="86" className="fill-none stroke-rule" strokeWidth="6" />
    <rect x="150" y="470" width="20" height="60" rx="10" className="fill-none stroke-rule" strokeWidth="6" />
  </svg>
);

export const AdapterShape = () => (
  <svg viewBox="0 0 320 320" className="h-full w-auto" aria-hidden="true">
    <rect x="60" y="70" width="200" height="200" rx="44" className="fill-device-frame-light" />
    <rect x="72" y="82" width="176" height="176" rx="36" className="fill-device-frame" />
    <g className="fill-surface-line">
      <rect x="116" y="150" width="88" height="26" rx="13" />
      <rect x="116" y="196" width="88" height="26" rx="13" />
    </g>
    <g className="fill-device-frame-light">
      <rect x="120" y="20" width="18" height="54" rx="5" />
      <rect x="182" y="20" width="18" height="54" rx="5" />
    </g>
  </svg>
);

export const HomepodShape = () => {
  const mesh = useId();
  return (
    <svg viewBox="0 0 320 320" className="h-full w-auto" aria-hidden="true">
      <defs>
        <pattern id={mesh} width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="2" className="fill-device-frame" />
        </pattern>
      </defs>
      <rect x="70" y="56" width="180" height="210" rx="86" className="fill-device-body" />
      <rect x="70" y="56" width="180" height="210" rx="86" fill={`url(#${mesh})`} />
      <ellipse cx="160" cy="76" rx="70" ry="18" className="fill-device-screen-start" />
      <ellipse cx="160" cy="76" rx="26" ry="7" className="fill-device-glass" />
    </svg>
  );
};

export const AppletvShape = () => (
  <svg viewBox="0 0 320 320" className="h-full w-auto" aria-hidden="true">
    <rect x="44" y="60" width="232" height="200" rx="36" className="fill-device-body" />
    <rect x="44" y="60" width="232" height="180" rx="36" className="fill-device-frame" />
    <rect x="54" y="70" width="212" height="160" rx="30" className="fill-device-body" />
    <g transform="translate(136 126) scale(1.5)">
      <BrandMark width={32} height={32} />
    </g>
    <circle cx="256" cy="228" r="4" className="fill-focus-ring" />
  </svg>
);
