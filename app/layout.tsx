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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: site.name,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
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
