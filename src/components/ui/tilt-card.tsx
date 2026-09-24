"use client";

import { animated, to, useSpring } from "@react-spring/web";
import type { PointerEvent, ReactNode } from "react";

/**
 * A card that leans towards the cursor, with an artwork layer standing off
 * its face. Three elements, one job each: this wrapper owns the lens
 * (perspective), the surface owns the rotation, the layer owns its constant
 * depth plus a small pointer-driven drift.
 *
 * The corner under the cursor goes AWAY, so the card leans towards the hand.
 * Mouse pointers only; a touch or a reduced-motion preference leaves it flat.
 * Keep the entrance animation on a separate ancestor — an element carries one
 * transform, and the tilt writes it every frame.
 */
export interface TiltCardProps {
  children: ReactNode;
  /** Rendered behind `children` in its own 3D layer. */
  layer?: ReactNode;
  className?: string;
  surfaceClassName?: string;
  layerClassName?: string;
}

const TILT_DEG = 6.5;
const DRIFT_REM = 0.55;
const DRIFT_Y_RATIO = 0.7;
const SPRING = { tension: 170, friction: 26, mass: 1 };

const clamp = (value: number) => Math.max(-1, Math.min(1, value));

export const TiltCard = ({
  children,
  layer,
  className = "",
  surfaceClassName = "",
  layerClassName = "",
}: TiltCardProps) => {
  const [{ rx, ry, lx, ly }, api] = useSpring(() => ({
    rx: 0,
    ry: 0,
    lx: 0,
    ly: 0,
    config: SPRING,
  }));

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1);
    const ny = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1);
    api.start({
      rx: -ny * TILT_DEG,
      ry: nx * TILT_DEG,
      lx: nx * DRIFT_REM,
      ly: ny * DRIFT_REM * DRIFT_Y_RATIO,
    });
  };

  const onPointerLeave = () => {
    api.start({ rx: 0, ry: 0, lx: 0, ly: 0 });
  };

  return (
    <div
      className={`[perspective:var(--perspective-card)] ${className}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <animated.div
        className={`relative h-full [transform-style:preserve-3d] ${surfaceClassName}`}
        style={{
          transform: to([rx, ry], (x, y) => `rotateX(${x}deg) rotateY(${y}deg)`),
        }}
      >
        {layer ? (
          <animated.div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 ${layerClassName}`}
            style={{
              transform: to(
                [lx, ly],
                (x, y) => `translate3d(${x}rem, ${y}rem, var(--layer-depth))`,
              ),
            }}
          >
            {layer}
          </animated.div>
        ) : null}
        {children}
      </animated.div>
    </div>
  );
};
