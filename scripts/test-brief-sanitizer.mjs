// Guard for agents/lib/brief-sanitize.mjs (Sunday audit 2026-10-04, R5).
// The morning brief must never ship a SoLV change computed across two
// different grids/campaigns, e.g. "Alabaster surge (+25 pts since Aug 27)".
import { stripCrossSeriesClaims, stripStalePRClaims, fixDataWindowLabel, stripDeployClaims } from "../agents/lib/brief-sanitize.mjs";

const mustStrip = [
  "Alabaster surge (+25 pts since Aug 27) — 38.7%",
  "Huntsville up 3.2% since Sep 5",
  "Lake Martin jumped since 2026-08-27 to 44%",
  "Birmingham −4 points since 9/18",
];
const mustKeep = [
  "Alabaster SoLV 38.7% across 17 keywords (run 2026-10-02)",
  "78 clicks (−10) · 11,868 impr",
  "Still open since Sep 23 (12 days)",
  "Huntsville 0.4% — no change",
];
let fail = 0;
for (const l of mustStrip) if (stripCrossSeriesClaims(l).removed !== 1) { console.error(`NOT STRIPPED: ${l}`); fail++; }
for (const l of mustKeep) if (stripCrossSeriesClaims(l).removed !== 0) { console.error(`WRONGLY STRIPPED: ${l}`); fail++; }
const mixed = stripCrossSeriesClaims(mustKeep.concat(mustStrip).join("\n"));
if (mixed.removed !== mustStrip.length || !mixed.text.includes("line(s) removed")) { console.error("mixed brief not handled"); fail++; }
// ── Sunday audit 2026-10-11 R2: stale PR claims (text taken from the 10-09 brief).
const brief1009 = `## SCOREBOARD

**Organic (7d ending Oct 6):** 96 clicks (+18) · 15,495 impressions (+3,627).

## SHIPPED (verified)

- Merged to main: PR #236 Birmingham + mosquito intent

## QUEUED (waiting on execution)

**PR #240 (2d).** Ahrefs audit fixes — schema, titles, meta. Ready to merge.

**PR #144 (33d).** 190 keyword drafts. Decision lag now 7+ days; content workflow stalled.

**Huntsville reviews (P1).** Still open (8 days).

## YOUR CALL (money/irreversible)

**1. Approve or reset PR #144 — 190 keyword drafts.** 36 posts queued behind this gate.
Owner: Phillip · Due: Today (day 8 of lag)

**2. Call Harris Ramm.** Confirm Fieldster auto-ask is ON in Huntsville.
Owner: Phillip · Due: Today`;
const prState = { ok: true, open: new Set([240, 234, 218]), merged: new Set([236, 144]) };
const pr = stripStalePRClaims(brief1009, prState);
for (const gone of ["PR #144 (33d)", "Approve or reset PR #144", "day 8 of lag"]) if (pr.text.includes(gone)) { console.error(`STALE PR NOT STRIPPED: ${gone}`); fail++; }
for (const kept of ["PR #240 (2d)", "Merged to main: PR #236", "Call Harris Ramm", "Huntsville reviews (P1)"]) if (!pr.text.includes(kept)) { console.error(`WRONGLY STRIPPED: ${kept}`); fail++; }
const noToken = stripStalePRClaims(brief1009, { ok: false });
if (/PR #\d/.test(noToken.text.replace(/\(.*removed.*\)/, ""))) { console.error("no-token mode left a PR claim"); fail++; }

// ── R3: GSC window label must come from gsc_daily max(date).
const w = fixDataWindowLabel("**Organic (7d ending Oct 7):** 96 clicks · 15,495 impressions.", "2026-10-06");
if (!w.text.includes("ending Oct 6") || w.fixed !== 1) { console.error(`window label not fixed: ${w.text}`); fail++; }
const ok = fixDataWindowLabel("**Organic (7d ending Oct 6):** 96 clicks", "2026-10-06");
if (ok.fixed !== 0) { console.error("correct window label was counted as fixed"); fail++; }
if (fixDataWindowLabel("Huntsville reviews still open since Sep 23", "2026-10-06").fixed !== 0) { console.error("non-GSC line touched"); fail++; }


// ── Sunday audit 2026-11-08 R4: deploy-status claims. Real lines from the
// 11-03 and 11-05 briefs; both PRs were already in a READY production deploy.
const real1103 = "PR #290 merged — $75 anchor + one-time price removal live on main (awaiting production deploy).";
const real1105 = "PR #287 merged (data center guides, blog fixes, Narrator guards — live on code only, awaiting production deploy).";
const fine = "#293 merged — bundle wording removed from $34 mosquito language — LIVE in production (production deploy 3081e26 contains it)";
const liveState = { ok: true, liveSha: "3081e26", live: new Map([[290, true], [287, true], [293, true], [294, false]]) };
const dz = stripDeployClaims([real1103, real1105, fine, "Huntsville reviews still open"].join("\n"), liveState);
if (dz.removed !== 2 || dz.text.includes("#290 merged") || dz.text.includes("#287 merged")) { console.error(`DEPLOY CLAIM NOT STRIPPED: ${dz.text}`); fail++; }
if (!dz.text.includes("#293 merged") || !dz.text.includes("Huntsville reviews")) { console.error("deploy sanitizer stripped a true line"); fail++; }
const notLiveYet = stripDeployClaims("PR #294 Auburn clarity is now live in production.", liveState);
if (notLiveYet.removed !== 1) { console.error("a 'live' claim for a PR not in the production deploy survived"); fail++; }
const truthfulPending = stripDeployClaims("PR #294 merged — not yet live (awaiting production deploy).", liveState);
if (truthfulPending.removed !== 0) { console.error("a true 'not yet live' line was stripped"); fail++; }
const unknown = stripDeployClaims([real1103, fine].join("\n"), { ok: false });
if (unknown.removed !== 2) { console.error("unknown deploy state left a deploy claim"); fail++; }

if (fail) { console.error(`\ntest:brief FAILED (${fail})`); process.exit(1); }
console.log(`test:brief OK — ${mustStrip.length} cross-series lines stripped, ${mustKeep.length} legitimate lines kept; stale-PR (${pr.removed} lines), GSC-window and deploy-status (${dz.removed} lines) checks pass`);
