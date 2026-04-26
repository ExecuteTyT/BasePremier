export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center border-b border-border-default bg-bg-primary/80 backdrop-blur-sm md:h-16">
      <nav
        className="flex w-full items-center justify-between px-4 md:px-8"
        aria-label="Главная навигация"
      >
        <span className="font-display text-2xl leading-none text-fg-primary">BP</span>

        <button
          type="button"
          className="rounded-none bg-accent px-8 py-3.5 font-sans text-sm font-medium tracking-tight text-accent-fg transition-colors duration-base hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg-primary"
        >
          Записаться
        </button>
      </nav>
    </header>
  );
}
