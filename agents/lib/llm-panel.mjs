/**
 * Multi-model judgment panel.
 *
 * Sends the same prompt to Claude, Gemini, and GPT, parses each verdict,
 * applies a 2-of-3 consensus rule. Designed to be reusable across every
 * agent in the EnviroCare system, not just AEO-Watch.
 *
 * Each model returns: { verdict: "SHIP" | "SKIP" | "HOLD", confidence: 0–1, reasoning: string }
 *
 * Why all three: any one model can hallucinate or over/under-weight a topic.
 * Two-of-three breaks ties and surfaces disagreement (which itself is signal).
 *
 * Env vars required:
 *   ANTHROPIC_API_KEY
 *   GEMINI_API_KEY   (Google AI Studio)
 *   OPENAI_API_KEY
 *
 * Cost note: costEstimateUSD is computed from each provider's reported token
 * usage × the per-model rates in PRICING below. Claude's rate is authoritative;
 * the others are approximate — verify against the provider's pricing page.
 */

const CLAUDE_MODEL = 'claude-opus-4-8';        // current production-quality reasoning model
const GEMINI_MODEL = 'gemini-2.5-pro';         // Google's flagship — strong on factual recall
const OPENAI_MODEL = 'gpt-5';                  // OpenAI's flagship reasoning model

// USD per 1M tokens. Claude is authoritative (Opus 4.8 = $5 in / $25 out).
// gemini/openai are estimates — update from the provider pricing pages.
const PRICING = {
  claude: { in: 5.0, out: 25.0 },
  gemini: { in: 1.25, out: 10.0 },
  openai: { in: 1.25, out: 10.0 },
};

const VALID_VERDICTS = new Set(['SHIP', 'SKIP', 'HOLD']);

const VERDICT_SCHEMA_REMINDER = `Return ONLY a single JSON object on one line, no markdown, no preamble:
{"verdict":"SHIP|SKIP|HOLD","confidence":0.0,"reasoning":"one sentence why"}

SHIP = worth surfacing to the owner for action.
SKIP = noise, ignore.
HOLD = unsure, needs human eyes but not urgent.`;

async function askClaude(prompt) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 400,
      // A SHIP/SKIP/HOLD verdict is a simple classification — low effort keeps
      // it fast and cheap. (Note: Opus 4.8 rejects temperature/top_p, so unlike
      // Gemini/OpenAI there is no sampling knob to set here.)
      output_config: { effort: 'low' },
      messages: [{ role: 'user', content: `${prompt}\n\n${VERDICT_SCHEMA_REMINDER}` }],
    }),
  });
  if (!r.ok) throw new Error(`Claude ${r.status}: ${await r.text()}`);
  const j = await r.json();
  const u = j.usage || {};
  const usage = { inputTokens: u.input_tokens || 0, outputTokens: u.output_tokens || 0 };
  return finalize('claude', j.content?.[0]?.text || '', usage);
}

