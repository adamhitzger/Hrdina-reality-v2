import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import JsonLd from "@/components/JsonLd";
import ArticleCard from "@/components/blog/ArticleCard";
import ArticleSections from "@/components/blog/ArticleSections";
import { button } from "@/components/ui/button";
import PageHero from "@/components/ui/PageHero";
import { headingCase, postAuthor, postExcerpt, postMeta } from "@/lib/blog";
import { breadcrumbJsonLd, postJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/site";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import type { Article, ArticleCard as ArticleCardData } from "@/sanity/lib/interfaces";
import { LATEST_POSTS_QUERY, POST_QUERY, POST_SLUGS_QUERY } from "@/sanity/lib/queries";

// Sdílí výsledek mezi generateMetadata a stránkou
const getPost = cache((slug: string) => sanityFetch<Article | null>({ query: POST_QUERY, params: { slug } }));

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(POST_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const title = headingCase(post.title);
  // Titulní fotku ořízne Sanity na 1200×630, jinak výchozí OG obrázek webu
  const image = post.imageUrl ? { url: `${post.imageUrl}?w=1200&h=630&fit=crop&fm=jpg&q=80`, width: 1200, height: 630, alt: title } : undefined;
  const base = pageMetadata({ title, description: postExcerpt(post, 160), path: `/blog/${slug}`, defaultImage: !image });
  return {
    ...base,
    authors: [{ name: postAuthor() }],
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post._createdAt,
      modifiedTime: post._updatedAt,
      authors: [postAuthor()],
      ...(image ? { images: [image] } : {}),
    },
    twitter: { ...base.twitter, ...(image ? { images: [image.url] } : {}) },
  };
}

export default async function ClanekPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const [post, latest] = await Promise.all([getPost(slug), sanityFetch<ArticleCardData[]>({ query: LATEST_POSTS_QUERY })]);
  if (!post) notFound();

  const title = headingCase(post.heading || post.title);
  const other = latest.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <JsonLd data={postJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Hrdina Reality", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: headingCase(post.title), path: `/blog/${slug}` },
        ])}
      />

      <PageHero crumb="Blog" crumbHref="/blog" title={title} lead={`${postMeta(post)} · ${postAuthor()}`} image={post.imageUrl} />

      <article className="bg-surface-0">
        <div className="container-site px-6 py-16 lg:px-[120px] lg:py-24">
          <ArticleSections sections={post.sections ?? []} />
        </div>
      </article>

      {other.length > 0 && (
        <section className="bg-surface-50">
          <div className="container-site px-6 py-16 lg:px-[120px] lg:py-24">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-heading-s text-ink-900">Další články</h2>
              <Link href="/blog" className={`${button.ghost} max-lg:hidden`}>
                Všechny články
              </Link>
            </div>
            <div className="mt-8 grid gap-10 md:grid-cols-2 lg:mt-10 lg:gap-[30px]">
              {other.map((p) => (
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
          </div>
        </section>
      )}
    </>
  );
}
