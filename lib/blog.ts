import type { ArticleCard } from "@/sanity/lib/interfaces";

import { plural } from "./format";
import { defaultAuthor, siteUrl } from "./site";

// Články blogu jsou dokumenty „Podstránky“ (typ `page`) ze Sanity. Texty v nich jsou z části psané
// verzálkami a s „HRDINA Reality“, proto se nadpisy při zobrazení srovnávají (data ve Sanity zůstávají).

// „4 min čtení“ (200 slov za minutu)
export function postMeta(post: Pick<ArticleCard, "words">) {
  const minutes = Math.max(1, Math.round((post.words ?? 0) / 200));
  return `${minutes} min čtení`;
}

export function postAuthor() {
  return defaultAuthor;
}

// „0 článků“, „1 článek“, „3 články“, „12 článků“
export function postCount(n: number) {
  return plural(n, ["článek", "články", "článků"]);
}

// Jednotný zápis názvu kanceláře
export function fixBrand(text: string) {
  return text.replace(/hrdina\s+reality/gi, "Hrdina Reality");
}

// Nadpis psaný verzálkami → první písmeno velké, zbytek malý (i za „|“ v „DŮVOD č. 1 | RENOVACE …“)
export function headingCase(text: string) {
  const letters = text.replace(/[^\p{L}]/gu, "");
  const upper = letters.replace(/[^\p{Lu}]/gu, "").length;
  let out = text.replace(/\s+/g, " ").trim();
  if (letters.length > 3 && upper / letters.length > 0.7) {
    out = out
      .toLocaleLowerCase("cs")
      .replace(/(^|\|\s*)(\p{Ll})/gu, (_, pre: string, ch: string) => pre + ch.toLocaleUpperCase("cs"));
  }
  return fixBrand(out);
}

// Perex do výpisu a pro Google: popisek ze Sanity, jinak začátek prvního textu zkrácený na celé slovo
export function postExcerpt(post: Pick<ArticleCard, "overview" | "intro">, max = 180) {
  const source = (post.overview?.trim() || post.intro || "").replace(/\s+/g, " ").trim();
  if (source.length <= max) return fixBrand(source);
  const cut = source.slice(0, max);
  return `${fixBrand(cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:–-]+$/, ""))}…`;
}

// Tlačítka v Podstránkách míří na localhost, na homepage nebo na testovací odkazy. Zobrazí se jen
// ta, která vedou na konkrétní stránku tohoto webu; vrací relativní cestu.
export function internalHref(url?: string | null) {
  if (!url) return null;
  try {
    const u = new URL(url, siteUrl);
    const host = u.hostname.replace(/^www\./, "");
    const own = [new URL(siteUrl).hostname.replace(/^www\./, ""), "hrdinareality.cz", "localhost"];
    if (!own.includes(host)) return null;
    const path = u.pathname.replace(/^\/podstranky\//, "/blog/");
    return path === "/" ? null : `${path}${u.search}${u.hash}`;
  } catch {
    return null;
  }
}
