// agents/proposer.mjs
// The Proposer — reads everything the observer agents found this cycle and
// turns the pile into a SHORT, RANKED, DEDUPED set of specific proposed changes.
//
// Why this exists: site-reviewer + seo-monitor + brightlocal OBSERVE. They each
// emit findings, but nobody decides what to actually DO. The result is a flat
// list mixing real wins with stale noise, and the human becomes the filter.
// The Proposer is that filter, automated: it consolidates, scores impact/effort,
// kills duplicates + already-fixed items, and outputs a "Top changes this cycle"
// list split into SITE and SEO — each item concrete enough to hand to a developer.
//
// It runs AFTER the observer agents in the orchestrator, reading their findings
// from Supabase. It proposes; it does NOT edit the site. Approval stays human
// (or a future approval agent). The critic loop holds it to the no-vague-advice bar.

import { criticLoop } from "./lib/critic.mjs";
import { readFindings, readDiscussions, writeFinding, logAgentRun } from "./lib/supabase.mjs";
import { stateGet, stateSet } from "./lib/kv.mjs";

const AGENT_NAME = "proposer";
const MODEL = "claude-sonnet-4-6"; // synthesis tier; critic is Opus
const LOOKBACK_HOURS = 24 * 8;     // one weekly cycle + a day of slack

let anthropic = null;
if (process.env.ANTHROPIC_API_KEY) {
  try {
    const mod = await import("@anthropic-ai/sdk");
    const Anthropic = mod.default ?? mod;
    anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  } catch (e) {
    console.error(`[${AGENT_NAME}] failed to import @anthropic-ai/sdk: ${e.message}`);
  }
}

// ---- Business guardrails the Proposer must respect (EnviroCare-specific) ----
// These are FACTS the proposer must not violate when proposing changes.
const HOUSE_RULES = `
EnviroCare business rules the proposal MUST respect (violating any = bad proposal):
- NEVER propose putting customer counts on public pages (e.g. "500+ reviews", "240 homes served"). Phillip considers it tacky. Star rating is fine; counts are not.
- Services OFFERED: bi-monthly perimeter pest control (incl. fire ant + flea), Sentricon termite, mosquito barrier, tick. Carpenter bees = existing-customer add-on, never marketed to new.
- Services NOT offered (never propose adding/promoting): bed bug, wildlife/raccoon/rodent removal, bat, wasp/bee standalone, lawn care.
- $1M Sentricon coverage = EnviroCare's OWN coverage. NEVER propose copy implying Corteva or a manufacturer warranty backs the $1M.
- No bundling DISCOUNTS ever — bundling is framed as convenience (one invoice, one tech), not savings. Don't propose "bundle & save" discount language.
- Alex City office serves BOTH Alexander City AND Lake Martin — never propose labeling it "Lake Martin only".
- Brand: keep Playfair Display + DM Sans, the sunflower logo, green #0E8E40 / gold #F5A800. Don't propose font/logo swaps.
- The single biggest real lever is REVIEW VELOCITY (esp. Huntsville). Weight review-driving proposals accordingly.
- Verify-before-trust: site-reviewer findings can be artifacts. If a finding looks like "page has no title/404" treat as LOW confidence unless corroborated, since the live site has been verified to have proper metadata.
`;

// ---- Pull this cycle's raw material ----
async function gatherFindings() {
  const findings = (await readFindings([], LOOKBACK_HOURS).catch(() => [])) ?? [];
  const discussions = (await readDiscussions([], LOOKBACK_HOURS).catch(() => [])) ?? [];
  // What did we already propose last cycle? Avoid re-proposing the same thing.
  const priorProposals = (await stateGet(`${AGENT_NAME}:last_proposals`)) ?? { items: [] };
  return { findings, discussions, priorProposals };
}

function compact(findings) {
  // Keep the model focused: strip to category/severity/finding/page, drop dupes by text.
  const seen = new Set();
  const rows = [];
  for (const f of findings) {
    const key = (f.finding || "").trim().toLowerCase().slice(0, 120);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    rows.push({
      agent: f.agent_name ?? f.agent ?? "?",
      category: f.category ?? "?",
      severity: f.severity ?? "info",
      page: f.page_url ?? null,
      finding: f.finding,
    });
  }
  return rows;
}

