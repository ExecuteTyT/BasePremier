"use client";

import { motion } from "framer-motion";
import NextLink from "next/link";
import { useMemo, useState } from "react";

import { ARTICLES, ArticleCategory } from "@/data/articles";
import { ARTICLE_TABS } from "@/data/articleTabs";
import { cn } from "@/lib/cn";

const ease = [0.19, 1, 0.22, 1] as const;

type TabId = "all" | ArticleCategory;

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export function JournalGridSection() {
  const [activeTab, setActiveTab] = useState<TabId>("all");

  const filtered = useMemo(
    () => (activeTab === "all" ? ARTICLES : ARTICLES.filter((a) => a.category === activeTab)),
    [activeTab],
  );

  return (
    <div>
      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.1 }}
        role="tablist"
        aria-label="Фильтр по категории"
        className="mb-12 flex flex-wrap gap-2 md:mb-16 md:gap-3"
      >
        <button
          role="tab"
          aria-selected={activeTab === "all"}
          onClick={() => setActiveTab("all")}
          className={cn(
            "flex items-center gap-1.5 px-4 py-3 md:py-2",
            "font-mono text-[13px] uppercase tracking-[0.12em]",
            "border transition-[background-color,border-color,color] duration-base",
            activeTab === "all"
              ? "border-accent bg-accent text-accent-fg"
              : "border-border-strong bg-transparent text-fg-muted hover:border-fg-muted/40 hover:text-fg-primary",
          )}
        >
          Все <span className="opacity-50">{ARTICLES.length}</span>
        </button>

        {ARTICLE_TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id as ArticleCategory)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-3 md:py-2",
              "font-mono text-[13px] uppercase tracking-[0.12em]",
              "border transition-[background-color,border-color,color] duration-base",
              activeTab === tab.id
                ? "border-accent bg-accent text-accent-fg"
                : "border-border-strong bg-transparent text-fg-muted hover:border-fg-muted/40 hover:text-fg-primary",
            )}
          >
            {tab.label} <span className="opacity-50">{tab.count}</span>
          </button>
        ))}
      </motion.div>

      {/* Featured first two + grid of rest */}
      <div>
        {/* Top row — 2 featured cards */}
        {filtered.length > 0 && (
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            {filtered.slice(0, 2).map((article, i) => (
              <ArticleCardLarge key={article.slug} article={article} index={i} />
            ))}
          </div>
        )}

        {/* Remaining — 4-col grid */}
        {filtered.length > 2 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.slice(2).map((article, i) => (
              <ArticleCardSmall key={article.slug} article={article} index={i + 2} />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <p className="py-20 text-center font-mono text-[13px] uppercase tracking-[0.15em] text-fg-muted">
            Статей нет
          </p>
        )}
      </div>
    </div>
  );
}

type ArticleCardProps = {
  article: (typeof ARTICLES)[number];
  index: number;
};

function ArticleCardLarge({ article, index }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.6, ease, delay: index * 0.05 }}
    >
      <NextLink
        href={`/journal/${article.slug}`}
        className="group block border border-border-strong transition-[border-color] duration-base hover:border-accent"
      >
        {/* Cover placeholder */}
        <div className="aspect-[16/9] overflow-hidden bg-bg-secondary">
          <div className="flex h-full items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]">
            <span
              className="select-none font-display font-normal leading-none text-fg-muted/10"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              {article.categoryLabel[0]}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-6">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
            {article.categoryLabel}
          </p>
          <h2 className="mb-3 font-display font-normal text-[1.25rem] leading-tight text-fg-primary transition-opacity duration-base group-hover:opacity-80">
            {article.title}
          </h2>
          <p className="mb-4 line-clamp-2 font-sans text-body text-fg-muted">{article.excerpt}</p>
          <p className="font-mono text-[11px] text-fg-muted">
            {formatDate(article.date)} · {article.readMinutes} мин
          </p>
        </div>
      </NextLink>
    </motion.div>
  );
}

function ArticleCardSmall({ article, index }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.5, ease, delay: (index % 4) * 0.05 }}
    >
      <NextLink
        href={`/journal/${article.slug}`}
        className="group block border border-border-strong transition-[border-color] duration-base hover:border-accent"
      >
        {/* Cover placeholder */}
        <div className="aspect-[16/9] overflow-hidden bg-bg-secondary">
          <div className="flex h-full items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]">
            <span
              className="select-none font-display font-normal leading-none text-fg-muted/10"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              {article.categoryLabel[0]}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
            {article.categoryLabel}
          </p>
          <h2 className="mb-2 font-display font-normal text-[1rem] leading-tight text-fg-primary transition-opacity duration-base group-hover:opacity-80">
            {article.title}
          </h2>
          <p className="font-mono text-[10px] text-fg-muted">
            {formatDate(article.date)} · {article.readMinutes} мин
          </p>
        </div>
      </NextLink>
    </motion.div>
  );
}
