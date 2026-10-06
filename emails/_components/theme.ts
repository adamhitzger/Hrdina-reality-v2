import type { CSSProperties } from "react";

// Tokeny z Figmy (Hrdina reality v3523 → Foundations)
export const color = {
  navy950: "#021f40",
  navy900: "#042e5e",
  brass600: "#6f5f3e",
  brass500: "#8a7850",
  ink900: "#10151c",
  ink700: "#2e3944",
  ink500: "#5c6875",
  surface0: "#ffffff",
  surface50: "#f7f6f3",
  surface100: "#eeebe4",
  line200: "#e2dfd8",
  lineDark: "#1b3a62",
  onDarkMuted: "#afbdd1",
};

export const fontFamily = "Montserrat, 'Helvetica Neue', Helvetica, Arial, sans-serif";

const base: CSSProperties = { fontFamily, margin: 0 };

// Text styly z Figmy
export const type = {
  headingS: { ...base, fontSize: 24, lineHeight: "32px", fontWeight: 600, letterSpacing: "-0.3px" },
  titleM: { ...base, fontSize: 20, lineHeight: "28px", fontWeight: 600, letterSpacing: "-0.2px" },
  titleS: { ...base, fontSize: 17, lineHeight: "24px", fontWeight: 600 },
  bodyM: { ...base, fontSize: 16, lineHeight: "26px", fontWeight: 400 },
  bodyS: { ...base, fontSize: 14, lineHeight: "22px", fontWeight: 400 },
  labelS: { ...base, fontSize: 12, lineHeight: "16px", fontWeight: 600, letterSpacing: "1.4px", textTransform: "uppercase" },
  buttonM: { ...base, fontSize: 15, lineHeight: "20px", fontWeight: 600, letterSpacing: "0.2px" },
} satisfies Record<string, CSSProperties>;
