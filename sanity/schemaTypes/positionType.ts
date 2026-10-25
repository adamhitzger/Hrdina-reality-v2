import { defineType, defineField } from "sanity"

// Kariéra → Otevřené pozice. Pozice se zobrazují na /kariera a ve výběru ve formuláři přihlášky.
export const positionType = defineType({
    name: "position",
    title: "Otevřené pozice",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Název pozice",
            type: "string",
            description: "Např. „Realitní makléř / makléřka“. Stejný text uvidí uchazeč ve formuláři.",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Adresa (slug)",
            type: "slug",
            description: "Používá se v odkazu „Mám zájem“ (/kariera?pozice=…). Vygenerujte z názvu.",
            options: { source: "title", maxLength: 60 },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "tag",
            title: "Štítek",
            type: "string",
            description: "Krátký údaj nad názvem, např. „HPP i IČO“, „Bez praxe“, „Částečný úvazek“.",
            validation: (rule) => rule.max(30),
        }),
        defineField({
            name: "text",
            title: "Popis",
            type: "text",
            rows: 3,
            description: "Jedna až dvě věty, max. 200 znaků.",
            validation: (rule) => rule.required().max(200),
        }),
        defineField({
            name: "employmentType",
            title: "Typ úvazku",
            type: "array",
            of: [{ type: "string" }],
            description: "Pro Google pro Jobs. Lze vybrat víc možností.",
            options: {
                list: [
                    { title: "Plný úvazek (HPP)", value: "FULL_TIME" },
                    { title: "Částečný úvazek", value: "PART_TIME" },
                    { title: "Spolupráce na IČO", value: "CONTRACTOR" },
                    { title: "Brigáda / DPP", value: "TEMPORARY" },
                    { title: "Stáž", value: "INTERN" },
                    { title: "Jiné (provize, doporučení)", value: "OTHER" },
                ],
                layout: "grid",
            },
        }),
        defineField({
            name: "datePosted",
            title: "Datum zveřejnění",
            type: "date",
            description: "Když zůstane prázdné, použije se datum poslední úpravy. Google inzerát ukazuje 3 měsíce od tohoto data.",
        }),
        defineField({
            name: "jobPosting",
            title: "Inzerovat v Google pro Jobs",
            type: "boolean",
            description: "Vypněte u nabídek, které nejsou pracovní místo (např. tipař za provizi). Na webu se zobrazí dál.",
            initialValue: true,
        }),
        defineField({
            name: "order",
            title: "Pořadí na stránce",
            type: "number",
            description: "Nižší číslo = víc vlevo.",
        }),
        defineField({
            name: "active",
            title: "Zobrazit na webu",
            type: "boolean",
            description: "Vypněte, když je pozice obsazená. Nemusíte ji mazat.",
            initialValue: true,
        }),
    ],
    orderings: [{ title: "Pořadí na stránce", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
    preview: {
        select: { title: "title", tag: "tag", active: "active" },
        prepare: ({ title, tag, active }) => ({
            title,
            subtitle: [tag, active === false ? "skryto" : null].filter(Boolean).join(" · "),
        }),
    },
})
