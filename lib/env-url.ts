// lib/env-url.ts
// Durable BOM / zero-width guard for env-derived values (URLs, recipient lists,
// any string pasted into the Vercel dashboard or a .env file).
//
// A leading byte-order mark (U+FEFF) or a zero-width character (U+200B–U+200D)
// plus stray whitespace is invisible in every editor, yet it breaks fetch()
// ("Invalid URL") and makes Resend reject an entire send when it rides along on
// one recipient address. This already broke FORMSPREE_LEAD_URL and the leads
// email once — read such env values through here so it never can again.
//
// The strip set is built via fromCharCode so this source file can never itself
// smuggle in one of these invisible characters.
const INVISIBLE = new RegExp(
  "[" + [0x200b, 0x200c, 0x200d, 0xfeff].map((c) => String.fromCharCode(c)).join("") + "]",
  "g",
);

// Read an env var, strip invisible characters anywhere in it, and trim the ends.
export function cleanEnv(name: string, fallback = ""): string {
  const raw = process.env[name] ?? fallback;
  return raw.replace(INVISIBLE, "").trim();
}

// URL-flavoured alias — same guarantee, reads as intent at the call site.
export const envUrl = cleanEnv;
