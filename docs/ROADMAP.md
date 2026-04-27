# ROADMAP.md

## Полный план разработки сайта BASE Premier (16 недель)

> **Назначение документа:** пошаговый план «что делать на этой неделе и каким тикетом начинать» для solo-founder workflow с Claude Code. Каждый тикет описан в формате, который Claude Code понимает «из коробки» — copy-paste в терминал, и работа начинается.
>
> **Версия:** 1.0 от 26.04.2026
> **Источник истины:** ARCHITECTURE.md, BRAND.md, CLIENT-ANSWERS.md
> **Tracker:** GitHub Issues или Linear (свободный план достаточно)

---

## 0. КАК ЧИТАТЬ ЭТОТ ДОКУМЕНТ

### 0.1. Структура

Проект разбит на **8 фаз** (Phase 0 — Phase 7). Каждая фаза:

- Имеет **цель** (что должно работать к концу фазы)
- Содержит **эпики** — группы связанных тикетов
- Имеет **gate** — условие выхода (что должно быть готово, чтобы перейти к следующей фазе)

### 0.2. Формат тикета

Каждый тикет идёт в формате:

```
### [PREFIX-XX] Название тикета
**Goal:** одно предложение — зачем это нужно
**Acceptance:** список булетов — что должно работать
**Files:** примерные файлы которые тронем
**Depends on:** какие тикеты должны быть закрыты раньше
**Estimate:** часы или дни (для одного человека)
**Claude Code prompt:** готовый промпт для запуска работы
```

### 0.3. Префиксы

| Префикс | Значение                      |
| ------- | ----------------------------- |
| **BS**  | Bootstrap (фаза 0)            |
| **BR**  | Brand & Tokens (фаза 1)       |
| **UI**  | Atomic UI components (фаза 2) |
| **HOM** | Home page (фаза 3)            |
| **PG**  | Inner pages (фаза 4)          |
| **INT** | Integrations (фаза 5)         |
| **POL** | Polish (фаза 6)               |
| **LAU** | Launch (фаза 7)               |

### 0.4. Приоритеты

🔴 **Blocker** — без этого следующая фаза не стартует
🟡 **Important** — нужно в этой фазе, можно в её конце
🟢 **Nice-to-have** — можно отложить, если выпадаем из графика

---

## 1. ВЫСОКОУРОВНЕВЫЙ ТАЙМЛАЙН

```
Неделя 1   ──────────────  Phase 0: Bootstrap (2 дня) + Phase 1: Brand
Неделя 2   ──────────────  Phase 1: Brand & Tokens (продолжение)
Неделя 3   ──────────────  Phase 2: Atomic Components
Неделя 4   ──────────────  Phase 2: Atomic Components (gate)
Неделя 5   ──────────────  Phase 3: Home — Hero + Manifesto
Неделя 6   ──────────────  Phase 3: Home — Services + Barbers + Interior
Неделя 7   ──────────────  Phase 3: Home — Pricing + Reviews + Loyalty + Footer (gate)
Неделя 8   ──────────────  Phase 4: /services + /barbers
Неделя 9   ──────────────  Phase 4: /about + /contacts + /quiz
Неделя 10  ──────────────  Phase 4: /journal + /404 + /bp (gate)
Неделя 11  ──────────────  Phase 5: Sanity CMS + content migration
Неделя 12  ──────────────  Phase 5: YClients widget + API + Live occupancy
Неделя 13  ──────────────  Phase 5: Analytics + Yandex.Direct ready (gate)
Неделя 14  ──────────────  Phase 6: Performance, SEO, A11y polish
Неделя 15  ──────────────  Phase 6: QA, cross-browser, mobile testing
Неделя 16  ──────────────  Phase 7: Soft launch + redirect old URLs (LIVE)
```

**Старт:** условный день D = первый рабочий день после `claude /init`
**Live:** D + 16×7 = 112 календарных дней (~3.5 месяца)

---

## 2. ЗАВИСИМОСТИ ОТ ЗАКАЗЧИКА

Эти данные нужны ОТ ЗАКАЗЧИКА (Айрата) к указанным неделям. Без них блокируются соответствующие тикеты:

| Что нужно                               | Дедлайн    | Без чего блокируется               |
| --------------------------------------- | ---------- | ---------------------------------- |
| YClients API-ключ + ID компании/филиала | Нед. 11    | Виджет, live occupancy             |
| Полные ФИО + биографии 10 мастеров      | Нед. 8     | Страницы мастеров, /barbers        |
| GPS-координаты салона (lat, lng)        | Нед. 5     | JSON-LD, Google Maps embed         |
| Точный юр. адрес ИП (улица + дом)       | Нед. 5     | JSON-LD, footer                    |
| Email домена (`info@basepremier.ru`)    | Нед. 12    | Контакты в footer, формы           |
| Профессиональная фотосессия 10 мастеров | **Нед. 8** | Страницы /barbers, /barbers/[slug] |
| Доступ к VPS (SSH-ключ, IP)             | Нед. 1     | Деплой, CI/CD                      |
| Доступ к домену reg.ru (DNS)            | Нед. 15    | Финальный live                     |
| Согласие на 12 тем для блога            | Нед. 11    | Sanity заполнение                  |

**Тактика:** в начале каждой недели (понедельник) сверяешь чек-лист, если что-то не пришло — пишешь Айрату напоминание. Если блокер не закрывается за 3 дня — переходишь к параллельным тикетам, не теряя времени.

---

# PHASE 0: BOOTSTRAP

**Цель фазы:** работающий Next.js 15 проект на VPS, минимальный пайплайн «commit → live URL».
**Длительность:** 2 дня (нед. 1, дни 1-2).
**Gate:** видимая страница `https://staging.basepremier.ru` с текстом «BASE Premier — coming soon», деплой через `git push`.

---

### [BS-01] Создать Next.js 15 проект 🔴

**Goal:** заскаффолдить чистый Next.js 15 + React 19 + TypeScript strict проект.

**Acceptance:**

- `npx create-next-app@latest base-premier-web` с флагами `--typescript --tailwind --app --no-src-dir`
- Переименовать структуру под нашу: `mv app src/app`, обновить `tsconfig.json` paths
- Удалить дефолтный `page.tsx` → пустой компонент с текстом «BASE Premier»
- `npm run dev` запускается без ошибок на http://localhost:3000
- `tsconfig.json` с `"strict": true`, `"noUncheckedIndexedAccess": true`

**Files:** весь проект
**Depends on:** —
**Estimate:** 30 мин

**Claude Code prompt:**

```
Initialize a fresh Next.js 15 project for BASE Premier barbershop redesign.
Read CLAUDE.md and docs/ARCHITECTURE.md sections 1-2 before starting.
Use App Router, TypeScript strict mode, Tailwind v4 (CSS-first config).
Create in /home/repo/base-premier-web.
After scaffold, replace default page with placeholder "BASE Premier" text and verify dev server runs.
```

---

### [BS-02] Tooling — ESLint, Prettier, Husky, lint-staged 🔴

**Goal:** code quality gate на каждый commit.

**Acceptance:**

- `eslint.config.mjs` с правилами из ARCHITECTURE.md §1.6 (no-default-export, sort-imports, no-console кроме error/warn)
- `.prettierrc` (printWidth 100, tabWidth 2, semi true, singleQuote false, trailingComma all)
- Husky pre-commit hook: `lint-staged` запускает ESLint + Prettier + tsc на staged-файлах
- `npm run typecheck` (alias на `tsc --noEmit`) проходит за < 5 сек
- `npm run lint` проходит без warnings

**Files:** `eslint.config.mjs`, `.prettierrc`, `.husky/pre-commit`, `package.json`
**Depends on:** BS-01
**Estimate:** 1 час

**Claude Code prompt:**

```
Set up ESLint, Prettier, Husky, lint-staged per docs/ARCHITECTURE.md §1.6.
After installation, create one test file with intentional lint error and verify the pre-commit hook blocks the commit.
```

---

### [BS-03] Tailwind v4 + tokens.css 🔴

**Goal:** перейти на Tailwind v4 CSS-first config, импортировать токены из BRAND.md §1.

**Acceptance:**

- `npm install tailwindcss@4 @tailwindcss/postcss` (или @next-canary)
- `src/styles/tokens.css` создан целиком из BRAND.md §1.1 (все CSS-переменные `--color-*`, `--space-*`, `--radius-*`, etc.)
- `src/app/globals.css` имеет `@import "tailwindcss"; @import "../styles/tokens.css";`
- Тестовый `<div className="bg-bg-primary text-fg-primary p-l-fluid">Hello</div>` корректно рендерится в dark-фоне с белым текстом
- Тестовая утилита `bg-accent` рендерит #1B2A4E (Navy)

**Files:** `src/styles/tokens.css`, `src/app/globals.css`, `postcss.config.mjs`
**Depends on:** BS-01
**Estimate:** 2 часа

**Claude Code prompt:**

```
Migrate to Tailwind v4 CSS-first config. Copy ALL CSS variables from docs/BRAND.md §1.1 into src/styles/tokens.css under @theme directive. Import in globals.css. Verify with one styled <div> on the home page.
```

---

### [BS-04] Подключить шрифты Fraunces + Inter + JetBrains Mono 🔴

