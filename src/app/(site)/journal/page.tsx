import { Metadata } from "next";

import { CharReveal } from "@/components/motion/CharReveal";
import { JournalGridSection } from "@/components/sections/JournalGridSection";
import { ARTICLES } from "@/data/articles";
import { breadcrumbJsonLd, hairSalonJsonLd } from "@/lib/seo/jsonLd";

export const dynamic = "force-dynamic";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Журнал — BASE Premier | Гайды по стрижкам и уходу, Казань",
  description:
    "Гайды, разборы и советы от мастеров BASE Premier. Как выбрать стрижку, уход за бородой, тренды 2026. Барбершоп на Шаляпина 26, Казань.",
  alternates: {
    canonical: "https://basepremier.ru/journal",
  },
  openGraph: {
    title: "Журнал — BASE Premier | Барбершоп Казань",
    description: "Гайды, разборы и советы от мастеров BASE Premier.",
    url: "https://basepremier.ru/journal",
    siteName: "BASE Premier",
    locale: "ru_RU",
    type: "website",
  },
};

export default function JournalPage() {
  const jsonLd = [
    hairSalonJsonLd(),
    breadcrumbJsonLd([
      { name: "Главная", url: "/" },
      { name: "Журнал", url: "/journal" },
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
              {ARTICLES.length} статей · Гайды, разборы, мнения
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
              Журнал
            </CharReveal>
          </div>
        </section>

        {/* Grid */}
        <section className="bg-bg-primary py-16 md:py-24">
          <div className="mx-auto max-w-screen-xl px-6 md:px-8">
            <JournalGridSection />
          </div>
        </section>
      </main>
    </>
  );
}
