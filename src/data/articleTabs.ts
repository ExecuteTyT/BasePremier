import type { ArticleCategory } from "./articles";

export const ARTICLE_CATEGORY_ALL = "all" as const;

export const ARTICLE_TAB_DEFS: { id: ArticleCategory; label: string }[] = [
  { id: "guide", label: "Гид" },
  { id: "care", label: "Уход" },
  { id: "price", label: "Цена" },
  { id: "lifestyle", label: "Лайфстайл" },
];
