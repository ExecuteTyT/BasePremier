import { defineField, defineType } from "sanity";

export const serviceSchema = defineType({
  name: "service",
  title: "Услуга",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Название услуги",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Категория",
      type: "string",
      options: {
        list: [
          { title: "Парикмахерский зал", value: "barbershop" },
          { title: "Комплексные услуги", value: "combo" },
          { title: "Ногтевой зал Fresh Hands", value: "nails" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Длительность (мин)",
      type: "number",
      validation: (Rule) => Rule.required().min(10).max(240),
    }),
    defineField({
      name: "priceFrom",
      title: "Цена от (₽)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "priceTo",
      title: "Цена до (₽)",
      type: "number",
      description: "Оставьте пустым, если цена фиксированная",
    }),
    defineField({
      name: "priceFrom_flag",
      title: "Показывать «от»",
      type: "boolean",
      description: "Например: «от 1 600 ₽» — когда нет верхней границы",
      initialValue: false,
    }),
    defineField({
      name: "note",
      title: "Примечание",
      type: "string",
      description: "Например: «5–10 лет», «только гигиена»",
    }),
    defineField({
      name: "order",
      title: "Порядок в списке",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "По категории и порядку",
      name: "categoryOrder",
      by: [
        { field: "category", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "category", priceFrom: "priceFrom", priceTo: "priceTo" },
    prepare({ title, subtitle, priceFrom, priceTo }) {
      const labels: Record<string, string> = {
        barbershop: "Парикмахерский зал",
        combo: "Комплекс",
        nails: "Ногтевой зал",
      };
      const price = priceTo ? `${priceFrom}–${priceTo} ₽` : `${priceFrom} ₽`;
      return { title, subtitle: `${labels[subtitle] ?? subtitle} · ${price}` };
    },
  },
});
