import { Inview } from "@/components/animation/springs/in-view";
import { DisplayHeading, Lede } from "@/components/ui/motion-text";
import { policiesCopy } from "@/data/mocks/catalogue";
import { generateMetadata } from "@/utils/seo/generate-page-metadata";

/** Policies view — returns, privacy and terms, each an anchored section. */
export const policiesMetadata = generateMetadata({
  title: "السياسات — الإرجاع والخصوصية والشروط",
  description: policiesCopy.lede,
  url: "/policies",
});

export const PoliciesView = () => (
  <main id="main" className="min-h-lvh px-gutter-compact py-12 lg:px-gutter lg:pt-screen-top">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <DisplayHeading tag="h1">{policiesCopy.title}</DisplayHeading>
      <Lede delayIn={120} className="lg:w-column-lede">
        {policiesCopy.lede}
      </Lede>
    </div>

    <div className="mt-12 flex flex-col gap-4 lg:ms-auto lg:max-w-column-faq">
      {policiesCopy.sections.map((section, index) => (
        <Inview
          key={section.id}
          tag="section"
          id={section.id}
          aria-labelledby={`${section.id}-title`}
          mode="once"
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          delayIn={80 + index * 90}
          className="lattice-panel scroll-mt-header flex flex-col gap-4 border border-rule p-6"
        >
          <h2 id={`${section.id}-title`} className="text-title font-semibold">
            {section.title}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-body leading-prose text-content-muted">
              {paragraph}
            </p>
          ))}
        </Inview>
      ))}
    </div>
  </main>
);