**Goal:** все три шрифта работают через `next/font/google`, без CLS.

**Acceptance:**

- `src/app/fonts.ts` содержит экспорты `fraunces`, `inter`, `jetbrainsMono` per BRAND.md §2.2
- `src/app/layout.tsx` оборачивает `<html>` в `${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`
- `tokens.css` ссылается на CSS-переменные `--font-display`, `--font-sans`, `--font-mono`
- Тест: `<h1 className="font-display text-h1">base premier</h1>` рендерится Fraunces, без FOIT/FOUT
- В Lighthouse — нет варнингов про fonts, CLS = 0

**Files:** `src/app/fonts.ts`, `src/app/layout.tsx`, `src/styles/tokens.css`
**Depends on:** BS-03
**Estimate:** 1 час

**Claude Code prompt:**

```
Set up Fraunces, Inter, and JetBrains Mono via next/font/google per docs/BRAND.md §2.2.
Subsets: latin + cyrillic. Display: swap. Preload only display + sans (mono is lazy).
Verify all three render correctly with the .font-* utility classes.
```

---

### [BS-05] Настроить Lenis (smooth scroll) 🔴

**Goal:** глобальный smooth scroll, синхронизированный с GSAP ScrollTrigger.

**Acceptance:**

- `npm install lenis @studio-freight/react-lenis` (или @darkroom.engineering/lenis)
- `src/components/providers/LenisProvider.tsx` оборачивает `{children}`, инициализирует Lenis с настройками из ARCHITECTURE.md §10
- `smoothTouch: false`, `duration: 1.2`, `easing: t => Math.min(1, 1.001 - 2^(-10*t))`
- На странице тестовый длинный контент (10 секций) — скролл плавный, не jumpy
- На mobile — нативный скролл (touch detection)
- Готовность к BR-09 (sync с ScrollTrigger)

**Files:** `src/components/providers/LenisProvider.tsx`, `src/app/layout.tsx`
**Depends on:** BS-01
**Estimate:** 1 час

**Claude Code prompt:**

```
Install Lenis and set up smooth scroll per docs/ARCHITECTURE.md §10. Create LenisProvider component, wrap root layout. Verify smooth scrolling on desktop and that mobile uses native scroll.
```

---

### [BS-06] Базовый layout (Header + Footer плейсхолдеры) 🟡

**Goal:** общая обёртка для всех страниц с заголовком и футером (без стилей пока).

**Acceptance:**

- `src/components/layout/Header.tsx` — sticky, у которой только лого `BP` и кнопка «записаться» (без логики)
- `src/components/layout/Footer.tsx` — пустой `<footer>` с `<span>© 2026 BASE Premier</span>`
- `layout.tsx` подключает Header и Footer
- Header высота 64px desktop / 56px mobile, фон `bg-bg-primary/80 backdrop-blur`
- Все типографские утилиты работают

**Files:** `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/app/layout.tsx`
**Depends on:** BS-04
**Estimate:** 1 час

**Claude Code prompt:**

```
Create placeholder Header (sticky, logo + booking button) and Footer (just copyright).
Both should use tokens from BRAND.md. No animations yet, just structure.
```

---

### [BS-07] .env, env-схема через Zod 🔴

**Goal:** все переменные окружения валидируются на старте; ошибки не пропускаются в продакшн.

**Acceptance:**

- `npm install zod @t3-oss/env-nextjs`
- `src/env.ts` содержит схему: `NEXT_PUBLIC_SITE_URL`, `YCLIENTS_API_TOKEN`, `YCLIENTS_COMPANY_ID`, `SANITY_PROJECT_ID`, etc. (per ARCHITECTURE.md §11)
- `.env.example` с заглушками
- `.env.local` в `.gitignore`
- Импорт `import { env } from "@/env"` падает с typed-ошибкой при отсутствии required-переменной

**Files:** `src/env.ts`, `.env.example`, `.gitignore`
**Depends on:** BS-01
**Estimate:** 30 мин

**Claude Code prompt:**

```
Set up environment variable validation with @t3-oss/env-nextjs and Zod per docs/ARCHITECTURE.md §11.
Create env.ts and .env.example. Test that missing required vars throw clear errors.
```

---

### [BS-08] Первый деплой на VPS (smoke test) 🔴

**Goal:** видеть https://staging.basepremier.ru, обновляющийся при `git push`.

**Acceptance:**

- На VPS установлен Node 20+, pm2 (или systemd-сервис), nginx, certbot
- Создан subdomain `staging.basepremier.ru`, A-запись на DNS
- Let's Encrypt сертификат выдан
- Nginx-конфиг как в ARCHITECTURE.md §12.3 (proxy_pass на :3000)
- GitHub Actions workflow `.github/workflows/deploy.yml`: на push в `main` → SSH → `git pull && npm ci && npm run build && pm2 reload base-premier`
- Push в main → через 2-3 минуты страница «BASE Premier — coming soon» обновлена
- HTTPS работает, http→https редирект

**Files:** `.github/workflows/deploy.yml`, `/etc/nginx/sites-available/staging.basepremier.ru`, `ecosystem.config.js`
**Depends on:** BS-01..BS-07, доступ к VPS
**Estimate:** 4 часа (большая часть — DevOps на VPS)

**Claude Code prompt:**

```
Read docs/ARCHITECTURE.md §12 (CI/CD on VPS).
1) Generate nginx config for staging.basepremier.ru
2) Generate GitHub Actions workflow with SSH deploy
3) Generate pm2 ecosystem.config.js
Output the bash commands user should run on the VPS in order.
Do NOT run them automatically - print them as a checklist.
```

---

### Phase 0 Gate ✅

К концу нед. 1, день 2:

- [ ] `staging.basepremier.ru` отдаёт 200 OK
- [ ] HTTPS работает
- [ ] `git push` к `main` → автоматический деплой за < 5 мин
- [ ] Все 3 шрифта подключены, видны на странице
- [ ] Tailwind v4 + tokens.css работают
- [ ] Lenis smooth scroll работает на desktop
- [ ] ESLint + Prettier + Husky зелёные

---

# PHASE 1: BRAND & TOKENS

**Цель фазы:** все базовые визуальные системы (типографика, кнопки, курсор, sound, transitions) работают как Lego — можно собирать страницы.
**Длительность:** 1.5 недели (нед. 1.5 — нед. 2).
**Gate:** Storybook-страница `/dev/components` показывает все готовые компоненты.

---

### [BR-01] Typography components 🔴

**Goal:** компоненты `<H1>`, `<H2>`, ..., `<Body>`, `<Caption>` с правильными шрифтами и размерами из BRAND.md §2.

**Acceptance:**

- `src/components/typography/` содержит: `H1.tsx`, `H2.tsx`, `H3.tsx`, `H4.tsx`, `Body.tsx`, `Caption.tsx`, `Mono.tsx`
- Каждый принимает `className`, `as` (polymorphic), children
- Размеры через clamp() из BRAND.md §2.3
- H1 EN-only (Fraunces), H2-H6 RU+EN, Body — Inter, Mono — JetBrains Mono для цен
- Storybook `/dev/components` показывает все варианты на одной странице

**Files:** `src/components/typography/*`, `src/app/dev/components/page.tsx`
**Depends on:** BS-04
**Estimate:** 3 часа

**Claude Code prompt:**

```
Create polymorphic typography components per docs/BRAND.md §2.3.
H1 uses Fraunces (display), H2-H6 use Fraunces too but with optical sizing tweaks, Body uses Inter, Mono uses JetBrains Mono.
Set up /dev/components page (gated to dev-only via process.env.NODE_ENV check) and showcase all variants.
```

---

### [BR-02] Button + Link primitives 🔴

**Goal:** базовые интерактивные элементы с правильными hover/focus/disabled.

**Acceptance:**

- `Button.tsx` — варианты `primary` (Navy fill), `secondary` (transparent + Navy border), `ghost`, размеры `sm` `md` `lg`
- `Link.tsx` — обёртка над `next/link` с подчёркиванием на hover (animated)
- Все focus-rings через `:focus-visible` с outline `2px solid var(--color-accent)`, не `outline: none`
- Disabled state — opacity 0.5, cursor not-allowed, не реагирует на hover
- Минимум motion — на этом этапе никакой магии

**Files:** `src/components/ui/Button.tsx`, `src/components/ui/Link.tsx`
**Depends on:** BR-01
**Estimate:** 2 часа

---

### [BR-03] Container + Grid primitives 🟡

**Goal:** layout-обёртки, чтобы каждая секция знала свои отступы и max-width.

**Acceptance:**

- `Container.tsx` — `max-w-[1440px] mx-auto px-l-fluid` (px масштабируется через clamp)
- `Grid.tsx` — 12-колоночный, `gap-l-fluid`
- Тест: Container с детьми внутри занимает корректные ширины на 360px / 768px / 1280px / 1920px

**Files:** `src/components/layout/Container.tsx`, `src/components/layout/Grid.tsx`
**Depends on:** BS-03
**Estimate:** 1 час

---

### [BR-04] Custom cursor 🟡

**Goal:** кастомный курсор работает на всём сайте, magnetic-эффект на CTA.

**Acceptance:**

