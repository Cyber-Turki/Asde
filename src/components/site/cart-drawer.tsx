"use client";

import { animated, config, useTransition } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useId } from "react";

import { CartLineItem, type CartLineItemCopy } from "@/components/site/cart-line-item";
import { BracketButton } from "@/components/ui/bracket-button";
import { Icon } from "@/components/ui/icons";
import { selectLinesWithProducts, selectTotals, useCart } from "@/hooks/store/use-cart";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { formatSar, formatSarExact } from "@/utils/format";

/**
 * The cart, as a drawer from the inline-end edge (where the cart button is).
 * Slides on a transform, so it takes the bars-only surface.
 */
export interface CartDrawerCopy {
  title: string;
  closeLabel: string;
  emptyLabel: string;
  browseLabel: string;
  vatLabel: string;
  totalLabel: string;
  checkoutLabel: string;
  continueLabel: string;
  lineItem: CartLineItemCopy;
}

export interface CartDrawerProps {
  copy: CartDrawerCopy;
}

export const CartDrawer = ({ copy }: CartDrawerProps) => {
  const titleId = useId();
  const isOpen = useCart((state) => state.isOpen);
  const close = useCart((state) => state.close);
  const lines = useCart((state) => state.lines);
  const setQuantity = useCart((state) => state.setQuantity);
  const remove = useCart((state) => state.remove);
  const joined = selectLinesWithProducts(lines);
  const totals = selectTotals(lines);

  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const transitions = useTransition(isOpen, {
    from: { opacity: 0, x: "-100%" },
    enter: { opacity: 1, x: "0%" },
    leave: { opacity: 0, x: "-100%" },
    config: config.stiff,
  });

  return transitions((style, show) =>
    show ? (
      <div className="fixed inset-0 z-60">
        <animated.button
          type="button"
          aria-label={copy.closeLabel}
          onClick={close}
          style={{ opacity: style.opacity }}
          className="absolute inset-0 cursor-default bg-surface-line/70"
        />
        <animated.aside
          style={{ x: style.x }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="lattice-bars absolute inset-y-0 end-0 flex w-full max-w-drawer flex-col border-s border-rule"
        >
          <header className="flex items-center justify-between border-b border-rule px-5 py-4">
            <h2 id={titleId} className="text-title font-semibold">
              {copy.title}{" "}
              <span className="text-content-faint tabular-nums">[ {totals.count} ]</span>
            </h2>
            <button
              type="button"
              onClick={close}
              className="flex size-tap items-center justify-center transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-accent-hover"
            >
              <Icon name="close" className="size-5" />
              <span className="sr-only">{copy.closeLabel}</span>
            </button>
          </header>

          {joined.length === 0 ? (
            <div className="flex flex-1 flex-col items-start justify-center gap-4 px-5">
              <p className="text-lede text-content-muted">{copy.emptyLabel}</p>
              <BracketButton href="/products" onClick={close}>
                {copy.browseLabel}
              </BracketButton>
            </div>
          ) : (
            <>
              <ul className="flex-1 divide-y divide-rule overflow-y-auto px-5">
                {joined.map(({ line, product }) => (
                  <CartLineItem
                    key={line.slug}
                    line={line}
                    product={product}
                    copy={copy.lineItem}
                    onQuantity={(quantity) => setQuantity(line.slug, quantity)}
                    onRemove={() => remove(line.slug)}
                    onNavigate={close}
                  />
                ))}
              </ul>
              <footer className="flex flex-col gap-4 border-t border-rule px-5 py-5">
                <dl className="flex flex-col gap-1 text-body">
                  <div className="flex justify-between text-content-muted">
                    <dt>{copy.vatLabel}</dt>
                    <dd className="tabular-nums">{formatSarExact(totals.vat)}</dd>
                  </div>
                  <div className="flex justify-between text-lede font-semibold">
                    <dt>{copy.totalLabel}</dt>
                    <dd className="tabular-nums">{formatSar(totals.total)}</dd>
                  </div>
                </dl>
                <div className="flex flex-col gap-2">
                  <BracketButton href="/cart" variant="primary" onClick={close}>
                    {copy.checkoutLabel}
                  </BracketButton>
                  <Link
                    href="/products"
                    onClick={close}
                    className="self-start text-caption text-content-muted underline underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground"
                  >
                    {copy.continueLabel}
                  </Link>
                </div>
              </footer>
            </>
          )}
        </animated.aside>
      </div>
    ) : null,
  );
};
