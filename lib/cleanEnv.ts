// lib/cleanEnv.ts
// Canonical sanitizer for any env value that ends up in a URL, email address,
// or request header. A stray BOM (U+FEFF) or zero-width char pasted into the
// Vercel dashboard silently corrupts the value and is invisible to the eye —
// it has broken FORMSPREE_LEAD_URL and 401'd NeuronWriter in the past.
//
// Strip a leading BOM, drop zero-width spaces/joiners anywhere, then trim.
// Returns "" for an unset var so callers can use `|| fallback` / truthiness.
export const cleanEnv = (v?: string) =>
  (v ?? '').replace(/^\uFEFF/, '').replace(/[\u200B-\u200D]/g, '').trim();
