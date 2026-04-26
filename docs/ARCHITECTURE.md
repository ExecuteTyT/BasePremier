# ARCHITECTURE.md
## Техническая архитектура BASE Premier

> **Назначение:** единственный источник истины для всех технических решений. Стек, структура проекта, интеграции, инфраструктура, деплой, секреты, перформанс, безопасность.
>
> **Аудитория:** Claude Code (для имплементации), я сам (для онбординга через 6 месяцев).
>
> **Связанные документы:** `CLAUDE.md` (что нельзя нарушать), `BRAND.md` (источник tokens), `ROADMAP.md` (порядок имплементации).

---

## 0. ВЫСОКОУРОВНЕВЫЙ ОБЗОР

```
                    ┌──────────────────────────────────┐
                    │      Пользователь (browser)      │
                    └─────────────┬────────────────────┘
                                  │ HTTPS
                                  ▼
                    ┌──────────────────────────────────┐
                    │  Nginx (на VPS, ports 80/443)    │
                    │  - SSL termination (Let's Encrypt)│
                    │  - Static caching                │
                    │  - Reverse proxy                 │
                    └─────────────┬────────────────────┘
                                  │ http://localhost:3000
                                  ▼
                    ┌──────────────────────────────────┐
                    │  Next.js 15 (Node.js, pm2)       │
                    │  - App Router (RSC)              │
                    │  - ISR for /journal pages        │
                    │  - SSG for / and static pages    │
                    │  - Edge API routes for YClients  │
                    └──┬─────────────┬─────────────────┘
                       │             │
                ┌──────▼──┐    ┌─────▼──────────┐
                │  Sanity  │    │  YClients API  │
                │   CMS    │    │   (records,    │
                │ (блог)   │    │  occupancy)    │
                └──────────┘    └────────────────┘
                       │
                ┌──────▼─────────────────────────┐
                │    External integrations       │
                ├────────────────────────────────┤
                │  Yandex.Metrika (analytics)    │
                │  Yandex.Webmaster (SEO)        │
                │  Sentry (errors)               │
                │  Telegram bot (notifications)  │
                └────────────────────────────────┘
```

---

## 1. ТЕХНОЛОГИЧЕСКИЙ СТЕК

### 1.1. Runtime & инструменты

```yaml
node: 22 LTS
package-manager: pnpm 9.x
typescript: 5.6+
linter: ESLint 9 (flat config) + Prettier 3.3
git-hooks: husky + lint-staged (pre-commit format/lint, pre-push typecheck/test)
```

**Почему pnpm:** workspace-friendly (если позже понадобятся sub-packages типа `apps/studio` для Sanity), быстрее npm/yarn, экономит диск через симлинки, точно фиксирует деревья.

### 1.2. Frontend core

```yaml
next: 15.x  # App Router, RSC, Turbopack-ready
react: 19.x
tailwindcss: 4.x  # CSS-first @theme
postcss: 8.x  # для Tailwind
sharp: 0.33+  # для next/image оптимизации
typograf: 7.x  # автоматический типограф для русского
```

### 1.3. Animation & 3D

```yaml
gsap: 3.12+
@gsap/react: 2.x  # useGSAP hook + auto-cleanup
lenis: 1.1+  # smooth scroll
framer-motion: 12.x  # для page transitions
three: 0.169+
@react-three/fiber: 8.17+
@react-three/drei: 9.114+
```

**ScrollTrigger** включён в основной `gsap` пакет (раньше был отдельный).

### 1.4. Контент

```yaml
@sanity/client: 6.x
@sanity/image-url: 1.x
sanity: 3.60+  # studio
@portabletext/react: 3.x  # рендер rich-text из Sanity
```

### 1.5. Утилиты

```yaml
clsx: 2.x  # условные классы
tailwind-merge: 2.x  # дедуп Tailwind классов
zod: 3.23+  # валидация форм и API
date-fns: 4.x  # форматирование дат (с русской локалью)
howler: 2.2+  # звуки (опционально, если native Audio не хватит)
@radix-ui/react-*: latest  # headless primitives для modal, popover, etc
lucide-react: 0.439+  # иконки
splittype: 0.3.x  # для char-by-char анимаций GSAP
```

### 1.6. DevDeps & тестирование

```yaml
vitest: 2.x  # unit-тесты
@testing-library/react: 16.x  # для тестов компонентов
playwright: 1.48+  # e2e
@axe-core/playwright: 4.x  # a11y тесты
@next/bundle-analyzer: 15.x
lighthouse: 12.x  # для CI Performance audit
```

---

## 2. СТРУКТУРА ПРОЕКТА