- `src/components/effects/Cursor.tsx` — фиксированный круг 8px (default), 64px на hover ссылок/кнопок, magnetic привязывание к ближайшему `[data-cursor="magnet"]`
- На touch-устройствах — disabled (`@media (hover: hover)`)
- При наведении на текст — курсор становится "I-beam" (вертикальная линия)
- При наведении на видео или кнопку «play» — курсор показывает текст «PLAY» в Mono шрифтом
- Performance: уровень 60fps на ноутбуке среднего класса
- Aria: `aria-hidden="true"`, не ломает screen readers

**Files:** `src/components/effects/Cursor.tsx`
**Depends on:** BS-05 (Lenis уже есть)
**Estimate:** 4 часа

**Claude Code prompt:**

```
Implement a custom cursor per docs/BRAND.md §6.
Use raw mouseMove + lerp interpolation, not framer-motion (faster).
Add magnetic effect for elements with data-cursor="magnet" attribute.
Disable on touch devices via @media (hover: hover) check.
```

---

### [BR-05] Page transitions (loader between pages) 🟡

**Goal:** при переходе между страницами — видимый loader с анимацией, не белая вспышка.

**Acceptance:**

- `src/components/effects/PageTransition.tsx` — обёртка над App Router children
- Использует `framer-motion`'s `<AnimatePresence mode="wait">` + `motion.div`
- Анимация: текущая страница уходит вверх (y: -50, opacity: 0), новая приходит снизу (y: 50 → 0)
- Длительность 400ms, easing `[0.7, 0, 0.2, 1]`
- Не блокирует hover-эффекты во время transition

**Files:** `src/components/effects/PageTransition.tsx`, `src/app/template.tsx` (Next.js Template для триггера ремонтирования)
**Depends on:** BR-01
**Estimate:** 3 часа

---

### [BR-06] Sound system (mute toggle, hover beeps) 🟡

**Goal:** все hover/click/transition звучат тихо. По умолчанию OFF.

**Acceptance:**

- `src/components/providers/SoundProvider.tsx` — context с `isMuted` (default `true`), `toggleMute`, `play(soundId)`
- LocalStorage синхронизация: `bp-sound-enabled` (default `false`)
- Sounds в `public/sounds/`: `hover.mp3`, `click.mp3`, `transition.mp3`, `success.mp3` (все < 50KB, MP3 32kbps)
- Источник звуков — Freesound (CC0/CC-BY) или Zapsplat (free with attribution)
- Тумблер 🔇 в углу шапки (минимум 24×24 px кликабельно)
- Lazy-loading: `<audio>` элементы создаются только после первой `play()`-команды
- Aria: тумблер с `aria-label="Включить звуки"` / `"Выключить звуки"`

**Files:** `src/components/providers/SoundProvider.tsx`, `public/sounds/*`
**Depends on:** BR-02
**Estimate:** 4 часа (включая поиск и подбор звуков)

**Sounds checklist:**

- `hover.mp3` — лёгкий короткий tick (~0.05s)
- `click.mp3` — суховатый щелчок (~0.1s)
- `transition.mp3` — короткий swoosh (~0.3s)
- `success.mp3` — приятный chime (~0.4s)

**Источники (рекомендации):**

- Freesound.org/people/InspectorJ/ — отличные UI-звуки CC-BY
- Zapsplat.com → category «User Interface» → отфильтровать «Free»

---

### [BR-07] Magnetic Button effect 🟡

**Goal:** кнопки CTA «прилипают» к курсору при приближении (только desktop).

**Acceptance:**

- `MagneticButton.tsx` — обёртка над `Button.tsx`, добавляющая поведение
- При курсоре на расстоянии < 80px — кнопка плавно следует за ним (max смещение ~15px)
- На mobile — disabled
- Внутри использует GSAP (`gsap.to(buttonRef.current, { x, y, duration: 0.6, ease: "power2.out" })`)
- На leave — возвращается в исходную позицию плавно

**Files:** `src/components/effects/MagneticButton.tsx`
**Depends on:** BR-02, BR-04
**Estimate:** 2 часа

---

### [BR-08] GSAP setup + ScrollTrigger × Lenis sync 🔴

**Goal:** GSAP анимации синхронизированы с Lenis smooth scroll (без рывков).

**Acceptance:**

- `npm install gsap @gsap/react`
- `src/lib/gsap/index.ts` — единственная точка инициализации, регистрирует `ScrollTrigger` + `SplitText` (если будем использовать)
- В `LenisProvider.tsx` — sync per ARCHITECTURE.md §10:
  ```
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(time => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  ```
- Тест-секция: текст fade-in при скролле, плавно (не дёргается)

**Files:** `src/lib/gsap/index.ts`, `src/components/providers/LenisProvider.tsx`
**Depends on:** BS-05
**Estimate:** 2 часа

---

### [BR-09] Char-reveal анимация (для H1, H2) 🟡

**Goal:** заголовки появляются по буквам/словам при скролле в viewport.

**Acceptance:**

- `<CharReveal>` или `<WordReveal>` компонент
- При viewport visibility — буквы поднимаются y: 100% → 0 со stagger 30ms
- Использует SplitText (GSAP Premium) или собственный split на spans (если SplitText недоступен — самописный split на массив React-children)
- Поддерживает aria-label с original text для screen readers
- Респектит `prefers-reduced-motion: reduce` — мгновенно показывает текст

**Files:** `src/components/effects/CharReveal.tsx`
**Depends on:** BR-08
**Estimate:** 4 часа

---

### [BR-10] Marquee компонент (бесконечная бегущая строка) 🟡

**Goal:** marquee для бесшовного списка услуг или брендов косметики.

**Acceptance:**

- `<Marquee speed="slow|normal|fast" direction="left|right">{items}</Marquee>`
- Бесшовный loop через дублирование контента и transform-translate
- Респектит `prefers-reduced-motion` — статичный список без анимации
- Pausable on hover (опция)

**Files:** `src/components/effects/Marquee.tsx`
**Depends on:** BR-08
**Estimate:** 2 часа

---

### [BR-11] Image / Video primitives с lazy + blur placeholder 🔴

**Goal:** все изображения через `<Image>` с правильными настройками; видео — с poster + lazy.

**Acceptance:**

- `<NextImage>` обёртка над `next/image` с дефолтами `priority={false}`, `placeholder="blur"`, `sizes` авто-рассчитаны
- `<HeroVideo>` — autoplay, muted, loop, playsInline, poster (AVIF), `preload="none"` + загрузка по `requestIdleCallback`
- На mobile — выбирается отдельный mobile-poster (вертикальный)

**Files:** `src/components/ui/NextImage.tsx`, `src/components/ui/HeroVideo.tsx`
**Depends on:** BS-04
**Estimate:** 3 часа

---

### Phase 1 Gate ✅

К концу нед. 2:

- [ ] `/dev/components` показывает: H1-H6, Body, Caption, Mono, Button (4 варианта × 3 размера), Link, Container, кастомный курсор работает
- [ ] Sound toggle переключается, hover/click звучат
- [ ] Page transitions плавные между двумя тестовыми роутами
- [ ] CharReveal анимация работает на тестовом H1
- [ ] Marquee крутится без рывков
- [ ] GSAP × Lenis синхронизированы (визуально проверено)
- [ ] Lighthouse Performance > 90 на пустой странице с компонентами

---

# PHASE 2: ATOMIC COMPONENTS

**Цель фазы:** все «строительные блоки» секций готовы. Можно собирать любую страницу из готовых частей.
**Длительность:** 2 недели (нед. 3-4).
**Gate:** все компоненты задокументированы в `/dev/components`.

---

### [UI-01] Logo (SVG-знак BP) 🔴

**Goal:** vector logo BP, 1:1 ratio, идеальная читаемость от 24px до 600px.

**Acceptance:**

- `public/logo.svg` (статичный, ~2KB)
- `src/components/ui/Logo.tsx` — компонент с props `size?: 'sm' | 'md' | 'lg' | 'xl'`, `variant?: 'mark' | 'wordmark'`
- Mark (только BP) — для шапки и favicon
- Wordmark (BP + base premier) — для футера и hero
- Цвет наследуется от `currentColor`
- Hover на mark в шапке — лёгкая ротация (5° wiggle, 0.5s)
- 5 кликов на лого подряд → easter egg (toast «вы один из своих» + промокод)

**Files:** `public/logo.svg`, `src/components/ui/Logo.tsx`
**Depends on:** BR-01
**Estimate:** 4 часа (включая дизайн знака)

**Claude Code prompt:**

```
Read docs/BRAND.md §4 — Logo specification.
Generate SVG logo BP based on Fraunces font letterforms (or custom-drawn).
Make sure it scales from 24px to 600px without losing legibility.
Add 5-clicks-easter-egg with toast.
```

---

### [UI-02] Header — финальная версия 🔴

**Goal:** полноценный sticky header с лого, навигацией, телефоном, тумблером звука, CTA.

**Acceptance:**

