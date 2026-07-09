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

// Same guard for non-URL secrets (API keys, tokens). A BOM'd/space-padded key
// reaches the remote API verbatim and comes back as INVALID_API_KEY — an auth
// error that looks like an expired key but is really a paste artifact.
export function cleanEnv(name, fallback = "") {
  return envUrl(name, fallback);
}

// True when the env value only became usable after stripping — callers use
// this to log a loud one-line warning so the paste artifact gets fixed at the
// source (Vercel/GitHub secret) instead of being silently tolerated forever.
export function envWasDirty(name) {
  const raw = process.env[name];
  if (raw == null) return false;
  return raw !== raw.replace(INVISIBLE, "").trim();
}