```
base-premier/
├── .claude/                       # Claude Code конфиги
│   ├── agents/                    # subagent definitions
│   ├── commands/                  # slash commands
│   ├── skills/                    # skills (gsap-scrolltrigger, yclients и т.д.)
│   └── settings.json              # hooks, model, permissions
├── .github/
│   └── workflows/
│       ├── ci.yml                 # lint + typecheck + test on PR
│       └── deploy.yml             # SSH deploy on push to main
├── docs/                          # ВСЕ markdown-доки проекта
│   ├── BRAND.md
│   ├── DESIGN-BRIEF.md
│   ├── CONTENT-BRIEF.md
│   ├── VIDEO-STORYBOARD.md
│   ├── ARCHITECTURE.md
│   ├── ROADMAP.md
│   └── RISK-REGISTER.md
├── public/
│   ├── icons/                     # кастомные SVG-иконки
│   ├── sounds/                    # MP3 для sound design
│   ├── fonts/                     # ничего, fonts через next/font
│   ├── images/                    # статичные картинки (favicon, OG-default)
│   ├── videos/                    # hero-видео (если SSG-friendly)
│   ├── robots.txt
│   ├── sitemap.xml                # генерируется build-time
│   └── og-default.jpg             # 1200×630 для соцсетей
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (marketing)/           # group для основных страниц
│   │   │   ├── layout.tsx         # с header/footer
│   │   │   ├── page.tsx           # /
│   │   │   ├── services/
│   │   │   │   ├── page.tsx       # /services
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── barbers/
│   │   │   │   ├── page.tsx       # /barbers
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── journal/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── contacts/page.tsx
│   │   │   ├── quiz/page.tsx
│   │   │   └── gift-cards/page.tsx
│   │   ├── bp/                    # /bp Easter egg page (без header/footer)
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   ├── yclients/
│   │   │   │   ├── occupancy/route.ts
│   │   │   │   ├── services/route.ts
│   │   │   │   └── staff/route.ts
│   │   │   ├── revalidate/route.ts  # webhook для Sanity
│   │   │   └── og/[type]/route.ts  # OG image generation
│   │   ├── _dev/                  # только в development
│   │   │   ├── tokens/page.tsx    # визуальный набор токенов
│   │   │   └── components/page.tsx
│   │   ├── layout.tsx             # root layout (html, body, fonts)
│   │   ├── not-found.tsx          # 404 с авторской анимацией
│   │   ├── error.tsx              # Server error (500)
│   │   ├── global-error.tsx       # Catch-all
│   │   ├── loading.tsx            # Top-level Suspense fallback
│   │   ├── robots.ts              # генерация robots.txt
│   │   ├── sitemap.ts             # генерация sitemap.xml
│   │   └── manifest.ts            # PWA-минимум
│   ├── components/
│   │   ├── ui/                    # primitive: Button, Card, Input, Tooltip
│   │   ├── sections/              # секции главной (Hero, About, Services...)
│   │   ├── layout/                # Header, Footer, CookieBanner
│   │   ├── three/                 # 3D компоненты (Monogram, Scene)
│   │   ├── typography/            # Heading, Paragraph, RevealText
│   │   ├── icons/                 # кастомные SVG как React-компоненты
│   │   └── motion/                # обёртки для GSAP/Lenis/Framer
│   ├── lib/
│   │   ├── sanity.ts              # client + queries
│   │   ├── yclients.ts            # API wrapper
│   │   ├── schema.ts              # JSON-LD генераторы
│   │   ├── format.ts              # formatPrice, formatDuration, formatDate
│   │   ├── motion.ts              # утилиты (reducedMotion, lerp)
│   │   ├── analytics.ts           # ym('reachGoal', ...)
│   │   ├── seo.ts                 # generateMetadata helpers
│   │   └── sound.ts               # playSound, isSoundEnabled
│   ├── styles/
│   │   ├── tokens.css             # @theme definition (Tailwind v4)
│   │   ├── globals.css            # base styles, resets
│   │   ├── fonts.css              # font-face если нужны переопределения
│   │   └── prose.css              # для блог-статей
│   ├── sanity/
│   │   ├── schemas/               # Article, Service, Barber, Page
│   │   │   ├── article.ts
│   │   │   ├── service.ts
│   │   │   ├── barber.ts
│   │   │   ├── faq.ts
│   │   │   └── settings.ts
│   │   ├── queries.ts             # GROQ
│   │   ├── client.ts
│   │   └── studio.tsx             # /studio мини-роут (опционально)
│   └── types/
│       ├── sanity.ts              # сгенерированные из схем
│       ├── yclients.ts            # ручные тайпинги для API
│       └── globals.d.ts           # window.ym extensions
├── tests/
│   ├── e2e/                       # Playwright
│   ├── a11y/                      # axe-core
│   ├── unit/                      # vitest
│   └── fixtures/                  # мок-данные
├── scripts/
│   ├── seed-sanity.ts             # начальный контент в Sanity
│   ├── generate-og.ts             # bulk OG-image generation
│   └── audit-bundle.ts            # проверка bundle size
├── .env.example                   # шаблон, без секретов
├── .env.local                     # локальный (gitignored)
├── .gitignore
├── next.config.mjs
├── tailwind.config.ts             # минимум, основная конфигурация в @theme
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── README.md                      # как запустить локально
└── CLAUDE.md
```

---

## 3. RENDERING STRATEGY

### 3.1. По страницам

| Маршрут | Стратегия | Revalidate | Зачем |
|---|---|---|---|
| `/` | SSG (build-time) | 3600s ISR | Главная — статичный контент + viewer-side анимации |
| `/services` | SSG | 3600s ISR | Прайс из Sanity, периодически обновляется |
| `/services/[slug]` | SSG | 3600s ISR | Все детальные страницы услуг |
| `/barbers` | SSG | 3600s ISR | Список мастеров, редко меняется |
| `/barbers/[slug]` | SSG | 3600s ISR | Профиль мастера |
| `/about` | SSG | по требованию | Манифест, статичен |
| `/journal` | SSG | 600s ISR | Блог, частые обновления |
| `/journal/[slug]` | SSG | 600s ISR | Статья, может правиться |
| `/contacts` | SSG | по требованию | Контакты статичны |
| `/quiz` | SSG | по требованию | Логика на клиенте |
| `/gift-cards` | SSG | по требованию | Информационная |
| `/bp` | SSG, dynamic 3D-import | по требованию | Easter egg |
| `/api/yclients/occupancy` | Edge runtime | 60s cache | Live данные мастеров |
| `/api/yclients/services` | Edge runtime | 600s cache | Список услуг (на случай sync) |
| `/api/og/[type]` | Edge runtime, on-demand | бесконечно | OG-картинки генерируются один раз |

### 3.2. ISR webhook-ом из Sanity

Когда редактор обновляет контент в Sanity Studio, Sanity отправляет webhook на `/api/revalidate` нашего сайта:

