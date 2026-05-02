import { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("BASE Premier")
    .items([
      S.listItem()
        .title("Мастера")
        .icon(() => "✂️")
        .child(S.documentTypeList("barber").title("Мастера")),

      S.listItem()
        .title("Статьи журнала")
        .icon(() => "📝")
        .child(S.documentTypeList("article").title("Статьи")),

      S.listItem()
        .title("Услуги и прайс")
        .icon(() => "💰")
        .child(S.documentTypeList("service").title("Услуги")),

      S.listItem()
        .title("Причёски")
        .icon(() => "💈")
        .child(S.documentTypeList("hairstyle").title("Причёски")),

      S.divider(),

      S.listItem()
        .title("Настройки сайта")
        .icon(() => "⚙️")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings").title("Настройки"),
        ),
    ]);
