// agents/orchestrator.mjs
// The conductor — runs all available agents, collects findings, runs a
// Sonnet synthesis across them, and emails one digest via Resend.

import { logAgentRun, readFindings, readDiscussions } from "./lib/supabase.mjs";
import { createMessage } from "./lib/llm-with-logging.mjs";

// Static imports so Next.js bundler ships the agent files to the lambda.
// Earlier we used dynamic await import("./brightlocal.mjs") with relative
// strings — Next.js doesn't trace those at build time, so the files
// silently weren't in the bundle and every agent reported "skipped" at
// runtime. Each agent module exports { run }.
import { run as runBrightlocal } from "./brightlocal.mjs";
import { run as runSeoMonitor } from "./seo-monitor.mjs";
import { run as runCfoAgent } from "./cfo-agent.mjs";
import { run as runSiteReviewer } from "./site-reviewer.mjs";
import { run as runProposer } from "./proposer.mjs";

const ORCHESTRATOR_MODEL = "claude-sonnet-4-6";
const PROMPT_VERSION = "2026-05-28";

// Order matters for digest readability but not correctness.
const AGENT_REGISTRY = [
  { name: "brightlocal",   run: runBrightlocal },
  { name: "seo-monitor",   run: runSeoMonitor },
  { name: "cfo-agent",     run: runCfoAgent },
  { name: "site-reviewer", run: runSiteReviewer },
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
    console.error(`[orchestrator] ${anthropicInitError}`);
  }
}

let resend = null;
if (process.env.RESEND_API_KEY) {
  try {
    const mod = await import("resend");
    const Resend = mod.Resend ?? mod.default;
    resend = new Resend(process.env.RESEND_API_KEY);
  } catch (e) {
    console.error(`[orchestrator] failed to load resend: ${e.message}`);
  }
}

async function runAllAgents() {
  // Run agents in parallel — each is independent (separate APIs, separate
  // critic loops). Sequential awaited a sum of runtimes (~7-10 min total)
  // which blew through Vercel's 300s function timeout. Parallel collapses
  // total wall time to max(any one agent), comfortably under the limit.
  // Promise.allSettled so one agent throwing doesn't abort the rest.
  const settled = await Promise.allSettled(
    AGENT_REGISTRY.map(async ({ name, run: fn }) => {
      if (typeof fn !== "function") {
        console.log(`[orchestrator] skipping ${name} (run export missing)`);
        return [name, { skipped: true, reason: "run export missing" }];
      }
      console.log(`[orchestrator] running ${name}`);
      try {
        const result = await fn();
        return [name, typeof result === "string" ? { brief: result } : result];
      } catch (e) {
        console.error(`[orchestrator] ${name} failed: ${e.message}`);
        return [name, { error: e.message }];
      }
    }),
  );
  const outputs = {};
  for (const r of settled) {
    if (r.status === "fulfilled") {
      const [name, value] = r.value;
      outputs[name] = value;
    } else {
      // Should not happen — the inner try/catch handles agent throws.
      console.error(`[orchestrator] unexpected rejection: ${r.reason}`);
    }
  }
  return outputs;
}