```ts
// src/app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const secret = req.headers.get('x-sanity-webhook-secret');
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const body = await req.json();
  const { _type, slug } = body;

  // Пере-генерируем нужные страницы
  if (_type === 'article') {
    revalidateTag('articles');
    revalidateTag(`article:${slug?.current}`);
  } else if (_type === 'barber') {
    revalidateTag('barbers');
    revalidateTag(`barber:${slug?.current}`);
  } else if (_type === 'service') {
    revalidateTag('services');
  }

  return NextResponse.json({ revalidated: true, type: _type });
}
```

В fetch-запросах из Sanity указываем теги:

```ts
const articles = await client.fetch(query, params, {
  next: { tags: ['articles'], revalidate: 600 },
});
```

---

## 4. SEO И SCHEMA.ORG

### 4.1. Метатеги — generateMetadata helpers

Базовый helper в `src/lib/seo.ts`:

```ts
import type { Metadata } from 'next';

const SITE = {
  name: 'BASE Premier',
  description: 'Премиальный барбершоп в Казани. Шаляпина 26.',
  url: 'https://basepremier.ru',
  ogImage: '/og-default.jpg',
};

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const fullTitle = `${opts.title} · ${SITE.name}`;
  const url = `${SITE.url}${opts.path}`;

  return {
    title: fullTitle,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: opts.description,
      url,
      siteName: SITE.name,
      images: [{ url: opts.ogImage ?? SITE.ogImage, width: 1200, height: 630 }],
      locale: 'ru_RU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: opts.description,
      images: [opts.ogImage ?? SITE.ogImage],
    },
    robots: opts.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
```

Применение в странице:

```ts
// src/app/(marketing)/page.tsx
export const metadata = pageMetadata({
  title: 'Барбершоп с собственным шармом',
  description: 'Премиальный барбершоп в центре Казани. Стрижки от 1800 ₽. Запись онлайн в один клик. Шаляпина, 26.',
  path: '/',
});
```

### 4.2. JSON-LD — генераторы в `src/lib/schema.ts`

```ts
const BUSINESS = {
  '@type': 'HairSalon',
  '@id': 'https://basepremier.ru/#business',
  name: 'BASE Premier',
  alternateName: 'Барбершоп BASE Premier',
  description: 'Премиальный барбершоп в Казани. Стрижки, бритьё, уход за бородой, маникюр.',
  url: 'https://basepremier.ru',
  telephone: '+7-917-918-38-77',
  priceRange: '₽₽₽',
  image: 'https://basepremier.ru/og-default.jpg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'улица Шаляпина, 26',
    addressLocality: 'Казань',
    addressRegion: 'Республика Татарстан',
    postalCode: '420015',  // уточнить у заказчика
    addressCountry: 'RU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 0,   // ← BLOCKER: получить от заказчика
    longitude: 0,  // ← BLOCKER: получить от заказчика
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '21:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '394',
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: [
    'https://www.instagram.com/basepremier/',
    // VK, Telegram добавим когда получим
  ],
};

export function homepageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      BUSINESS,
      {
        '@type': 'WebSite',
        '@id': 'https://basepremier.ru/#website',
        url: 'https://basepremier.ru',
        name: 'BASE Premier',
        publisher: { '@id': 'https://basepremier.ru/#business' },
        inLanguage: 'ru-RU',
      },
    ],
  };
}

export function servicePageJsonLd(service: {
  name: string;
  description: string;
  priceMin: number;
  priceMax: number;
  duration: string;  // ISO 8601 duration: "PT1H"
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: { '@id': 'https://basepremier.ru/#business' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'RUB',
      lowPrice: service.priceMin,
      highPrice: service.priceMax,
      availability: 'https://schema.org/InStock',
    },
    duration: service.duration,
  };
}

export function articleJsonLd(article: {
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  slug: string;
  cover: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.cover,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { '@type': 'Organization', name: article.author ?? 'BASE Premier' },
    publisher: { '@id': 'https://basepremier.ru/#business' },
    mainEntityOfPage: `https://basepremier.ru/journal/${article.slug}`,
  };
}

export function breadcrumbsJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function personJsonLd(barber: {
  name: string;
  jobTitle: string;
  image: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: barber.name,
    jobTitle: barber.jobTitle,
    image: barber.image,
    worksFor: { '@id': 'https://basepremier.ru/#business' },
    url: barber.url,
  };
}
```

Внедрение JSON-LD в страницу:

```tsx
// src/app/(marketing)/page.tsx
import Script from 'next/script';
import { homepageJsonLd } from '@/lib/schema';

export default function HomePage() {
  return (
    <>
      <Script
        id="schema-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd()) }}
      />
      ...
    </>
  );
}
```

### 4.3. Sitemap & robots

```ts
// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { client } from '@/lib/sanity';

