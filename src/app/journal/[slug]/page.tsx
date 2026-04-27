import { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";

import { ARTICLES } from "@/data/articles";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonLd";

export const revalidate = 3600;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: `${article.title} | BASE Premier`,
    description: article.excerpt,
    alternates: {
      canonical: `https://basepremier.ru/journal/${article.slug}`,
    },
    openGraph: {
      title: `${article.title} | BASE Premier`,
      description: article.excerpt,
      url: `https://basepremier.ru/journal/${article.slug}`,
      siteName: "BASE Premier",
      locale: "ru_RU",
      type: "article",
      publishedTime: article.date,
    },
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

function renderContent(text: string) {
  return text.split("\n\n").map((paragraph, i) => {
    if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
      const inner = paragraph.slice(2, -2);
      return (
        <h2
          key={i}
          className="mt-10 font-display font-normal text-[1.375rem] leading-tight text-fg-primary"
        >
          {inner}
        </h2>
      );
    }

    const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="font-sans text-[1.125rem] leading-[1.7] text-fg-muted">
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={j} className="font-normal text-fg-primary">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
      </p>
    );
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const relatedArticles = ARTICLES.filter(
    (a) => a.slug !== article.slug && a.category === article.category,
  ).slice(0, 2);

  const jsonLd = [
    articleJsonLd(article),
    breadcrumbJsonLd([
      { name: "Главная", url: "/" },
      { name: "Журнал", url: "/journal" },
      { name: article.categoryLabel, url: `/journal` },
      { name: article.title, url: `/journal/${article.slug}` },
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
        <article>
          {/* Hero */}
          <header className="bg-bg-primary pt-32 md:pt-40">
            <div className="mx-auto max-w-screen-xl px-6 md:px-8">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mb-10">
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
                    <NextLink href="/journal" className="transition-opacity hover:opacity-70">
                      Журнал
                    </NextLink>
                  </li>
                  <li aria-hidden="true" className="opacity-30">
                    /
                  </li>
                  <li className="text-fg-primary">{article.categoryLabel}</li>
                </ol>
              </nav>

              <div className="mx-auto max-w-[720px]">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
                  {article.categoryLabel}
                </p>
                <h1
                  className="font-display font-normal text-fg-primary"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {article.title}
                </h1>
                <p className="mt-4 font-mono text-[12px] text-fg-muted/60">
                  {formatDate(article.date)} · {article.readMinutes} мин читать
                </p>
              </div>
            </div>
          </header>

          {/* Cover placeholder */}
          <div className="bg-bg-primary py-10 md:py-14">
            <div className="mx-auto max-w-screen-xl px-6 md:px-8">
              <div className="mx-auto aspect-[16/9] max-w-[720px] overflow-hidden bg-bg-secondary">
                <div className="flex h-full items-center justify-center">
                  <span
                    className="select-none font-display font-normal leading-none text-fg-muted/10"
                    style={{ fontSize: "clamp(5rem, 15vw, 10rem)" }}
                  >
                    {article.categoryLabel[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Article body */}
          <div className="bg-bg-primary pb-20 md:pb-28">
            <div className="mx-auto max-w-screen-xl px-6 md:px-8">
              <div className="mx-auto max-w-[720px] space-y-6">
                {renderContent(article.content)}
              </div>
            </div>
          </div>
        </article>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <section className="border-t border-border-default bg-bg-secondary py-16 md:py-20">
            <div className="mx-auto max-w-screen-xl px-6 md:px-8">
              <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                Читайте также
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedArticles.map((related) => (
                  <NextLink
                    key={related.slug}
                    href={`/journal/${related.slug}`}
                    className="group block border border-border-strong p-6 transition-[border-color] duration-base hover:border-accent"
                  >
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
                      {related.categoryLabel}
                    </p>
                    <h2 className="mb-2 font-display font-normal text-[1.125rem] leading-tight text-fg-primary transition-opacity duration-base group-hover:opacity-80">
                      {related.title}
                    </h2>
                    <p className="font-mono text-[11px] text-fg-muted/50">
                      {formatDate(related.date)} · {related.readMinutes} мин
                    </p>
                  </NextLink>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="border-t border-border-default bg-bg-primary py-16 md:py-20">
          <div className="mx-auto max-w-screen-xl px-6 md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="font-sans text-body leading-relaxed text-fg-muted">
                Понравилась статья?{" "}
                <span className="text-fg-primary">Запишитесь к мастеру онлайн.</span>
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
