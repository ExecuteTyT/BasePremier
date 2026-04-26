import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center border-b border-border-default bg-bg-primary/80 backdrop-blur-sm md:h-16">
      <nav
        className="flex w-full items-center justify-between px-4 md:px-8"
        aria-label="Главная навигация"
      >
        <span className="font-display text-2xl leading-none text-fg-primary">BP</span>

        <Button variant="primary" size="md" type="button">
          Записаться
        </Button>
      </nav>
    </header>
  );
}