const SITE = 'https://basepremier.ru';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await client.fetch<{ slug: string; updatedAt: string }[]>(
    `*[_type == "article"]{ "slug": slug.current, "updatedAt": _updatedAt }`
  );
  const services = await client.fetch<{ slug: string }[]>(
    `*[_type == "service"]{ "slug": slug.current }`
  );

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE,                  lastModified: new Date(), priority: 1.0,  changeFrequency: 'weekly' },
    { url: `${SITE}/services`,    lastModified: new Date(), priority: 0.9,  changeFrequency: 'weekly' },
    { url: `${SITE}/barbers`,     lastModified: new Date(), priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${SITE}/about`,       lastModified: new Date(), priority: 0.6,  changeFrequency: 'monthly' },
    { url: `${SITE}/journal`,     lastModified: new Date(), priority: 0.7,  changeFrequency: 'daily' },
    { url: `${SITE}/contacts`,    lastModified: new Date(), priority: 0.7,  changeFrequency: 'monthly' },
    { url: `${SITE}/quiz`,        lastModified: new Date(), priority: 0.5,  changeFrequency: 'monthly' },
    { url: `${SITE}/gift-cards`,  lastModified: new Date(), priority: 0.6,  changeFrequency: 'monthly' },
  ];

  return [
    ...staticPages,
    ...articles.map(a => ({
      url: `${SITE}/journal/${a.slug}`,
      lastModified: new Date(a.updatedAt),
      priority: 0.6,
      changeFrequency: 'weekly' as const,
    })),
    ...services.map(s => ({
      url: `${SITE}/services/${s.slug}`,
      lastModified: new Date(),
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    })),
  ];
}
```

```ts
// src/app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/_dev/', '/api/'] },
    ],
    sitemap: 'https://basepremier.ru/sitemap.xml',
    host: 'https://basepremier.ru',
  };
}
```

### 4.4. 301 Redirects (миграция со старого сайта)

Реализуются на уровне **Nginx** (быстрее, чем в Next.js) для SEO-сохранения. Список редиректов в `infra/nginx-redirects.conf`:

```nginx
# Старые URL → новые
location = /uslugi { return 301 /services; }
location = /price { return 301 /services; }
location = /master { return 301 /barbers; }
location = /masters { return 301 /barbers; }
location = /about-us { return 301 /about; }
location = /contact { return 301 /contacts; }
location = /kontakty { return 301 /contacts; }
# Конкретные старые URL мастеров — после анализа Я.Вебмастер
# location = /master/dzhim { return 301 /barbers/jim; }
```

**Action item:** на нед. 14 (PERF-01) — выгрузить из Я.Вебмастера список топ-50 страниц по ссылкам, проверить, нет ли «потерянных» URL, добавить редиректы.

---

## 5. YCLIENTS ИНТЕГРАЦИЯ

### 5.1. Что мы используем

1. **Виджет YClients** — для самой записи. Открывается в модальном окне при нажатии «Записаться».
2. **API YClients v2** — для получения списка услуг, мастеров, **live-occupancy** (FOMO-блок «осталось 2 окна»).

### 5.2. Виджет — встраивание

```tsx
// src/components/booking/BookingWidget.tsx
'use client';

import { useEffect, useRef } from 'react';

declare global { interface Window { ycwidget: any } }

interface Props {
  serviceId?: number;  // прокидываем при клике с конкретной услуги
  staffId?: number;    // прокидываем при клике с конкретного мастера
}

export function BookingWidget({ serviceId, staffId }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const COMPANY_ID = process.env.NEXT_PUBLIC_YCLIENTS_COMPANY_ID;
  const FORM_ID = process.env.NEXT_PUBLIC_YCLIENTS_FORM_ID;

  useEffect(() => {
    if (!containerRef.current || !COMPANY_ID) return;

    const script = document.createElement('script');
    script.src = `https://w508-s2.yclients.com/widgetJS`;
    script.async = true;
    script.dataset.companyId = COMPANY_ID;
    script.dataset.formId = FORM_ID;
    if (serviceId) script.dataset.serviceId = String(serviceId);
    if (staffId) script.dataset.staffId = String(staffId);
    containerRef.current.appendChild(script);

    return () => { script.remove(); };
  }, [serviceId, staffId, COMPANY_ID, FORM_ID]);

  return <div ref={containerRef} className="yclients-widget" />;
}
```

### 5.3. API через Edge proxy

YClients API требует partner_token + user_token. **Никогда** не зашиваем их в клиент. Делаем серверный прокси.

```ts
// src/app/api/yclients/occupancy/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const revalidate = 60;  // кешируем 1 минуту

const YC_API = 'https://api.yclients.com/api/v1';
const PARTNER_TOKEN = process.env.YCLIENTS_PARTNER_TOKEN;
const USER_TOKEN = process.env.YCLIENTS_USER_TOKEN;
const COMPANY_ID = process.env.YCLIENTS_COMPANY_ID;

export async function GET() {
  if (!PARTNER_TOKEN || !USER_TOKEN || !COMPANY_ID) {
    return NextResponse.json({ error: 'YClients not configured' }, { status: 500 });
  }

  // Получаем расписание мастеров на сегодня
  const today = new Date().toISOString().split('T')[0];

  const res = await fetch(
    `${YC_API}/timetable/seances/${COMPANY_ID}/${today}`,
    {
      headers: {
        'Accept': 'application/vnd.yclients.v2+json',
        'Authorization': `Bearer ${PARTNER_TOKEN}, User ${USER_TOKEN}`,
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: 'YClients fetch failed' }, { status: 502 });
  }

  const data = await res.json();

  // Преобразуем в наш формат: { staffId, name, slotsLeft }
  const occupancy = data.data?.map((staff: any) => ({
    staffId: staff.id,
    name: staff.name,
    slotsLeft: staff.seances?.filter((s: any) => !s.busy).length ?? 0,
    nextSlot: staff.seances?.find((s: any) => !s.busy)?.time ?? null,
  }));

  return NextResponse.json({ occupancy }, {
    headers: {
      'Cache-Control': 's-maxage=60, stale-while-revalidate=120',
    },
  });
}
```

### 5.4. Live occupancy — клиентский компонент

```tsx
// src/components/booking/LiveOccupancy.tsx
'use client';

import { useEffect, useState } from 'react';

