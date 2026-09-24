"use client";

import { useId, useState } from "react";

import { CartLineItem } from "@/components/site/cart-line-item";
import { BracketButton } from "@/components/ui/bracket-button";
import type { cartCopy } from "@/data/mocks/catalogue";
import type { lineItemCopy } from "@/data/mocks/site";
import { selectLinesWithProducts, selectTotals, useCart } from "@/hooks/store/use-cart";
import { apiFetch } from "@/lib/api-client";
import { siteConfig } from "@/lib/site";
import { fill, formatSar, formatSarExact } from "@/utils/format";

/**
 * Checkout — the lines, the totals, and a delivery form posted to
 * `/api/order`. There is no payment step: the order is confirmed by a call
 * or on WhatsApp, which is how a small Saudi shop actually closes a sale.
 */
interface OrderResult {
  orderId: string;
}

type Status = "idle" | "submitting" | "error";

const fieldClass =
  "h-control w-full border border-rule bg-transparent px-4 text-body text-foreground placeholder:text-content-faint focus-visible:border-rule-strong focus-visible:outline-none";

export interface CheckoutFormProps {
  copy: typeof cartCopy;
  lineItem: typeof lineItemCopy;
}

export const CheckoutForm = ({ copy, lineItem }: CheckoutFormProps) => {
  const id = useId();
  const hydrated = useCart((state) => state.hydrated);
  const lines = useCart((state) => state.lines);
  const setQuantity = useCart((state) => state.setQuantity);
  const remove = useCart((state) => state.remove);
  const clear = useCart((state) => state.clear);
  const [status, setStatus] = useState<Status>("idle");
  const [orderId, setOrderId] = useState<string | null>(null);

  const joined = selectLinesWithProducts(lines);
  const totals = selectTotals(lines);

  if (orderId) {
    const whatsapp = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(fill(copy.whatsappMessage, { orderId }))}`;
    return (
      <section aria-live="polite" className="lattice-panel flex flex-col items-start gap-4 border border-rule p-8">
        <h2 className="text-title font-semibold">{copy.successTitle}</h2>
        <p className="text-body text-content-muted">{fill(copy.successLede, { orderId })}</p>
        <BracketButton href={whatsapp} variant="primary">
          {copy.whatsappLabel}
        </BracketButton>
      </section>
    );
  }

  if (!hydrated) return null;

  if (joined.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4">
        <p className="text-title font-semibold">{copy.emptyTitle}</p>
        <p className="text-body text-content-muted">{copy.emptyLede}</p>
        <BracketButton href="/products">{copy.browseLabel}</BracketButton>
      </div>
    );
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    const form = new FormData(event.currentTarget);
    try {
      const result = await apiFetch<OrderResult>("/api/order", {
        method: "POST",
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          city: form.get("city"),
          address: form.get("address"),
          note: form.get("note") || undefined,
          lines,
        }),
      });
      clear();
      setOrderId(result.orderId);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_var(--spacing-column-wide)] lg:gap-16">
      <form onSubmit={submit} className="flex flex-col gap-5">
        <h2 className="text-title font-semibold">{copy.formHeading}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-caption text-content-muted" htmlFor={`${id}-name`}>
            {copy.nameLabel}
            <input id={`${id}-name`} name="name" required autoComplete="name" className={fieldClass} />
          </label>
          <label className="flex flex-col gap-2 text-caption text-content-muted" htmlFor={`${id}-phone`}>
            {copy.phoneLabel}
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              dir="ltr"
              pattern="^(\+966|0)5[0-9]{8}$"
              placeholder={copy.phonePlaceholder}
              className={`${fieldClass} text-end`}
            />
          </label>
          <label className="flex flex-col gap-2 text-caption text-content-muted" htmlFor={`${id}-city`}>
            {copy.cityLabel}
            <select id={`${id}-city`} name="city" required className={`${fieldClass} bg-background`}>
              {copy.cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-caption text-content-muted" htmlFor={`${id}-address`}>
            {copy.addressLabel}
            <input
              id={`${id}-address`}
              name="address"
              required
              autoComplete="street-address"
              placeholder={copy.addressPlaceholder}
              className={fieldClass}
            />
          </label>
        </div>
        <label className="flex flex-col gap-2 text-caption text-content-muted" htmlFor={`${id}-note`}>
          {copy.noteLabel}
          <textarea id={`${id}-note`} name="note" rows={3} className={`${fieldClass} h-auto py-3`} />
        </label>
        {status === "error" ? (
          <p role="alert" className="text-caption text-accent">
            {copy.errorMessage}
          </p>
        ) : null}
        <BracketButton type="submit" variant="primary" disabled={status === "submitting"} className="self-start">
          {status === "submitting" ? copy.submittingLabel : copy.submitLabel}
        </BracketButton>
      </form>

      <aside aria-labelledby={`${id}-summary`} className="lattice-panel flex flex-col border border-rule p-panel lg:self-start">
        <h2 id={`${id}-summary`} className="text-body font-semibold">
          {copy.summaryHeading}
        </h2>
        <ul className="divide-y divide-rule">
          {joined.map(({ line, product }) => (
            <CartLineItem
              key={line.slug}
              line={line}
              product={product}
              copy={lineItem}
              onQuantity={(quantity) => setQuantity(line.slug, quantity)}
              onRemove={() => remove(line.slug)}
            />
          ))}
        </ul>
        <dl className="flex flex-col gap-1 border-t border-rule pt-4 text-body">
          <div className="flex justify-between text-content-muted">
            <dt>{copy.netLabel}</dt>
            <dd className="tabular-nums">{formatSarExact(totals.net)}</dd>
          </div>
          <div className="flex justify-between text-content-muted">
            <dt>{copy.vatLabel}</dt>
            <dd className="tabular-nums">{formatSarExact(totals.vat)}</dd>
          </div>
          <div className="flex justify-between text-lede font-semibold">
            <dt>{copy.totalLabel}</dt>
            <dd className="tabular-nums">{formatSar(totals.total)}</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
};
