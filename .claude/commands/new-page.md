---
description: Создать новую страницу проекта BASE Premier (Next.js 15 App Router) с metadata, layout и JSON-LD
argument-hint: <route-segment> [<page-type: static|dynamic>]
---

# New Page: $ARGUMENTS

Создай новую страницу для маршрута `$ARGUMENTS`. Следуй паттернам Next.js 15 App Router и стандартам BASE Premier.

## Шаги

1. **Уточни параметры:**
   - Если `$ARGUMENTS` — статичный путь типа `/about`, создай `src/app/about/page.tsx`.
   - Если динамический типа `services/[slug]`, создай `src/app/services/[slug]/page.tsx`.
   - Прочитай `docs/DESIGN-BRIEF.md` чтобы найти спеку именно этой страницы.

2. **Создай файлы:**

   ### Для статичной страницы:
   ```
   src/app/$ARGUMENTS/
   ├── page.tsx       — основная разметка
   ├── layout.tsx     — опционально (если нужны custom metadata/wrappers)
   └── opengraph-image.tsx — опционально (custom OG-image)
   ```

   ### Для динамической:
   ```
   src/app/$ARGUMENTS/
   ├── page.tsx
   ├── generateStaticParams — список всех slug'ов из Sanity
   └── opengraph-image.tsx
   ```

3. **Базовый шаблон page.tsx:**

   ```tsx
   import { Metadata } from 'next'
   import { homepageJsonLd } from '@/lib/seo/jsonLd' // или другой генератор
   
   export const metadata: Metadata = {
     title: 'Заголовок страницы',
     description: 'Краткое описание страницы (≤ 155 символов).',
     alternates: { canonical: '/$ARGUMENTS' },
     openGraph: {
       title: 'Заголовок страницы',
       description: 'Краткое описание',
       url: 'https://basepremier.ru/$ARGUMENTS',
       siteName: 'BASE Premier',
       locale: 'ru_RU',
       type: 'website',
     },
   }
   
   export default async function Page() {
     // SSG: данные из Sanity на build-time
     const data = await sanityClient.fetch(/* GROQ query */)
   
     return (
       <>
         <script
           type="application/ld+json"
           dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd()) }}
         />
         <main>
           {/* секции страницы */}
         </main>
       </>
     )
   }
   ```

4. **Для динамических страниц (`[slug]`):**

   ```tsx
   export async function generateStaticParams() {
     const slugs = await sanityClient.fetch(`*[_type == "service"]{ "slug": slug.current }`)
     return slugs.map((s: { slug: string }) => ({ slug: s.slug }))
   }
   
   export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
     const data = await sanityClient.fetch(/* GROQ */)
     return {
       title: `${data.title} | BASE Premier`,
       description: data.metaDescription,
       // ...
     }
   }
   ```

5. **JSON-LD:**
   - Используй соответствующий генератор из `src/lib/seo/jsonLd.ts`:
     - `homepageJsonLd()` для главной
     - `servicePageJsonLd(service)` для услуги
     - `personJsonLd(barber)` для профиля мастера
     - `articleJsonLd(article)` для статьи журнала
     - `breadcrumbsJsonLd(items)` для breadcrumbs
   - Если генератора ещё нет — создай его в `src/lib/seo/jsonLd.ts`.

6. **Performance budget:**
   - Найди в `docs/DESIGN-BRIEF.md` § 6 бюджет именно для этой страницы.
   - Применяй: размер изображений, lazy-загрузка третьестепенных компонентов, минимизация client-side JS.

7. **A11y:**
   - Один `<h1>` на страницу (внутри hero-секции этой страницы).
   - Иерархия H1→H2→H3 без пропусков.
   - Skip-link уже в RootLayout.

8. **Sitemap:**
   - Если статичная страница — она автоматически добавится в `/sitemap.xml` через `next-sitemap`.
   - Если динамическая — убедись, что `generateStaticParams` возвращает корректный список.

9. **Тестирование:**
   - `pnpm typecheck && pnpm lint`
   - `pnpm build` чтобы проверить SSG-сборку.
   - `pnpm test:e2e` если есть e2e-тесты для страницы.
   - Lighthouse mobile проход на dev-сервере.

10. **Финальный чек:**
    - URL открывается на dev (`http://localhost:3000/$ARGUMENTS`).
    - Title, description, OG корректные.
    - JSON-LD валидируется через `https://validator.schema.org/` (вручную или через playwright).
    - Mobile-screenshot выглядит правильно.

## Шаблоны страниц по типу

- **Статичная контентная** (`/about`, `/contacts`): SSG, контент из Sanity.
- **Список** (`/services`, `/barbers`, `/journal`): SSG с ISR (revalidate: 3600), фильтрация client-side.
- **Деталь** (`/services/[slug]`, `/barbers/[slug]`, `/journal/[slug]`): SSG через `generateStaticParams`, ISR.
- **Интерактивная** (`/quiz`, `/bp`): mostly client-side (`'use client'`).
