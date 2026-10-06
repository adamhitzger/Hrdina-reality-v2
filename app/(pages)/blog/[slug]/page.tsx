import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import JsonLd from "@/components/JsonLd";
import ArticleCard from "@/components/blog/ArticleCard";
import { button } from "@/components/ui/button";
import RichText from "@/components/ui/RichText";
import { formatPostDate, postAuthor, postMeta } from "@/lib/blog";
import { breadcrumbJsonLd, postJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/site";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import type { Post, PostCard } from "@/sanity/lib/interfaces";
import { LATEST_POSTS_QUERY, POST_QUERY, POST_SLUGS_QUERY } from "@/sanity/lib/queries";
import photoOffice from "@/public/images/photo-office.jpg";

// Sdílí výsledek mezi generateMetadata a stránkou
const getPost = cache((slug: string) => sanityFetch<Post | null>({ query: POST_QUERY, params: { slug } }));

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(POST_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  // Vlastní fotka článku ořízne Sanity na 1200×630, jinak výchozí OG obrázek webu
  const image = post.imageUrl
    ? { url: `${post.imageUrl}?w=1200&h=630&fit=crop&fm=jpg&q=80`, width: 1200, height: 630, alt: post.title }
    : undefined;
  const base = pageMetadata({ title: post.title, description: post.excerpt || post.title, path: `/blog/${slug}`, defaultImage: !image });
  return {
    ...base,
    authors: [{ name: postAuthor(post) }],
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: [postAuthor(post)],
      ...(post.category ? { section: post.category } : {}),
      ...(image ? { images: [image] } : {}),
    },
    twitter: { ...base.twitter, ...(image ? { images: [image.url] } : {}) },
  };
}

export default async function ClanekPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const [post, latest] = await Promise.all([getPost(slug), sanityFetch<PostCard[]>({ query: LATEST_POSTS_QUERY })]);
  if (!post) notFound();

  const author = postAuthor(post);
  // Bez autora v Sanity patří článek Lukášovi, fotka je z kanceláře
  const authorImage = post.authorImageUrl ?? (post.author ? undefined : photoOffice);
  const authorPosition = post.authorPosition ?? (post.author ? undefined : "Majitel kanceláře, realitní makléř");
  const other = latest.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <JsonLd data={postJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Hrdina Reality", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ])}
      />

      <article className="bg-surface-0">
        <header className="container-site px-6 pt-10 lg:px-[120px] lg:pt-16">
          <div className="mx-auto max-w-[760px]">
            <nav aria-label="Drobečková navigace" className="text-label-s text-brass-500">
              <Link href="/" className="hover:text-brass-600">
                Domů
              </Link>
              <span className="whitespace-pre">{"  /  "}</span>
              <Link href="/blog" className="hover:text-brass-600">
                Blog
              </Link>
            </nav>
            <p className="mt-8 text-label-s text-brass-500">{postMeta(post)}</p>
            <h1 className="mt-4 text-heading-m text-ink-900 lg:text-display-l">{post.title}</h1>
            {post.excerpt && <p className="mt-5 text-body-l text-ink-500">{post.excerpt}</p>}
            <div className="mt-8 flex items-center gap-[14px] border-y border-line-200 py-5">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-surface-100">
                {authorImage && <Image src={authorImage} alt={author} fill sizes="48px" className="object-cover" />}
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-title-s text-ink-900">{author}</p>
                <p className="text-body-s text-ink-500">
                  {[authorPosition, formatPostDate(post.publishedAt)].filter(Boolean).join(" · ")}
                </p>
              </div>
            </div>
          </div>
        </header>

        {post.imageUrl && (
          <div className="container-site px-6 pt-10 lg:px-[120px] lg:pt-12">
            <div className="relative mx-auto aspect-[3/2] max-w-[1000px] overflow-hidden rounded bg-surface-100">
              <Image src={post.imageUrl} alt="" fill priority sizes="(min-width: 1024px) 1000px, 100vw" className="object-cover" />
            </div>
          </div>
        )}

        <div className="container-site px-6 py-12 lg:px-[120px] lg:py-16">
          <div className="mx-auto max-w-[760px] [&_p]:text-ink-700">{post.body && <RichText value={post.body} />}</div>
        </div>
      </article>

      {other.length > 0 && (
        <section className="bg-surface-50">
          <div className="container-site px-6 py-16 lg:px-[120px] lg:py-24">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-heading-s text-ink-900">Další články</h2>
              <Link href="/blog" className={`${button.ghost} hidden lg:inline-flex`}>
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
                  title={p.title}
                  text={p.excerpt}
                  author={postAuthor(p)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
