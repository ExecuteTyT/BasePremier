# BRAND.md

## Дизайн-система BASE Premier · Concrete & Midnight

> **Назначение документа:** единственный источник истины для всех визуальных и тактильных решений на сайте. Цвета, типографика, spacing, motion, иконография, логотип, sound-design, кастомный курсор — всё, что делает сайт «нашим».
>
> **Аудитория:** Claude Code (для генерации Tailwind config и CSS-переменных), будущий дизайнер (если появится), я сам (для визуальной согласованности через 3 месяца).
>
> **Связанные документы:** `CLAUDE.md` (инварианты), `DESIGN-BRIEF.md` (применение в страницах), `ARCHITECTURE.md` (тех.реализация).

---

## 0. КОНЦЕПЦИЯ

### 0.1. Эмоция за 3 секунды

**«Concrete & Midnight»** — бруталистский интерьер салона, пойманный в digital. Бетонные текстуры, ночное небо за окном, единственная лампа подсветки, никакой лишний шум. Зритель должен почувствовать: _«здесь думают, прежде чем что-то сделать. И делают это очень дорого»._

### 0.2. Три эпитета (повторяем из CLAUDE.md — ключевые)

> **Дорого. Премиально. С собственным шармом.**

Каждое визуальное решение проверяется по этим трём словам. Если что-то — «модно», «хайпово», «молодёжно», «кричаще», «весело» — это не наше.

### 0.3. Anti-references

То, чего мы **избегаем**:

| Что                                               | Почему                                           |
| ------------------------------------------------- | ------------------------------------------------ |
| Топган-style вывески, блестящие логотипы          | Конкурент. Мы ниже-громче, выше-тише.            |
| Хипстерские «крафтовые» иллюстрации               | Не наша эстетика. Мы редакционный, не локальный. |
| Жёлтый/коричневый «whisky lounge»                 | Заказчик отметил «не клуб с виски и сигарами».   |
| Пастельные тона                                   | Гламурный салон красоты — это не мы.             |
| Stock-фотки бородатых мужчин в клетчатых рубашках | Это TopGun и любой массмаркет.                   |
| Любые анимированные эмодзи и стикеры              | Несовместимо с tone-of-voice.                    |
| Скевоморфизм, drop-shadows эпохи 2014             | Мы 2026.                                         |

### 0.4. References (вдохновение, не копирование)

| Сайт                         | Что берём                                                        |
| ---------------------------- | ---------------------------------------------------------------- |
| aesop.com                    | Сдержанная типографика, скупой контент, правило «меньше — лучше» |
| linear.app                   | Вариативные шрифты + точная дизайн-система                       |
| stripe.com (раздел Sessions) | Кинетика без перегруза, видео hero                               |
| readymag.com (про работы)    | Page transitions, кастомный курсор                               |
| betonebarber.ru              | Реализация бруталистской эстетики барбершопа                     |
| ruffians.co.uk               | Тёмная палитра + photography-driven                              |
| portertradingco.com          | Editorial-подход к продукту                                      |

---

## 1. ЦВЕТА

### 1.1. Палитра — токены

Все цвета живут в `src/styles/tokens.css` под директивой `@theme` (Tailwind v4 CSS-first config):

```css
@import "tailwindcss";

@theme {
  /* === ФОН === */
  --color-bg-primary: #0a0a0b; /* почти чёрный, не #000 — даёт глубину */
  --color-bg-secondary: #131316; /* для cards, sections */
  --color-bg-tertiary: #1b1b1e; /* для hover-states, raised surfaces */
  --color-bg-elevated: #232327; /* для modals, popovers */

  /* === ТЕКСТ === */
  --color-fg-primary: #f5f5f2; /* off-white, не #FFF — глаз отдыхает */
  --color-fg-secondary: #c7c7c3;
  --color-fg-muted: #9a9a98;
  --color-fg-subtle: #6b6b6a;
  --color-fg-disabled: #46464e;

  /* === АКЦЕНТ — единственный цвет бренда === */
  --color-accent: #1b2a4e; /* Navy */
  --color-accent-hover: #243762;
  --color-accent-active: #142143;
  --color-accent-fg: #f5f5f2; /* текст НА accent */
  --color-accent-glow: rgba(27, 42, 78, 0.4); /* для box-shadow */

  /* === ГРАНИЦЫ === */
  --color-border-default: rgba(245, 245, 242, 0.08);
  --color-border-strong: rgba(245, 245, 242, 0.16);
  --color-border-accent: rgba(27, 42, 78, 0.6);

  /* === СЕМАНТИКА (минимум, всё приглушённое) === */
  --color-success: #6f8b6f;
  --color-warning: #c9a56b;
  --color-error: #b95a4f;
  --color-info: #6b7b98;
}
```

### 1.2. Запреты

