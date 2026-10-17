// Fails if a known AI-generated depiction is present in public/.
//
// The standing rule: never publish a generated image of a vehicle, uniform,
// employee, or office. These two files broke it and were LIVE (HTTP 200) on
// 2026-08-09 even after every page reference had been removed -- an orphaned
// file in public/ is still a published URL that Google can crawl.
//
// They are not merely "AI": they are visibly WRONG. truck-lifestyle.webp shows a
// Chevrolet grille on a Ford Maverick body, and both render the wordmark as
// lowercase "Envirocare". A model does not know this company's truck, wrap, or
// logo, and never will. Google's Local Services Ads had already flagged two
// photos on this account.
//
// Deleted 2026-08-09. Recoverable from git history if ever needed for reference.
// Do NOT restore them to public/.
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

// STEMS, not filenames. The first version of this test listed two exact names and
// passed -- while public/technician-envirocare-MOBILE.webp sat right beside them,
// orphaned and live at HTTP 200. Responsive variants (-mobile, -sm, @2x) and format
// swaps (.webp/.jpg/.png) are the normal shape of an asset in this repo, so matching
// one literal filename is matching one of several files. Same failure as the retired
// name, which existed in four encodings while the guard knew one.
const BANNED_STEMS = ["truck-lifestyle", "technician-envirocare"];
// Depictions of these subjects must be real photographs, never generated.
const SUSPECT = /(^|[-_])(ai|generated|synthetic|midjourney|firefly|dalle)([-_]|\.)/i;

let failed = 0;
const present = readdirSync("public");
for (const stem of BANNED_STEMS) {
  const hits = present.filter((f) => f.toLowerCase().startsWith(stem.toLowerCase()));
  console.log(`${hits.length ? "  FAIL" : "  ok  "} ${stem}* ${hits.length ? `PRESENT: ${hits.join(", ")} — a file in public/ is a live URL` : "absent (all variants)"}`);
  failed += hits.length;
}
const flagged = readdirSync("public").filter((f) => SUSPECT.test(f));
if (flagged.length) {
  console.log(`  FAIL suspiciously named assets: ${flagged.join(", ")}`);
  failed += flagged.length;
} else {
  console.log("  ok   no suspiciously named assets in public/");
}
// CONTENT FINGERPRINTS, 2026-10-17. Name checks cannot catch a fake saved under an
// innocent name -- and that is exactly what happened: an AI-generated EnviroCare
// truck (Chevrolet grille on a different body, lowercase "Envirocare" slogan) sat in
// public/hero-family.webp and public/hero-family-mobile.webp, rendered as the
// HOMEPAGE hero with alt text "Alabama family relaxing in their backyard". Found
// by opening the image during the #270 blog review, not by this guard, which
// reported "clean". So: every image in public/ (recursively) is reduced to a 16x16
// average hash and compared against known fakes. A resize, re-encode or rename keeps
// the hash within a few bits; a different photo lands 100+ bits away.
// To add a fake: node -e with sharp grayscale().resize(16,16,{fit:'fill'}), bit = px > mean.
const KNOWN_FAKE_HASHES = {
  "ai-envirocare-truck (was hero-family.webp)": "9ffbfff7ff87ff12f400c3e080303fbc27c80780c00070013fc00c7f00290000",
};
const MAX_BITS = 20;
let sharp = null;
try { sharp = (await import("sharp")).default; } catch { /* handled below */ }
if (!sharp) {
  console.log("  FAIL sharp not installed -- fingerprint check could not run, which is not a pass");
  failed += 1;
} else {
  const images = [];
  const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (/\.(png|jpe?g|webp|gif|avif)$/i.test(f)) images.push(p); } };
  walk("public");
  let fpHits = 0;
  for (const img of images) {
    let hash;
    try {
      const { data } = await sharp(img).grayscale().resize(16, 16, { fit: "fill" }).raw().toBuffer({ resolveWithObject: true });
      const avg = data.reduce((a, b) => a + b, 0) / data.length;
      let bits = ""; for (const v of data) bits += v > avg ? "1" : "0";
      hash = BigInt("0b" + bits);
    } catch { continue; }
    for (const [label, hex] of Object.entries(KNOWN_FAKE_HASHES)) {
      let x = hash ^ BigInt("0x" + hex), d = 0; while (x) { d += Number(x & 1n); x >>= 1n; }
      if (d <= MAX_BITS) { console.log(`  FAIL ${img} matches known fake ${label} (${d} bits)`); fpHits += 1; }
    }
  }
  console.log(fpHits ? "" : `  ok   ${images.length} images in public/ fingerprinted, none match a known fake`);
  failed += fpHits;
}

console.log(failed ? `\n${failed} problem(s)` : "\nclean");
process.exit(failed ? 1 : 0);
