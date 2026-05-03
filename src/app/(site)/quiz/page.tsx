import { Metadata } from "next";

import { QuizFlow } from "@/components/sections/QuizFlow";
import { breadcrumbJsonLd } from "@/lib/seo/jsonLd";

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
    images: [
      {
        url: "https://basepremier.ru/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Подбор стрижки в BASE Premier — барбершоп Казань",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Подбор стрижки — BASE Premier",
    description: "Четыре вопроса — и мы подберём мастера и услугу именно для вас.",
    images: ["https://basepremier.ru/images/og-default.jpg"],
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
        <QuizFlow variant="full" />
      </main>
    </>
  );
}
