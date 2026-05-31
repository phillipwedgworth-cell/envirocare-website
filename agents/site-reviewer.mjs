// agents/site-reviewer.mjs
// Site reviewer — visual + performance + SEO/content in one agent.
//
// Architecture:
//   Phase 1  Worker (Haiku tool-use) gathers data — fetches pages, runs
//            PageSpeed (which returns a screenshot), parses SEO signals,
//            reads peer agents' findings.
//   Phase 2  Multi-model panel (Claude/Gemini/GPT) reviews the gathered
//            data + screenshots. Gemini is the visual lens; GPT is the
//            SEO/technical lens; Claude is the copy/brand lens.
//   Phase 3  Sonnet synthesizes the three lenses into a brief +
//            structured findings + recommendations.
//   Phase 4  Critic loop (Opus) holds the brief to the team rubric.
//   Phase 5  Persist: writeFinding per recommendation, writeDiscussion
//            for cross-agent connections, stateSet for next-run delta.

import { criticLoop } from "./lib/critic.mjs";
import { stateGet, stateSet } from "./lib/kv.mjs";
import {
  writeFinding,
  writeDiscussion,
  readDiscussions,
  readFindings,
  logAgentRun,
} from "./lib/supabase.mjs";
import { runPanel, synthesize } from "../lib/llm-panel.ts";

const AGENT_NAME = "site-reviewer";
const WORKER_MODEL = "claude-haiku-4-5-20251001";
const MAX_TURNS = 25;
const PROMPT_VERSION = "2026-05-28";

const TARGET_PAGES = [
  { url: "https://www.envirocarellc.com/", label: "home" },
  { url: "https://www.envirocarellc.com/services/mosquito-control", label: "mosquito" },
  { url: "https://www.envirocarellc.com/services/termite-control", label: "termite" },
  { url: "https://www.envirocarellc.com/huntsville", label: "huntsville" },
  { url: "https://www.envirocarellc.com/birmingham", label: "birmingham" },
];

let anthropic = null;
let anthropicInitError = null;
if (!process.env.ANTHROPIC_API_KEY) {
  anthropicInitError = "ANTHROPIC_API_KEY is not set in this environment";
} else {
  try {
    const mod = await import("@anthropic-ai/sdk");
    const Anthropic = mod.default ?? mod;
    anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  } catch (e) {
    anthropicInitError = `@anthropic-ai/sdk failed to load: ${e.message}`;
    console.error(`[${AGENT_NAME}] ${anthropicInitError}`);
  }
}

// ---------- Tool implementations ----------

async function listTargetPages() {
  return { pages: TARGET_PAGES };
}

async function fetchPage({ url }) {
  try {
    const r = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 EnviroCareSiteReviewer/1.0" },
    });
    if (!r.ok) return { error: `HTTP ${r.status}` };
    const html = await r.text();
    return { url, status: r.status, html: html.slice(0, 40000) };
  } catch (e) {
    return { error: e.message };
  }
}

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
    const r = await fetch(apiUrl);
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
    return { error: e.message };
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

async function extractSeoSignals({ html }) {
  if (!html) return { error: "No HTML provided" };
  return parseSeoSignals(html);
}

async function readLastReview({ url }) {
  const prior = await stateGet(`${AGENT_NAME}:page:${url}`);
  return prior ?? { date: null, summary: null };
}

async function readPeerFindings({ agents = [], hoursBack = 168 }) {
  const findings = await readFindings(agents, hoursBack);
  const discussions = await readDiscussions(agents, hoursBack);
  return {
    findings: findings.slice(0, 20),
    discussions: discussions.slice(0, 20),
  };
}

// ---------- Tool schema (worker sees these) ----------

