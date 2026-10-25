import type { StaticImageData } from "next/image";

import photoFlowers from "@/public/images/photo-flowers.jpg";
import photoSold from "@/public/images/photo-sold.jpg";
import photoWindow from "@/public/images/photo-window.jpg";

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
    title: "Tržní odhady",
    text: "Když potřebujete peníze rychle. Vykoupíme nemovitost i s dluhy nebo exekucí — bez čekání na kupce.",
    bullets: ["Nabídka do 48 hodin", "Vyplacení do 14 dnů", "Řešíme i exekuce a zástavy"],
  },
];

export const aboutTiles: { title: string; text: string; href: string; image: StaticImageData }[] = [
  {
    title: "Kdo jsme",
    text: "Za každou nemovitostí stojí příběh. Za Hrdina Reality lidé. Seznamte se s námi a zjistěte, proč je osobní přístup základem naší práce už 19 let.",
    href: "/o-nas",
    image: photoFlowers,
  },
  {
    title: "Zkušenosti našich klientů",
    text: "Nejlépe za nás mluví naši klienti. Přečtěte si jejich zkušenosti s Hrdina Reality.",
    href: "/recenze",
    image: photoWindow,
  },
  {
    title: "Zrealizované obchody",
    text: "Naše výsledky mluví za nás. Podívejte se, co jsme prodali a za jaké ceny.",
    href: "/realizovane-prodeje",
    image: photoSold,
  },
];

// Odpovědi jsou z Figmy. Odstavce odděluje prázdný řádek.
export const faq = [
  {
    q: "Jak probíhá prodej nemovitosti s Hrdina Reality?",
    a: `Od prvního setkání až po úspěšný prodej.

Nejprve se potkáme. Buď u nás v kanceláři nebo přímo u vás, prohlédneme si nemovitost a probereme vaše představy i časové možnosti. Na základě reálných prodejů v okolí stanovíme vhodnou tržní cenu a připravíme strategii prodeje.

Zajistíme profesionální prezentaci, inzerci, prohlídky i vyjednávání se zájemci. Vy se nemusíte zabývat každým detailem – vše důležité zařídíme za vás.

Od první nabídky přes bezpečné právní vypořádání až po převod vlastnického práva na katastru. Váš prodej. Naše starost.`,
  },
  {
    q: "Kolik stojí služby realitní kanceláře?",
    a: "Výše odměny se stanovuje individuálně podle typu nemovitosti a rozsahu poskytovaných služeb. Veškeré podmínky vám transparentně představíme již při úvodní schůzce, abyste měli od začátku jasno v ceně i rozsahu naší spolupráce.",
  },
  {
    q: "Můžu prodávat nemovitost i bez realitní kanceláře?",
    a: `Ano, nemovitost můžete prodat i vlastními silami. Profesionální realitní servis vám však ušetří čas, pomůže minimalizovat rizika a zajistí, aby měl prodej jasný řád od prvního kroku až po předání nemovitosti.

V Hrdina Reality se postaráme o vše podstatné – od stanovení reálné tržní ceny a profesionální prezentace přes marketing, prohlídky a vyjednávání se zájemci až po smluvní dokumentaci a bezpečné vypořádání celé transakce.

Vy máte jistotu, že na prodej nejste sami. My hlídáme každý důležitý krok, abyste svou nemovitost prodali bezpečně, s klidem a za odpovídajících podmínek.`,
  },
  {
    q: "Pomůžete mi s odhadem ceny nemovitosti?",
    a: `Ano. Zpracujeme pro vás bezplatný a nezávazný odhad tržní hodnoty nemovitosti, který vychází z analýzy skutečně realizovaných prodejů v dané lokalitě a zohledňuje konkrétní vlastnosti i stav nemovitosti.

Získáte tak odborný a realistický podklad pro informované rozhodnutí o dalším postupu.

Správně stanovená cena je prvním krokem k úspěšnému prodeji.`,
  },
  {
    q: "Zajišťujete i právní servis a smlouvy?",
    a: "Ano. Veškerou smluvní dokumentaci zajišťuje náš právní servis. Kupní cena je uložena v bezpečné advokátní úschově a prodávajícímu je vyplacena po splnění sjednaných podmínek, v návaznosti na dokončení převodu vlastnického práva v katastru nemovitostí.",
  },
  {
    q: "Jak dlouho trvá, než se nemovitost prodá?",
    a: "Doba prodeje závisí na typu nemovitosti, lokalitě a správně nastavené ceně. Pokud cena odpovídá aktuální situaci na trhu, může být nemovitost prodána již během několika týdnů.",
  },
  {
    q: "Nabízíte své služby pouze na Vysočině?",
    a: "Naší hlavní oblastí působení je Havlíčkův Brod a celý Kraj Vysočina, kde díky dlouholetým zkušenostem důkladně známe místní trh i jeho specifika. Zkušenosti máme také s prodejem nemovitostí napříč Českou republikou i v zahraničí. Rádi s vámi proto probereme možnosti spolupráce bez ohledu na to, kde se vaše nemovitost nachází.",
  },
];

