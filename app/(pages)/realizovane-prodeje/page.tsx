import PageHero from "@/components/ui/PageHero";
import Pagination from "@/components/ui/Pagination";
import PropertyCard from "@/components/ui/PropertyCard";
import { soldStats } from "@/lib/content";
import { formatArea, formatPrice, formatSpecs } from "@/lib/format";
import type { PropertyListItem } from "@/lib/property";
import { pageMetadata } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SOLD_REALITIES_QUERY } from "@/sanity/lib/queries";

export const metadata = pageMetadata({
  title: "Realizované prodeje",
  description: "Nemovitosti, které jsme úspěšně prodali v Havlíčkově Brodě a okolí.",
  path: "/realizovane-prodeje",
});

const PER_PAGE = 12;

export default async function RealizovaneProdejePage({ searchParams }: PageProps<"/realizovane-prodeje">) {
  const { strana } = await searchParams;
  const sold = await sanityFetch<PropertyListItem[]>({ query: SOLD_REALITIES_QUERY });

  const pages = Math.max(1, Math.ceil(sold.length / PER_PAGE));
  const page = Math.min(pages, Math.max(1, Number(strana) || 1));
  const items = sold.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <PageHero
        crumb="Realizované prodeje"
        title="Realizované prodeje"
        lead="Nemovitosti, které jsme prodali — a za jaké ceny."
      />

      {/* Čísla (29:419) */}
      <section className="bg-surface-50">
        <div className="container-site grid gap-8 px-6 py-14 md:grid-cols-3 lg:gap-[30px] lg:px-[120px] lg:py-[72px]">
          {soldStats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2">
              <p className="text-display-l text-brass-600 lg:text-display-xl">{s.value}</p>
              <p className="text-body-m text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Prodané nemovitosti (29:429) */}
      <section className="bg-surface-0">
        <div className="container-site px-6 py-16 lg:px-[120px] lg:pt-24 lg:pb-[104px]">
          <p className="text-label-s text-brass-500 lg:text-label-m">Výběr z portfolia</p>
          <h2 className="mt-[14px] text-heading-s text-ink-900 lg:mt-4 lg:max-w-[620px] lg:text-display-l">Co jsme prodali</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-x-[30px] lg:gap-y-10">
            {items.map((r) => (
              <PropertyCard
                key={r.slug}
                href={`/nemovitosti/${r.slug}`}
                imageUrl={r.imageUrl}
                title={r.price ? `Prodáno za ${formatPrice(r.price)}` : "Prodáno"}
                name={r.name}
                specs={formatSpecs(r.type, formatArea(r.area), r.city)}
                badge={{ label: "Prodáno", tone: "navy" }}
                dimmed
                className="border border-line-200 lg:border-0"
              />
            ))}
          </div>
          <Pagination page={page} pages={pages} basePath="/realizovane-prodeje" />
        </div>
      </section>
    </>
  );
}
