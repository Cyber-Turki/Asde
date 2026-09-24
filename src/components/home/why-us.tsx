import { Inview } from "@/components/animation/springs/in-view";
import { BracketButton } from "@/components/ui/bracket-button";
import { Icon } from "@/components/ui/icons";
import { IndexNumeral } from "@/components/ui/labels";
import { DisplayHeading, Lede } from "@/components/ui/motion-text";
import type { FeatureRow as FeatureRowCopy, whyUsCopy } from "@/data/mocks/home";

/**
 * Screen 2. The headline and standfirst at the inline-start, five numbered
 * rows at the inline-end, and the travelling product behind the middle.
 * Each row is an opaque lattice panel — the product runs behind them, and
 * muted prose over a lit device is unreadable on a transparent card.
 */
export interface WhyUsProps {
  copy: typeof whyUsCopy;
}

const TITLE_ID = "why-us-title";

interface FeatureRowProps {
  row: FeatureRowCopy;
  index: number;
  delayIn: number;
}

const FeatureRow = ({ row, index, delayIn }: FeatureRowProps) => (
  <Inview
    tag="li"
    mode="once"
    from={{ opacity: 0, y: 16 }}
    to={{ opacity: 1, y: 0 }}
    delayIn={delayIn}
    className="sm:last:col-span-2 lg:last:col-span-1"
  >
    <div className="lattice-panel flex h-full gap-4 border border-rule p-panel">
      <div className="flex flex-col items-center justify-between">
        <IndexNumeral index={index} />
        <Icon name={row.icon} className="size-7 text-accent" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-body font-semibold leading-snug">{row.title}</h3>
        <p className="text-caption leading-relaxed text-content-muted">{row.body}</p>
      </div>
    </div>
  </Inview>
);

export const WhyUs = ({ copy }: WhyUsProps) => (
  <section
    id={copy.id}
    aria-labelledby={TITLE_ID}
    className="relative flex scroll-mt-header flex-col gap-10 px-gutter-compact py-16 lg:grid lg:min-h-lvh lg:grid-cols-[var(--spacing-column-narrow)_minmax(0,1fr)_var(--spacing-column-wide)] lg:gap-12 lg:px-gutter lg:py-screen-top"
  >
    <div className="flex flex-col gap-8">
      <DisplayHeading id={TITLE_ID}>{copy.title}</DisplayHeading>
      <Lede delayIn={120}>{copy.lede}</Lede>
      <Inview
        mode="once"
        from={{ opacity: 0, y: 12 }}
        to={{ opacity: 1, y: 0 }}
        delayIn={200}
        className="mt-auto hidden lg:block"
      >
        <BracketButton href={copy.cta.href}>{copy.cta.label}</BracketButton>
      </Inview>
    </div>

    <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-start-3 lg:grid-cols-1">
      {copy.rows.map((row, index) => (
        <FeatureRow key={row.title} row={row} index={index} delayIn={80 + index * 90} />
      ))}
    </ol>

    <div className="lg:hidden">
      <BracketButton href={copy.cta.href}>{copy.cta.label}</BracketButton>
    </div>
  </section>
);