export function LiveOccupancy({ staffId }: { staffId: number }) {
  const [slots, setSlots] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/yclients/occupancy')
      .then(r => r.json())
      .then(data => {
        const me = data.occupancy?.find((o: any) => o.staffId === staffId);
        setSlots(me?.slotsLeft ?? null);
      })
      .catch(() => setSlots(null));
  }, [staffId]);

  if (slots === null) return null;
  if (slots === 0) return <span className="text-fg-muted">Сегодня закрыта</span>;
  if (slots <= 2) return <span className="text-accent-fg">Осталось {slots} {slots === 1 ? 'окно' : 'окна'}</span>;
  return <span className="text-fg-secondary">Свободна сегодня</span>;
}
```

### 5.5. Quiz → YClients deep-link

После прохождения квиза показываем рекомендацию + кнопку «Записаться» с предзаполненной услугой:

```tsx
const recommendedServiceId = 12345;  // получили из логики квиза

<BookingWidget serviceId={recommendedServiceId} />
```

UTM-параметры также можно передать в URL виджета для трекинга в Я.Метрике.

---

## 6. SANITY CMS

### 6.1. Зачем

Только для динамического контента, который заказчик хочет редактировать без участия разработчика:

- **Articles** — статьи блога `/journal`
- **Barber bios** — биографии мастеров (опционально, можно держать в коде)
- **Settings** — глобальные тексты футера, акции, баннеры
- **FAQ** — вопросы-ответы

Услуги и цены — **держим в коде** (`src/lib/services.ts`), чтобы:
- Тяжелее случайно сломать прайс
- Не зависеть от доступности Sanity
- Лучше типизация и автокомплит

### 6.2. Схемы

```ts
// src/sanity/schemas/article.ts
import { defineType, defineField } from 'sanity';

export const articleSchema = defineType({
  name: 'article',
  title: 'Статьи блога',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      validation: r => r.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Краткое описание (для превью + meta)',
      type: 'text',
      rows: 3,
      validation: r => r.required().min(140).max(160),
    }),
    defineField({
      name: 'cover',
      title: 'Обложка',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', validation: r => r.required() }),
      ],
      validation: r => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'string',
      options: {
        list: [
          { title: 'Уход', value: 'care' },
          { title: 'Стиль', value: 'style' },
          { title: 'История', value: 'history' },
          { title: 'Интервью', value: 'interview' },
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Дата публикации',
      type: 'datetime',
      validation: r => r.required(),
    }),
    defineField({
      name: 'body',
      title: 'Тело статьи',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          fields: [
            { name: 'alt', type: 'string' },
            { name: 'caption', type: 'string' },
          ],
        },
        {
          type: 'object',
          name: 'pullquote',
          title: 'Цитата',
          fields: [
            { name: 'text', type: 'text' },
            { name: 'author', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', validation: r => r.max(60) },
        { name: 'metaDescription', type: 'text', validation: r => r.max(160) },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'cover' },
  },
});
```

### 6.3. Queries (GROQ)

```ts
// src/sanity/queries.ts
export const articlesListQuery = `
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    cover { ..., asset->{ url, metadata { lqip } } },
    category,
    publishedAt
  }
`;

export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    cover { ..., asset->{ url, metadata { lqip, dimensions } } },
    category,
    publishedAt,
    _updatedAt,
    body[]{
      ...,
      _type == "image" => { ..., asset->{ url, metadata { lqip } } }
    },
    seo
  }
`;
```

### 6.4. Client

```ts
// src/lib/sanity.ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-12-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_TOKEN,  // только если нужны draft-режимы
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);
```

### 6.5. Sanity Studio

Студия живёт в отдельном маршруте `/studio` (если нужно встроить в Next.js) или развёрнута как отдельный сайт `studio.basepremier.ru`. Рекомендация: **встроить в Next.js** — один deploy, проще auth.

---

## 7. АНАЛИТИКА И SEO-ТУЛЫ

### 7.1. Yandex.Metrika

```ts
// src/components/analytics/YandexMetrika.tsx
'use client';

import Script from 'next/script';

const ID = process.env.NEXT_PUBLIC_YM_ID;

export function YandexMetrika() {
  if (!ID) return null;

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],
          k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${ID}, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
            ecommerce: "dataLayer"
          });
        `}
      </Script>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${ID}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
```

Цели в Метрике (`window.ym(YM_ID, 'reachGoal', 'name')`):

```ts
// src/lib/analytics.ts
export const goals = {
  CTA_HERO_CLICK:        'cta_hero_click',
  CTA_FLOATING_CLICK:    'cta_floating_click',
  TELEGRAM_CLICK:        'telegram_click',
  WHATSAPP_CLICK:        'whatsapp_click',
  PHONE_CLICK:           'phone_click',
  YCLIENTS_OPEN:         'yclients_widget_open',
  YCLIENTS_BOOKING_DONE: 'yclients_booking_completed',
  QUIZ_START:            'quiz_start',
  QUIZ_COMPLETE:         'quiz_complete',
  GIFT_CARD_CTA:         'gift_card_cta',
  REFERRAL_CTA:          'referral_cta',
  JOURNAL_READ_75:       'journal_read_75pct',
} as const;

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: any[]) => void;
  }
}

export function track(goal: keyof typeof goals, params?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  const ymId = Number(process.env.NEXT_PUBLIC_YM_ID);
  if (!ymId || !window.ym) return;
  window.ym(ymId, 'reachGoal', goals[goal], params);
}
```

Использование:

```tsx
<button onClick={() => { track('CTA_HERO_CLICK'); openWidget(); }}>
  Записаться
</button>
```

### 7.2. Yandex.Webmaster

После запуска:
1. Регистрируем сайт в Я.Вебмастере (`https://webmaster.yandex.ru`)
2. Подтверждаем владение (метатег в `<head>` через `metadata.verification`)
3. Добавляем sitemap.xml
4. Настраиваем регион — Казань
5. Подключаем мониторинг ИКС и количества проиндексированных страниц

