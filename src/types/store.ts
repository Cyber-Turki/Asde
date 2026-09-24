/**
 * Store domain types — products, categories and cart lines.
 *
 * Prices are whole riyals INCLUDING 15% VAT, the way Saudi shelf prices are
 * shown. The VAT share is derived at display time, never stored.
 */

export type CategorySlug = "iphone" | "accessories" | "smart-devices";

export interface Category {
  slug: CategorySlug;
  name: string;
  /** One line under the name on the categories tiles. */
  description: string;
}

/** Which inline SVG render draws the product. */
export type DeviceKind =
  | "iphone"
  | "airpods"
  | "watch"
  | "ipad"
  | "charger"
  | "case"
  | "adapter"
  | "homepod"
  | "appletv";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductVariant {
  label: string;
  options: string[];
}

export interface Product {
  slug: string;
  name: string;
  /** Short form for cards and the cart. */
  shortName: string;
  category: CategorySlug;
  /** Whole riyals, VAT included. */
  price: number;
  /** Previous price when the product is on offer. */
  compareAtPrice?: number;
  description: string;
  /** Two or three chips on the card — capacity, finish, chip. */
  tags: string[];
  specs: ProductSpec[];
  variants?: ProductVariant[];
  art: DeviceKind;
  /** Small label on the card corner — "الأكثر مبيعًا", "جديد". */
  badge?: string;
  /** Shown in the home collections row. */
  featured?: boolean;
  inStock: boolean;
}

export interface CartLine {
  slug: string;
  quantity: number;
}

export interface CartTotals {
  /** Units across all lines. */
  count: number;
  /** Sum of line prices, VAT included. */
  total: number;
  /** The VAT share contained in `total`. */
  vat: number;
  /** `total` less the VAT share. */
  net: number;
}
