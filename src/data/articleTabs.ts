import { ARTICLES, ArticleCategory } from "@/data/articles";

export const ARTICLE_CATEGORY_ALL = "all" as const;

export const ARTICLE_TABS: { id: ArticleCategory; label: string; count: number }[] = [
  { id: "guide", label: "Гид", count: ARTICLES.filter((a) => a.category === "guide").length },
  { id: "care", label: "Уход", count: ARTICLES.filter((a) => a.category === "care").length },
  { id: "price", label: "Цена", count: ARTICLES.filter((a) => a.category === "price").length },
  {
    id: "lifestyle",
    label: "Лайфстайл",
    count: ARTICLES.filter((a) => a.category === "lifestyle").length,
  },
];