```ts
// src/app/layout.tsx → metadata
export const metadata: Metadata = {
  // ...
  verification: {
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
};
```

### 7.3. Sentry

```ts
// instrumentation.ts (root)
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    Sentry.replayIntegration({ maskAllText: false, blockAllMedia: false }),
  ],
});
```

---

## 8. ENV VARS

`.env.example` (коммитится в git):

```bash
# === Site ===
NEXT_PUBLIC_SITE_URL=https://basepremier.ru

# === Sanity CMS ===
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_TOKEN=                     # только если нужны drafts
SANITY_WEBHOOK_SECRET=            # для /api/revalidate

# === YClients ===
YCLIENTS_PARTNER_TOKEN=           # серверный, серверный proxy
YCLIENTS_USER_TOKEN=              # серверный
YCLIENTS_COMPANY_ID=              # серверный
NEXT_PUBLIC_YCLIENTS_COMPANY_ID=  # для виджета (можно публично)
NEXT_PUBLIC_YCLIENTS_FORM_ID=     # для виджета

# === Analytics ===
NEXT_PUBLIC_YM_ID=                # ID Я.Метрики
NEXT_PUBLIC_YANDEX_VERIFICATION=  # код подтверждения Я.Вебмастер

# === Sentry ===
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=                # для source maps upload

# === Telegram (notifications) ===
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

`.env.local` (gitignored, локальная разработка) — копия `.env.example` с заполненными значениями.

В production env vars кладём:
- На VPS — в `/etc/base-premier/.env` (chmod 600), читаются systemd unit-ом
- В GitHub Actions — в Repository Secrets (для деплой-пайплайна)

---

## 9. PERFORMANCE

### 9.1. Бюджеты (повторение из CLAUDE.md, для самодостаточности документа)

```yaml
LCP:                    < 1.8s (target), < 2.5s (max)
INP:                    < 100ms (target), < 200ms (max)
CLS:                    < 0.05 (target), < 0.1 (max)
TTFB:                   < 0.4s (target), < 0.8s (max)
First-load JS (home):   < 180KB gzip
First-load JS (other):  < 120KB gzip
Hero video (mobile):    < 1.5MB
Hero video (desktop):   < 3MB
Lighthouse Perf:        ≥ 92
Lighthouse A11y:        ≥ 95
Lighthouse SEO:         100
```

### 9.2. Стратегии оптимизации

**Изображения:**
- `next/image` для всех изображений (auto AVIF/WebP)
- `priority` только на hero (max 1 на странице)
- Точные `width`/`height` для предотвращения CLS
- Sizes атрибут с реальным responsive viewport (`sizes="(max-width: 768px) 100vw, 50vw"`)
- `placeholder="blur"` с LQIP из Sanity / next/image dataURL
- Hero-image в формате AVIF: 60-80% меньше WebP

**Видео:**
- WebM VP9 как primary, MP4 как fallback
- `<video preload="none">` для не-hero видео
- Hero-видео — `preload="metadata"` + autoplay через intersection после первого кадра poster
- `playsinline muted` обязательны для iOS autoplay
- Mobile-версия видео отдельная: меньше разрешение, меньше bitrate (см. VIDEO-STORYBOARD.md)

**Шрифты:**
- `next/font` self-hosted (no external requests)
- `font-display: swap`
- Variable axes — только нужные (для Fraunces включаем opsz/SOFT/WONK; для Inter — slnt; для JetBrains — wght)
- Subset `["latin", "cyrillic"]` — без греческого, вьетнамского и т.д.

**JS:**
- Server Components где возможно (минус ~30% client bundle)
- Dynamic import для тяжёлых клиентских компонентов (`<Monogram3D />`, BookingWidget, Quiz)
- Tree-shake aggressive — никаких barrel files, прямые импорты `import X from 'lib/x'`
- Prefetch links только для likely-next-page (header nav)

**CSS:**
- Tailwind v4 покрывает 99%, кастомного CSS почти нет
- Critical CSS inline — Next.js делает это автоматически

**Кеширование (Nginx):**

```nginx
# Static assets — immutable, год
location /_next/static/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(jpg|jpeg|png|webp|avif|svg|gif|ico|woff2|mp4|webm)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# HTML — короткий кеш с revalidation
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $host;
    add_header Cache-Control "public, max-age=0, must-revalidate";
}
```

### 9.3. Бандл-анализ

Раз в неделю на этапах разработки:

```bash
ANALYZE=true pnpm build
# открыть .next/analyze/client.html
```

Если первоначальный chunk > 180 KB — рефактор: `dynamic` импорты, удаление лишних зависимостей.

---

## 10. SECURITY

### 10.1. Content Security Policy (CSP)

```ts
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic'
      https://mc.yandex.ru
      https://*.yandex.ru
      https://w508-s2.yclients.com
      https://yclients.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:
      https://cdn.sanity.io
      https://mc.yandex.ru
      https://*.yandex.net;
    media-src 'self' blob:;
    font-src 'self';
    connect-src 'self'
      https://api.yclients.com
      https://*.sanity.io
      https://mc.yandex.ru
      https://o*.ingest.sentry.io;
    frame-src 'self' https://yclients.com https://*.yclients.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('x-nonce', nonce);
  return response;
}

export const config = {
  matcher: [{ source: '/((?!_next/static|_next/image|favicon.ico).*)' }],
};
```

### 10.2. HTTP заголовки безопасности

В Nginx config:

```nginx
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header X-XSS-Protection "0" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()" always;
```

### 10.3. Rate limiting (для /api/* маршрутов)

В Nginx:

```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=30r/m;

