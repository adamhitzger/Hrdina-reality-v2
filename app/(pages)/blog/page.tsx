import JsonLd from "@/components/JsonLd";
import ArticleCard from "@/components/blog/ArticleCard";
import PageHero from "@/components/ui/PageHero";
import { headingCase, postAuthor, postCount, postExcerpt, postMeta } from "@/lib/blog";
import { blogJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import type { ArticleCard as ArticleCardData } from "@/sanity/lib/interfaces";
import { POSTS_QUERY } from "@/sanity/lib/queries";

export const metadata = pageMetadata({
  title: "Blog – rady k prodeji, koupi a pronájmu",
  description: "Průvodci od Hrdina Reality: jak prodat nemovitost, najít nový domov, pronajmout byt a investovat do nemovitostí na Vysočině.",
  path: "/blog",
});

// Figma blog nemá – výpis skládá karty článků z homepage (Rady a novinky). Články jsou Podstránky ze Sanity.
export default async function BlogPage() {
  const posts = await sanityFetch<ArticleCardData[]>({ query: POSTS_QUERY });

  return (
    <>
      <JsonLd data={blogJsonLd(posts)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Hrdina Reality", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <PageHero crumb="Blog" title="Rady a novinky" lead="Co byste měli vědět, než prodáte, koupíte nebo pronajmete nemovitost." />

      <section className="bg-surface-0">
        <div className="container-site px-6 py-16 lg:px-[120px] lg:py-24">
          <p className="mb-8 text-label-s text-ink-500 lg:mb-12">{postCount(posts.length)}</p>
          {posts.length > 0 && (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-[30px] lg:gap-y-14">
              {posts.map((p) => (
                <ArticleCard
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  image={p.imageUrl}
                  meta={postMeta(p)}
                  title={headingCase(p.title)}
                  text={postExcerpt(p)}
                  author={postAuthor()}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
