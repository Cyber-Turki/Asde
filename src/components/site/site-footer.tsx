import Link from "next/link";

import { NewsletterForm } from "@/components/site/newsletter-form";
import { BrandLogo } from "@/components/ui/brand-mark";
import type { footerCopy } from "@/data/mocks/site";

/**
 * Site footer — logo, link columns, contact, the newsletter form, a rule and
 * the closing line. Its own height, not a screen's worth of empty lattice.
 */
const linkClass =
  "text-content-muted transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground";

export interface SiteFooterProps {
  copy: typeof footerCopy;
}

export const SiteFooter = ({ copy }: SiteFooterProps) => (
  <footer className="border-t border-rule px-gutter-compact pb-8 pt-10 lg:px-gutter">
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
      <BrandLogo size="footer" className="shrink-0" />

      <nav
        aria-label={copy.navLabel}
        className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 lg:flex lg:gap-12"
      >
        {copy.columns.map((column) => (
          <div key={column.heading} className="flex flex-col gap-3 lg:w-30">
            <h2 className="text-body font-semibold">{column.heading}</h2>
            <ul className="flex flex-col gap-2 text-body">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex flex-col gap-3 lg:w-30">
          <h2 className="text-body font-semibold">{copy.contact.heading}</h2>
          <address className="flex flex-col gap-2 text-body not-italic">
            <a href={`tel:${copy.contact.phone}`} className={linkClass} dir="ltr">
              {copy.contact.phone}
            </a>
            <a
              href={copy.contact.whatsappHref}
              className={linkClass}
              rel="noopener"
              target="_blank"
            >
              {copy.contact.whatsappLabel}
            </a>
            <a href={`mailto:${copy.contact.email}`} className={linkClass}>
              {copy.contact.email}
            </a>
            <span className="text-caption text-content-faint">{copy.contact.hours}</span>
          </address>
        </div>
      </nav>

      <NewsletterForm copy={copy.newsletter} />
    </div>

    <hr className="my-8 border-rule" />

    <div className="flex flex-col-reverse gap-4 text-caption text-content-faint lg:flex-row lg:items-center lg:justify-between">
      <p className="flex flex-col gap-1">
        <span>{copy.legal.copyright}</span>
        <span>
          {copy.legal.vat} · {copy.legal.cr}
        </span>
      </p>
      <ul className="flex gap-2">
        {copy.social.map((link, index) => (
          <li key={link.label} className="flex gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            <a
              href={link.href}
              rel="noopener"
              target="_blank"
              className="transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);
