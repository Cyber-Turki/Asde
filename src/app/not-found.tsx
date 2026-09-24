import Link from "next/link";

/**
 * 404 page. Rendered for unmatched routes and `notFound()` calls; Next serves
 * it with a 404 status, so crawlers see a proper not-found response.
 */
export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-lvh flex-col items-center justify-center gap-4 px-gutter-compact text-center"
    >
      <h1 className="text-display-compact font-bold leading-headline">404</h1>
      <p className="text-lede text-content-muted">هذه الصفحة غير موجودة.</p>
      <Link
        href="/"
        className="underline underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-accent-hover"
      >
        العودة إلى الرئيسية
      </Link>
    </main>
  );
}