- Левая часть: лого BP (mark)
- Центр: навигация — `Услуги`, `Мастера`, `О нас`, `Журнал`, `Контакты`
- Правая часть: телефон (mono шрифт, hover underline) → клик: `tel:`, тумблер 🔇, CTA «Записаться» (Magnetic)
- Mobile (< 768px): сворачивается в гамбургер-меню (slide from right)
- Sticky behavior: при скролле вниз > 100px → header чуть сжимается (height 64 → 56), фон становится непрозрачным; при скролле вверх — return
- На главной странице header начинается прозрачным (over hero video), при скролле > 80vh — становится непрозрачным

**Files:** `src/components/layout/Header.tsx`, `src/components/layout/MobileMenu.tsx`
**Depends on:** BS-06, BR-02, BR-04, UI-01
**Estimate:** 6 часов

---

### [UI-03] Footer — финальная версия 🔴

**Goal:** информативный, с контактами, картой проезда, соцсетями, юр. данными.

**Acceptance:**

- Левая колонка: лого BP (wordmark), адрес, часы работы, телефон/Telegram/WhatsApp
- Средняя колонка: ссылки на все страницы сайта
- Правая колонка: соцсети (icons), форма подписки на блог (если делаем) или цитата
- Bottom: юр. данные (ИП Шайхутдинов А.Р., ИНН 163207031442, ОГРНИП 321169000005742)
- Cookie-banner при первом визите (отдельный компонент UI-18)

**Files:** `src/components/layout/Footer.tsx`
**Depends on:** UI-01, BR-01, BR-02
**Estimate:** 4 часа

---

### [UI-04] Section heading (eyebrow + H2 + subline) 🟡

**Goal:** унифицированный заголовок секции.

**Acceptance:**

- Eyebrow (Mono, маленький, navy цвет) — например `01 / Услуги`
- H2 (Fraunces) — главный заголовок
- Subline (Body Sm) — описание под заголовком
- При появлении в viewport — eyebrow появляется первым (fadeUp), H2 — char-reveal, subline — fadeUp с delay
- `<SectionHeading eyebrow="01 / Услуги" title="наш каталог" subline="…">`

**Files:** `src/components/sections/SectionHeading.tsx`
**Depends on:** BR-01, BR-09
**Estimate:** 2 часа

---

### [UI-05] Service card 🔴

**Goal:** карточка услуги с названием, длительностью, ценой, кнопкой записи.

**Acceptance:**

- Layout: горизонтальный (на desktop) или вертикальный (на mobile)
- Название (H4 Fraunces), длительность (Mono caption), цена (Mono, large), описание (Body Sm)
- На hover (desktop) — карточка слегка приподнимается (translateY -4px), фон осветляется (`bg-bg-secondary`)
- CTA «Записаться» как Magnetic Button — при клике откроется YClients widget с pre-selected услугой (deep-link через `?service_id=...`)
- Если есть скидка («Получите 10% на первый визит») — отдельный badge

**Files:** `src/components/cards/ServiceCard.tsx`
**Depends on:** BR-02, BR-07
**Estimate:** 4 часа

---

### [UI-06] Barber card 🔴

**Goal:** карточка мастера с фото, именем, специализацией, кол-вом отзывов.

**Acceptance:**

- Большое фото (4:5 ratio) — сейчас плейсхолдер, после фотосессии (нед. 8) подменяется
- Имя (H3 Fraunces), специализация (Body Sm), кол-во отзывов (Mono)
- Бейдж «Лучший месяца» на Сайоде, «Старший мастер» у Марата
- На hover — фото получает лёгкий desaturate, появляется кнопка «Подробнее»
- Клик открывает страницу `/barbers/{slug}`

**Files:** `src/components/cards/BarberCard.tsx`
**Depends on:** BR-01, BR-11
**Estimate:** 4 часа

---

### [UI-07] Review card 🟡

**Goal:** карточка отзыва клиента с текстом, рейтингом, источником.

**Acceptance:**

- Цитата (Body, italic), 5 звёзд (SVG), имя автора (Body Sm), источник («Яндекс.Карты», «2ГИС»)
- Если есть фото клиента — круглый аватар 40×40 (если нет — initials в круге)
- На карточку — Rich Text Schema.org `<Review>` (для SEO)
- Несколько вариантов: short (3-4 строки), medium (5-7 строк), long (с превью «читать полностью»)

**Files:** `src/components/cards/ReviewCard.tsx`
**Depends on:** BR-01
**Estimate:** 3 часа

---

### [UI-08] Article card (для блога) 🟡

**Goal:** карточка статьи журнала.

**Acceptance:**

- Большое cover-фото (16:9), заголовок (H4 Fraunces), excerpt (Body Sm), категория (Mono caption), дата (Mono caption), время чтения
- На hover — фото делает scale 1.05 (внутри overflow:hidden), заголовок подчёркивается
- Клик открывает `/journal/{slug}`

**Files:** `src/components/cards/ArticleCard.tsx`
**Depends on:** BR-01, BR-11
**Estimate:** 3 часа

---

### [UI-09] FAQ accordion 🟡

**Goal:** интерактивный accordion для FAQ-секции.

**Acceptance:**

- На основе нативного `<details>` + `<summary>` (для a11y и SEO без JS)
- Стилизованная стрелка справа, ротация на 180° при open
- Анимация раскрытия через CSS `interpolate-size: allow-keywords` или JS height transition (если нет поддержки)
- Можно открыть только один за раз (опция) или несколько (default)

**Files:** `src/components/ui/FaqAccordion.tsx`
**Depends on:** BR-01
**Estimate:** 3 часа

---

### [UI-10] Quiz step + result 🟡

**Goal:** UI-каркас квиза подбора стрижки (логика — позже в PG-08).

**Acceptance:**

- `<QuizStep>` — 1 вопрос, 2-4 visual options (большие плитки с фото)
- Прогресс-бар сверху (Step 1 of 4)
- Кнопки `Назад` / `Далее`
- `<QuizResult>` — после всех шагов, рекомендованная стрижка + рекомендованный мастер, CTA `Записаться`

**Files:** `src/components/quiz/QuizStep.tsx`, `src/components/quiz/QuizResult.tsx`
**Depends on:** BR-02, UI-06
**Estimate:** 5 часов

---

### [UI-11] Form input + form layout 🟡

**Goal:** базовый input для форм (если будут где-то нужны — например, форма обратной связи или ваучера).

**Acceptance:**

- Underline-style (без border-box), label плавает вверх при фокусе (как в Material Design)
- Error state красным
- Поддержка type=text|tel|email
- HTML5 валидация по умолчанию + custom messages

**Files:** `src/components/forms/Input.tsx`, `src/components/forms/Form.tsx`
**Depends on:** BR-01, BR-02
**Estimate:** 3 часа

---

### [UI-12] Drag-reveal gallery 🟢

**Goal:** галерея с draggable rows (как у Awwwards-сайтов).

**Acceptance:**

- 2-3 ряда фото движутся параллельно при drag
- На клик по фото — открывается lightbox
- Inertia-эффект: после отпускания — продолжает двигаться по инерции
- Touch + mouse поддержка

**Files:** `src/components/effects/DragRevealGallery.tsx`
**Depends on:** BR-08, BR-11
**Estimate:** 6 часов

---

### [UI-13] Lightbox 🟢

**Goal:** modal для просмотра фото в полном размере.

**Acceptance:**

- Открывается из `<NextImage>` с props `lightbox` или из drag-reveal-gallery
- Стрелки навигации, swipe на mobile, ESC для закрытия
- Backdrop blur + fade-in
- Aria: focus trap

**Files:** `src/components/ui/Lightbox.tsx`
**Depends on:** BR-11
**Estimate:** 4 часа

---

### [UI-14] Pricing table 🔴

**Goal:** таблица всех 27 услуг с категориями, ценами, длительностью, описаниями.

**Acceptance:**

- Аккордеон по категориям: «Парикмахерский зал», «Комплексные услуги», «Ногтевой зал»
- В развёрнутом виде — таблица с услугами
- При наведении на услугу — small tooltip с описанием
- Mobile: вертикальный stacked layout
- Цены и длительности через Mono шрифт

**Files:** `src/components/sections/PricingTable.tsx`, `src/data/services.ts`
**Depends on:** UI-09, BR-01
**Estimate:** 5 часов

**Data:** заполнить из CONTENT-BRIEF.md и CLIENT-ANSWERS.md §3.5 (полный прайс на 27 услуг)

---

### [UI-15] Live occupancy badge 🟡

**Goal:** маленький индикатор «у мастера осталось N окон сегодня» (логика — INT-04).

**Acceptance:**

- Дизайн готов; данные пока mock (например, `{ name: "Сайод", openSlots: 2 }`)
- Анимированная зелёная точка (pulse), цифра, имя
- На hover — раскрывается список доступных слотов

**Files:** `src/components/ui/LiveOccupancy.tsx`
**Depends on:** BR-01
**Estimate:** 3 часа

---

### [UI-16] Sticky CTA (mobile bottom bar) 🟡

**Goal:** фиксированная кнопка «Записаться» внизу на mobile.

**Acceptance:**

- Появляется на mobile при скролле > 800px
- Скрывается на странице с открытым YClients widget
- При клике — открывает widget
- Не перекрывает важный контент (mб-padding последней секции)

**Files:** `src/components/ui/StickyCTA.tsx`
**Depends on:** BR-02
**Estimate:** 2 часа

---

### [UI-17] WhatsApp / Telegram floating button 🟢

