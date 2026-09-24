"use client";

import { useEffect } from "react";

import { useScroll } from "@/hooks/smooth-scroll/use-scroll";

/**
 * Locks page scroll while `locked` is true — through the Lenis scroll store,
 * the same way the cookie modal does, never by touching `body` overflow.
 */
export const useScrollLock = (locked: boolean): void => {
  const stop = useScroll((state) => state.stop);
  const start = useScroll((state) => state.start);

  useEffect(() => {
    if (!locked) return;
    stop();
    return () => start();
  }, [locked, stop, start]);
};
