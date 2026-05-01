import { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";

import { CharReveal } from "@/components/motion/CharReveal";
import { BARBERS } from "@/data/barbers";
import { reviewWord } from "@/lib/format";
import { breadcrumbJsonLd, hairSalonJsonLd, personJsonLd } from "@/lib/seo/jsonLd";

export function generateStaticParams() {
  return BARBERS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const barber = BARBERS.find((b) => b.slug === slug);
  if (!barber) return { title: "Мастер не найден — BASE Premier" };

  const ogTitle = `${barber.name} — BASE Premier | Барбершоп Казань`;
  const ogDescription = `${barber.reviews} ${reviewWord(barber.reviews)} на Яндекс.Картах. ${barber.role}. Запись онлайн.`;

  return {
    title: `${barber.name} — ${barber.role} | BASE Premier, Казань`,
    description: `${barber.name}, ${barber.role} барбершопа BASE Premier. ${barber.reviews} ${reviewWord(barber.reviews)} на Яндекс.Картах. Запись на Шаляпина 26.`,
    alternates: {
      canonical: `https://basepremier.ru/barbers/${barber.slug}`,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: `https://basepremier.ru/barbers/${barber.slug}`,
      siteName: "BASE Premier",
      locale: "ru_RU",
      type: "website",
      images: [
        {
          url: "https://basepremier.ru/images/og-default.jpg",
          width: 1200,
          height: 630,
          alt: `${barber.name} — мастер барбершопа BASE Premier, Казань`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ["https://basepremier.ru/images/og-default.jpg"],
    },
  };
}

export default async function BarberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const barber = BARBERS.find((b) => b.slug === slug);
  if (!barber) notFound();

  const jsonLd = [
    hairSalonJsonLd(),
    personJsonLd(barber),
    breadcrumbJsonLd([
      { name: "Главная", url: "/" },
      { name: "Мастера", url: "/barbers" },
      { name: barber.name, url: `/barbers/${barber.slug}` },
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
        {/* Hero — 2-col layout */}
        <section className="bg-bg-primary pt-32 md:pt-40">
          <div className="mx-auto max-w-screen-xl px-6 md:px-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.15em] text-fg-muted">
                <li>
                  <NextLink href="/" className="transition-opacity hover:opacity-70">
                    Главная
                  </NextLink>
                </li>
                <li aria-hidden="true" className="opacity-30">
                  /
                </li>
                <li>
                  <NextLink href="/barbers" className="transition-opacity hover:opacity-70">
                    Мастера
                  </NextLink>
                </li>
                <li aria-hidden="true" className="opacity-30">
                  /
                </li>
                <li className="text-fg-primary">{barber.name}</li>
              </ol>
            </nav>

            <div className="grid gap-7 md:grid-cols-2 md:gap-16 lg:gap-24">
              {/* Photo column */}
              <div className="relative aspect-[3/4] overflow-hidden bg-bg-secondary">
                {barber.imageSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={barber.imageSrc}
                    alt={`${barber.name} — ${barber.role}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-4">
                    <span
                      aria-hidden="true"
                      className="select-none font-display font-normal leading-none text-fg-muted/20"
                      style={{ fontSize: "clamp(6rem, 18vw, 10rem)" }}
                    >
                      {barber.name[0]}
                    </span>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-fg-muted">
                      Фотография скоро
                    </p>
                  </div>
                )}

                {/* Badges */}
                {barber.isBestEmployee && (
                  <div className="absolute left-3 top-3">
                    <span className="bg-accent px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-fg">
                      ★ Лучший сотрудник
                    </span>
                  </div>
                )}
                {barber.isSenior && !barber.isBestEmployee && (
                  <div className="absolute left-3 top-3">
                    <span className="bg-fg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-fg-muted backdrop-blur-sm">
                      Старший
                    </span>
                  </div>
                )}
              </div>

              {/* Info column */}
              <div className="flex flex-col justify-center">
                {/* Name */}
                <CharReveal
                  as="h1"
                  className="font-display font-normal text-fg-primary"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 5rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {barber.name}
                </CharReveal>

                {/* Role + reviews */}
                <p className="mt-3 font-mono text-[13px] uppercase tracking-[0.15em] text-fg-muted">
                  {barber.role}
                </p>
                <p className="mt-1 font-mono text-[13px] text-fg-muted">
                  {barber.reviews}&nbsp;{reviewWord(barber.reviews)} на Яндекс.Картах
                </p>

                {/* Quote */}
                {barber.quote && (
                  <blockquote className="mt-8 border-l border-accent pl-5">
                    <p className="font-display font-normal text-[1.125rem] leading-relaxed text-fg-primary/80 italic">
                      «{barber.quote}»
                    </p>
                  </blockquote>
                )}

                {/* Bio placeholder */}
                <div className="mt-8">
                  <p className="font-sans text-body leading-relaxed text-fg-muted">
                    Биография мастера появится в ближайшее время.
                  </p>
                </div>

                {/* Techniques */}
                {barber.techniques && barber.techniques.length > 0 && (
                  <div className="mt-8">
                    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-muted">
                      Любимые техники
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {barber.techniques.map((t) => (
                        <li
                          key={t}
                          className="flex items-center gap-2 font-sans text-body text-fg-primary"
                        >
                          <span className="h-px w-4 bg-accent" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-7">
                  <button
                    data-yclients-open
                    className="inline-flex items-center gap-3 bg-accent px-8 py-4 font-mono text-[13px] uppercase tracking-[0.12em] text-accent-fg transition-opacity duration-base hover:opacity-80"
                  >
                    Записаться к{" "}
                    {barber.name === "Арина"
                      ? "Арине"
                      : barber.name === "Диана"
                        ? "Диане"
                        : `${barber.name}у`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to team */}
        <section className="border-t border-border-default bg-bg-primary py-16 md:py-20">
          <div className="mx-auto max-w-screen-xl px-6 md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="font-sans text-body leading-relaxed text-fg-muted">
                Хотите познакомиться с командой?
              </p>
              <NextLink
                href="/barbers"
                className="font-mono text-[13px] uppercase tracking-[0.12em] text-fg-primary transition-opacity duration-base hover:opacity-70"
              >
                ← Все мастера
              </NextLink>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