**Goal:** альтернатива live-чату — фиксированная кнопка для быстрой связи.

**Acceptance:**

- В правом нижнем углу, обходит StickyCTA
- При hover — раскрывается «Telegram | WhatsApp» с иконками
- Клик → `https://wa.me/79179183877` или `tg://resolve?domain=...`
- Скрывается на момент открытия YClients widget

**Files:** `src/components/ui/MessengerButton.tsx`
**Depends on:** BR-02
**Estimate:** 2 часа

---

### [UI-18] Cookie banner 🟡

**Goal:** консент-баннер для соответствия 152-ФЗ (для GA4/Метрики).

**Acceptance:**

- Появляется при первом визите снизу
- Кнопки «Принять все», «Только необходимые», «Настройки»
- LocalStorage save: `bp-cookie-consent` = `{ analytics: bool, ts: number }`
- При «Принять» — инжектится Метрика; при «Только необходимые» — не инжектится
- Mobile-friendly

**Files:** `src/components/ui/CookieBanner.tsx`
**Depends on:** BR-02
**Estimate:** 3 часа

---

### Phase 2 Gate ✅

К концу нед. 4:

- [ ] Все 18 UI-компонентов готовы и видны в `/dev/components`
- [ ] Header и Footer — финальные версии
- [ ] Все компоненты прошли a11y (focus visible, aria-labels)
- [ ] Все компоненты респектят `prefers-reduced-motion`
- [ ] Storybook-страница содержит примеры с props-вариантами
- [ ] Lighthouse Performance > 90 на странице с 5+ компонентами на одном экране

---

# PHASE 3: HOME PAGE

**Цель фазы:** главная страница `/` собрана из готовых компонентов, выглядит как Awwwards-кандидат.
**Длительность:** 3 недели (нед. 5-7).
**Gate:** домашняя страница live на staging, заказчик видит и делает первый круг ревью.

> **Совет по workflow:** в Claude Code можно использовать **git worktrees** для параллельной разработки секций.
>
> ```
> git worktree add ../base-premier-hero feature/hero
> cd ../base-premier-hero
> claude
> # → "Build the hero section per docs/DESIGN-BRIEF.md §3.1"
> ```
>
> Несколько параллельных Claude Code сессий могут работать над разными секциями одновременно.

---

### [HOM-01] Hero section 🔴

**Goal:** wow-первое-впечатление: полноэкранное видео, 3D-монограмма BP, magnetic CTA.

**Acceptance:**

- Полноэкранное hero-видео (loop, muted, autoplay) с poster (AVIF)
- На фоне видео — semi-transparent dark gradient (для контраста текста)
- 3D BP в правой части (через Three.js / R3F), реагирует на mouse-move (lazy через `dynamic()` с `ssr: false`)
- На mobile — 3D отключён, статичная PNG (или SVG)
- H1: `base premier` (Fraunces, large, char-reveal анимация)
- Sub: текст из tone of voice (см. CONTENT-BRIEF — варианты A/B/C, выбираем A)
- Caption: `от 1 800 ₽ · Шаляпина 26 · ★ 5,0 · 394 отзыва`
- Magnetic CTA «Записаться»
- Внизу — scroll-indicator (анимация стрелки вниз)

**Files:** `src/components/sections/Hero/`, `src/components/three/MonogramBP.tsx`
**Depends on:** UI-02, BR-04, BR-07, BR-09, BR-11
**Estimate:** 12 часов (3D — самая большая часть)

---

### [HOM-02] Manifesto section (about teaser) 🔴

**Goal:** второй экран — короткая идея бренда, ссылка на /about.

**Acceptance:**

- 2 колонки: слева — H2 («больше, чем стрижка»), справа — параграф manifesto (3-5 предложений из CONTENT-BRIEF)
- На скролле — параллакс-эффект: текст медленно поднимается, заголовок — медленнее
- Нижняя ссылка «читать манифест →» (Link с underline-animation)
- Фон — `bg-bg-primary`, без видео, чисто

**Files:** `src/components/sections/Manifesto.tsx`
**Depends on:** BR-09, UI-04
**Estimate:** 3 часа

---

### [HOM-03] Services section 🔴

**Goal:** топ-3 категории услуг с CTA «смотреть все услуги».

**Acceptance:**

- SectionHeading: `01 / Услуги`, `что мы делаем`
- 3 ServiceCard в horizontal row (или vertical stack на mobile): «Стрижка», «Уход за бородой», «Комплекс стрижка+маникюр»
- При hover — эффект описан в UI-05
- CTA «Смотреть все 27 услуг →»

**Files:** `src/components/sections/Services.tsx`
**Depends on:** UI-04, UI-05
**Estimate:** 3 часа

---

### [HOM-04] Barbers section 🔴

**Goal:** превью команды (4-5 ключевых мастеров) с CTA на /barbers.

**Acceptance:**

- SectionHeading: `02 / Мастера`, `профессионалы своего дела`
- Marquee из карточек мастеров (бесшовная прокрутка, pause on hover)
- Альтернатива (если marquee не понравится): horizontal scroll с drag (как UI-12)
- В карточках — фото-плейсхолдер до фотосессии (нед. 8)
- CTA «Все 10 мастеров →»

**Files:** `src/components/sections/Barbers.tsx`
**Depends on:** UI-04, UI-06, BR-10
**Estimate:** 4 часа

---

### [HOM-05] Interior section 🔴

**Goal:** атмосфера салона — крупные фото интерьера с editorial-подачей.

**Acceptance:**

- SectionHeading: `03 / Интерьер`, `атмосфера, в которую возвращаются`
- 3-4 крупных фото в asymmetric layout (как у betonebarber.ru или Aesop)
- На скролле — лёгкий parallax (фото смещается медленнее текста)
- Фото из `/mnt/user-data/uploads/B43A77*.jpg` (есть готовые)
- Caption под одной из фото: «Шаляпина 26 · 245 м от Концертного зала Филармонии»

**Files:** `src/components/sections/Interior.tsx`
**Depends on:** UI-04, BR-11
**Estimate:** 4 часа

---

### [HOM-06] Pricing teaser 🟡

**Goal:** превью прайса с CTA на полный прайс на /services.

**Acceptance:**

- SectionHeading: `04 / Прайс`, `прозрачные цены`
- 5-7 ключевых услуг в виде Mono-таблицы (без интерактивности)
- CTA «Полный прайс из 27 услуг →»

**Files:** `src/components/sections/PricingTeaser.tsx`
**Depends on:** UI-04
**Estimate:** 2 часа

---

### [HOM-07] Reviews section ✅

**Goal:** социальное доказательство — несколько отзывов с агрегатным рейтингом.

**Acceptance:**

- SectionHeading: `05 / Отзывы`, `★ 5,0 · 394 отзыва на Яндекс.Картах`
- 6-8 ReviewCard в masonry-layout
- Все отзывы — с указанием источника (Яндекс/2ГИС)
- Имена анонимизированы по умолчанию («Андрей К., 34»)
- Schema.org `<Review>` markup для SEO
- Нет CTA — это passive section

**Files:** `src/components/sections/Reviews.tsx`, `src/data/reviews.ts`
**Depends on:** UI-04, UI-07
**Estimate:** 4 часа

---

### [HOM-08] Loyalty / Referral section ✅

**Goal:** информация о программе лояльности и реферралах.

**Acceptance:**

- SectionHeading: `06 / Бонусы`, `чем мы благодарим постоянных гостей`
- 3 «карточки»: «Накопительная скидка», «Приведи друга — оба получите», «Подарочные сертификаты»
- Простые иконки (lucide-react или собственные SVG)
- Без сложных анимаций

**Files:** `src/components/sections/Loyalty.tsx`
**Depends on:** UI-04
**Estimate:** 2 часа

---

### [HOM-09] Footer-CTA section ✅

**Goal:** последний экран перед футером — финальный nudge к действию.

**Acceptance:**

- Большой H2 (CharReveal): `время к нам`
- Под ним — Magnetic Button «Записаться» (XL-размер)
- Под кнопкой — телефон и адрес дублируются
- Фон — accent (Navy с лёгким градиентом)

**Files:** `src/components/sections/FooterCTA.tsx`
**Depends on:** BR-07, BR-09
**Estimate:** 2 часа

---

### Phase 3 Gate ✅

К концу нед. 7:

- [ ] `https://staging.basepremier.ru/` показывает финальную домашнюю страницу
- [ ] Все 9 секций работают на desktop (≥1280px)
- [ ] Mobile (≤480px) — адаптация полная, ничего не сломано
- [ ] Hero видео грузится за < 2 сек на хорошем 3G
- [ ] Lighthouse: Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95
- [ ] Заказчик дал первый круг feedback по дизайну (раунд 1 из 3)

---

# PHASE 4: INNER PAGES

**Цель фазы:** все внутренние страницы готовы и связаны.
**Длительность:** 3 недели (нед. 8-10).
**Gate:** все ссылки в навигации работают, все страницы индексируются.

---

### [PG-01] /services — каталог всех 27 услуг ✅

**Goal:** полная страница услуг с категориями, фильтрацией, ценами, deep-link на запись.

**Acceptance:**

