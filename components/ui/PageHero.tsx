import Image from "next/image";
import Link from "next/link";

import heroImage from "@/public/images/hero.jpg";

// Figma: Page hero / Desktop (20:122) a Page hero / Mobile (34:676)
export default function PageHero({ title, lead, crumb }: { title: string; lead: string; crumb: string }) {
  return (
    <section className="relative flex h-[300px] items-center overflow-hidden lg:h-[400px]">
      <Image src={heroImage} alt="" fill priority sizes="100vw" className="object-cover" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,31,64,0.72)_0%,rgba(2,31,64,0.64)_50%,rgba(2,31,64,0.82)_100%)] lg:bg-[linear-gradient(180deg,rgba(2,31,64,0.26)_0%,rgba(2,31,64,0.06)_50%,rgba(2,31,64,0.28)_100%),linear-gradient(90deg,rgba(2,31,64,0.86)_0%,rgba(2,31,64,0.52)_55%,rgba(2,31,64,0.18)_100%)]"
      />
      <div className="relative container-site px-6 lg:px-[120px]">
        <div className="h-[2px] w-10 bg-brass-500 lg:w-12" />
        <nav aria-label="Drobečková navigace" className="mt-[18px] text-label-s text-brass-300 lg:mt-[22px]">
          <Link href="/" className="hover:text-surface-0">
            Domů
          </Link>
          <span className="whitespace-pre">{"  /  "}</span>
          <span aria-current="page">{crumb}</span>
        </nav>
        <h1 className="mt-[14px] text-heading-m text-surface-0 lg:mt-[18px] lg:max-w-[760px] lg:text-display-l">{title}</h1>
        <p className="mt-[14px] text-body-m text-on-dark-muted lg:mt-5 lg:max-w-[560px] lg:text-body-l">{lead}</p>
      </div>
    </section>
  );
}
