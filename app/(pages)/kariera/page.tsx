import Image from "next/image";
import Link from "next/link";

import ApplicationForm from "@/components/forms/ApplicationForm";
import JsonLd from "@/components/JsonLd";
import { button } from "@/components/ui/button";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import CountUp from "@/components/ui/CountUp";
import { getOpenPositions } from "@/lib/careers";
import { applicationSteps, benefits, cultureStats } from "@/lib/content";
import { telHref } from "@/lib/format";
import { jobPostingsJsonLd, pageJsonLd } from "@/lib/json-ld";
import { pageMetadata, site } from "@/lib/site";
import aboutMeeting from "@/public/images/about-meeting.jpg";
import heroKariera from "@/public/images/hero-kariera.jpg";
import photoOffice from "@/public/images/photo-office.jpg";

const TITLE = "Kariéra – práce realitního makléře";
const DESCRIPTION =
  "Hledáme realitní makléře do kanceláře v Havlíčkově Brodě. Zaučení v praxi, zázemí zavedené kanceláře, marketing za vás a prostor pro vlastní růst.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/kariera" });

const cultureText =
  "Naše kancelář na Havlíčkově náměstí má svou energii i osobitou atmosféru. Tvoříme tým, který sdílí zkušenosti, kontakty i příležitosti. Navzájem se podporujeme, táhneme za jeden provaz a z každého úspěchu máme společnou radost.";

