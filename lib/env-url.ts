// lib/env-url.ts
// Durable guard for env-derived URLs (TypeScript twin of agents/lib/env-url.mjs).
//
// A stray BOM (U+FEFF) or zero-width space pasted into the Vercel dashboard
// silently corrupts a fetch target or request header and is nearly impossible
// to spot by eye — it once broke FORMSPREE_LEAD_URL and 401'd NeuronWriter.
// Strip those characters (plus surrounding whitespace) at EVERY env read so it
// can never break FORMSPREE_LEAD_URL or any other env-derived URL again.

// Zero-width space / ZWNJ / ZWJ (U+200B..U+200D) and BOM (U+FEFF).
const ZERO_WIDTH = /[\u200B-\u200D\uFEFF]/g;

// Strip zero-width / BOM characters anywhere in the string, then trim whitespace.
export function cleanEnvUrl(value: string | null | undefined): string | undefined {
  if (value == null) return undefined;
  return value.replace(ZERO_WIDTH, "").trim();
}

// Read a URL-bearing env var, sanitized. Falls back to `fallback` (also
// sanitized) when the var is unset or empty.
export function envUrl(name: string, fallback?: string): string | undefined {
  const raw = process.env[name];
  if (raw == null || raw === "") return cleanEnvUrl(fallback);
  return cleanEnvUrl(raw);
}
