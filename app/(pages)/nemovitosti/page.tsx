import Link from "next/link";

import { button } from "@/components/ui/button";
import PageHero from "@/components/ui/PageHero";
import Pagination from "@/components/ui/Pagination";
import PropertyCard from "@/components/ui/PropertyCard";
import { propertyCardProps, type PropertyListItem } from "@/lib/property";
import { pageMetadata } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import { NEMOVITOSTI_QUERY } from "@/sanity/lib/queries";

export const metadata = pageMetadata({
  title: "Nemovitosti",
  description: "Aktuální nabídka bytů, rodinných domů, chat, chalup a pozemků na prodej i k pronájmu v Havlíčkově Brodě a na Vysočině.",
  path: "/nemovitosti",
});

const PER_PAGE = 9;

function pluralize(n: number) {
  if (n === 1) return "nemovitost";
  if (n >= 2 && n <= 4) return "nemovitosti";
  return "nemovitostí";
}

export default async function NemovitostiPage({ searchParams }: PageProps<"/nemovitosti">) {
  const { strana } = await searchParams;
  const realities = await sanityFetch<PropertyListItem[]>({ query: NEMOVITOSTI_QUERY });

  const pages = Math.max(1, Math.ceil(realities.length / PER_PAGE));
  const page = Math.min(pages, Math.max(1, Number(strana) || 1));
  const items = realities.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <PageHero crumb="Nemovitosti" title="Nemovitosti" lead="Aktuální nabídka domů, bytů, chalup a pozemků na Vysočině." />

      {/* Počet výsledků (21:137) */}
      <section className="bg-surface-0">
        <div className="container-site px-6 pt-10 pb-6 lg:px-[120px] lg:pt-14">
          <p className="text-title-s text-ink-900">
            Nalezeno {realities.length} {pluralize(realities.length)}
          </p>
        </div>
      </section>

      {/* Výpis nemovitostí (22:165) */}
      <section className="bg-surface-50">
        <div className="container-site px-6 py-10 lg:px-[120px] lg:pt-2 lg:pb-[104px]">
          {items.length > 0 ? (
            <div className="grid gap-5 pt-0 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-[30px] lg:gap-y-10 lg:pt-[2px]">
              {items.map((r) => (
                <PropertyCard key={r.slug} {...propertyCardProps(r)} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-start gap-6 py-10">
              <p className="text-body-l text-ink-500">Momentálně připravujeme nové nabídky. Prodáváte? Rádi vám pomůžeme.</p>
              <Link href="/kontakt" className={button.primary}>
                Nezávazná konzultace
              </Link>
            </div>
          )}
          <Pagination page={page} pages={pages} basePath="/nemovitosti" />
        </div>
      </section>
    </>
  );
}
