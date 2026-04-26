---
description: SEO-аудит BASE Premier (meta-tags, JSON-LD, sitemap.xml, robots.txt, hreflang, canonicals)
argument-hint: [<url>] — необязательно, по умолчанию весь сайт
---

# Check SEO: $ARGUMENTS

Полный SEO-аудит. Используй subagent `seo-auditor` (см. `.claude/agents/seo-auditor.md`).

## Шаги

1. **Запусти проект:** `pnpm build && pnpm start`.

2. **Проверь meta-tags для каждой страницы:**

   ### Обязательные:
   - `<title>` — уникальный, ≤ 60 символов, brand-suffix `| BASE Premier` где уместно.
   - `<meta name="description">` — уникальное, ≤ 155 символов, призыв или ключевая выгода.
   - `<link rel="canonical" href="...">` — указывает на сам себя (без query-params, кроме существенных).
   - `<meta property="og:title">`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale="ru_RU"`, `og:site_name="BASE Premier"`.
   - `<meta name="twitter:card" content="summary_large_image">`.
   - `<meta name="robots" content="index,follow">` (по умолчанию). На приватных — `noindex,nofollow`.

   ### Желательные:
   - `<meta name="theme-color" content="#0A0A0B">` (для мобильных браузеров).
   - `<link rel="alternate" hreflang="ru" href="...">` (на старте RU only, но указать).

3. **Проверь JSON-LD на каждой странице:**

   - Главная (`/`):
     - `HairSalon` (LocalBusiness): name, address, geo (lat/lng — Q1 PENDING!), telephone, openingHoursSpecification, priceRange, image, url, sameAs (соцсети).
     - `Organization` (опционально, если разделяем).
   - `/services` и `/services/[slug]`:
     - `Service`: provider (HairSalon), serviceType, areaServed, offers (price, priceCurrency).
   - `/barbers/[slug]`:
     - `Person`: name, jobTitle, worksFor, image, sameAs (Instagram если есть).
   - `/journal/[slug]`:
     - `Article` или `BlogPosting`: headline, datePublished, dateModified, author (Person), publisher, image, articleBody.
   - Все страницы (где применимо):
     - `BreadcrumbList`: itemListElement с position и item.
   - `/` (main):
     - `FAQPage` для секции FAQ — Question/Answer pairs.

4. **Валидация JSON-LD:**
   - Через `https://validator.schema.org/` — копируй JSON и вставляй.
   - Через `https://search.google.com/test/rich-results` — проверка richness в Google.
   - Автоматизация: subagent `seo-auditor` с playwright + парсинг `<script type="application/ld+json">`.

5. **Проверь `sitemap.xml`:**
   - URL: `http://localhost:3000/sitemap.xml`
   - Содержит все статичные страницы.
   - Содержит все динамические из Sanity (services, barbers, journal articles).
   - `<priority>` и `<changefreq>` корректные:
     - Главная: priority=1.0, changefreq=weekly.
     - Категории (services, barbers, journal): priority=0.8, changefreq=weekly.
     - Услуги/мастера: priority=0.7, changefreq=monthly.
     - Статьи: priority=0.6, changefreq=monthly.
     - Контакты, about: priority=0.5, changefreq=monthly.

6. **Проверь `robots.txt`:**
   - URL: `http://localhost:3000/robots.txt`
   - Содержит:
     ```
     User-agent: *
     Allow: /
     Disallow: /api/
     Disallow: /_next/
     Disallow: /admin
     
     Sitemap: https://basepremier.ru/sitemap.xml
     ```

7. **Проверь редиректы (Nginx):**
   - Если был старый сайт с другими URL — проверить 301-редиректы со старых паттернов на новые.
   - На `/services.html` → 301 → `/services`
   - На `?page=services&id=1` → 301 → `/services/[slug]`
   - и т.д. (см. ARCHITECTURE.md § Nginx)

8. **Проверь HTTPS и HSTS:**
   - Все ссылки внутри сайта — относительные или абсолютные с `https://`.
   - Strict-Transport-Security header настроен в Nginx.

9. **Структура заголовков (heading hierarchy):**
   - Один `<h1>` на страницу.
   - H1 → H2 → H3 без пропусков.
   - На главной `<h1>` = «Ваш стиль без компромиссов» (см. DESIGN-BRIEF.md § 3.1).

10. **Проверь image alt:**
    - Все `<img>` и `<Image>` имеют meaningful alt (не «image1.jpg»).
    - Декоративные — `alt=""`.
    - Никогда `alt="кудрявая модель"` без контекста — пиши «Стрижка модели в нашем салоне».

11. **Производительность как SEO-фактор:**
    - Запусти `audit-perf` параллельно (Core Web Vitals = ranking factor).

12. **Локальный SEO (особенно важно для Казани):**
    - В `HairSalon` JSON-LD указан полный адрес: «ул. Шаляпина 26, Казань, 420015» (Q2 PENDING — точный индекс).
    - В `geo` указаны GPS координаты (Q1 PENDING).
    - На странице `/contacts` — адрес виден текстом, а не только на картинке.
    - Я.Бизнес (Я.Карты) — карточка должна быть подтверждена и связана через `sameAs`.

13. **Финальный отчёт:**
    - Markdown с pass/fail для каждой страницы.
    - Список рекомендаций.
    - Ссылка на validator.schema.org результаты.

## Полезные инструменты

- `https://validator.schema.org/` — JSON-LD валидация.
- `https://search.google.com/test/rich-results` — Google Rich Results test.
- `https://search.google.com/search-console/` — Google Search Console (после launch).
- `https://webmaster.yandex.ru/` — Я.Вебмастер (после launch).
- `https://www.opengraph.xyz/` — OG-tags preview.
- `https://www.linkedin.com/post-inspector/inspect/` — LinkedIn OG inspector.
- Chrome DevTools Lighthouse SEO category.

## Документы

- `.claude/agents/seo-auditor.md` — workflow
- `.claude/skills/schema-localbusiness/SKILL.md` — JSON-LD HairSalon шаблон
- `docs/ARCHITECTURE.md` — JSON-LD генераторы, sitemap, robots
- `docs/CONTENT-BRIEF.md` — meta-описания и ключи
