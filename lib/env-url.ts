// lib/env-url.ts
// Durable BOM / zero-width guard for env-derived URLs.
//
// When an env value is pasted into the Vercel dashboard (or a .env saved as
// UTF-8-with-BOM), it can arrive with a leading byte-order mark (U+FEFF) or a
// zero-width character (U+200B–U+200D) plus stray whitespace. fetch() then dies
// with "Invalid URL" / silently 404s, and the cause is invisible because none
// of those characters print. This already broke FORMSPREE_LEAD_URL once — read
// every URL env through here so it never can again.
//
// The strip set is built via fromCharCode so this source file can never itself
// smuggle in one of these invisible characters.
const INVISIBLE = new RegExp(
  "[" + [0x200b, 0x200c, 0x200d, 0xfeff].map((c) => String.fromCharCode(c)).join("") + "]",
  "g",
);

export function envUrl(name: string, fallback = ""): string {
  const raw = process.env[name] ?? fallback;
  return raw.replace(INVISIBLE, "").trim();
}
