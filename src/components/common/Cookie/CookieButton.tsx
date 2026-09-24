// 📖 Docs: obsidian/frontend/components/common.md
"use client";

import type { ReactNode } from "react";

/**
 * Cookie-scoped button primitive. Two variants on the lattice surface: the
 * filled primary action and a hairline secondary. Hover is a colour change,
 * within the CSS-transition exception (ADR-0014).
 */
export interface CookieButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

const base =
  "px-4 py-2 text-caption font-medium leading-none transition-colors duration-[var(--duration-fast)] ease-entrance";

const variants: Record<NonNullable<CookieButtonProps["variant"]>, string> = {
  primary:
    "border border-action-primary bg-action-primary text-action-primary-content hover:border-action-primary-hover hover:bg-action-primary-hover",
  secondary:
    "border border-rule bg-transparent text-foreground hover:border-rule-strong",
};

export const CookieButton = ({
  children,
  onClick,
  variant = "primary",
}: CookieButtonProps) => (
  <button type="button" onClick={onClick} className={`${base} ${variants[variant]}`}>
    {children}
  </button>
);
