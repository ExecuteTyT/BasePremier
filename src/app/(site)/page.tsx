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
    question: "Что значат разные цены на одну услугу — 1 800 и 2 700 ₽?",
    answer:
      "Это категории мастеров. У младших — стартовая цена, у старших — финальная. Все прошли одинаковое обучение внутри BASE Premier.",
  },
  {
    question: "Какие средства используются в BASE Premier?",
    answer:
      "Graham Hill, Davines, The London Grooming Co и Solomon's. Профессиональная косметика под тип ваших волос — мастер подбирает индивидуально.",
  },
  {
    question: "Можно ли совместить стрижку и маникюр?",
    answer:
      "Да. Одновременно (4 руки, 1 час, от 2 800 ₽) или последовательно (2 часа, скидка до 15 %). Выбирайте «Комплекс» при записи.",
  },
  {
    question: "Сколько у вас филиалов в Казани?",
    answer:
      "Один. Шаляпина, 26 — в трёхстах метрах от Концертного зала Филармонии. Парковка по периметру.",
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
