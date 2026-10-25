import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://hrdinareality.cz").replace(/\/$/, "");

// Zobrazí se u článku nebo nemovitosti, když v Sanity není vyplněný autor
export const defaultAuthor = "Lukáš Hrdina";

export const site = {
  name: "Hrdina Reality",
  description:
    "Realitní kancelář Hrdina Reality z Havlíčkova Brodu. Prodej a pronájem bytů, rodinných domů, chat, chalup a pozemků na Vysočině.",
  phone: "+420 773 498 424",
  email: "hrdinareality@gmail.com",
  address: {
    street: "Havlíčkovo náměstí 56",
    city: "Havlíčkův Brod",
    postalCode: "580 01",
    country: "CZ",
  },
  openingHours: "Mo-Fr 09:00-17:00",
  // Havlíčkovo náměstí 56 podle OpenStreetMap (ověřeno 24. 10. 2026)
  geo: { latitude: 49.6066832, longitude: 15.5786727 },
  logo: "/images/hr-mark.png",
  founder: "Lukáš Hrdina",
  social: {
    facebook: "https://www.facebook.com/HrdinaReality/",
    instagram: "https://www.instagram.com/hrdina_reality/",
  },
  // Provozovatel webu a správce osobních údajů (ARES, ověřeno 6. 10. 2026)
  legal: {
    company: "Hrdina Group s.r.o.",
    ico: "09617957",
    dic: "CZ09617957",
    seat: "U schodů 122/5, Hrdlořezy, 190 00 Praha 9",
    register: "zapsaná v obchodním rejstříku vedeném Městským soudem v Praze, oddíl C, vložka 422219",
    privacyEmail: "lukas.hrdina@hrdinareality.cz",
  },
  themeColor: "#042e5e",
  backgroundColor: "#f7f6f3",
};

// Výchozí OG obrázek z app/opengraph-image.tsx. Vlastní openGraph v podstránce by ho jinak přepsal.
// Segmenty s vlastním opengraph-image.tsx (detail nemovitosti) volají pageMetadata s defaultImage: false.
const defaultOgImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} – realitní kancelář Havlíčkův Brod` };

// Metadata podstránky – canonical, OG a Twitter
export function pageMetadata({
  title,
  description,
  path,
  defaultImage = true,
}: {
  title: string;
  description: string;
  path: string;
  defaultImage?: boolean;
}): Metadata {
  // klíč `images` musí úplně chybět, jinak přebije opengraph-image.tsx segmentu
  const images = defaultImage ? { images: [defaultOgImage] } : {};
  // Názvy ze Sanity občas končí mezerou
  title = title.trim();
  description = description.trim();
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "cs_CZ",
      siteName: site.name,
      url: path,
      title,
      description,
      ...images,
    },
    twitter: { card: "summary_large_image", ...images },
  };
}

// Výpis se stránkováním přes ?strana=N. Další strany mají vlastní canonical i titulek, jinak by je Google bral jako kopii první.
export function listingMetadata({ title, description, path, page }: { title: string; description: string; path: string; page: number }) {
  return pageMetadata({
    title: page > 1 ? `${title} – strana ${page}` : title,
    description,
    path: page > 1 ? `${path}?strana=${page}` : path,
  });
}
