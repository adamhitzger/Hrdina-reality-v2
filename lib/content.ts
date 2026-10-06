import type { StaticImageData } from "next/image";

import photoFlowers from "@/public/images/photo-flowers.jpg";
import photoMagazine from "@/public/images/photo-magazine.jpg";
import photoOffice from "@/public/images/photo-office.jpg";

// Statické texty z Figmy (Hrdina reality v3523). Pro obsah ze Sanity viz sanity/lib/queries.ts.

export const services = [
  {
    title: "Prodej nemovitosti",
    text: "Nastavíme cenu podle reálných prodejů v okolí, připravíme dům na focení a dovedeme obchod až ke katastru.",
    bullets: ["Odhad tržní ceny zdarma", "Profesionální foto a home staging", "Právní servis a advokátní úschova"],
  },
  {
    title: "Pronájem",
    text: "Najdeme nájemníka, kterého si sami prověříme. Vy dostanete smlouvu, protokol a klid na práci.",
    bullets: ["Prověření nájemníka", "Nájemní smlouva na míru", "Předání a předávací protokol"],
  },
  {
    title: "Výkup za hotové",
    text: "Když potřebujete peníze rychle. Vykoupíme nemovitost i s dluhy nebo exekucí — bez čekání na kupce.",
    bullets: ["Nabídka do 48 hodin", "Vyplacení do 14 dnů", "Řešíme i exekuce a zástavy"],
  },
];

export const aboutTiles: { title: string; text: string; href: string; image: StaticImageData }[] = [
  { title: "O nás", text: "Kdo za Hrdina Reality stojí a proč nám klienti věří už 19 let.", href: "/o-nas", image: photoFlowers },
  { title: "Recenze", text: "Co říkají lidé, kterým jsme pomohli s prodejem nebo koupí.", href: "/recenze", image: photoOffice },
  {
    title: "Realizované prodeje",
    text: "Nemovitosti, které jsme prodali — a za jaké ceny.",
    href: "/realizovane-prodeje",
    image: photoMagazine,
  },
];

// Ve Figmě má text jen první otázka – ostatní odpovědi je potřeba zkontrolovat
export const faq = [
  {
    q: "Jak probíhá prodej nemovitosti přes realitní kancelář?",
    a: "Začneme nezávaznou schůzkou přímo u vás. Projdeme nemovitost, řekneme si cíl i termín a navrhneme cenu podle reálných prodejů v okolí. Pak nemovitost nafotíme, připravíme inzerát a spustíme nabídku. Prohlídky vodíme my, vyjednáváme za vás a celý obchod dotáhneme přes advokátní úschovu až k převodu na katastru.",
  },
  {
    q: "Kolik stojí služby realitní kanceláře?",
    a: "Odměna se odvíjí od typu nemovitosti a rozsahu služeb. Přesnou částku vám řekneme hned na první schůzce, ještě než cokoli podepíšete.",
  },
  {
    q: "Můžu prodávat nemovitost i bez realitky?",
    a: "Samozřejmě. S námi ale nemusíte řešit ocenění, inzerci, prohlídky, vyjednávání ani smlouvy a úschovu — to vše zařídíme za vás.",
  },
  {
    q: "Pomůžete mi s odhadem ceny nemovitosti?",
    a: "Ano. Odhad tržní ceny připravíme zdarma a nezávazně podle skutečných prodejů v okolí.",
  },
  {
    q: "Zajišťujete i právní servis a smlouvy?",
    a: "Ano. Smlouvy připravuje náš právní servis a peníze jdou přes advokátní úschovu až do převodu na katastru.",
  },
  {
    q: "Jak dlouho trvá, než se nemovitost prodá?",
    a: "Záleží na typu, lokalitě a ceně. Když je cena nastavená podle trhu, prodáváme obvykle v řádu týdnů.",
  },
  {
    q: "Nabízíte své služby pouze na Vysočině?",
    a: "Těžiště naší práce je v Havlíčkově Brodě a na Vysočině, kde trh dobře známe. Zavolejte a domluvíme se i na nemovitosti mimo region.",
  },
];

