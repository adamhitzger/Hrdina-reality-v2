import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/ui/PageHero";
import Pagination from "@/components/ui/Pagination";
import PropertyCard from "@/components/ui/PropertyCard";
import CountUp from "@/components/ui/CountUp";
import { soldStats } from "@/lib/content";
import { formatArea, formatPrice, formatSpecs, pageNumber } from "@/lib/format";
import { itemListJsonLd, pageJsonLd } from "@/lib/json-ld";
import type { PropertyListItem } from "@/lib/property";
import { listingMetadata, siteUrl } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SOLD_REALITIES_QUERY } from "@/sanity/lib/queries";
import photoWindow from "@/public/images/photo-window.jpg";

const PER_PAGE = 12;
const PATH = "/realizovane-prodeje";
const TITLE = "Realizované prodeje a pronájmy";
const DESCRIPTION =
  "Nemovitosti, které jsme prodali a pronajali v Havlíčkově Brodě, na Vysočině i jinde. Prodejní ceny a mapa všech realizovaných obchodů.";

const getSold = () => sanityFetch<PropertyListItem[]>({ query: SOLD_REALITIES_QUERY });

export async function generateMetadata({ searchParams }: PageProps<"/realizovane-prodeje">) {
  const [{ strana }, sold] = await Promise.all([searchParams, getSold()]);
  const { page } = pageNumber(strana, sold.length, PER_PAGE);
  return listingMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, page });
}

// Google My Maps s vyznačenými prodeji, spravuje klient
const SOLD_MAP_ID = "1IUabbEENYXPNdODTzfsONVuY6qM9ohyM";

export default async function RealizovaneProdejePage({ searchParams }: PageProps<"/realizovane-prodeje">) {
  const [{ strana }, sold] = await Promise.all([searchParams, getSold()]);
  const { page, pages } = pageNumber(strana, sold.length, PER_PAGE);
  const items = sold.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const pagePath = page > 1 ? `${PATH}?strana=${page}` : PATH;

  return (
    <>
      <JsonLd
        data={pageJsonLd({
          type: "CollectionPage",
          path: pagePath,
          name: TITLE,
          description: DESCRIPTION,
          crumbs: [{ name: "Realizované prodeje", path: PATH }],
          mainEntity: { "@id": `${siteUrl}${pagePath}#list` },
          extra: [itemListJsonLd(items, `${siteUrl}${pagePath}#list`, (page - 1) * PER_PAGE)],
        })}
      />
      <PageHero
        crumb="Realizované prodeje"
        title={TITLE}
        lead="Skutečné prodeje. Konkrétní výsledky."
        image={photoWindow}
      />

      {/* Čísla (29:419) */}
      <section className="bg-surface-50">
        <div className="container-site grid gap-8 px-6 py-14 md:grid-cols-3 lg:gap-[30px] lg:px-[120px] lg:py-[72px]">
          {soldStats.map((s) => (
            <div key={s.label} data-reveal className="flex flex-col gap-2">
              <p className="text-display-l text-brass-600 lg:text-display-xl">
                <CountUp value={s.value} />
              </p>
              <p className="text-body-m text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mapa prodejů – Google My Maps od klienta (není ve Figmě) */}
      <section className="bg-surface-0">
        <div className="container-site px-6 pt-16 lg:px-[120px] lg:pt-24">
          <p data-reveal className="text-label-s text-brass-500 lg:text-label-m">
            Mapa prodejů
          </p>
          <h2 data-reveal className="mt-[14px] text-heading-s text-ink-900 lg:mt-4 lg:max-w-[620px] lg:text-display-l">
            Kde všude jsme prodávali
          </h2>
          <div data-reveal="fade" className="relative mt-8 h-[420px] overflow-hidden rounded bg-[#e8e3da] lg:mt-14 lg:h-[560px]">
            <iframe
              title="Mapa realizovaných prodejů Hrdina Reality"
              src={`https://www.google.com/maps/d/embed?mid=${SOLD_MAP_ID}&ll=47.63374065391672%2C15.220429299999978&z=6`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0"
            />
          </div>
          <a
            href={`https://www.google.com/maps/d/viewer?mid=${SOLD_MAP_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-label-s whitespace-pre text-brass-600 hover:text-brass-500"
          >
            {"Otevřít mapu na celou obrazovku  →"}
          </a>
        </div>
      </section>

      {/* Prodané nemovitosti (29:429) */}
      <section className="bg-surface-0">
        <div className="container-site px-6 py-16 lg:px-[120px] lg:pt-24 lg:pb-[104px]">
          <p data-reveal className="text-label-s text-brass-500 lg:text-label-m">Výběr z portfolia</p>
          <h2 data-reveal className="mt-[14px] text-heading-s text-ink-900 lg:mt-4 lg:max-w-[620px] lg:text-display-l">Za námi stojí skutečné výsledky</h2>
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
