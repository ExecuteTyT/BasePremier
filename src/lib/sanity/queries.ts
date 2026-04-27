import { sanityClient } from "./client";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SanityBarber = {
  _id: string;
  name: string;
  slug: { current: string };
  role: string;
  reviews: number;
  photo?: { asset: { _ref: string }; hotspot?: object };
  quote?: string;
  bio?: string;
  techniques?: string[];
  tags?: string[];
  isBestEmployee?: boolean;
  isSenior?: boolean;
  order?: number;
};

export type SanityArticle = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: "guide" | "care" | "price" | "lifestyle";
  cover?: { asset: { _ref: string }; hotspot?: object };
  content?: unknown[];
  publishedAt: string;
  readMinutes: number;
};

export type SanityService = {
  _id: string;
  name: string;
  category: "barbershop" | "combo" | "nails";
  duration: number;
  priceFrom: number;
  priceTo?: number;
  priceFrom_flag?: boolean;
  note?: string;
  order?: number;
};

export type SanitySiteSettings = {
  phone: string;
  address: string;
  hours: string;
  rating: number;
  reviewCount: number;
  telegramLink?: string;
  whatsappLink?: string;
  instagramLink?: string;
};

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function getAllBarbers(): Promise<SanityBarber[]> {
  return sanityClient.fetch(
    `*[_type == "barber"] | order(order asc, reviews desc) {
      _id, name, slug, role, reviews, photo, quote, bio, techniques, tags,
      isBestEmployee, isSenior, order
    }`,
  );
}

export async function getBarberBySlug(slug: string): Promise<SanityBarber | null> {
  return sanityClient.fetch(
    `*[_type == "barber" && slug.current == $slug][0] {
      _id, name, slug, role, reviews, photo, quote, bio, techniques, tags,
      isBestEmployee, isSenior
    }`,
    { slug },
  );
}

export async function getAllArticles(): Promise<SanityArticle[]> {
  return sanityClient.fetch(
    `*[_type == "article"] | order(publishedAt desc) {
      _id, title, slug, excerpt, category, cover, publishedAt, readMinutes
    }`,
  );
}

export async function getArticleBySlug(slug: string): Promise<SanityArticle | null> {
  return sanityClient.fetch(
    `*[_type == "article" && slug.current == $slug][0] {
      _id, title, slug, excerpt, category, cover, content, publishedAt, readMinutes
    }`,
    { slug },
  );
}

export async function getRelatedArticles(slug: string, category: string): Promise<SanityArticle[]> {
  return sanityClient.fetch(
    `*[_type == "article" && slug.current != $slug && category == $category] | order(publishedAt desc)[0...2] {
      _id, title, slug, excerpt, category, cover, publishedAt, readMinutes
    }`,
    { slug, category },
  );
}

export async function getAllServices(): Promise<SanityService[]> {
  return sanityClient.fetch(
    `*[_type == "service"] | order(category asc, order asc) {
      _id, name, category, duration, priceFrom, priceTo, priceFrom_flag, note, order
    }`,
  );
}

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0] {
      phone, address, hours, rating, reviewCount,
      telegramLink, whatsappLink, instagramLink
    }`,
  );
}
