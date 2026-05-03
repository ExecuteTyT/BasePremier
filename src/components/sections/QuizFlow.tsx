"use client";

import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";
import { useState } from "react";

import { BarberAvatarPlaceholder } from "@/components/ui/BarberAvatarPlaceholder";
import { BARBERS } from "@/data/barbers";
import { SERVICE_CATEGORIES } from "@/data/services";
import { cn } from "@/lib/cn";
import {
  formatDuration,
  formatPrice,
  formatPriceFrom,
  formatPriceRange,
  reviewWord,
} from "@/lib/format";

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
  serviceId: string;
};

function getResult(answers: Answers): Result {
  const { goal, beard } = answers;

  if (goal === "nails") return { masterSlug: "arina", serviceId: "manicure" };
  if (goal === "combo") return { masterSlug: "sayod", serviceId: "combo-express" };
  if (goal === "care") return { masterSlug: "marat", serviceId: "face-london" };
  if (beard === "yes") return { masterSlug: "vyacheslav", serviceId: "haircut-beard" };
  return { masterSlug: "marat", serviceId: "haircut" };
}

const MASTER_DATIVE: Record<string, string> = {
  marat: "Марату",
  vyacheslav: "Вячеславу",
  sayod: "Сайоду",
  aleksey: "Алексею",
  timerlan: "Тимерлану",
  nikolay: "Николаю",
  dzhim: "Джиму",
  arina: "Арине",
  murat: "Мурату",
  diana: "Диане",
};

function findServiceById(id: string) {
  for (const cat of SERVICE_CATEGORIES) {
    const svc = cat.services.find((s) => s.id === id);
    if (svc) return svc;
  }
  return null;
}

const RESULT_DELAYS = [0, 0.08, 0.18, 0.28, 0.38] as const;

type QuizFlowProps = {
  variant?: "full" | "inline";
};

export function QuizFlow({ variant = "full" }: QuizFlowProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const isInline = variant === "inline";

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
  const barber = result ? (BARBERS.find((b) => b.slug === result.masterSlug) ?? null) : null;
  const service = result ? findServiceById(result.serviceId) : null;

  let priceStr = "";
  if (service) {
    if (Array.isArray(service.price)) {
      priceStr = formatPriceRange(service.price[0], service.price[1]);
    } else if (service.from) {
      priceStr = formatPriceFrom(service.price);
    } else {
      priceStr = formatPrice(service.price);
    }
  }

  return (
    <div
      className={cn(
        "relative flex flex-col",
        isInline ? "bg-transparent" : "min-h-screen bg-bg-primary",
      )}
    >
      {/* Progress bar — full mode only (fixed viewport bar) */}
      {!isInline && (
        <div className="fixed left-0 right-0 top-0 z-50 h-0.5 bg-bg-secondary">
          <motion.div
            className="h-full bg-accent"
            animate={{ width: done ? "100%" : `${progress}%` }}
            transition={{ duration: 0.5, ease }}
          />
        </div>
      )}

      <div
        className={cn(
          "mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 md:px-8",
          isInline ? "py-0" : "py-32",
        )}
      >
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
              <p className="mb-6 font-mono text-[12px] uppercase tracking-[0.2em] text-fg-muted">
                Шаг {step + 1} из {STEPS.length}
              </p>

              {isInline ? (
                <h3
                  className="mb-7 font-display font-normal text-fg-primary"
                  style={{
                    fontSize: "clamp(1.75rem, 4vw, 3rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {currentStep!.question}
                </h3>
              ) : (
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
              )}

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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease }}
            >
              {/* Overline */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: RESULT_DELAYS[0] }}
                className="mb-8 font-mono text-[12px] uppercase tracking-[0.2em] text-fg-muted"
              >
                Ваша рекомендация
              </motion.p>

              {/* Master card */}
              {barber && (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease, delay: RESULT_DELAYS[1] }}
                  className="mb-3 border border-border-strong bg-bg-secondary"
                >
                  <div className="flex gap-5 p-6">
                    {/* Avatar placeholder */}
                    <div className="relative h-20 w-20 flex-shrink-0">
                      <BarberAvatarPlaceholder name={barber.name} compact />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <span
                          className="font-display font-normal text-fg-primary"
                          style={{ fontSize: "1.375rem", letterSpacing: "-0.02em" }}
                        >
                          {barber.name}
                        </span>
                        {barber.isBestEmployee && (
                          <span className="border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-accent-fg/70">
                            Лучший сотрудник
                          </span>
                        )}
                        {barber.isSenior && !barber.isBestEmployee && (
                          <span className="border border-border-default px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-fg-muted">
                            Старший мастер
                          </span>
                        )}
                      </div>

                      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted">
                        {barber.role}
                        {" · "}
                        {barber.reviews}&nbsp;{reviewWord(barber.reviews)}
                      </p>

                      {barber.techniques && barber.techniques.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {barber.techniques.map((t) => (
                            <span
                              key={t}
                              className="border border-border-default px-2 py-0.5 font-mono text-[10px] text-fg-subtle"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Service card */}
              {service && (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease, delay: RESULT_DELAYS[2] }}
                  className="mb-7 border border-border-strong bg-bg-secondary px-6 py-5"
                >
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-muted">
                    Услуга
                  </p>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className="font-display font-normal text-fg-primary"
                        style={{ fontSize: "1.125rem", letterSpacing: "-0.01em" }}
                      >
                        {service.name}
                      </p>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-fg-muted">
                        {formatDuration(service.duration)}
                      </p>
                    </div>
                    <p className="flex-shrink-0 font-mono text-[1rem] text-fg-primary">
                      {priceStr}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: RESULT_DELAYS[3] }}
                className="flex flex-col gap-3"
              >
                <button
                  data-yclients-open
                  data-yclients-master={barber?.name}
                  data-yclients-service={service?.name}
                  className="w-full bg-accent py-4 font-mono text-[13px] uppercase tracking-[0.12em] text-accent-fg transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Записаться к&nbsp;
                  {barber ? (MASTER_DATIVE[barber.slug] ?? barber.name) : "мастеру"}
                </button>

                <button
                  data-yclients-open
                  data-yclients-service={service?.name}
                  className="w-full border border-border-strong py-4 font-mono text-[13px] uppercase tracking-[0.12em] text-fg-muted transition-colors hover:border-fg-muted/40 hover:text-fg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Записаться к любому мастеру
                </button>

                <button
                  onClick={handleReset}
                  className="mt-2 self-center font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted transition-opacity hover:opacity-70"
                >
                  Пройти заново
                </button>
              </motion.div>

              {/* Footer links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease, delay: RESULT_DELAYS[4] }}
                className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-border-default pt-6"
              >
                {barber && (
                  <NextLink
                    href={`/barbers/${barber.slug}`}
                    className="font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted transition-opacity hover:opacity-70"
                  >
                    Профиль мастера →
                  </NextLink>
                )}
                {isInline ? (
                  <NextLink
                    href="/quiz"
                    className="font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted transition-opacity hover:opacity-70"
                  >
                    Подобрать подробнее →
                  </NextLink>
                ) : (
                  <NextLink
                    href="/barbers"
                    className="font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted transition-opacity hover:opacity-70"
                  >
                    ← Все мастера
                  </NextLink>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
