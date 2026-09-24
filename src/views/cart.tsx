import { CheckoutForm } from "@/components/store/checkout-form";
import { DisplayHeading, Lede } from "@/components/ui/motion-text";
import { cartCopy } from "@/data/mocks/catalogue";
import { lineItemCopy } from "@/data/mocks/site";
import { generateMetadata } from "@/utils/seo/generate-page-metadata";

/** Cart & checkout view. The form is a client leaf; the shell stays server. */
export const cartMetadata = {
  ...generateMetadata({ title: cartCopy.title, description: cartCopy.lede, url: "/cart" }),
  robots: { index: false, follow: false },
};

export const CartView = () => (
  <main id="main" className="min-h-lvh px-gutter-compact py-12 lg:px-gutter lg:pt-screen-top">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <DisplayHeading tag="h1">{cartCopy.title}</DisplayHeading>
      <Lede delayIn={120} className="lg:w-column-lede">
        {cartCopy.lede}
      </Lede>
    </div>
    <div className="mt-12">
      <CheckoutForm copy={cartCopy} lineItem={lineItemCopy} />
    </div>
  </main>
);
