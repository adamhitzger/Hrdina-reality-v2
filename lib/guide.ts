// Průvodce světem nemovitostí (PDF v assets/pruvodce-svetem-nemovitosti.pdf, 10 stran).
// Stránka /pruvodce ukazuje strany 1–2 přepsané do HTML, celé PDF chodí e-mailem (lib/actions.ts → sendGuide).
// Ilustrace jsou vytažené z PDF (public/images/pruvodce). Při nové verzi PDF zkontrolovat i texty tady.

export const GUIDE_PATH = "/pruvodce";
export const GUIDE_TITLE = "Váš průvodce světem nemovitostí";
export const GUIDE_FILENAME = "Hrdina_Reality_pruvodce_svetem_nemovitosti.pdf";
export const GUIDE_PAGES = 10;

// Strana 2 – rozcestník
export const guideIntro = [
  "Prodej, koupě nebo pronájem nemovitosti patří mezi důležitá životní rozhodnutí. Často jde o značné finanční částky, smluvní závazky i změny, které ovlivní každodenní život.",
  "Připravili jsme pro vás přehled toho nejdůležitějšího, co byste měli vědět, než se do realitního obchodu pustíte. Srozumitelně, prakticky a bez zbytečně složitých výrazů.",
];

export const guideCards = [
  { n: 1, title: "Prodáváte nemovitost", lead: "Připravte se na prodej, který dává smysl.", image: "/images/pruvodce/prodavate.webp" },
  { n: 2, title: "Kupujete nemovitost", lead: "Nekupujte jen očima. Prověřte i to, co není vidět.", image: "/images/pruvodce/kupujete.webp" },
  { n: 3, title: "Pronajímáte nemovitost", lead: "Dobrý nájem začíná správným nastavením podmínek.", image: "/images/pruvodce/pronajimate.webp" },
  { n: 4, title: "Hledáte nájem", lead: "Najděte bydlení, ve kterém se budete cítit dobře.", image: "/images/pruvodce/hledate-najem.webp" },
];

// Co je ve zbytku PDF (strany 3–10), ukazuje se u formuláře a v e-mailu
export const guideChapters = [
  { n: 1, title: "Prodáváte nemovitost?", points: "Správná cena, první dojem, dokumenty, prověření kupujícího a jak vybrat realitní kancelář" },
  { n: 2, title: "Kupujete nemovitost?", points: "Skutečný rozpočet, právní a technický stav, smlouvy a život po koupi" },
  { n: 3, title: "Pronajímáte nemovitost?", points: "Přiměřené nájemné, nájemní smlouva, výběr nájemce, jistota a předání" },
  { n: 4, title: "Hledáte nájem?", points: "Rozpočet, prohlídka, bezpečná platba, smlouva a řádné předání" },
  { n: 5, title: "Pět zásad, které platí vždy", points: "Co mít písemně, co ověřit a kdy nespěchat" },
];
