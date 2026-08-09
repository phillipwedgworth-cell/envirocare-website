// agents/review-responder.mjs
// Weekly review-response drafter for EnviroCare.
//
// Pulls all reviews from the past 7 days via BrightLocal Reputation Manager
// reports (one per location), drafts a response for each per Phillip's rules,
// and posts the drafts to the Notion "Review Response Station" page under a
// new weekly section. DRAFTS ONLY — never posts to Google/Facebook.
//
// Response rules (locked by Phillip 2026-06-10):
//   5★ (and 4★): thank by name + mention something specific from the review +
//        vary the wording review-to-review. Signatures alternate between
//        "— Phillip Wedgworth" and "— The EnviroCare Team".
//   3★ and below: empathize + take ownership + offer Phillip's direct line +
//        NEVER argue. Always signed "— Phillip Wedgworth".
//
// Orchestrator: runs Mondays only (cron is daily) unless FORCE_REVIEWS=1.
// CLI: node agents/review-responder.mjs [--force]

import { blMcpCall, BrightLocalKeyError } from "./brightlocal.mjs";
import { createMessage } from "./lib/llm-with-logging.mjs";
import { stateGet, stateSet } from "./lib/kv.mjs";
import { writeFinding, logAgentRun } from "./lib/supabase.mjs";
import { sendEmail } from "./lib/notify.mjs";
import { cleanEnv, envWasDirty } from "./lib/env-url.mjs";
import { appendBlocksToPage, nHeading2, nHeading3, nParagraph, nQuote, nDivider } from "./lib/notion.mjs";

const AGENT_NAME = "review-responder";
const WORKER_MODEL = "claude-sonnet-4-6";
// agent_state key holding the keys of every review already drafted (capped).
const DRAFTED_LEDGER_KEY = "review-responder:drafted-keys";
const LEDGER_CAP = 500;
const REVIEW_STATION_PAGE_ID = "37b202ee-7a71-813f-a3f8-e3e5807bd7bb";

const RM_REPORTS = [
  { name: "Alabaster", report_id: "630345" },
  { name: "Huntsville", report_id: "630846" },
  { name: "Alex City", report_id: "631866" },
];

// Phillip's direct line offered on negative reviews. Using the main office
// line until Phillip supplies a different number.
const DIRECT_LINE = "(205) 940-6360";

let anthropic = null;
if (process.env.ANTHROPIC_API_KEY) {
  try {
    const mod = await import("@anthropic-ai/sdk");
    const Anthropic = mod.default ?? mod;
    anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 0 });
  } catch (e) {
    console.error(`[${AGENT_NAME}] failed to import @anthropic-ai/sdk: ${e.message}`);
  }
}

function isoDaysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

// Widened from 7 to 14 days: BrightLocal RM can surface a review days after
// it was published, and a hard 7-day window silently dropped anything that
// synced late. The drafted-key ledger (below) makes the overlap safe.
const LOOKBACK_DAYS = 14;

/** Stable identity for a review across runs — BrightLocal id when present,
 *  else a fingerprint. This is what the dedup ledger stores. */
function reviewKey(r) {
  if (r.id) return `id:${r.id}`;
  return `fp:${r.location}|${r.directory}|${r.author}|${r.publishTime}|${r.text.slice(0, 40)}`;
}

async function fetchRecentReviews() {
  const fromDate = isoDaysAgo(LOOKBACK_DAYS);
  const all = [];
  for (const loc of RM_REPORTS) {
    try {
      const data = await blMcpCall("find_rm_reviews", {
        report_id: loc.report_id,
        from_date: fromDate,
        sort_date: "desc",
        num_per_page: 50,
      });
      const reviews = Array.isArray(data) ? data : (data?.items ?? data?.reviews ?? data?.results ?? data?.data ?? []);
      for (const r of reviews) {
        all.push({
          id: r.id ?? r.review_id ?? null,
          location: loc.name,
          author: r.author ?? r.author_name ?? "A customer",
          rating: Number(r.rating ?? r.star_rating ?? 0),
          text: (r.text ?? r.review_text ?? r.content ?? "").trim(),
          directory: r.directory ?? r.platform ?? "google",
          publishTime: r.publish_time ?? r.published ?? "",
          sourceLink: r.source_link ?? r.url ?? "",
        });
      }
    } catch (e) {
      console.error(`[${AGENT_NAME}] ${loc.name} (RM ${loc.report_id}): ${e.message}`);
      all.push({ location: loc.name, error: e.message, keyRejected: e instanceof BrightLocalKeyError });
      // Auth failure is account-wide, not per-location: the same key will be
      // rejected for every remaining report. Fail fast — one error entry, no
      // wasted API calls, ONE alert downstream instead of a row per location.
      if (e instanceof BrightLocalKeyError) break;
    }
  }
  return all;
}

