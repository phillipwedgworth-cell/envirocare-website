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
 * Cost note: each panel call ~$0.01–$0.03 depending on prompt size. Cap by
 * keyword-filtering BEFORE calling the panel (see aeo-watch.mjs).
 */

const CLAUDE_MODEL = 'claude-opus-4-7';        // current production-quality reasoning model
const GEMINI_MODEL = 'gemini-2.5-pro';         // Google's flagship — strong on factual recall
const OPENAI_MODEL = 'gpt-5';                  // OpenAI's flagship reasoning model

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
      messages: [{ role: 'user', content: `${prompt}\n\n${VERDICT_SCHEMA_REMINDER}` }],
    }),
  });
  if (!r.ok) throw new Error(`Claude ${r.status}: ${await r.text()}`);
  const j = await r.json();
  return parseVerdict(j.content?.[0]?.text || '', 'claude');
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
  return parseVerdict(j.candidates?.[0]?.content?.parts?.[0]?.text || '', 'gemini');
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
  return parseVerdict(j.choices?.[0]?.message?.content || '', 'openai');
}

function parseVerdict(text, source) {
  // Extract first JSON object even if model wrapped it in prose
  const m = text.match(/\{[^}]*"verdict"[^}]*\}/);
  if (!m) return { source, verdict: 'HOLD', confidence: 0, reasoning: `parse-failed: ${text.slice(0, 100)}` };
  try {
    const v = JSON.parse(m[0]);
    return { source, verdict: v.verdict, confidence: Number(v.confidence) || 0, reasoning: v.reasoning || '' };
  } catch {
    return { source, verdict: 'HOLD', confidence: 0, reasoning: `parse-failed: ${m[0].slice(0, 100)}` };
  }
}

/**
 * Run a 3-model panel on the same prompt. Returns:
 *   { consensus: "SHIP"|"SKIP"|"HOLD", votes: [...], split: bool, costEstimateUSD }
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
      : { source: 'unknown', verdict: 'HOLD', confidence: 0, reasoning: `error: ${s.reason?.message || s.reason}` }
  );

  // Tally
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
    costEstimateUSD: votes.length * 0.02,
  };
}
