import { site } from "./site";

/**
 * Zásady ochrany osobních údajů (`/ochrana-osobnich-udaju`). Struktura a formulace jsou převzaté
 * z textu schváleného advokátem pro KONSTANTA (`~/NEXTJS/new-konstanta/lib/privacy-content.ts`),
 * upravené na realitní kancelář a na to, co tento web skutečně dělá (bez reklamních cookies a měření).
 * Při přidání analytiky nebo reklam se musí text i web (cookie lišta) upravit.
 */

export const PRIVACY_PATH = "/ochrana-osobnich-udaju";

// Účinnost zásad – při změně textu posunout
export const privacyEffectiveFrom = "6. 10. 2026";

export type PrivacyBlock =
  | { type: "p"; text: string }
  | { type: "list"; intro?: string; items: string[] }
  | { type: "forms" };

export type PrivacySection = { id?: string; heading: string; blocks: PrivacyBlock[] };

const { company, ico, seat, register, privacyEmail } = site.legal;

// Co web skutečně zpracovává (podklad v TODO.md, sekce Ochrana osobních údajů)
export const privacyForms = [
  {
    form: "Kontaktní formulář",
    data: "jméno a příjmení, e-mail, telefon, text zprávy",
    purpose: "odpověď na Váš dotaz a případné jednání o našich službách",
    basis: "jednání o smlouvě na Vaši žádost (čl. 6 odst. 1 písm. b) Nařízení GDPR) a oprávněný zájem odpovědět na dotaz (písm. f)",
    retention: "po dobu vyřízení dotazu, nejdéle 3 roky od poslední komunikace",
  },
  {
    form: "Poptávka nemovitosti",
    data: "jméno a příjmení, e-mail, telefon, text zprávy a nemovitost, o kterou máte zájem",
    purpose: "domluva prohlídky a jednání o koupi nebo nájmu konkrétní nemovitosti",
    basis: "jednání o smlouvě na Vaši žádost (čl. 6 odst. 1 písm. b) Nařízení GDPR)",
    retention: "po dobu jednání o nemovitosti, nejdéle 3 roky od poslední komunikace",
  },
  {
    form: "Přihláška na Kariéře",
    data: "jméno a příjmení, e-mail, telefon, pozice, odkud jste se o nás dozvěděli, text o Vás a životopis s údaji, které v něm uvedete",
    purpose: "výběrové řízení na pozici, o kterou se ucházíte",
    basis: "Váš souhlas (čl. 6 odst. 1 písm. a) Nařízení GDPR), který můžete kdykoliv odvolat",
    retention: "do konce výběrového řízení, nejdéle 6 měsíců; u přijatých uchazečů podle pracovněprávních předpisů",
  },
];

