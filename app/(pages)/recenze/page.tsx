import ReviewPhoto from "@/components/reviews/ReviewPhoto";
import PageHero from "@/components/ui/PageHero";
import { plural } from "@/lib/format";
import { pageMetadata } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import type { Review } from "@/sanity/lib/interfaces";
import { REVIEWS_QUERY } from "@/sanity/lib/queries";

export const metadata = pageMetadata({
  title: "Recenze",
  description: "Co o nás říkají klienti, kteří s námi prodali nebo koupili nemovitost.",
  path: "/recenze",
});

export default async function RecenzePage() {
  const reviews = await sanityFetch<Review[]>({ query: REVIEWS_QUERY });

  return (
    <>
      <PageHero crumb="Recenze" title="Recenze" lead="Co říkají lidé, kterým jsme pomohli s prodejem nebo koupí nemovitosti." />

      {/* Hodnocení (30:541) */}
      <section className="bg-surface-50">
        <div className="container-site flex flex-col gap-6 px-6 py-12 lg:flex-row lg:items-center lg:gap-12 lg:px-[120px] lg:py-16">
          <div className="flex flex-col gap-1.5">
            <p className="text-display-xl text-brass-600">4,9</p>
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
      <section className="bg-surface-0">
        <div className="container-site grid gap-5 px-6 py-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-[30px] lg:px-[120px] lg:py-24">
          {reviews.map((r) => (
            <figure key={r._id} data-reveal className="flex flex-col self-start rounded border border-line-200 bg-surface-0 p-8">
              <p aria-label="5 z 5 hvězd" className="text-body-m text-brass-500">
                ★★★★★
              </p>
              <blockquote className="mt-4 text-body-m whitespace-pre-line text-ink-700">{r.review}</blockquote>
              {r.imageUrl && (
                <div className="mt-4">
                  <ReviewPhoto src={r.imageUrl} name={r.clients} />
                </div>
              )}
              <div className="mt-[22px] h-px bg-line-200" />
              <figcaption className="mt-4 flex flex-col gap-1">
                <span className="text-body-s font-semibold text-ink-900">{r.clients}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