const tools = [
  {
    name: "list_target_pages",
    description: "List the EnviroCare pages this agent should review.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "fetch_page",
    description: "Fetch raw HTML for a URL (truncated to 40k chars).",
    input_schema: {
      type: "object",
      properties: { url: { type: "string" } },
      required: ["url"],
    },
  },
  {
    name: "run_pagespeed",
    description:
      "Run Google PageSpeed Insights for a URL. Returns performance/SEO/a11y scores, Core Web Vitals (LCP/CLS/TBT), and a screenshot (will be passed to the vision panel — you don't see it).",
    input_schema: {
      type: "object",
      properties: {
        url: { type: "string" },
        strategy: { type: "string", enum: ["mobile", "desktop"] },
      },
      required: ["url"],
    },
  },
  {
    name: "extract_seo_signals",
    description:
      "Parse SEO signals from HTML you previously fetched. Returns title, meta description, H1/H2 counts, JSON-LD @types, canonical, OG tags.",
    input_schema: {
      type: "object",
      properties: { html: { type: "string" } },
      required: ["html"],
    },
  },
  {
    name: "read_last_review",
    description: "Read this agent's prior review for a URL.",
    input_schema: {
      type: "object",
      properties: { url: { type: "string" } },
      required: ["url"],
    },
  },
  {
    name: "read_peer_findings",
    description:
      "Read recent findings + discussions from other agents (brightlocal, cfo-agent, etc). Use to surface cross-agent connections.",
    input_schema: {
      type: "object",
      properties: {
        agents: { type: "array", items: { type: "string" } },
        hoursBack: { type: "integer" },
      },
    },
  },
];

// Strip large/binary fields before echoing tool results back into the LLM context.
function stripHeavy(result) {
  if (!result || typeof result !== "object") return result;
  const out = { ...result };
  if (out.html) {
    out.html_size = out.html.length;
    delete out.html;
  }
  if (out._screenshot_b64) {
    out._screenshot_b64 = "[stored separately for panel]";
  }
  return out;
}

