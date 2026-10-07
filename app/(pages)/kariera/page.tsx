import Image from "next/image";
import Link from "next/link";

import ApplicationForm from "@/components/forms/ApplicationForm";
import { button } from "@/components/ui/button";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { roles } from "@/lib/careers";
import { applicationSteps, benefits, cultureStats } from "@/lib/content";
import { telHref } from "@/lib/format";
import { pageMetadata, site } from "@/lib/site";
import aboutMeeting from "@/public/images/about-meeting.jpg";
import photoOffice from "@/public/images/photo-office.jpg";

export const metadata = pageMetadata({
  title: "Kariéra",
  description: "Přidejte se k týmu Hrdina Reality. Hledáme realitní makléře na Vysočině.",
  path: "/kariera",
});

export default async function KarieraPage({ searchParams }: PageProps<"/kariera">) {
  const { pozice } = await searchParams;
  const defaultPosition = roles.find((r) => r.slug === pozice)?.title;

  return (
    <>
      <PageHero crumb="Kariéra" title="Kariéra" lead="Hledáme lidi, kteří chtějí dělat reality poctivě a s radostí." />

      {/* Budujeme kariéry (94:1076) */}
      <section className="bg-surface-0">
        <div className="container-site flex flex-col gap-10 px-6 py-16 lg:flex-row lg:items-center lg:gap-20 lg:px-[120px] lg:py-24">
          <div className="flex-1">
            <p className="text-label-s text-brass-500 lg:text-label-m">Práce v Hrdina Reality</p>
            <h2 className="mt-[14px] text-heading-s text-ink-900 lg:mt-4 lg:text-display-l">
              Budujeme kariéry, <br className="hidden lg:block" />
              ne jen pracovní místa
            </h2>
            <p className="mt-4 text-body-m text-ink-500 lg:mt-[22px] lg:text-body-l">
              Jsme malá kancelář s velkými nároky. Makléř u nás má zázemí, jaké by čekal od velké sítě — a zároveň svobodu a osobní přístup,
              který mu velká síť nedá.
            </p>
            <p className="mt-[14px] text-body-m text-ink-500">
              Lukáš začínal s realitami v Austrálii, prošel RE/MAX a nakonec založil vlastní kancelář. Ví, co člověk na začátku potřebuje:
              někoho, kdo mu ukáže řemeslo, a jméno, kterému lidé v regionu věří.
            </p>
            <div className="mt-8 flex flex-col gap-[14px] sm:flex-row">
              <Link href="#prihlaska" className={`${button.primary} px-[30px] py-[17px]`}>
                Chci se přidat
              </Link>
              <a href={telHref(site.phone)} className={`${button.ghost} px-[30px] py-[17px]`}>
                {site.phone}
              </a>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden lg:size-[520px] lg:shrink-0">
            <Image src={aboutMeeting} alt="" fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Naše kultura (94:1092) */}
      <section className="bg-surface-50">
        <div className="container-site px-6 py-16 lg:px-[120px] lg:pt-24 lg:pb-[104px]">
          <SectionHeading
            eyebrow="Naše kultura"
            title="Rosteme s každým prodaným domem"
            titleClassName="lg:w-[600px]"
            lead={
              <span className="lg:hidden">
                Kancelář na Havlíčkově náměstí je malá, ale živá. Pracujeme spolu, sdílíme kontakty i zkušenosti a každý úspěch slavíme
                společně.
              </span>
            }
            aside={
              <p className="hidden text-body-l text-ink-500 lg:block lg:w-[420px]">
                Kancelář na Havlíčkově náměstí je malá, ale živá. Pracujeme spolu, sdílíme kontakty i zkušenosti a každý úspěch slavíme
                společně.
              </p>
            }
          />
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-[30px]">
            {cultureStats.map((s) => (
              <div key={s.label} className="flex flex-col gap-2.5 border-t-2 border-brass-500 pt-6">
                <p className="text-display-l text-brass-500">{s.value}</p>
                <p className="text-body-m text-ink-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Koho hledáme (94:1113) */}
      <section className="bg-surface-0">
        <div className="container-site px-6 py-16 lg:px-[120px] lg:pt-24 lg:pb-[104px]">
          <SectionHeading
            eyebrow="Otevřené pozice"
            title="Pořád hledáme nové lidi do týmu"
            titleClassName="lg:w-[600px]"
            lead={<span className="lg:hidden">Nemusíte mít za sebou roky praxe. Důležitější je, jak jednáte s lidmi a jestli vás práce baví.</span>}
            aside={
              <p className="hidden text-body-l text-ink-500 lg:block lg:w-[420px]">
                Nemusíte mít za sebou roky praxe. Důležitější je, jak jednáte s lidmi a jestli vás práce baví.
              </p>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-[30px]">
            {roles.map((r) => (
              <article key={r.slug} id={r.slug} data-reveal className="scroll-mt-6 flex flex-col justify-between rounded border border-line-200 bg-surface-0 p-7">
                <div>
                  <p className="text-label-s text-brass-500">{r.tag}</p>
                  <h3 className="mt-[14px] text-title-m text-ink-900">{r.title}</h3>
                  <p className="mt-3 text-body-s text-ink-500">{r.text}</p>
                </div>
                <Link
                  href={`/kariera?pozice=${r.slug}#prihlaska`}
                  className="mt-7 text-label-m whitespace-pre text-brass-600 hover:text-brass-500"
                >
                  {"Mám zájem  →"}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Proč Hrdina Reality (94:1158) */}
      <section className="bg-surface-50">
        <div className="container-site px-6 py-16 lg:px-[120px] lg:pt-24 lg:pb-[104px]">
          <p className="text-label-s text-brass-500 lg:text-label-m">Proč k nám</p>
          <h2 className="mt-[14px] text-heading-s text-ink-900 lg:mt-4 lg:text-display-l">Co u nás dostanete</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-[30px]">
            {benefits.map((b) => (
              <div key={b.title} className="flex flex-col gap-3 border-t-2 border-brass-500 pt-6">
                <h3 className="text-heading-s text-ink-900">{b.title}</h3>
                <p className="text-body-m text-ink-500">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slovo majitele (94:1184) */}
      <section className="bg-navy-900">
        <div className="container-site flex flex-col lg:min-h-[560px] lg:flex-row">
          <div className="relative h-[260px] lg:h-auto lg:w-[660px] lg:shrink-0">
            <Image src={photoOffice} alt="" fill sizes="(min-width: 1024px) 660px, 100vw" className="object-cover" />
          </div>
          <figure className="flex flex-col justify-center px-6 pt-14 pb-16 lg:py-24 lg:pr-[120px] lg:pl-[88px]">
            <p className="text-label-s text-brass-300 lg:text-label-m">Slovo majitele</p>
            <blockquote className="mt-5 text-title-m text-surface-0 lg:text-heading-m">
              „Sám jsem začínal v cizí zemi a vím, kolik znamená, když vám někdo ukáže řemeslo. Kdo k nám přijde, nebude na nic sám.“
            </blockquote>
            <figcaption className="mt-7 flex flex-col gap-1">
              <span className="text-title-s text-surface-0">Lukáš Hrdina</span>
              <span className="text-body-s text-on-dark-muted">majitel Hrdina Reality</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Přihláška (94:1194) */}
      <section id="prihlaska" className="scroll-mt-6 bg-surface-0">
        <div className="container-site flex flex-col gap-12 py-16 lg:flex-row lg:items-start lg:gap-20 lg:px-[120px] lg:pt-24 lg:pb-[104px]">
          <div className="flex-1 px-6 lg:px-0">
            <p className="text-label-s text-brass-500 lg:text-label-m">Přihláška</p>
            <h2 className="mt-[14px] text-heading-s text-ink-900 lg:mt-4 lg:text-display-l">Pojďme se poznat</h2>
            <p className="mt-4 text-body-m text-ink-500 lg:mt-5 lg:text-body-l">
              Vyplňte pár údajů a ozveme se vám do tří pracovních dnů. Žádné kolečko pohovorů — první schůzka je u kávy přímo v kanceláři.
            </p>
            <p className="mt-10 text-title-s text-ink-900">Co bude následovat</p>
            <ol className="mt-2">
              {applicationSteps.map((s, i) => (
                <li key={s.title} className="flex gap-5 border-b border-line-200 py-[18px]">
                  <span className="text-title-m text-brass-500">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-title-s text-ink-900">{s.title}</p>
                    <p className="text-body-s text-ink-500">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <p className="text-body-m text-ink-500">Raději zavoláte?</p>
              <a href={telHref(site.phone)} className={`${button.ghost} px-[30px] py-[17px]`}>
                {site.phone}
              </a>
            </div>
          </div>

          <div className="flex-1 bg-surface-50 px-6 py-10 lg:rounded lg:p-10">
            <h2 className="mb-[18px] text-heading-s text-ink-900">Poslat přihlášku</h2>
            <ApplicationForm key={defaultPosition} defaultPosition={defaultPosition} />
          </div>
        </div>
      </section>
    </>
  );
}
