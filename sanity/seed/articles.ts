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

/**
 * Parses inline **bold** and *italic* markers in a text string.
 * Matches ** before * to avoid partial matches on bold spans.
 * Keys are deterministic: `${keyPrefix}-s0`, `${keyPrefix}-s1`, …
 */
function parseInlineMarks(text: string, keyPrefix: string): PTSpan[] {
  const children: PTSpan[] = [];
  const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let lastIndex = 0;
  let spanIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      children.push({
        _type: "span",
        _key: `${keyPrefix}-s${spanIdx++}`,
        text: text.slice(lastIndex, match.index),
        marks: [],
      });
    }
    if (match[2] !== undefined) {
      // **bold**
      children.push({
        _type: "span",
        _key: `${keyPrefix}-s${spanIdx++}`,
        text: match[2],
        marks: ["strong"],
      });
    } else if (match[3] !== undefined) {
      // *italic*
      children.push({
        _type: "span",
        _key: `${keyPrefix}-s${spanIdx++}`,
        text: match[3],
        marks: ["em"],
      });
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    children.push({
      _type: "span",
      _key: `${keyPrefix}-s${spanIdx++}`,
      text: text.slice(lastIndex),
      marks: [],
    });
  }

  if (children.length === 0) {
    children.push({ _type: "span", _key: `${keyPrefix}-s0`, text, marks: [] });
  }

  return children;
}

/**
 * Converts the static markdown-ish article content to Sanity Portable Text.
 * Format: paragraphs separated by \n\n, inline **bold** and *italic* markers.
 * Standalone **heading** paragraphs are promoted to h3 blocks.
 * All _key values are deterministic (slug + position).
 */
function mdToPortableText(markdown: string, articleSlug: string): PTBlock[] {
  return markdown
    .split("\n\n")
    .filter((p) => p.trim().length > 0)
    .map((para, pIdx) => {
      const blockKey = `${articleSlug}-b${pIdx}`;

      // Detect standalone **heading** paragraph → h3 block
      const headingMatch = para.trim().match(/^\*\*([^*]+)\*\*$/);
      if (headingMatch) {
        const headingText: string = headingMatch[1] ?? "";
        return {
          _type: "block" as const,
          _key: blockKey,
          style: "h3",
          children: [
            { _type: "span", _key: `${blockKey}-s0`, text: headingText, marks: [] as string[] },
          ],
          markDefs: [] as never[],
        };
      }

      const children = parseInlineMarks(para, blockKey);
      return {
        _type: "block" as const,
        _key: blockKey,
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
      content: mdToPortableText(article.content, article.slug),
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