async function callTool(name, input, screenshotStore) {
  switch (name) {
    case "list_target_pages":
      return await listTargetPages();
    case "fetch_page":
      return await fetchPage(input);
    case "run_pagespeed": {
      const result = await runPageSpeed(input);
      if (result?._screenshot_b64) {
        screenshotStore.push({
          url: result.url,
          mediaType: "image/jpeg",
          base64: result._screenshot_b64,
        });
      }
      return result;
    }
    case "extract_seo_signals":
      return await extractSeoSignals(input);
    case "read_last_review":
      return await readLastReview(input);
    case "read_peer_findings":
      return await readPeerFindings(input);
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

// ---------- Phase 1: Worker (data gathering) ----------

const WORKER_SYSTEM = `You are the data-gatherer for EnviroCare Pest Control's site review (envirocarellc.com — Alabaster, Huntsville, Alex City).

YOUR JOB
Gather raw data — do NOT write analysis. The multi-model panel will analyze afterward.

APPROACH (you choose order)
1. read_peer_findings to see what BrightLocal/CFO/other agents have reported recently.
2. list_target_pages.
3. For each target page: run_pagespeed (mobile), then fetch_page, then extract_seo_signals on the HTML.
4. Stop once you've covered every target page.

OUTPUT (final message, JSON only — no prose, no markdown fences)
{
  "pages": [
    {
      "url": "...",
      "label": "...",
      "pagespeed": { ... full result },
      "seo": { ... full result }
    }
  ],
  "peer_findings_summary": "1-2 sentence summary of what other agents have flagged that's relevant to this review"
}

PROMPT VERSION: ${PROMPT_VERSION}`;

async function gatherData() {
  if (!anthropic) throw new Error(anthropicInitError ?? "Anthropic client unavailable — cannot run worker");

  const screenshots = [];
  const messages = [{ role: "user", content: "Begin gathering site data for the weekly review." }];

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    const resp = await anthropic.messages.create({
      model: WORKER_MODEL,
      max_tokens: 2500,
      system: WORKER_SYSTEM,
      tools,
      messages,
    });
    messages.push({ role: "assistant", content: resp.content });

    if (resp.stop_reason === "end_turn") {
      const text = resp.content.find((b) => b.type === "text")?.text?.trim() ?? "";
      const cleaned = text
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
      let data;
      try {
        data = JSON.parse(cleaned);
      } catch (e) {
        data = { pages: [], peer_findings_summary: "", raw: text };
      }
      return { data, screenshots };
    }

    if (resp.stop_reason !== "tool_use") return { data: { pages: [] }, screenshots };

    const toolResults = [];
    for (const block of resp.content) {
      if (block.type !== "tool_use") continue;
      console.log(`[${AGENT_NAME}] -> ${block.name}`, JSON.stringify(block.input).slice(0, 160));
      const result = await callTool(block.name, block.input, screenshots);
      toolResults.push({
        type: "tool_result",
        tool_use_id: block.id,
        content: JSON.stringify(stripHeavy(result)).slice(0, 12000),
      });
    }
    messages.push({ role: "user", content: toolResults });
  }
  return { data: { pages: [], peer_findings_summary: "[max turns reached]" }, screenshots };
}

// ---------- Phases 2 & 3: Panel + synthesis ----------

const CLAUDE_LENS = `You are a brand and conversion-copy reviewer for EnviroCare Pest Control (68-year family pest control company in Alabama). Read the gathered site data and screenshots. Focus on: brand voice consistency, copy clarity, conversion intent (does each page push toward call/quote?), trust signals, missing reassurances. Be specific: name the page, quote the problematic copy if you can see it, propose a concrete rewrite. 6-10 bullets max. No vague advice.`;

const GEMINI_LENS = `You are a visual and UX design reviewer. Look at the screenshots and structural data provided. Focus on: visual hierarchy, whitespace, mobile readability, image quality, color contrast, CTA prominence, layout consistency across pages. Identify SPECIFIC visual problems with SPECIFIC pages — e.g. "the mosquito hero image is washed out on mobile" not "improve imagery." 6-10 bullets max.`;

const GPT_LENS = `You are a technical SEO auditor. Read the gathered SEO signals + PageSpeed scores. Focus on: title/description length and quality, H1 hierarchy, JSON-LD coverage (LocalBusiness, Service, BreadcrumbList expected), Core Web Vitals (LCP/CLS/TBT thresholds), canonical correctness, schema validation issues. Cite specific numbers and threshold-fail cases. 6-10 bullets max.`;

async function panelReview(gatheredData, screenshots) {
  const context = JSON.stringify(gatheredData, null, 2);
  const task = "Review envirocarellc.com — 5 key pages — across visual/UX, brand/copy, and SEO/performance dimensions.";

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
    const severity = /critical|broken|missing schema|0\/100/i.test(rec)
      ? "critical"
      : /below|warn|low|slow|poor/i.test(rec)
        ? "warning"
        : "info";
    await writeFinding(AGENT_NAME, "site-review", severity, url, rec, {});
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
  console.log(`[${AGENT_NAME}] Starting (prompt ${PROMPT_VERSION})`);

  let gathered;
  try {
    gathered = await gatherData();
  } catch (e) {
    console.error(`[${AGENT_NAME}] gather failed: ${e.message}`);
    await logAgentRun(AGENT_NAME, "error", `gather: ${e.message}`);
    throw e;
  }

  const { panel, synthesis } = await panelReview(gathered.data, gathered.screenshots);

  const final = await criticLoop({
    workerName: AGENT_NAME,
    task: "Weekly site review of envirocarellc.com across visual + performance + SEO/content",
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
  });

  await persistFindings(synthesis, gathered.data?.pages);

  await stateSet(`${AGENT_NAME}:last-run`, {
    date: new Date().toISOString(),
    brief: final,
    pages_reviewed: (gathered.data?.pages ?? []).map((p) => p.url),
  });

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
