import { SERVICE_CATEGORIES, ServiceCategory } from "@/data/services";
import { formatDuration, formatPrice, formatPriceRange } from "@/lib/format";

const SITE_URL = "https://basepremier.ru";

export function hairSalonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: "BASE Premier",
    url: SITE_URL,
    telephone: "+79179183877",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Шаляпина, 26",
      addressLocality: "Казань",
      addressRegion: "Республика Татарстан",
      addressCountry: "RU",
    },
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