- ❌ **`#FFFFFF` нигде в коде.** Только `var(--color-fg-primary)` или `text-fg-primary`.
- ❌ **`#000000` нигде.** Только `var(--color-bg-primary)`.
- ❌ Дополнительные акцентные цвета (синие, красные, зелёные иконки в Tailwind) — нет.
- ❌ Градиенты на основном UI. **Исключение:** vignette в hero-video, scrim под текстом на фото — допустимо.

### 1.3. Контраст и a11y

| Сочетание                          | Контраст | WCAG                                     |
| ---------------------------------- | -------- | ---------------------------------------- |
| `--fg-primary` на `--bg-primary`   | 17.8 : 1 | AAA ✅                                   |
| `--fg-secondary` на `--bg-primary` | 11.2 : 1 | AAA ✅                                   |
| `--fg-muted` на `--bg-primary`     | 7.1 : 1  | AAA ✅                                   |
| `--fg-subtle` на `--bg-primary`    | 4.7 : 1  | AA ✅ — только для декоративных надписей |
| `--accent-fg` на `--accent`        | 8.6 : 1  | AAA ✅                                   |
| `--fg-primary` на `--bg-secondary` | 14.9 : 1 | AAA ✅                                   |

Любая комбинация ниже 4.5 : 1 — **запрещена** для текста размера ≤ 18px.

---

## 2. ТИПОГРАФИКА

### 2.1. Семейства (бесплатные Google Fonts)

| Назначение          | Шрифт              | Источник     | Кириллица | Variable axes                        |
| ------------------- | ------------------ | ------------ | --------- | ------------------------------------ |
| **Display / H1-H2** | **Fraunces**       | Google Fonts | ✅ полная | opsz 9-144, wght 100-900, SOFT, WONK |
| **Body / UI**       | **Inter**          | Google Fonts | ✅ полная | wght 100-900, slnt -10 to 0          |
| **Mono / numerals** | **JetBrains Mono** | Google Fonts | ✅ полная | wght 100-800                         |

**Почему такая пара:**

- **Fraunces** — современная high-contrast serif от Phaedra Charles. Имеет optical sizing (буквы крупного кегля выглядят иначе, чем мелкого) — это эффект, который раньше был доступен только в платных шрифтах вроде PP Editorial New. Кириллица отличного качества.
- **Inter** — гарнитура, на которой написан Linear, Stripe, GitHub, Figma. Нейтральный, но с характером, идеальная читаемость, лучшая среди free-fonts кириллица.
- **JetBrains Mono** — для цен и кодов. Premium-моноширинный, не выглядит «программистским».

Эта пара бесплатна, лицензии SIL Open Font License (OFL) — можно встраивать в коммерческие проекты без ограничений.

### 2.2. Подключение через `next/font`

```ts
// src/app/fonts.ts
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin", "cyrillic"],
  weight: ["variable"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["variable"],
  axes: ["slnt"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["variable"],
  variable: "--font-mono",
  display: "swap",
  preload: false, // загружается lazy, только где нужно
});
```

В `layout.tsx`:

```tsx
<html lang="ru" className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}>
```

В `tokens.css`:

```css
@theme {
  --font-display: var(--font-display), Georgia, serif;
  --font-sans: var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: var(--font-mono), "SF Mono", Consolas, monospace;
}
```

### 2.3. Type-scale

Используем **fluid typography** через `clamp()`. Меньше брейкпоинтов = меньше регрессий.

```css
@theme {
  /* Display sizes (Fraunces) */
  --text-display-xl: clamp(3rem, 2rem + 5vw, 7.5rem); /* 48-120px — hero H1 */
  --text-display-lg: clamp(2.5rem, 1.7rem + 4vw, 5.5rem); /* 40-88px — section H1 */
  --text-display-md: clamp(2rem, 1.4rem + 3vw, 4rem); /* 32-64px — section H2 */
  --text-display-sm: clamp(1.625rem, 1.2rem + 2vw, 2.75rem); /* 26-44px — H3 in editorial */

  /* UI sizes (Inter) */
  --text-h1: clamp(1.75rem, 1.4rem + 1.5vw, 2.25rem); /* 28-36px */
  --text-h2: clamp(1.5rem, 1.2rem + 1.25vw, 2rem); /* 24-32px */
  --text-h3: clamp(1.25rem, 1rem + 1vw, 1.5rem); /* 20-24px */
  --text-h4: 1.125rem; /* 18px */

  --text-body-lg: 1.125rem; /* 18px — для лидов */
  --text-body: 1rem; /* 16px — основной */
  --text-body-sm: 0.9375rem; /* 15px — secondary */
  --text-caption: 0.8125rem; /* 13px — meta */
  --text-overline: 0.75rem; /* 12px — metadata, labels */
}
```

