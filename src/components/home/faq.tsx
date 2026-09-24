import { Inview } from "@/components/animation/springs/in-view";
import { IndexNumeral } from "@/components/ui/labels";
import { DisplayHeading } from "@/components/ui/motion-text";
import type { faqCopy } from "@/data/mocks/home";

/**
 * Screen 5. Five questions and their answers is exactly what `<dl>` is for,
 * and it makes the section eligible for FAQ structured data. A `<dl>` may
 * hold `<div>` groups but not nested wrappers, so each row is one element:
 * the reveal fades (no transform) and the opaque lattice panel sits on it.
 * The rule between question and answer is a border on the answer.
 */
export interface FaqProps {
  copy: typeof faqCopy;
}

const TITLE_ID = "faq-title";

export const Faq = ({ copy }: FaqProps) => (
  <section
    id={copy.id}
    aria-labelledby={TITLE_ID}
    className="flex scroll-mt-header flex-col gap-10 px-gutter-compact py-16 lg:grid lg:grid-cols-[var(--spacing-column-narrow)_minmax(0,1fr)] lg:gap-12 lg:px-gutter lg:py-screen-top"
  >
    <DisplayHeading id={TITLE_ID}>{copy.title}</DisplayHeading>

    <dl className="flex flex-col gap-3 lg:ms-auto lg:w-full lg:max-w-column-faq">
      {copy.items.map((item, index) => (
        <Inview
          key={item.question}
          mode="once"
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          delayIn={80 + index * 90}
          className="lattice-panel flex flex-col gap-3 border border-rule p-panel sm:min-h-faq-row sm:flex-row sm:gap-0"
        >
          <dt className="flex flex-col-reverse gap-2 sm:w-faq-term sm:shrink-0 sm:flex-col sm:justify-center sm:gap-6">
            <span className="text-body font-semibold leading-snug">{item.question}</span>
            <IndexNumeral index={index} />
          </dt>
          <dd className="text-caption leading-relaxed text-content-muted sm:ms-8 sm:border-s sm:border-rule sm:ps-8 sm:pt-1">
            {item.answer}
          </dd>
        </Inview>
      ))}
    </dl>
  </section>
);
