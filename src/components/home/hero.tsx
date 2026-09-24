import { Spring } from "@/components/animation/springs/spring";
import { DeviceArt } from "@/components/store/device-art";
import { BracketButton } from "@/components/ui/bracket-button";
import { Float, IdleGlyph, WordmarkPlate } from "@/components/ui/idle-motion";
import { CornerGlyph } from "@/components/ui/labels";
import { Lede } from "@/components/ui/motion-text";
import type { HeroCard as HeroCardCopy, heroCopy } from "@/data/mocks/home";
import { siteConfig } from "@/lib/site";
import type { Product } from "@/types/store";

/**
 * Screen 1. From the frame breakpoint everything is anchored to the
 * artboard's edges — statements against each margin, the claim and CTA on
 * the bottom edge, corner cards under them — and the product is drawn by the
 * journey stage behind. Below it the hero is a flow column: the statements
 * lead, then the product box, then claim and CTA, then the two cards as a
 * grid with equal rows.
 */
export interface HeroProps {
  copy: typeof heroCopy;
  product: Product;
}

const HERO_TITLE_ID = "hero-title";

interface StatementProps {
  lines: readonly string[];
  side: "start" | "end";
  delayIn: number;
  className?: string;
}

const Statement = ({ lines, side, delayIn, className = "" }: StatementProps) => (
  <Spring
    tag="p"
    mode="once"
    from={{ opacity: 0 }}
    to={{ opacity: 1 }}
    delayIn={delayIn}
    className={`flex flex-col gap-1 text-body font-medium leading-snug ${side === "end" ? "items-end text-end" : "items-start text-start"} ${className}`}
  >
    <CornerGlyph position={side === "end" ? "top-end" : "top-start"} className="mb-2" />
    {lines.map((line) => (
      <span key={line}>{line}</span>
    ))}
    <CornerGlyph position={side === "end" ? "bottom-start" : "bottom-end"} className="mt-2" />
  </Spring>
);

interface HeroCardProps {
  card: HeroCardCopy;
  delayIn: number;
  className?: string;
}

const HeroCard = ({ card, delayIn, className = "" }: HeroCardProps) => (
  <Spring
    mode="once"
    from={{ opacity: 0, y: 12 }}
    to={{ opacity: 1, y: 0 }}
    delayIn={delayIn}
    className={className}
  >
    <div className="lattice-panel flex h-full items-stretch gap-4 border border-rule p-panel">
      <div className="flex flex-col items-center justify-center gap-1">
        <IdleGlyph kind={card.icon} className="size-7 text-foreground" />
        {card.caption ? (
          <span className="text-caption text-content-faint">{card.caption}</span>
        ) : null}
      </div>
      <span aria-hidden="true" className="w-hairline self-stretch bg-rule" />
      <p className="flex flex-col justify-center text-caption leading-snug">
        {card.lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </div>
  </Spring>
);

export const Hero = ({ copy, product }: HeroProps) => (
  <section
    aria-labelledby={HERO_TITLE_ID}
    className="relative flex min-h-lvh flex-col justify-between gap-8 overflow-hidden px-gutter-compact pb-gutter-compact pt-6 lg:h-artboard lg:min-h-lvh lg:px-gutter lg:pb-gutter lg:pt-0"
  >
    <WordmarkPlate text={siteConfig.shortName} />

    <div className="relative z-10 grid grid-cols-2 gap-4 lg:contents">
      <Statement
        lines={copy.statements.start}
        side="start"
        delayIn={140}
        className="lg:absolute lg:start-gutter lg:top-1/2 lg:z-10 lg:w-statement lg:-translate-y-1/2"
      />
      <Statement
        lines={copy.statements.end}
        side="end"
        delayIn={220}
        className="lg:absolute lg:end-gutter lg:top-1/2 lg:z-10 lg:w-statement lg:-translate-y-1/2"
      />
    </div>

    <div className="relative z-10 mx-auto aspect-4/3 w-full max-w-product-mobile lg:hidden">
      <Float className="h-full">
        <DeviceArt kind={product.art} title={copy.deviceLabel} className="h-full" />
      </Float>
    </div>

    <div className="relative z-10 flex flex-col items-center gap-6 lg:absolute lg:inset-x-gutter lg:bottom-claim-bottom lg:gap-0">
      <Lede
        tag="h1"
        id={HERO_TITLE_ID}
        tone="foreground"
        align="center"
        delayIn={260}
        className="max-w-column-faq font-semibold lg:text-title"
      >
        {copy.claim.join(" ")}
      </Lede>
      <Spring
        mode="once"
        from={{ opacity: 0, y: 12 }}
        to={{ opacity: 1, y: 0 }}
        delayIn={420}
        className="lg:absolute lg:left-1/2 lg:top-full lg:mt-8 lg:-translate-x-1/2"
      >
        <BracketButton href={copy.cta.href}>{copy.cta.label}</BracketButton>
      </Spring>
    </div>

    <div className="relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:contents">
      <HeroCard
        card={copy.cards[0]}
        delayIn={480}
        className="lg:absolute lg:bottom-gutter lg:start-gutter lg:z-10 lg:w-corner-card"
      />
      <HeroCard
        card={copy.cards[1]}
        delayIn={540}
        className="lg:absolute lg:bottom-gutter lg:end-gutter lg:z-10"
      />
    </div>
  </section>
);
