import Link from "next/link";

import Bullet from "@/components/ui/Bullet";
import { linkArrow } from "@/components/ui/button";
import { services } from "@/lib/content";

// Figma: Služby (27:369 na O nás, 64:977 na homepage – s brass linkou nahoře)
export default function ServiceCards({ variant }: { variant: "home" | "about" }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3 lg:gap-[30px]">
      {services.map((s, i) => (
        <article
          key={s.title}
          data-reveal
          className={`flex flex-col rounded bg-surface-50 px-6 py-8 lg:px-8 lg:py-9 ${variant === "home" ? "border-t-2 border-brass-500" : ""}`}
        >
          <p className="text-label-s text-brass-500">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-[14px] text-heading-s text-ink-900">{s.title}</h3>
          <p className="mt-3 text-body-m text-ink-500">{s.text}</p>
          <ul className={`mt-6 flex flex-col ${variant === "home" ? "gap-0 [&>li]:pb-2.5" : "gap-2.5"}`}>
            {s.bullets.map((b) => (
              <Bullet key={b}>{b}</Bullet>
            ))}
          </ul>
          {variant === "about" && (
            <Link href="/kontakt" className={`${linkArrow} mt-[26px]`}>
              {"Zjistit více  →"}
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
