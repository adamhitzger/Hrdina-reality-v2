import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import JsonLd from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/json-ld";
import { site, siteUrl } from "@/lib/site";

// Fonty jsou v repu (app/fonts, OFL), ne z next/font/google: na Vercelu se Google font při buildu
// občas nestáhne a Turbopack pak spadne na „Can't resolve '@vercel/turbopack-next/internal/font/google/font'“.
// Soubory jsou z github.com/google/fonts zmenšené na latin + latin-ext (pyftsubset), čeština je kompletní.
const montserrat = localFont({
  variable: "--font-montserrat",
  src: [{ path: "./fonts/Montserrat-Variable.woff2", weight: "100 900", style: "normal" }],
});

// Nadpisy (Figma: Inria Serif Light / Regular / Bold), kurzíva jen na /pruvodce
const inriaSerif = localFont({
  variable: "--font-inria-serif",
  src: [
    { path: "./fonts/InriaSerif-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/InriaSerif-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/InriaSerif-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/InriaSerif-Bold.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Realitní kancelář Havlíčkův Brod`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "realitní kancelář Havlíčkův Brod",
    "reality Havlíčkův Brod",
    "reality Vysočina",
    "prodej nemovitosti",
    "pronájem bytu",
    "rodinné domy na prodej",
    "byty na prodej",
    "chaty a chalupy",
    "pozemky",
    "odhad ceny nemovitosti",
    "realitní makléř",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.legal.company,
  category: "real estate",
  referrer: "origin-when-cross-origin",
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
  // Jen limity náhledů. Index/follow je výchozí a na 404 by se tlouklo s noindex, který Next přidá sám.
  robots: {
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: { "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  appleWebApp: { capable: true, title: site.name, statusBarStyle: "default" },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="cs"
      className={`${montserrat.variable} ${inriaSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* uc.js si před sebe vloží vlastní skript (consentconfig), React by ho při hydrataci spároval s tímhle tagem */}
        <script suppressHydrationWarning id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="b1842e40-87b3-4a93-a1c0-55948edf993f" data-blockingmode="auto" type="text/javascript"></script>
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationJsonLd()} />
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            className: "!font-sans !text-body-s !rounded !shadow-md",
            success: { iconTheme: { primary: "#042e5e", secondary: "#fff" } },
            error: { iconTheme: { primary: "#8a7850", secondary: "#fff" } },
          }}
        />
      </body>
    </html>
  );
}
