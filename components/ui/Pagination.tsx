import Link from "next/link";

// Čísla stránek: první, poslední a okolí aktuální, mezery jako „…“
function pageItems(page: number, pages: number): (number | "gap")[] {
  const keep = new Set([1, pages, page - 1, page, page + 1].filter((p) => p >= 1 && p <= pages));
  const sorted = [...keep].sort((a, b) => a - b);
  const items: (number | "gap")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) items.push("gap");
    items.push(p);
  });
  return items;
}

// Figma: Výpis nemovitostí → stránkování (22:165)
// `hash` = id sekce s výpisem, aby se po přechodu na jinou stranu neskákalo na začátek stránky
export default function Pagination({ page, pages, basePath, hash }: { page: number; pages: number; basePath: string; hash?: string }) {
  if (pages <= 1) return null;
  const anchor = hash ? `#${hash}` : "";
  const href = (p: number) => (p === 1 ? basePath : `${basePath}?strana=${p}`) + anchor;
  const item = "flex h-10 min-w-10 items-center justify-center rounded border px-3 text-button-m";
  const idle = "border-line-200 bg-surface-0 text-ink-700 hover:border-navy-900";

  return (
    <nav aria-label="Stránkování" className="mt-12 flex flex-wrap justify-center gap-2 lg:mt-14">
      {page > 1 && (
        <Link href={href(page - 1)} aria-label="Předchozí stránka" className={`${item} ${idle}`}>
          ←<span className="hidden sm:inline">&nbsp;Předchozí</span>
        </Link>
      )}
      {pageItems(page, pages).map((p, i) =>
        p === "gap" ? (
          <span key={`gap-${i}`} aria-hidden className="flex h-10 items-center px-1 text-ink-300">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={href(p)}
            aria-current={p === page ? "page" : undefined}
            className={`${item} ${p === page ? "border-navy-900 bg-navy-900 text-surface-0" : idle}`}
          >
            {p}
          </Link>
        ),
      )}
      {page < pages && (
        <Link href={href(page + 1)} aria-label="Další stránka" className={`${item} ${idle}`}>
          <span className="hidden sm:inline">Další&nbsp;</span>→
        </Link>
      )}
    </nav>
  );
}
