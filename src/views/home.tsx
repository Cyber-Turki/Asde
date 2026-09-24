import { JsonLd } from "@/components/common/json-ld";
import { Categories } from "@/components/home/categories";
import { Collections } from "@/components/home/collections";
import { Faq } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { ProductJourney } from "@/components/home/product-journey";
import { WhyUs } from "@/components/home/why-us";
import { DeviceArt } from "@/components/store/device-art";
import { Float } from "@/components/ui/idle-motion";
import {
  categoriesCopy,
  collectionsCopy,
  faqCopy,
  heroCopy,
  whyUsCopy,
} from "@/data/mocks/home";
import {
  categories,
  featuredProducts,
  getProduct,
  getProductsByCategory,
} from "@/data/mocks/store";
import { getFaqStructuredData } from "@/utils/seo/structured-data";

/**
 * Home view — a Server Component. Five screens: the hero and "why us" share
 * the product journey stage; then the collection, the categories, the FAQ.
 * Motion lives in client leaves inside each section.
 */
export const HomeView = () => {
  const hero = getProduct(heroCopy.featuredSlug) ?? featuredProducts()[0];
  const counts = {
    iphone: getProductsByCategory("iphone").length,
    accessories: getProductsByCategory("accessories").length,
    "smart-devices": getProductsByCategory("smart-devices").length,
  };

  return (
    <main id="main" className="min-h-lvh">
      <JsonLd data={getFaqStructuredData(faqCopy.items)} />

      <ProductJourney
        art={
          <Float className="h-full">
            <DeviceArt kind={hero.art} className="h-full" />
          </Float>
        }
      >
        <Hero copy={heroCopy} product={hero} />
        <WhyUs copy={whyUsCopy} />
      </ProductJourney>

      <Collections copy={collectionsCopy} products={featuredProducts()} />
      <Categories copy={categoriesCopy} categories={categories} counts={counts} />
      <Faq copy={faqCopy} />
    </main>
  );
};