- Hero: H1 «наши услуги», eyebrow «27 процедур · 3 категории»
- Фильтры по категории: «Все · Парикмахерский зал · Комплексные · Ногтевой зал»
- Полный PricingTable (UI-14)
- На клик на услугу — модальное окно с деталями + кнопка «Записаться» (deep-link в YClients с pre-selected service)
- SEO: каждая услуга — отдельный блок с микроразметкой Schema.org `<Service>`
- Файл `src/data/services.ts` — массив всех 27 услуг (заполняется из CLIENT-ANSWERS §3.5)

**Files:** `src/app/services/page.tsx`, `src/data/services.ts`
**Depends on:** UI-14, UI-09, HOM-03
**Estimate:** 8 часов

---

### [PG-02] /barbers — список всех 10 мастеров ✅

**Goal:** галерея команды.

**Acceptance:**

- Hero: H1 «наша команда», eyebrow «10 мастеров»
- Grid из 10 BarberCard (3 колонки на desktop, 2 на tablet, 1 на mobile)
- Возможность сортировки: «По кол-ву отзывов» / «По специализации» / «По старшинству» (default = старшинство)
- Клик на карточку → `/barbers/{slug}`
- ВАЖНО: до фотосессии (нед. 8) — плейсхолдеры. После съёмки — подменить.

**Files:** `src/app/barbers/page.tsx`, `src/data/barbers.ts`
**Depends on:** UI-06
**Estimate:** 5 часов

---

### [PG-03] /barbers/[slug] — страница мастера ✅

**Goal:** детальная страница каждого мастера.

**Acceptance:**

- Большое фото слева (3:4), биография справа
- H1 — имя мастера, eyebrow — должность («Старший мастер», «Лучший месяца» и т.д.)
- Биография (2-3 параграфа): опыт, подход к работе, любимая техника, где обучался
- «Любимые услуги» — 3 ServiceCard
- Цитата мастера (Editorial Serif)
- CTA «Записаться к [имя]» (deep-link в YClients с pre-selected master)
- Schema.org `<Person>` markup
- Static generation: `generateStaticParams` из `src/data/barbers.ts`

**Files:** `src/app/barbers/[slug]/page.tsx`, `src/data/barbers.ts`
**Depends on:** PG-02, UI-05
**Estimate:** 6 часов

---

### [PG-04] /about — страница «о нас» ✅

**Goal:** манифест, история, визитка бренда.

**Acceptance:**

- Hero: большое фото интерьера + H1 «больше, чем стрижка»
- Manifesto секция (4-5 параграфов — Editorial Serif для важных фраз)
- Timeline: «2022 — основание», ... (если есть данные)
- Цитата основателя Айрата Шайхутдинова
- 3-4 крупных фото в editorial layout
- CTA на /barbers и /services

**Files:** `src/app/about/page.tsx`
**Depends on:** UI-04, BR-11
**Estimate:** 5 часов

---

### [PG-05] /contacts — страница контактов ✅

**Goal:** все способы связаться + карта проезда.

**Acceptance:**

- H1 «как нас найти»
- Большая карта (Yandex.Maps embed) с маркером на Шаляпина 26
- Адрес, GPS, ориентир «245 м от Концертного зала Филармонии»
- Часы работы (10:00-21:00 каждый день)
- Все каналы связи: телефон / WhatsApp / Telegram / Instagram
- «Как добраться» (текст с ориентиром, парковкой)
- Schema.org `<HairSalon>` JSON-LD

**Files:** `src/app/contacts/page.tsx`
**Depends on:** UI-04
**Estimate:** 4 часа

---

### [PG-06] /quiz — подбор стрижки ✅

**Goal:** интерактивный квиз → рекомендованная услуга + мастер.

**Acceptance:**

- 4 шага:
  1. «Какая длина волос у вас сейчас?» (4 фото-варианта)
  2. «Какой образ ближе?» (4 варианта: классика / спорт / casual / необычное)
  3. «Сколько времени готовы потратить?» (30-60 мин / 1ч / 1.5ч+)
  4. «Что важно дополнительно?» (multi: борода / маникюр / уход за лицом)
- Прогресс-бар, кнопки `Назад`/`Далее`
- Результат: рекомендованная услуга (из 27) + рекомендованный мастер (1-3 варианта) + CTA «Записаться» с pre-selected данными
- Логика рекомендации — простой mapping в `src/lib/quiz/recommend.ts`
- Track в Метрике: `quiz_started`, `quiz_completed`, `quiz_to_booking`

**Files:** `src/app/quiz/page.tsx`, `src/lib/quiz/recommend.ts`, `src/components/quiz/*`
**Depends on:** UI-10
**Estimate:** 8 часов

---

### [PG-07] /journal — блог журнала ✅

**Goal:** список статей блога с фильтрацией по категориям.

**Acceptance:**

- Hero: H1 «журнал», eyebrow «истории, гайды, обзоры»
- Grid из ArticleCard (UI-08)
- Фильтры по категории: «Все · Стрижки · Уход · Стиль · Обзоры»
- Sanity-driven (контент из CMS, заполняется в INT-01)
- Pagination или infinite scroll (10 на страницу)
- На старте — 12 статей готовы (тексты пишет Claude — INT-01)

**Files:** `src/app/journal/page.tsx`, `src/lib/sanity/queries.ts`
**Depends on:** UI-08, INT-01
**Estimate:** 5 часов

---

### [PG-08] /journal/[slug] — статья блога ✅

**Goal:** красивое чтение длинной статьи.

**Acceptance:**

- Hero статьи: cover фото, H1, eyebrow (категория · дата · время чтения), автор
- Контент через Portable Text → React (с custom renderers для headings, blockquotes, images, code)
- Sticky оглавление справа (на desktop)
- Reading progress bar сверху
- В конце статьи — CTA «Записаться» + 3 рекомендованных статьи (related)
- SEO: Schema.org `<Article>`, OG tags, Twitter Cards
- Static generation `generateStaticParams` (или ISR if лучше)

**Files:** `src/app/journal/[slug]/page.tsx`
**Depends on:** PG-07, INT-01
**Estimate:** 6 часов

---

### [PG-09] /404 — страница 404 с авторской анимацией 🟢

**Goal:** не белая страница, а часть бренда.

**Acceptance:**

- Большая анимированная цифра «404» (можно 3D или SVG-морфинг)
- Текст «потерянная стрижка» или похожее в tone of voice
- CTA «На главную» и «К услугам»
- Фон — Navy (контраст к остальным страницам)

**Files:** `src/app/not-found.tsx`
**Depends on:** BR-09
**Estimate:** 4 часа

---

### [PG-10] /bp — easter-страница с 3D-монограммой 🟢

**Goal:** PR-фишка, секретная страница.

**Acceptance:**

- Полноэкранная сцена R3F с монограммой BP
- Можно полностью вращать мышью / тапать на mobile
- Лёгкие световые эффекты (rim light, ambient occlusion)
- Бэкграунд — чёрный с лёгким градиентом
- Текст внизу: «base premier · monogram study · bp»
- noindex (не должна попадать в SEO)
- Лимит fps: 30 на mobile, 60 на desktop

**Files:** `src/app/bp/page.tsx`, `src/components/three/MonogramBP.tsx` (расширенная версия)
**Depends on:** HOM-01 (базовая 3D-монограмма)
**Estimate:** 8 часов

---

### Phase 4 Gate ✅

К концу нед. 10:

- [ ] Все 10 страниц live на staging
- [ ] Все ссылки в навигации работают
- [ ] Все мастера имеют свою страницу `/barbers/[slug]`
- [ ] Quiz даёт корректную рекомендацию
- [ ] Все страницы Lighthouse Performance ≥ 85, SEO ≥ 95

---

# PHASE 5: INTEGRATIONS

**Цель фазы:** реальные данные вместо mock — Sanity CMS, YClients API, Yandex.Metrica.
**Длительность:** 3 недели (нед. 11-13).
**Gate:** запись через сайт идёт в YClients, контент редактируется в Sanity, события трекаются в Метрике.

---

### [INT-01] Sanity CMS setup 🔴

**Goal:** Sanity Studio запущен, схемы созданы, данные мигрированы.

**Acceptance:**

- `npm install @sanity/client @sanity/image-url next-sanity`
- Schemes per ARCHITECTURE.md §6.2: `barber`, `service`, `article`, `review`, `interior_photo`, `siteSettings`
- Sanity Studio запущен на `studio.basepremier.ru` или `/studio` (embedded)
- В Sanity заполнены:
  - 10 мастеров (без фото пока)
  - 27 услуг (полный прайс)
  - 8-10 готовых отзывов (импортированы вручную из Яндекс.Карт)
  - 12 статей блога (тексты — Claude генерирует, см. INT-02)
- На сайте все страницы используют данные из Sanity (не из mock)

**Files:** `sanity/schemas/*`, `src/lib/sanity/client.ts`, `src/lib/sanity/queries.ts`
**Depends on:** PG-01..PG-08
**Estimate:** 12 часов

**Claude Code prompt:**

```
Set up Sanity CMS per docs/ARCHITECTURE.md §6.
Create all schemas (barber, service, article, review, interior_photo, siteSettings).
Generate seed data scripts to import services and reviews from CLIENT-ANSWERS.md §3.5 and §3.6.
Verify the home page reads from Sanity, not from src/data/*.
```

