import Link from "next/link";

import { Inview } from "@/components/animation/springs/in-view";
import { Icon } from "@/components/ui/icons";
import { IndexNumeral } from "@/components/ui/labels";
import { DisplayHeading, Lede } from "@/components/ui/motion-text";
import type { categoriesCopy } from "@/data/mocks/home";
import type { Category } from "@/types/store";
import { fill } from "@/utils/format";

/** Screen 4. Three tiles into the catalogue, one per category. */
export interface CategoriesProps {
  copy: typeof categoriesCopy;
  categories: readonly Category[];
  counts: Record<Category["slug"], number>;
}

const TITLE_ID = "categories-title";

export const Categories = ({ copy, categories, counts }: CategoriesProps) => (
  <section
    id={copy.id}
    aria-labelledby={TITLE_ID}
    className="flex scroll-mt-header flex-col gap-10 px-gutter-compact py-16 lg:px-gutter lg:py-screen-top"
  >
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <DisplayHeading id={TITLE_ID}>{copy.title}</DisplayHeading>
      <Lede delayIn={120} className="lg:w-column-lede">
        {copy.lede}
      </Lede>
    </div>

    <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {categories.map((category, index) => (
        <Inview
          key={category.slug}
          tag="li"
          mode="once"
          from={{ opacity: 0, y: 16 }}
          to={{ opacity: 1, y: 0 }}
          delayIn={80 + index * 90}
        >
          <Link
            href={`/products?category=${category.slug}`}
            className="lattice-panel group flex h-full min-h-64 flex-col justify-between gap-8 border border-rule p-panel transition-colors duration-[var(--duration-fast)] ease-entrance hover:border-rule-strong"
          >
            <div className="flex items-start justify-between">
              <IndexNumeral index={index} />
              <span className="text-caption text-content-faint">
                {fill(copy.countLabel, { count: counts[category.slug] })}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-title font-semibold leading-headline">{category.name}</h3>
              <p className="text-caption leading-relaxed text-content-muted">
                {category.description}
              </p>
              <span className="mt-2 inline-flex items-center gap-3 text-body text-foreground">
                {copy.linkLabel}
                <Icon
                  name="arrow"
                  className="size-4 transition-transform duration-[var(--duration-fast)] ease-entrance group-hover:-translate-x-0.5"
                />
              </span>
            </div>
          </Link>
        </Inview>
      ))}
    </ul>
  </section>
);
