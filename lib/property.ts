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
  if (p.status === "Prodáno") return { label: "Prodáno", tone: "navy" };
  if (p.status === "K pronájmu") return { label: "Pronájem", tone: "brass" };
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
