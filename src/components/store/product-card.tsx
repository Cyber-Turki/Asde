import Link from "next/link";

import { Inview } from "@/components/animation/springs/in-view";
import { AddToCartButton } from "@/components/store/add-to-cart-button";
import { DeviceArt } from "@/components/store/device-art";
import { Price } from "@/components/store/price";
import { Icon } from "@/components/ui/icons";
import { Chip, IndexNumeral } from "@/components/ui/labels";
import { TiltCard } from "@/components/ui/tilt-card";
import type { Product } from "@/types/store";

/**
 * A product card. No fill — the lattice runs behind it and the artwork
 * stands off the face in its own 3D layer. The tag chips and the add-to-cart
 * button share one band and trade on hover or focus-within; on a coarse
 * pointer the button is shown permanently, or the card's action never
 * appears. The entrance lives on the `<li>`, the tilt on the surface inside:
 * an element carries one transform.
 */
export interface ProductCardProps {
  product: Product;
  index: number;
  addLabel: string;
  addedLabel: string;
  tagsLabel: string;
  delayIn?: number;
}

const swap =
  "transition-opacity duration-[var(--duration-normal)] ease-entrance";

export const ProductCard = ({
  product,
  index,
  addLabel,
  addedLabel,
  tagsLabel,
  delayIn = 0,
}: ProductCardProps) => (
  <Inview
    tag="li"
    mode="once"
    from={{ opacity: 0, y: 16 }}
    to={{ opacity: 1, y: 0 }}
    delayIn={delayIn}
    className="h-card-height"
  >
    <TiltCard
      className="h-full"
      surfaceClassName="group flex flex-col border border-rule p-panel"
      layerClassName="flex items-center justify-center pb-16 pt-28"
      layer={<DeviceArt kind={product.art} className="h-1/2" />}
    >
      <div className="relative z-10 flex items-start justify-between">
        <IndexNumeral index={index} />
        {product.badge ? (
          <span className="text-caption text-accent">{product.badge}</span>
        ) : (
          <Icon name="corner" className="size-3 -scale-x-100 text-content-faint" />
        )}
      </div>

      <div className="relative z-10 mt-4 flex max-w-card-title flex-col gap-2">
        <h3 className="text-title font-semibold leading-headline">
          <Link
            href={`/products/${product.slug}`}
            className="transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-accent-hover"
          >
            {product.shortName}
          </Link>
        </h3>
        <Price
          amount={product.price}
          compareAt={product.compareAtPrice}
          className="text-body text-content-muted transition-colors duration-[var(--duration-fast)] ease-entrance group-hover:text-foreground group-focus-within:text-foreground"
        />
      </div>

      <div className="relative z-10 mt-auto flex h-control items-center">
        <ul
          className={`flex flex-wrap gap-2 ${swap} group-hover:opacity-0 group-focus-within:opacity-0 pointer-coarse:hidden`}
          aria-label={tagsLabel}
        >
          {product.tags.map((tag) => (
            <li key={tag}>
              <Chip>{tag}</Chip>
            </li>
          ))}
        </ul>
        <div
          className={`pointer-events-none absolute inset-0 flex items-center opacity-0 ${swap} group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 pointer-coarse:pointer-events-auto pointer-coarse:opacity-100`}
        >
          <AddToCartButton
            slug={product.slug}
            label={addLabel}
            addedLabel={addedLabel}
            variant="outline"
          />
        </div>
      </div>
    </TiltCard>
  </Inview>
);
