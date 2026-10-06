import Image from "next/image";
import Link from "next/link";

import type { Badge } from "@/lib/property";

type Props = {
  href: string;
  imageUrl?: string;
  title: string;
  name: string;
  specs?: string;
  badge?: Badge;
  /** Ztmavení fotky u prodaných (Figma: Sold karta) */
  dimmed?: boolean;
  className?: string;
};

// Figma: Card / Property (18:59)
export default function PropertyCard({ href, imageUrl, title, name, specs, badge, dimmed, className = "" }: Props) {
  return (
    <Link href={href} className={`group flex flex-col overflow-hidden rounded bg-surface-0 ${className}`}>
      <div className="relative h-[272px] overflow-hidden bg-surface-100">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(min-width: 1024px) 380px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        {dimmed && <div aria-hidden className="absolute inset-0 bg-navy-950/28" />}
        {badge && (
          <span
            className={`absolute top-4 left-4 rounded-[3px] px-3 py-[7px] text-label-s text-surface-0 ${
              badge.tone === "navy" ? "bg-navy-900" : "bg-brass-500"
            }`}
          >
            {badge.label}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 px-6 pt-6 pb-[26px]">
        <p className="text-heading-s text-navy-900">{title}</p>
        <p className="text-body-m text-ink-700">{name}</p>
        {specs && <p className="text-body-s text-ink-500">{specs}</p>}
      </div>
    </Link>
  );
}