**Мобильные минимумы при 375 px** — clamp()-токены уже обеспечивают безопасные нижние границы: `display-xl` 48 px, `display-lg` 40 px, `display-md` 32 px, `display-sm` 26 px, `h1` 28 px, `h2` 24 px, `h3` 20 px. Дополнительные mobile-only токены не нужны — пороги H1 ≥ 24 px и H2 ≥ 20 px уже выполняются. Если в конкретном элементе обнаружится значение ниже порога — добавляем `min-h-*` на месте, а не новый глобальный токен.

Параметры строки и интерлиньяжа:

```css
/* line-height */
--leading-display: 0.95; /* очень плотно для display, как в Aesop */
--leading-tight: 1.1;
--leading-snug: 1.3;
--leading-normal: 1.5;
--leading-relaxed: 1.65; /* для длинных параграфов в /about, /journal */

/* letter-spacing */
--tracking-display: -0.02em; /* минус для крупных */
--tracking-tight: -0.01em;
--tracking-normal: 0;
--tracking-wide: 0.04em;
--tracking-overline: 0.12em; /* для UPPERCASE подписей */
```

### 2.4. Применение классов (Tailwind v4)

```html
<!-- Hero H1 -->
<h1 class="font-display text-display-xl leading-display tracking-display text-fg-primary">
  Барбершоп с собственным шармом
</h1>

<!-- Section H2 -->
<h2 class="font-display text-display-md leading-tight tracking-tight">О нас</h2>

<!-- Body -->
<p class="font-sans text-body leading-relaxed text-fg-secondary">
  Открыты в 2022 году. Один филиал на Шаляпина, 26.
</p>

<!-- Цена -->
<span class="font-mono text-h3 tabular-nums">2 700 ₽</span>

<!-- Overline / label -->
<span class="font-sans text-overline tracking-overline uppercase text-fg-muted"> Услуга </span>
```

### 2.5. Кириллица — особый случай

Заказчик согласовал: **«H1 на английском, остальное на русском»** (Aesop-pattern в РФ).

Применение:

```html
<!-- Главная hero -->
<div class="hero">
  <p class="overline">Премиальный барбершоп · Казань</p>
  <h1 class="font-display text-display-xl">
    <span lang="en">BASE Premier</span>
    <span class="block text-fg-secondary mt-4">Барбершоп с собственным шармом</span>
  </h1>
</div>
```

Это даёт:

1. Английский header задаёт «editorial international» tone
2. Русский подзаголовок ловит SEO-смысл и понятен пользователю
3. Не выглядит как «русский сайт с English vibe» — выглядит как Aesop

**Где так делаем:** только hero главной, hero страниц `/about`, `/services`, `/barbers`, `/journal`. Остальные H1 — на русском.

### 2.6. Optical sizing у Fraunces

Variable axis `opsz` от 9 до 144 — Fraunces автоматически адаптирует пропорции под размер. У нас:

```css
.text-display-xl,
.text-display-lg,
.text-display-md {
  font-variation-settings:
    "opsz" 144,
    "SOFT" 50,
    "WONK" 1;
}

.text-display-sm,
h3 {
  font-variation-settings:
    "opsz" 32,
    "SOFT" 50,
    "WONK" 0;
}

.font-display.text-body,
.font-display.text-caption {
  font-variation-settings:
    "opsz" 9,
    "SOFT" 100,
    "WONK" 0;
}
```

`SOFT` — округлость терминалов, `WONK` — небольшие иррегулярности (1 = больше характера, 0 = классика).

### 2.7. Запреты типографики

- ❌ Никаких `text-transform: uppercase` для display-шрифтов (Fraunces в caps выглядит цирково).
- ❌ Никаких `font-weight: bold` поверх Fraunces — у нас variable axis, используем `wght: 600` или `700` явно.
- ❌ Никаких `<b>`, `<strong>` для эмфазы в body — лучше `<em>` (Inter italic) или другая font-feature.
- ❌ Никакой Lorem Ipsum в коммитах — всегда реальный или приближённый текст.

---

## 3. SPACING & GRID

### 3.1. 8-pt grid

```css
@theme {
  --spacing-0: 0;
  --spacing-1: 0.25rem; /* 4px */
  --spacing-2: 0.5rem; /* 8px */
  --spacing-3: 0.75rem; /* 12px */
  --spacing-4: 1rem; /* 16px */
  --spacing-5: 1.5rem; /* 24px */
  --spacing-6: 2rem; /* 32px */
  --spacing-7: 3rem; /* 48px */
  --spacing-8: 4rem; /* 64px */
  --spacing-9: 6rem; /* 96px */
  --spacing-10: 8rem; /* 128px */
  --spacing-11: 10rem; /* 160px */
  --spacing-12: 12rem; /* 192px */
  --spacing-13: 16rem; /* 256px */
}
```

