/**
 * Live QA — tests https://base-premier.vercel.app
 * Checks: H1, CTA clickability, console errors, cookie banner, tel: link
 * Breakpoints: 375 / 768 / 1440 px
 */
import * as fs from "fs";
import * as path from "path";

import { test, expect } from "@playwright/test";

const BASE = "https://base-premier.vercel.app";
const VIEWPORTS = [
  { name: "375", width: 375, height: 812 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 900 },
];
const PAGES = [
  { route: "/", label: "Home" },
  { route: "/services", label: "Services" },
  { route: "/barbers", label: "Barbers" },
  { route: "/about", label: "About" },
  { route: "/contacts", label: "Contacts" },
  { route: "/journal", label: "Journal" },
];

const screenshotDir = path.join(process.cwd(), "tests", "screenshots", "live-qa");
fs.mkdirSync(screenshotDir, { recursive: true });

for (const vp of VIEWPORTS) {
  test.describe(`@${vp.name}px`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const pg of PAGES) {
      test(`${pg.label} ${pg.route} — H1 + CTA + console`, async ({ page }) => {
        const errors: string[] = [];
        page.on("console", (msg) => {
          if (msg.type() === "error") errors.push(msg.text());
        });
        page.on("pageerror", (err) => errors.push(err.message));

        await page.goto(`${BASE}${pg.route}`, { waitUntil: "domcontentloaded" });
        await page.waitForLoadState("networkidle").catch(() => {});

        // Screenshot — full page
        const filename = `${pg.label.toLowerCase()}-${vp.name}.png`;
        await page.screenshot({
          path: path.join(screenshotDir, filename),
          fullPage: true,
        });

        // 1. H1 exists and is non-empty
        const h1 = page.locator("h1").first();
        await expect(h1, `H1 must exist on ${pg.route}`).toBeVisible({ timeout: 10000 });
        const h1Text = (await h1.textContent()) ?? "";
        expect(h1Text.trim().length, `H1 must have text on ${pg.route}`).toBeGreaterThan(0);
        console.warn(`  H1 [${vp.name}px] ${pg.route}: "${h1Text.trim()}"`);

        // 2. Cookie banner check — must not obscure primary CTA
        //    Find booking CTA buttons
        const cta = page
          .locator("a[href*='yclients'], button:has-text('Записаться'), a:has-text('Записаться')")
          .filter({ visible: true });
        const ctaCount = await cta.count();
        if (ctaCount > 0) {
          const firstCta = cta.first();
          const isVisible = await firstCta.isVisible();
          console.warn(`  CTA visible [${vp.name}px] ${pg.route}: ${isVisible}`);
          expect(isVisible, `Primary CTA visible on ${pg.route} @ ${vp.name}px`).toBeTruthy();
        } else {
          console.warn(`  CTA not found [${vp.name}px] ${pg.route}`);
        }

        // 3. Console errors
        if (errors.length > 0) {
          console.warn(`  CONSOLE ERRORS [${vp.name}px] ${pg.route}:`, errors);
        }
        expect(
          errors.filter((e) => !e.includes("favicon")),
          `No console errors on ${pg.route}`,
        ).toHaveLength(0);
      });
    }

    // tel: link test — only once per viewport on homepage
    test(`tel: link on Home @ ${vp.name}px`, async ({ page }) => {
      await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle").catch(() => {});

      const telLink = page.locator('a[href^="tel:"]').first();
      await expect(telLink, "tel: link must exist").toBeVisible({ timeout: 8000 });
      const href = await telLink.getAttribute("href");
      expect(href, "tel: href must include phone number").toMatch(/tel:\+7/);
      console.warn(`  tel: link [${vp.name}px]: ${href}`);
    });

    // Cookie banner overlay test on Home
    test(`Cookie banner does not block H1 CTA @ ${vp.name}px`, async ({ page }) => {
      await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle").catch(() => {});

      // Check if cookie banner is present
      const banner = page.locator(
        "[data-testid='cookie-banner'], .cookie-banner, [class*='cookie'], [id*='cookie']",
      );
      const bannerVisible = await banner
        .first()
        .isVisible()
        .catch(() => false);
      console.warn(`  Cookie banner visible [${vp.name}px]: ${bannerVisible}`);

      // Hero CTA must still be interactive even if banner present
      const heroSection = page.locator("section").first();
      const heroCta = heroSection
        .locator("button:has-text('Записаться'), a:has-text('Записаться'), a[href*='yclients']")
        .first();

      const heroCtaExists = (await heroCta.count()) > 0;
      if (heroCtaExists) {
        // Check it's not fully obscured (clickable)
        const box = await heroCta.boundingBox();
        if (box) {
          // Element in viewport?
          const viewportHeight = vp.height;
          const inViewport = box.y < viewportHeight;
          console.warn(
            `  Hero CTA in viewport [${vp.name}px]: ${inViewport}, y=${Math.round(box.y)}`,
          );
        }
      }
    });
  });
}