export const soldStats = [
  { value: "400+", label: "prodaných nemovitostí od roku 2007" },
  { value: "38 dní", label: "průměrná doba prodeje" },
  { value: "98 %", label: "z nabídkové ceny v průměru dosaženo" },
];

export const values = [
  {
    title: "Správná cena je základ úspěšného prodeje",
    text: "Řekneme vám otevřeně, za kolik lze vaši nemovitost reálně prodat. Vycházíme ze skutečných prodejů a znalosti místního trhu, ne z nereálných slibů. Správně nastavená cena šetří čas a pomáhá dosáhnout nejlepšího možného výsledku.",
  },
  {
    title: "Váš osobní makléř po celou dobu",
    text: "Od prvního setkání až po dokončení obchodu máte po svém boku jednoho osobního makléře. Člověka, který zná vaše potřeby, rozumí každému detailu a je vám po celou dobu k dispozici. Vaši důvěru bereme osobně – stejně jako odpovědnost za výsledek.",
  },
  {
    title: "Od smluv po katastr. Vše pod kontrolou",
    text: "Zajistíme smlouvy, advokátní úschovu i převod na katastru. Každý krok hlídáme s důrazem na právní jistotu a ochranu vašich peněz. Vy máte jistotu bezpečného obchodu a kupní cenu obdržíte podle sjednaných podmínek.",
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
    text: "19 let zkušeností a důvěry v regionu. Klienti nás znají a sami se na nás obracejí. U nás nezačínáte od nuly – získáváte zázemí zavedené kanceláře, její kontakty i dobré jméno.",
  },
  {
    title: "Zaučení v praxi",
    text: "Neučíte se z videí. Učíte se s námi v praxi. Od prvních schůzek přes prohlídky až po podpis smluv vás provázíme krok za krokem. Zkušenosti předáváme osobně, dokud si nebudete jistí v každé situaci.",
  },
  {
    title: "Zázemí kanceláře",
    text: "Zázemí zavedené kanceláře přímo na náměstí, kompletní právní servis, bezpečná advokátní úschova a připravené vzory dokumentů. Vše potřebné máte k dispozici, abyste se mohli soustředit na klienty a úspěšné obchody.",
  },
  {
    title: "Marketing za vás",
    text: "O profesionální prezentaci nemovitostí se postaráme za vás. Od kvalitních fotografií přes inzerci na hlavních realitních portálech až po sociální sítě. Vy se soustředíte na klienty, my vám pomáháme s marketingem.",
  },
  {
    title: "Prostor růst",
    text: "Od prvních zkušeností až po vlastní klienty, zakázky a tým. Podporujeme váš profesní růst a dáváme vám prostor rozvíjet se vlastním tempem, podle vašich ambicí a cílů.",
  },
  {
    title: "Rodinná atmosféra",
    text: "Zakládáme si na osobních vztazích a otevřené spolupráci. Známe se, pomáháme si a sdílíme zkušenosti. Kdykoli potřebujete radu nebo podporu, víte, za kým přijít – včetně majitele kanceláře.",
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