location /api/ {
    limit_req zone=api burst=10 nodelay;
    proxy_pass http://localhost:3000;
}
```

30 requests/минуту с одного IP, burst 10. Защищает API-прокси YClients.

### 10.4. Секреты — никогда в коде

- ✅ Все секреты в `.env.local` (gitignored) и `/etc/base-premier/.env` на VPS
- ❌ Никаких секретов в `git log`, в commits, в README, в публичных issues
- При случайном коммите секрета — немедленно ротируем (новый token), переписываем git history (git filter-branch / BFG), пушим force

---

## 11. DEPLOYMENT

### 11.1. VPS — требования

```yaml
os: Ubuntu 24.04 LTS
ram: минимум 2 GB (рекомендуется 4 GB для buffer cache)
cpu: 2 vCPU
disk: 40 GB SSD
software:
  - Node.js 22 LTS (через NodeSource APT)
  - pnpm 9 (npm install -g pnpm)
  - Nginx 1.24+
  - certbot (Let's Encrypt)
  - pm2 (npm install -g pm2)  ИЛИ  systemd unit
  - git
network:
  - порт 80, 443 открыты
  - порт 22 (SSH) — только с whitelist IP
firewall:
  ufw allow 22/tcp from <my-ip>
  ufw allow 80/tcp
  ufw allow 443/tcp
  ufw enable
```

### 11.2. Initial setup VPS

```bash
# 1. Создать deploy пользователя
adduser deploy
usermod -aG sudo deploy
mkdir -p /home/deploy/.ssh
# скопировать публичный SSH-ключ в authorized_keys

# 2. Установить Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. pnpm + pm2
sudo npm install -g pnpm@9 pm2

# 4. Создать структуру
sudo mkdir -p /var/www/base-premier
sudo chown deploy:deploy /var/www/base-premier
sudo mkdir -p /etc/base-premier
sudo chmod 700 /etc/base-premier

# 5. Положить .env
sudo nano /etc/base-premier/.env
sudo chmod 600 /etc/base-premier/.env
sudo chown deploy:deploy /etc/base-premier/.env

# 6. Nginx
sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/basepremier.ru
sudo ln -s /etc/nginx/sites-available/basepremier.ru /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 7. SSL
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d basepremier.ru -d www.basepremier.ru
# autorenew проверяется через `sudo certbot renew --dry-run`
```

### 11.3. Nginx config (production)

```nginx
# /etc/nginx/sites-available/basepremier.ru

# HTTP → HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name basepremier.ru www.basepremier.ru;
    return 301 https://basepremier.ru$request_uri;
}

# WWW → non-WWW
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.basepremier.ru;
    ssl_certificate /etc/letsencrypt/live/basepremier.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/basepremier.ru/privkey.pem;
    return 301 https://basepremier.ru$request_uri;
}

# Main server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name basepremier.ru;

    ssl_certificate /etc/letsencrypt/live/basepremier.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/basepremier.ru/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;

    # Security headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()" always;

    # Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;
    gzip_min_length 1000;
    gzip_comp_level 6;

    # Brotli (если установлен ngx_brotli модуль)
    brotli on;
    brotli_types text/plain text/css application/json application/javascript text/xml;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=30r/m;

    # 301 редиректы со старого сайта
    include /etc/nginx/snippets/base-premier-redirects.conf;

    # Static assets — long cache
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.(jpg|jpeg|png|webp|avif|svg|gif|ico|woff2|mp4|webm|mp3)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API
    location /api/ {
        limit_req zone=api burst=10 nodelay;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $host;
    }

    # Everything else
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        add_header Cache-Control "public, max-age=0, must-revalidate";
    }

    # logs
    access_log /var/log/nginx/basepremier.ru.access.log;
    error_log  /var/log/nginx/basepremier.ru.error.log;
}
```

### 11.4. PM2 ecosystem

```js
// ecosystem.config.js (на VPS, /var/www/base-premier/ecosystem.config.js)
module.exports = {
  apps: [{
    name: 'base-premier',
    cwd: '/var/www/base-premier/current',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3000',
    instances: 'max',
    exec_mode: 'cluster',
    env_file: '/etc/base-premier/.env',
    error_file: '/var/log/pm2/base-premier-error.log',
    out_file: '/var/log/pm2/base-premier-out.log',
    max_memory_restart: '1G',
    autorestart: true,
  }],
};
```

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # генерирует systemd unit
```

### 11.5. CI/CD — GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

concurrency:
  group: deploy-${{ github.ref }}
  cancel-in-progress: false

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with: { version: 9 }

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - run: pnpm install --frozen-lockfile

      - name: Lint + Typecheck
        run: |
          pnpm lint
          pnpm typecheck

      - name: Test
        run: pnpm test --run

      - name: Build
        run: pnpm build
        env:
          NEXT_PUBLIC_SITE_URL: https://basepremier.ru
          NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.SANITY_PROJECT_ID }}
          NEXT_PUBLIC_SANITY_DATASET: production
          NEXT_PUBLIC_YCLIENTS_COMPANY_ID: ${{ secrets.YCLIENTS_COMPANY_ID_PUBLIC }}
          NEXT_PUBLIC_YCLIENTS_FORM_ID: ${{ secrets.YCLIENTS_FORM_ID }}
          NEXT_PUBLIC_YM_ID: ${{ secrets.YM_ID }}
          NEXT_PUBLIC_SENTRY_DSN: ${{ secrets.SENTRY_DSN }}

      - name: Upload to VPS via rsync over SSH
        env:
          SSH_KEY: ${{ secrets.DEPLOY_SSH_KEY }}
          DEPLOY_HOST: ${{ secrets.DEPLOY_HOST }}
        run: |
          mkdir -p ~/.ssh
          echo "$SSH_KEY" > ~/.ssh/deploy_key
          chmod 600 ~/.ssh/deploy_key
          ssh-keyscan -H "$DEPLOY_HOST" >> ~/.ssh/known_hosts

          # Создать новый release-каталог с timestamp
          RELEASE=$(date +%Y%m%d-%H%M%S)
          ssh -i ~/.ssh/deploy_key deploy@$DEPLOY_HOST "mkdir -p /var/www/base-premier/releases/$RELEASE"

          # Синхронизировать build
          rsync -avz --delete -e "ssh -i ~/.ssh/deploy_key" \
            --exclude='.git' --exclude='node_modules' \
            ./ deploy@$DEPLOY_HOST:/var/www/base-premier/releases/$RELEASE/

          # Установить deps на сервере и переключить symlink
          ssh -i ~/.ssh/deploy_key deploy@$DEPLOY_HOST << EOF
            cd /var/www/base-premier/releases/$RELEASE
            pnpm install --prod --frozen-lockfile
            ln -sfn /var/www/base-premier/releases/$RELEASE /var/www/base-premier/current
            pm2 reload base-premier
            # Удалить старые release (оставить последние 3)
            cd /var/www/base-premier/releases && ls -1t | tail -n +4 | xargs -r rm -rf
          EOF