export const soldStats = [
  { value: "400+", label: "prodaných nemovitostí od roku 2007" },
  { value: "38 dní", label: "průměrná doba prodeje" },
  { value: "98 %", label: "z nabídkové ceny v průměru dosaženo" },
];

export const values = [
  {
    title: "Cena podle reality, ne podle přání",
    text: "Řekneme vám číslo, za které se nemovitost opravdu prodá — i když je nižší, než jste čekali. Přestřelená cena stojí tři měsíce navíc.",
  },
  {
    title: "Jeden člověk od začátku do konce",
    text: "Žádné předávání mezi odděleními. Kdo si vezme zakázku, ten ji dotáhne až k podpisu na katastru.",
  },
  {
    title: "Papíry řešíme my, ne vy",
    text: "Smlouvy, úschova, energetický štítek, katastr. Vy přijdete podepsat a převzít peníze.",
  },
];

export const processSteps = [
  { title: "Nezávazná schůzka", text: "Projdeme nemovitost, řekneme si cíl i termín. Zdarma a bez závazku." },
  { title: "Cena a příprava", text: "Nastavíme cenu podle reálných prodejů, nafotíme a napíšeme inzerát." },
  { title: "Prohlídky a jednání", text: "Vybíráme zájemce, vodíme prohlídky a vyjednáváme cenu za vás." },
  { title: "Podpis a katastr", text: "Smlouvy, advokátní úschova, převod na katastru a předání klíčů." },
];

export const cultureStats = [
  { value: "19 let", label: "v realitách — od prvních obchodů v Austrálii po vlastní kancelář" },
  { value: "3", label: "makléři v týmu, každý s vlastními klienty a zakázkami" },
  { value: "4×", label: "na stupních vítězů RE/MAX Well, z toho 2× nejlepší makléř" },
  { value: "1", label: "kancelář přímo na Havlíčkově náměstí v Havlíčkově Brodě" },
];

export const benefits = [
  {
    title: "Jméno, kterému se věří",
    text: "19 let v regionu znamená, že lidé k nám chodí sami. Nezačínáte od nuly, ale s kontakty kanceláře.",
  },
  {
    title: "Zaučení v praxi",
    text: "Žádná školení z videa. Chodíte s námi na schůzky, prohlídky i k podpisům, dokud si nebudete jistí.",
  },
  {
    title: "Zázemí kanceláře",
    text: "Kancelář na náměstí, smlouvy přes advokátní úschovu, právní servis a hotové šablony dokumentů.",
  },
  { title: "Marketing za vás", text: "Profesionální fotky, inzerce na hlavních portálech a sociální sítě řešíme centrálně." },
  { title: "Prostor růst", text: "Od junior makléře k vlastním zakázkám a vlastnímu týmu. Tempo si určujete sami." },
  {
    title: "Rodinná atmosféra",
    text: "Jsme malý tým. Znáte se se všemi, pomáháte si a za majitelem můžete kdykoli přijít.",
  },
];

export const applicationSteps = [
  { title: "Ozveme se", text: "Do tří pracovních dnů vám zavoláme nebo napíšeme." },
  { title: "Schůzka u kávy", text: "Probereme, co vás láká, co umíte a co byste se chtěli naučit." },
  { title: "Den v kanceláři", text: "Přijdete se podívat, jak u nás vypadá běžný pracovní den." },
];

// Kontakty makléřů nejsou v Sanity – ze zadání Figmy / existujících e-mailů
export const agentContacts: Record<string, { phone?: string; email?: string }> = {
  "Lukáš Hrdina": { phone: "+420 773 498 424", email: "lukas.hrdina@hrdinareality.cz" },
};
