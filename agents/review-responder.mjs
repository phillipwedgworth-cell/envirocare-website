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
import { writeFinding, logAgentRun } from "./lib/supabase.mjs";
import { appendBlocksToPage, nHeading2, nHeading3, nParagraph, nQuote, nDivider } from "./lib/notion.mjs";

const AGENT_NAME = "review-responder";
const WORKER_MODEL = "claude-sonnet-4-6";
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

async function fetchRecentReviews() {
  const fromDate = isoDaysAgo(7);
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
    }
  }
  return all;
}

const DRAFT_SYSTEM = `You draft Google/Facebook review responses for EnviroCare Pest & Termite Services, a third-generation family pest control company in Alabama (since 1958). Owner: Phillip Wedgworth.

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
  if (!process.env.BRIGHTLOCAL_API_KEY) {
    console.log(`[${AGENT_NAME}] BRIGHTLOCAL_API_KEY not set — skipping`);
    return { skipped: true, reason: "BRIGHTLOCAL_API_KEY not set" };
  }

  console.log(`[${AGENT_NAME}] pulling reviews since ${isoDaysAgo(7)}`);
  const reviews = await fetchRecentReviews();
  const errors = reviews.filter(r => r.error);
  const fresh = reviews.filter(r => !r.error && r.rating > 0);

  // BrightLocal rejected the API key (INVALID_API_KEY) — every location failed
  // the same way. Raise ONE clear "renew the key" alert instead of burying it in
  // per-location errors, and stop here (no point drafting against zero data).
  if (reviews.some(r => r.keyRejected)) {
    const msg = "BrightLocal API key rejected (INVALID_API_KEY) — renew it in the BrightLocal dashboard and update BRIGHTLOCAL_API_KEY in Vercel.";
    console.error(`[${AGENT_NAME}] ${msg}`);
    await writeFinding(AGENT_NAME, "reviews", "critical", null, msg, { needs_renewal: true, key_rejected: true }).catch(() => {});
    await logAgentRun(AGENT_NAME, "error", msg).catch(() => {});
    return { skipped: true, reason: msg, keyRejected: true };
  }

  if (fresh.length === 0) {
    console.log(`[${AGENT_NAME}] no new reviews in the past 7 days (${errors.length} report errors)`);
    await logAgentRun(AGENT_NAME, "ok", `No new reviews this week. ${errors.length} report errors.`).catch(() => {});
    return { brief: "No new reviews in the past 7 days.", count: 0, errors: errors.length };
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
