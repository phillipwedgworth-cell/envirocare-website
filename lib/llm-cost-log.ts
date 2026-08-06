// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: lib/llm-cost-log.ts
// Commit: docs(agents): retire stale gemini-1.5 note in cost table
// Push: main

// lib/llm-cost-log.ts
//
// WHY THIS EXISTS
// agents/lib/llm-with-logging.mjs logs Anthropic calls made from the agents/
// folder. It cannot cover lib/llm-panel.ts, which is TypeScript on the app side
// and calls three providers through raw fetch(). That panel is site-reviewer's
// engine and was the single largest line in the spend estimate — and it wrote
// nothing to agent_costs. This module closes that gap.
//
// Same table, same columns, same fire-and-forget contract, so the Command Center
// LLM Spend panel picks these rows up with no changes.

import { createClient } from '@supabase/supabase-js';

// ── Rates: USD per million tokens ──────────────────────────────────────────
// Anthropic rates from the model catalog (Opus 4.8 $5/$25, Sonnet $3/$15,
// Haiku 4.5 $1/$5). The original pack shipped Opus at $15/$75 (stale
// Claude-3-Opus pricing) and Haiku at $0.80/$4, and omitted claude-sonnet-4-6 —
// which is the model lib/llm-panel.ts actually calls, so its Claude leg would
// have priced at $0 (no exact or prefix match). Re-check provider pricing
// quarterly; these move. Unknown models fall through to a $0 cost with the
// tokens still recorded, so a missing rate never loses usage data.
const RATES: Record<string, { input: number; output: number }> = {
  // Anthropic
  'claude-opus-4-8':              { input:  5.00, output: 25.00 },
  'claude-sonnet-5':              { input:  3.00, output: 15.00 },
  'claude-sonnet-4-6':            { input:  3.00, output: 15.00 },
  'claude-haiku-4-5-20251001':    { input:  1.00, output:  5.00 },
  'claude-haiku-4-5':             { input:  1.00, output:  5.00 },

  // Google — the 1.5 family is GONE (404 since 2026-06-01). Do not add it back.
  // (Resolved 2026-08-05: lib/llm-panel.ts now defaults to gemini-3.1-flash-lite.
  // lib/multi-model.ts still targets gemini-1.5-pro on the retired v1beta2
  // :generate endpoint, but it has no importers — dead code, flagged for removal.)
  'gemini-3.1-flash-lite':        { input:  0.25, output:  1.50 },
  'gemini-3.5-flash':             { input:  1.50, output:  9.00 },
  'gemini-3.1-pro':               { input:  2.00, output: 12.00 },
  'gemini-2.5-flash-lite':        { input:  0.10, output:  0.40 }, // retires 2026-10-16

  // OpenAI — GPT-5.6 family is current; gpt-4o is legacy but still API-callable.
  'gpt-5.6-luna':                 { input:  1.00, output:  6.00 },
  'gpt-5.6-terra':                { input:  2.50, output: 15.00 },
  'gpt-5.6-sol':                  { input:  5.00, output: 30.00 },
  'gpt-4o':                       { input:  2.50, output: 10.00 },
};

export function computeCost(model: string, inputTokens: number, outputTokens: number): number {
  // Try exact match, then longest prefix match so dated snapshots still price.
  let rate = RATES[model];
  if (!rate) {
    const key = Object.keys(RATES)
      .filter((k) => model.startsWith(k))
      .sort((a, b) => b.length - a.length)[0];
    if (key) rate = RATES[key];
  }
  if (!rate) return 0;
  return (inputTokens / 1e6) * rate.input + (outputTokens / 1e6) * rate.output;
}

// ── Usage extraction: each provider names these differently ────────────────
export function extractUsage(provider: 'claude' | 'gemini' | 'gpt', raw: any): {
  input: number; output: number;
} {
  if (!raw) return { input: 0, output: 0 };
  if (provider === 'claude') {
    return { input: raw.usage?.input_tokens ?? 0, output: raw.usage?.output_tokens ?? 0 };
  }
  if (provider === 'gemini') {
    const u = raw.usageMetadata ?? {};
    return { input: u.promptTokenCount ?? 0, output: u.candidatesTokenCount ?? 0 };
  }
  // gpt
  const u = raw.usage ?? {};
  return { input: u.prompt_tokens ?? 0, output: u.completion_tokens ?? 0 };
}

// ── The logger ─────────────────────────────────────────────────────────────
let sb: ReturnType<typeof createClient> | null = null;
function client() {
  if (sb) return sb;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;
  if (!url || !key) return null;
  sb = createClient(url, key);
  return sb;
}

export interface LogCostArgs {
  agentName: string;
  provider: 'claude' | 'gemini' | 'gpt';
  model: string;
  raw: any;              // the unmodified provider response
  durationMs: number;
  role?: string;         // panel leg name, e.g. "panel-claude"
  runId?: string | null;
}

/**
 * Fire-and-forget cost write. Never throws, never blocks the caller — a logging
 * failure must not take down a site review.
 */
export function logCost({
  agentName, provider, model, raw, durationMs, role, runId = null,
}: LogCostArgs): void {
  try {
    const c = client();
    if (!c) return;
    const { input, output } = extractUsage(provider, raw);
    // Nothing useful to record — usually means the provider returned an error.
    if (input === 0 && output === 0) return;

    // Cast: the client is created without a generated Database schema type, so
    // .insert() infers `never` for the row shape (TS2353). Our columns match
    // the agent_costs table created by agents/supabase-scaling-schema.sql.
    void (c.from('agent_costs') as any).insert({
      agent_name:    agentName,
      run_id:        runId,
      model,
      role:          role ?? `panel-${provider}`,
      input_tokens:  input,
      output_tokens: output,
      usd_cost:      computeCost(model, input, output),
      duration_ms:   durationMs,
    }).then(({ error }: { error: { message: string } | null }) => {
      if (error) console.warn(`[llm-cost-log] insert failed: ${error.message}`);
    });
  } catch (e: any) {
    console.warn(`[llm-cost-log] ${e?.message ?? 'unknown error'}`);
  }
}
