"use client";

import { easings } from "@react-spring/web";
import TextEngine from "spring-text-engine";

/**
 * The page's text motion — word-level spring reveals through
 * spring-text-engine (hard rule #3: text never gets a bespoke animator).
 *
 * Words, never letters: Arabic letters join, and a letter split would break
 * every word into isolated forms. No `overflow` clipping either — Arabic
 * ascenders and descenders overrun a 1.3 line box, and a fade needs no clip.
 * The engine's container is flex, so alignment pairs `text-*` with
 * `justify-*` (see obsidian/frontend/text-engine.md).
 */
const aligns = {
  start: "text-start justify-start",
  center: "text-center justify-center",
  end: "text-end justify-end",
} as const;

export type TextAlign = keyof typeof aligns;

interface RevealProps {
  children: string;
  id?: string;
  align?: TextAlign;
  delayIn?: number;
  className?: string;
}

export interface DisplayHeadingProps extends RevealProps {
  tag?: "h1" | "h2" | "h3";
  size?: "display" | "title";
}

const headingSizes: Record<NonNullable<DisplayHeadingProps["size"]>, string> = {
  display: "text-display-compact lg:text-display",
  title: "text-title lg:text-display-compact",
};

export const DisplayHeading = ({
  children,
  id,
  tag = "h2",
  size = "display",
  align = "start",
  delayIn = 0,
  className = "",
}: DisplayHeadingProps) => (
  <TextEngine
    tag={tag}
    id={id}
    mode="once"
    delayIn={delayIn}
    wordIn={{ y: 0, opacity: 1 }}
    wordOut={{ y: 28, opacity: 0 }}
    wordStagger={70}
    wordConfig={{ duration: 900, easing: easings.easeOutCubic }}
    className={`${headingSizes[size]} content-start font-bold leading-headline ${aligns[align]} ${className}`}
  >
    {children}
  </TextEngine>
);

export interface LedeProps extends RevealProps {
  tag?: "p" | "h1" | "span";
  tone?: "muted" | "foreground";
}

export const Lede = ({
  children,
  id,
  tag = "p",
  tone = "muted",
  align = "start",
  delayIn = 0,
  className = "",
}: LedeProps) => (
  <TextEngine
    tag={tag}
    id={id}
    mode="once"
    delayIn={delayIn}
    wordIn={{ y: 0, opacity: 1 }}
    wordOut={{ y: 12, opacity: 0 }}
    wordStagger={28}
    wordConfig={{ duration: 700, easing: easings.easeOutQuart }}
    className={`content-start text-lede leading-prose ${tone === "muted" ? "text-content-muted" : "text-foreground"} ${aligns[align]} ${className}`}
  >
    {children}
  </TextEngine>
);
