import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Body } from "@/components/typography/Body";
import { Caption } from "@/components/typography/Caption";
import { H1 } from "@/components/typography/H1";
import { H2 } from "@/components/typography/H2";
import { H3 } from "@/components/typography/H3";
import { H4 } from "@/components/typography/H4";
import { Mono } from "@/components/typography/Mono";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";

export default function DevComponentsPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg-primary px-8 py-16">
      <div className="mx-auto max-w-4xl space-y-16">
        {/* Header */}
        <div className="border-b border-border-default pb-8">
          <Caption as="p" className="mb-2 uppercase tracking-overline">
            BASE Premier · Dev Gallery
          </Caption>
          <p className="font-sans text-fg-muted text-body-sm">Только в NODE_ENV=development</p>
        </div>

        {/* Display Scale */}
        <section className="space-y-8">
          <Caption as="h2" className="uppercase tracking-overline">
            Display — Fraunces (EN only)
          </Caption>
          <div className="space-y-6">
            <div>
              <Caption className="mb-2 block">display-xl · hero H1</Caption>
              <H1>BASE Premier</H1>
            </div>
            <div>
              <Caption className="mb-2 block">display-lg · section H1</Caption>
              <H2 as="h1">Our Craft</H2>
            </div>
            <div>
              <Caption className="mb-2 block">display-md · section H2</Caption>
              <H3 as="h2">Services</H3>
            </div>
            <div>
              <Caption className="mb-2 block">display-sm · editorial H3</Caption>
              <H4 as="h3">Premium Care</H4>
            </div>
          </div>
        </section>

        {/* Cyrillic Headings via H2-H4 */}
        <section className="space-y-8">
          <Caption as="h2" className="uppercase tracking-overline">
            Display — Кирилличные заголовки
          </Caption>
          <div className="space-y-6">
            <div>
              <Caption className="mb-2 block">H2 → display-lg</Caption>
              <H2>Барбершоп с собственным шармом</H2>
            </div>
            <div>
              <Caption className="mb-2 block">H3 → display-md</Caption>
              <H3>Мастера и услуги</H3>
            </div>
            <div>
              <Caption className="mb-2 block">H4 → display-sm</Caption>
              <H4>Стрижка и моделирование бороды</H4>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="space-y-8">
          <Caption as="h2" className="uppercase tracking-overline">
            Body — Inter
          </Caption>
          <div className="space-y-4 max-w-xl">
            <div>
              <Caption className="mb-2 block">body-lg · лиды</Caption>
              <Body size="lg">
                Открыты с 2022 года. Один адрес — ул. Шаляпина, 26. Ежедневно с 10:00 до 21:00.
              </Body>
            </div>
            <div>
              <Caption className="mb-2 block">body · основной текст</Caption>
              <Body>
                Уникальный интерьер, профессиональные барберы, высокие стандарты — всё для того,
                чтобы вы чувствовали себя на высоте.
              </Body>
            </div>
            <div>
              <Caption className="mb-2 block">body-sm · вспомогательный</Caption>
              <Body size="sm">Программа лояльности — накопительная система в YClients.</Body>
            </div>
          </div>
        </section>

        {/* Caption + Overline */}
        <section className="space-y-4">
          <Caption as="h2" className="uppercase tracking-overline">
            Caption &amp; Overline
          </Caption>
          <Caption as="p">Мужская стрижка · 1 ч · Шаляпина 26</Caption>
          <p className="font-sans text-overline uppercase tracking-overline text-fg-muted">
            Премиальный барбершоп · Казань
          </p>
        </section>

        {/* Mono / Prices */}
        <section className="space-y-4">
          <Caption as="h2" className="uppercase tracking-overline">
            Mono — JetBrains Mono · Цены
          </Caption>
          <div className="flex flex-wrap gap-8 items-baseline">
            <Mono size="h3">2 700 ₽</Mono>
            <Mono size="h4">1 800 – 2 700 ₽</Mono>
            <Mono size="body">от 1 600 ₽</Mono>
          </div>
        </section>

        {/* Polymorphic demo */}
        <section className="space-y-4 border-t border-border-default pt-8">
          <Caption as="h2" className="uppercase tracking-overline">
            Polymorphic as-prop
          </Caption>
          <Body size="sm" className="text-fg-muted">
            H1 as=&quot;div&quot;, H2 as=&quot;p&quot;, Body as=&quot;li&quot; — все рендерятся
            корректно.
          </Body>
          <H1 as="div" className="text-h1">
            BASE Premier (as div)
          </H1>
          <H2 as="p">Section title (as p)</H2>
          <ul className="list-none space-y-1">
            <Body as="li">Пункт списка через Body as=&quot;li&quot;</Body>
          </ul>
        </section>

        {/* Buttons */}
        <section className="space-y-8 border-t border-border-default pt-8">
          <Caption as="h2" className="uppercase tracking-overline">
            Button
          </Caption>

          <div className="space-y-6">
            <div className="space-y-2">
              <Caption className="block">primary</Caption>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary" size="sm">
                  Записаться · sm
                </Button>
                <Button variant="primary" size="md">
                  Записаться · md
                </Button>
                <Button variant="primary" size="lg">
                  Записаться · lg
                </Button>
                <Button variant="primary" size="md" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Caption className="block">secondary</Caption>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="secondary" size="sm">
                  Подробнее · sm
                </Button>
                <Button variant="secondary" size="md">
                  Подробнее · md
                </Button>
                <Button variant="secondary" size="lg">
                  Подробнее · lg
                </Button>
                <Button variant="secondary" size="md" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Caption className="block">ghost</Caption>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="ghost" size="sm">
                  Узнать больше · sm
                </Button>
                <Button variant="ghost" size="md">
                  Узнать больше · md
                </Button>
                <Button variant="ghost" size="lg">
                  Узнать больше · lg
                </Button>
                <Button variant="ghost" size="md" disabled>
                  Disabled
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Link */}
        <section className="space-y-4 border-t border-border-default pt-8">
          <Caption as="h2" className="uppercase tracking-overline">
            Link — анимированное подчёркивание
          </Caption>
          <div className="flex flex-wrap gap-6">
            <Link href="/dev/components">Галерея компонентов</Link>
            <Link href="/">Главная страница</Link>
            <Link href="/services" className="text-fg-muted">
              Услуги (muted)
            </Link>
          </div>
        </section>

        {/* Container */}
        <section className="space-y-6 border-t border-border-default pt-8">
          <Caption as="h2" className="uppercase tracking-overline">
            Container — max-width variants
          </Caption>
          <div className="space-y-3">
            <div>
              <Caption className="mb-1 block">default · max-w-[1440px]</Caption>
              <Container className="bg-bg-secondary py-3">
                <Body size="sm" className="text-fg-muted text-center">
                  default (1440px)
                </Body>
              </Container>
            </div>
            <div>
              <Caption className="mb-1 block">narrow · max-w-[1120px]</Caption>
              <Container variant="narrow" className="bg-bg-secondary py-3">
                <Body size="sm" className="text-fg-muted text-center">
                  narrow (1120px)
                </Body>
              </Container>
            </div>
            <div>
              <Caption className="mb-1 block">wide · max-w-[1680px]</Caption>
              <Container variant="wide" className="bg-bg-secondary py-3">
                <Body size="sm" className="text-fg-muted text-center">
                  wide (1680px)
                </Body>
              </Container>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="space-y-6 border-t border-border-default pt-8">
          <Caption as="h2" className="uppercase tracking-overline">
            Grid — 12-col responsive
          </Caption>
          <div className="space-y-4">
            <div>
              <Caption className="mb-2 block">cols=12 · 4 → 6 → 12</Caption>
              <Grid cols={12}>
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="bg-bg-secondary py-4 text-center">
                    <Body size="sm" className="text-fg-muted">
                      {i + 1}
                    </Body>
                  </div>
                ))}
              </Grid>
            </div>
            <div>
              <Caption className="mb-2 block">cols=6 · 4 → 6</Caption>
              <Grid cols={6}>
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="bg-bg-secondary py-4 text-center">
                    <Body size="sm" className="text-fg-muted">
                      {i + 1}
                    </Body>
                  </div>
                ))}
              </Grid>
            </div>
            <div>
              <Caption className="mb-2 block">cols=4 · fixed</Caption>
              <Grid cols={4}>
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="bg-bg-secondary py-4 text-center">
                    <Body size="sm" className="text-fg-muted">
                      {i + 1}
                    </Body>
                  </div>
                ))}
              </Grid>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
