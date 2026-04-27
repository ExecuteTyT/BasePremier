import { Metadata } from "next";

import { CharReveal } from "@/components/motion/CharReveal";
import { ServicesListSection } from "@/components/sections/ServicesListSection";
import { serviceListJsonLd } from "@/lib/seo/jsonLd";

export const dynamic = "force-dynamic";

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
    images: [{ url: "https://basepremier.ru/images/og-default.jpg", width: 1200, height: 630 }],
  },
};

export default function ServicesPage() {
  const jsonLd = serviceListJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
              Двадцать семь процедур в трёх категориях. Средний чек — 2 400 ₽. Прозрачные цены, один
              мастер от начала до конца.
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
