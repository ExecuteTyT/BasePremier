import { defineField, defineType } from "sanity";

export const barberSchema = defineType({
  name: "barber",
  title: "Мастер",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Имя",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Должность",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "reviews",
      title: "Количество отзывов",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "photo",
      title: "Фото",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "quote",
      title: "Цитата мастера",
      type: "string",
      description: "Одна фраза, отражающая подход к работе",
    }),
    defineField({
      name: "bio",
      title: "Биография",
      type: "text",
      rows: 5,
      description: "3–5 предложений об опыте и подходе к работе",
    }),
    defineField({
      name: "techniques",
      title: "Любимые техники",
      type: "array",
      of: [{ type: "string" }],
      description: "2–4 техники через Enter",
    }),
    defineField({
      name: "tags",
      title: "Специализация",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Старший мастер", value: "senior" },
          { title: "Парикмахер", value: "barber" },
          { title: "Ногтевой сервис", value: "nails" },
        ],
      },
    }),
    defineField({
      name: "isBestEmployee",
      title: "Лучший сотрудник месяца",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isSenior",
      title: "Старший мастер",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Порядок на странице",
      type: "number",
      description: "Меньше — выше в списке",
    }),
  ],
  orderings: [
    {
      title: "По порядку (умолч.)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "По отзывам",
      name: "reviewsDesc",
      by: [{ field: "reviews", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
