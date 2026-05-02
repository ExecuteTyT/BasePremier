#!/usr/bin/env node
/**
 * Mobile audit: screenshots + diagnostics at 375 / 414 px
 * Usage:
 *   CHROMIUM_PATH=/path/to/chrome BASE=https://example.com node scripts/mobile-audit.mjs audit/mobile-audit/before
 */
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const BASE = process.env.BASE ?? "http://localhost:3000";
const OUT = process.argv[2] ?? "audit/mobile-audit";
const CHROMIUM_PATH = process.env.CHROMIUM_PATH;

const VIEWPORTS = [
  { width: 375, height: 812, label: "375" },
  { width: 414, height: 896, label: "414" },
];

const ROUTES = [
  { path: "/", label: "home" },
  { path: "/services", label: "services" },
  { path: "/barbers", label: "barbers" },
  { path: "/about", label: "about" },
];

mkdirSync(OUT, { recursive: true });

async function diagnose(page) {
  // Use IIFE so page.evaluate() executes the function and returns its result,
  // not the function string itself.
  return page.evaluate(`(function () {
    var viewW = window.innerWidth;

    // Horizontal overflow: any element wider than the viewport
    var overflowing = [];
    document.querySelectorAll('*').forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.right > viewW + 2) {
        overflowing.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || '').toString().slice(0, 80),
          right: Math.round(rect.right),
          viewW: viewW,
        });
      }
    });

    // Small tap targets: interactive elements < 44px in either dimension
    var smallTaps = [];
    document.querySelectorAll('a, button, [role="button"]').forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if ((rect.width < 44 || rect.height < 44) && rect.width > 0) {
        smallTaps.push({
          tag: el.tagName.toLowerCase(),
          text: (el.textContent || '').trim().slice(0, 40),
          w: Math.round(rect.width),
          h: Math.round(rect.height),
        });
      }
    });

    // Clipped text: elements where scrollHeight > clientHeight (hidden overflow)
    var clipped = [];
    document.querySelectorAll('p, h1, h2, h3, h4, span, div').forEach(function (el) {
      var style = window.getComputedStyle(el);
      if (
        (style.overflow === 'hidden' || style.overflowY === 'hidden') &&
        el.scrollHeight > el.clientHeight + 2 &&
        el.clientHeight > 0
      ) {
        clipped.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || '').toString().slice(0, 80),
          clientH: el.clientHeight,
          scrollH: el.scrollHeight,
        });
      }
    });

    return { horizontalOverflow: overflowing, smallTaps: smallTaps, clipped: clipped };
  })()`);
}

const launchOpts = CHROMIUM_PATH
  ? { executablePath: CHROMIUM_PATH, args: ["--no-sandbox"] }
  : { args: ["--no-sandbox"] };

const browser = await chromium.launch(launchOpts);

const report = {};

for (const vp of VIEWPORTS) {
  report[vp.label] = {};
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
    userAgent:
      "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36",
  });
  const page = await context.newPage();

  for (const route of ROUTES) {
    const url = `${BASE}${route.path}`;
    console.log(`[${vp.label}px] ${url}`);
    await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
    await page.waitForTimeout(800);

    const screenshotPath = join(OUT, `${route.label}-${vp.label}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`  → ${screenshotPath}`);

    const diag = await diagnose(page);
    report[vp.label][route.label] = {
      url,
      ...diag,
      overflowCount: diag.horizontalOverflow.length,
      smallTapCount: diag.smallTaps.length,
      clippedCount: diag.clipped.length,
    };

    if (diag.horizontalOverflow.length) {
      console.log(
        `  ⚠ overflow (${diag.horizontalOverflow.length}):`,
        diag.horizontalOverflow.slice(0, 3),
      );
    }
    if (diag.smallTaps.length) {
      console.log(`  ⚠ small taps (${diag.smallTaps.length}):`, diag.smallTaps.slice(0, 5));
    }
    if (diag.clipped.length) {
      console.log(`  ⚠ clipped (${diag.clipped.length}):`, diag.clipped.slice(0, 3));
    }
  }

  await context.close();
}

await browser.close();

const reportPath = join(OUT, "report.json");
writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\nReport written to ${reportPath}`);
