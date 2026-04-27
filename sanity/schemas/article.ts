import { defineField, defineType } from "sanity";

export const articleSchema = defineType({
  name: "article",
  title: "Статья журнала",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Заголовок",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Краткое описание",
      type: "text",
      rows: 3,
      description: "140–160 символов — используется в карточке и meta description",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "category",
      title: "Категория",
      type: "string",
      options: {
        list: [
          { title: "Гид", value: "guide" },
          { title: "Уход", value: "care" },
          { title: "Цена", value: "price" },
          { title: "Лайфстайл", value: "lifestyle" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Обложка",
      type: "image",
      options: { hotspot: true },
      description: "Рекомендуемый размер: 1200×675 (16:9)",
    }),
    defineField({
      name: "content",
      title: "Содержание статьи",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Обычный текст", value: "normal" },
            { title: "Заголовок H2", value: "h2" },
            { title: "Заголовок H3", value: "h3" },
            { title: "Цитата", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Жирный", value: "strong" },
              { title: "Курсив", value: "em" },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "caption",
              title: "Подпись",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Дата публикации",
      type: "datetime",
      options: { dateFormat: "YYYY-MM-DD", timeFormat: "HH:mm" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readMinutes",
      title: "Время чтения (мин)",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(60),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "cover" },
    prepare({ title, subtitle, media }) {
      const labels: Record<string, string> = {
        guide: "Гид",
        care: "Уход",
        price: "Цена",
        lifestyle: "Лайфстайл",
      };
      return { title, subtitle: labels[subtitle] ?? subtitle, media };
    },
  },
});
