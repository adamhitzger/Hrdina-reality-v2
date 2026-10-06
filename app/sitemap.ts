import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";
import { client } from "@/sanity/lib/client";
import { SITEMAP_POSTS_QUERY, SITEMAP_REALITIES_QUERY } from "@/sanity/lib/queries";

type SitemapReality = {
  slug: string;
  _updatedAt: string;
  imageUrl: string | null;
};

const staticRoutes: { path: string; changeFrequency: "daily" | "weekly" | "monthly"; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/nemovitosti", changeFrequency: "daily", priority: 0.9 },
  { path: "/realizovane-prodeje", changeFrequency: "weekly", priority: 0.7 },
  { path: "/recenze", changeFrequency: "monthly", priority: 0.6 },
  { path: "/o-nas", changeFrequency: "monthly", priority: 0.6 },
  { path: "/kariera", changeFrequency: "monthly", priority: 0.5 },
  { path: "/kontakt", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.6 },
];

// Nové nemovitosti se do sitemapy propíšou nejpozději do hodiny
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const [realities, posts] = await Promise.all([
    client.fetch<SitemapReality[]>(SITEMAP_REALITIES_QUERY, {}, { perspective: "published", next: { revalidate } }),
    client.fetch<SitemapReality[]>(SITEMAP_POSTS_QUERY, {}, { perspective: "published", next: { revalidate } }),
  ]);

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
