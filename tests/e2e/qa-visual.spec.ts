import fs from "fs";
import path from "path";

import { expect, test } from "@playwright/test";

/**
 * QA visual + functional checklist — chromium only.
 *
 * Checklist:
 *  [1] Screenshots at 375 / 768 / 1440px on all key pages
 *  [2] Cookie banner: appears, can be accepted/rejected, does NOT block hero CTA
 *  [3] Cookie banner vs StickyCTA z-index: cookie banner buttons are reachable
 *      when both are on screen simultaneously
 *  [4] Booking buttons ([data-yclients-open]) open new window (WhatsApp fallback)
 *  [5] Tel: links are clickable in header, footer, and sticky CTA pill
 *  [6] Internal links return 200 (no dead nav links)
 *  [7] External links carry rel="noopener" (security baseline)
 */

// ─── helpers ──────────────────────────────────────────────────────────────────

const REPORTS_DIR = path.join(process.cwd(), "reports", "screenshots");

const KEY_PAGES = [
  "/",
  "/services",
  "/barbers",
  "/about",
  "/contacts",
  "/journal",
  "/quiz",
  "/privacy",
] as const;

const INTERNAL_NAV_HREFS = [
  "/services",
  "/barbers",
  "/about",
  "/journal",
  "/contacts",
  "/privacy",
] as const;

/** Clear localStorage so cookie banner always shows (fresh visit simulation). */
async function clearStorage(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    localStorage.removeItem("bp:cookies");
  });
}

// ─── [1] Screenshots at 375 / 768 / 1440px ──────────────────────────────────

test.describe("[1] Breakpoint screenshots", () => {
  test.beforeAll(() => {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  });

  const VIEWPORTS = [
    { label: "mobile", width: 375, height: 812 },
    { label: "tablet", width: 768, height: 1024 },
    { label: "desktop", width: 1440, height: 900 },
  ] as const;

  for (const vp of VIEWPORTS) {
    test.describe(`${vp.width}px — ${vp.label}`, () => {
      test.use({ viewport: { width: vp.width, height: vp.height } });

      for (const pagePath of KEY_PAGES) {
        test(`screenshot: ${pagePath}`, async ({ page }) => {
          await clearStorage(page);
          const consoleErrors: string[] = [];
          page.on("console", (msg) => {
            if (msg.type() === "error") {
              const text = msg.text();
              // Filter known non-app noise
              if (
                text.toLowerCase().includes("favicon") ||
                text.toLowerCase().includes("sentry") ||
                text.toLowerCase().includes("net::err") ||
                text.toLowerCase().includes("failed to load resource")
              )
                return;
              consoleErrors.push(text);
            }
          });

          const response = await page.goto(pagePath, { waitUntil: "domcontentloaded" });
          expect(response?.status(), `${pagePath} @ ${vp.width}px should return 200`).toBe(200);

          // Wait for fonts + images to settle
          await page.waitForLoadState("networkidle").catch(() => {
            // networkidle can timeout on pages with long-poll resources — that's OK
          });

          // Save screenshot for human review; path incorporates breakpoint
          const slug = pagePath.replace(/\//g, "_").replace(/^_/, "") || "home";
          await page.screenshot({
            path: path.join(REPORTS_DIR, `${vp.label}_${slug}.png`),
            fullPage: true,
          });

          expect(
            consoleErrors,
            `Console errors @ ${pagePath} on ${vp.width}px`,
          ).toHaveLength(0);
        });
      }
    });
  }
});

// ─── [2] Cookie banner ────────────────────────────────────────────────────────

test.describe("[2] Cookie banner", () => {
  test("banner appears after ~1.5 s on fresh visit", async ({ page }) => {
    await clearStorage(page);
    await page.goto("/");

    // Banner is hidden initially (translate-y-full) — not yet visible
    const banner = page.getByRole("dialog", { name: "Уведомление о cookie" });
    // Wait up to 4s for it to slide in
    await expect(banner).not.toHaveAttribute("aria-hidden", "true", { timeout: 4000 });
  });

  test("«Принять все» dismisses the banner", async ({ page }) => {
    await clearStorage(page);
    await page.goto("/");

    const banner = page.getByRole("dialog", { name: "Уведомление о cookie" });
    await expect(banner).not.toHaveAttribute("aria-hidden", "true", { timeout: 4000 });

    await page.getByRole("button", { name: "Принять все" }).click();

    // After dismiss, banner slides back down (aria-hidden=true)
    await expect(banner).toHaveAttribute("aria-hidden", "true", { timeout: 3000 });
  });

  test("«Только необходимые» dismisses the banner", async ({ page }) => {
    await clearStorage(page);
    await page.goto("/");

    const banner = page.getByRole("dialog", { name: "Уведомление о cookie" });
    await expect(banner).not.toHaveAttribute("aria-hidden", "true", { timeout: 4000 });

    await page.getByRole("button", { name: "Только необходимые" }).click();
    await expect(banner).toHaveAttribute("aria-hidden", "true", { timeout: 3000 });
  });

  test("banner does NOT appear on second visit (localStorage persisted)", async ({ page }) => {
    // First visit — accept
    await clearStorage(page);
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: "Уведомление о cookie" });
    await expect(banner).not.toHaveAttribute("aria-hidden", "true", { timeout: 4000 });
    await page.getByRole("button", { name: "Принять все" }).click();
    await expect(banner).toHaveAttribute("aria-hidden", "true", { timeout: 3000 });

    // Second visit — same context (localStorage persists across goto)
    await page.goto("/");
    // Banner should stay hidden — no timer fires when key is already set
    await page.waitForTimeout(2500);
    await expect(banner).toHaveAttribute("aria-hidden", "true");
  });

  test("hero CTA button is not obscured by cookie banner", async ({ page }) => {
    await clearStorage(page);
    await page.goto("/");

    // Wait for cookie banner to appear
    const banner = page.getByRole("dialog", { name: "Уведомление о cookie" });
    await expect(banner).not.toHaveAttribute("aria-hidden", "true", { timeout: 4000 });

    // Hero CTA button — first [data-yclients-open] in the hero section
    const heroCta = page.locator("section").first().locator("[data-yclients-open]").first();
    await expect(heroCta).toBeVisible();

    // Check that the hero CTA is not behind the cookie banner.
    // Both are in the visible viewport; hero CTA should be clickable.
    const ctaBox = await heroCta.boundingBox();
    const bannerBox = await banner.boundingBox();

    expect(ctaBox, "Hero CTA has no bounding box").not.toBeNull();
    expect(bannerBox, "Cookie banner has no bounding box").not.toBeNull();

    // Hero CTA bottom edge should be ABOVE the cookie banner top edge.
    // (Cookie banner is fixed bottom; hero CTA is in the viewport top area.)
    const ctaBottom = ctaBox!.y + ctaBox!.height;
    const bannerTop = bannerBox!.y;
    expect(
      ctaBottom,
      `Hero CTA bottom (${ctaBottom}px) overlaps cookie banner top (${bannerTop}px)`,
    ).toBeLessThan(bannerTop);
  });
});

