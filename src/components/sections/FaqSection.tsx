import NextLink from "next/link";

import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { cn } from "@/lib/cn";

// On homepage: Q1, Q3, Q5, Q7, Q11 — most conversion-focused per CONTENT-BRIEF
const FAQ_ITEMS = [
  {
    question: "Сколько длится стрижка?",
    answer:
      "Час. Это базовая длительность для большинства услуг. Если у вас борода — добавляется 30 минут. Точная длительность каждой услуги указана на странице услуги.",
  },
  {
    question: "Что значат разные цены на одну услугу — 1 800 и 2 700 ₽?",
    answer:
      "Это категории мастеров. У младших мастеров — стартовая цена. У старших — финальная. Все мастера прошли одинаковое обучение внутри BASE Premier; разница в опыте, скорости и количестве отработанных случаев. Выбор — за вами.",
  },
  {
    question: "Какие средства используются на полках?",
    answer:
      "Graham Hill (Германия), Davines (Италия), The London Grooming Co (Великобритания), Solomon's (Великобритания). Это профессиональная косметика, а не «парикмахерский ширпотреб». Подбор делает мастер по типу ваших волос и кожи головы.",
  },
  {
    question: "Можно ли совместить стрижку и маникюр?",
    answer:
      "Да, и это выгодно. Есть два варианта: одновременно (мастера работают в 4 руки, час, 2 800–3 700 ₽) или последовательно (два часа, 3 100–4 000 ₽, скидка до 15 %). При записи на комплекс выбирайте «Комплекс» в виджете записи.",
  },
  {
    question: "Сколько у вас филиалов в Казани?",
    answer:
      "Один. Шаляпина, 26, в самом центре, в трёхстах метрах от Концертного зала Филармонии. Парковка — по периметру здания и на соседних улицах.",
  },
] as const;

export function FaqSection() {
  return (
    <section className="bg-bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-screen-xl px-6 md:px-8">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between md:mb-16">
          <h2 className="font-mono text-[14px] uppercase tracking-[0.2em] text-fg-muted">
            Вопросы и ответы
          </h2>
          <NextLink
            href="/about"
            className={cn(
              "font-mono text-caption text-fg-muted/60",
              "border-b border-fg-muted/20 pb-px",
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
