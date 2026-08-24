// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/site-reviewer.mjs
// Commit: fix(site-reviewer): load compliance guardrails + knowledge into CLAUDE_LENS
// Push: main
// ─────────────────────────────────
// agents/site-reviewer.mjs
// Site reviewer — visual + performance + SEO/content in one agent.
//
// Architecture (CHUNKED — the whole cycle no longer fits one 300s invocation):
//   Phase 1  Deterministic gather, N pages per invocation with a per-page
//            timeout. Each page's data (PageSpeed + SEO signals + text +
//            screenshot) is persisted to agent_state and a cursor advances;
//            an unfinished cycle resumes on the next cron tick (4x/day).
//            (This replaced the Haiku tool-use gather worker: the work was
//            purely mechanical, and an LLM loop can't be checkpointed.)
//   Phase 2  Multi-model panel (Claude/Gemini/GPT) reviews the gathered
//            data + screenshots — runs only once all pages are gathered,
//            and only if enough of the invocation's budget remains
//            (otherwise it runs alone on the next tick).
//   Phase 3  Sonnet synthesizes the three lenses into a brief +
//            structured findings + recommendations.
//   Phase 4  Critic loop holds the brief to the team rubric.
//   Phase 5  Persist: writeFinding per recommendation, writeDiscussion
//            for cross-agent connections, stateSet for next-run delta;
//            cursor + gathered pages are cleared for the next cycle.

import { criticLoop, criticDraft } from "./lib/critic.mjs";
import { stateGet, stateSet, stateGetAll, stateClear } from "./lib/kv.mjs";
import {
  writeFinding,
  writeDiscussion,
  readDiscussions,
  readFindings,
  logAgentRun,
} from "./lib/supabase.mjs";
import { runPanel, synthesize } from "../lib/llm-panel.ts";
import { RECOMMENDATION_GUARDRAILS } from "./lib/compliance.mjs";
import { gateOrSkip } from "./lib/agent-gate.mjs";
import { knowledgeBlock } from "./lib/knowledge.mjs";

const AGENT_NAME = "site-reviewer";
const PROMPT_VERSION = "2026-07-08";

// ── Chunking knobs ────────────────────────────────────────────────────────────
// Pages gathered per invocation. 3/run × cron 4x/day = a full 5-page cycle
// completes in 2 ticks (~12h), reviews land twice a day.
const MAX_PAGES_PER_RUN = Number(process.env.SITE_REVIEWER_PAGES_PER_RUN || 3);
// One slow page (PageSpeed regularly takes 30-40s) can't burn the budget.
const PAGE_TIMEOUT_MS = Number(process.env.SITE_REVIEWER_PAGE_TIMEOUT_MS || 75_000);
// Stop starting new pages past this point in the invocation.
const GATHER_DEADLINE_MS = Number(process.env.SITE_REVIEWER_GATHER_DEADLINE_MS || 180_000);
// Only start the panel+synthesis phase if we're under this elapsed time —
// otherwise defer it to the next tick, where it gets the whole budget.
const SYNTH_GATE_MS = Number(process.env.SITE_REVIEWER_SYNTH_GATE_MS || 120_000);
// A cursor older than this is a wedged cycle (deploy mid-cycle, schema change…)
// — reset and start over rather than resuming stale data forever.
const CYCLE_STALE_H = 48;

const CURSOR_KEY = `${AGENT_NAME}:cursor`;
const GATHER_PREFIX = `${AGENT_NAME}:gathered:`;

// Live production host. This MUST be the custom domain, not a *.vercel.app URL:
// deployment URLs sit behind Vercel Authentication and 302 to a login page, so
// auditing them measures the login screen, not the site. (Fixed 2026-07-25 — the
// stale vercel.app host was the root cause of months of false performance findings.)
const SITE_BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.envirocarellc.com").replace(/\/$/, "");

