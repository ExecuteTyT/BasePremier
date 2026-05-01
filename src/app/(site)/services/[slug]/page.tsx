import { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetailContent } from "@/components/sections/ServiceDetailContent";
import { SERVICE_DETAILS } from "@/data/service-details";
import { SERVICE_CATEGORIES } from "@/data/services";
import { formatDuration, formatPrice, formatPriceFrom, formatPriceRange } from "@/lib/format";
import { breadcrumbJsonLd, serviceDetailJsonLd } from "@/lib/seo/jsonLd";

export function generateStaticParams() {
  return SERVICE_CATEGORIES.flatMap((cat) => cat.services.map((svc) => ({ slug: svc.id })));
}

function findService(slug: string) {
  for (const cat of SERVICE_CATEGORIES) {
    for (const svc of cat.services) {
      if (svc.id === slug) return { service: svc, category: cat };
    }
  }
  return null;
}

function priceText(service: (typeof SERVICE_CATEGORIES)[0]["services"][0]): string {
  if (Array.isArray(service.price)) {
    return service.from
      ? formatPriceFrom(service.price[0])
      : formatPriceRange(service.price[0], service.price[1]);
  }
  return service.from ? formatPriceFrom(service.price) : formatPrice(service.price);
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = findService(slug);
  if (!found) return { title: "Услуга не найдена — BASE Premier" };

  const { service, category } = found;
  const price = priceText(service);
  const duration = formatDuration(service.duration);
  const title = `${service.name} — BASE Premier | Казань`;
  const description = `${service.name} в BASE Premier на Шаляпина 26. ${price}, ${duration}. ${category.name}. Ежедневно 10:00–21:00. Запись онлайн.`;
  const url = `https://basepremier.ru/services/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "BASE Premier",
      locale: "ru_RU",
      type: "website",
      images: [
        {
          url: "https://basepremier.ru/images/og-default.jpg",
          width: 1200,
          height: 630,
          alt: `${service.name} в барбершопе BASE Premier, Казань`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://basepremier.ru/images/og-default.jpg"],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const found = findService(slug);
  const detail = SERVICE_DETAILS[slug];

  if (!found || !detail) notFound();

  const { service, category } = found;

  const breadcrumb = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Услуги", url: "/services" },
    { name: service.name, url: `/services/${slug}` },
  ]);

  const serviceLd = serviceDetailJsonLd(service, detail.description);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <main id="main">
        <ServiceDetailContent service={service} category={category} detail={detail} />
      </main>
    </>
  );
}