---

### [INT-02] Claude генерирует 12 статей блога ✅

**Goal:** 12 готовых статей в Sanity по темам из CONTENT-BRIEF.md.

**Acceptance:**

- 12 тем согласно CONTENT-BRIEF (например: «Как ухаживать за бородой зимой», «Что такое fade», «Премиальная косметика Graham Hill — обзор», ...)
- Каждая статья: 1500-2500 слов, в tone of voice бренда
- SEO-оптимизация под локальные ключи (Казань, барбершоп, мужская стрижка)
- Внутренние ссылки между статьями + на /services и /barbers
- Cover-фото — из имеющегося фотоальбома (интерьер, инструменты, процесс)

**Files:** `sanity/seed/articles.json`
**Depends on:** INT-01
**Estimate:** 16 часов (Claude пишет, ты ревью + правки)

---

### [INT-03] YClients widget — embed 🔴

**Goal:** виджет записи открывается из всех CTA «Записаться» по сайту.

**Acceptance:**

- Скрипт виджета загружается lazy (только при первом клике на CTA)
- Виджет открывается в модалке (overlay), не на отдельной странице
- Pre-selected service ID работает (из URL `?service_id=...` или из ServiceCard)
- Pre-selected staff ID работает (из URL или из BarberCard)
- При успешной записи — toast «Спасибо за запись» + GA event
- Кастомизация виджета — попытка через CSS overrides; если YClients блокирует, перехода на тариф Plus

**Files:** `src/components/booking/YClientsWidget.tsx`
**Depends on:** PG-01, PG-03 (где CTA уже есть)
**Estimate:** 6 часов (зависит от того, насколько YClients позволяет кастомизацию)

---

### [INT-04] YClients API proxy + Live occupancy 🟡

**Goal:** на главной и /barbers показывается реальная загрузка мастеров.

**Acceptance:**

- Edge API route `/api/yclients/availability?staff_id=...&date=...` (per ARCHITECTURE.md §5.3)
- Кеширование результатов на 5 минут (Cloudflare CDN или Redis)
- LiveOccupancy badge (UI-15) использует этот endpoint
- При ошибке API — fallback на статичный текст («Свяжитесь для записи»)
- Rate limiting: max 10 req/sec from one IP

**Files:** `src/app/api/yclients/availability/route.ts`, `src/lib/yclients/api.ts`
**Depends on:** INT-03, UI-15
**Estimate:** 6 часов

---

### [INT-05] Webhook YClients → Telegram (новая запись) 🟡

**Goal:** при новой записи через сайт — уведомление в Telegram-чат заказчика.

**Acceptance:**

- Создать Telegram-бот через @BotFather
- API route `/api/webhooks/yclients` принимает webhook от YClients
- Парсит payload, шлёт в Telegram-канал заказчика: «Новая запись: {клиент}, {услуга}, {мастер}, {дата}»
- Подтверждение: вручную создать запись через сайт → проверить пришло сообщение в Telegram

**Files:** `src/app/api/webhooks/yclients/route.ts`, `src/lib/telegram/notify.ts`
**Depends on:** INT-03
**Estimate:** 4 часа

---

### [INT-06] Yandex.Metrica + GA4 setup 🔴

**Goal:** все события трекаются в Метрике; cookie-banner соблюдён.

**Acceptance:**

- В Метрике созданы цели: `cta_click`, `widget_open`, `widget_booking_success`, `quiz_started`, `quiz_completed`, `phone_click`, `whatsapp_click`, `telegram_click`
- Webvisor включён
- Цели срабатывают (проверить через Метрика → Реальное время)
- GA4 как backup (опционально)
- Все скрипты инжектятся **только** после consent (cookie-banner UI-18)

**Files:** `src/lib/analytics/metrika.ts`, `src/lib/analytics/events.ts`
**Depends on:** UI-18, INT-03
**Estimate:** 4 часа

---

### [INT-07] Sentry — error tracking ✅

**Goal:** ошибки в продакшне видны в Sentry.

**Acceptance:**

- `npm install @sentry/nextjs`
- Sentry-конфиг в `next.config.mjs` через `withSentryConfig`
- Source maps загружаются на build
- DSN в `env.ts`
- Тестовая ошибка из dev → видна в Sentry за < 1 мин
- Performance monitoring включён (Web Vitals автотрекинг)

**Files:** `sentry.client.config.ts`, `sentry.server.config.ts`, `next.config.mjs`
**Depends on:** BS-07
**Estimate:** 2 часа

---

### [INT-08] Robots.txt + sitemap.xml ✅

**Goal:** поисковики правильно индексируют сайт.

**Acceptance:**

- `src/app/robots.ts` — `Allow: /`, `Disallow: /studio /api /dev /bp`, link на sitemap
- `src/app/sitemap.ts` — динамический sitemap, включает все страницы из Sanity (статьи, мастера) + статичные
- Тест: `curl https://basepremier.ru/sitemap.xml` отдаёт валидный XML
- Yandex Вебмастер уведомлён о новом sitemap (после live)

**Files:** `src/app/robots.ts`, `src/app/sitemap.ts`
**Depends on:** PG-01..PG-08
**Estimate:** 2 часа

---

### Phase 5 Gate ✅

К концу нед. 13:

- [ ] Все данные на сайте — из Sanity (mock полностью заменён)
- [ ] Запись через сайт работает: клик CTA → виджет → подтверждение → запись в YClients → Telegram-уведомление
- [ ] Live occupancy работает (видны реальные слоты)
- [ ] 12 статей блога опубликованы
- [ ] Цели в Метрике срабатывают
- [ ] Sentry видит test error из дев-окружения

---

# PHASE 6: POLISH

**Цель фазы:** идеальное качество — performance, SEO, a11y, edge cases.
**Длительность:** 2 недели (нед. 14-15).
**Gate:** все скоры Lighthouse ≥ 90, нет критичных bug в QA.

---

### [POL-01] Performance audit + оптимизации 🟡

**Goal:** Lighthouse Performance ≥ 90 на всех ключевых страницах.

**Acceptance:**

- Lighthouse CI добавлен в GitHub Actions: каждый PR проверяется
- Бюджеты per ARCHITECTURE.md §11:
  - LCP ≤ 2.0s (на хорошем 3G)
  - CLS ≤ 0.05
  - INP ≤ 100ms
  - TBT ≤ 150ms
- Все JS-bundles ≤ 200KB gzipped
- Все изображения через `<NextImage>`
- 3D BP — `dynamic({ ssr: false })`, lazy chunk
- GSAP-плагины — granular import (только используемые)
- Шрифты — `display: swap`, preload только display + sans
- Анализ через `@next/bundle-analyzer` — нет неожиданно больших chunks

**Files:** `.github/workflows/lighthouse.yml`, lighthouse-budget.json
**Depends on:** все фазы 0-5
**Estimate:** 12 часов

**Claude Code prompt:**

```
Audit performance per docs/ARCHITECTURE.md §11.
Run `npm run build && npm run start`, then Lighthouse on /, /services, /barbers, /journal.
For every metric below budget — propose specific fix and apply.
Iterate until all pages green.
```

---

### [POL-02] SEO audit ✅

**Goal:** все страницы готовы к индексации, JSON-LD валидно.

**Acceptance:**

- Каждая страница имеет уникальные `<title>` и `<meta description>`
- OG/Twitter метатеги на каждой странице
- JSON-LD `<HairSalon>` на главной с реальными данными (адрес, GPS, часы, ИНН)
- JSON-LD `<Person>` на каждом /barbers/[slug]
- JSON-LD `<Service>` на /services и в каждой ServiceCard
- JSON-LD `<Article>` на каждой /journal/[slug]
- JSON-LD `<Review>` в Reviews section
- Все JSON-LD прошли проверку https://search.google.com/test/rich-results
- Hreflang не нужен (только русский)
- Canonical URLs правильные

**Files:** `src/lib/schema.ts`, метатеги во всех `page.tsx`
**Depends on:** PG-01..PG-08
**Estimate:** 6 часов

---

### [POL-03] Accessibility audit ✅

**Goal:** уровень WCAG 2.1 AA, axe-core ноль ошибок.

**Acceptance:**

- Все интерактивные элементы доступны клавиатурой
- Focus rings видимы (никаких `outline: none` без замены)
- Все изображения имеют alt-текст
- Все формы имеют label
- Aria-live regions для динамических обновлений (toast, live occupancy)
- Контраст текста ≥ 4.5:1 (BG-PRIMARY → FG-PRIMARY) — проверить все цветовые комбинации
- `prefers-reduced-motion` респектится везде
- Skip-link «к контенту» в начале body
- axe DevTools — 0 violations
- Тест с screen reader (NVDA или VoiceOver) — 5 минут навигации без проблем

**Files:** все компоненты по чек-листу
**Depends on:** все компоненты
**Estimate:** 10 часов

---

### [POL-04] Cross-browser + cross-device testing 🔴

**Goal:** работает корректно на ~95% устройств российской аудитории.

**Acceptance:**

