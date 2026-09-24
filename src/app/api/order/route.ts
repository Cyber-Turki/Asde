import { z } from "zod";

import { getProduct } from "@/data/mocks/store";
import { ApiError, handle } from "@/lib/api";

/**
 * Order submission. Validates the delivery details and the lines against
 * the catalogue, prices the order server-side (the client's totals are never
 * trusted), and returns an order number. There is no payment or persistence
 * yet: wire the CMS/DB here when Payload + Supabase are added
 * (obsidian/backend/cms-payload.md).
 */
const SAUDI_MOBILE = /^(\+966|0)5\d{8}$/;
const MAX_PER_LINE = 5;

const orderSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().regex(SAUDI_MOBILE),
  city: z.string().trim().min(2).max(60),
  address: z.string().trim().min(5).max(300),
  note: z.string().trim().max(500).optional(),
  lines: z
    .array(
      z.object({
        slug: z.string().min(1),
        quantity: z.number().int().min(1).max(MAX_PER_LINE),
      }),
    )
    .min(1),
});

const orderNumber = () =>
  `KH-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 36).toString(36).toUpperCase()}`;

export const POST = handle(async (req) => {
  const input = orderSchema.parse(await req.json());

  const priced = input.lines.map((line) => {
    const product = getProduct(line.slug);
    if (!product || !product.inStock) {
      throw new ApiError(400, "unknown_product", `Unknown product: ${line.slug}`);
    }
    return { ...line, price: product.price };
  });

  const total = priced.reduce((sum, line) => sum + line.price * line.quantity, 0);

  return {
    orderId: orderNumber(),
    total,
    count: priced.reduce((sum, line) => sum + line.quantity, 0),
  };
});
