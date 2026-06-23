#!/usr/bin/env node
/**
 * audit-location-pages.mjs
 *
 * Non-destructive audit for this repo's page structure. It does NOT generate or
 * modify anything — it reports.
 *
 * Two checks:
 *
 *  1) STRAY (unrouted) pages. Next.js App Router only serves files under `app/`.
 *     Any `<dir>/page.tsx` sitting at the REPO ROOT is dead code: Next never
 *     builds or serves it. These commonly appear when a content generator writes
 *     `drafts/<slug>.md` -> `<slug>/page.tsx` at the repo root instead of under
 *     `app/`. The live route for `/<slug>` is `app/<slug>/page.tsx`.
 *
 *  2) SEO metadata completeness for the REAL routed pages under `app/`. Flags any
 *     routed `page.tsx` that exports `metadata` but is missing `title`,
 *     `description`, or `alternates.canonical`. Dynamic routes that build metadata
 *     via `generateMetadata` are reported separately, not failed.
 *
 * Usage:
 *   node scripts/audit-location-pages.mjs           # report
 *   node scripts/audit-location-pages.mjs --strict  # exit 1 if stray pages found
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const strict = process.argv.includes("--strict");

// Directories at the repo root that are NOT route folders and should be ignored.
const NON_ROUTE_ROOT_DIRS = new Set([
  "app", "components", "lib", "shared", "data", "public", "scripts", "docs",
  "agents", "decisions", "monitoring", "node_modules", ".git", ".next", ".vercel",
]);

function listRootRouteDirs() {
  return readdirSync(ROOT)
    .filter((name) => {
      if (NON_ROUTE_ROOT_DIRS.has(name) || name.startsWith(".")) return false;
      const dir = join(ROOT, name);
      return statSync(dir).isDirectory() && existsSync(join(dir, "page.tsx"));
    })
    .sort();
}

function walkPages(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (name === "node_modules" || name.startsWith(".")) continue;
      walkPages(full, acc);
    } else if (name === "page.tsx") {
      acc.push(full);
    }
  }
  return acc;
}

const rel = (p) => p.replace(ROOT + "/", "");

// ── Check 1: stray unrouted root pages ───────────────────────────────────────
const stray = listRootRouteDirs();

console.log("── Unrouted pages at repo root (Next serves only app/) ──");
if (stray.length === 0) {
  console.log("  ✓ none");
} else {
  for (const slug of stray) {
    const live = existsSync(join(ROOT, "app", slug, "page.tsx"))
      ? `app/${slug}/page.tsx`
      : "— no app/ route exists —";
    console.log(`  ✗ ${slug}/page.tsx  (dead; live route: ${live})`);
  }
  console.log(`  ${stray.length} stray page(s). These are never built or served.`);
}

// ── Check 2: SEO metadata on real routed pages ───────────────────────────────
const appPages = walkPages(join(ROOT, "app"));
const missing = [];
const dynamic = [];

for (const file of appPages) {
  const src = readFileSync(file, "utf8");
  const hasStaticMeta = /export\s+const\s+metadata\b/.test(src);
  const hasGenMeta = /export\s+(async\s+)?function\s+generateMetadata\b/.test(src);

  if (!hasStaticMeta && hasGenMeta) {
    dynamic.push(rel(file));
    continue;
  }
  if (!hasStaticMeta) continue; // layouts/redirects without metadata — not a page SEO target

  const gaps = [];
  if (!/\btitle\s*:/.test(src)) gaps.push("title");
  if (!/\bdescription\s*:/.test(src)) gaps.push("description");
  if (!/canonical\s*:/.test(src)) gaps.push("canonical");
  if (gaps.length) missing.push({ file: rel(file), gaps });
}

console.log("\n── SEO metadata gaps on routed app/ pages ──");
if (missing.length === 0) {
  console.log("  ✓ all static-metadata pages have title, description, canonical");
} else {
  for (const m of missing) console.log(`  ✗ ${m.file}  → missing: ${m.gaps.join(", ")}`);
}
if (dynamic.length) {
  console.log(`\n  ℹ ${dynamic.length} page(s) use generateMetadata (verify manually):`);
  for (const d of dynamic) console.log(`     · ${d}`);
}

console.log(
  `\nSummary: ${appPages.length} routed pages, ${stray.length} stray root pages, ` +
    `${missing.length} with metadata gaps.`
);

if (strict && stray.length > 0) process.exit(1);
