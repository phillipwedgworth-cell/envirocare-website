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

function computeCost(model, inputTokens, outputTokens) {
  const rates = COST_PER_MTOK[model];
  if (!rates) return 0;
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

  // Fire-and-forget — never block the caller on a logging failure
  if (supabase && agentName) {
    supabase.from('agent_costs').insert({
      agent_name:    agentName,
      run_id:        runId,
      model:         params.model,
      role,
      input_tokens:  inputTokens,
      output_tokens: outputTokens,
      usd_cost:      usdCost,
      duration_ms:   durationMs,
    }).then(({ error }) => {
      if (error) console.warn(`[llm-with-logging] cost insert failed: ${error.message}`);
    });
  }

  return resp;
}