```

### 11.6. Rollback

Каждый деплой создаёт новую папку в `/var/www/base-premier/releases/` с timestamp. Rollback:

```bash
ssh deploy@vps
cd /var/www/base-premier
ls -lt releases/  # выбрать предыдущий
ln -sfn /var/www/base-premier/releases/<previous> current
pm2 reload base-premier
```

---

## 12. SMOOTH SCROLL — LENIS × ScrollTrigger SYNC

Один из самых tricky моментов — синхронизация Lenis (smooth scroll) с GSAP ScrollTrigger. Без правильной интеграции скролл-анимации будут лагать или неточно срабатывать.

```tsx
// src/components/motion/SmoothScrollProvider.tsx
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;  // не активируем Lenis
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Sync Lenis с ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return <>{children}</>;
}
```

В `app/layout.tsx`:

```tsx
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
```

---

## 13. TELEGRAM NOTIFICATIONS

Альтернатива email-уведомлениям — отправка событий в Telegram-бота.

### 13.1. Что отправляем

- Новая запись через YClients (webhook от YClients)
- Завершение квиза (если хотим знать какие услуги популярны)
- Ошибка 500 на сайте (Sentry → Telegram)
- Прохождение Lighthouse-аудита в CI с ниже-таргета результатами

### 13.2. Как настроить

```bash
# 1. Создать бота через @BotFather в Telegram
# Получить TELEGRAM_BOT_TOKEN

# 2. Узнать chat_id (свой или группы):
# Отправить сообщение боту, потом curl https://api.telegram.org/bot<TOKEN>/getUpdates
```

### 13.3. Утилита

```ts
// src/lib/telegram.ts
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function notifyTelegram(message: string, opts?: { silent?: boolean }) {
  if (!BOT_TOKEN || !CHAT_ID) return;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML',
      disable_notification: opts?.silent ?? false,
    }),
  }).catch(() => {/* silent */});
}
```

Использование:

```ts
// src/app/api/yclients/webhook/route.ts
import { notifyTelegram } from '@/lib/telegram';

export async function POST(req: Request) {
  const body = await req.json();
  if (body.event === 'record_create') {
    await notifyTelegram(
      `📅 Новая запись\n\n` +
      `Услуга: ${body.record.services[0]?.title}\n` +
      `Мастер: ${body.record.staff.name}\n` +
      `Время: ${body.record.date}\n` +
      `Клиент: ${body.record.client.name} ${body.record.client.phone}`
    );
  }
  return new Response('ok');
}
```

---

## 14. README.md (для VPS-онбординга через 6 месяцев)

В корне репозитория создаём минимальный README.md:

```markdown
# BASE Premier — Frontend

> Премиальный барбершоп. Редизайн на Next.js 15.

## Quick start

\`\`\`bash
pnpm install
cp .env.example .env.local  # заполнить значения
pnpm dev
\`\`\`

Открыть http://localhost:3000

## Команды

- `pnpm dev` — dev-сервер
- `pnpm build` — production-сборка
- `pnpm lint` — ESLint
- `pnpm typecheck` — TypeScript
- `pnpm test` — Vitest unit
- `pnpm test:e2e` — Playwright e2e
- `pnpm sanity dev` — Sanity Studio локально

## Документация

- `CLAUDE.md` — главный контекст проекта (ОБЯЗАТЕЛЬНО прочесть)
- `docs/BRAND.md` — дизайн-система
- `docs/ARCHITECTURE.md` — этот файл
- `docs/ROADMAP.md` — план разработки и тикеты

## Деплой

`git push origin main` → автоматический деплой через GitHub Actions.

Production: https://basepremier.ru
```

---

## 15. РОДСТВЕННЫЕ ДОКУМЕНТЫ

| Документ | Связь |
|---|---|
| `CLAUDE.md` | Всё, что здесь — обязательно соответствует инвариантам оттуда |
| `docs/BRAND.md` | Источник tokens, которые мы экспортируем в Tailwind config |
| `docs/DESIGN-BRIEF.md` | Какие компоненты строим под это решение |
| `docs/ROADMAP.md` | В каком порядке имплементируем эту архитектуру |
| `docs/RISK-REGISTER.md` | Что может пойти не так в каждом из этих компонентов |

---

## 16. ИЗМЕНЕНИЯ

| Дата | Что |
|---|---|
| 2026-04-26 | v1.0. Полный стек, инфраструктура, интеграции, деплой. |

---

*Этот файл пересматривается каждые 4 недели на этапе разработки и при любом значимом изменении инфраструктуры. Если решение не соответствует тому, что здесь — либо обновляем код, либо обновляем документ. Рассинхрон между ними — это технический долг.*
