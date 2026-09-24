"use client";

import { useEffect } from "react";

/**
 * Route-segment error boundary. Must be a Client Component. Catches render and
 * data errors in this segment and offers a recovery action via `reset()`.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for logging/monitoring (kept by removeConsole's exclude).
    console.error(error);
  }, [error]);

  return (
    <main
      id="main"
      className="flex min-h-lvh flex-col items-center justify-center gap-4 px-gutter-compact text-center"
    >
      <h1 className="text-display-compact font-bold leading-headline">حدث خطأ ما</h1>
      <button
        type="button"
        onClick={reset}
        className="underline underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-accent-hover"
      >
        حاول مرة أخرى
      </button>
    </main>
  );
}