async function synthesizeDigest(outputs, findings, discussions, proposerOut = null) {
  if (!anthropic) {
    return {
      brief: `[orchestrator synthesis unavailable — ${anthropicInitError ?? "Anthropic client not initialized"}]`,
      raw_outputs: outputs,
    };
  }

  const agentBlocks = Object.entries(outputs)
    .filter(([, v]) => !v.skipped)
    .map(([name, v]) => {
      if (v.error) return `## ${name}\n[ERROR] ${v.error}`;
      return `## ${name}\n${v.brief ?? ""}\n${
        v.recommendations?.length ? `\nRECOMMENDATIONS:\n- ${v.recommendations.join("\n- ")}` : ""
      }`;
    })
    .join("\n\n");

  const findingsBlock = findings
    .slice(0, 30)
    .map(
      (f) =>
        `- [${f.agent_name}/${f.severity}] ${f.finding}${f.page_url ? ` (${f.page_url})` : ""}`,
    )
    .join("\n");

  const discussionBlock = discussions
    .slice(0, 15)
    .map(
      (d) =>
        `- ${d.agent_name}→${d.references_agent ?? "all"} (impact ${d.impact_score}/effort ${d.effort_score}): ${d.message}`,
    )
    .join("\n");

  const system = `You are the conductor of EnviroCare's agent panel. Your job: read every agent's brief, read the shared findings + cross-agent discussions, and produce ONE Monday morning digest for the operator (Phillip, solo, Mon/Wed/Fri sessions).

OUTPUT FORMAT — Markdown, this exact structure:

# Monday Digest — [today's date]

## TL;DR (3 lines)
The most important things to know before opening anything else.

## Top 3 Actions This Week
Numbered list. Each item: what to do, why (which finding/agent flagged it), and rough effort (15 min / 1 hr / 1 session).

## Per-Agent Highlights
For each agent that ran (skip ones that didn't): 2-3 bullets max.

## Cross-Agent Signals
The most interesting *combinations* of findings — where two agents independently flagged related things. Quote impact/effort scores from the discussions block.

## What I'm Not Acting On
Lower-priority findings worth mentioning but not this week.

Rules: specific numbers, named pages/locations, no generic advice, no preamble.

PROMPT VERSION: ${PROMPT_VERSION}`;

  const prompt = `${proposerOut ? `PROPOSER RANKED CHANGE LIST (lead the digest with this — these are the specific actions for this week):\n${proposerOut}\n\n` : ""}AGENT OUTPUTS
${agentBlocks || "[no agents ran]"}

LAST 24H FINDINGS (shared agent_findings)
${findingsBlock || "[none]"}

CROSS-AGENT DISCUSSIONS (last 24h)
${discussionBlock || "[none]"}`;

  try {
    const resp = await createMessage(anthropic, {
      model: ORCHESTRATOR_MODEL,
      max_tokens: 2500,
      system,
      messages: [{ role: "user", content: prompt }],
    }, { agentName: 'orchestrator', role: 'worker' });
    const text = resp.content.find((b) => b.type === "text")?.text?.trim() ?? "";
    return { brief: text, raw_outputs: outputs };
  } catch (e) {
    return {
      brief: `[orchestrator synthesis error: ${e.message}]`,
      raw_outputs: outputs,
    };
  }
}

function markdownToHtml(md) {
  // Minimal converter — Resend renders HTML and we want headings + lists.
  return md
    .split("\n")
    .map((line) => {
      if (line.startsWith("# ")) return `<h1>${line.slice(2)}</h1>`;
      if (line.startsWith("## ")) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith("### ")) return `<h3>${line.slice(4)}</h3>`;
      if (line.match(/^\d+\.\s/)) return `<p>${line}</p>`;
      if (line.startsWith("- ")) return `<li>${line.slice(2)}</li>`;
      if (line.trim() === "") return "<br/>";
      return `<p>${line}</p>`;
    })
    .join("\n");
}

async function sendDigest(brief) {
  if (!resend) {
    console.log("[orchestrator] Resend not configured — digest not sent");
    return { sent: false, reason: "resend_unavailable" };
  }
  const to = process.env.NOTIFY_EMAIL ?? "phillipwedgworth@gmail.com";
  const from = process.env.NOTIFY_FROM ?? "onboarding@resend.dev";
  try {
    const today = new Date().toISOString().slice(0, 10);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `EnviroCare Monday Digest — ${today}`,
      html: markdownToHtml(brief),
      text: brief,
    });
    if (error) return { sent: false, reason: error.message };
    return { sent: true };
  } catch (e) {
    return { sent: false, reason: e.message };
  }
}

export async function run() {
  console.log(`[orchestrator] Starting (prompt ${PROMPT_VERSION})`);

  // Round 1: run every agent, each does its own work (gather → panel → critic → persist).
  const outputs = await runAllAgents();

  // Round 2: read what everyone wrote to the shared tables.
  const findings = await readFindings([], 24);
  const discussions = await readDiscussions([], 24);

  // Round 2b: Proposer reads findings and produces a ranked change list.
  let proposerOut = null;
  try {
    proposerOut = await runProposer();
  } catch (e) {
    console.error("[orchestrator] proposer failed:", e.message);
  }

  // Round 3: Sonnet synthesizes the Monday digest.
  const { brief, raw_outputs } = await synthesizeDigest(outputs, findings, discussions, proposerOut);

  // Round 4: email it.
  const emailResult = await sendDigest(brief);
  console.log(`[orchestrator] email: ${JSON.stringify(emailResult)}`);

  await logAgentRun("orchestrator", "ok", brief);

  console.log("[orchestrator] Done");
  return {
    brief,
    email: emailResult,
    agents: Object.fromEntries(
      Object.entries(raw_outputs).map(([k, v]) => [
        k,
        v.skipped ? "skipped" : v.error ? `error: ${v.error}` : "ok",
      ]),
    ),
    findings_count: findings.length,
    discussions_count: discussions.length,
  };
}
