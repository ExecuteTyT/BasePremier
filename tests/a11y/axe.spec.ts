import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Accessibility suite — chromium only.
 * Zero axe-core violations on all key pages (WCAG 2.1 AA).
 */

const PAGES_TO_AUDIT = [
  "/",
  "/services",
  "/barbers",
  "/barbers/marat",
  "/about",
  "/journal",
  "/journal/kak-vybrat-strizhku-pod-formu-litsa",
  "/quiz",
  "/privacy",
] as const;

for (const path of PAGES_TO_AUDIT) {
  test(`${path} — zero axe violations`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    if (results.violations.length > 0) {
      const summary = results.violations
        .map(
          (v) =>
            `[${v.impact}] ${v.id}: ${v.description}\n  Nodes: ${v.nodes.map((n) => n.target).join(", ")}`,
        )
        .join("\n\n");
      console.error(`Axe violations on ${path}:\n${summary}`);
    }

    expect(results.violations).toHaveLength(0);
  });
}

/**
 * /contacts — Yandex Maps iframe is third-party and contains images without
 * alt text and links without discernible text (map tile controls). We cannot
 * fix those. Exclude the iframe subtree and audit the rest of the page.
 */
test("/contacts — zero axe violations (excluding Yandex Maps iframe)", async ({ page }) => {
  await page.goto("/contacts");
  await page.waitForLoadState("networkidle");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    // Yandex Maps widget iframe contains inaccessible map tile images and
    // icon-only links that we cannot fix. Exclude the iframe subtree.
    .exclude("iframe")
    .analyze();

  if (results.violations.length > 0) {
    const summary = results.violations
      .map(
        (v) =>
          `[${v.impact}] ${v.id}: ${v.description}\n  Nodes: ${v.nodes.map((n) => n.target).join(", ")}`,
      )
      .join("\n\n");
    console.error(`Axe violations on /contacts:\n${summary}`);
  }

  expect(results.violations).toHaveLength(0);
});

test("homepage — no critical or serious violations at minimum", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();

  const criticalOrSerious = results.violations.filter((v) =>
    ["critical", "serious"].includes(v.impact ?? ""),
  );

  if (criticalOrSerious.length > 0) {
    const msg = criticalOrSerious.map((v) => `${v.id}: ${v.description}`).join("\n");
    throw new Error(`Critical/serious a11y violations:\n${msg}`);
  }
});
