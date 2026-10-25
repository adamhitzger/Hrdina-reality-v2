import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import ArticleCard from "@/components/blog/ArticleCard";
import HomeTabs from "@/components/home/HomeTabs";
import JsonLd from "@/components/JsonLd";
import Faq from "@/components/sections/Faq";
import ServiceCards from "@/components/sections/ServiceCards";
import { button } from "@/components/ui/button";
import PropertyCard from "@/components/ui/PropertyCard";
import SectionHeading from "@/components/ui/SectionHeading";
import CountUp from "@/components/ui/CountUp";
import { headingCase, postAuthor, postCount, postExcerpt, postMeta } from "@/lib/blog";
import { aboutTiles, faq } from "@/lib/content";
import { faqJsonLd, pageJsonLd } from "@/lib/json-ld";
import { propertyCardProps, type PropertyListItem } from "@/lib/property";
import { pageMetadata, site, siteUrl } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/fetch";
import type { ArticleCard as ArticleCardData } from "@/sanity/lib/interfaces";
import { LATEST_POSTS_QUERY, NEMOVITOSTI_QUERY } from "@/sanity/lib/queries";
import aboutMeeting from "@/public/images/about-meeting.jpg";
import heroImage from "@/public/images/hero-home.jpg";
import photoLukas from "@/public/images/photo-lukas.jpg";

const homeTitle = `${site.name} | Realitní kancelář Havlíčkův Brod`;

export const metadata: Metadata = {
  ...pageMetadata({ title: homeTitle, description: site.description, path: "/" }),
  title: { absolute: homeTitle },
};

const introText =
  "Každý klient je pro nás důležitý. Každá nemovitost má svůj příběh. Seznamte se s námi, přečtěte si zkušenosti našich klientů a zjistěte, jak vám můžeme pomoci.";

