// agents/lib/agent-template.mjs
// Copy this file to agents/my-new-agent.mjs and fill in the five sections.
// Delete all comments once you're done — they're scaffolding, not docs.
//
// Pattern: CONTEXT_READ → WORK → CRITIC → WRITE_FINDINGS → NOTIFY
// Every agent follows this shape. The critic loop is non-negotiable.
// Cost logging is automatic via createMessage — no extra work needed.

import { criticLoop, criticDraft }          from './critic.mjs';
import { writeFinding, logAgentRun }         from './supabase.mjs';
import { stateGet, stateSet }               from './kv.mjs';
import { createMessage }                    from './llm-with-logging.mjs';

// ─── CONFIG ────────────────────────────────────────────────────────────────
const AGENT_NAME   = 'my-agent';           // unique slug, matches agent_costs.agent_name
const WORKER_MODEL = 'claude-haiku-4-5-20251001'; // Haiku for tool-use workers; Sonnet for synthesis
// const WORKER_MODEL = 'claude-sonnet-4-6';

let anthropic = null;
if (process.env.ANTHROPIC_API_KEY) {
  try {
    const mod = await import('@anthropic-ai/sdk');
    const Anthropic = mod.default ?? mod;
    anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 0 });
  } catch (e) {
    console.error(`[${AGENT_NAME}] failed to import @anthropic-ai/sdk: ${e.message}`);
  }
}

// ─── SECTION 1: CONTEXT_READ ───────────────────────────────────────────────
// What does this agent need to know before doing its work?
// Read from: Supabase (agent_findings, agent_state), external APIs, env vars.
// Keep this pure — no decisions yet, just data collection.

async function gatherContext() {
  // Example: read prior state for delta tracking
  const lastRun = (await stateGet(`${AGENT_NAME}:last_run`)) ?? null;

  // Example: read peer findings from other agents
  // const { readFindings } = await import('./supabase.mjs');
  // const peerFindings = await readFindings(['site-reviewer', 'seo-monitor'], 168);

  return { lastRun /*, peerFindings */ };
}

// ─── SECTION 2: WORK ───────────────────────────────────────────────────────
// The worker does the actual job. Two patterns:
//
// A) Synthesis (no tools): single LLM call that reads context and writes output.
//    Use for: summarisation, ranking, proposal generation.
//    See: proposer.mjs
//
// B) Agentic tool-use loop: LLM decides which tools to call, you execute them.
//    Use for: data fetching, site auditing, API polling.
//    See: seo-monitor.mjs, brightlocal.mjs

// Pattern A — synthesis worker (uncomment if you don't need tools)
/*
const SYSTEM = `You are ... for EnviroCare Pest Control.`;

async function workerDraft(feedback = null) {
  if (!anthropic) throw new Error('ANTHROPIC_API_KEY missing');
  const ctx = await gatherContext();
  const userContent = `...build prompt from ctx...${feedback ? `\nCRITIC FEEDBACK:\n${feedback}` : ''}`;
  const resp = await createMessage(anthropic, {
    model: WORKER_MODEL,
    max_tokens: 1200,
    system: SYSTEM,
    messages: [{ role: 'user', content: userContent }],
  }, { agentName: AGENT_NAME, role: 'worker' });
  return resp.content.find(b => b.type === 'text')?.text?.trim() ?? '';
}
*/

// Pattern B — agentic tool-use worker
const MAX_TURNS = 15;

const WORKER_SYSTEM = `You are the [describe role] for EnviroCare Pest Control.
YOUR JOB: [one sentence goal]
APPROACH: [numbered steps the model should follow]
FINAL OUTPUT FORMAT: [exact shape of the output the critic will judge]`;

// Define tools the worker can call
const tools = [
  // {
  //   name: 'example_tool',
  //   description: 'What it does and when to use it.',
  //   input_schema: { type: 'object', properties: { param: { type: 'string' } }, required: ['param'] },
  // },
];

// Implement each tool
async function callTool(name, input) {
  switch (name) {
    // case 'example_tool': return await exampleToolImpl(input);
    default: return { error: `Unknown tool: ${name}` };
  }
}

