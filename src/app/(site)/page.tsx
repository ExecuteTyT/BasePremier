import { Metadata } from "next";

import { BarbersPreviewSection } from "@/components/sections/BarbersPreviewSection";
import { CtaFinalSection } from "@/components/sections/CtaFinalSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/Hero/HeroSection";
import { InteriorSection } from "@/components/sections/InteriorSection";
import { LoyaltySection } from "@/components/sections/LoyaltySection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { PricingTeaserSection } from "@/components/sections/PricingTeaserSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ServicesPreviewSection } from "@/components/sections/ServicesPreviewSection";
import { StatsBand } from "@/components/sections/StatsBand";
import { faqPageJsonLd, hairSalonJsonLd } from "@/lib/seo/jsonLd";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "BASE Premier — Премиальный барбершоп в Казани | Шаляпина 26",
  description:
    "Барбершоп BASE Premier в Казани. Мужские стрижки от 1 800 ₽, 10 мастеров, час работы. Рейтинг 5,0 — 394 отзыва. Ул. Шаляпина, 26. Ежедневно 10–21.",
  alternates: {
    canonical: "https://basepremier.ru",
  },
  openGraph: {
    title: "BASE Premier — Премиальный барбершоп, Казань",
    description:
      "Мужские стрижки от 1 800 ₽. 10 мастеров, час работы, профкосметика. Рейтинг 5,0 · 394 отзыва. Шаляпина 26, ежедневно 10–21.",
    url: "https://basepremier.ru",
    siteName: "BASE Premier",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "https://basepremier.ru/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "BASE Premier — премиальный барбершоп в Казани",
      },
    ],
  },
};

const HOME_FAQ = [
  {
    question: "Сколько длится стрижка?",
    answer:
      "Час. Это базовая длительность для большинства услуг. Если у вас борода — добавляется 30 минут.",
  },
  {
    question: "Сколько стоит стрижка в барбершопе BASE Premier?",
    answer:
      "Мужская стрижка — от 1 800 до 2 700 ₽ в зависимости от категории мастера. Стрижка с бородой — от 3 200 до 4 600 ₽. Все цены за час работы, включая мытьё, моделирование и укладку.",
  },
  {
    question: "Как часто нужно стричься мужчине?",
    answer:
      "В среднем раз в 3–4 недели. Если вы работаете с техническими деталями (fade, taper), мастер порекомендует индивидуальный интервал на первом визите.",
  },
  {
    question: "Можно ли совместить стрижку и маникюр?",
    answer:
      "Да. Одновременно (4 руки, 1 час, от 2 800 ₽) или последовательно (2 часа, скидка до 15 %). Выбирайте «Комплекс» при записи.",
  },
  {
    question: "Как отменить или перенести запись?",
    answer:
      "Через ссылку в SMS-напоминании (придёт за сутки) или по номеру +7 (917) 918-38-77. Просим предупреждать за 3 часа.",
  },
  {
    question: "Где вы находитесь?",
    answer:
      "Казань, ул. Шаляпина, 26, 1 этаж — в 300 м от Концертного зала Филармонии. Ежедневно 10:00–21:00.",
  },
];

export default function HomePage() {
  const jsonLd = [hairSalonJsonLd(), faqPageJsonLd(HOME_FAQ)];
  return (
    <>
      {jsonLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
      <HeroSection />
      <ManifestoSection />
      <StatsBand />
      <ServicesPreviewSection />
      <BarbersPreviewSection />
      <InteriorSection />
      <ProcessSection />
      <ReviewsSection />
      <PricingTeaserSection />
      <LoyaltySection />
      <FaqSection />
      <CtaFinalSection />
    </>
  );
}
