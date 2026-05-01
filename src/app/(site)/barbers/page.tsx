import { Metadata } from "next";

import { CharReveal } from "@/components/motion/CharReveal";
import { BarbersGridSection } from "@/components/sections/BarbersGridSection";
import { BARBERS } from "@/data/barbers";
import { breadcrumbJsonLd, hairSalonJsonLd } from "@/lib/seo/jsonLd";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Мастера барбершопа BASE Premier — 10 профессионалов | Казань",
  description:
    "Десять мастеров с уникальным почерком. Старший мастер Марат — 300 отзывов. Лучший сотрудник — Сайод. Запишитесь к своему мастеру на Шаляпина 26.",
  alternates: {
    canonical: "https://basepremier.ru/barbers",
  },
  openGraph: {
    title: "Мастера — BASE Premier | Барбершоп Казань",
    description:
      "10 мастеров со своим почерком. Старший Марат (300 отзывов), лучший Сайод. Мужские стрижки, ногтевой сервис. Шаляпина 26.",
    url: "https://basepremier.ru/barbers",
    siteName: "BASE Premier",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "https://basepremier.ru/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Мастера барбершопа BASE Premier, Казань",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Мастера — BASE Premier | Барбершоп Казань",
    description: "10 мастеров со своим почерком. Старший Марат (300 отзывов), лучший Сайод. Шаляпина 26.",
    images: ["https://basepremier.ru/images/og-default.jpg"],
  },
};

export default function BarbersPage() {
  const totalReviews = BARBERS.reduce((sum, b) => sum + b.reviews, 0);

  const jsonLd = [
    hairSalonJsonLd(),
    breadcrumbJsonLd([
      { name: "Главная", url: "/" },
      { name: "Мастера", url: "/barbers" },
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
              {BARBERS.length} мастеров · {totalReviews} отзывов на Яндекс.Картах
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
              Команда
            </CharReveal>
            <p className="mt-6 font-sans text-body leading-relaxed text-fg-muted md:max-w-lg">
              Каждый мастер — со своим почерком и любимыми техниками. Вы выбираете сами.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="bg-bg-primary py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-6 md:px-8">
            <BarbersGridSection />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-border-default bg-bg-primary py-16 md:py-20">
          <div className="mx-auto max-w-screen-xl px-6 md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="font-sans text-body leading-relaxed text-fg-muted">
                Не знаете к кому записаться?{" "}
                <span className="text-fg-primary">Позвоните — подберём мастера вместе.</span>
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
