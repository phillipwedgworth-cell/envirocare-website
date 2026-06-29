// agents/lib/env-url.mjs
// Durable BOM / zero-width guard for env-derived URLs (agent-side mirror of
// lib/env-url.ts). A leading byte-order mark (U+FEFF), a zero-width character
// (U+200B–U+200D), or stray whitespace on a pasted env value silently breaks
// fetch()/URL building; strip them all, always.
//
// The strip set is built via fromCharCode so this file can never itself smuggle
// in one of these invisible characters.
const INVISIBLE = new RegExp(
  "[" + [0x200b, 0x200c, 0x200d, 0xfeff].map((c) => String.fromCharCode(c)).join("") + "]",
  "g",
);

export function envUrl(name, fallback = "") {
  const raw = process.env[name] ?? fallback;
  return raw.replace(INVISIBLE, "").trim();
}
