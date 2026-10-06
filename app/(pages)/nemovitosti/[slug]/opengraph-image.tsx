import { ImageResponse } from "next/og";

import { loadOgAssets, og, OgLogo, ogSize } from "@/lib/og";
import { client } from "@/sanity/lib/client";
import type { Reality } from "@/sanity/lib/interfaces";
import { REALITY_QUERY, REALITY_SLUGS_QUERY } from "@/sanity/lib/queries";

export const alt = "Nemovitost – Hrdina Reality";
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(REALITY_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [{ fonts, markSrc }, reality] = await Promise.all([
    loadOgAssets(),
    client.fetch<Reality | null>(REALITY_QUERY, { slug }, { perspective: "published" }),
  ]);

  const photo = reality?.imageUrl ? `${reality.imageUrl}?w=560&h=630&fit=crop&fm=jpg&q=80` : null;
  const specs = [reality?.type, reality?.area && `${reality.area} m²`, reality?.city].filter(Boolean).join(" · ");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: og.surface50, fontFamily: "Montserrat" }}>
        {photo && (
          <img src={photo} width={560} height={630} alt="" style={{ objectFit: "cover" }} />
        )}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 64px", borderTop: `10px solid ${og.brass500}` }}>
          <OgLogo markSrc={markSrc} />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {reality?.status && (
              <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: 2.4, color: og.brass500 }}>{reality.status.toUpperCase()}</div>
            )}
            <div style={{ fontSize: 48, fontWeight: 600, lineHeight: 1.15, letterSpacing: -1, color: og.ink900 }}>
              {reality?.name ?? "Nemovitost"}
            </div>
            {specs && <div style={{ fontSize: 24, color: og.ink500 }}>{specs}</div>}
          </div>
          {reality?.price && <div style={{ fontSize: 40, fontWeight: 600, color: og.navy900 }}>{reality.price}</div>}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