export default async function KarieraPage({ searchParams }: PageProps<"/kariera">) {
  const [{ pozice }, roles] = await Promise.all([searchParams, getOpenPositions()]);
  const defaultPosition = roles.find((r) => r.slug === pozice)?.title;

  return (
    <>
      <JsonLd
        data={pageJsonLd({
          path: "/kariera",
          name: TITLE,
          description: DESCRIPTION,
          crumbs: [{ name: "Kariéra", path: "/kariera" }],
          extra: jobPostingsJsonLd(roles),
        })}
      />
      <PageHero
        crumb="Kariéra"
        title="Kariéra"
        lead="Hledáme realitní makléře, kteří chtějí svou práci dělat profesionálně, poctivě a s osobním přístupem. Nabízíme možnost učit se od zkušených odborníků a rozvíjet se v oboru, který stojí na důvěře, kvalitních službách a dlouhodobých vztazích s klienty."
        image={heroKariera}
      />

      {/* Budujeme kariéry (94:1076) */}
      <section className="bg-surface-0">
        <div className="container-site flex flex-col gap-10 px-6 py-16 lg:flex-row lg:items-center lg:gap-12 lg:px-[120px] lg:py-24 xl:gap-20">
          <div data-reveal className="flex-1">
            <p className="text-label-s text-brass-500 lg:text-label-m">Práce v Hrdina Reality</p>
            <h2 className="mt-[14px] text-heading-s text-ink-900 lg:mt-4 lg:text-display-l">
              Dáváme prostor růstu. <br className="hidden lg:block" />
              Budujeme kariéry.
            </h2>
            <p className="mt-4 text-body-m text-ink-500 lg:mt-[22px]">
              Jsme menší realitní kancelář s velkými ambicemi a vysokými nároky na kvalitu. Věříme, že skutečný úspěch vzniká tam, kde se
              potkávají zkušenosti, důvěra a chuť posouvat se dál. Našim makléřům nabízíme profesionální zázemí, podporu zkušených kolegů a
              svobodu hledat vlastní cestu. Záleží nám na tom, aby se u nás každý cítil dobře, mohl naplno rozvíjet svůj potenciál a měl
              vedle sebe lidi, o které se může opřít. Protože kariéra není jen o výsledcích a číslech. Je také o vztazích, důvěře a radosti
              z práce, která má smysl.
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
          <div data-reveal="image" className="relative aspect-square overflow-hidden lg:w-[44%] lg:shrink-0 xl:size-[520px]">
            <Image src={aboutMeeting} alt="" fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Naše kultura (94:1092) */}
      <section className="bg-surface-50">
        <div className="container-site px-6 py-16 lg:px-[120px] lg:pt-24 lg:pb-[104px]">
          <SectionHeading
            eyebrow="Naše kultura"
            title={
              <>
                Vaše důvěra nás <br className="hidden lg:block" />
                posouvá dál.
              </>
            }
            titleClassName="lg:max-w-[600px]"
            lead={<span className="lg:hidden">{cultureText}</span>}
            aside={<p className="hidden text-body-l text-ink-500 lg:block lg:w-[360px] xl:w-[420px]">{cultureText}</p>}
          />
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-[30px]">
            {cultureStats.map((s) => (
              <div key={s.label} data-reveal className="flex flex-col gap-2.5 border-t-2 border-brass-500 pt-6">
                <p className="text-display-l text-brass-500">
                  <CountUp value={s.value} />
                </p>
                <p className="text-body-m text-ink-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Koho hledáme (94:1113) – pozice ze Sanity, bez aktivních pozic se sekce skryje */}
      {roles.length > 0 && (
        <section className="bg-surface-0">
          <div className="container-site px-6 py-16 lg:px-[120px] lg:pt-24 lg:pb-[104px]">
            <SectionHeading
              eyebrow="Otevřené pozice"
              title="Pořád hledáme nové lidi do týmu"
              titleClassName="lg:max-w-[600px]"
              lead={
                <span className="lg:hidden">
                  Nemusíte mít za sebou roky praxe. Důležitější je, jak jednáte s lidmi a jestli vás práce baví.
                </span>
              }
              aside={
                <p className="hidden text-body-l text-ink-500 lg:block lg:w-[360px] xl:w-[420px]">
                  Nemusíte mít za sebou roky praxe. Důležitější je, jak jednáte s lidmi a jestli vás práce baví.
                </p>
              }
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-14 lg:gap-[30px] xl:grid-cols-4">
              {roles.map((r) => (
                <article
                  key={r.slug}
                  id={r.slug}
                  data-reveal
                  className="scroll-mt-6 flex flex-col justify-between rounded border border-line-200 bg-surface-0 p-7"
                >
                  <div>
                    {r.tag && <p className="text-label-s text-brass-500">{r.tag}</p>}
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
      )}

      {/* Proč Hrdina Reality (94:1158) */}
      <section className="bg-surface-50">
        <div className="container-site px-6 py-16 lg:px-[120px] lg:pt-24 lg:pb-[104px]">
          <p data-reveal className="text-label-s text-brass-500 lg:text-label-m">Proč k nám</p>
          <h2 data-reveal className="mt-[14px] text-heading-s text-ink-900 lg:mt-4 lg:text-display-l">Co u nás dostanete</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-[30px]">
            {benefits.map((b) => (
              <div key={b.title} data-reveal className="flex flex-col gap-3 border-t-2 border-brass-500 pt-6">
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
          <div data-reveal="image" className="relative h-[300px] overflow-hidden md:h-[440px] lg:h-auto lg:w-[46%] lg:shrink-0 xl:w-[660px]">
            <Image
              src={photoOffice}
              alt=""
              fill
              sizes="(min-width: 1280px) 660px, (min-width: 1024px) 46vw, 100vw"
              className="object-cover object-[50%_70%] lg:object-center"
            />
          </div>
          <figure data-reveal="right" className="flex flex-col justify-center px-6 pt-14 pb-16 lg:py-24 lg:pr-12 lg:pl-12 xl:pr-[120px] xl:pl-[88px]">
            <p className="text-label-s text-brass-300 lg:text-label-m">Slovo majitele</p>
            <blockquote className="mt-5 text-title-m text-surface-0 lg:text-heading-m">
              „Vím z vlastní zkušenosti, jak náročné je začínat od nuly. O to víc si uvědomuji, jak důležité je mít vedle sebe někoho, kdo
              vám pomůže, předá své zkušenosti a věří ve váš potenciál. Přesně takové prostředí chci v Hrdina Reality vytvářet. Aby nikdo
              nemusel svou cestu hledat sám.“
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
          <div data-reveal className="flex-1 px-6 lg:px-0">
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

          <div data-reveal className="flex-1 bg-surface-50 px-6 py-10 lg:rounded lg:p-10">
            <h2 className="mb-[18px] text-heading-s text-ink-900">Poslat přihlášku</h2>
            <ApplicationForm
              key={defaultPosition}
              positions={roles.length > 0 ? roles.map((r) => r.title) : ["Volná přihláška"]}
              defaultPosition={defaultPosition}
            />
          </div>
        </div>
      </section>
    </>
  );
}