const TARGET_PAGES = [
  { url: `${SITE_BASE}/`, label: "home" },
  // WAS /services/mosquito-control. That is NOT a dead URL -- it 308s to
  // /services/mosquito -- but auditing a redirect measures an extra hop and files
  // every finding against a non-canonical URL. Verified live 2026-08-09:
  // /services/mosquito-control -> 308 -> /services/mosquito (200).
  { url: `${SITE_BASE}/services/mosquito`, label: "mosquito" },
  { url: `${SITE_BASE}/services/termite-control`, label: "termite" },
  { url: `${SITE_BASE}/huntsville`, label: "huntsville" },
  { url: `${SITE_BASE}/birmingham`, label: "birmingham" },
];

// ---------- Page-data gathering (deterministic, no LLM) ----------

// Strip a rendered HTML document down to visible text.
function extractVisibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchPage({ url }) {
  try {
    const r = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 EnviroCareSiteReviewer/1.0" },
    });
    if (!r.ok) return { error: `HTTP ${r.status}` };
    const html = await r.text();
    // Parse SEO signals + extract cleaned visible text server-side so the worker
    // receives usable content. Returning the raw 40k HTML was pointless: stripHeavy
    // deleted it before the worker ever saw it (the "metadata only" bug), and the
    // worker then had no HTML to feed the old extract_seo_signals step.
    return {
      url,
      status: r.status,
      seo: parseSeoSignals(html),
      text: extractVisibleText(html).slice(0, 6000),
    };
  } catch (e) {
    return { error: e.message };
  }
}

const PAGESPEED_TIMEOUT_MS = 45_000;

async function runPageSpeed({ url, strategy = "mobile" }) {
  try {
    const key = process.env.PAGESPEED_API_KEY ?? "";
    const apiUrl = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    apiUrl.searchParams.set("url", url);
    apiUrl.searchParams.set("strategy", strategy);
    apiUrl.searchParams.append("category", "performance");
    apiUrl.searchParams.append("category", "seo");
    apiUrl.searchParams.append("category", "accessibility");
    if (key) apiUrl.searchParams.set("key", key);
    // PageSpeed had NO timeout of its own, so a hung call consumed the entire 75s
    // gather budget and surfaced as a misleading "page timeout". Bounded here so it
    // fails fast, names itself, and still lets fetchPage's SEO signals through.
    // NOTE: without PAGESPEED_API_KEY the unkeyed quota is heavily rate-limited,
    // which makes slow and failed responses much more likely -- see the missing
    // Vercel env keys item.
    const r = await fetch(apiUrl, { signal: AbortSignal.timeout(PAGESPEED_TIMEOUT_MS) });
    const json = await r.json();
    if (json.error) return { error: json.error.message };
    const audits = json.lighthouseResult?.audits ?? {};
    const cats = json.lighthouseResult?.categories ?? {};
    const screenshotData = audits["final-screenshot"]?.details?.data ?? null;
    const screenshotB64 = screenshotData
      ? screenshotData.replace(/^data:image\/\w+;base64,/, "")
      : null;
    return {
      url,
      strategy,
      performance_score: Math.round((cats.performance?.score ?? 0) * 100),
      seo_score: Math.round((cats.seo?.score ?? 0) * 100),
      a11y_score: Math.round((cats.accessibility?.score ?? 0) * 100),
      lcp: audits["largest-contentful-paint"]?.displayValue,
      cls: audits["cumulative-layout-shift"]?.displayValue,
      tbt: audits["total-blocking-time"]?.displayValue,
      has_screenshot: !!screenshotB64,
      _screenshot_b64: screenshotB64,
    };
  } catch (e) {
    // AbortSignal.timeout throws "The operation was aborted due to a timeout",
    // which names neither the API nor the URL. Say which call died, or the next
    // person debugging this goes looking for a slow page again.
    if (e?.name === "TimeoutError" || /abort/i.test(e?.message ?? "")) {
      return { error: `PageSpeed API timed out after ${PAGESPEED_TIMEOUT_MS}ms for ${url} (the page itself may be fine)` };
    }
    return { error: `PageSpeed API: ${e.message}` };
  }
}

