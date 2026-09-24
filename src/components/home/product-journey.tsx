"use client";

import { useRef, type ReactNode, type RefObject } from "react";

import { SpringTrigger } from "@/components/animation/springs/spring-trigger";

/**
 * The product's journey across two screens. One stage, sticky inside a
 * region that wraps the hero and the "why us" screen: the art is framed in
 * the hero and, as the reader scrolls, travels — growing, dropping, sliding
 * toward the inline-start and turning — to rest beside the feature rows.
 * The two screens are pulled back over the stage with a negative margin so
 * it does not also occupy a screen of its own. The scrub transforms a box no
 * wider than the art — scaling a full-width wrapper widened the document.
 *
 * The scrub is a spring chasing scroll progress, so it settles rather than
 * snapping when the reader stops. Below the frame breakpoint there is no
 * travel: the hero draws the art in flow and the stage never lays out.
 */
export interface ProductJourneyProps {
  art: ReactNode;
  children: ReactNode;
}

// The subject rises above the stage's centre in the hero so the claim beneath
// it clears; on arrival it has grown, dropped and slid toward the inline-start.
const REST = { scale: 1, x: "0rem", y: "-2.5rem", rotate: "0deg" };
const ARRIVED = { scale: 1.35, x: "9rem", y: "6rem", rotate: "-12deg" };

export const ProductJourney = ({ art, children }: ProductJourneyProps) => {
  const regionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={regionRef} className="relative overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none sticky top-[calc((100lvh-var(--spacing-artboard))/2)] z-0 hidden h-artboard lg:block"
      >
        <SpringTrigger
          trigger={regionRef as RefObject<HTMLElement>}
          start="top top"
          end="bottom bottom"
          from={REST}
          to={ARRIVED}
          config={{ tension: 120, friction: 30 }}
          className="h-full"
          innerClassName="mx-auto flex h-full w-fit items-center justify-center will-change-transform"
        >
          <div className="h-product-hero">{art}</div>
        </SpringTrigger>
      </div>
      <div className="relative z-10 lg:-mt-artboard">{children}</div>
    </div>
  );
};
