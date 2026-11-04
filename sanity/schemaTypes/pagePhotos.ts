import { defineField, defineType } from "sanity"

// Fotky statických stránek. Každá stránka má jeden dokument s pevným _id (viz `pagePhotoDocs`),
// Studio je ukazuje jako singletony v sekci „Fotky stránek“. Když fotka chybí, web použije soubor z public/images.

const photo = (name: string, title: string, description?: string) =>
    defineField({
        name,
        title,
        description,
        type: "image",
        validation: (rule) => rule.required(),
    })

const HERO_HINT = "Široká fotka na šířku, aspoň 1920 px. Přes levou část leží tmavý přechod s nadpisem."

export const homePhotosType = defineType({
    name: "homePhotos",
    title: "Fotky – Homepage",
    type: "document",
    fields: [
        photo("hero", "Úvodní fotka (hero)", HERO_HINT),
        photo("tileAbout", "Dlaždice „Kdo jsme“", "Sekce „Provázíme vás domů“, první dlaždice."),
        photo("tileReviews", "Dlaždice „Zkušenosti našich klientů“", "Sekce „Provázíme vás domů“, druhá dlaždice."),
        photo("tileSold", "Dlaždice „Zrealizované obchody“", "Sekce „Provázíme vás domů“, třetí dlaždice."),
        photo("about", "Sekce „O nás“", "Tmavomodrý pás, fotka vlevo."),
        photo("career", "Sekce „Kariéra“", "Tmavomodrá karta „Máte na víc?“, fotka vpravo."),
    ],
    preview: { prepare: () => ({ title: "Homepage" }) },
})

export const propertiesPhotosType = defineType({
    name: "propertiesPhotos",
    title: "Fotky – Nemovitosti",
    type: "document",
    fields: [photo("hero", "Úvodní fotka (hero)", HERO_HINT)],
    preview: { prepare: () => ({ title: "Nemovitosti" }) },
})

export const aboutPhotosType = defineType({
    name: "aboutPhotos",
    title: "Fotky – O nás",
    type: "document",
    fields: [
        photo("hero", "Úvodní fotka (hero)", HERO_HINT),
        photo("story", "Sekce „Náš příběh“", "Fotka vedle textu příběhu."),
    ],
    preview: { prepare: () => ({ title: "O nás" }) },
})

export const contactPhotosType = defineType({
    name: "contactPhotos",
    title: "Fotky – Kontakt",
    type: "document",
    fields: [photo("hero", "Úvodní fotka (hero)", HERO_HINT)],
    preview: { prepare: () => ({ title: "Kontakt" }) },
})

export const soldPhotosType = defineType({
    name: "soldPhotos",
    title: "Fotky – Realizované prodeje",
    type: "document",
    fields: [photo("hero", "Úvodní fotka (hero)", HERO_HINT)],
    preview: { prepare: () => ({ title: "Realizované prodeje" }) },
})

// _id === _type, ať se dokument dá dohledat bez dotazu a nejde ho založit dvakrát
export const pagePhotoDocs = [
    { type: "homePhotos", title: "Homepage", path: "/" },
    { type: "propertiesPhotos", title: "Nemovitosti", path: "/nemovitosti" },
    { type: "aboutPhotos", title: "O nás", path: "/o-nas" },
    { type: "contactPhotos", title: "Kontakt", path: "/kontakt" },
    { type: "soldPhotos", title: "Realizované prodeje", path: "/realizovane-prodeje" },
] as const

export const pagePhotoTypes: string[] = pagePhotoDocs.map((d) => d.type)
