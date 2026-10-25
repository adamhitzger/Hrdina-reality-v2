import type { Article, ArticleCard, OpenPosition, Reality, Staff } from "@/sanity/lib/interfaces";

import { headingCase, postExcerpt } from "./blog";

import { defaultAuthor, site, siteUrl } from "./site";

export const organizationId = `${siteUrl}/#organization`;

export const websiteId = `${siteUrl}/#website`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": organizationId,
        name: site.name,
        legalName: site.legal.company,
        url: siteUrl,
        logo: { "@type": "ImageObject", url: `${siteUrl}${site.logo}`, width: 1428, height: 966 },
        image: `${siteUrl}/opengraph-image`,
        description: site.description,
        telephone: site.phone,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        geo: { "@type": "GeoCoordinates", ...site.geo },
        hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.address.street}, ${site.address.city}`)}`,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "17:00",
        },
        areaServed: [
          { "@type": "City", name: "Havlíčkův Brod" },
          { "@type": "AdministrativeArea", name: "Kraj Vysočina" },
        ],
        founder: { "@type": "Person", name: site.founder },
        taxID: site.legal.ico,
        vatID: site.legal.dic,
        sameAs: [site.social.facebook, site.social.instagram],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: site.name,
        inLanguage: "cs-CZ",
        publisher: { "@id": organizationId },
      },
    ],
  };
}

type Crumb = { name: string; path: string };

// Stránka webu (WebPage / CollectionPage / AboutPage / ContactPage) + drobečková navigace + další uzly v jednom @graph.
// Drobečky začínají vždy domovskou stránkou.
export function pageJsonLd({
  type = "WebPage",
  path,
  name,
  description,
  crumbs = [],
  mainEntity,
  extra = [],
}: {
  type?: "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage";
  path: string;
  name: string;
  description: string;
  crumbs?: Crumb[];
  mainEntity?: { "@id": string };
  extra?: Record<string, unknown>[];
}) {
  const url = `${siteUrl}${path}`;
  const breadcrumb = crumbs.length > 0 ? { ...breadcrumbList([{ name: site.name, path: "/" }, ...crumbs]), "@id": `${url}#breadcrumb` } : null;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "cs-CZ",
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        ...(breadcrumb ? { breadcrumb: { "@id": breadcrumb["@id"] } } : {}),
        ...(mainEntity ? { mainEntity } : {}),
      },
      ...(breadcrumb ? [breadcrumb] : []),
      ...extra,
    ],
  };
}

function breadcrumbList(items: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function breadcrumbJsonLd(items: Crumb[]) {
  return { "@context": "https://schema.org", ...breadcrumbList(items) };
}

// FAQ akordeon (homepage)
export function faqJsonLd(items: { q: string; a: string }[], id: string) {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

// Výpis nemovitostí jako ItemList (Nemovitosti, Realizované prodeje)
export function itemListJsonLd(items: { slug: string; name: string }[], id: string, offset = 0) {
  return {
    "@type": "ItemList",
    "@id": id,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: offset + i + 1,
      url: `${siteUrl}/nemovitosti/${item.slug}`,
      name: item.name.trim(),
    })),
  };
}

// Makléři na O nás
export function staffJsonLd(staff: Staff[], contacts: Record<string, { phone?: string; email?: string }>) {
  return staff.map((s) => ({
    "@type": "Person",
    "@id": `${siteUrl}/o-nas#${slugify(s.name)}`,
    name: s.name,
    ...(s.position ? { jobTitle: s.position } : {}),
    ...(s.staffUrl ? { image: s.staffUrl } : {}),
    ...(s.url ? { sameAs: [s.url] } : {}),
    ...(contacts[s.name]?.phone ? { telephone: contacts[s.name].phone } : {}),
    ...(contacts[s.name]?.email ? { email: contacts[s.name].email } : {}),
    worksFor: { "@id": organizationId },
  }));
}

