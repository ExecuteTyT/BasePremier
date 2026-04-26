---
name: lighthouse-check
description: Use when running Lighthouse audits on BASE Premier — locally, in CI, or against production. Provides commands, thresholds, and parsing of results.
---

# Skill: Lighthouse Check

Standardized procedure for running Lighthouse audits on BASE Premier.

## Quick command (local dev)

```bash
# Make sure dev server is running
pnpm dev &

# Wait for it to be ready
sleep 3

# Mobile audit (default)
pnpm exec lighthouse http://localhost:3000 \
  --output=html,json \
  --output-path=./audit/lh-home \
  --form-factor=mobile \
  --throttling-method=simulate \
  --quiet

# Desktop audit
pnpm exec lighthouse http://localhost:3000 \
  --preset=desktop \
  --output=html \
  --output-path=./audit/lh-home-desktop \
  --quiet
```

Open `./audit/lh-home.report.html` to see results.

## Production audit (recommended for real metrics)

```bash
# Production URL
LH_URL=https://basepremier.ru

pnpm exec lighthouse $LH_URL \
  --output=html,json \
  --output-path=./audit/prod-lh \
  --form-factor=mobile \
  --throttling-method=simulate \
  --only-categories=performance,accessibility,seo,best-practices
```

## Multi-page batch

```bash
# audit/run-all.sh
#!/usr/bin/env bash
set -e

URLS=(
  "http://localhost:3000"
  "http://localhost:3000/services"
  "http://localhost:3000/barbers"
  "http://localhost:3000/about"
  "http://localhost:3000/journal"
)

mkdir -p ./audit/$(date +%F)

for URL in "${URLS[@]}"; do
  SLUG=$(echo $URL | sed 's|http://localhost:3000||' | sed 's|/$||' | sed 's|^/||' | sed 's|/|_|g')
  SLUG=${SLUG:-home}
  echo "Auditing $URL → $SLUG"
  pnpm exec lighthouse $URL \
    --output=html,json \
    --output-path=./audit/$(date +%F)/${SLUG} \
    --form-factor=mobile \
    --throttling-method=simulate \
    --quiet
done

echo "Done. Results in ./audit/$(date +%F)/"
```

## Thresholds (project requirements)

| Category | Mobile | Desktop |
|---|---|---|
| Performance | ≥ 90 | ≥ 95 |
| Accessibility | ≥ 95 | ≥ 95 |
| Best Practices | ≥ 95 | ≥ 95 |
| SEO | ≥ 95 | ≥ 95 |

| Core Web Vital | Target |
|---|---|
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.1 |
| FCP | ≤ 1.5s |
| Speed Index | ≤ 3.4s |
| TBT | ≤ 200ms |

## CI integration (GitHub Actions)

Add to `.github/workflows/deploy.yml`:

```yaml
  lighthouse:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm start &
      - run: sleep 5
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/services
            http://localhost:3000/about
          configPath: '.lighthouserc.json'
          uploadArtifacts: true
          temporaryPublicStorage: true
```

`.lighthouserc.json`:

```json
{
  "ci": {
    "collect": {
      "settings": {
        "preset": "desktop"
      }
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 0.95 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["error", { "maxNumericValue": 200 }],
        "color-contrast": "error",
        "image-alt": "error",
        "html-has-lang": "error"
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

## Reading the JSON output

Quick parser script:

```ts
// scripts/parse-lighthouse.ts
import fs from 'node:fs'

const report = JSON.parse(fs.readFileSync('./audit/lh-home.report.json', 'utf-8'))

console.log('=== Lighthouse Summary ===')
console.log('Performance:    ', Math.round(report.categories.performance.score * 100))
console.log('Accessibility:  ', Math.round(report.categories.accessibility.score * 100))
console.log('Best Practices: ', Math.round(report.categories['best-practices'].score * 100))
console.log('SEO:            ', Math.round(report.categories.seo.score * 100))
console.log()
console.log('LCP: ', report.audits['largest-contentful-paint'].displayValue)
console.log('CLS: ', report.audits['cumulative-layout-shift'].displayValue)
console.log('TBT: ', report.audits['total-blocking-time'].displayValue)
console.log('FCP: ', report.audits['first-contentful-paint'].displayValue)

// Top 5 opportunities
const opportunities = Object.values(report.audits)
  .filter((a: any) => a.details?.type === 'opportunity' && a.numericValue > 0)
  .sort((a: any, b: any) => b.numericValue - a.numericValue)
  .slice(0, 5)

console.log('\n=== Top 5 Opportunities ===')
opportunities.forEach((opp: any) => {
  console.log(`- ${opp.title}: save ${opp.displayValue}`)
})
```

Run: `tsx scripts/parse-lighthouse.ts`

## When tests fail — common fixes

### LCP > 2.5s

1. **Check LCP element** in DevTools Performance panel
2. **If image:** add `priority`, ensure AVIF format, correct `sizes`, preload
3. **If text:** preload font with `<link rel="preload" as="font">`
4. **If above-fold component:** server-render it (no `'use client'` if possible)

### CLS > 0.1

1. **Find shifting elements** in DevTools Performance > Layout Shifts
2. Common culprits:
   - Images without explicit width/height → add them
   - Web fonts loaded late → use `next/font` with `adjustFontFallback`
   - Dynamic content (ads, embed) → reserve space with `min-height`
   - 3D canvas mount → wrap in fixed-size container

### TBT > 200ms

1. **Long tasks** in DevTools Performance > Main thread
2. Common culprits:
   - Heavy JS hydration → split into Server Components
   - Third-party scripts blocking → load via `<Script strategy="lazyOnload">`
   - GSAP plugins all imported → import only what's used

### A11y < 95

1. Run `axe-core` for detailed issues:
   ```bash
   pnpm exec axe http://localhost:3000 --tags wcag2aa
   ```
2. Use a11y-auditor subagent for full audit

## When to run

| Trigger | Frequency |
|---|---|
| Before merging PR | Every PR via CI |
| After completing a phase (нед. 7, 13, 15) | Manual full audit |
| Before production deploy | Mandatory |
| After production deploy | Within 24h verification |
| Weekly during monitoring period (нед. 17+) | Cron job |

## Ignored audits (project-specific)

Some Lighthouse warnings are not actionable for BASE Premier — silence them in `.lighthouserc.json`:

```json
"audits:third-party-cookies": "off"   // YClients cookies needed
"audits:unused-javascript": "warn"     // false positives from GSAP plugins
```

## Output convention

After every audit, save artifacts to `docs/audits/<YYYY-MM-DD>/`:

```
docs/audits/
├── 2026-04-26/
│   ├── lh-home.report.html
│   ├── lh-home.report.json
│   ├── lh-services.report.html
│   ├── lh-barbers.report.html
│   ├── perf-summary.md  ← human-readable summary
│   └── opportunities.md ← top action items
```