### 3.2. Section padding

```css
/* Vertical rhythm секций */
section {
  padding-block: clamp(4rem, 3rem + 4vw, 8rem); /* 64-128px */
}

/* Hero — особый случай, занимает 100vh */
.hero {
  min-block-size: 100svh; /* svh для мобильных, чтобы не прыгало с адресной строкой */
}
```

### 3.3. Container & gutters

```css
@theme {
  --container-max: 1440px;
  --container-narrow: 1120px; /* для блогов и контентных страниц */
  --container-wide: 1680px; /* для широких hero-композиций */

  --gutter-mobile: 1rem; /* 16px */
  --gutter-tablet: 1.5rem; /* 24px */
  --gutter-desktop: 2rem; /* 32px */
}

.container {
  max-inline-size: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--gutter-mobile);
}

@media (min-width: 768px) {
  .container {
    padding-inline: var(--gutter-tablet);
  }
}
@media (min-width: 1280px) {
  .container {
    padding-inline: var(--gutter-desktop);
  }
}
```

### 3.4. Grid

12 колонок на desktop, 6 на tablet, 4 на mobile. Gap = 24px desktop / 16px mobile.

```css
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1023px) {
  .grid-12 {
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem;
  }
}
@media (max-width: 639px) {
  .grid-12 {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
}
```

### 3.5. Breakpoints

```css
@theme {
  --breakpoint-sm: 640px; /* phablet */
  --breakpoint-md: 768px; /* tablet portrait */
  --breakpoint-lg: 1024px; /* tablet landscape / small laptop */
  --breakpoint-xl: 1280px; /* desktop */
  --breakpoint-2xl: 1536px; /* large desktop */
}
```

Mobile-first. `xl` — наша дефолтная цель проектирования (~1440×900).

---

## 4. ЛОГОТИП И МОНОГРАММА «BP»

### 4.1. Что такое логотип

> **«BP»** — две буквы, набранные Fraunces (или специально нарисованные на их основе), между ними — небольшой decorative элемент в виде вертикальной чёрточки. Сначала — type-only логотип, потом графический акцент.

Полная wordmark: **`base premier`** (нижний регистр, разрядка 0.08em, без слогана).

### 4.2. Lock-up варианты

```
Primary (large):
                ╮
        BP      │
                ╯
        BASE PREMIER

Secondary (compact, for header):
        BP · base premier

Mark only (для favicon, OG-аватара):
        BP

Wordmark only (когда mark избыточен):
        base premier
```

### 4.3. SVG-исходник логотипа

Поскольку готового вектора нет — Claude генерирует первую версию исходя из Fraunces. Файл `public/logo.svg`:

```svg
<svg width="120" height="40" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
  <text x="0" y="32"
        font-family="Fraunces, Georgia, serif"
        font-weight="700"
        font-size="36"
        font-variation-settings="'opsz' 144, 'SOFT' 30, 'WONK' 1"
        letter-spacing="-0.02em"
        fill="#F5F5F2">BP</text>
</svg>
```

**Это плейсхолдер на фазе 1.** Уточнённую версию генерируем во время BR-04 (см. `ROADMAP.md`).

### 4.4. Зона безопасности

Вокруг знака — минимум **высота буквы B** свободного пространства со всех сторон. На сайте логотип в шапке ~28-32 px, на лендинге может быть до 200+ px.

### 4.5. Запреты

- ❌ Не растягивать (только пропорциональное масштабирование).
- ❌ Не накладывать на сложный фон без подложки.
- ❌ Не менять цвет (только `--fg-primary` или `--accent` или `currentColor`).
- ❌ Не добавлять обводки, тени, glow-эффекты в статике.

---

## 5. 3D-МОНОГРАММА (R3F)

### 5.1. Концепция

В hero главной — рендерится **3D-буква BP** как монограмма. Геометрия — extruded text Fraunces, материал — глянцевый тёмный с лёгкой Navy-подсветкой по граням. Скейл крутится по mouse-move (parallax) и медленно автономно вращается на ~5° в обе стороны (subtle idle motion).

Дополнительно: **отдельная страница `/bp`** — фуллскрин-сцена, где можно мышью полностью вращать монограмму. Easter egg + PR-фишка.

### 5.2. Технические требования

```yaml
fps-target: 60 fps на iPhone 12 / Galaxy A54 (mid-range)
geometry: ExtrudedGeometry из TextGeometry, Fraunces, depth 0.4, segments 12
material: MeshPhysicalMaterial, roughness 0.15, metalness 0.7, clearcoat 0.8
lighting: 1 directional + 1 environment HDR (studio_small_03_1k.hdr из Drei)
postprocessing: Bloom (intensity 0.3, radius 0.4), легкая ChromaticAberration (0.0008)
size on screen: ~30vh × 30vh
fallback (no WebGL): статичный SVG в том же месте
mobile: упрощённая версия — extruded depth 0.2, без post-processing, без environment HDR
prefers-reduced-motion: статичная monochrome (Navy), idle rotation выключен
```