// ─── [3] Cookie banner vs StickyCTA z-index ──────────────────────────────────

test.describe("[3] Cookie banner vs StickyCTA — no overlap blockage", () => {
  // Mobile viewport: both sticky CTA and cookie banner anchor at bottom-0
  test.use({ viewport: { width: 375, height: 812 } });

  test("cookie banner «Принять все» button is interactable when StickyCTA is active", async ({
    page,
  }) => {
    await clearStorage(page);
    await page.goto("/");

    // Trigger StickyCTA by scrolling past 600px
    await page.evaluate(() => {
      window.scrollTo({ top: 700, behavior: "instant" });
      window.dispatchEvent(new Event("scroll"));
    });
    // Give GSAP animation time to complete
    await page.waitForTimeout(600);

    // Wait for cookie banner
    const banner = page.getByRole("dialog", { name: "Уведомление о cookie" });
    await expect(banner).not.toHaveAttribute("aria-hidden", "true", { timeout: 4000 });

    // «Принять все» must be interactable — if StickyCTA (z-[100]) sits on top
    // of the cookie banner (z-50) at the same bottom-0 anchor, this click will fail.
    const acceptBtn = page.getByRole("button", { name: "Принять все" });
    await expect(acceptBtn).toBeVisible();

    // Verify it's actually clickable (not obscured by sticky CTA)
    await acceptBtn.click({ timeout: 5000 });
    await expect(banner).toHaveAttribute("aria-hidden", "true", { timeout: 3000 });
  });
});

// ─── [4] Booking buttons ──────────────────────────────────────────────────────

test.describe("[4] Booking buttons — [data-yclients-open]", () => {
  test("hero CTA opens new tab (WhatsApp fallback)", async ({ page, context }) => {
    await page.goto("/");

    const heroCta = page.locator("section").first().locator("[data-yclients-open]").first();
    await expect(heroCta).toBeVisible();

    // Expect a new page/popup to open on click
    const [newPage] = await Promise.all([
      context.waitForEvent("page", { timeout: 5000 }),
      heroCta.click(),
    ]);

    // New tab should open WhatsApp (wa.me) booking link
    await newPage.waitForLoadState("domcontentloaded").catch(() => {});
    expect(newPage.url()).toMatch(/wa\.me|whatsapp/i);
  });

  test("footer CtaFinalSection booking button triggers new tab", async ({ page, context }) => {
    await page.goto("/");

    // CtaFinalSection has button with aria-label="Записаться онлайн" (RSC-rendered)
    const footerCta = page.getByRole("button", { name: "Записаться онлайн" }).first();
    await expect(footerCta).toBeVisible();

    const [newPage] = await Promise.all([
      context.waitForEvent("page", { timeout: 5000 }),
      footerCta.click(),
    ]);
    await newPage.waitForLoadState("domcontentloaded").catch(() => {});
    expect(newPage.url()).toMatch(/wa\.me|whatsapp/i);
  });

  test("header «Записаться» button triggers new tab", async ({ page, context }) => {
    await page.goto("/");

    const headerCta = page.locator("header").getByRole("button", { name: /записаться/i });
    await expect(headerCta).toBeVisible();

    const [newPage] = await Promise.all([
      context.waitForEvent("page", { timeout: 5000 }),
      headerCta.click(),
    ]);
    await newPage.waitForLoadState("domcontentloaded").catch(() => {});
    expect(newPage.url()).toMatch(/wa\.me|whatsapp/i);
  });
});

