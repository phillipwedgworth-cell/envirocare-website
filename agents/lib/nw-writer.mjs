// agents/lib/nw-writer.mjs — shared NeuronWriter + multi-model drafting helpers.
//
// Used by agents/content-refresh.mjs (adds sections to existing pages) and
// agents/blog-from-drafts.mjs (turns finished NeuronWriter editor drafts into blog
// posts). Extracted 2026-10-12 so both agents score, check originality and draft
// the same way; before that the code lived only inside content-refresh.mjs.
import { createMessage } from './llm-with-logging.mjs';
import { normalise } from './originality.mjs';

export const NW_BASE = 'https://app.neuronwriter.com/neuron-api/0.5/writer';
export const NW_PROJECT = process.env.NEURONWRITER_PROJECT || '9d0bec3a70f4743c';

// NeuronWriter suggests what competitors say — including things EnviroCare must
// never say or does not sell. Strip them before the model ever sees the list.
export const BANNED_TERM = /orkin|terminix|waynes|cook'?s|rollins|truly nolen|aptive|scout|dane|palisade|clear ?defense|a ?plus|mr\.? ?bugg|stark|prewett|safespray|s ?& ?s|rogue|bed ?bug|wildlife|removal|eliminat|eco|safe|non-?toxic|green|organic|fumigat|tent|same[- ]day|24|emergency|guarantee|warrant|contract|cheap|discount|coupon|lawn|crawl ?space (service|encapsulation)|tuscaloosa|competitor|reviews?\b|bbb|better business|home depot|lowe'?s|home defense|suspend|ortho|raid|spectracide/i;

export async function nw(method, body) {
  const key = process.env.NEURONWRITER_API_KEY;
  if (!key) throw new Error('NEURONWRITER_API_KEY not set');
  const r = await fetch(`${NW_BASE}/${method}`, { method: 'POST', headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const t = await r.text();
  if (!r.ok) throw new Error(`NeuronWriter ${method} ${r.status}: ${t.slice(0, 200)}`);
  return JSON.parse(t);
}

/** Newest READY query per keyword (lower-cased). Free: list-queries spends no analyses. */
export async function readyQueries(project = NW_PROJECT) {
  const rows = await nw('list-queries', { project, status: 'ready' });
  const byKw = {};
  for (const q of Array.isArray(rows) ? rows : []) {
    const k = String(q.keyword || '').trim().toLowerCase();
    if (k && (!byKw[k] || String(q.created) > String(byKw[k].created))) byKw[k] = q;
  }
  return byKw;
}

export async function score(queryId, html, title, description) {
  const r = await nw('evaluate-content', { query: queryId, html, title, description });
  const s = r?.content_score;
  if (typeof s !== 'number') throw new Error(`evaluate-content returned no score: ${JSON.stringify(r).slice(0, 120)}`);
  return s;
}

// The plagiarism corpus: the competitor pages NeuronWriter analysed for the query.
export async function competitorTexts(queryId, q) {
  try {
    const r = await nw('get-competitors-content', { query: queryId });
    const c = r?.competitors;
    if (c && typeof c === 'object') return Object.entries(c).map(([url, v]) => ({ url, text: v?.content || '' }));
  } catch { /* fall through */ }
  const urls = (q?.competitors || []).map((c) => c.url).filter((u) => u && !/envirocarellc|yelp|facebook|reddit/.test(u)).slice(0, 15);
  const out = [];
  for (const url of urls) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(12000), headers: { 'User-Agent': 'Mozilla/5.0 (EnviroCare originality check)' } });
      if (r.ok) out.push({ url, text: normalise(await r.text()) });
    } catch { /* unreachable competitor proves nothing either way */ }
  }
  return out;
}

export function missingTerms(q, text, limit = 40) {
  const t = ` ${normalise(text)} `;
  const out = [];
  for (const k of ['content_basic', 'content_extended']) {
    for (const x of q?.terms?.[k] || []) {
      const term = String(x.t || '').toLowerCase();
      if (!term || BANNED_TERM.test(term)) continue;
      const n = t.split(` ${normalise(term)} `).length - 1;
      const [lo] = x.sugg_usage || [1];
      if (n < lo) out.push(`${term} (${n}/${lo})`);
    }
  }
  return out.slice(0, limit);
}

export function openQuestions(q, limit = 10) {
  const qs = [...Object.keys(q?.ideas?.topic_matrix || {}), ...(q?.ideas?.people_also_ask || []).map((x) => x.q)];
  return [...new Set(qs)].filter((x) => !BANNED_TERM.test(x)).slice(0, limit);
}

// Drafting rotates across Claude, GPT and Gemini (Phillip, 2026-10-12: spread token
// use). Every provider's output goes through the SAME gates in the calling agent —
// compliance, originality, NeuronWriter score — so the model never changes what is
// allowed to ship. A provider with no key or an API error falls through to the next.
export function makeCompleter({ agent, model = 'claude-sonnet-4-6', maxTokens = 3000 } = {}) {
  const providers = (process.env.CONTENT_REFRESH_PROVIDERS || 'anthropic,openai,gemini').split(',').map((x) => x.trim()).filter(Boolean);
  const openaiModel = process.env.CONTENT_REFRESH_OPENAI_MODEL || 'gpt-5.6-luna';
  const geminiModel = process.env.CONTENT_REFRESH_GEMINI_MODEL || 'gemini-2.0-flash';
  let rot = 0;
  return async function complete(anthropic, system, user, { tokens = maxTokens } = {}) {
    const order = providers.map((_, i) => providers[(i + rot) % providers.length]);
    rot++;
    const errs = [];
    for (const p of order) {
      try {
        if (p === 'anthropic' && process.env.ANTHROPIC_API_KEY) {
          const res = await createMessage(anthropic, { model, max_tokens: tokens, system, messages: [{ role: 'user', content: user }] }, { agentName: agent, role: 'writer' });
          return { provider: `claude:${model}`, text: res.content?.map((c) => c.text || '').join('') || '' };
        }
        if (p === 'openai' && process.env.OPENAI_API_KEY) {
          const r = await fetch('https://api.openai.com/v1/chat/completions', { method: 'POST', headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'content-type': 'application/json' },
            body: JSON.stringify({ model: openaiModel, max_tokens: tokens, messages: [{ role: 'system', content: system }, { role: 'user', content: user }] }) });
          const d = await r.json();
          if (!r.ok) throw new Error(`openai ${r.status}: ${JSON.stringify(d).slice(0, 160)}`);
          return { provider: `gpt:${openaiModel}`, text: d?.choices?.[0]?.message?.content || '' };
        }
        if (p === 'gemini' && process.env.GEMINI_API_KEY) {
          const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${process.env.GEMINI_API_KEY}`, { method: 'POST', headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: [{ parts: [{ text: user }] }], generationConfig: { maxOutputTokens: tokens } }) });
          const d = await r.json();
          if (!r.ok) throw new Error(`gemini ${r.status}: ${JSON.stringify(d).slice(0, 160)}`);
          return { provider: `gemini:${geminiModel}`, text: d?.candidates?.[0]?.content?.parts?.map((x) => x.text || '').join('') || '' };
        }
      } catch (e) { errs.push(e.message); }
    }
    throw new Error(`no drafting provider succeeded: ${errs.join(' | ') || 'no API keys set'}`);
  };
}

/** Pull the first {...} JSON object out of a model reply. */
export function parseJson(txt) {
  const s = String(txt || '');
  return JSON.parse(s.slice(s.indexOf('{'), s.lastIndexOf('}') + 1));
}
