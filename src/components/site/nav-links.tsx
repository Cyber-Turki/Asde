"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import type { NavLink } from "@/data/mocks/site";

/**
 * The primary navigation list. `aria-current` needs the query string — the
 * category links share one pathname — so this reads `useSearchParams` and is
 * mounted inside a Suspense boundary by the header.
 */
export interface NavLinksProps {
  links: readonly NavLink[];
  className?: string;
}

const linkClass =
  "tap-area whitespace-nowrap transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-accent-hover aria-[current=page]:text-accent";

export const NavLinks = ({ links, className = "" }: NavLinksProps) => {
  const pathname = usePathname();
  const search = useSearchParams();

  const isCurrent = (href: string) => {
    if (href.includes("#")) return false;
    const [path, query = ""] = href.split("?");
    if (path !== pathname) return false;
    const wanted = new URLSearchParams(query);
    if (wanted.size === 0) return search.size === 0;
    return [...wanted.entries()].every(([key, value]) => search.get(key) === value);
  };

  return (
    <ul className={className}>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            aria-current={isCurrent(link.href) ? "page" : undefined}
            className={linkClass}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
