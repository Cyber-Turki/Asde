"use client";

import { animated, config, useTransition } from "@react-spring/web";
import Link from "next/link";
import { useEffect } from "react";

import { Icon } from "@/components/ui/icons";
import type { NavLink } from "@/data/mocks/site";
import { useScrollLock } from "@/hooks/use-scroll-lock";

/** Full-screen navigation panel below the frame breakpoint. */
export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: readonly NavLink[];
  label: string;
  navLabel: string;
  closeLabel: string;
  cartLabel: string;
  onOpenCart: () => void;
}

export const MobileMenu = ({
  open,
  onClose,
  links,
  label,
  navLabel,
  closeLabel,
  cartLabel,
  onOpenCart,
}: MobileMenuProps) => {
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const transitions = useTransition(open, {
    from: { opacity: 0, y: -12 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -12 },
    config: config.stiff,
  });

  return transitions((style, show) =>
    show ? (
      <animated.div
        style={style}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="lattice-bars fixed inset-0 z-40 flex flex-col px-gutter-compact pb-8 pt-header lg:hidden"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute end-gutter-compact top-4 flex size-tap items-center justify-center text-foreground"
        >
          <Icon name="close" className="size-5" />
          <span className="sr-only">{closeLabel}</span>
        </button>
        <nav aria-label={navLabel} className="mt-6">
          <ul className="flex flex-col divide-y divide-rule border-y border-rule">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block py-4 text-title font-medium transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-accent-hover"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCart();
                }}
                className="flex w-full items-center gap-3 py-4 text-title font-medium transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-accent-hover"
              >
                <Icon name="cart" className="size-5" />
                {cartLabel}
              </button>
            </li>
          </ul>
        </nav>
      </animated.div>
    ) : null,
  );
};
