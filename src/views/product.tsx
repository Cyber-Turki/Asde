import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Inview } from "@/components/animation/springs/in-view";
import { JsonLd } from "@/components/common/json-ld";
import { AddToCartButton } from "@/components/store/add-to-cart-button";
import { DeviceArt } from "@/components/store/device-art";
import { Instalment, Price } from "@/components/store/price";
import { ProductCard } from "@/components/store/product-card";
import { Float } from "@/components/ui/idle-motion";
import { Chip } from "@/components/ui/labels";
import { DisplayHeading, Lede } from "@/components/ui/motion-text";
import { catalogueCopy, instalmentCopy, productCopy } from "@/data/mocks/catalogue";
import { getCategory, getProduct, getProductsByCategory, products } from "@/data/mocks/store";
import { generateMetadata } from "@/utils/seo/generate-page-metadata";
import {
  getBreadcrumbStructuredData,
  getProductStructuredData,
} from "@/utils/seo/structured-data";

/** Product view — one product, its specs, and three more from its category. */
export interface ProductViewProps {
  slug: string;
}

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export const productStaticParams = () => products.map(({ slug }) => ({ slug }));

export const generateProductMetadata = async ({ params }: RouteParams): Promise<Metadata> => {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return generateMetadata({
    title: product.name,
    description: product.description,
    url: `/products/${slug}`,
  });
};

const RELATED_COUNT = 3;

export const ProductView = ({ slug }: ProductViewProps) => {
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getProductsByCategory(product.category)
    .filter((item) => item.slug !== product.slug)
    .slice(0, RELATED_COUNT);
  const crumbs = [
    { name: productCopy.homeLabel, path: "/" },
    { name: productCopy.storeLabel, path: "/products" },
    ...(category
      ? [{ name: category.name, path: `/products?category=${category.slug}` }]
      : []),
    { name: product.shortName, path: `/products/${product.slug}` },
  ];

  return (
    <main id="main" className="min-h-lvh px-gutter-compact py-12 lg:px-gutter lg:pt-screen-top">
      <JsonLd data={getProductStructuredData(product)} />
      <JsonLd data={getBreadcrumbStructuredData(crumbs)} />

      <nav aria-label={productCopy.breadcrumbLabel} className="text-caption text-content-muted">
        <ol className="flex flex-wrap items-center gap-2">
          {crumbs.map((crumb, index) => (
            <li key={crumb.path} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {index === crumbs.length - 1 ? (
                <span aria-current="page" className="text-foreground">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <article className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <Inview
          mode="once"
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          className="lattice-panel flex aspect-square items-center justify-center border border-rule p-10 lg:sticky lg:top-gutter lg:self-start"
        >
          <Float className="h-full">
            <DeviceArt kind={product.art} title={product.name} className="h-full" />
          </Float>
        </Inview>

        <div className="flex flex-col gap-6">
          {product.badge ? <span className="text-caption text-accent">{product.badge}</span> : null}
          <DisplayHeading tag="h1" size="title">
            {product.name}
          </DisplayHeading>
          <div className="flex flex-col gap-2">
            <Price
              amount={product.price}
              compareAt={product.compareAtPrice}
              className="text-title font-semibold"
            />
            <span className="text-caption text-content-faint">{productCopy.vatNote}</span>
            <Instalment amount={product.price} copy={instalmentCopy} />
          </div>
          <Lede delayIn={120}>{product.description}</Lede>

          {product.variants?.map((variant) => (
            <div key={variant.label} className="flex flex-col gap-2">
              <h2 className="text-caption text-content-faint">
                {productCopy.variantsHeading} — {variant.label}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {variant.options.map((option) => (
                  <li key={option}>
                    <Chip>{option}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-3">
            <AddToCartButton
              slug={product.slug}
              label={productCopy.addLabel}
              addedLabel={productCopy.addedLabel}
              className="self-start"
            />
            <p className="text-caption text-content-muted">
              {product.inStock ? productCopy.availableLabel : productCopy.unavailableLabel} ·{" "}
              {productCopy.deliveryNote} {productCopy.warrantyNote}
            </p>
          </div>

          <section aria-labelledby="specs-title" className="border-t border-rule pt-6">
            <h2 id="specs-title" className="text-body font-semibold">
              {productCopy.specsHeading}
            </h2>
            <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 text-body sm:grid-cols-[auto_1fr]">
              {product.specs.map((spec) => (
                <div key={spec.label} className="contents">
                  <dt className="text-content-faint">{spec.label}</dt>
                  <dd className="text-content-muted">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </article>

      {related.length > 0 ? (
        <section aria-labelledby="related-title" className="mt-20 flex flex-col gap-8">
          <h2 id="related-title" className="text-title font-semibold">
            {productCopy.relatedHeading}
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <ProductCard
                key={item.slug}
                product={item}
                index={index}
                addLabel={catalogueCopy.addLabel}
                addedLabel={catalogueCopy.addedLabel}
                tagsLabel={catalogueCopy.tagsLabel}
                delayIn={80 + index * 90}
              />
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
};
