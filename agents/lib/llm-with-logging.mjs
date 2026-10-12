// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/lib/llm-with-logging.mjs
// Commit: fix(agents): fleet at top form — cost_usd/usd_cost unified, run rows always dated, site-reviewer dedup+unpause, aeo-watch failure finalizer, NeuronWriter hard budget, BrightLocal false-zero guard, seo-monitor baseline fallback, crew on schedule
// Push: main (via branch + PR)
// ─────────────────────────────────────
// agents/lib/llm-with-logging.mjs
// Drop-in wrapper around anthropic.messages.create that logs every LLM call
// to agent_costs. Import createMessage() and use it everywhere instead of
// calling anthropic.messages.create() directly.
//
// Usage:
//   import { createMessage } from './lib/llm-with-logging.mjs';
//   const resp = await createMessage(anthropic, params, { agentName, runId, role });
//
// The response object is returned unchanged so callers need zero other edits.

import { supabase } from './supabase.mjs';

// USD cost per million tokens (update when Anthropic changes pricing)
const COST_PER_MTOK = {
  'claude-opus-4-8':           { input: 15.00, output: 75.00 },
  'claude-opus-4-7':           { input: 15.00, output: 75.00 },
  'claude-sonnet-4-6':         { input:  3.00, output: 15.00 },
  'claude-haiku-4-5-20251001': { input:  0.80, output:  4.00 },
  'claude-haiku-4-5':          { input:  0.80, output:  4.00 },
};

// Unknown model: bill at Sonnet rates and say so, rather than recording $0.
// A wrong-but-visible estimate gets corrected; a silent zero was invisible
// for six weeks (1,492 calls, $0.00 total, Sep 4 2026).
const FALLBACK_RATES = { input: 3.00, output: 15.00 };
function computeCost(model, inputTokens, outputTokens) {
  let rates = COST_PER_MTOK[model];
  if (!rates) {
    console.warn(`[llm-with-logging] no rate card for model "${model}" — billing at Sonnet rates; add it to COST_PER_MTOK`);
    rates = FALLBACK_RATES;
  }
  return (inputTokens / 1_000_000) * rates.input +
         (outputTokens / 1_000_000) * rates.output;
}

export async function createMessage(anthropic, params, { agentName, runId = null, role = 'worker' } = {}) {
  const t0 = Date.now();
  const resp = await anthropic.messages.create(params);
  const durationMs = Date.now() - t0;

  const inputTokens  = resp.usage?.input_tokens  ?? 0;
  const outputTokens = resp.usage?.output_tokens ?? 0;
  const usdCost = computeCost(params.model, inputTokens, outputTokens);

  // AWAITED, NOT FIRE-AND-FORGET. 2026-09-06.
  //
  // This used to be `.insert(...).then(...)` with no await, on the reasoning
  // that a logging write must never block the caller. That reasoning is sound
  // and the implementation was still wrong, because an unawaited promise is not
  // "non-blocking" — in a serverless invocation it is CANCELLED.
  //
  // What it cost: agent_costs took its last row at 2026-08-23 09:05 and then
  // nothing at all for thirteen days, while the agents kept running and kept
  // producing output. Measured 2026-09-06 — 8,052 rows total, and the last five
  // agents to write one (brightlocal 09:02, seo-monitor 09:02, site-reviewer
  // 09:03, proposer 09:04, orchestrator 09:05) all stopped within the SAME
  // three minutes of the SAME run. That is not five agents breaking; it is one
  // host changing behaviour.
  //
  // The host is Vercel. vercel.json runs /api/orchestrator/run on cron at 09:00
  // UTC, and that route awaits runOrchestrator() and returns a response. When
  // the response returns, the invocation is frozen and any I/O still in flight
  // is discarded. Everything this fleet AWAITS survived that (agent_runs rows
  // for proposer/seo-monitor/orchestrator are still landing daily, written by
  // logAgentRun in the same client from the same process); the one write that
  // was not awaited is the one that vanished. The only agent still logging
  // costs — morning-brief, which wrote a row on 2026-09-06 — is the one that
  // runs as a plain GitHub Actions process that lives on past the call.
  //
  // Ruled out on the way here, so nobody re-checks them: the table is not
  // missing (8,052 rows), the client is not null (logAgentRun writes from it),
  // RLS is not blocking (agent_runs has RLS on and zero policies and still
  // accepts inserts, so the key is service_role), and no column is missing.
  //
  // Awaiting costs ~100ms per LLM call. The catch keeps the original promise:
  // a logging failure still cannot break a caller, it just cannot silently
  // disappear either.
  if (supabase && agentName) {
    try {
      const { error } = await supabase.from('agent_costs').insert({
        agent_name:    agentName,
        run_id:        runId,
        model:         params.model,
        role,
        input_tokens:  inputTokens,
        output_tokens: outputTokens,
        // agent_costs carries BOTH cost_usd (what every reader sums) and usd_cost
        // (what this writer historically filled). Write both; migration 0005 adds
        // a trigger that keeps them equal so this split can never reopen.
        cost_usd:      usdCost,
        usd_cost:      usdCost,
        duration_ms:   durationMs,
      });
      if (error) console.warn(`[llm-with-logging] cost insert failed: ${error.message}`);
    } catch (e) {
      console.warn(`[llm-with-logging] cost insert threw: ${e.message}`);
    }
  }

  return resp;
}
