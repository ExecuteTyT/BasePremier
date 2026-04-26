---
name: schema-localbusiness
description: Use when generating, updating, or validating JSON-LD structured data for BASE Premier — HairSalon, Service, Person, Article, FAQPage, BreadcrumbList. Uses real business data from CLIENT-ANSWERS.md.
---

# Skill: Schema.org JSON-LD for BASE Premier

Generate type-safe, valid JSON-LD using real business data.

## Source of truth

All business data comes from @docs/CLIENT-ANSWERS.md §4. **Never hardcode values that already exist in the project — import them.**

## Schema 1 — HairSalon (главная и /contacts)

```ts
// src/lib/schema.ts
import type { WithContext, HairSalon } from 'schema-dts'

export function getHairSalonSchema(): WithContext<HairSalon> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    '@id': 'https://basepremier.ru/#shalyapina',
    name: 'BASE Premier',
    alternateName: ['База Премьер', 'base premier'],
    description:
      'Премиальный мужской груминг и ногтевой сервис в Казани. Стрижки от 1 800 ₽, опасное бритьё, уход за бородой, мужской маникюр.',
    image: [
      'https://basepremier.ru/og-default.jpg',
      'https://basepremier.ru/og-square.jpg',
      'https://basepremier.ru/og-wide.jpg',
    ],
    logo: 'https://basepremier.ru/logo-bp.png',
    url: 'https://basepremier.ru',
    telephone: '+7-917-918-38-77',
    priceRange: '₽₽₽',

    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Шаляпина, 26',
      addressLocality: 'Казань',
      addressRegion: 'Республика Татарстан',
      postalCode: '420015', // TODO уточнить
      addressCountry: 'RU',
    },

    geo: {
      '@type': 'GeoCoordinates',
      latitude: 55.79, // TODO уточнить точные
      longitude: 49.13,
    },

    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday',
          'Friday', 'Saturday', 'Sunday',
        ],
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
      'https://www.instagram.com/basepremier',
      // TODO add: VK, Telegram, etc.
    ],

    paymentAccepted: ['Cash', 'CreditCard'],
    currenciesAccepted: 'RUB',

    hasMap: 'https://yandex.ru/maps/-/CDoeQK-0', // TODO заменить на реальный share-link
  }
}
```

Embedding in the page:

```tsx
// src/app/(marketing)/page.tsx
import { getHairSalonSchema } from '@/lib/schema'

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getHairSalonSchema()) }}
      />
      {/* page content */}
    </>
  )
}
```

## Schema 2 — Service

```ts
import type { WithContext, Service } from 'schema-dts'

export function getServiceSchema(service: {
  title: string
  slug: string
  shortDescription: string
  priceMin: number
  priceMax?: number
  durationMinutes: number
  category: string
}): WithContext<Service> {
  const priceRange = service.priceMax
    ? `${service.priceMin}-${service.priceMax}`
    : `${service.priceMin}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://basepremier.ru/services/${service.slug}#service`,
    name: service.title,
    description: service.shortDescription,
    serviceType: service.category,
    provider: {
      '@type': 'HairSalon',
      '@id': 'https://basepremier.ru/#shalyapina',
    },
    areaServed: {
      '@type': 'City',
      name: 'Казань',
    },
    offers: {
      '@type': 'Offer',
      price: priceRange,
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
    },
  }
}
```

## Schema 3 — Person (мастер)

```ts
import type { WithContext, Person } from 'schema-dts'

export function getMasterSchema(master: {
  name: string
  slug: string
  role: string
  experienceYears?: number
  photoUrl: string
  reviewsCount: number
}): WithContext<Person> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `https://basepremier.ru/barbers/${master.slug}#person`,
    name: master.name,
    jobTitle: master.role,
    image: master.photoUrl,
    worksFor: {
      '@type': 'HairSalon',
      '@id': 'https://basepremier.ru/#shalyapina',
    },
    knowsAbout: ['Мужские стрижки', 'Уход за бородой', 'Барберинг'],
    ...(master.experienceYears && {
      hasOccupation: {
        '@type': 'Occupation',
        name: master.role,
        experienceRequirements: `${master.experienceYears}+ лет`,
      },
    }),
  }
}
```

## Schema 4 — Article (блог)

```ts
import type { WithContext, Article } from 'schema-dts'

export function getArticleSchema(article: {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  modifiedAt?: string
  author: string
  heroImageUrl: string
  category: string
}): WithContext<Article> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.heroImageUrl,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt ?? article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'BASE Premier',
      logo: {
        '@type': 'ImageObject',
        url: 'https://basepremier.ru/logo-bp.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://basepremier.ru/journal/${article.slug}`,
    },
    articleSection: article.category,
  }
}
```

## Schema 5 — FAQPage

```ts
import type { WithContext, FAQPage } from 'schema-dts'

export function getFAQPageSchema(items: { question: string; answer: string }[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
```

## Schema 6 — BreadcrumbList

```ts
import type { WithContext, BreadcrumbList } from 'schema-dts'

export function getBreadcrumbSchema(items: { name: string; url: string }[]): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
```

## Best practices

1. **One source of truth for business data** — все NAP (Name, Address, Phone) из @docs/CLIENT-ANSWERS.md
2. **Use `schema-dts` types** — TypeScript catches schema errors at compile time
3. **Validate every schema** before deploy:
   - https://validator.schema.org/
   - https://search.google.com/test/rich-results
4. **Combine multiple schemas** in one page via `@graph`:
   ```ts
   const schemas = [getHairSalonSchema(), getBreadcrumbSchema(...)]
   <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@graph': schemas })}</script>
   ```

## Page → Schema mapping

| Page | Schemas |
|---|---|
| `/` | HairSalon + WebSite + AggregateRating |
| `/services` | BreadcrumbList + ItemList + FAQPage |
| `/services/[slug]` | BreadcrumbList + Service + Offer |
| `/barbers` | BreadcrumbList + ItemList |
| `/barbers/[slug]` | BreadcrumbList + Person |
| `/about` | BreadcrumbList + AboutPage + Organization |
| `/journal` | BreadcrumbList + Blog |
| `/journal/[slug]` | BreadcrumbList + Article + Person (author) |
| `/contacts` | BreadcrumbList + ContactPage + HairSalon |
| `/quiz` | BreadcrumbList |

## Common pitfalls

- ❌ Hardcoding test/dev URL in `@id` (must be production)
- ❌ Missing `addressCountry` (Yandex requires)
- ❌ Inventing `aggregateRating` (only use real Я.Карты data)
- ❌ Mixing JSON-LD with Microdata on same element (pick one)
- ❌ Using `Organization` instead of `HairSalon` (less specific = worse SEO)

## Validation checklist

Before each release:
- [ ] All schemas pass schema.org validator
- [ ] All schemas pass Google Rich Results Test
- [ ] Yandex.Webmaster shows valid микроразметка
- [ ] No 404s in image URLs from schemas
- [ ] Coordinates match Я.Карты location
- [ ] Phone format is `+7-XXX-XXX-XX-XX` (with hyphens, country code)
