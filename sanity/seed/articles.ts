/* eslint-disable import/order */
// dotenv must be configured before other imports that may read env vars
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@sanity/client";
import { ARTICLES } from "../../src/data/articles";
/* eslint-enable import/order */

type PTSpan = {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
};

type PTBlock = {
  _type: "block";
  _key: string;
  style: string;
  children: PTSpan[];
  markDefs: never[];
};

function uid(): string {
  return Math.random().toString(36).slice(2, 14);
}

/**
 * Converts the static markdown-ish article content to Sanity Portable Text.
 * Format: paragraphs separated by \n\n, inline **bold** markers.
 */
function mdToPortableText(markdown: string): PTBlock[] {
  return markdown
    .split("\n\n")
    .filter((p) => p.trim().length > 0)
    .map((para) => {
      const children: PTSpan[] = [];
      const regex = /\*\*([^*]+)\*\*/g;
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = regex.exec(para)) !== null) {
        if (match.index > lastIndex) {
          children.push({
            _type: "span",
            _key: uid(),
            text: para.slice(lastIndex, match.index),
            marks: [],
          });
        }
        children.push({
          _type: "span",
          _key: uid(),
          text: match[1],
          marks: ["strong"],
        });
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < para.length) {
        children.push({
          _type: "span",
          _key: uid(),
          text: para.slice(lastIndex),
          marks: [],
        });
      }

      if (children.length === 0) {
        children.push({ _type: "span", _key: uid(), text: para, marks: [] });
      }

      return {
        _type: "block" as const,
        _key: uid(),
        style: "normal",
        children,
        markDefs: [] as never[],
      };
    });
}

async function main() {
  const token = process.env.SANITY_TOKEN;
  if (!token) {
    throw new Error(
      "SANITY_TOKEN missing from .env.local — get a write token from sanity.io/manage",
    );
  }

  const client = createClient({
    projectId: "tfhw7732",
    dataset: "production",
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
  });

  process.stdout.write(`Seeding ${ARTICLES.length} articles to Sanity...\n`);

  for (const article of ARTICLES) {
    const doc = {
      _type: "article",
      _id: `article-${article.slug}`,
      title: article.title,
      slug: { _type: "slug", current: article.slug },
      excerpt: article.excerpt,
      category: article.category,
      content: mdToPortableText(article.content),
      publishedAt: new Date(article.date).toISOString(),
      readMinutes: article.readMinutes,
    };

    await client.createOrReplace(doc);
    process.stdout.write(`  ✓ ${article.slug}\n`);
  }

  process.stdout.write(`\nDone! ${ARTICLES.length} articles seeded.\n`);
  process.stdout.write("Open http://localhost:3333 (pnpm sanity dev) to verify in Studio.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
