import { defineField, defineType } from "sanity";

export const hairstyleSchema = defineType({
  name: "hairstyle",
  title: "Причёска",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Название",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Фото",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Alt-текст",
          type: "string",
          description: "Для SEO и скрин-ридеров",
        }),
      ],
    }),
    defineField({
      name: "type",
      title: "Тип стрижки",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Fade (фейд)", value: "fade" },
          { title: "Taper (тейпер)", value: "taper" },
          { title: "Undercut (андеркат)", value: "undercut" },
          { title: "Pompadour (помпадур)", value: "pompadour" },
          { title: "Textured (текстурная)", value: "textured" },
          { title: "Slick back (слик-бэк)", value: "slick_back" },
          { title: "Buzz cut (баззкат)", value: "buzz_cut" },
          { title: "Crop (кроп)", value: "crop" },
          { title: "Классика", value: "classic" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "faceShapes",
      title: "Тип лица (для AI-рекомендаций)",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Овальное", value: "oval" },
          { title: "Круглое", value: "round" },
          { title: "Квадратное", value: "square" },
          { title: "Вытянутое", value: "oblong" },
          { title: "Ромбовидное", value: "diamond" },
          { title: "Сердцевидное", value: "heart" },
          { title: "Треугольное", value: "triangle" },
        ],
      },
      description: "Подходящие типы лица — используется в AI-квизе",
    }),
    defineField({
      name: "styleTags",
      title: "Теги стиля (для AI-рекомендаций)",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Деловой", value: "business" },
          { title: "Повседневный", value: "casual" },
          { title: "Классический", value: "classic" },
          { title: "Современный", value: "modern" },
          { title: "Смелый", value: "bold" },
          { title: "Минималистичный", value: "minimal" },
          { title: "Для густых волос", value: "thick_hair" },
          { title: "Для тонких волос", value: "thin_hair" },
          { title: "Для кудрявых волос", value: "curly_hair" },
          { title: "Низкий уход", value: "low_maintenance" },
          { title: "Высокий уход", value: "high_maintenance" },
        ],
      },
      description: "Стилевые атрибуты — используется в AI-квизе и фильтрации",
    }),
    defineField({
      name: "description",
      title: "Описание",
      type: "text",
      rows: 3,
      description: "1–2 предложения о технике и результате",
    }),
    defineField({
      name: "order",
      title: "Порядок в галерее",
      type: "number",
      description: "Меньше — выше",
    }),
  ],
  orderings: [
    {
      title: "По порядку (умолч.)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "По типу",
      name: "typeAsc",
      by: [{ field: "type", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "type", media: "photo" },
    prepare({ title, subtitle, media }) {
      const labels: Record<string, string> = {
        fade: "Fade",
        taper: "Taper",
        undercut: "Undercut",
        pompadour: "Pompadour",
        textured: "Textured",
        slick_back: "Slick back",
        buzz_cut: "Buzz cut",
        crop: "Crop",
        classic: "Классика",
      };
      return { title, subtitle: labels[subtitle] ?? subtitle, media };
    },
  },
});