function parseSeoSignals(html) {
  const get = (name) => {
    const m = html.match(
      new RegExp(`<meta\\s+(?:name|property)=["']${name}["'][^>]*content=["']([^"']+)["']`, "i"),
    );
    return m?.[1] ?? null;
  };
  const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ?? null;
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)]
    .map((m) => m[1].replace(/<[^>]+>/g, "").trim())
    .filter(Boolean);
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)]
    .map((m) => m[1].replace(/<[^>]+>/g, "").trim())
    .filter(Boolean);
  const jsonLdBlocks = [
    ...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi),
  ].map((m) => m[1].trim());
  const jsonLdTypes = [];
  for (const block of jsonLdBlocks) {
    try {
      const data = JSON.parse(block);
      const items = Array.isArray(data) ? data : data["@graph"] ?? [data];
      for (const item of items) {
        if (item?.["@type"]) jsonLdTypes.push(item["@type"]);
      }
    } catch {
      // ignore malformed JSON-LD
    }
  }
  return {
    title,
    title_length: title?.length ?? 0,
    description: get("description"),
    description_length: get("description")?.length ?? 0,
    og_title: get("og:title"),
    og_image: get("og:image"),
    canonical: html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1] ?? null,
    h1_count: h1s.length,
    h1s: h1s.slice(0, 5),
    h2_count: h2s.length,
    json_ld_count: jsonLdBlocks.length,
    json_ld_types: jsonLdTypes,
  };
}

async function readPeerFindings({ agents = [], hoursBack = 168 }) {
  const findings = await readFindings(agents, hoursBack);
  const discussions = await readDiscussions(agents, hoursBack);
  return {
    findings: findings.slice(0, 20),
    discussions: discussions.slice(0, 20),
  };
}

// ---------- Phase 1: chunked deterministic gather ----------

