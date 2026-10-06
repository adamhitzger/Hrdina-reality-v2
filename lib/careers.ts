// Figma: Kariéra → Koho hledáme (94:1113)
export const roles = [
  {
    slug: "makler",
    tag: "HPP i IČO",
    title: "Realitní makléř / makléřka",
    text: "Máte za sebou první obchody a chcete kancelář, která vám dá zázemí, marketing a jméno v regionu.",
  },
  {
    slug: "junior",
    tag: "Bez praxe",
    title: "Junior makléř / makléřka",
    text: "Začnete po boku zkušeného makléře. Naučíme vás ocenění, prohlídky, vyjednávání i smlouvy.",
  },
  {
    slug: "asistent",
    tag: "Částečný úvazek",
    title: "Asistent / asistentka kanceláře",
    text: "Držíte kancelář v chodu — kalendář prohlídek, inzerce, podklady pro smlouvy a první kontakt s klienty.",
  },
  {
    slug: "tipar",
    tag: "Spolupráce",
    title: "Tipař / doporučitel",
    text: "Víte o někom, kdo prodává? Za doporučení, ze kterého vznikne obchod, dostanete odměnu.",
  },
];

export const positions = roles.map((r) => r.title);
