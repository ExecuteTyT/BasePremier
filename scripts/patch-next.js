#!/usr/bin/env node
/**
 * Patches Next.js 16.2.4 to prevent /_global-error from being statically
 * pre-rendered. This is a workaround for a bug where React is null in the
 * static generation worker when running on Node.js 24 + React 19.2.4.
 *
 * Run automatically via the "prepare" lifecycle hook is not possible
 * without interfering with husky. Run manually after pnpm install if needed:
 *   node scripts/patch-next.js
 */

const fs = require("fs");
const path = require("path");

const utilsPath = path.join(__dirname, "../node_modules/next/dist/build/utils.js");

if (!fs.existsSync(utilsPath)) {
  console.log("[patch-next] node_modules/next/dist/build/utils.js not found, skipping");
  process.exit(0);
}

let content = fs.readFileSync(utilsPath, "utf8");
let changed = false;

// Patch 1: isPageStatic early-return for /_global-error
// Changes isStatic: true → false and appConfig: {} → { revalidate: 0 }
// to prevent the route from being added to staticPaths during the build.
const patch1Old = `    // Skip page data collection for synthetic _global-error routes
    if (page === _constants1.UNDERSCORE_GLOBAL_ERROR_ROUTE) {
        return {
            isStatic: true,
            isRoutePPREnabled: false,
            prerenderFallbackMode: undefined,
            prerenderedRoutes: undefined,
            rootParamKeys: undefined,
            hasStaticProps: false,
            hasServerProps: false,
            isNextImageImported: false,
            appConfig: {}
        };
    }`;
const patch1New = `    // Skip page data collection for synthetic _global-error routes
    if (page === _constants1.UNDERSCORE_GLOBAL_ERROR_ROUTE) {
        return {
            isStatic: false,
            isRoutePPREnabled: false,
            prerenderFallbackMode: undefined,
            prerenderedRoutes: undefined,
            rootParamKeys: undefined,
            hasStaticProps: false,
            hasServerProps: false,
            isNextImageImported: false,
            appConfig: { revalidate: 0 }
        };
    }`;

if (content.includes(patch1Old)) {
  content = content.replace(patch1Old, patch1New);
  changed = true;
  console.log("[patch-next] Applied patch 1: isPageStatic _global-error early return");
} else if (content.includes(patch1New)) {
  console.log("[patch-next] Patch 1 already applied");
} else {
  console.warn("[patch-next] WARNING: Patch 1 target not found — Next.js version may have changed");
}

// Patch 2: appConfig for UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY (belt-and-suspenders)
const patch2Old = `appConfig = originalAppPath === _constants1.UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY ? {} : reduceAppConfig(segments);`;
const patch2New = `appConfig = originalAppPath === _constants1.UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY ? { revalidate: 0 } : reduceAppConfig(segments);`;

if (content.includes(patch2Old)) {
  content = content.replace(patch2Old, patch2New);
  changed = true;
  console.log("[patch-next] Applied patch 2: appConfig revalidate for _global-error entry");
} else if (content.includes(patch2New)) {
  console.log("[patch-next] Patch 2 already applied");
} else {
  console.warn("[patch-next] WARNING: Patch 2 target not found — Next.js version may have changed");
}

if (changed) {
  fs.writeFileSync(utilsPath, content, "utf8");
  console.log("[patch-next] Patches written to", utilsPath);
} else {
  console.log("[patch-next] No changes needed");
}
