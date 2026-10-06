import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };

// Barvy z Figmy
export const og = {
  navy900: "#042e5e",
  navy950: "#021f40",
  brass500: "#8a7850",
  ink500: "#5c6875",
  ink900: "#10151c",
  surface50: "#f7f6f3",
  onDarkMuted: "#afbdd1",
};

export async function loadOgAssets() {
  const dir = join(process.cwd(), "assets");
  const [regular, semibold, mark] = await Promise.all([
    readFile(join(dir, "fonts/Montserrat-Regular.ttf")),
    readFile(join(dir, "fonts/Montserrat-SemiBold.ttf")),
    readFile(join(dir, "hr-mark.png")),
  ]);
  return {
    fonts: [
      { name: "Montserrat", data: regular, weight: 400 as const, style: "normal" as const },
      { name: "Montserrat", data: semibold, weight: 600 as const, style: "normal" as const },
    ],
    markSrc: `data:image/png;base64,${mark.toString("base64")}`,
  };
}

export function OgLogo({ markSrc }: { markSrc: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse */}
      <img src={markSrc} width={66} height={45} alt="" />
      <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: 3.5, color: og.navy900 }}>HRDINA REALITY</div>
    </div>
  );
}
