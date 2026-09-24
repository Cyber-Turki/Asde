// 📖 Docs: obsidian/frontend/components/common.md
"use client";

import Link from "next/link";
import { animated, useTransition } from "@react-spring/web";

import type { CookieCopy } from "@/data/mocks/cookie";

import { CookieButton } from "./CookieButton";
import { useCookieStore } from "./cookieStore";

export interface CookieBannerProps {
  copy: CookieCopy;
}

export const CookieBanner = ({ copy }: CookieBannerProps) => {
  const consent = useCookieStore((s) => s.consent);
  const hydrated = useCookieStore((s) => s.hydrated);
  const modalOpen = useCookieStore((s) => s.modalOpen);
  const acceptAll = useCookieStore((s) => s.acceptAll);
  const rejectAll = useCookieStore((s) => s.rejectAll);
  const openModal = useCookieStore((s) => s.openModal);

  // Banner shows only after hydration confirmed no prior consent. Hidden while
  // the preferences modal is up so the two surfaces never compete for focus.
  const shouldShow = hydrated && consent === null && !modalOpen;

  // react-spring keeps the node mounted through the leave animation — no
  // manual mount/timeout juggling needed.
  const transitions = useTransition(shouldShow, {
    from: { opacity: 0, y: 24 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 24 },
    config: { tension: 280, friction: 32 },
  });

  return transitions((style, show) =>
    show ? (
      <animated.section
        aria-label={copy.banner.label}
        style={{
          opacity: style.opacity,
          transform: style.y.to((v) => `translateY(${v}px)`),
        }}
        className="lattice-bars fixed inset-x-4 bottom-4 z-50 flex flex-col gap-3 border border-rule p-5 font-sans text-foreground sm:inset-x-auto sm:bottom-12 sm:end-12 sm:w-drawer sm:p-6"
      >
        <h2 className="text-body font-medium leading-snug sm:text-lede">
          {copy.banner.title}
        </h2>
        <p className="text-caption leading-relaxed text-content-muted">
          {copy.banner.body}{" "}
          <Link
            href={copy.privacyHref}
            className="underline underline-offset-2 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground"
          >
            {copy.privacyLabel}
          </Link>
          .
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <CookieButton onClick={acceptAll}>{copy.acceptAllLabel}</CookieButton>
          <CookieButton variant="secondary" onClick={rejectAll}>
            {copy.rejectAllLabel}
          </CookieButton>
          <button
            type="button"
            onClick={openModal}
            className="px-2 py-2 text-caption font-medium leading-none text-foreground underline underline-offset-2 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-accent-hover"
          >
            {copy.banner.manageLabel}
          </button>
        </div>
      </animated.section>
    ) : null,
  );
};