// ─── [5] Tel: links clickability ─────────────────────────────────────────────

test.describe("[5] Phone (tel:) links", () => {
  test("header phone link has correct tel: href", async ({ page }) => {
    await page.goto("/");
    // Desktop header phone — lg:block, visible at 1440px default viewport
    const headerPhone = page.locator("header").locator('a[href^="tel:"]').first();
    await expect(headerPhone).toHaveAttribute("href", "tel:+79179183877");
  });

  test("footer phone link has correct tel: href", async ({ page }) => {
    await page.goto("/");
    const footerPhone = page.locator("footer").locator('a[href="tel:+79179183877"]');
    await expect(footerPhone).toBeVisible();
    await expect(footerPhone).toHaveAttribute("href", "tel:+79179183877");
  });

  test("sticky CTA desktop pill has phone link with tel: href", async ({ page }) => {
    await page.goto("/");
    // Scroll to activate sticky CTA desktop pill
    await page.evaluate(() => {
      window.scrollTo({ top: 700, behavior: "instant" });
      window.dispatchEvent(new Event("scroll"));
    });
    await page.waitForTimeout(500);

    // Desktop sticky CTA pill has an <a href="tel:+79179183877"> inside it
    // The pill is hidden md:hidden — only shown at md+ (default 1440px viewport)
    const stickyPhone = page
      .locator('[class*="fixed"][class*="bottom-6"]')
      .locator('a[href="tel:+79179183877"]');
    await expect(stickyPhone).toBeVisible({ timeout: 2000 });
    await expect(stickyPhone).toHaveAttribute("href", "tel:+79179183877");
  });

  test("contacts page has phone link", async ({ page }) => {
    await page.goto("/contacts");
    const contactsPhone = page.locator('a[href="tel:+79179183877"]').first();
    await expect(contactsPhone).toBeVisible();
  });
});

// ─── [6] Internal links — no dead nav links ───────────────────────────────────

test.describe("[6] Internal navigation links — all return 200", () => {
  for (const href of INTERNAL_NAV_HREFS) {
    test(`${href} returns 200`, async ({ page }) => {
      const response = await page.goto(href, { waitUntil: "domcontentloaded" });
      expect(response?.status(), `${href} should return 200`).toBe(200);
      // Page should have an h1
      await expect(page.locator("h1").first()).toBeVisible();
    });
  }

  test("barber detail page /barbers/marat returns 200", async ({ page }) => {
    const response = await page.goto("/barbers/marat", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toContainText("Марат");
  });

  test("service detail page returns 200", async ({ page }) => {
    const response = await page.goto(
      "/services/muzhskaya-strizhka",
      { waitUntil: "domcontentloaded" },
    );
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("journal article page returns 200", async ({ page }) => {
    const response = await page.goto(
      "/journal/kak-vybrat-strizhku-pod-formu-litsa",
      { waitUntil: "domcontentloaded" },
    );
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("privacy page returns 200", async ({ page }) => {
    const response = await page.goto("/privacy", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
  });

  test("sitemap.xml is served", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);
    const body = await page.content();
    expect(body).toContain("urlset");
    expect(body).toContain("basepremier.ru");
  });

  test("robots.txt is served", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.status()).toBe(200);
    const body = await page.content();
    expect(body.toLowerCase()).toContain("user-agent");
  });
});

// ─── [7] External links — rel=noopener ───────────────────────────────────────

test.describe("[7] External links — security attributes", () => {
  test("Instagram link in footer has rel=noopener", async ({ page }) => {
    await page.goto("/");
    // Footer social links — Instagram or any external social link
    const externalLinks = page.locator("footer").locator('a[target="_blank"]');
    const count = await externalLinks.count();

    if (count === 0) {
      // No external links in footer — that's acceptable (social links may be text-only)
      test.skip();
      return;
    }

    for (let i = 0; i < count; i++) {
      const link = externalLinks.nth(i);
      const rel = await link.getAttribute("rel");
      expect(
        rel,
        `External link ${i} in footer is missing rel=noopener`,
      ).toMatch(/noopener/);
    }
  });

  test("all page external links with target=_blank have rel=noopener", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Collect all external links
    const offenders = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[target="_blank"]'));
      return links
        .filter((a) => {
          const rel = a.getAttribute("rel") ?? "";
          return !rel.includes("noopener");
        })
        .map((a) => ({ href: a.getAttribute("href"), rel: a.getAttribute("rel") }));
    });

    expect(
      offenders,
      `Links with target=_blank missing rel=noopener: ${JSON.stringify(offenders)}`,
    ).toHaveLength(0);
  });
});
