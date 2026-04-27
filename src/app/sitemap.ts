import { MetadataRoute } from "next";

import { ARTICLES } from "@/data/articles";
import { BARBERS } from "@/data/barbers";

const BASE = "https://basepremier.ru";

export default function sitemap(): MetadataRoute.Sitemap {
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
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${BASE}/contacts`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${BASE}/quiz`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    {
      url: `${BASE}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const barberRoutes: MetadataRoute.Sitemap = BARBERS.map((b) => ({
    url: `${BASE}/barbers/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${BASE}/journal/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...barberRoutes, ...articleRoutes];
}
