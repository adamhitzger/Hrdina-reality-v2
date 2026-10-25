import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import JsonLd from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/json-ld";
import { site, siteUrl } from "@/lib/site";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
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
      className={`${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Před prvním vykreslením, ať prvky pro ScrollReveal neproblikají; bez JS zůstanou vidět */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('reveal-ready')" }} />
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
