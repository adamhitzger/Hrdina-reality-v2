import { defineArrayMember, defineField, defineType } from "sanity"

export const postType = defineType({
    name: "post",
    title: "Blog",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Nadpis",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "URL",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "publishedAt",
            title: "Datum publikace",
            type: "date",
            initialValue: () => new Date().toISOString().slice(0, 10),
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "category",
            title: "Kategorie",
            type: "string",
            options: {
                list: ["Prodej", "Koupě", "Pronájem", "Právo", "Financování", "Novinky"],
                layout: "dropdown",
            },
        }),
        defineField({
            name: "author",
            title: "Autor",
            description: "Když nebude vyplněný, zobrazí se Lukáš Hrdina.",
            type: "reference",
            to: [{ type: "staff" }],
        }),
        defineField({
            name: "excerpt",
            title: "Perex",
            description: "Krátké shrnutí do výpisu článků a pro Google.",
            type: "text",
            rows: 3,
            validation: (rule) => rule.max(220),
        }),
        defineField({
            name: "image",
            title: "Hlavní fotka",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "body",
            title: "Text článku",
            type: "array",
            of: [
                defineArrayMember({ type: "block" }),
                defineArrayMember({ type: "image", options: { hotspot: true } }),
            ],
        }),
    ],
    orderings: [
        { title: "Nejnovější", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
    ],
    preview: {
        select: { title: "title", subtitle: "publishedAt", media: "image" },
    },
})
