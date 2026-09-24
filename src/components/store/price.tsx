import { fill, formatSar, formatSarExact, instalmentOf } from "@/utils/format";

/** A shelf price; with `compareAt` the old price is struck through beside it. */
export interface PriceProps {
  amount: number;
  compareAt?: number;
  className?: string;
}

export const Price = ({ amount, compareAt, className = "" }: PriceProps) => (
  <span className={`inline-flex flex-wrap items-baseline gap-x-3 tabular-nums ${className}`}>
    <span>{formatSar(amount)}</span>
    {compareAt && compareAt > amount ? (
      <s className="text-caption text-content-faint">{formatSar(compareAt)}</s>
    ) : null}
  </span>
);

/** "أو 4 دفعات بدون فوائد بقيمة 1,249.75 ر.س" */
export interface InstalmentProps {
  amount: number;
  /** `{parts}` in `before` is the number of payments. */
  copy: { before: string; after: string };
  parts?: number;
  className?: string;
}

export const Instalment = ({ amount, copy, parts = 4, className = "" }: InstalmentProps) => (
  <p className={`text-caption text-content-muted ${className}`}>
    {fill(copy.before, { parts })}{" "}
    <span className="tabular-nums text-foreground">
      {formatSarExact(instalmentOf(amount, parts))}
    </span>{" "}
    {copy.after}
  </p>
);
