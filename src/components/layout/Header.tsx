import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MuteToggle } from "@/components/ui/MuteToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center border-b border-border-default bg-bg-primary/80 backdrop-blur-sm md:h-16">
      <nav
        className="flex w-full items-center justify-between px-4 md:px-8"
        aria-label="Главная навигация"
      >
        <Logo href="/" size="sm" />

        <div className="flex items-center gap-4">
          <MuteToggle />
          <Button variant="primary" size="md" type="button">
            Записаться
          </Button>
        </div>
      </nav>
    </header>
  );
}