const DRAFT_SYSTEM = `You draft Google/Facebook review responses for EnviroCare, a fourth-generation family pest control company in Alabama (since 1958). Owner: Phillip Wedgworth.

RULES — never break:
- 5-star or 4-star: thank the reviewer BY NAME, mention something SPECIFIC from their review (a service, a tech's name, their town — whatever they actually wrote), and vary wording so consecutive responses never sound templated. Warm, brief (2-3 sentences), Southern-friendly, never corporate.
- 3-star or below: empathize first, take ownership ("that's on us"), offer Phillip's direct line ${DIRECT_LINE} and a genuine commitment to make it right. NEVER argue, never explain away, never blame the customer, never get defensive. 2-4 sentences.
- Never use banned language: same-day, pet-safe, kid-safe, non-toxic, eco-safe.
- Never offer discounts/incentives for reviews and never tell anyone what to write.
- Output ONLY the response body, no signature (signatures are appended by code), no quotes around it, no preamble.`;

async function draftResponse(review, varietyHint) {
  if (!anthropic) throw new Error("ANTHROPIC_API_KEY missing");
  const prompt = `Review from ${review.author} (${review.rating}★, ${review.directory}, ${review.location} area):\n"""${review.text || "(no text — star rating only)"}"""\n\nVariety hint: previous drafts this week opened with: ${varietyHint || "(none yet)"} — open differently.\n\nDraft the response body.`;
  const resp = await createMessage(anthropic, {
    model: WORKER_MODEL,
    max_tokens: 300,
    system: DRAFT_SYSTEM,
    messages: [{ role: "user", content: prompt }],
  }, { agentName: AGENT_NAME, role: "worker" });
  return resp.content.find(b => b.type === "text")?.text?.trim() ?? "";
}

