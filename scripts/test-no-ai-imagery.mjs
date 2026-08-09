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
import { existsSync, readdirSync } from "node:fs";

const BANNED_FILES = ["truck-lifestyle.webp", "technician-envirocare.webp"];
// Depictions of these subjects must be real photographs, never generated.
const SUSPECT = /(^|[-_])(ai|generated|synthetic|midjourney|firefly|dalle)([-_]|\.)/i;

let failed = 0;
for (const f of BANNED_FILES) {
  const bad = existsSync(`public/${f}`);
  console.log(`${bad ? "  FAIL" : "  ok  "} ${f} ${bad ? "IS PRESENT — a file in public/ is a live URL" : "absent"}`);
  if (bad) failed++;
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
