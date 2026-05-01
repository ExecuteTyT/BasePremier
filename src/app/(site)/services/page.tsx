import { Metadata } from "next";

import { CharReveal } from "@/components/motion/CharReveal";
import { ServicesListSection } from "@/components/sections/ServicesListSection";
import { breadcrumbJsonLd, faqPageJsonLd, serviceListJsonLd } from "@/lib/seo/jsonLd";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Услуги барбершопа BASE Premier — 27 процедур | Казань",
  description:
    "Мужские стрижки, бритьё, уход за лицом, маникюр и педикюр. 27 услуг от 500 ₽. Барбершоп BASE Premier на Шаляпина 26, Казань. Ежедневно 10–21.",
  alternates: {
    canonical: "https://basepremier.ru/services",
  },
  openGraph: {
    title: "Услуги — BASE Premier | Барбершоп Казань",
    description:
      "27 процедур: стрижки, бритьё, уход за лицом, ногтевой сервис. Три категории, прозрачные цены. Шаляпина 26, ежедневно 10–21.",
    url: "https://basepremier.ru/services",
    siteName: "BASE Premier",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "https://basepremier.ru/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Услуги барбершопа BASE Premier, Казань",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Услуги — BASE Premier | Барбершоп Казань",
    description:
      "27 процедур: стрижки, бритьё, уход за лицом, ногтевой сервис. Три категории, прозрачные цены. Шаляпина 26, ежедневно 10–21.",
    images: ["https://basepremier.ru/images/og-default.jpg"],
  },
};

const SERVICES_FAQ = [
  {
    question: "Сколько стоит мужская стрижка в BASE Premier?",
    answer:
      "Мужская стрижка — от 1 800 до 2 700 ₽ в зависимости от категории мастера. Стрижка с бородой — от 3 200 до 4 600 ₽. Каждая стрижка занимает час.",
  },
  {
    question: "Сколько длится стрижка?",
    answer:
      "Час. Это базовая длительность для большинства услуг. Если у вас борода — добавляется 30 минут. Точная длительность каждой услуги указана в прайсе.",
  },
  {
    question: "Есть ли комплексные услуги — стрижка и маникюр?",
    answer:
      "Да. Стрижка + Экспресс маникюр — от 2 800 ₽ (одновременно, 4 руки, 1 час). Стрижка + Маникюр — от 3 100 ₽ (последовательно, скидка до 15%).",
  },
  {
    question: "Можно ли получить детскую стрижку?",
    answer: "Да, для детей от 5 до 10 лет. Длительность — 1 час, цена — 1 600–2 400 ₽.",
  },
  {
    question: "Что входит в услугу «Премиальное моделирование SOLOMON'S»?",
    answer:
      "Моделирование бороды с использованием профессиональной косметики Solomon's: разогревающий крем, чёрное мыло, горячее и холодное полотенце, масло для бороды. Длительность — 1 час, цена — 3 000 ₽.",
  },
  {
    question: "Принимаете ли вы по программе лояльности?",
    answer:
      "Да, накопительная программа активируется автоматически после первого визита через YClients. Скидки на 5-й, 10-й и 15-й визит.",
  },
];

export default function ServicesPage() {
  const jsonLd = [
    serviceListJsonLd(),
    faqPageJsonLd(SERVICES_FAQ),
    breadcrumbJsonLd([
      { name: "Главная", url: "/" },
      { name: "Услуги", url: "/services" },
    ]),
  ];

  return (
    <>
      {jsonLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}

      <main id="main">
        {/* Hero */}
        <section className="bg-bg-primary pb-0 pt-28 md:pt-40">
          <div className="mx-auto max-w-screen-xl px-6 md:px-8">
            <p className="mb-6 font-mono text-[13px] uppercase tracking-[0.2em] text-fg-muted">
              27 услуг · 3 категории
            </p>
            <CharReveal
              as="h1"
              className="font-display font-normal text-fg-primary"
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              Услуги
            </CharReveal>
            <p className="mt-6 font-sans text-body leading-relaxed text-fg-muted md:max-w-lg">
              Двадцать семь процедур в трёх категориях. Средний чек — 2{" "}400{" "}₽. Прозрачные
              цены, один мастер от начала до конца.
            </p>
          </div>
        </section>

        {/* Services list */}
        <section className="bg-bg-primary py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-6 md:px-8">
            <ServicesListSection />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-border-default bg-bg-primary py-16 md:py-20">
          <div className="mx-auto max-w-screen-xl px-6 md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="font-sans text-body leading-relaxed text-fg-muted">
                Не нашли нужную услугу?{" "}
                <span className="text-fg-primary">Позвоните — подберём вместе.</span>
              </p>
              <a
                href="tel:+79179183877"
                className="font-mono text-[1rem] text-fg-primary transition-opacity duration-base hover:opacity-70 md:text-[1.125rem]"
              >
                +7 (917) 918-38-77
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
