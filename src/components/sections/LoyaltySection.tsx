"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

const ease = [0.19, 1, 0.22, 1] as const;

const BENEFITS = [
  {
    index: "01",
    title: "Накопительная скидка",
    body: "Программа лояльности работает через YClients. Каждый визит — баллы, баллы — скидка. Детали узнайте у мастера при первом визите.",
  },
  {
    index: "02",
    title: "Приведи друга",
    body: "Порекомендуйте BASE Premier — оба получите бонус на следующий визит. Условия уточняйте на стойке администратора.",
  },
  {
    index: "03",
    title: "Подарочные сертификаты",
    body: "Физические сертификаты на любую сумму. Отличный подарок для тех, кто ценит качество. Приобрести можно в салоне на Шаляпина 26.",
  },
] as const;

export function LoyaltySection() {
  return (
    <section className="bg-bg-primary py-24 md:py-32">
      <div className="mx-auto max-w-screen-xl px-6 md:px-8">
        {/* Header */}
        <motion.h2
          className="mb-7 font-mono text-[14px] uppercase tracking-[0.2em] text-fg-muted md:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease }}
        >
          Для постоянных гостей
        </motion.h2>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {BENEFITS.map((item, i) => (
            <motion.div
              key={item.index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
              className={cn(
                "flex flex-col gap-6 bg-bg-secondary p-5 md:p-8",
                "border border-border-default",
                "transition-[border-color,background-color] duration-slow",
                "hover:border-border-strong active:bg-bg-elevated",
              )}
            >
              <span
                aria-hidden="true"
                className="font-display italic font-normal leading-none select-none text-[2rem] text-fg-primary/35 md:text-[3rem]"
              >
                {item.index}
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="font-sans font-medium uppercase tracking-[0.05em] text-[1rem] text-fg-primary">
                  {item.title}
                </h3>
                <p className="font-sans text-body leading-relaxed text-fg-muted">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
