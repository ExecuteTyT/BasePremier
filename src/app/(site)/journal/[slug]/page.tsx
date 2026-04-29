import { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";

import { PortableTextContent } from "@/components/journal/PortableTextContent";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/sanity/queries";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonLd";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} | BASE Premier`,
    description: article.excerpt,
    alternates: {
      canonical: `https://basepremier.ru/journal/${article.slug.current}`,
    },
    openGraph: {
      title: `${article.title} | BASE Premier`,
      description: article.excerpt,
      url: `https://basepremier.ru/journal/${article.slug.current}`,
      siteName: "BASE Premier",
      locale: "ru_RU",
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

const CATEGORY_LABELS: Record<string, string> = {
  guide: "Гид",
  care: "Уход",
  price: "Цена",
  lifestyle: "Лайфстайл",
};

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(slug, article.category);
  const categoryLabel = CATEGORY_LABELS[article.category] ?? article.category;

  const jsonLd = [
    articleJsonLd({
      slug: article.slug.current,
      title: article.title,
      excerpt: article.excerpt,
      date: article.publishedAt,
      readMinutes: article.readMinutes,
    }),
    breadcrumbJsonLd([
      { name: "Главная", url: "/" },
      { name: "Журнал", url: "/journal" },
      { name: categoryLabel, url: `/journal` },
      { name: article.title, url: `/journal/${article.slug.current}` },
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
                    <NextLink href="/journal" className="transition-opacity hover:opacity-70">
                      Журнал
                    </NextLink>
                  </li>
                  <li aria-hidden="true" className="opacity-30">
                    /
                  </li>
                  <li className="text-fg-primary">{categoryLabel}</li>
                </ol>
              </nav>

              <div className="mx-auto max-w-[720px]">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-muted">
                  {categoryLabel}
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
                <p className="mt-4 font-mono text-[12px] text-fg-muted">
                  {formatDate(article.publishedAt)} · {article.readMinutes} мин читать
                </p>
              </div>
            </div>
          </header>

          {/* Cover placeholder */}
          <div className="bg-bg-primary py-7 md:py-14">
            <div className="mx-auto max-w-screen-xl px-6 md:px-8">
              <div className="mx-auto aspect-[16/9] max-w-[720px] overflow-hidden bg-bg-secondary">
                <div className="flex h-full items-center justify-center">
                  <span
                    className="select-none font-display font-normal leading-none text-fg-muted/10"
                    style={{ fontSize: "clamp(5rem, 15vw, 10rem)" }}
                  >
                    {categoryLabel[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Article body */}
          <div className="bg-bg-primary pb-20 md:pb-28">
            <div className="mx-auto max-w-screen-xl px-6 md:px-8">
              <div className="mx-auto max-w-[720px]">
                {article.content && article.content.length > 0 ? (
                  <PortableTextContent content={article.content} />
                ) : (
                  <p className="font-sans text-[1.125rem] leading-[1.7] text-fg-muted">
                    Содержимое статьи скоро будет добавлено.
                  </p>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="border-t border-border-default bg-bg-secondary py-16 md:py-20">
            <div className="mx-auto max-w-screen-xl px-6 md:px-8">
              <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                Читайте также
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                {related.map((r) => {
                  const rLabel = CATEGORY_LABELS[r.category] ?? r.category;
                  return (
                    <NextLink
                      key={r._id}
                      href={`/journal/${r.slug.current}`}
                      className="group block border border-border-strong p-6 transition-[border-color] duration-base hover:border-accent"
                    >
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-muted">
                        {rLabel}
                      </p>
                      <h2 className="mb-2 font-display font-normal text-[1.125rem] leading-tight text-fg-primary transition-opacity duration-base group-hover:opacity-80">
                        {r.title}
                      </h2>
                      <p className="font-mono text-[11px] text-fg-muted">
                        {formatDate(r.publishedAt)} · {r.readMinutes} мин
                      </p>
                    </NextLink>
                  );
                })}
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
