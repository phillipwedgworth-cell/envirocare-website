// agents/lib/env-url.mjs
// Durable guard for env-derived URLs.
//
// A stray BOM (U+FEFF) or zero-width space pasted into the Vercel dashboard
// silently corrupts a fetch target or request header and is nearly impossible
// to spot by eye — it once broke FORMSPREE_LEAD_URL and 401'd NeuronWriter.
// Strip those characters (plus surrounding whitespace) at EVERY env read so it
// can never break FORMSPREE_LEAD_URL or any other env-derived URL again.

// Zero-width space / ZWNJ / ZWJ (U+200B..U+200D) and BOM (U+FEFF).
const ZERO_WIDTH = /[\u200B-\u200D\uFEFF]/g;

// Strip zero-width / BOM characters anywhere in the string, then trim whitespace.
// Returns the input unchanged when it is null/undefined so callers can still
// distinguish "unset" from "empty".
export function cleanEnvUrl(value) {
  if (value == null) return value;
  return String(value).replace(ZERO_WIDTH, "").trim();
}

// Read a URL-bearing env var, sanitized. Falls back to `fallback` (also
// sanitized) when the var is unset or empty.
export function envUrl(name, fallback = undefined) {
  const raw = process.env[name];
  if (raw == null || raw === "") return cleanEnvUrl(fallback);
  return cleanEnvUrl(raw);
}