// Otevřené pozice na Kariéře. Platnost 3 měsíce od poslední úpravy v Sanity, ať v Google nevisí obsazené pozice.
export function jobPostingsJsonLd(positions: OpenPosition[]) {
  return positions.filter((p) => p.jobPosting !== false).map((p) => {
    const posted = new Date(p.datePosted ?? p._updatedAt ?? p._createdAt);
    const validThrough = new Date(posted);
    validThrough.setMonth(validThrough.getMonth() + 3);
    return {
      "@type": "JobPosting",
      "@id": `${siteUrl}/kariera#${p.slug}`,
      title: p.title,
      description: [p.text, p.tag && `Forma spolupráce: ${p.tag}.`].filter(Boolean).join(" "),
      datePosted: posted.toISOString().slice(0, 10),
      ...(p.employmentType?.length ? { employmentType: p.employmentType } : {}),
      validThrough: validThrough.toISOString(),
      url: `${siteUrl}/kariera?pozice=${p.slug}`,
      directApply: true,
      // Bez @id kanceláře: ta má typ RealEstateAgent a stejné @id s jiným typem validátory hlásí jako konflikt
      hiringOrganization: { "@type": "Organization", name: site.name, sameAs: siteUrl, logo: `${siteUrl}${site.logo}` },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          postalCode: site.address.postalCode,
          addressRegion: "Kraj Vysočina",
          addressCountry: site.address.country,
        },
      },
    };
  });
}

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const residenceType: Record<string, string> = {
  Byt: "Apartment",
  "Rodinný dům": "SingleFamilyResidence",
  Chata: "House",
  Chalupa: "House",
  Pozemek: "Place",
};

// „4 950 000 Kč“ → 4950000; texty typu „Info v RK“ → undefined
function parsePrice(price?: string) {
  const digits = price?.replace(/[^\d]/g, "");
  return digits ? Number(digits) : undefined;
}

export function realityJsonLd(r: Reality) {
  const url = `${siteUrl}/nemovitosti/${r.slug}`;
  const price = parsePrice(r.price);
  const images = [...new Set([r.imageUrl, ...(r.galleryUrls ?? [])].filter(Boolean))].slice(0, 10);

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${url}#listing`,
    url,
    name: r.name.trim(),
    description: r.overview,
    image: images,
    datePosted: r._createdAt,
    dateModified: r._updatedAt,
    offers: {
      "@type": "Offer",
      ...(price ? { price, priceCurrency: "CZK" } : {}),
      businessFunction:
        r.status === "K pronájmu" ? "http://purl.org/goodrelations/v1#LeaseOut" : "http://purl.org/goodrelations/v1#Sell",
      availability: r.status === "Prodáno" ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      offeredBy: { "@id": organizationId },
    },
    about: {
      "@type": residenceType[r.type] ?? "Accommodation",
      name: r.name.trim(),
      address: {
        "@type": "PostalAddress",
        streetAddress: [r.street, r.street_number].filter(Boolean).join(" ") || undefined,
        addressLocality: r.city,
        postalCode: r.postcode,
        addressCountry: "CZ",
      },
      ...(r.geopoint ? { geo: { "@type": "GeoCoordinates", latitude: r.geopoint.lat, longitude: r.geopoint.lng } } : {}),
      ...(r.area ? { floorSize: { "@type": "QuantitativeValue", value: r.area, unitCode: "MTK" } } : {}),
      ...(r.features?.length
        ? { amenityFeature: r.features.map((f) => ({ "@type": "LocationFeatureSpecification", name: f.trim(), value: true })) }
        : {}),
    },
  };
}

export const blogId = `${siteUrl}/blog#blog`;

function postSummary(p: ArticleCard) {
  const url = `${siteUrl}/blog/${p.slug}`;
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    headline: headingCase(p.title),
    description: postExcerpt(p, 160),
    ...(p.imageUrl ? { image: p.imageUrl } : {}),
    datePublished: p._createdAt,
    author: { "@type": "Person", name: defaultAuthor },
  };
}

export function blogJsonLd(posts: ArticleCard[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": blogId,
    url: `${siteUrl}/blog`,
    name: `Blog – ${site.name}`,
    inLanguage: "cs-CZ",
    publisher: { "@id": organizationId },
    blogPost: posts.map(postSummary),
  };
}

export function postJsonLd(p: Article) {
  const url = `${siteUrl}/blog/${p.slug}`;
  return {
    "@context": "https://schema.org",
    ...postSummary(p),
    mainEntityOfPage: url,
    dateModified: p._updatedAt,
    inLanguage: "cs-CZ",
    ...(p.words ? { wordCount: p.words } : {}),
    author: {
      "@type": "Person",
      name: defaultAuthor,
      jobTitle: "Majitel kanceláře, realitní makléř",
      worksFor: { "@id": organizationId },
    },
    publisher: { "@id": organizationId },
    isPartOf: { "@id": blogId },
  };
}
