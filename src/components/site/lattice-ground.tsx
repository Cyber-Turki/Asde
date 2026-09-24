"use client";

import { useEffect } from "react";

import { subscribeToTicker } from "@/lib/animation/ticker";

/**
 * The pointer field — one writer for the whole page.
 *
 * Publishes the cursor, in viewport pixels, as four custom properties on
 * `:root`, smoothed on the shared ticker: `--pointer-x/y` chase the raw
 * position, `--pointer-lag-x/y` trail it and give the glow its tail. The
 * lattice CSS (src/style/index.css) reads them.
 *
 * Lands on the first reading rather than easing in from off-screen, and never
 * starts at all on a coarse pointer or under reduced motion. There is no
 * pointerleave handler on purpose: sending the coordinates away would make the
 * glow slide off rather than stop.
 */
const LERP = 0.12;
const LAG_LERP = 0.045;
const SETTLED_PX = 0.05;

const frameLerp = (k: number, dt: number) =>
  1 - Math.pow(1 - k, dt / (1000 / 60));

export const LatticeGround = (): null => {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const root = document.documentElement;
    let target: { x: number; y: number } | null = null;
    let seen = false;
    let x = 0;
    let y = 0;
    let lagX = 0;
    let lagY = 0;
    let last = performance.now();

    const onMove = (event: PointerEvent) => {
      target = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const unsubscribe = subscribeToTicker(
      (time) => {
        const dt = Math.min(64, time - last);
        last = time;
        if (!target) return;

        if (!seen) {
          seen = true;
          x = lagX = target.x;
          y = lagY = target.y;
        } else {
          const k = frameLerp(LERP, dt);
          const kLag = frameLerp(LAG_LERP, dt);
          const dx = target.x - x;
          const dy = target.y - y;
          const dlx = target.x - lagX;
          const dly = target.y - lagY;
          if (
            Math.abs(dx) < SETTLED_PX &&
            Math.abs(dy) < SETTLED_PX &&
            Math.abs(dlx) < SETTLED_PX &&
            Math.abs(dly) < SETTLED_PX
          ) {
            return;
          }
          x += dx * k;
          y += dy * k;
          lagX += dlx * kLag;
          lagY += dly * kLag;
        }

        root.style.setProperty("--pointer-x", `${x.toFixed(1)}px`);
        root.style.setProperty("--pointer-y", `${y.toFixed(1)}px`);
        root.style.setProperty("--pointer-lag-x", `${lagX.toFixed(1)}px`);
        root.style.setProperty("--pointer-lag-y", `${lagY.toFixed(1)}px`);
      },
      () => 0,
    );

    return () => {
      window.removeEventListener("pointermove", onMove);
      unsubscribe();
      for (const name of ["x", "y", "lag-x", "lag-y"]) {
        root.style.removeProperty(`--pointer-${name}`);
      }
    };
  }, []);

  return null;
};
