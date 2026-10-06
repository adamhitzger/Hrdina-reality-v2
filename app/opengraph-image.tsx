import { ImageResponse } from "next/og";

import { loadOgAssets, og, OgLogo, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name} – realitní kancelář Havlíčkův Brod`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  const { fonts, markSrc } = await loadOgAssets();

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: og.surface50, fontFamily: "Montserrat" }}>
        <div style={{ height: 10, background: og.brass500 }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 88px" }}>
          <OgLogo markSrc={markSrc} />
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: 2.6, color: og.brass500 }}>REALITNÍ KANCELÁŘ · HAVLÍČKŮV BROD</div>
            <div style={{ fontSize: 68, fontWeight: 600, lineHeight: 1.1, letterSpacing: -1.5, color: og.ink900, maxWidth: 900 }}>
              Prodej a pronájem nemovitostí na Vysočině
            </div>
          </div>
          <div style={{ display: "flex", gap: 40, fontSize: 24, color: og.ink500 }}>
            <div>{site.phone}</div>
            <div>{site.address.street}</div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
