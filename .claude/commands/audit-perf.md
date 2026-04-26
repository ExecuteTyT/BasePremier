---
description: Прогон Lighthouse mobile perf-аудита для текущей страницы или всего сайта BASE Premier
argument-hint: [<url>] — необязательно, по умолчанию весь сайт
---

# Audit Performance: $ARGUMENTS

Запусти Lighthouse audit для проверки performance-budget'ов BASE Premier. Используй prod-build, не dev.

## Шаги

1. **Сборка production:**
   ```bash
   pnpm build && pnpm start
   ```
   Подожди, пока сервер поднимется на `http://localhost:3000`.

2. **Запуск Lighthouse:**
   - Используй subagent `perf-auditor` (см. `.claude/agents/perf-auditor.md`).
   - Альтернативно — Playwright + Chrome DevTools Protocol (см. `.claude/skills/lighthouse-check/SKILL.md`).

3. **Если `$ARGUMENTS` указан** — аудит только этого URL.
   Если нет — аудит всех ключевых страниц:
   - `/`
   - `/services`
   - `/services/strizhka-s-borodoy` (или другая популярная)
   - `/barbers`
   - `/barbers/marat` (любой мастер)
   - `/about`
   - `/journal`
   - `/journal/{последняя статья}`
   - `/contacts`

4. **Параметры аудита:**
   - Mobile (CPU 4× slowdown, network "Slow 4G").
   - Categories: Performance, Accessibility, Best Practices, SEO.
   - Three runs each, take median (lighthouse-ci делает автоматически).

5. **Сравни с бюджетами из `docs/DESIGN-BRIEF.md` § 6:**

   | Метрика     | Цель                | Статус        |
   |-------------|---------------------|---------------|
   | LCP          | < 1.8s (главная)    | ✅ / ⚠️ / ❌    |
   | INP          | < 100ms             | ✅ / ⚠️ / ❌    |
   | CLS          | < 0.05              | ✅ / ⚠️ / ❌    |
   | TBT          | < 200ms             | ✅ / ⚠️ / ❌    |
   | Performance  | ≥ 92                | ✅ / ⚠️ / ❌    |
   | A11y          | 100                 | ✅ / ⚠️ / ❌    |
   | SEO          | 100                 | ✅ / ⚠️ / ❌    |

6. **Если бюджеты не пройдены — диагностика:**
   - Какой ресурс самый тяжёлый? (Network panel)
   - Какой компонент блокирует main-thread? (Performance panel)
   - Какие CSS селекторы тяжелее всего? (Coverage panel)
   - JS bundle: какие dependencies занимают больше всего? (`pnpm analyze`)

7. **Типичные причины проседаний (для BASE Premier специфично):**
   - 3D-сцена грузится eagerly вместо lazy → `dynamic(import, { ssr: false, loading })`.
   - GSAP бандлится целиком, а не только используемые модули → `import { ScrollTrigger } from 'gsap/ScrollTrigger'`.
   - Изображения без AVIF/WebP → проверь `next.config.ts` и `next/image` использование.
   - Фонты без `font-display: swap` → проверь Google Fonts конфигурацию.
   - Lenis работает на серверной странице с `'use client'` целиком → выноси Lenis в отдельный provider.

8. **Финальный отчёт:**
   - Сохрани JSON и HTML отчёты в `tests/lighthouse-reports/{date}/{page}.{json,html}`.
   - Создай summary в Markdown, отметь все ❌ и ⚠️, предложи фиксы.

9. **Если все бюджеты пройдены — отлично.** Если нет — открой issue или сделай PR с фиксами.

## Полезные команды

```bash
# Локальный Lighthouse через CLI
npx lighthouse http://localhost:3000/ \
  --form-factor=mobile \
  --throttling-method=simulate \
  --output=html,json \
  --output-path=./lh-report

# Анализ bundle-size
pnpm build && pnpm dlx @next/bundle-analyzer
```

## Ссылки на документы

- `.claude/agents/perf-auditor.md` — детальный workflow аудита
- `.claude/skills/lighthouse-check/SKILL.md` — как запустить Lighthouse через Playwright + CDP
- `docs/DESIGN-BRIEF.md` § 6 — performance бюджеты
