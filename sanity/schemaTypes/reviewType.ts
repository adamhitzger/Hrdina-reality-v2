import { defineType, defineField } from "sanity"

export const reviewType = defineType({
    name: "review",
    title: "Recenze",
    type: "document",
    fields: [
        defineField({
            name: "review",
            title: "Text recenze",
            type: "text",
            rows: 5,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "image",
            title: "Fotka (osobně psaná recenze)",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "clients",
            title: "Jména klientů",
            type: "string",
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: { title: "clients", subtitle: "review", media: "image" },
    },
})