// Reject after ms — one hung PageSpeed call can't eat the whole invocation.
function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    // Message deliberately says "gather", not "page". It wraps runPageSpeed AND
    // fetchPage, and the old wording ("page timeout") sent two separate
    // investigations looking for a slow page. On 2026-08-06 this fired for
    // birmingham -- which serves in 0.38s. It was PageSpeed, not the page.
    timer = setTimeout(() => reject(new Error(`${label}: gather timeout after ${ms}ms (PageSpeed API + fetch; usually PageSpeed)`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

// Gather everything the panel needs for ONE page. The screenshot rides along
// in agent_state (size-capped) so a cycle spread across invocations still
// feeds the vision lens when synthesis finally runs.
async function gatherPage(page) {
  const [pagespeed, fetched] = await Promise.all([
    runPageSpeed({ url: page.url, strategy: "mobile" }),
    fetchPage({ url: page.url }),
  ]);
  const screenshot =
    pagespeed?._screenshot_b64 && pagespeed._screenshot_b64.length < 400_000
      ? pagespeed._screenshot_b64
      : null;
  if (pagespeed && typeof pagespeed === "object") delete pagespeed._screenshot_b64;
  return {
    url: page.url,
    label: page.label,
    pagespeed,
    seo: fetched?.seo ?? null,
    content_excerpt: (fetched?.text ?? "").slice(0, 1500),
    fetch_error: fetched?.error ?? null,
    screenshot,
    gathered_at: new Date().toISOString(),
  };
}

async function clearCycleState() {
  // stateClear, not stateSet(…, null): agent_state.value is jsonb NOT NULL, so
  // the old null writes threw on every one of these 6 keys.
  for (const t of TARGET_PAGES) await stateClear(GATHER_PREFIX + t.label);
  await stateClear(CURSOR_KEY);
}

// ---------- Phases 2 & 3: Panel + synthesis ----------

const CLAUDE_LENS = `${RECOMMENDATION_GUARDRAILS}
${knowledgeBlock()}
You are a brand and conversion-copy reviewer for EnviroCare Pest Control (68-year family pest control company in Alabama). Read the gathered site data and screenshots. Focus on: brand voice consistency, copy clarity, conversion intent (does each page push toward call/quote?), trust signals, missing reassurances. Be specific: name the page, quote the problematic copy if you can see it, propose a concrete rewrite. 6-10 bullets max. No vague advice.`;

const GEMINI_LENS = `You are a visual and UX design reviewer. Look at the screenshots and structural data provided. Focus on: visual hierarchy, whitespace, mobile readability, image quality, color contrast, CTA prominence, layout consistency across pages. Identify SPECIFIC visual problems with SPECIFIC pages — e.g. "the mosquito hero image is washed out on mobile" not "improve imagery." 6-10 bullets max.`;

const GPT_LENS = `You are a technical SEO auditor. Read the gathered SEO signals + PageSpeed scores. Focus on: title/description length and quality, H1 hierarchy, JSON-LD coverage (LocalBusiness, Service, BreadcrumbList expected), Core Web Vitals (LCP/CLS/TBT thresholds), canonical correctness, schema validation issues. Cite specific numbers and threshold-fail cases. 6-10 bullets max.`;

async function panelReview(gatheredData, screenshots) {
  const context = JSON.stringify(gatheredData, null, 2);
  // The priority label is not decoration — persistFindings() derives each
  // finding's severity from it (see severityForRecommendation). The synthesizer
  // already emitted these labels most of the time; asking for them explicitly
  // is what turns "most of the time" into a contract, so unlabeled
  // recommendations stop silently defaulting to info.
  const task = `Review envirocarellc.com — 5 key pages — across visual/UX, brand/copy, and SEO/performance dimensions.

Every entry in "recommendations" MUST begin with exactly one priority label, followed by a colon:
  "IMMEDIATE:" fix within 24-48 hrs — actively costing calls, or factually wrong (e.g. a wrong phone number)
  "HIGH:"      this sprint
  "MEDIUM:"    next sprint
  "LOW:"       backlog
Use the bare label. Do not invent other prefixes, and do not label by topic ("ACCESSIBILITY:", "PROCESS:") — put the topic after the label.`;

  // Cap screenshots so we don't blow request size — first 3 pages only.
  const limitedScreenshots = screenshots.slice(0, 3);

  const panel = await runPanel({
    task,
    context,
    attachments: limitedScreenshots,
    claude: { system: CLAUDE_LENS },
    gemini: { system: GEMINI_LENS },
    gpt: { system: GPT_LENS },
  });

  const synthesis = await synthesize(task, panel);
  return { panel, synthesis };
}

// ---------- Phase 4: Critic loop on the brief ----------

const RUBRIC = `
- Covers all three dimensions: visual/UX, brand/copy, SEO/performance
- Each recommendation names the specific page or URL
- Each recommendation cites a specific number where applicable (score, ms, count, byte size)
- Each recommendation has a concrete action (not "improve X" — say what to change to what)
- At least one cross-agent connection noted (or explicit "no peer findings to connect")
- No vague phrases ("optimize images", "improve UX", "monitor closely") without specifics
- 7-12 bullets in the final brief, lead with highest impact
- No preamble, no sign-off`;

// ---------- Phase 5: Persist ----------

// Severity comes from the recommendation's OWN leading priority label, never
// from scanning its prose.
//
// The old rule regex-scanned the whole string: /critical|broken|missing schema/
// then /below|warn|low|slow|poor/. Measured against real 2026-08-16 output, it
// was wrong more often than right —
//   "MEDIUM PRIORITY (next sprint): … preload critical assets"  -> CRITICAL
//   "LOW PRIORITY (backlog): Add a standardized response-time…"  -> WARNING
//   "HIGH PRIORITY (this sprint): Revise the Termite page H1…"   -> info
//   "IMMEDIATE (24–48 hrs): Correct the Birmingham phone number" -> info
//   "ACCESSIBILITY: Fix the yellow-on-light-green contrast…"     -> WARNING
//                                     ^ matched /low/ inside "yellow"
// — which is how one day produced 71 criticals that were mostly next-sprint and
// backlog items, while the genuinely urgent ones filed as info.
//
// Anchoring to the START of the string is the whole fix: a label only counts
// when the synthesizer emitted it as a label. Prose is never consulted, so
// "critical assets" and "yellow" cannot vote.
//
// Observed label vocabulary, all three punctuation styles the synthesizer uses
// ("LABEL:", "LABEL —", "LABEL (qualifier):"):
const PRIORITY_LABEL =
  /^[\s*\-•]*(IMMEDIATE|URGENT|CRITICAL|P0|HIGH|P1|MEDIUM|MED|P2|LOW|BACKLOG|P3)\b(?:\s+PRIORITY)?\s*(?:\([^)]*\))?\s*\**\s*(?::|[—–]|-(?=\s))/i;

// Four label levels folded into the three severities the schema allows. The
// qualifiers the synthesizer attaches are the tell: IMMEDIATE is "24-48 hrs",
// HIGH is "this sprint", MEDIUM is "next sprint", LOW is "backlog".
const SEVERITY_BY_LABEL = {
  IMMEDIATE: "critical", URGENT: "critical", CRITICAL: "critical", P0: "critical",
  HIGH: "critical", P1: "critical",
  MEDIUM: "warning", MED: "warning", P2: "warning",
  LOW: "info", BACKLOG: "info", P3: "info",
};

// An unlabeled recommendation ("PROCESS:", "ACCESSIBILITY:", "CONVERSION:" …)
// is NOT evidence of urgency. It files as info and records label: null, so a
// synthesizer that stops labeling shows up as an info flood rather than as
// silently mis-graded findings.
export function severityForRecommendation(rec) {
  const label = String(rec ?? "").match(PRIORITY_LABEL)?.[1]?.toUpperCase() ?? null;
  return { severity: SEVERITY_BY_LABEL[label] ?? "info", label };
}

async function persistFindings(synthesis, pages) {
  // Recommendations -> findings. Try to attach a URL based on whether the
  // recommendation text mentions a page label or URL.
  const urlLookup = new Map();
  for (const p of pages ?? []) {
    if (p.url) urlLookup.set(p.label?.toLowerCase() ?? "", p.url);
  }

  for (const rec of synthesis.recommendations ?? []) {
    let url = null;
    for (const [label, u] of urlLookup.entries()) {
      if (label && rec.toLowerCase().includes(label)) {
        url = u;
        break;
      }
    }
    const { severity, label } = severityForRecommendation(rec);
    await writeFinding(AGENT_NAME, "site-review", severity, url, rec, { priority_label: label });
  }

  // First disagreement -> discussion entry (high-signal per CFO playbook).
  if (synthesis.disagreements?.length > 0) {
    await writeDiscussion({
      agentName: AGENT_NAME,
      referencesAgent: null,
      referencesFindingId: null,
      message: `Panel disagreement: ${synthesis.disagreements[0]}`,
      impactScore: 7,
      effortScore: 4,
    });
  }
}

// ---------- Entry point ----------

export async function run() {
  // Registry is the kill switch. This agent was marked 'paused' in
  // agent_registry on 2026-08-21 and kept running 16x/day because nothing
  // read the column. It does now.
  const gate = await gateOrSkip(AGENT_NAME);
  if (!gate.allowed) return gate.result;

  const started = Date.now();
  console.log(`[${AGENT_NAME}] Starting (prompt ${PROMPT_VERSION})`);

  // Resume (or start) the gather cycle. The cursor lives in agent_state, so
  // a run killed at the 300s cap loses at most the page it was on — every
  // completed page is checkpointed before the cursor advances.
  let cursor = await stateGet(CURSOR_KEY);
  if (cursor && (Date.now() - new Date(cursor.cycle_started_at).getTime()) / 3.6e6 > CYCLE_STALE_H) {
    console.warn(`[${AGENT_NAME}] cursor from ${cursor.cycle_started_at} is stale — restarting cycle`);
    cursor = null;
  }
  if (!cursor) cursor = { index: 0, cycle_started_at: new Date().toISOString() };

  let gatheredThisRun = 0;
  const pageErrors = [];
  while (
    cursor.index < TARGET_PAGES.length &&
    gatheredThisRun < MAX_PAGES_PER_RUN &&
    Date.now() - started < GATHER_DEADLINE_MS
  ) {
    const page = TARGET_PAGES[cursor.index];
    console.log(`[${AGENT_NAME}] gathering ${cursor.index + 1}/${TARGET_PAGES.length}: ${page.label}`);
    let result;
    try {
      result = await withTimeout(gatherPage(page), PAGE_TIMEOUT_MS, page.label);
    } catch (e) {
      // A slow/broken page costs its own slot, never the whole cycle.
      console.error(`[${AGENT_NAME}] ${page.label}: ${e.message}`);
      pageErrors.push(`${page.label}: ${e.message}`);
      result = { url: page.url, label: page.label, error: e.message, gathered_at: new Date().toISOString() };
    }
    await stateSet(GATHER_PREFIX + page.label, result);
    cursor.index += 1;
    gatheredThisRun += 1;
    await stateSet(CURSOR_KEY, cursor);
  }

  if (cursor.index < TARGET_PAGES.length) {
    const msg = `chunk done: ${cursor.index}/${TARGET_PAGES.length} pages gathered (${gatheredThisRun} this run${pageErrors.length ? `, ${pageErrors.length} page error(s)` : ""}) — resuming next cron tick`;
    console.log(`[${AGENT_NAME}] ${msg}`);
    await logAgentRun(AGENT_NAME, "ok", msg);
    return { chunked: true, gathered: cursor.index, total: TARGET_PAGES.length, pageErrors };
  }

  // All pages gathered. Panel + synthesis is the expensive tail — give it a
  // fresh invocation of its own if this one already spent much of its budget.
  if (Date.now() - started > SYNTH_GATE_MS) {
    const msg = `all ${TARGET_PAGES.length} pages gathered — deferring panel+synthesis to next cron tick (${Math.round((Date.now() - started) / 1000)}s elapsed)`;
    console.log(`[${AGENT_NAME}] ${msg}`);
    await logAgentRun(AGENT_NAME, "ok", msg);
    return { chunked: true, gathered: cursor.index, total: TARGET_PAGES.length, deferredSynthesis: true };
  }

  return await finalizeReview();
}

// Phases 2-5 on the accumulated cycle data, then reset for the next cycle.
async function finalizeReview() {
  const stored = await stateGetAll(GATHER_PREFIX);
  const byLabel = new Map(
    Object.values(stored).filter(Boolean).map((p) => [p.label, p]),
  );
  const pages = TARGET_PAGES.map((t) => byLabel.get(t.label)).filter(Boolean);
  const screenshots = pages
    .filter((p) => p.screenshot)
    .slice(0, 3)
    .map((p) => ({ url: p.url, mediaType: "image/jpeg", base64: p.screenshot }));

  const peers = await readPeerFindings({});
  const gatheredData = {
    pages: pages.map(({ screenshot, ...rest }) => rest),
    peer_findings: peers.findings.slice(0, 10).map((f) => ({
      agent: f.agent_name,
      severity: f.severity,
      finding: f.finding,
    })),
  };

  const { panel, synthesis } = await panelReview(gatheredData, screenshots);

  const final = criticDraft(await criticLoop({
    workerName: AGENT_NAME,
    task: "Site review of envirocarellc.com across visual + performance + SEO/content",
    output: synthesis.brief,
    rubric: RUBRIC,
    revise: async () => {
      // Critic doesn't get a fresh worker pass for cost reasons — return synthesis brief.
      // Future improvement: re-run panel with critic feedback baked into system prompts.
      return synthesis.brief;
    },
    onEscalate: async (output) => {
      console.warn(`[${AGENT_NAME}] critic escalated — returning best draft`);
      await logAgentRun(AGENT_NAME, "escalated", output);
    },
  }));

  await persistFindings(synthesis, gatheredData.pages);

  await stateSet(`${AGENT_NAME}:last-run`, {
    date: new Date().toISOString(),
    brief: final,
    pages_reviewed: gatheredData.pages.map((p) => p.url),
  });

  await clearCycleState();
  await logAgentRun(AGENT_NAME, "ok", final);

  console.log(`[${AGENT_NAME}] Done`);
  return {
    brief: final,
    consensus: synthesis.consensus,
    disagreements: synthesis.disagreements,
    recommendations: synthesis.recommendations,
    panel: {
      claude: panel.claude.error ? `[err: ${panel.claude.error}]` : "ok",
      gemini: panel.gemini.error ? `[err: ${panel.gemini.error}]` : "ok",
      gpt: panel.gpt.error ? `[err: ${panel.gpt.error}]` : "ok",
    },
  };
}
