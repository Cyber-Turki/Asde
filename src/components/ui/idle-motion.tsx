"use client";

import { animated, easings, useReducedMotion, useSpring } from "@react-spring/web";
import type { ReactNode } from "react";

import { Icon } from "@/components/ui/icons";

/**
 * Idles that never stop and ADD to a rest pose — spring loops on the shared
 * react-spring clock, never CSS keyframes. Each pauses under reduced motion
 * (a paused loop is what stops `skipAnimation` from spinning it).
 */
const useIdleAllowed = (): boolean => useReducedMotion() !== true;

/** A slow rise and fall for the product art. */
export interface FloatProps {
  children: ReactNode;
  className?: string;
}

export const Float = ({ children, className = "" }: FloatProps) => {
  const allowed = useIdleAllowed();
  const style = useSpring({
    from: { y: 0 },
    to: { y: -6 },
    loop: allowed ? { reverse: true } : false,
    pause: !allowed,
    config: { duration: 3500, easing: easings.easeInOutSine },
  });
  return (
    <animated.div style={style} className={className}>
      {children}
    </animated.div>
  );
};

/**
 * The corner-card glyphs. The globe turns about its vertical axis under a
 * short perspective — a real turn, the near edge growing while the far edge
 * shrinks — swinging either side of face-on so a sphere never reads inside
 * out. The reticle does not rotate; a sight is aimed, not swept. It pings:
 * a sharp rise, a slower fall, then rest for most of the period.
 */
export interface IdleGlyphProps {
  kind: "globe" | "target";
  className?: string;
}

const GLOBE_SWING_DEG = 58;

export const IdleGlyph = ({ kind, className = "" }: IdleGlyphProps) => {
  const allowed = useIdleAllowed();
  const globe = allowed && kind === "globe";
  const target = allowed && kind === "target";

  const swing = useSpring({
    from: { r: -GLOBE_SWING_DEG },
    to: { r: GLOBE_SWING_DEG },
    loop: globe ? { reverse: true } : false,
    pause: !globe,
    config: { duration: 1700, easing: easings.easeInOutSine },
  });

  const ping = useSpring({
    from: { s: 1, o: 0.78 },
    to: target
      ? [
          { s: 1.16, o: 1, config: { duration: 240, easing: easings.easeOutCubic } },
          { s: 1, o: 0.78, config: { duration: 770, easing: easings.easeInOutSine } },
          { s: 1, o: 0.78, config: { duration: 1400 } },
        ]
      : { s: 1, o: 0.78 },
    loop: target,
    pause: !target,
  });

  if (kind === "globe") {
    return (
      <animated.span
        className={`inline-flex ${className}`}
        style={{ transform: swing.r.to((r) => `perspective(7rem) rotateY(${r}deg)`) }}
      >
        <Icon name="globe" className="size-full" />
      </animated.span>
    );
  }

  return (
    <animated.span
      className={`inline-flex ${className}`}
      style={{ transform: ping.s.to((s) => `scale(${s})`), opacity: ping.o }}
    >
      <Icon name="target" className="size-full" />
    </animated.span>
  );
};

/**
 * The wordmark plate behind the hero — the brand at 20%, breathing slowly
 * between 0.8× and 1.3× of its resting opacity.
 */
export interface WordmarkPlateProps {
  text: string;
  className?: string;
}

export const WordmarkPlate = ({ text, className = "" }: WordmarkPlateProps) => {
  const allowed = useIdleAllowed();
  const style = useSpring({
    from: { opacity: 0.14 },
    to: { opacity: 0.26 },
    loop: allowed ? { reverse: true } : false,
    pause: !allowed,
    config: { duration: 3350, easing: easings.easeInOutSine },
  });
  return (
    <animated.span
      aria-hidden="true"
      style={style}
      className={`pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center text-plate-compact font-black leading-none text-foreground lg:text-plate ${className}`}
    >
      {text}
    </animated.span>
  );
};
