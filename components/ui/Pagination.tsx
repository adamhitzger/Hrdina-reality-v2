import Link from "next/link";

// Figma: Výpis nemovitostí → stránkování (22:165)
export default function Pagination({ page, pages, basePath }: { page: number; pages: number; basePath: string }) {
  if (pages <= 1) return null;
  const href = (p: number) => (p === 1 ? basePath : `${basePath}?strana=${p}`);
  const item = "flex h-10 min-w-10 items-center justify-center rounded border px-3 text-button-m";

  return (
    <nav aria-label="Stránkování" className="mt-12 flex justify-center gap-2 lg:mt-14">
      {page > 1 && (
        <Link href={href(page - 1)} className={`${item} border-line-200 bg-surface-0 text-ink-700 hover:border-navy-900`}>
          ← Předchozí
        </Link>
      )}
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? "page" : undefined}
          className={`${item} ${p === page ? "border-navy-900 bg-navy-900 text-surface-0" : "border-line-200 bg-surface-0 text-ink-700 hover:border-navy-900"}`}
        >
          {p}
        </Link>
      ))}
      {page < pages && (
        <Link href={href(page + 1)} className={`${item} border-line-200 bg-surface-0 text-ink-700 hover:border-navy-900`}>
          Další →
        </Link>
      )}
    </nav>
  );
}