### 5.3. Загрузка

- `dynamic(() => import('@/components/three/Monogram'), { ssr: false })` — никогда на сервере.
- Lazy-load после `IntersectionObserver` срабатывает на hero (хотя hero сразу видим — но нужно дождаться FCP).
- Suspense fallback — статичный SVG-логотип в том же позиционировании, чтобы не было CLS.

### 5.4. Бюджет

- 3D-сцена должна добавлять не более **+200ms к LCP** (тестируем на Galaxy A54 / Slow 4G).
- JS-вес `three` + `@react-three/fiber` + `@react-three/drei` — chunked отдельно, lazy.
- HDR-environment файл — < 200 KB (используем low-res .hdr или EnvironmentMap).

### 5.5. Композиция в hero

```
┌──────────────────────────────────────────────┐
│  base premier · est. 2022                    │ (overline)
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │                                        │ │
│  │           [ 3D-BP rotating ]           │ │  ← здесь Canvas
│  │                                        │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  Барбершоп с собственным шармом              │ (display-xl)
│                                              │
│  Шаляпина, 26 · 10:00–21:00                  │ (caption)
│                                              │
│  [  Записаться  →  ]                         │ (CTA)
└──────────────────────────────────────────────┘
```

(Точная композиция — в `DESIGN-BRIEF.md`.)

---

## 6. ИКОНОГРАФИЯ

### 6.1. Базовая библиотека