- Тестирование на:
  - Chrome (Android/Desktop) — основной
  - Safari (iOS/macOS) — критично для премиум-аудитории
  - Yandex.Browser (Desktop + Android) — характерно для РФ
  - Firefox — basic check
  - Edge — basic check
- Mobile devices: iPhone SE, iPhone 14, Pixel 7, Galaxy A52
- Tablet: iPad (Safari), Android tablet
- Bug list — фиксируются и закрываются до launch
- BrowserStack или Playwright на CI

**Files:** `tests/e2e/*` (Playwright), bug list в Linear/GitHub
**Depends on:** все
**Estimate:** 12 часов

---

### [POL-05] Sound + animation polish 🟡

**Goal:** все звуки и анимации финализированы.

**Acceptance:**

- Все звуки имеют единую громкость (-12dB normalize)
- Все анимации имеют единые easing curves (из BRAND.md)
- Page transitions гладкие, без jank на средних ноутбуках
- 3D BP — нет fps drops при скролле
- Cursor magnetic — feels natural

**Files:** `public/sounds/*` (re-encode), различные animation-utility файлы
**Depends on:** все анимации
**Estimate:** 4 часа

---

### [POL-06] Mobile UX final 🟡

**Goal:** mobile-experience безупречен.

**Acceptance:**

- Touch-targets ≥ 44×44 px
- Sticky CTA не перекрывает важные блоки
- WhatsApp-кнопка не конфликтует с другими floating-elements
- Нет horizontal scroll
- Mobile menu hamburger работает плавно
- Form-инпуты не зумятся при focus (font-size ≥ 16px на мобильном)

**Files:** все
**Depends on:** все
**Estimate:** 6 часов

---

### Phase 6 Gate ✅

К концу нед. 15:

- [ ] Все 10+ страниц: Lighthouse Performance ≥ 90, A11y ≥ 95, SEO ≥ 95, Best Practices ≥ 95
- [ ] axe DevTools — 0 violations
- [ ] Cross-browser test passed
- [ ] Заказчик дал финальное «✅» (раунд 3 из 3)
- [ ] Все critical и high-priority bugs закрыты

---

# PHASE 7: SOFT LAUNCH

**Цель фазы:** перевести трафик со старого сайта на новый с минимальной потерей SEO.
**Длительность:** 1 неделя (нед. 16).
**Gate:** `basepremier.ru` отдаёт новый сайт, старый сайт мёртв или редиректится.

---

### [LAU-01] 301 redirects map ✅

**Goal:** все старые URL ведут на эквивалентные новые.

**Acceptance:**

- Аудит старого сайта — выписать все живые URL (через `screamingfrog` или `wget --spider -r`)
- Map в `next.config.mjs`: каждый старый URL → новый
- Sample (примеры):
  - `/uslugi` → `/services`
  - `/master/marat-..` → `/barbers/marat`
  - `/contact` → `/contacts`
- Тест: `curl -I https://basepremier.ru/old-url` → 301 + правильный Location
- Старые URL добавлены в Yandex Webmaster как редиректы

**Files:** `next.config.mjs`, `redirects-map.json`
**Depends on:** все
**Estimate:** 4 часа

---

### [LAU-02] DNS switch + SSL 🔴

**Goal:** `basepremier.ru` указывает на новый VPS.

**Acceptance:**

- На VPS поднят production-режим (отдельно от staging)
- Nginx-конфиг для `basepremier.ru` (apex + www)
- Let's Encrypt сертификат для `basepremier.ru` и `www.basepremier.ru`
- На reg.ru DNS A-записи обновлены: `basepremier.ru → IP VPS`, `www → IP`
- TTL понижен до 300 сек **за день до switch** (чтобы быстрее propagate)
- DNS switch — в **понедельник утром** (минимум активного трафика для тестов)
- Через 1 час после switch — мониторим Метрику, если что-то сломано — откатываемся через старый IP

**Files:** `/etc/nginx/sites-available/basepremier.ru`, обновление DNS
**Depends on:** LAU-01
**Estimate:** 4 часа

---

### [LAU-03] Yandex Webmaster + Search Console 🔴

**Goal:** поисковики уведомлены о новом сайте, начинают переиндексацию.

**Acceptance:**

- В Yandex Вебмастер: добавить sitemap.xml, отправить запрос на переиндексацию
- В Google Search Console: то же
- В Yandex.Бизнес: проверить актуальность данных профиля (адрес, часы, фото)
- В 2ГИС / Яндекс.Карты: проверить актуальность

**Files:** —
**Depends on:** LAU-02
**Estimate:** 2 часа

---

### [LAU-04] Soft launch announcement 🟡

**Goal:** деликатное сообщение о редизайне постоянным клиентам.

**Acceptance:**

- Пост в соцсетях бренда (Instagram + VK + Telegram-канал, если есть)
- Тон — спокойный, не «революция» (мы — Tom Ford-style)
- Возможно email-рассылка (если у заказчика есть база)
- Track в Метрике: посещения после запуска

**Files:** —
**Depends on:** LAU-02
**Estimate:** 2 часа

---

### [LAU-05] Post-launch monitoring (первые 7 дней) 🔴

**Goal:** ловим и фиксим проблемы до того, как они станут видимы массе.

**Acceptance:**

- Каждый день в 9:00 — проверка:
  - Sentry на новые errors
  - Метрика на drop позиций / трафика
  - Yandex Webmaster на ошибки crawl
  - Скорость загрузки (Web Vitals в Метрике)
  - Записи через сайт работают (test-запись каждый день)
- Все критичные баги — в hotfix-ветку, deploy в течение часа

**Files:** —
**Depends on:** LAU-02
**Estimate:** 1 час/день × 7 дней = 7 часов

---

### Phase 7 Gate ✅ 🎉

К концу нед. 16:

- [ ] `https://basepremier.ru/` — новый сайт, HTTPS, без 404
- [ ] Все старые URL отдают 301 на новые эквиваленты
- [ ] Sentry чистый (нет errors > info-level)
- [ ] Запись через сайт идёт в YClients
- [ ] Yandex Вебмастер: новые URL начали индексироваться
- [ ] Заказчик доволен, сделал пост в соцсетях

---

# 3. ПОСЛЕ ЗАПУСКА (BACKLOG)

Идеи на «после live» — не в основном плане, но в очереди:

- **Подача на премии:** Awwwards SOTD, CSS Design Awards, FWA, Lovely Web (RU) — после стабилизации
- **A/B-тестирование hero-вариантов:** 3 разных подачи слогана, через VWO или собственный split
- **Динамический Open Graph:** для каждой статьи блога — генерация OG-image с заголовком и брендингом
- **Telegram-бот для записи:** альтернатива виджету YClients
- **Корпоративные программы:** для компаний (если заказчик передумает по 5.5)
- **English version:** если будет много туристов из ЦА

---

# 4. ЧЕК-ЛИСТ ПЕРЕД СТАРТОМ ФАЗЫ 0

Прежде чем запустить `claude /init` и начать BS-01:

- [ ] Создан репозиторий на GitHub `base-premier-web` (private)
- [ ] У тебя есть SSH-ключ от VPS заказчика (или твоего)
- [ ] У тебя есть аккаунт Cloudflare (для будущего CDN, если решим)
- [ ] У тебя есть аккаунт Sanity (бесплатный тариф)
- [ ] Установлен Node.js 20+ локально, npm 10+
- [ ] Установлен Claude Code (`npm install -g @anthropic-ai/claude-code`)
- [ ] Прочитаны: `CLAUDE.md`, `docs/BRAND.md`, `docs/ARCHITECTURE.md` (хотя бы по диагонали)
- [ ] Скачаны 6 фотографий из проекта (`B43A77*.jpg`) и положены в `public/images/interior/`
- [ ] Этот ROADMAP.md лежит рядом, открыт во второй вкладке

**Команда старта:**

```bash
mkdir base-premier-web && cd base-premier-web
git init
# скопируй CLAUDE.md, docs/, .claude/ из этого пакета
git add . && git commit -m "chore: bootstrap from BASE Premier package"
claude
# → "Read CLAUDE.md and start with ticket BS-01 from docs/ROADMAP.md"
```

---

# 5. ПРАВИЛА РАБОТЫ С ROADMAP

1. **Один тикет за раз.** Не паралелль внутри себя — Claude Code хорошо работает в фокусе. Если хочется паралелить — git worktrees.
2. **Закрывай тикет полностью.** Acceptance criteria выполнены **все**. Если что-то отложить — создавай новый тикет.
3. **Каждый коммит — с ID тикета.** Например, `feat(BR-04): custom cursor with magnetic effect`.
4. **Ежедневный standup для самого себя.** В Notion/Apple Notes — 5 минут утром: «вчера сделал X, сегодня делаю Y, блокер — Z (если есть)».
5. **Если блокер от заказчика > 3 дня — переходи к параллельным тикетам.** Не теряй неделю, ожидая одну фотосессию.
6. **Каждую пятницу — синк с заказчиком.** Покажи что сделано на этой неделе, согласуй планы на следующую.
7. **Конец фазы — не дату, а Gate.** Если Gate не пройден — не идём дальше, доделываем. Лучше +3 дня в фазе 1, чем +2 недели в фазе 6.

---

_Документ обновляется по мере выполнения тикетов. Последнее обновление — 26.04.2026._