export async function run() {
  const isMonday = new Date().getUTCDay() === 1;
  const forced = process.env.FORCE_REVIEWS === "1" || process.argv.includes("--force");
  if (!isMonday && !forced) {
    console.log(`[${AGENT_NAME}] not Monday — skipping (set FORCE_REVIEWS=1 to override)`);
    return { skipped: true, reason: "weekly agent — runs Mondays" };
  }
  // Startup env sanity: BOM/zero-width-strip + trim before judging presence —
  // a whitespace-only or BOM-wrapped value is "set" to process.env but reaches
  // BrightLocal as garbage (the FORMSPREE_LEAD_URL failure class).
  if (envWasDirty("BRIGHTLOCAL_API_KEY")) {
    console.warn(`[${AGENT_NAME}] BRIGHTLOCAL_API_KEY carried BOM/zero-width/whitespace characters — stripped for this run; fix the stored secret`);
  }
  if (!cleanEnv("BRIGHTLOCAL_API_KEY")) {
    console.log(`[${AGENT_NAME}] BRIGHTLOCAL_API_KEY not set (or empty after stripping) — skipping`);
    return { skipped: true, reason: "BRIGHTLOCAL_API_KEY not set" };
  }

  console.log(`[${AGENT_NAME}] pulling reviews since ${isoDaysAgo(LOOKBACK_DAYS)}`);
  const reviews = await fetchRecentReviews();
  const errors = reviews.filter(r => r.error);

  // Dedup ledger: every review drafted in a prior run is remembered by key in
  // agent_state, so overlapping windows, --force re-runs, and same-Monday
  // retries can never re-draft (and re-post to Notion) the same review.
  const ledger = (await stateGet(DRAFTED_LEDGER_KEY).catch(() => null)) ?? [];
  const drafted_before = new Set(ledger);
  const candidates = reviews.filter(r => !r.error && r.rating > 0);
  const fresh = candidates.filter(r => !drafted_before.has(reviewKey(r)));
  const skippedDupes = candidates.length - fresh.length;
  if (skippedDupes) console.log(`[${AGENT_NAME}] ${skippedDupes} review(s) already drafted in a prior run — skipped`);

  // BrightLocal rejected the API key (INVALID_API_KEY) — fetchRecentReviews
  // already stopped at the first rejection (auth is account-wide). Raise ONE
  // clear "renew the key" alert — a single finding row plus an email straight
  // to Phillip — and stop here (no point drafting against zero data).
  if (reviews.some(r => r.keyRejected)) {
    const msg = "BrightLocal API key rejected (INVALID_API_KEY) — renew it in the BrightLocal dashboard and update BRIGHTLOCAL_API_KEY in Vercel + GitHub secrets.";
    console.error(`[${AGENT_NAME}] ${msg}`);
    await writeFinding(AGENT_NAME, "reviews", "critical", null, msg, { needs_renewal: true, key_rejected: true }).catch(() => {});
    await sendEmail(
      "⛔ EnviroCare: BrightLocal API key rejected — review drafts halted",
      `${msg}\n\nreview-responder halted before drafting (no review data available). ` +
      `It will resume automatically on its next scheduled run once the key works.`,
    ).catch(() => {});
    await logAgentRun(AGENT_NAME, "error", msg).catch(() => {});
    return { skipped: true, reason: msg, keyRejected: true };
  }

  if (fresh.length === 0) {
    const note = skippedDupes ? ` (${skippedDupes} already drafted previously)` : "";
    console.log(`[${AGENT_NAME}] no undrafted reviews in the past ${LOOKBACK_DAYS} days${note} (${errors.length} report errors)`);
    await logAgentRun(AGENT_NAME, "ok", `No undrafted reviews this week${note}. ${errors.length} report errors.`).catch(() => {});
    return { brief: `No undrafted reviews in the past ${LOOKBACK_DAYS} days${note}.`, count: 0, errors: errors.length };
  }

  // Draft responses — 5★/4★ alternate signatures, negatives always Phillip.
  let positiveIndex = 0;
  const drafted = [];
  let lastOpening = "";
  for (const review of fresh) {
    try {
      const body = await draftResponse(review, lastOpening);
      lastOpening = body.split(" ").slice(0, 5).join(" ");
      const signature = review.rating >= 4
        ? (positiveIndex++ % 2 === 0 ? "— Phillip Wedgworth" : "— The EnviroCare Team")
        : "— Phillip Wedgworth";
      drafted.push({ ...review, draft: `${body}\n\n${signature}` });
    } catch (e) {
      console.error(`[${AGENT_NAME}] draft failed for ${review.author}: ${e.message}`);
      drafted.push({ ...review, draft: `⚠️ draft failed: ${e.message}` });
    }
  }

  // Post to Notion Review Response Station — new weekly section.
  const weekLabel = `Week of ${isoDaysAgo(7)} → ${isoDaysAgo(0)}`;
  const blocks = [nHeading2(`📝 ${weekLabel} — ${drafted.length} new review(s)`)];
  for (const d of drafted) {
    const stars = "★".repeat(Math.round(d.rating)) + "☆".repeat(5 - Math.round(d.rating));
    blocks.push(nHeading3(`${stars} ${d.author} — ${d.location} (${d.directory})`));
    if (d.text) blocks.push(nQuote(d.text.slice(0, 1800)));
    blocks.push(nParagraph(`DRAFT RESPONSE:\n${d.draft}`));
    if (d.sourceLink) blocks.push(nParagraph(`Respond here: ${d.sourceLink}`));
    blocks.push(nDivider());
  }
  if (errors.length) blocks.push(nParagraph(`⚠️ ${errors.map(e => `${e.location}: ${e.error}`).join(" · ")}`));

  await appendBlocksToPage(REVIEW_STATION_PAGE_ID, blocks, { label: "Review Response Station" });

  // Persist the ledger AFTER the Notion post succeeds, and only for drafts that
  // actually drafted — a failed draft stays off the ledger so it retries next run.
  const newKeys = drafted.filter(d => !d.draft.startsWith("⚠️")).map(reviewKey);
  await stateSet(DRAFTED_LEDGER_KEY, [...ledger, ...newKeys].slice(-LEDGER_CAP)).catch(e =>
    console.error(`[${AGENT_NAME}] ledger save failed (${e.message}) — next run may re-draft this week's reviews`));

  const brief = `${drafted.length} review response draft(s) posted to the Review Response Station (${weekLabel}). ` +
    `${drafted.filter(d => d.rating <= 3).length} negative — review those first.`;
  await writeFinding(AGENT_NAME, "reviews", drafted.some(d => d.rating <= 3) ? "warning" : "info", null, brief, {
    week: weekLabel,
    reviews: drafted.map(d => ({ author: d.author, rating: d.rating, location: d.location })),
  }).catch(() => {});
  await logAgentRun(AGENT_NAME, "ok", brief).catch(() => {});

  console.log(`[${AGENT_NAME}] ${brief}`);
  return { brief, count: drafted.length, errors: errors.length };
}

// CLI
const isCli = process.argv[1] && process.argv[1].endsWith("review-responder.mjs");
if (isCli) {
  const result = await run();
  console.log(JSON.stringify({ ...result, brief: result.brief?.slice(0, 200) }, null, 2));
  process.exit(0);
}