async function askGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`;
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `${prompt}\n\n${VERDICT_SCHEMA_REMINDER}` }] }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 400 },
    }),
  });
  if (!r.ok) throw new Error(`Gemini ${r.status}: ${await r.text()}`);
  const j = await r.json();
  const u = j.usageMetadata || {};
  const usage = { inputTokens: u.promptTokenCount || 0, outputTokens: u.candidatesTokenCount || 0 };
  return finalize('gemini', j.candidates?.[0]?.content?.parts?.[0]?.text || '', usage);
}

async function askOpenAI(prompt) {
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [{ role: 'user', content: `${prompt}\n\n${VERDICT_SCHEMA_REMINDER}` }],
      max_completion_tokens: 400,
    }),
  });
  if (!r.ok) throw new Error(`OpenAI ${r.status}: ${await r.text()}`);
  const j = await r.json();
  const u = j.usage || {};
  const usage = { inputTokens: u.prompt_tokens || 0, outputTokens: u.completion_tokens || 0 };
  return finalize('openai', j.choices?.[0]?.message?.content || '', usage);
}

/**
 * Scan `text` for the first balanced {...} that JSON-parses to an object with a
 * "verdict" key. Brace-matching respects string literals and escapes, so a "}"
 * inside the reasoning string (or markdown fences around the JSON) no longer
 * truncates the match the way a single regex did.
 */
function extractVerdictObject(text) {
  for (let start = text.indexOf('{'); start !== -1; start = text.indexOf('{', start + 1)) {
    let depth = 0;
    let inStr = false;
    let esc = false;
    for (let i = start; i < text.length; i++) {
      const ch = text[i];
      if (inStr) {
        if (esc) esc = false;
        else if (ch === '\\') esc = true;
        else if (ch === '"') inStr = false;
        continue;
      }
      if (ch === '"') inStr = true;
      else if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) {
          try {
            const obj = JSON.parse(text.slice(start, i + 1));
            if (obj && typeof obj === 'object' && 'verdict' in obj) return obj;
          } catch {
            /* not valid JSON — fall through to the next "{" */
          }
          break;
        }
      }
    }
  }
  return null;
}

function parseVerdict(text, source) {
  const obj = extractVerdictObject(text);
  if (!obj) {
    return { source, verdict: 'HOLD', confidence: 0, reasoning: `parse-failed: ${text.slice(0, 120)}` };
  }
  const verdict = String(obj.verdict || '').trim().toUpperCase();
  if (!VALID_VERDICTS.has(verdict)) {
    // A verdict the consensus tally doesn't recognize would silently corrupt the
    // count — coerce it to HOLD rather than letting it through.
    return {
      source,
      verdict: 'HOLD',
      confidence: 0,
      reasoning: `invalid-verdict "${obj.verdict}": ${String(obj.reasoning || '').slice(0, 100)}`,
    };
  }
  let confidence = Number(obj.confidence);
  if (!Number.isFinite(confidence)) confidence = 0;
  confidence = Math.min(1, Math.max(0, confidence));
  return { source, verdict, confidence, reasoning: String(obj.reasoning || '') };
}

function costOf(source, usage) {
  const p = PRICING[source];
  if (!p || !usage) return 0;
  return (usage.inputTokens * p.in + usage.outputTokens * p.out) / 1e6;
}

function finalize(source, text, usage) {
  return {
    ...parseVerdict(text, source),
    inputTokens: usage.inputTokens,
    outputTokens: usage.outputTokens,
    costUSD: costOf(source, usage),
  };
}

/**
 * Run a 3-model panel on the same prompt. Returns:
 *   {
 *     consensus: "SHIP"|"SKIP"|"HOLD",
 *     votes: [{ source, verdict, confidence, reasoning, inputTokens, outputTokens, costUSD }],
 *     tally, split, costEstimateUSD
 *   }
 */
export async function panel(prompt, opts = {}) {
  const skipGemini = !process.env.GEMINI_API_KEY;
  const skipOpenAI = !process.env.OPENAI_API_KEY;

  const calls = [askClaude(prompt)];
  if (!skipGemini) calls.push(askGemini(prompt));
  if (!skipOpenAI) calls.push(askOpenAI(prompt));

  // Settle all promises — never let one provider failure kill the panel.
  const settled = await Promise.allSettled(calls);
  const votes = settled.map((s) =>
    s.status === 'fulfilled'
      ? s.value
      : {
          source: 'unknown',
          verdict: 'HOLD',
          confidence: 0,
          reasoning: `error: ${s.reason?.message || s.reason}`,
          inputTokens: 0,
          outputTokens: 0,
          costUSD: 0,
        }
  );

  // Tally — verdicts are validated in parseVerdict, so keys stay SHIP/SKIP/HOLD.
  const tally = { SHIP: 0, SKIP: 0, HOLD: 0 };
  for (const v of votes) tally[v.verdict] = (tally[v.verdict] || 0) + 1;
  const consensus =
    tally.SHIP >= 2 ? 'SHIP' : tally.SKIP >= 2 ? 'SKIP' : 'HOLD';
  const split = Object.values(tally).filter((n) => n > 0).length > 1;

  return {
    consensus,
    votes,
    tally,
    split,
    costEstimateUSD: votes.reduce((sum, v) => sum + (v.costUSD || 0), 0),
  };
}
