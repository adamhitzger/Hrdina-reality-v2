import Image from "next/image";
import Link from "next/link";

import ArticleCard from "@/components/blog/ArticleCard";
import HomeTabs from "@/components/home/HomeTabs";
import Faq from "@/components/sections/Faq";
import ServiceCards from "@/components/sections/ServiceCards";
import { button } from "@/components/ui/button";
import PropertyCard from "@/components/ui/PropertyCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { postAuthor, postCount, postMeta } from "@/lib/blog";
import { aboutTiles } from "@/lib/content";
import { propertyCardProps, type PropertyListItem } from "@/lib/property";
import { sanityFetch } from "@/sanity/lib/fetch";
import type { PostCard } from "@/sanity/lib/interfaces";
import { LATEST_POSTS_QUERY, NEMOVITOSTI_QUERY } from "@/sanity/lib/queries";
import aboutMeeting from "@/public/images/about-meeting.jpg";
import heroImage from "@/public/images/hero.jpg";
import photoOffice from "@/public/images/photo-office.jpg";

export default async function HomePage() {
  const [allRealities, posts] = await Promise.all([
    sanityFetch<PropertyListItem[]>({ query: NEMOVITOSTI_QUERY }),
    sanityFetch<PostCard[]>({ query: LATEST_POSTS_QUERY }),
  ]);
  const realities = allRealities.slice(0, 6);

  return (
    <>
      {/* 01 · Hero (4:64 / 35:681) */}
      <section className="relative flex min-h-[600px] items-end overflow-hidden lg:min-h-[760px]">
        <Image src={heroImage} alt="" fill priority sizes="100vw" className="object-cover" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,31,64,0.55)_0%,rgba(2,31,64,0.6)_35%,rgba(2,31,64,0.95)_100%)] lg:bg-[linear-gradient(180deg,rgba(2,31,64,0.42)_0%,rgba(2,31,64,0.08)_35%,rgba(2,31,64,0.48)_100%),linear-gradient(90deg,rgba(2,31,64,0.94)_0%,rgba(2,31,64,0.58)_50%,rgba(2,31,64,0.1)_100%)]"
        />
        <div className="relative container-site px-6 pt-16 pb-10 lg:px-[120px] lg:pt-[120px] lg:pb-[136px]">
          <div className="h-[2px] w-10 bg-brass-500 lg:w-12" />
          <p className="mt-[18px] text-label-s text-brass-300 lg:mt-[22px] lg:text-label-m">
            Realitní kancelář · Havlíčkův Brod<span className="hidden lg:inline"> a Vysočina</span>
          </p>
          <h1 className="mt-4 text-heading-m text-surface-0 lg:mt-5 lg:max-w-[760px] lg:text-display-xl">
            Najděte místo, <br />
            které si opravdu <br />
            zamilujete
          </h1>
          <p className="mt-4 text-body-m text-on-dark-muted lg:mt-6 lg:max-w-[560px] lg:text-body-l">
            Už 19 let pomáháme lidem na Vysočině prodat, pronajmout a koupit nemovitost.
            <span className="hidden lg:inline"> Bez stresu, s jasným plánem a s cenou, která dává smysl.</span>
          </p>
          <div className="mt-7 flex flex-col gap-2.5 lg:mt-10 lg:flex-row lg:gap-4">
            <Link href="/nemovitosti" className={button.onImage}>
              Prohlédnout nemovitosti
            </Link>
            <Link href="/kontakt" className={button.onImageGhost}>
              Kolik má cenu moje nemovitost?
            </Link>
          </div>
          <dl className="mt-8 grid grid-cols-3 lg:hidden">
            {[
              ["19 let", "na trhu"],
              ["400+", "prodaných"],
              ["4,9 / 5", "hodnocení"],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col-reverse gap-0.5">
                <dt className="text-body-s text-on-dark-muted">{label}</dt>
                <dd className="text-title-m text-surface-0">{value}</dd>
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
            title={
              <>
                Všechno, co <br className="hidden lg:block" />
                potřebujete vědět
              </>
            }
            titleClassName="lg:w-[520px]"
            lead={
              <span className="lg:hidden">Malá kancelář, osobní přístup. Podívejte se, kdo jsme — nebo rovnou na to, co pro vás uděláme.</span>
            }
            aside={
              <p className="hidden text-body-l text-ink-500 lg:block lg:w-[420px]">
                Malá kancelář, osobní přístup. Podívejte se, kdo jsme a co o nás říkají klienti — nebo rovnou na to, co pro vás uděláme.
              </p>
            }
          />
          <div className="mt-9 lg:mt-12">
            <HomeTabs
              tabs={[
                {
                  label: "O Hrdina reality",
                  panel: (
                    <div className="grid gap-7 md:grid-cols-3 lg:gap-6">
                      {aboutTiles.map((tile) => (
                        <article key={tile.title} className="flex flex-col">
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
                      <p className="text-body-m text-ink-500 lg:text-body-l">
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
            title="Nemovitosti, které milujeme"
            aside={
              <Link href="/nemovitosti" className={`${button.ghost} hidden lg:inline-flex`}>
                Všechny nemovitosti
              </Link>
            }
          />
          {realities.length > 0 ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-x-[30px] lg:gap-y-10">
              {realities.map((r, i) => (
                <PropertyCard key={r.slug} {...propertyCardProps(r)} className={i >= 3 ? "hidden lg:flex" : ""} />
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
          <div className="relative h-[260px] lg:h-auto lg:w-[660px] lg:shrink-0">
            <Image src={aboutMeeting} alt="" fill sizes="(min-width: 1024px) 660px, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center px-6 pt-14 pb-16 lg:py-24 lg:pr-[120px] lg:pl-[88px]">
            <p className="text-label-s text-brass-300 lg:text-label-m">O nás</p>
            <h2 className="mt-[14px] text-heading-s text-surface-0 lg:mt-5 lg:w-[520px] lg:text-display-l">
              19 let v realitách. <br className="hidden lg:block" />A to je znát.
            </h2>
            <p className="mt-4 text-body-m text-on-dark-muted lg:mt-6 lg:w-[500px] lg:text-body-l">
              Hrdina Reality vznikla v Havlíčkově Brodě a dodnes má kancelář na Havlíčkově náměstí. Známe zdejší ulice, kupce i ceny — a
              víme, kdy se vyplatí počkat a kdy prodat.
              <span className="hidden lg:inline"> Za každým obchodem stojí konkrétní člověk, na kterého se dovoláte.</span>
            </p>
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
                Co byste měli vědět, <br className="hidden lg:block" />
                než prodáte
              </>
            }
            titleClassName="lg:w-[560px]"
            aside={
              posts.length > 0 && (
                <Link href="/blog" className={`${button.ghost} hidden lg:inline-flex`}>
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
                  title={p.title}
                  text={p.excerpt}
                  author={postAuthor(p)}
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
          <div className="flex flex-col gap-8 bg-navy-900 px-6 pt-10 lg:flex-row lg:gap-14 lg:px-14 lg:pt-12">
            <div className="flex-1 lg:pt-1.5 lg:pb-11">
              <h2 className="text-[30px] leading-[1.1] tracking-[-0.3px] text-brass-300 lg:text-[44px] lg:tracking-[-0.44px]">
                <span className="block font-bold">Máte na víc?</span>
                <span className="block font-light">Pořád hledáme ty nejlepší lidi v oboru</span>
              </h2>
              <p className="mt-6 text-body-m text-brass-300 lg:mt-10 lg:w-[380px]">
                Přemýšlíte o nové kapitole kariéry? Stavíme na týmové práci, osobním růstu a skutečných vztazích s lidmi. Pojďme do toho
                spolu.
              </p>
              <Link href="/kariera" className="mt-5 inline-block text-button-m text-brass-300 underline hover:text-surface-0">
                Zjistit více
              </Link>
            </div>
            <div className="relative h-[230px] overflow-hidden lg:h-[386px] lg:w-[552px] lg:shrink-0">
              <Image src={photoOffice} alt="" fill sizes="(min-width: 1024px) 552px, 100vw" className="object-cover object-[50%_35%]" />
            </div>
          </div>
        </div>
      </section>

      {/* 07 · FAQ */}
      <Faq />
    </>
  );
}
