import type { Metadata } from "next";

import { TryOnSection } from "@/components/sections/TryOnSection";

export const metadata: Metadata = {
  title: "Примерка стрижки онлайн — BASE Premier Казань",
  description:
    "Загрузите фото — ИИ подберёт образ из каталога барбершопа BASE Premier и покажет результат до визита. Шаляпина 26, Казань.",
  alternates: {
    canonical: "https://basepremier.ru/try-on",
  },
  openGraph: {
    title: "Примерка стрижки онлайн — BASE Premier",
    description: "Загрузите фото и посмотрите, как вы будете выглядеть с разными стрижками.",
    url: "https://basepremier.ru/try-on",
    siteName: "BASE Premier",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "https://basepremier.ru/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "BASE Premier — виртуальная примерка стрижки",
      },
    ],
  },
};

export default function TryOnPage() {
  return (
    <main id="main">
      <TryOnSection />
    </main>
  );
}