export const privacySections: PrivacySection[] = [
  {
    heading: "Úvod",
    blocks: [
      {
        type: "p",
        text: "Ochrana Vašeho soukromí a Vašich údajů je pro nás zcela zásadní, a proto dbáme jak na bezpečnost našich interních systémů, tak na výběr našich partnerů, a to v souladu s nařízením Evropského parlamentu a Rady (EU) č. 2016/679 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů a o volném pohybu těchto údajů (dále jen „Nařízení GDPR“).",
      },
    ],
  },
  {
    id: "spravce",
    heading: "Kdo je správcem Vašich osobních údajů",
    blocks: [
      {
        type: "p",
        text: `Správcem Vašich osobních údajů je ${company}, se sídlem ${seat}, IČO ${ico}, ${register}, která provozuje realitní kancelář ${site.name} (${site.address.street}, ${site.address.postalCode} ${site.address.city}) a tento web.`,
      },
    ],
  },
  {
    id: "zpracovani",
    heading: "Jaké osobní údaje zpracováváme a proč",
    blocks: [
      {
        type: "p",
        text: "Osobní údaje zpracováváme jen tehdy, když nám je sami pošlete přes formulář na webu. Formuláře se odesílají e-mailem do naší kanceláře a na webu se nikam neukládají. Údaje nepoužíváme k marketingu, neposíláme newslettery a nikomu je neprodáváme.",
      },
      { type: "forms" },
      {
        type: "p",
        text: "Pokud mezi námi vznikne smlouva (zprostředkování prodeje, koupě nebo nájmu nemovitosti, případně pracovní poměr), zpracováváme Vaše údaje dále podle ní a podle právních předpisů, které nám ukládají je uchovávat, zejména daňových a účetních předpisů a zákona o některých opatřeních proti legalizaci výnosů z trestné činnosti.",
      },
      {
        type: "p",
        text: "Kdykoli navštívíte naše webové stránky, zaznamenávají se z bezpečnostních důvodů na server identifikační data (například IP adresa) a další informace (datum, čas, zhlédnutá stránka).",
      },
    ],
  },
  {
    heading: "Co když osobní údaje odmítnete poskytnout",
    blocks: [
      {
        type: "p",
        text: "Poskytnutí údajů je dobrovolné. Bez kontaktních údajů Vám ale nemůžeme odpovědět, domluvit prohlídku ani zařadit Vaši přihlášku do výběrového řízení.",
      },
    ],
  },
  {
    heading: "Po jakou dobu osobní údaje zpracováváme",
    blocks: [
      {
        type: "p",
        text: "Údaje z formulářů uchováváme po dobu uvedenou u každého formuláře výše, poté jsou zlikvidovány. Údaje ze smluv uchováváme po dobu trvání smlouvy a následně 5 let. Některé údaje jsou uchovávány na základě zákonných archivačních povinností, zejména dle daňových a účetních předpisů (lhůta 10 let).",
      },
    ],
  },
  {
    id: "prijemci",
    heading: "Kdo má přístup k údajům",
    blocks: [
      {
        type: "p",
        text: `V prvé řadě jsou osobní údaje zpracovávány společností ${company} a jejími pracovníky. Všechny osoby mající přístup k osobním údajům jsou zavázány k mlčenlivosti, a tento závazek trvá i po skončení jejich spolupráce.`,
      },
      {
        type: "p",
        text: `${company} dále jako správce pověřuje zpracováním osobních údajů další subjekty, tzv. zpracovatele. Zpracovatelem se rozumí každý subjekt, který má k osobním údajům přístup v rámci spolupráce s námi. Zpracovatelům předáváme pouze údaje, které nezbytně potřebují k zajištění svých služeb.`,
      },
      {
        type: "list",
        intro: "Mezi zpracovatele, které využíváme, patří:",
        items: [
          "Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irsko – e-mailová schránka (Gmail), do které přicházejí formuláře z webu",
          "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA – hosting webu, technicky zpracovává odeslané formuláře a vede krátkodobé provozní záznamy serveru (IP adresa, čas požadavku)",
        ],
      },
      {
        type: "p",
        text: "Někteří z těchto zpracovatelů mohou údaje zpracovávat i mimo Evropskou unii. Děje se tak na základě rozhodnutí Evropské komise o odpovídající ochraně (EU-U.S. Data Privacy Framework) nebo standardních smluvních doložek.",
      },
    ],
  },
  {
    id: "cookies",
    heading: "Cookies",
    blocks: [
      {
        type: "p",
        text: "Naše stránky nepoužívají analytické, reklamní ani remarketingové cookies a nesledují, co na nich děláte. Proto po Vás nežádáme souhlas s cookies.",
      },
      {
        type: "p",
        text: "Na detailu nemovitosti je vložená mapa Google Maps. Při jejím načtení společnost Google obdrží Vaši IP adresu a může ukládat vlastní cookies podle svých zásad (https://policies.google.com/privacy). Odkazy na Facebook a Instagram jsou obyčejné odkazy, dokud na ně nekliknete, nic se těmto službám neposílá. Používání cookies lze kdykoliv omezit v nastavení Vašeho internetového prohlížeče.",
      },
    ],
  },
  {
    id: "prava",
    heading: "Jaká jsou Vaše práva",
    blocks: [
      {
        type: "list",
        intro: `V souvislosti se zpracováním osobních údajů se můžete obrátit na ${company} a požadovat:`,
        items: [
          "Informace ohledně osobních údajů, které zpracováváme, ohledně účelu a povahy zpracování osobních údajů, včetně informace o případných příjemcích osobních údajů. Obecné informace o činnostech zpracování osobních údajů jsou obsaženy v těchto pravidlech.",
          "Přístup k údajům, které jste nám poskytli. V případě uplatnění tohoto práva Vám potvrdíme, zda a jaké konkrétní osobní údaje zpracováváme, a případně Vám tyto údaje zpřístupníme společně s informacemi o jejich zpracování.",
          "Opravu osobních údajů, pokud jsou jakkoli nepřesné nebo neúplné.",
          "Vysvětlení a odstranění závadného stavu (např. blokaci, opravu, doplnění či likvidaci osobních údajů), jestliže se domníváte, že zpracováváme osobní údaje v rozporu s ochranou Vašeho osobního a soukromého života nebo v rozporu s právními předpisy.",
          "Výmaz osobních údajů (tzv. právo být zapomenut) nebo jejich omezené zpracování, pokud již nejsou potřebné pro uvedené účely, nebo pokud již nemáme zákonný důvod osobní údaje zpracovávat, včetně případů, kdy s jejich dalším zpracováním nesouhlasíte.",
          "Přenesení automatizovaně zpracovávaných osobních údajů získaných na základě Vašeho souhlasu k jinému subjektu, kdy Vaše osobní údaje předáme v běžně používaném formátu Vám nebo jinému správci podle Vašeho přání.",
          "Námitku proti zpracování osobních údajů, které zpracováváme na základě oprávněného zájmu.",
          "Odvolání souhlasu se zpracováním údajů z přihlášky do výběrového řízení. Odvolání nemá vliv na zákonnost zpracování před jeho odvoláním.",
        ],
      },
      {
        type: "p",
        text: "Pokud se domníváte, že zpracováním dochází k porušení Nařízení GDPR, máte právo podat stížnost u Úřadu pro ochranu osobních údajů, Pplk. Sochora 27, 170 00 Praha 7 (www.uoou.gov.cz).",
      },
    ],
  },
  {
    heading: "Bezpečnost",
    blocks: [
      {
        type: "p",
        text: "Přijali jsme technická opatření, která zajišťují zabezpečení osobních údajů šifrováním přenosu dat na webu pomocí protokolu HTTPS, a zabezpečili Vaše osobní údaje v souladu s čl. 32 Nařízení GDPR.",
      },
      {
        type: "p",
        text: "Veškeré osobní údaje v elektronické formě jsou uloženy v systémech, k nimž mají přístup pouze osoby, které potřebují s osobními údaji bezprostředně nakládat pro účely uvedené v těchto pravidlech, a to pouze v nezbytném rozsahu. Přístup k těmto osobním údajům je chráněn heslem.",
      },
    ],
  },
  {
    id: "kontakt",
    heading: "Kontakt",
    blocks: [
      {
        type: "p",
        text: `S jakýmikoli připomínkami ohledně zpracování osobních údajů nebo v případě uplatnění svých práv se můžete obracet na společnost ${company} e-mailem na adresu ${privacyEmail}, telefonicky na čísle ${site.phone} nebo doporučeným dopisem na adresu sídla: ${company}, ${seat}. Odpovíme nejpozději do jednoho měsíce.`,
      },
    ],
  },
];
