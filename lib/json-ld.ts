import type { Post, PostCard, Reality } from "@/sanity/lib/interfaces";

import { defaultAuthor, site, siteUrl } from "./site";

export const organizationId = `${siteUrl}/#organization`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": organizationId,
        name: site.name,
        url: siteUrl,
        logo: `${siteUrl}/icon-512.png`,
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
        openingHours: site.openingHours,
        areaServed: "Kraj Vysočina",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: site.name,
        inLanguage: "cs-CZ",
        publisher: { "@id": organizationId },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
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
    name: r.name,
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
      name: r.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: [r.street, r.street_number].filter(Boolean).join(" ") || undefined,
        addressLocality: r.city,
        postalCode: r.postcode,
        addressCountry: "CZ",
      },
      ...(r.geopoint ? { geo: { "@type": "GeoCoordinates", latitude: r.geopoint.lat, longitude: r.geopoint.lng } } : {}),
      ...(r.area ? { floorSize: { "@type": "QuantitativeValue", value: r.area, unitCode: "MTK" } } : {}),
    },
  };
}

export const blogId = `${siteUrl}/blog#blog`;

function postSummary(p: PostCard) {
  const url = `${siteUrl}/blog/${p.slug}`;
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    headline: p.title,
    description: p.excerpt,
    ...(p.imageUrl ? { image: p.imageUrl } : {}),
    datePublished: p.publishedAt,
    author: { "@type": "Person", name: p.author ?? defaultAuthor },
  };
}

export function blogJsonLd(posts: PostCard[]) {
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

export function postJsonLd(p: Post) {
  const url = `${siteUrl}/blog/${p.slug}`;
  return {
    "@context": "https://schema.org",
    ...postSummary(p),
    mainEntityOfPage: url,
    dateModified: p._updatedAt,
    inLanguage: "cs-CZ",
    ...(p.category ? { articleSection: p.category } : {}),
    ...(p.words ? { wordCount: p.words } : {}),
    author: {
      "@type": "Person",
      name: p.author ?? defaultAuthor,
      ...(p.authorPosition ? { jobTitle: p.authorPosition } : {}),
      worksFor: { "@id": organizationId },
    },
    publisher: { "@id": organizationId },
    isPartOf: { "@id": blogId },
  };
}