const SYSTEM = `You are the Proposer for EnviroCare Pest Control — a solo operator (Phillip) who is time-poor and burned out. Your job: read everything the observer agents found this cycle and produce a SHORT, decision-ready set of PROPOSED CHANGES. You consolidate and decide; you do not pad.

${HOUSE_RULES}

Produce exactly two ranked lists: SITE changes and SEO changes.
- Hard cap: at most 5 SITE proposals and 5 SEO proposals. Fewer is better. If only 2 things truly matter this cycle, propose 2.
- DEDUPE aggressively: if three agents said the same thing, it's ONE proposal.
- DROP anything already proposed in prior cycles (listed below) unless status changed.
- DROP low-confidence artifacts (e.g. "missing title tag", "404") unless corroborated by a second signal — the live site is known to have proper metadata.
- Every proposal MUST have: a one-line WHAT (the specific change), a WHY (the finding/metric behind it), IMPACT (high/med/low), EFFORT (S/M/L), and OWNER (dev = code change for Claude Code, ops = Phillip action like reviews/GBP, copy = wording change).
- Rank within each list by impact-per-effort (high-impact + low-effort first).
- No vague verbs. "Improve SEO" / "optimize" / "monitor" are banned. Say the exact change.

Output format (plain text, no preamble):

SITE CHANGES
1. [IMPACT·EFFORT·OWNER] WHAT — WHY
2. ...

SEO CHANGES
1. [IMPACT·EFFORT·OWNER] WHAT — WHY
2. ...

THIS CYCLE'S ONE THING: <the single highest-leverage item across both lists, one line>`;

async function draft(feedback = null) {
  if (!anthropic) throw new Error("ANTHROPIC_API_KEY is not set");
  const { findings, discussions, priorProposals } = await gatherFindings();
  const rows = compact(findings);

  if (rows.length === 0) {
    return "SITE CHANGES\n(none — no findings this cycle)\n\nSEO CHANGES\n(none — no findings this cycle)\n\nTHIS CYCLE'S ONE THING: No new agent findings this cycle; nothing to propose.";
  }

  const findingsBlock = rows
    .map((r) => `- [${r.severity}] (${r.agent}/${r.category}) ${r.page ? r.page + " — " : ""}${r.finding}`)
    .join("\n");

  const priorBlock = (priorProposals.items || []).length
    ? priorProposals.items.map((p) => `- ${p}`).join("\n")
    : "(none recorded)";

  const user = `THIS CYCLE'S RAW FINDINGS (${rows.length}, deduped):\n${findingsBlock}\n\nCROSS-AGENT DISCUSSION COUNT: ${discussions.length}\n\nALREADY PROPOSED IN PRIOR CYCLES (do not repeat unless status changed):\n${priorBlock}\n${feedback ? `\nCRITIC FEEDBACK to address before emitting:\n${feedback}` : ""}`;

  const resp = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1600,
    system: SYSTEM,
    messages: [{ role: "user", content: user }],
  });
  return resp.content.find((b) => b.type === "text")?.text?.trim() ?? "";
}

export async function run() {
  console.log(`[${AGENT_NAME}] Starting`);

  let proposal;
  try {
    proposal = await draft();
  } catch (err) {
    console.error(`[${AGENT_NAME}] draft failed: ${err.message}`);
    await logAgentRun(AGENT_NAME, "error", err.message).catch(() => {});
    throw err;
  }

  const rubric = `
- At most 5 SITE + 5 SEO proposals; fewer is fine. Reject bloated lists.
- Every proposal has WHAT, WHY, IMPACT (high/med/low), EFFORT (S/M/L), OWNER (dev/ops/copy).
- No banned vague verbs (improve/optimize/monitor/enhance) standing in for a specific change.
- No proposal violates any EnviroCare house rule (customer counts, services-not-offered, Corteva/$1M, bundling-discount, logo/font swap, "Lake Martin only").
- Duplicates across agents are merged into one proposal.
- "THIS CYCLE'S ONE THING" names a single concrete highest-leverage item.`;

  const final = await criticLoop({
    workerName: AGENT_NAME,
    task: "Consolidate this cycle's agent findings into a ranked, deduped set of proposed SITE + SEO changes for EnviroCare",
    output: proposal,
    rubric,
    revise: (fb) => draft(fb),
    onEscalate: async (out) => {
      console.warn(`[${AGENT_NAME}] critic escalated — returning best draft`);
      await logAgentRun(AGENT_NAME, "escalated", out).catch(() => {});
    },
  });

  // Persist: write the proposal as a finding (so the command center shows it),
  // and remember the WHAT lines so next cycle can dedupe against them.
  await writeFinding(
    AGENT_NAME,
    "proposal",
    "info",
    null,
    "Ranked change proposals for this cycle (SITE + SEO).",
    { proposal: final },
  ).catch(() => {});

  // Extract the numbered WHAT lines for next-cycle dedupe memory.
  const whatLines = final
    .split("\n")
    .filter((l) => /^\s*\d+\.\s*\[/.test(l))
    .map((l) => l.replace(/^\s*\d+\.\s*/, "").slice(0, 160));
  await stateSet(`${AGENT_NAME}:last_proposals`, { items: whatLines, date: new Date().toISOString() }).catch(() => {});

  await logAgentRun(AGENT_NAME, "ok", final).catch(() => {});
  console.log(`[${AGENT_NAME}] Done — ${whatLines.length} proposals`);
  return final;
}
