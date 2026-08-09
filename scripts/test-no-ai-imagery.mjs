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
import { readdirSync } from "node:fs";

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
console.log(failed ? `\n${failed} problem(s)` : "\nclean");
process.exit(failed ? 1 : 0);
