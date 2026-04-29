import { Metadata } from "next";

import { CharReveal } from "@/components/motion/CharReveal";
import { breadcrumbJsonLd, hairSalonJsonLd } from "@/lib/seo/jsonLd";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Контакты — BASE Premier | Барбершоп на Шаляпина 26, Казань",
  description:
    "Барбершоп BASE Premier: ул. Шаляпина, 26, 1 этаж, Казань. Ежедневно 10:00–21:00. Телефон +7 (917) 918-38-77. 8 минут пешком от м. Площадь Тукая.",
  alternates: {
    canonical: "https://basepremier.ru/contacts",
  },
  openGraph: {
    title: "Контакты — BASE Premier | Барбершоп Казань",
    description:
      "Шаляпина 26, 1 этаж. Ежедневно 10–21. +7 (917) 918-38-77. От метро Площадь Тукая 8 минут пешком.",
    url: "https://basepremier.ru/contacts",
    siteName: "BASE Premier",
    locale: "ru_RU",
    type: "website",
  },
};

export default function ContactsPage() {
  const jsonLd = [
    hairSalonJsonLd(),
    breadcrumbJsonLd([
      { name: "Главная", url: "/" },
      { name: "Контакты", url: "/contacts" },
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
              Казань · Шаляпина, 26
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
              Адрес
            </CharReveal>
          </div>
        </section>

        {/* Main content */}
        <section className="bg-bg-primary py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-6 md:px-8">
            <div className="grid gap-7 md:grid-cols-2 md:gap-16">
              {/* Info column */}
              <div className="flex flex-col gap-7">
                {/* Address */}
                <div>
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                    Адрес
                  </p>
                  <address className="not-italic">
                    <p className="font-display font-normal text-[1.5rem] leading-tight text-fg-primary">
                      ул. Шаляпина, 26
                    </p>
                    <p className="mt-1 font-mono text-[13px] text-fg-muted">
                      1 этаж · Казань · Республика Татарстан
                    </p>
                  </address>
                </div>

                {/* Hours */}
                <div>
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                    Часы работы
                  </p>
                  <p className="font-display font-normal text-[1.25rem] leading-tight text-fg-primary">
                    Ежедневно
                  </p>
                  <p className="mt-1 font-mono text-[1.5rem] tracking-tight text-fg-primary">
                    10:00 — 21:00
                  </p>
                </div>

                {/* Contact */}
                <div>
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                    Контакт
                  </p>
                  <a
                    href="tel:+79179183877"
                    className="block font-display font-normal text-[1.5rem] leading-tight text-fg-primary transition-opacity hover:opacity-70"
                  >
                    +7 (917) 918-38-77
                  </a>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href="tel:+79179183877"
                      className="border border-border-strong px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted transition-colors hover:border-fg-muted/40 hover:text-fg-primary"
                    >
                      Позвонить
                    </a>
                    <a
                      href="https://wa.me/79179183877"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-border-strong px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted transition-colors hover:border-fg-muted/40 hover:text-fg-primary"
                    >
                      WhatsApp
                    </a>
                    <a
                      href="https://t.me/+79179183877"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-border-strong px-4 py-2 font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted transition-colors hover:border-fg-muted/40 hover:text-fg-primary"
                    >
                      Telegram
                    </a>
                  </div>
                </div>

                {/* How to get there */}
                <div>
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                    Как добраться
                  </p>
                  <ul className="flex flex-col gap-2">
                    <li className="flex items-start gap-3 font-sans text-body text-fg-muted">
                      <span className="mt-1 h-px w-4 flex-shrink-0 bg-accent" />
                      Метро «Площадь Тукая» — 8 минут пешком
                    </li>
                    <li className="flex items-start gap-3 font-sans text-body text-fg-muted">
                      <span className="mt-1 h-px w-4 flex-shrink-0 bg-accent" />
                      Метро «Кремлёвская» — 10 минут пешком
                    </li>
                    <li className="flex items-start gap-3 font-sans text-body text-fg-muted">
                      <span className="mt-1 h-px w-4 flex-shrink-0 bg-accent" />
                      Ориентир: Концертный зал Филармонии в 245 м
                    </li>
                    <li className="flex items-start gap-3 font-sans text-body text-fg-muted">
                      <span className="mt-1 h-px w-4 flex-shrink-0 bg-accent" />
                      Парковка по периметру здания и на соседних улицах
                    </li>
                  </ul>
                </div>
              </div>

              {/* Map column */}
              <div className="flex flex-col gap-4">
                <div className="aspect-[16/10] overflow-hidden bg-bg-secondary">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=49.105068%2C55.784178&z=16&pt=49.105068%2C55.784178&l=map"
                    title="BASE Premier на карте"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <a
                  href="https://yandex.ru/maps/?text=Казань%2C+ул.+Шаляпина%2C+26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted transition-opacity hover:opacity-70"
                >
                  → Открыть в Яндекс.Картах
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border-default bg-bg-primary py-16 md:py-20">
          <div className="mx-auto max-w-screen-xl px-6 md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="font-sans text-body leading-relaxed text-fg-muted">
                Готовы приехать?{" "}
                <span className="text-fg-primary">Запишитесь онлайн и выберите удобное время.</span>
              </p>
              <button
                data-yclients-open
                className="inline-flex items-center gap-3 bg-accent px-8 py-4 font-mono text-[13px] uppercase tracking-[0.12em] text-accent-fg transition-opacity duration-base hover:opacity-80"
              >
                Записаться
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
