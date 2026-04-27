import { Metadata } from "next";

import { QuizFlow } from "@/components/sections/QuizFlow";
import { breadcrumbJsonLd } from "@/lib/seo/jsonLd";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Подбор стрижки — BASE Premier | Барбершоп Казань",
  description:
    "Четыре вопроса — и мы подберём мастера и услугу именно для вас. Запись онлайн в барбершопе BASE Premier на Шаляпина 26, Казань.",
  alternates: {
    canonical: "https://basepremier.ru/quiz",
  },
  openGraph: {
    title: "Подбор стрижки — BASE Premier",
    description: "Четыре вопроса — и мы подберём мастера и услугу именно для вас.",
    url: "https://basepremier.ru/quiz",
    siteName: "BASE Premier",
    locale: "ru_RU",
    type: "website",
  },
};

export default function QuizPage() {
  const jsonLd = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Подбор стрижки", url: "/quiz" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main">
        <QuizFlow />
      </main>
    </>
  );
}
