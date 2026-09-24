"use client";

import { Suspense, useState } from "react";

import { Spring } from "@/components/animation/springs/spring";
import { MobileMenu } from "@/components/site/mobile-menu";
import { NavLinks } from "@/components/site/nav-links";
import { BrandLogo } from "@/components/ui/brand-mark";
import { Icon } from "@/components/ui/icons";
import type { navCopy } from "@/data/mocks/site";
import { selectTotals, useCart } from "@/hooks/store/use-cart";

/**
 * Site header, pinned for the whole page. Three groups pinned independently:
 * the logo and the cart against the margins, the nav centred on the canvas.
 *
 * From the frame breakpoint the sticky wrapper is given zero height and the
 * bar goes absolute, so the hero still starts at the top of the canvas. Below
 * it the bar is in flow on an opaque lattice backdrop. The backdrop lives on
 * the wrapper, not the bar: the bar carries an entrance transform.
 */
export interface SiteHeaderProps {
  copy: typeof navCopy;
}

export const SiteHeader = ({ copy }: SiteHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const hydrated = useCart((state) => state.hydrated);
  const lines = useCart((state) => state.lines);
  const openCart = useCart((state) => state.open);
  const count = hydrated ? selectTotals(lines).count : 0;

  return (
    <header className="lattice-panel sticky top-0 z-50 border-b border-rule lg:h-0 lg:border-0 lg:bg-transparent lg:bg-none">
      <Spring
        mode="once"
        from={{ opacity: 0, y: -8 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 170, friction: 26 }}
        className="relative flex h-header items-center justify-between px-gutter-compact lg:absolute lg:inset-x-0 lg:top-0 lg:px-gutter"
      >
        <BrandLogo />

        <nav
          aria-label={copy.navLabel}
          className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
        >
          <Suspense fallback={null}>
            <NavLinks links={copy.links} className="flex items-center gap-8 text-body" />
          </Suspense>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            className="flex h-tap items-center gap-2 px-2 text-body transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-accent-hover"
          >
            <Icon name="cart" className="size-5" />
            <span className="hidden sm:inline">{copy.cartLabel}</span>
            <span className="tabular-nums" aria-live="polite">
              [ {count} ]
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            className="flex size-tap items-center justify-center lg:hidden"
          >
            <Icon name="menu" className="size-5" />
            <span className="sr-only">{copy.menuOpenLabel}</span>
          </button>
        </div>
      </Spring>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={copy.links}
        label={copy.menuLabel}
        navLabel={copy.navLabel}
        closeLabel={copy.menuCloseLabel}
        cartLabel={copy.cartLabel}
        onOpenCart={openCart}
      />
    </header>
  );
};
