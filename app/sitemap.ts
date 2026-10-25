import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";
import { client } from "@/sanity/lib/client";
import { SITEMAP_DATES_QUERY, SITEMAP_POSTS_QUERY, SITEMAP_REALITIES_QUERY } from "@/sanity/lib/queries";

type SitemapReality = {
  slug: string;
  _updatedAt: string;
  imageUrl: string | null;
};

type SitemapDates = Partial<Record<"active" | "sold" | "reviews" | "staff" | "positions" | "posts", string | null>>;

// Poslední úprava textů v kódu (lib/content.ts, stránky). Při větší změně textů posunout.
const CONTENT_UPDATED = "2026-10-24";

const staticRoutes: {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
  // Které dokumenty ze Sanity stránka vypisuje
  sources?: (keyof SitemapDates)[];
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1, sources: ["active", "sold", "posts"] },
  { path: "/nemovitosti", changeFrequency: "daily", priority: 0.9, sources: ["active"] },
  { path: "/realizovane-prodeje", changeFrequency: "weekly", priority: 0.7, sources: ["sold"] },
  { path: "/recenze", changeFrequency: "monthly", priority: 0.6, sources: ["reviews"] },
  { path: "/o-nas", changeFrequency: "monthly", priority: 0.6, sources: ["staff"] },
  { path: "/kariera", changeFrequency: "monthly", priority: 0.5, sources: ["positions"] },
  { path: "/kontakt", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.6, sources: ["posts"] },
  { path: "/ochrana-osobnich-udaju", changeFrequency: "monthly", priority: 0.2 },
];

function latest(...dates: (string | null | undefined)[]) {
  return new Date(Math.max(...dates.filter(Boolean).map((d) => new Date(d!).getTime())));
}

// Nové nemovitosti se do sitemapy propíšou nejpozději do hodiny
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [dates, realities, posts] = await Promise.all([
    client.fetch<SitemapDates>(SITEMAP_DATES_QUERY, {}, { perspective: "published", next: { revalidate } }),
    client.fetch<SitemapReality[]>(SITEMAP_REALITIES_QUERY, {}, { perspective: "published", next: { revalidate } }),
    client.fetch<SitemapReality[]>(SITEMAP_POSTS_QUERY, {}, { perspective: "published", next: { revalidate } }),
  ]);

  const pages: MetadataRoute.Sitemap = staticRoutes.map(({ path, changeFrequency, priority, sources = [] }) => ({
    url: `${siteUrl}${path}`,
    lastModified: latest(CONTENT_UPDATED, ...sources.map((k) => dates[k])),
    changeFrequency,
    priority,
  }));

  const realityPages: MetadataRoute.Sitemap = realities.map((r) => ({
    url: `${siteUrl}/nemovitosti/${encodeURIComponent(r.slug)}`,
    lastModified: new Date(r._updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
    ...(r.imageUrl ? { images: [r.imageUrl] } : {}),
  }));

  const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${siteUrl}/blog/${encodeURIComponent(p.slug)}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: "monthly",
    priority: 0.5,
    ...(p.imageUrl ? { images: [p.imageUrl] } : {}),
  }));

  return [...pages, ...realityPages, ...postPages];
}
