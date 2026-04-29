import NextLink from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg-primary px-6 py-32"
    >
      {/* Large 404 background text */}
      <p
        className="pointer-events-none absolute select-none font-display font-normal leading-none text-fg-primary"
        aria-hidden="true"
        style={{
          fontSize: "clamp(10rem, 30vw, 22rem)",
          opacity: 0.04,
          letterSpacing: "-0.05em",
        }}
      >
        404
      </p>

      {/* Content */}
      <div className="relative z-10 text-center">
        <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.2em] text-fg-muted">
          Страница не найдена
        </p>
        <h1
          className="mb-6 font-display font-normal text-fg-primary"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Здесь пусто.
        </h1>
        <p className="mx-auto mb-7 max-w-sm font-sans text-body leading-relaxed text-fg-muted">
          Страница, которую вы искали, переехала или никогда не существовала.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <NextLink
            href="/"
            className="bg-accent px-8 py-4 font-mono text-[13px] uppercase tracking-[0.12em] text-accent-fg transition-opacity hover:opacity-80"
          >
            На главную
          </NextLink>
          <NextLink
            href="/services"
            className="border border-border-strong px-8 py-4 font-mono text-[13px] uppercase tracking-[0.12em] text-fg-muted transition-colors hover:border-fg-muted/40 hover:text-fg-primary"
          >
            Все услуги
          </NextLink>
        </div>
      </div>
    </main>
  );
}
