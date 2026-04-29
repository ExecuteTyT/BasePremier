"use client";

import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";
import { useState } from "react";

import { cn } from "@/lib/cn";

const ease = [0.19, 1, 0.22, 1] as const;

type Answer = {
  value: string;
  label: string;
  sub?: string;
};

type Step = {
  id: string;
  question: string;
  answers: Answer[];
};

const STEPS: Step[] = [
  {
    id: "hairLength",
    question: "Какая у вас длина волос?",
    answers: [
      { value: "short", label: "Очень короткие", sub: "≤ 2 см" },
      { value: "medium", label: "Средние", sub: "3–10 см" },
      { value: "long", label: "Длинные", sub: "≥ 10 см" },
    ],
  },
  {
    id: "beard",
    question: "Есть ли у вас борода?",
    answers: [
      { value: "yes", label: "Да, нужна работа с бородой" },
      { value: "no", label: "Нет бороды" },
      { value: "thinking", label: "Хочу попробовать" },
    ],
  },
  {
    id: "goal",
    question: "Что главное в этот раз?",
    answers: [
      { value: "cut", label: "Стрижка", sub: "Основная услуга" },
      { value: "combo", label: "Стрижка + маникюр", sub: "Комплекс в один визит" },
      { value: "nails", label: "Только маникюр / педикюр", sub: "Ногтевой зал Fresh Hands" },
      { value: "care", label: "Уход за лицом", sub: "Бритьё или премиальный уход" },
    ],
  },
  {
    id: "frequency",
    question: "Как часто вы стрижётесь?",
    answers: [
      { value: "frequent", label: "Каждые 2–3 недели", sub: "Поддерживаю форму" },
      { value: "monthly", label: "Раз в месяц", sub: "Стандартный ритм" },
      { value: "rare", label: "Раз в 2–3 месяца", sub: "По необходимости" },
    ],
  },
];

type Answers = Record<string, string>;

type Result = {
  masterSlug: string;
  masterName: string;
  service: string;
  priceRange: string;
};

function getResult(answers: Answers): Result {
  const { goal, beard } = answers;

  if (goal === "nails") {
    return {
      masterSlug: "arina",
      masterName: "Арина",
      service: "Мужской маникюр",
      priceRange: "1 900 ₽",
    };
  }

  if (goal === "combo") {
    return {
      masterSlug: "sayod",
      masterName: "Сайод",
      service: "Стрижка + Экспресс маникюр",
      priceRange: "2 800 – 3 700 ₽",
    };
  }

  if (goal === "care") {
    return {
      masterSlug: "marat",
      masterName: "Марат",
      service: "Премиальный уход за лицом London Grooming",
      priceRange: "2 150 ₽",
    };
  }

  if (beard === "yes") {
    return {
      masterSlug: "vyacheslav",
      masterName: "Вячеслав",
      service: "Мужская стрижка с бородой",
      priceRange: "3 200 – 4 600 ₽",
    };
  }

  return {
    masterSlug: "marat",
    masterName: "Марат",
    service: "Мужская стрижка",
    priceRange: "1 800 – 2 700 ₽",
  };
}

export function QuizFlow() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const currentStep = STEPS[step];
  const progress = (step / STEPS.length) * 100;

  function handleAnswer(value: string) {
    const newAnswers = { ...answers, [currentStep!.id]: value };
    setAnswers(newAnswers);

    if (step < STEPS.length - 1) {
      setDirection(1);
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function handleBack() {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  }

  function handleReset() {
    setAnswers({});
    setStep(0);
    setDirection(1);
    setDone(false);
  }

  const result = done ? getResult(answers) : null;

  return (
    <section className="relative flex min-h-screen flex-col bg-bg-primary">
      {/* Progress bar */}
      <div className="fixed left-0 right-0 top-0 z-50 h-0.5 bg-bg-secondary">
        <motion.div
          className="h-full bg-accent"
          animate={{ width: done ? "100%" : `${progress}%` }}
          transition={{ duration: 0.5, ease }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 py-32 md:px-8">
        <AnimatePresence mode="wait" custom={direction}>
          {!done ? (
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.45, ease }}
            >
              {/* Step label */}
              <p className="mb-6 font-mono text-[12px] uppercase tracking-[0.2em] text-fg-muted">
                Шаг {step + 1} из {STEPS.length}
              </p>

              {/* Question */}
              <h1
                className="mb-7 font-display font-normal text-fg-primary"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 3rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {currentStep!.question}
              </h1>

              {/* Answers */}
              <div className="flex flex-col gap-3">
                {currentStep!.answers.map((answer) => (
                  <motion.button
                    key={answer.value}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(answer.value)}
                    className={cn(
                      "flex items-center justify-between px-6 py-5",
                      "border border-border-strong bg-bg-secondary text-left",
                      "transition-[border-color,background-color] duration-base",
                      "hover:border-fg-muted/40 hover:bg-bg-primary",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                    )}
                  >
                    <span>
                      <span className="block font-display font-normal text-[1.125rem] text-fg-primary">
                        {answer.label}
                      </span>
                      {answer.sub && (
                        <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-wider text-fg-muted">
                          {answer.sub}
                        </span>
                      )}
                    </span>
                    <span className="ml-4 text-fg-muted/40">→</span>
                  </motion.button>
                ))}
              </div>

              {/* Back button */}
              {step > 0 && (
                <button
                  onClick={handleBack}
                  className="mt-8 font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted transition-opacity hover:opacity-70"
                >
                  ← Назад
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              {/* Result */}
              <p className="mb-8 font-mono text-[12px] uppercase tracking-[0.2em] text-fg-muted">
                Ваша рекомендация
              </p>

              <div className="mb-7 border border-border-strong bg-bg-secondary p-8">
                <div className="mb-6 flex items-start justify-between gap-6">
                  {/* Master initial placeholder */}
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center bg-bg-primary">
                    <span
                      className="select-none font-display font-normal text-fg-muted/30"
                      style={{ fontSize: "2rem" }}
                    >
                      {result!.masterName[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="mb-0.5 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-muted">
                      Мастер
                    </p>
                    <p className="font-display font-normal text-[1.5rem] text-fg-primary">
                      {result!.masterName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[1.125rem] text-fg-primary">
                      {result!.priceRange}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-0.5 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-muted">
                    Услуга
                  </p>
                  <p className="font-display font-normal text-[1.125rem] text-fg-primary">
                    {result!.service}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  data-yclients-open
                  className="w-full bg-accent py-4 font-mono text-[13px] uppercase tracking-[0.12em] text-accent-fg transition-opacity hover:opacity-80"
                >
                  Записаться к {result!.masterName === "Арина" ? "Арине" : `${result!.masterName}у`}
                </button>

                <button
                  data-yclients-open
                  className="w-full border border-border-strong py-4 font-mono text-[13px] uppercase tracking-[0.12em] text-fg-muted transition-colors hover:border-fg-muted/40 hover:text-fg-primary"
                >
                  Записаться к любому мастеру
                </button>

                <button
                  onClick={handleReset}
                  className="mt-2 self-center font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted transition-opacity hover:opacity-70"
                >
                  Пройти заново
                </button>
              </div>

              <div className="mt-8 border-t border-border-default pt-6">
                <NextLink
                  href="/barbers"
                  className="font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted transition-opacity hover:opacity-70"
                >
                  ← Посмотреть всех мастеров
                </NextLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
