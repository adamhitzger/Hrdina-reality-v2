import { stegaClean } from "next-sanity";

import { formatArea, formatPrice, formatSpecs } from "./format";

export type Badge = { label: string; tone: "brass" | "navy" };

export interface PropertyListItem {
  name: string;
  slug: string;
  price?: string;
  status?: string;
  type?: string;
  area?: number;
  city?: string;
  imageUrl?: string;
  _createdAt?: string;
}

const NEW_DAYS = 30;

export function propertyBadge(p: Pick<PropertyListItem, "status" | "_createdAt">): Badge | undefined {
  // V draft módu nese stega v řetězcích neviditelné znaky, porovnává se proto vyčištěná hodnota
  const status = stegaClean(p.status);
  if (status === "Prodáno") return { label: "Prodáno", tone: "navy" };
  if (status === "Pronajato") return { label: "Pronajato", tone: "navy" };
  if (status === "Rezervace") return { label: "Rezervováno", tone: "navy" };
  if (status === "K pronájmu") return { label: "Pronájem", tone: "brass" };
  if (p._createdAt && Date.now() - new Date(p._createdAt).getTime() < NEW_DAYS * 864e5) {
    return { label: "Novinka", tone: "brass" };
  }
  return undefined;
}

export function propertyCardProps(p: PropertyListItem) {
  return {
    href: `/nemovitosti/${p.slug}`,
    imageUrl: p.imageUrl,
    title: formatPrice(p.price),
    name: p.name,
    specs: formatSpecs(p.type, formatArea(p.area), p.city),
    badge: propertyBadge(p),
  };
}
