@AGENTS.md

# Hrdina Reality (new-hrdina)

Web realitní kanceláře z Havlíčkova Brodu. Next.js 16 (App Router), React 19, Tailwind 4, Sanity, nodemailer přes Gmail. Design je z Figmy, desktop 1440 px, mobil 390 px.

Otevřené úkoly a rozpracované věci jsou v `TODO.md`.

## Struktura

- `app/(pages)/`: stránky (`/`, nemovitosti, nemovitosti/[slug], realizovane-prodeje, o-nas, kariera, recenze, kontakt). `app/studio` je Sanity Studio.
- `lib/actions.ts`: server akce (`getNemovitosti`, `sendContact`, `sendContactFromNemovitosti`, `sendApplication`) a SMTP.
- `lib/schemas.ts`: zod schémata formulářů. Typy formulářů se odvozují odsud.
- `lib/content.ts`: statický obsah (FAQ, recenze, čísla, články, kontakty makléřů). Ten se upravuje tady, ne v komponentách.
- `lib/site.ts`: firemní údaje (telefon, e-mail, adresa, sociální sítě) a `pageMetadata()` pro metadata podstránek.
- `sanity/lib/queries.ts`: GROQ dotazy. `sanity/schemaTypes/`: schémata Studia.
- `lib/careers.ts`: otevřené pozice na Kariéře, načítají se ze Sanity (typ `position`). Slug pozice je v odkazu `/kariera?pozice=…` a předvyplní výběr ve formuláři. Do schema.org (JobPosting) jdou jen pozice se zapnutým `jobPosting`.
- OG obrázek detailu nemovitosti se vyrenderuje přes `ImageResponse` (PNG) a `sharp` ho převede na JPEG. `sharp` je proto v dependencies.
- `components/forms/`: formuláře a `useActionToast`.
- Blog = dokumenty „Podstránky“ (`page`) ze Sanity, jen ty se sekcí text s fotkou. Sekce renderuje `components/blog/ArticleSections.tsx`, nadpisy verzálkami a „HRDINA Reality“ srovnává `lib/blog.ts` při zobrazení.
- Čísla a statistiky se při zobrazení napočítávají přes `components/ui/CountUp.tsx` (`<CountUp value="400+" />`).

## Konvence

- Formuláře: `useActionState` + `<form action={formAction}>`, žádný `onSubmit`. Stav je `ActionResponse<T>` z `@/types`. Toast řeší `useActionToast`. Chyby se zobrazují u polí a po chybě se vracejí `inputs`, aby hodnoty ve formuláři zůstaly.
- Každé nové pole ve formuláři musí být i ve schématu a v akci, jinak se hodnota ztratí.
- Ceny se formátují jako „4 350 000 Kč“ (`lib/format.ts`).
- Stránkování výpisů je přes `?strana=`.
- Mapa je Google embed podle adresy. GPS ze Sanity se nepoužívají, protože jsou chybné.
- Tailwind: `app/globals.css` má explicitní `@source` pro `app` a `components`, protože jinak nenacházel třídy v `app/(pages)`.
- Server akce mají `bodySizeLimit: "11mb"` kvůli životopisu do 10 MB (`next.config.ts`).
- Animace: při scrollu `data-reveal` (zdola), `data-reveal="fade"`, `="left"`/`="right"` (z boku, jen od lg), `="image"` (na rámeček s `overflow-hidden`, fotka se usadí). Sourozenci se automaticky řadí se zpožděním. Hero při načtení: `motion-safe:animate-fade-up` / `animate-fade-in` / `animate-hero-zoom`. CSS je v `app/globals.css`, při omezení pohybu se nic neanimuje.
- Komentáře a texty v UI jsou česky.

## Ověření

`npx tsc --noEmit`, `npm run lint`, `npm run build`. Vizuálně porovnat s Figmou na 1440 a 390 px.

## Env

`FROM_EMAIL`, `FROM_EMAIL_PASSWORD` (Gmail app password), `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `SANITY_API_READ_TOKEN`, `NEXT_PUBLIC_SITE_URL`.
