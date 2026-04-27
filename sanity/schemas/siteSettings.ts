import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Настройки сайта",
  type: "document",
  fields: [
    defineField({
      name: "phone",
      title: "Телефон",
      type: "string",
      description: "Формат: +7 (917) 918-38-77",
      initialValue: "+7 (917) 918-38-77",
    }),
    defineField({
      name: "address",
      title: "Адрес",
      type: "string",
      initialValue: "ул. Шаляпина, 26, 1 этаж, Казань",
    }),
    defineField({
      name: "hours",
      title: "Часы работы",
      type: "string",
      initialValue: "Ежедневно 10:00–21:00",
    }),
    defineField({
      name: "rating",
      title: "Рейтинг на Яндекс.Картах",
      type: "number",
      initialValue: 5.0,
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: "reviewCount",
      title: "Количество отзывов на Яндекс.Картах",
      type: "number",
      initialValue: 394,
    }),
    defineField({
      name: "telegramLink",
      title: "Ссылка Telegram",
      type: "url",
      initialValue: "https://t.me/+79179183877",
    }),
    defineField({
      name: "whatsappLink",
      title: "Ссылка WhatsApp",
      type: "url",
      initialValue: "https://wa.me/79179183877",
    }),
    defineField({
      name: "instagramLink",
      title: "Ссылка Instagram",
      type: "url",
      initialValue: "https://www.instagram.com/basepremier/",
    }),
  ],
  preview: {
    select: { title: "address" },
    prepare() {
      return { title: "Настройки сайта" };
    },
  },
});
