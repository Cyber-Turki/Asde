import { Inview } from "@/components/animation/springs/in-view";
import { ProductCard } from "@/components/store/product-card";
import { BracketButton } from "@/components/ui/bracket-button";
import { DisplayHeading, Lede } from "@/components/ui/motion-text";
import type { collectionsCopy } from "@/data/mocks/home";
import type { Product } from "@/types/store";

/**
 * Screen 3. Four product cards in a row of equal shares, headline at the
 * inline-start, the standfirst tucked under the row's far end.
 */
export interface CollectionsProps {
  copy: typeof collectionsCopy;
  products: readonly Product[];
}

const TITLE_ID = "collections-title";

export const Collections = ({ copy, products }: CollectionsProps) => (
  <section
    id={copy.id}
    aria-labelledby={TITLE_ID}
    className="flex scroll-mt-header flex-col gap-10 px-gutter-compact py-16 lg:min-h-lvh lg:px-gutter lg:py-screen-top"
  >
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <DisplayHeading id={TITLE_ID}>{copy.title}</DisplayHeading>
      <Lede delayIn={120} className="lg:w-column-lede">
        {copy.lede}
      </Lede>
    </div>

    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard
          key={product.slug}
          product={product}
          index={index}
          addLabel={copy.addLabel}
          addedLabel={copy.addedLabel}
          tagsLabel={copy.tagsLabel}
          delayIn={80 + index * 90}
        />
      ))}
    </ul>

    <Inview
      mode="once"
      from={{ opacity: 0, y: 12 }}
      to={{ opacity: 1, y: 0 }}
      delayIn={460}
      className="flex justify-center lg:mt-auto"
    >
      <BracketButton href={copy.cta.href}>{copy.cta.label}</BracketButton>
    </Inview>
  </section>
);
