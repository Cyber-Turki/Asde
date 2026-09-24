"use client";

/**
 * Cart store — Zustand, persisted to localStorage.
 *
 * Only the lines are persisted. `hydrated` flips once storage has been read
 * so the header count and the drawer never render a server/client mismatch:
 * until then consumers treat the cart as empty.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartLine, CartTotals } from "@/types/store";
import { products } from "@/data/mocks/store";
import { vatShareOf } from "@/utils/format";

const STORAGE_KEY = "khaleej-cart-v1";
const MAX_PER_LINE = 5;

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  hydrated: boolean;
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  markHydrated: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      hydrated: false,
      add: (slug, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((line) => line.slug === slug);
          const lines = existing
            ? state.lines.map((line) =>
                line.slug === slug
                  ? {
                      ...line,
                      quantity: Math.min(MAX_PER_LINE, line.quantity + quantity),
                    }
                  : line,
              )
            : [...state.lines, { slug, quantity }];
          return { lines, isOpen: true };
        }),
      setQuantity: (slug, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((line) => line.slug !== slug)
              : state.lines.map((line) =>
                  line.slug === slug
                    ? { ...line, quantity: Math.min(MAX_PER_LINE, quantity) }
                    : line,
                ),
        })),
      remove: (slug) =>
        set((state) => ({
          lines: state.lines.filter((line) => line.slug !== slug),
        })),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ lines: state.lines }),
      onRehydrateStorage: () => (state) => state?.markHydrated(),
    },
  ),
);

/** Lines the catalogue still knows about, joined to their products. */
export const selectLinesWithProducts = (lines: CartLine[]) =>
  lines.flatMap((line) => {
    const product = products.find((item) => item.slug === line.slug);
    return product ? [{ line, product }] : [];
  });

export const selectTotals = (lines: CartLine[]): CartTotals => {
  const joined = selectLinesWithProducts(lines);
  const total = joined.reduce(
    (sum, { line, product }) => sum + product.price * line.quantity,
    0,
  );
  const vat = vatShareOf(total);
  return {
    count: joined.reduce((sum, { line }) => sum + line.quantity, 0),
    total,
    vat,
    net: Math.round((total - vat) * 100) / 100,
  };
};
