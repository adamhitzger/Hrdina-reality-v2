import JsonLd from "@/components/JsonLd";
import ReviewPhoto from "@/components/reviews/ReviewPhoto";
import PageHero from "@/components/ui/PageHero";
import Pagination from "@/components/ui/Pagination";
import CountUp from "@/components/ui/CountUp";
import { pageNumber, plural } from "@/lib/format";
import { pageJsonLd } from "@/lib/json-ld";
import { listingMetadata } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import type { Review } from "@/sanity/lib/interfaces";
import { REVIEWS_QUERY } from "@/sanity/lib/queries";
import heroRecenze from "@/public/images/hero-recenze.jpg";

const TITLE = "Recenze a zkušenosti klientů";
const DESCRIPTION =
  "Zkušenosti klientů, kterým jsme pomohli prodat, koupit nebo pronajmout nemovitost v Havlíčkově Brodě a na Vysočině. Recenze sbíráme po každé zakázce.";

const PER_PAGE = 12;
const PATH = "/recenze";

const getReviews = () => sanityFetch<Review[]>({ query: REVIEWS_QUERY });

export async function generateMetadata({ searchParams }: PageProps<"/recenze">) {
  const [{ strana }, reviews] = await Promise.all([searchParams, getReviews()]);
  const { page } = pageNumber(strana, reviews.length, PER_PAGE);
  return listingMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, page });
}

export default async function RecenzePage({ searchParams }: PageProps<"/recenze">) {
  const [{ strana }, reviews] = await Promise.all([searchParams, getReviews()]);
  const { page, pages } = pageNumber(strana, reviews.length, PER_PAGE);
  const items = reviews.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const pagePath = page > 1 ? `${PATH}?strana=${page}` : PATH;

  return (
    <>
      <JsonLd data={pageJsonLd({ path: pagePath, name: TITLE, description: DESCRIPTION, crumbs: [{ name: "Recenze", path: PATH }] })} />
      <PageHero crumb="Recenze" title="Naše práce očima klientů" lead="Důvěra, která má svůj příběh" image={heroRecenze} />

      {/* Hodnocení (30:541) */}
      <section className="bg-surface-50">
        <div data-reveal className="container-site flex flex-col gap-6 px-6 py-12 lg:flex-row lg:items-center lg:gap-12 lg:px-[120px] lg:py-16">
          <div className="flex flex-col gap-1.5">
            <p className="text-display-xl text-brass-600">
              <CountUp value="4,9" />
            </p>
            <p aria-label="5 z 5 hvězd" className="text-title-m text-brass-500">
              ★★★★★
            </p>
          </div>
          <div className="hidden h-[72px] w-px bg-line-200 lg:block" />
          <div className="flex flex-1 flex-col gap-2">
            <p className="text-title-m text-ink-900">{plural(reviews.length, ["recenze", "recenze", "recenzí"])} od skutečných klientů</p>
            <p className="text-body-m text-ink-500">
              Recenze sbíráme po každé dokončené zakázce. Nepublikujeme výběr — najdete tu všechny.
            </p>
          </div>
        </div>
      </section>

      {/* Recenze — výpis (30:549) */}
      <section id="recenze" className="scroll-mt-24 bg-surface-0">
        <div className="container-site px-6 py-16 lg:px-[120px] lg:py-24">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-[30px]">
            {items.map((r) => (
              <figure key={r._id} data-reveal className="flex flex-col self-start rounded border border-line-200 bg-surface-0 p-8">
                <p aria-label="5 z 5 hvězd" className="text-body-m text-brass-500">
                  ★★★★★
                </p>
                <blockquote className="mt-4 text-body-m whitespace-pre-line text-ink-700">{r.review.length < 250 ? r.review : r.review.substring(0,249) + "..."}</blockquote>
                {r.imageUrl && (
                  <div className="mt-4">
                    <ReviewPhoto src={r.imageUrl} name={r.clients} />
                  </div>
                )}
                <div className="mt-[22px] h-px bg-line-200" />
                <figcaption className="mt-4 flex flex-col gap-1">
                  <span className="text-body-s font-semibold text-ink-900">{r.clients}</span>
                  {r.deal && <span className="text-label-s text-ink-300">{r.deal}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
          <Pagination page={page} pages={pages} basePath={PATH} hash="recenze" />
        </div>
      </section>
    </>
  );
}
