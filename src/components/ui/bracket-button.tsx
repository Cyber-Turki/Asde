import Link from "next/link";
import type { ReactNode } from "react";

import { Icon } from "@/components/ui/icons";

/**
 * The bracketed button — the page's one call-to-action control.
 *
 * Hover adds nothing to the box: four corner brackets converge on it (the
 * `bracket-corners` utility) and the arrow nudges forward. `outline` sits on
 * an opaque lattice panel so its label stays readable over the product;
 * `primary` is the only filled surface on the site.
 */
export interface BracketButtonProps {
  children: ReactNode;
  /** Renders a `<Link>`; without it a `<button>`. */
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "outline" | "primary";
  disabled?: boolean;
  className?: string;
}

const base =
  "bracket-corners group inline-flex h-control items-center justify-between gap-8 whitespace-nowrap border px-5 text-lede font-medium leading-none transition-colors duration-[var(--duration-fast)] ease-entrance focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<NonNullable<BracketButtonProps["variant"]>, string> = {
  outline:
    "lattice-panel border-rule-strong text-foreground hover:text-accent-hover",
  primary:
    "border-action-primary bg-action-primary text-action-primary-content hover:border-action-primary-hover hover:bg-action-primary-hover",
};

const Arrow = () => (
  <Icon
    name="arrow"
    className="size-4 shrink-0 transition-transform duration-[var(--duration-fast)] ease-entrance group-hover:-translate-x-0.5"
  />
);

export const BracketButton = ({
  children,
  href,
  onClick,
  type = "button",
  variant = "outline",
  disabled = false,
  className = "",
}: BracketButtonProps) => {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        <span>{children}</span>
        <Arrow />
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      <span>{children}</span>
      <Arrow />
    </button>
  );
};