**Lucide Icons** (https://lucide.dev) — open-source, 1500+ иконок, оптимизированный SVG. Единственная разрешённая библиотека.

```tsx
import { ArrowRight, Phone, MapPin, Clock } from "lucide-react";
```

### 6.2. Стиль

- **Stroke-only** (не filled).
- **Stroke width: 1.5** (дефолт у Lucide — 2; нам — 1.5 для большей лёгкости).
- **Размеры:** `16, 20, 24, 32, 48` px. Не произвольные.
- **Цвет:** `currentColor`, контролируется через `text-*` родителя.

```tsx
<ArrowRight className="size-5 text-fg-primary stroke-[1.5]" />
```

### 6.3. Кастомные иконки

Когда Lucide не подходит — рисуем свою SVG в **`public/icons/`**:

- 24×24 viewBox
- Stroke 1.5
- `fill="none"` `stroke="currentColor"`
- `stroke-linecap="round"` `stroke-linejoin="round"`

Примеры кастомных иконок, которые понадобятся:

- `barbershop-pole.svg` — стилизованная барбершоп-полоса
- `straight-razor.svg` — опасная бритва
- `scissors-shears.svg` — ножницы (Lucide-вариант слишком общий)

---

## 7. MOTION & ANIMATION

### 7.1. Easings — единственно разрешённые

```css
@theme {
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1); /* основной */
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1); /* для UI */
  --ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1); /* для page transitions */
  --ease-in-quart: cubic-bezier(0.5, 0, 0.75, 0); /* для exits */
}
```

**Запрет:** `ease`, `ease-in`, `ease-out`, `linear` — это дефолты, выглядят дёшево. Только токены.

### 7.2. Длительности

```css
@theme {
  --duration-fast: 150ms; /* hover, focus */
  --duration-base: 300ms; /* стандарт */
  --duration-slow: 600ms; /* reveal */
  --duration-slower: 900ms; /* page transition */
  --duration-slowest: 1400ms; /* hero entrance */
}
```

### 7.3. ScrollTrigger / Lenis

Все scroll-driven анимации — через **GSAP ScrollTrigger** + **Lenis** для плавности. Sync обязателен (см. `ARCHITECTURE.md` § Lenis).

Стандартный setup для секции:

```tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function SectionExample() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".reveal-line", {
        yPercent: 100,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: ref },
  );

  return <section ref={ref}>...</section>;
}
```

### 7.4. Patterns — базовый набор

| Паттерн                 | Где применяется                  | Параметры                          |
| ----------------------- | -------------------------------- | ---------------------------------- |
| **Char-by-char reveal** | Hero H1, section headings        | SplitType + GSAP, stagger 0.02s    |
| **Line-by-line reveal** | Параграфы манифеста              | yPercent 100, stagger 0.08s        |
| **Image scale-in**      | Появление крупных фото           | scale 1.15→1, duration 1.4s        |
| **Parallax (subtle)**   | Атмосферные секции               | yPercent ±10-15, scrub: 1          |
| **Marquee**             | Логотипы косметики, перечисления | infinite, 30s loop, pause on hover |
| **Magnetic CTA**        | Главная кнопка hero              | mouse-follow с 0.3 elasticity      |
| **Drag-reveal**         | Галерея интерьера                | x: ±200px, springy easing          |
| **Page transition**     | Все смены маршрутов              | overlay-curtain 600ms              |
| **Cursor follow**       | Кастомный курсор                 | spring with 0.18 stiffness         |

Подробнее — в `DESIGN-BRIEF.md` для каждой страницы.

### 7.5. `prefers-reduced-motion`

**Все анимации обязаны** проверять prefers-reduced-motion. Базовая утилита:

```ts
// src/lib/motion.ts
export const reducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

При reduced-motion:

- Все `gsap.from()` заменяются на финальное состояние без анимации
- Lenis отключается, скролл становится нативным
- 3D-сцена — статична (idle rotation выключен)
- Marquee — статичный список вместо бегущей строки
- Кастомный курсор — отключён, виден системный

---

## 8. КАСТОМНЫЙ КУРСОР

### 8.1. Концепция

Маленький кружок 8×8 px с цветом `--fg-primary`, который **lerps** за движением мыши с лёгкой инерцией (spring 0.18). При наведении на интерактивные элементы:

- **На кнопках** → разрастается до 56×56, цвет `--accent`, текст внутри (например «Записаться»)
- **На картинках** → разрастается до 72×72, opacity 0.4, текст «Открыть»
- **На текстовых ссылках** → исчезает (нативный курсор остаётся)
- **На input/textarea** → меняется на text-cursor (вертикальная палочка)

### 8.2. Технические детали

- Реализация через **lenis-style spring** + `requestAnimationFrame` (не CSS-only, нужна инерция).
- На устройствах с touch (`@media (hover: none)`) — **не активен**, виден системный.
- При `prefers-reduced-motion: reduce` — также неактивен.

### 8.3. Magnetic effect для CTA

Главная кнопка hero и кнопки CTA (записаться) — **магнитные**: при подведении мыши на расстояние 100px и ближе, кнопка слегка смещается в сторону курсора (max 8-12 px), используя GSAP с `power2.out`.

---

## 9. SOUND DESIGN

### 9.1. Концепция

Тихие, изысканные звуки на ключевых взаимодействиях. **По умолчанию OFF** (тумблер 🔇 в углу шапки, состояние сохраняется в `localStorage`).

### 9.2. Источник

**Бесплатные библиотеки:**

- Freesound.org (CC0 / CC-BY-4.0)
- Zapsplat.com (бесплатно с регистрацией)
- Pixabay Audio (CC0)

Все используемые файлы — **обязательно** имеют коммерческую лицензию. Атрибуция (если CC-BY) — на странице `/about` в подвале + в `LICENSES.md` репозитория.

### 9.3. Звуковая палитра

Берём 5-7 файлов, обрабатываем под единую тональность (lowpass filter ~6 kHz, нормализация -18 LUFS):

| Событие               | Длительность | Характер                               |
| --------------------- | ------------ | -------------------------------------- |
| Hover на CTA          | 80-120 ms    | Soft swoosh, very low volume           |
| Click на CTA          | 100-150 ms   | Subtle thud                            |
| Page transition       | 600-800 ms   | Cinematic whoosh                       |
| Form success / запись | 800-1000 ms  | Affirmative chime, мягкий              |
| 3D-BP rotation idle   | loop         | Ambient drone (только на /bp странице) |
| Easter egg trigger    | 400 ms       | Reveal hit                             |
| Sound toggle on       | 200 ms       | Gentle pop                             |

### 9.4. Реализация

Используем **Howler.js** или нативный `Audio` API (Howler — если нужны loops и crossfade, для статичных событий хватит native).

```ts
// src/lib/sound.ts
const sounds: Record<string, HTMLAudioElement | null> = {};

export function playSound(name: string) {
  if (!isSoundEnabled()) return;
  if (typeof window === "undefined") return;

  if (!sounds[name]) {
    sounds[name] = new Audio(`/sounds/${name}.mp3`);
    sounds[name]!.volume = 0.3;
    sounds[name]!.preload = "auto";
  }
  sounds[name]!.currentTime = 0;
  sounds[name]!.play().catch(() => {
    /* autoplay blocked */
  });
}

export function isSoundEnabled() {
  return localStorage.getItem("base:sound") === "on";
}
```

### 9.5. Файлы

В `public/sounds/`:

```
hover.mp3       (~3 KB)
click.mp3       (~5 KB)
transition.mp3  (~12 KB)
success.mp3     (~15 KB)
toggle.mp3      (~4 KB)
ambient-bp.mp3  (~80 KB, loop, только для /bp)
```

Формат **MP3 192kbps mono** — баланс качества и веса. Не WAV (тяжело), не OGG (поддержка хуже на iOS).

---

## 10. ИЗОБРАЖЕНИЯ И ВИДЕО

### 10.1. Форматы

```
photos:    AVIF (primary) + WebP (fallback) + JPEG (final fallback)
hero-video: WebM VP9 (primary) + MP4 H.265 (fallback)
posters:   AVIF (для poster атрибута video)
icons:     SVG inline или public/icons/*.svg
illustrations: SVG inline (если простые) или AVIF (если сложные)
```

Все генерируются через `next/image` (для картинок) и кастомный пайплайн ffmpeg (для видео). Подробнее — в `ARCHITECTURE.md` § Media pipeline.

### 10.2. Размеры

```yaml
hero-image-1x: 1920 × 1080
hero-image-2x: 2880 × 1620 (ретина)
section-image-1x: 1440 × 960
section-image-2x: 2160 × 1440
portrait-1x: 800 × 1000
portrait-2x: 1200 × 1500
thumbnail: 400 × 500
```

`next/image` сам генерирует все размеры и format-варианты при использовании `quality={85}` и `sizes` атрибута.

### 10.3. Художественный стиль фото (для фотографа)

См. `CONTENT-BRIEF.md` § Brief для фотосессии. Здесь — короткое summary:

- **Цветокор:** холодные тёмные тени, сохранённые midtones, slight desaturation (-15%)
- **Композиция:** rule of thirds + минимализм, много negative space
- **Освещение:** контрастное, single-source feel (одна лампа). Без soft-box как у глянца
- **Кадрирование:** не «полностью видно мастера», а кропы — руки, инструмент, движение
- **Mood:** «утренний ритуал», «техника работы», «деталь интерьера». Не «весёлая команда».

### 10.4. Видео

См. `VIDEO-STORYBOARD.md` для полной раскадровки hero.

Параметры:

- 30-45 сек
- 4K-исходник, экспорт в 1920×1080 для desktop, 1080×1920 portrait для mobile
- ~16-18 fps замедление (cinematic)
- Без аудио (на сайте автоплей muted)
- **Beamless loop** (склейка точно в один и тот же кадр)

---

## 11. UI-КОМПОНЕНТЫ — БАЗОВЫЕ ТОКЕНЫ

Полная спецификация компонентов — в `DESIGN-BRIEF.md`. Здесь — общие правила.

### 11.1. Кнопки

```
Primary:
  bg: var(--accent)
  fg: var(--accent-fg)
  padding: 14px 32px
  font: Inter 500, text-body, tracking-tight
  border-radius: 0  ← никаких скруглений! Brutalist.
  hover: bg shifts to --accent-hover, +0.5px lift via transform
  focus-visible: 2px outline of --fg-primary, offset 4px

Secondary:
  border: 1px var(--border-strong)
  bg: transparent
  fg: var(--fg-primary)
  hover: bg becomes --bg-tertiary

Ghost:
  bg: transparent
  fg: var(--fg-secondary)
  hover: fg becomes --fg-primary
```

Все кнопки — **острые углы**, без `border-radius`. Это часть бруталистской эстетики.

### 11.2. Карточки

```
Card:
  bg: var(--bg-secondary)
  padding: 32px
  border: 1px solid var(--border-default)
  border-radius: 0
  hover: border becomes --border-strong, slight bg lift to --bg-tertiary, transition 300ms ease-out-expo
```

### 11.3. Inputs (если будут — формы квиза)

```
Input:
  bg: transparent
  border-bottom: 1px solid var(--border-strong)
  padding: 14px 0
  font: Inter 400, text-body
  placeholder: text-fg-subtle
  focus: border-bottom becomes --accent, no glow
```

Никаких поднятых лейблов, никаких outline-боксов. Минимализм.

### 11.4. Modal / Dialog

```
Backdrop:
  bg: rgba(10,10,11, 0.85)  ← --bg-primary с alpha
  backdrop-filter: blur(8px)

Dialog:
  bg: var(--bg-secondary)
  max-width: 640px (для подтверждений)
  padding: 48px
  border: 1px solid var(--border-strong)
  enter: scale 0.95 → 1 + opacity 0 → 1, duration 400ms ease-out-expo
```

### 11.5. Tooltip (для барберов на странице мастеров)

```
Tooltip:
  bg: var(--bg-elevated)
  fg: var(--fg-primary)
  padding: 8px 12px
  font: Inter 400, text-caption
  border: 1px solid var(--border-default)
  arrow: 6px triangle
```

---

## 12. ЛОКАЛИЗАЦИЯ И ТИПОГРАФИЧЕСКИЕ ПРАВИЛА

### 12.1. Кавычки и тире

```
Кавычки внешние: «...»
Кавычки внутренние: „..."
Длинное тире:   —  (не дефис -, не короткое –)
Многоточие:    …  (не три точки)
Знак градуса:  °C
Знак рубля:   ₽   (с неразрывным пробелом перед: 2 700 ₽)
```

### 12.2. Числа

- Тысячи разделяются **неразрывным пробелом**: `2 700 ₽`, `1 800 — 2 700 ₽`.
- Дроби: десятичная запятая, не точка: `1,5`.
- Время: `1 ч 30 мин`, `30 мин`, `45 мин`. Не `1.5 часа`.
- Время дня: `10:00–21:00` (не `10am-9pm`).

### 12.3. Утилита автоматического типографа

Используем библиотеку `typograf` (npm) для автоматической обработки текста на сборке (для контента из Sanity):

```ts
import Typograf from "typograf";

const tp = new Typograf({ locale: ["ru", "en-US"] });

export function typografSafe(text: string): string {
  return tp.execute(text);
}
```

Применяется к описаниям услуг, статьям блога, биографиям. Фиксирует:

- Кавычки `"..."` → `«...»`
- Дефис `-` в нужных местах → `—`
- Неразрывные пробелы перед знаками валют, после коротких союзов
- Авто-замены (правда автоматики не всё — финал ревьюим вручную)

---

## 13. ACCESSIBILITY (WCAG 2.2 AA)

### 13.1. Цели

- **Lighthouse a11y ≥ 95** на каждой странице
- **axe-core 0 critical issues** на каждой странице
- **Manual screen reader test** (NVDA + VoiceOver) на главной + ключевых страницах

### 13.2. Чеклист

```
✅ Все интерактивные элементы достижимы клавиатурой (Tab, Enter, Space)
✅ focus-visible виден везде (2px outline --fg-primary, offset 4px)
✅ Все изображения имеют alt (или alt="" если декоративные)
✅ Все кнопки имеют дискриптивный текст (или aria-label)
✅ Все формы имеют labels (visible или aria-label)
✅ Все ссылки имеют текст (нет "click here", нет icon-only без aria-label)
✅ Все цветовые сигналы дублируются текстом или иконкой
✅ Контраст текста ≥ 4.5 : 1 для body, ≥ 3 : 1 для крупного
✅ HTML semantic structure: <main>, <nav>, <article>, <section>, <header>, <footer>
✅ Skip-link "Перейти к контенту" в начале <main>
✅ <html lang="ru">
✅ Все H1-H6 в корректной иерархии (без перепрыгивания уровней)
✅ Modal — focus trap + Esc to close + return focus к триггеру
✅ Custom cursor — отключается при prefers-reduced-motion и на touch
✅ Видео hero — aria-hidden, не блокирует контент, нет автоплея со звуком
✅ Sound — по умолчанию OFF
✅ Все кастомные components с ARIA-rules (см. WAI-ARIA Authoring Practices)
```

### 13.3. Как тестировать

```bash
# axe-core через Playwright
pnpm test:a11y

# Вручную
1. Tab по всей странице — все интерактивные элементы достижимы?
2. Esc на модалке — закрывается + focus возвращается на триггер?
3. Включить VoiceOver / NVDA → пройтись по странице — всё понятно?
4. DevTools → Rendering → Emulate vision deficiency → проверить все варианты
```

---

## 14. CONTRACT С ДРУГИМИ ДОКУМЕНТАМИ

Этот файл — корень дизайн-решений. От него зависят:

| Документ              | Что берёт отсюда                                                                                          |
| --------------------- | --------------------------------------------------------------------------------------------------------- |
| `DESIGN-BRIEF.md`     | Цвета, типографика, spacing, motion-токены — для применения в страницах                                   |
| `ARCHITECTURE.md`     | Список зависимостей (`fraunces`, `inter`, `gsap`, `lenis`, `three`, `lucide-react`, `typograf`, `howler`) |
| `ROADMAP.md`          | Порядок задач: тикеты `BR-XX` импортируют этот файл в Tailwind config                                     |
| `CONTENT-BRIEF.md`    | Tone of voice (раздел 2 этого файла), типографические правила (раздел 12)                                 |
| `VIDEO-STORYBOARD.md` | Цветокор (раздел 10.3), эмоциональная палитра                                                             |

При расхождении — этот файл побеждает любой кроме `CLAUDE.md`.

---

## 15. ИЗМЕНЕНИЯ

| Дата       | Что                                                      |
| ---------- | -------------------------------------------------------- |
| 2026-04-26 | v1.0. Зафиксированы все решения после ответов заказчика. |

---

_При любом сомнении в реализации — открой dev-страницу `/_dev/tokens` (см. ROADMAP, тикет BR-09), там визуально все токены применены к компонентам. Если что-то выглядит «странно» — это сигнал, что токен в коде разошёлся с этим документом. Тогда либо обновляем код, либо обновляем документ — и фиксируем git-коммитом._
