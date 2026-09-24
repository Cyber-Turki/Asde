// 📖 Docs: obsidian/frontend/components/common.md
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animated, useSpring, useTransition } from "@react-spring/web";

import type { CookieCopy } from "@/data/mocks/cookie";
import { useScroll } from "@/hooks/smooth-scroll/use-scroll";

import { CookieButton } from "./CookieButton";
import { useCookieStore } from "./cookieStore";

const TITLE_ID = "cookie-preferences-title";

export interface CookiePreferencesModalProps {
  copy: CookieCopy;
}

export const CookiePreferencesModal = ({ copy }: CookiePreferencesModalProps) => {
  const open = useCookieStore((s) => s.modalOpen);
  const consent = useCookieStore((s) => s.consent);
  const closeModal = useCookieStore((s) => s.closeModal);
  const acceptAll = useCookieStore((s) => s.acceptAll);
  const rejectAll = useCookieStore((s) => s.rejectAll);
  const savePreferences = useCookieStore((s) => s.savePreferences);

  const stopScroll = useScroll((s) => s.stop);
  const startScroll = useScroll((s) => s.start);

  // Pre-fill toggles as ON when no prior decision exists. Once a user has
  // saved a choice, that choice wins.
  const [analytics, setAnalytics] = useState<boolean>(consent?.analytics ?? true);
  const [marketing, setMarketing] = useState<boolean>(consent?.marketing ?? true);

  // Re-seed local toggles every time the modal opens so users see their saved
  // state, not whatever was in flight from a previous open.
  useEffect(() => {
    if (!open) return;
    setAnalytics(consent?.analytics ?? true);
    setMarketing(consent?.marketing ?? true);
  }, [open, consent]);

  // ESC closes; lock Lenis scroll while open; restore focus to the opener.
  const triggerRef = useRef<Element | null>(null);
  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement;
    stopScroll();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      startScroll();
      const t = triggerRef.current as HTMLElement | null;
      if (t && typeof t.focus === "function") t.focus();
    };
  }, [open, closeModal, stopScroll, startScroll]);

  const handleSave = () => savePreferences({ analytics, marketing });

  // Spring-driven mount/unmount for backdrop + panel.
  const transitions = useTransition(open, {
    from: { opacity: 0, scale: 0.94 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0.94 },
    config: { tension: 320, friction: 32 },
  });

  return transitions((style, isOpen) =>
    isOpen ? (
      <animated.div
        className="fixed inset-0 z-100 font-sans"
        style={{ opacity: style.opacity }}
      >
        <div
          aria-hidden
          onMouseDown={closeModal}
          className="absolute inset-0 bg-surface-line/70"
        />
        <animated.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={TITLE_ID}
          style={{
            transform: style.scale.to((s) => `translate(-50%, -50%) scale(${s})`),
          }}
          className="lattice-bars absolute left-1/2 top-1/2 flex max-h-[calc(100dvh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-xl flex-col gap-5 overflow-hidden border border-rule p-5 text-foreground sm:p-7"
        >
          <header className="flex items-start justify-between gap-3">
            <h2 id={TITLE_ID} className="text-title font-medium leading-headline">
              {copy.modal.title}
            </h2>
            <button
              type="button"
              onClick={closeModal}
              aria-label={copy.modal.closeLabel}
              className="flex size-8 shrink-0 items-center justify-center border border-rule text-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-rule-strong"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M4 4l8 8M12 4l-8 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </header>

          <p className="text-caption leading-relaxed text-content-muted">
            {copy.modal.body}{" "}
            <Link
              href={copy.privacyHref}
              className="text-foreground underline underline-offset-2"
            >
              {copy.privacyLabel}
            </Link>
            .
          </p>

          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto py-1">
            {copy.modal.categories.map((c) => {
              const value =
                c.key === "necessary"
                  ? true
                  : c.key === "analytics"
                    ? analytics
                    : marketing;
              const setValue =
                c.key === "analytics"
                  ? setAnalytics
                  : c.key === "marketing"
                    ? setMarketing
                    : undefined;
              return (
                <div
                  key={c.key}
                  className="flex items-start justify-between gap-4 border border-rule px-4 py-3.5"
                >
                  <div className="flex min-w-0 flex-col gap-1">
                    <h3 className="text-body font-medium leading-snug">{c.title}</h3>
                    <p className="text-caption leading-relaxed text-content-muted">
                      {c.body}
                    </p>
                  </div>
                  <Toggle
                    on={value}
                    disabled={c.required}
                    label={c.title}
                    onChange={setValue ? () => setValue((v) => !v) : undefined}
                  />
                </div>
              );
            })}
          </div>

          <footer className="mt-1 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CookieButton variant="secondary" onClick={rejectAll}>
              {copy.rejectAllLabel}
            </CookieButton>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
              <CookieButton variant="secondary" onClick={handleSave}>
                {copy.modal.saveLabel}
              </CookieButton>
              <CookieButton onClick={acceptAll}>{copy.acceptAllLabel}</CookieButton>
            </div>
          </footer>
        </animated.div>
      </animated.div>
    ) : null,
  );
};

// ─── Toggle ──────────────────────────────────────────────────────────────────

interface ToggleProps {
  on: boolean;
  disabled?: boolean;
  onChange?: () => void;
  label: string;
}

// The knob travels 20px along the track; in this RTL layout "on" is toward
// the inline-end, which is leftward.
const KNOB_TRAVEL_PX = -20;

const Toggle = ({ on, disabled, onChange, label }: ToggleProps) => {
  // Knob slides on a spring — track colour snaps (a state change, not motion).
  const knob = useSpring({
    x: on ? KNOB_TRAVEL_PX : 0,
    config: { tension: 320, friction: 26 },
  });

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full ${
        on ? "bg-action-primary" : "bg-rule-soft"
      } ${disabled ? "cursor-not-allowed opacity-55" : "cursor-pointer"}`}
    >
      <animated.span
        style={{ transform: knob.x.to((v) => `translateX(${v}px)`) }}
        className="absolute start-0.75 top-0.75 block size-4.5 rounded-full bg-foreground"
      />
    </button>
  );
};
