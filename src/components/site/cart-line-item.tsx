"use client";

import Link from "next/link";

import { DeviceArt } from "@/components/store/device-art";
import { Icon } from "@/components/ui/icons";
import type { CartLine, Product } from "@/types/store";
import { fill, formatSar } from "@/utils/format";

export interface CartLineItemCopy {
  /** `{name}` is the product's short name. */
  removeLabel: string;
  quantityLabel: string;
  decreaseLabel: string;
  increaseLabel: string;
}

export interface CartLineItemProps {
  line: CartLine;
  product: Product;
  copy: CartLineItemCopy;
  onQuantity: (quantity: number) => void;
  onRemove: () => void;
  onNavigate?: () => void;
}

const stepClass =
  "flex size-8 items-center justify-center border border-rule text-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-rule-strong disabled:opacity-40";

export const CartLineItem = ({
  line,
  product,
  copy,
  onQuantity,
  onRemove,
  onNavigate,
}: CartLineItemProps) => (
  <li className="flex gap-4 py-4">
    <DeviceArt kind={product.art} className="h-thumb w-thumb shrink-0 border border-rule p-2" />
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <div className="flex items-start justify-between gap-3">
        <Link
          href={`/products/${product.slug}`}
          onClick={onNavigate}
          className="text-body font-medium leading-snug transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-accent-hover"
        >
          {product.shortName}
        </Link>
        <button type="button" onClick={onRemove} className={stepClass}>
          <Icon name="close" className="size-3.5" />
          <span className="sr-only">{fill(copy.removeLabel, { name: product.shortName })}</span>
        </button>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2" role="group" aria-label={fill(copy.quantityLabel, { name: product.shortName })}>
          <button
            type="button"
            onClick={() => onQuantity(line.quantity - 1)}
            className={stepClass}
          >
            <Icon name="minus" className="size-3.5" />
            <span className="sr-only">{copy.decreaseLabel}</span>
          </button>
          <span className="w-6 text-center tabular-nums" aria-live="polite">
            {line.quantity}
          </span>
          <button
            type="button"
            onClick={() => onQuantity(line.quantity + 1)}
            className={stepClass}
          >
            <Icon name="plus" className="size-3.5" />
            <span className="sr-only">{copy.increaseLabel}</span>
          </button>
        </div>
        <span className="tabular-nums text-body">
          {formatSar(product.price * line.quantity)}
        </span>
      </div>
    </div>
  </li>
);
