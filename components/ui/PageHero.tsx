import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import heroImage from "@/public/images/hero-home.jpg";

// Figma: Page hero / Desktop (20:122) a Page hero / Mobile (34:676)
export default function PageHero({
  title,
  lead,
  crumb,
  crumbHref,
  image = heroImage,
}: {
  title: string;
  lead: string;
  crumb: string;
  /** Odkaz drobečku, když stránka leží o úroveň níž (článek → Blog) */
  crumbHref?: string;
  /** Statický import, nebo URL fotky ze Sanity */
  image?: StaticImageData | string;
}) {
  return (
    <section className="relative flex min-h-[300px] items-center overflow-hidden py-14 lg:min-h-[400px] lg:py-20">
      <Image src={image} alt="" fill priority sizes="(max-width: 767px) 140vw, 100vw" className="object-cover motion-safe:animate-hero-zoom" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,31,64,0.72)_0%,rgba(2,31,64,0.64)_50%,rgba(2,31,64,0.82)_100%)] lg:bg-[linear-gradient(180deg,rgba(2,31,64,0.26)_0%,rgba(2,31,64,0.06)_50%,rgba(2,31,64,0.28)_100%),linear-gradient(90deg,rgba(2,31,64,0.86)_0%,rgba(2,31,64,0.52)_55%,rgba(2,31,64,0.18)_100%)]"
      />
      <div className="relative container-site px-6 lg:px-[120px]">
        <div className="h-[2px] w-10 bg-brass-500 motion-safe:animate-fade-in lg:w-12" />
        <nav aria-label="Drobečková navigace" className="mt-[18px] text-label-s text-brass-300 motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] lg:mt-[22px]">
          <Link href="/" className="hover:text-surface-0">
            Domů
          </Link>
          <span className="whitespace-pre">{"  /  "}</span>
          {crumbHref ? (
            <Link href={crumbHref} className="hover:text-surface-0">
              {crumb}
            </Link>
          ) : (
            <span aria-current="page">{crumb}</span>
          )}
        </nav>
        <h1 className="mt-[14px] text-heading-m text-surface-0 motion-safe:animate-fade-up motion-safe:[animation-delay:160ms] lg:mt-[18px] lg:max-w-[760px] lg:text-display-l">{title}</h1>
        <p className="mt-[14px] text-body-m text-on-dark-muted motion-safe:animate-fade-up motion-safe:[animation-delay:260ms] lg:mt-5 lg:max-w-[560px] lg:text-body-l">{lead}</p>
      </div>
    </section>
  );
}