export default async function HomePage() {
  const [allRealities, posts] = await Promise.all([
    sanityFetch<PropertyListItem[]>({ query: NEMOVITOSTI_QUERY }),
    sanityFetch<ArticleCardData[]>({ query: LATEST_POSTS_QUERY }),
  ]);
  const realities = allRealities.slice(0, 6);

  return (
    <>
      <JsonLd
        data={pageJsonLd({
          path: "/",
          name: homeTitle,
          description: site.description,
          extra: [faqJsonLd(faq, `${siteUrl}/#faq`)],
        })}
      />
      {/* 01 · Hero (4:64 / 35:681) */}
      <section className="relative flex min-h-[600px] items-end overflow-hidden lg:min-h-[760px]">
        <Image src={heroImage} alt="" fill priority sizes="(max-width: 767px) 240vw, 100vw" className="object-cover motion-safe:animate-hero-zoom" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,31,64,0.55)_0%,rgba(2,31,64,0.6)_35%,rgba(2,31,64,0.95)_100%)] lg:bg-[linear-gradient(180deg,rgba(2,31,64,0.42)_0%,rgba(2,31,64,0.08)_35%,rgba(2,31,64,0.48)_100%),linear-gradient(90deg,rgba(2,31,64,0.94)_0%,rgba(2,31,64,0.58)_50%,rgba(2,31,64,0.1)_100%)]"
        />
        <div className="relative container-site px-6 pt-16 pb-10 lg:px-[120px] lg:pt-[120px] lg:pb-[136px]">
          <div className="h-[2px] w-10 bg-brass-500 motion-safe:animate-fade-in lg:w-12" />
          <p className="mt-[18px] text-label-s text-brass-300 motion-safe:animate-fade-up motion-safe:[animation-delay:100ms] lg:mt-[22px] lg:text-label-m">
            Realitní kancelář · Havlíčkův Brod<span className="hidden lg:inline"> a Vysočina</span>
          </p>
          <h1 className="mt-4 text-heading-m text-surface-0 motion-safe:animate-fade-up motion-safe:[animation-delay:200ms] lg:mt-5 lg:max-w-[760px] lg:text-display-xl">
            Najděte místo, <br />
            které si opravdu <br />
            zamilujete
          </h1>
          <p className="mt-4 text-body-m text-on-dark-muted motion-safe:animate-fade-up motion-safe:[animation-delay:320ms] lg:mt-6 lg:max-w-[560px] lg:text-body-l">
            Už 19 let pomáháme lidem na Vysočině prodat, pronajmout a koupit nemovitost. Bez stresu, s jasným plánem a s cenou, která dává
            smysl.
          </p>
          <div className="mt-7 flex flex-col gap-2.5 motion-safe:animate-fade-up motion-safe:[animation-delay:440ms] lg:mt-10 lg:flex-row lg:gap-4">
            <Link href="/nemovitosti" className={button.onImage}>
              Prohlédnout nemovitosti
            </Link>
            <Link href="/kontakt" className={`${button.onImageGhost} text-center max-lg:px-5 max-lg:whitespace-normal`}>
              Zjistěte, jakou hodnotu má vaše nemovitost
            </Link>
          </div>
          <dl className="mt-8 grid grid-cols-3 motion-safe:animate-fade-up motion-safe:[animation-delay:540ms] lg:hidden">
            {[
              ["19 let", "na trhu"],
              ["400+", "prodaných"],
              ["4,9 / 5", "hodnocení"],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col-reverse gap-0.5">
                <dt className="text-body-s text-on-dark-muted">{label}</dt>
                <dd className="text-title-m text-surface-0">
                  <CountUp value={value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 02 · Provázíme vás domů (4:65 / 64:943) */}
      <section className="bg-surface-0">
        <div className="container-site px-6 py-16 lg:px-[120px] lg:py-[104px]">
          <SectionHeading
            eyebrow="Provázíme vás domů"
            title="Cesta k vašemu novému domovu začíná u nás"
            titleClassName="lg:max-w-[520px]"
            lead={<span className="lg:hidden">{introText}</span>}
            aside={<p className="hidden text-body-l text-ink-500 lg:block lg:w-[360px] xl:w-[420px]">{introText}</p>}
          />
          <div className="mt-9 lg:mt-12">
            <HomeTabs
              tabs={[
                {
                  label: "O Hrdina reality",
                  panel: (
                    <div className="grid gap-7 md:grid-cols-3 lg:gap-6">
                      {aboutTiles.map((tile) => (
                        <article key={tile.title} data-reveal className="flex flex-col">
                          <div className="relative h-[250px] overflow-hidden rounded-t lg:h-[300px]">
                            <Image src={tile.image} alt="" fill sizes="(min-width: 1024px) 384px, 100vw" className="object-cover" />
                          </div>
                          <h3 className="mt-[22px] text-heading-s text-ink-900">{tile.title}</h3>
                          <p className="mt-2.5 text-body-m text-ink-500">{tile.text}</p>
                          <Link href={tile.href} className={`${button.ghost} mt-[18px] self-start px-[22px] py-[13px]`}>
                            Zjistit více
                          </Link>
                        </article>
                      ))}
                    </div>
                  ),
                },
                {
                  label: "Služby",
                  panel: (
                    <>
                      <p data-reveal className="text-body-m text-ink-500 lg:text-body-l">
                        U každé zakázky vás vede jeden člověk od první schůzky po katastr. Nepředáváme vás mezi odděleními a nikdy se
                        nestane, že byste nevěděli, v jaké fázi prodej je.
                      </p>
                      <div className="mt-8 lg:mt-10">
                        <ServiceCards variant="home" />
                      </div>
                    </>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* 03 · Nemovitosti (4:66 / 36:679) */}
      <section className="bg-surface-50">
        <div className="container-site px-6 py-16 lg:px-[120px] lg:py-[104px]">
          <SectionHeading
            eyebrow="Aktuální nabídka"
            title="Nemovitosti, které stojí za vaši pozornost"
            lead="Prohlédněte si naši aktuální nabídku a objevte místo, které může být právě pro vás."
            aside={
              <Link href="/nemovitosti" className={`${button.ghost} max-lg:hidden`}>
                Všechny nemovitosti
              </Link>
            }
          />
          {realities.length > 0 ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-x-[30px] lg:gap-y-10">
              {realities.map((r, i) => (
                <PropertyCard key={r.slug} {...propertyCardProps(r)} className={i >= 3 ? "max-lg:hidden" : ""} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-body-l text-ink-500">Momentálně připravujeme nové nabídky. Zavolejte nám, rádi poradíme.</p>
          )}
          <Link href="/nemovitosti" className={`${button.ghost} mt-6 w-full py-4 text-label-s lg:hidden`}>
            Všechny nemovitosti
          </Link>
        </div>
      </section>

      {/* 04 · O nás (4:67 / 36:727) */}
      <section className="bg-navy-900">
        <div className="container-site flex flex-col lg:min-h-[560px] lg:flex-row">
          <div data-reveal="image" className="relative h-[260px] overflow-hidden md:h-[440px] lg:h-auto lg:w-[46%] lg:shrink-0 xl:w-[660px]">
            <Image src={aboutMeeting} alt="" fill sizes="(min-width: 1280px) 660px, (min-width: 1024px) 46vw, 100vw" className="object-cover object-[50%_25%] lg:object-center" />
          </div>
          <div data-reveal="right" className="flex flex-col justify-center px-6 pt-14 pb-16 lg:py-24 lg:pr-12 lg:pl-12 xl:pr-[120px] xl:pl-[88px]">
            <p className="text-label-s text-brass-300 lg:text-label-m">O nás</p>
            <h2 className="mt-[14px] text-heading-s text-surface-0 lg:mt-5 lg:max-w-[520px] lg:text-display-l">
              19 let zkušeností. Osobní přístup. Znalost místního trhu.
            </h2>
            <div className="mt-4 flex flex-col gap-3 text-body-m text-on-dark-muted lg:mt-6 lg:max-w-[500px]">
              <p>
                Hrdina Reality vznikla v Havlíčkově Brodě. Naši kancelář najdete na Havlíčkově náměstí dodnes — stejně jako osobní přístup, na
                kterém stavíme od samého začátku.
              </p>
              <p>
                Známe zdejší ulice, místní trh i lidi, kteří v něm žijí. Víme, co ovlivňuje cenu nemovitosti, kdy je správný čas prodat a jak z
                prodeje vytěžit maximum.
              </p>
              <p>
                Za každým obchodem stojí konkrétní člověk. Někdo, kdo zná váš případ, rozumí vašim potřebám a je vám k dispozici, když ho
                potřebujete. Protože pro nás realitní služby nekončí u nemovitosti. Začínají u lidí.
              </p>
            </div>
            <Link href="/o-nas" className="mt-[26px] text-label-s whitespace-pre text-brass-300 hover:text-surface-0 lg:mt-9">
              {"Více o nás  →"}
            </Link>
          </div>
        </div>
      </section>

      {/* 05 · Rady a novinky (4:68) */}
      <section className="bg-surface-0">
        <div className="container-site px-6 py-16 lg:px-[120px] lg:py-[104px]">
          <SectionHeading
            eyebrow="Rady a novinky"
            title={
              <>
                Rady a postřehy z <br className="hidden lg:block" />
                realitního trhu
              </>
            }
            titleClassName="lg:max-w-[560px]"
            aside={
              posts.length > 0 && (
                <Link href="/blog" className={`${button.ghost} max-lg:hidden`}>
                  Všechny články
                </Link>
              )
            }
          />
          {posts.length > 0 ? (
            <div className="mt-8 grid gap-10 lg:mt-14 lg:grid-cols-3 lg:gap-[30px]">
              {posts.map((p) => (
                <ArticleCard
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  image={p.imageUrl}
                  meta={postMeta(p)}
                  title={headingCase(p.title)}
                  text={postExcerpt(p)}
                  author={postAuthor()}
                />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-body-l text-ink-500 lg:mt-14">{postCount(0)}</p>
          )}
          {posts.length > 0 && (
            <Link href="/blog" className={`${button.ghost} mt-10 w-full py-4 text-label-s lg:hidden`}>
              Všechny články
            </Link>
          )}
        </div>
      </section>

      {/* 06 · Kariéra (98:1153 / 98:1164) */}
      <section className="bg-surface-0">
        <div className="container-site px-6 lg:px-[120px]">
          <div data-reveal className="flex flex-col gap-8 bg-navy-900 px-6 pt-10 lg:flex-row lg:gap-14 lg:px-14 lg:pt-12">
            <div className="flex-1 lg:pt-1.5 lg:pb-11">
              <h2 className="text-[30px] leading-[1.1] tracking-[-0.3px] text-brass-300 lg:text-[44px] lg:tracking-[-0.44px]">
                <span className="block font-bold">Máte na víc?</span>
                <span className="block font-light">Stále hledáme ty nejlepší lidi v oboru</span>
              </h2>
              <div className="mt-6 flex flex-col gap-2 text-body-m text-brass-300 lg:mt-10 lg:max-w-[380px]">
                <p>Hledáme lidi, kteří chtějí v realitách něco dokázat.</p>
                <p>
                  Lidi s ambicemi, energií a chutí růst. Lidi, kteří chtějí dělat svou práci poctivě, budovat si vlastní jméno a dosahovat
                  výsledků, na které mohou být hrdí.
                </p>
                <p>
                  Možná hledáme právě vás.
                  <br />
                  Staňte se součástí Hrdina Reality.
                </p>
              </div>
              <Link href="/kariera" className="mt-5 inline-block text-button-m text-brass-300 underline hover:text-surface-0">
                Zjistit více
              </Link>
            </div>
            <div data-reveal="image" className="relative h-[230px] overflow-hidden md:h-[400px] lg:h-[386px] lg:w-[46%] lg:shrink-0 xl:w-[552px]">
              <Image src={photoLukas} alt="" fill sizes="(min-width: 1280px) 552px, (min-width: 1024px) 42vw, 100vw" className="object-cover object-[50%_38%] lg:object-[50%_65%]" />
            </div>
          </div>
        </div>
      </section>

      {/* 07 · FAQ */}
      <Faq />
    </>
  );
}
