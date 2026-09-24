/**
 * Price and number formatting for the Saudi market.
 *
 * Western digits with a thousands separator is the convention on Saudi
 * storefronts; the currency mark follows the number. In an RTL run the
 * browser places the digits on the right and "ر.س" to their left, which is
 * exactly how a shelf label reads.
 */

const VAT_RATE = 0.15;

const whole = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const cents = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const CURRENCY_MARK = "ر.س";

/** `4999` → `"4,999 ر.س"`. */
export const formatSar = (amount: number): string =>
  `${whole.format(amount)} ${CURRENCY_MARK}`;

/** `1249.75` → `"1,249.75 ر.س"` — for instalments and the VAT line. */
export const formatSarExact = (amount: number): string =>
  `${cents.format(amount)} ${CURRENCY_MARK}`;

/** One of `parts` equal, interest-free payments (Tabby / Tamara style). */
export const instalmentOf = (amount: number, parts = 4): number =>
  Math.round((amount / parts) * 100) / 100;

/** The VAT share contained in a VAT-inclusive amount. */
export const vatShareOf = (amountIncludingVat: number): number =>
  Math.round((amountIncludingVat - amountIncludingVat / (1 + VAT_RATE)) * 100) /
  100;

/**
 * Fills `{name}` placeholders in a copy template. Copy that crosses into a
 * client component must be serialisable, so templates replace functions.
 */
export const fill = (template: string, values: Record<string, string | number>): string =>
  Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template,
  );

/** `"01"`, `"02"` … for index numerals. */
export const padIndex = (index: number): string =>
  String(index + 1).padStart(2, "0");