async function workerDraft(feedback = null) {
  if (!anthropic) throw new Error('ANTHROPIC_API_KEY missing');
  const initial = feedback
    ? `Run your task again, addressing this critic feedback:\n\n${feedback}`
    : 'Run your task.';
  const messages = [{ role: 'user', content: initial }];

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    const resp = await createMessage(anthropic, {
      model: WORKER_MODEL,
      max_tokens: 1500,
      system: WORKER_SYSTEM,
      tools,
      messages,
    }, { agentName: AGENT_NAME, role: 'worker' });
    messages.push({ role: 'assistant', content: resp.content });

    if (resp.stop_reason === 'end_turn') {
      return resp.content.find(b => b.type === 'text')?.text?.trim() ?? '';
    }
    if (resp.stop_reason !== 'tool_use') return '';

    const results = [];
    for (const block of resp.content) {
      if (block.type !== 'tool_use') continue;
      console.log(`[${AGENT_NAME}] -> ${block.name}`, JSON.stringify(block.input).slice(0, 120));
      const result = await callTool(block.name, block.input);
      results.push({ type: 'tool_result', tool_use_id: block.id, content: JSON.stringify(result).slice(0, 8000) });
    }
    messages.push({ role: 'user', content: results });
  }
  return '';
}

// ─── SECTION 3: CRITIC ─────────────────────────────────────────────────────
// The rubric is what the critic checks. Every bullet must be verifiable from
// the output alone. If you can't tell from the text whether it passed, rewrite
// the bullet until you can.

const rubric = `
- [Specific measurable requirement 1 — e.g. "Each location named with a % value"]
- [Specific measurable requirement 2]
- No vague verbs ("monitor", "improve", "enhance") without a specific number or name
- Under [N] words, no preamble, no sign-off`;

// ─── SECTION 4: WRITE_FINDINGS ─────────────────────────────────────────────
// Store the output in Supabase so other agents (and the proposer) can read it.
// Also save any state needed for next-run delta tracking.

async function writeFindings(final) {
  await writeFinding(
    AGENT_NAME,
    'your-category',  // category label — 'seo' | 'site' | 'citations' | 'proposal' | etc.
    'info',           // severity — 'info' | 'warning' | 'critical'
    null,             // page_url — null unless this finding is page-specific
    'One-line summary of what was found.',
    { detail: final },
  );
  // Save state for next-run delta
  await stateSet(`${AGENT_NAME}:last_run`, { date: new Date().toISOString(), summary: final.slice(0, 200) });
}

// ─── SECTION 5: NOTIFY ─────────────────────────────────────────────────────
// Agents generally do NOT notify directly — the orchestrator synthesises all
// findings into one weekly digest. Only override this if the finding is
// time-critical (e.g. site down, massive SoLV drop).
//
// To notify immediately:
//   const { notifyDigest } = await import('./notify.mjs');
//   await notifyDigest({ subject: '...', body: final });

// ─── ENTRY POINT ───────────────────────────────────────────────────────────
// Export run() — this is what orchestrator.mjs calls.

export async function run() {
  console.log(`[${AGENT_NAME}] Starting`);

  let draft;
  try {
    draft = await workerDraft();
  } catch (e) {
    console.error(`[${AGENT_NAME}] worker failed: ${e.message}`);
    await logAgentRun(AGENT_NAME, 'error', e.message).catch(() => {});
    throw e;
  }

  // ── CRITIC ──
  const final = criticDraft(await criticLoop({
    workerName: AGENT_NAME,
    task: 'Describe the task in one sentence — same as the job description above',
    output: draft,
    rubric,
    revise: (fb) => workerDraft(fb),
    onEscalate: async (out) => {
      console.warn(`[${AGENT_NAME}] critic escalated — returning best draft`);
      await logAgentRun(AGENT_NAME, 'escalated', out).catch(() => {});
    },
  }));

  // ── WRITE_FINDINGS ──
  await writeFindings(final).catch(() => {});

  // ── LOG ──
  await logAgentRun(AGENT_NAME, 'ok', final).catch(() => {});
  console.log(`[${AGENT_NAME}] Done`);
  return final;
}
