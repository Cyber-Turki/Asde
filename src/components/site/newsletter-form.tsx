"use client";

import { useId, useState } from "react";

import { Icon } from "@/components/ui/icons";
import type { footerCopy } from "@/data/mocks/site";

/**
 * A real form, deliberately: the design draws a box with "your e-mail" in it,
 * an arrow and a small square beside a consent line — a picture of a control.
 * Rendering that as static text would put a lie in the accessibility tree.
 * There is no endpoint yet, so submit is handled in place.
 */
export interface NewsletterFormProps {
  copy: typeof footerCopy.newsletter;
}

export const NewsletterForm = ({ copy }: NewsletterFormProps) => {
  const emailId = useId();
  const consentId = useId();
  const [done, setDone] = useState(false);

  return (
    <form
      className="flex w-full flex-col gap-3 lg:w-newsletter"
      onSubmit={(event) => {
        event.preventDefault();
        setDone(true);
      }}
      aria-describedby={done ? `${emailId}-status` : undefined}
    >
      <label htmlFor={emailId} className="text-body font-medium">
        {copy.heading}
      </label>
      <div className="flex border border-rule-strong">
        <input
          id={emailId}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          required
          placeholder={copy.placeholder}
          className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-body text-foreground placeholder:text-content-faint focus-visible:outline-none"
        />
        <button
          type="submit"
          className="flex w-control shrink-0 items-center justify-center text-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-accent-hover"
        >
          <Icon name="arrow" className="size-4" />
          <span className="sr-only">{copy.submitLabel}</span>
        </button>
      </div>
      <label
        htmlFor={consentId}
        className="flex cursor-pointer items-center gap-2 text-caption text-content-faint"
      >
        <input
          id={consentId}
          type="checkbox"
          name="consent"
          required
          className="size-2.5 shrink-0 cursor-pointer appearance-none border border-rule transition-colors duration-[var(--duration-fast)] ease-entrance checked:border-rule-strong checked:bg-rule-strong hover:border-rule-strong"
        />
        {copy.consentLabel}
      </label>
      {done ? (
        <p id={`${emailId}-status`} role="status" className="text-caption text-accent">
          {copy.successMessage}
        </p>
      ) : null}
    </form>
  );
};
