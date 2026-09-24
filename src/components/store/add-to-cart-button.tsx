"use client";

import { useEffect, useRef, useState } from "react";

import { BracketButton } from "@/components/ui/bracket-button";
import { useCart } from "@/hooks/store/use-cart";

/** Adds one unit and confirms in place for a moment before resting again. */
export interface AddToCartButtonProps {
  slug: string;
  label: string;
  addedLabel: string;
  variant?: "outline" | "primary";
  className?: string;
}

const CONFIRM_MS = 1600;

export const AddToCartButton = ({
  slug,
  label,
  addedLabel,
  variant = "primary",
  className = "",
}: AddToCartButtonProps) => {
  const add = useCart((state) => state.add);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const handleClick = () => {
    add(slug);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), CONFIRM_MS);
  };

  return (
    <BracketButton onClick={handleClick} variant={variant} className={className}>
      <span aria-live="polite">{added ? addedLabel : label}</span>
    </BracketButton>
  );
};
