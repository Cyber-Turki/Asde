import Link from "next/link";

import { ProductCard } from "@/components/store/product-card";
import { DisplayHeading, Lede } from "@/components/ui/motion-text";
import { catalogueCopy } from "@/data/mocks/catalogue";
import {
  categories,
  getCategory,
  getProductsByCategory,
  isCategorySlug,
  products,
} from "@/data/mocks/store";
import { fill } from "@/utils/format";
import { generateMetadata } from "@/utils/seo/generate-page-metadata";

/** Catalogue view — the whole range, or one category via `?category=`. */
export interface ProductsViewProps {
  category?: string;
}

const TITLE_ID = "catalogue-title";

export const productsMetadata = generateMetadata({
  title: "المتجر — آيفون، إكسسوارات، أجهزة ذكية",
  description: catalogueCopy.lede,
  url: "/products",
});

const tabClass =
  "flex h-tap items-center whitespace-nowrap border px-4 text-body transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-rule-strong hover:text-foreground aria-[current=page]:border-accent aria-[current=page]:text-accent";

export const ProductsView = ({ category }: ProductsViewProps) => {
  const active = category && isCategorySlug(category) ? category : undefined;
  const list = active ? getProductsByCategory(active) : products;
  const heading = active ? `${getCategory(active)?.name}.` : catalogueCopy.title;

  return (
    <main id="main" className="min-h-lvh px-gutter-compact py-12 lg:px-gutter lg:pt-screen-top">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <DisplayHeading tag="h1" id={TITLE_ID}>
          {heading}
        </DisplayHeading>
        <Lede delayIn={120} className="lg:w-column-lede">
          {catalogueCopy.lede}
        </Lede>
      </div>

      <nav aria-label={catalogueCopy.tabsLabel} className="mt-10 flex flex-wrap items-center gap-2">
        <Link
          href="/products"
          aria-current={active ? undefined : "page"}
          className={`${tabClass} ${active ? "border-rule text-content-muted" : ""}`}
        >
          {catalogueCopy.allLabel}
        </Link>
        {categories.map((item) => (
          <Link
            key={item.slug}
            href={`/products?category=${item.slug}`}
            aria-current={active === item.slug ? "page" : undefined}
            className={`${tabClass} ${active === item.slug ? "" : "border-rule text-content-muted"}`}
          >
            {item.name}
          </Link>
        ))}
        <span className="ms-auto text-caption text-content-faint">
          {fill(catalogueCopy.countLabel, { count: list.length })}
        </span>
      </nav>

      {list.length === 0 ? (
        <p className="mt-10 text-lede text-content-muted">{catalogueCopy.emptyLabel}</p>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              index={index}
              addLabel={catalogueCopy.addLabel}
              addedLabel={catalogueCopy.addedLabel}
              tagsLabel={catalogueCopy.tagsLabel}
              delayIn={40 + (index % 4) * 70}
            />
          ))}
        </ul>
      )}
    </main>
  );
};
