import NextLink from "next/link";

import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { cn } from "@/lib/cn";

const FAQ_ITEMS = [
  {
    question: "Сколько длится стрижка?",
    answer:
      "Час. Это базовая длительность для большинства услуг. Если у вас борода — добавляется 30 минут. Точная длительность каждой услуги указана на странице услуги.",
  },
  {
    question: "Сколько стоит стрижка в барбершопе BASE Premier?",
    answer:
      "Мужская стрижка — от 1 800 до 2 700 ₽ в зависимости от категории мастера. Стрижка с бородой — от 3 200 до 4 600 ₽. Все цены указаны за час работы, включая мытьё головы, моделирование и укладку.",
  },
  {
    question: "Как часто нужно стричься мужчине?",
    answer:
      "В среднем раз в 3–4 недели — это поддерживающая стрижка, когда форма уже есть. Если вы отращиваете волосы или работаете с техническими деталями (fade, taper), мастер порекомендует индивидуальный интервал на первом визите.",
  },
  {
    question: "Можно ли совместить стрижку и маникюр?",
    answer:
      "Да, и это выгодно. Одновременно — мастера работают в 4 руки, час, 2 800–3 700 ₽. Последовательно — два часа, скидка до 15 %, 3 100–4 000 ₽. При записи выбирайте «Комплекс» в виджете.",
  },
  {
    question: "Как отменить или перенести запись?",
    answer:
      "Через ссылку в SMS-напоминании — придёт за сутки до визита. Или позвоните по номеру +7 (917) 918-38-77. Просим предупреждать за 3 часа — так мастер успеет принять другого клиента.",
  },
  {
    question: "Где вы находитесь?",
    answer:
      "Казань, ул. Шаляпина, 26, 1 этаж — в трёхстах метрах от Концертного зала Филармонии. Парковка по периметру здания. Ежедневно 10:00–21:00.",
  },
] as const;

export function FaqSection() {
  return (
    <section className="bg-bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-screen-xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-7 flex items-end justify-between md:mb-16">
          <h2 className="font-mono text-[14px] uppercase tracking-[0.2em] text-fg-muted">
            Вопросы и ответы
          </h2>
          <NextLink
            href="/about"
            className={cn(
              "font-mono text-caption text-fg-muted",
              "border-b border-fg-muted/30 pb-px",
              "transition-[border-color,color] duration-base",
              "hover:border-fg-muted/50 hover:text-fg-muted",
            )}
          >
            Все вопросы →
          </NextLink>
        </div>

        {/* Accordion — first item open by default */}
        <div className="max-w-3xl">
          <FaqAccordion items={[...FAQ_ITEMS]} defaultOpen={0} />
        </div>
      </div>
    </section>
  );
}
