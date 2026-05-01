import { MetadataRoute } from "next";

import { BARBERS } from "@/data/barbers";
import { SERVICE_CATEGORIES } from "@/data/services";
import { getAllArticles } from "@/lib/sanity/queries";

const BASE = "https://basepremier.ru";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    {
      url: `${BASE}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/barbers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/about`,
      lastModified: new Date("2026-04-26"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/contacts`,
      lastModified: new Date("2026-04-26"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/quiz`,
      lastModified: new Date("2026-04-26"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_CATEGORIES.flatMap((cat) =>
    cat.services.map((svc) => ({
      url: `${BASE}/services/${svc.id}`,
      lastModified: new Date("2026-04-26"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  const barberRoutes: MetadataRoute.Sitemap = BARBERS.map((b) => ({
    url: `${BASE}/barbers/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const sanityArticles = await getAllArticles();
  const articleRoutes: MetadataRoute.Sitemap = sanityArticles.map((a) => ({
    url: `${BASE}/journal/${a.slug.current}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...barberRoutes, ...articleRoutes];
}
