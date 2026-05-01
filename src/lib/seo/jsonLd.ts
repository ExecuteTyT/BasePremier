import { Service, SERVICE_CATEGORIES, ServiceCategory } from "@/data/services";
import { formatDuration, formatPrice, formatPriceRange } from "@/lib/format";

const SITE_URL = "https://basepremier.ru";

export function hairSalonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: "BASE Premier",
    url: SITE_URL,
    telephone: "+79179183877",
    image: `${SITE_URL}/images/og-default.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Шаляпина, 26",
      addressLocality: "Казань",
      addressRegion: "Республика Татарстан",
      postalCode: "420015",
      addressCountry: "RU",
    },
    // geo: pending Q1 (GPS coordinates from client)
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "21:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "394",
      bestRating: "5",
      worstRating: "1",
    },
    priceRange: "₽₽",
    currenciesAccepted: "RUB",
    paymentAccepted: "Cash, Credit Card",
    sameAs: [
      "https://www.instagram.com/basepremier/",
      "https://yandex.ru/maps/org/base_premier/236063126987/",
    ],
  };
}

export function serviceListJsonLd(categories: ServiceCategory[] = SERVICE_CATEGORIES) {
  const items = categories.flatMap((cat) =>
    cat.services.map((svc, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: svc.name,
        provider: { "@type": "HairSalon", name: "BASE Premier" },
        offers: {
          "@type": "Offer",
          priceCurrency: "RUB",
          price: Array.isArray(svc.price) ? svc.price[0] : svc.price,
          priceSpecification: Array.isArray(svc.price)
            ? {
                "@type": "PriceSpecification",
                minPrice: svc.price[0],
                maxPrice: svc.price[1],
                priceCurrency: "RUB",
              }
            : undefined,
        },
        description: `${svc.name} — ${
          Array.isArray(svc.price)
            ? formatPriceRange(svc.price[0], svc.price[1])
            : formatPrice(svc.price)
        }, ${formatDuration(svc.duration)}`,
      },
    })),
  );

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Услуги барбершопа BASE Premier",
    numberOfItems: items.length,
    itemListElement: items,
  };
}

export function personJsonLd(barber: {
  slug: string;
  name: string;
  role: string;
  reviews: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: barber.name,
    jobTitle: barber.role,
    worksFor: {
      "@type": "HairSalon",
      name: "BASE Premier",
      url: SITE_URL,
    },
    url: `${SITE_URL}/barbers/${barber.slug}`,
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/ReviewAction",
      userInteractionCount: barber.reviews,
    },
  };
}

export function faqPageJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function articleJsonLd(article: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateModified?: string;
  readMinutes: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.dateModified ?? article.date,
    author: {
      "@type": "Organization",
      name: "BASE Premier",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "BASE Premier",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/og-default.jpg`,
      },
    },
    url: `${SITE_URL}/journal/${article.slug}`,
    image: `${SITE_URL}/images/og-default.jpg`,
    timeRequired: `PT${article.readMinutes}M`,
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BASE Premier",
    url: SITE_URL,
    description: "Премиальный барбершоп в Казани. Мужские стрижки, уход, маникюр.",
    inLanguage: "ru-RU",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/services?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function serviceDetailJsonLd(service: Service, description: string) {
  const minPrice = Array.isArray(service.price) ? service.price[0] : service.price;
  const maxPrice = Array.isArray(service.price) ? service.price[1] : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description,
    provider: {
      "@type": "HairSalon",
      name: "BASE Premier",
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Шаляпина, 26",
        addressLocality: "Казань",
        addressCountry: "RU",
      },
    },
    areaServed: { "@type": "City", name: "Казань" },
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: minPrice,
      ...(maxPrice
        ? {
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice,
              maxPrice,
              priceCurrency: "RUB",
            },
          }
        : {}),
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
