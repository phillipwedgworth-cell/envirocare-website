// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/lib/neuronwriter.mjs
// Commit: fix(agents): fleet at top form — cost_usd/usd_cost unified, run rows always dated, site-reviewer dedup+unpause, aeo-watch failure finalizer, NeuronWriter hard budget, BrightLocal false-zero guard, seo-monitor baseline fallback, crew on schedule
// Push: main (via branch + PR)
// ─────────────────────────────────────
// agents/lib/neuronwriter.mjs
// Thin HTTP client for the NeuronWriter content intelligence API.
// Auth: X-API-KEY header pulled from env at call time.
// Never logs or echoes the key value.
//
// 2026-06-10: rewritten against the REAL NeuronWriter API (/neuron-api/0.5/*,
// POST-only, project-scoped). The previous /neuron-api/v1/queries paths were
// hypothetical and 404'd on every call.

import { stateGet, stateSet } from './kv.mjs';

const BASE = 'https://app.neuronwriter.com/neuron-api/0.5';

function apiHeaders() {
  const key = process.env.NEURONWRITER_API_KEY;
  if (!key) throw new Error('NEURONWRITER_API_KEY is not set in environment');
  return {
    'X-API-KEY': key,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

async function post(path, body = {}) {
  const resp = await fetch(`${BASE}/${path}`, {
    method: 'POST',
    headers: apiHeaders(),
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`NeuronWriter ${path} ${resp.status}: ${text.slice(0, 400)}`);
  }
  return resp.json();
}

// List projects on the account. Returns [{ project, name, ... }]
export async function listProjects() {
  return post('list-projects');
}

// List all existing queries in a project. Costs NO quota (read-only).
export async function listQueries(project) {
  const proj = project ?? process.env.NEURONWRITER_PROJECT;
  if (!proj) throw new Error('NeuronWriter: no project id for list-queries');
  return post('list-queries', { project: proj });
}

// Memoized newest-existing-query-per-keyword map, one list-queries call per
// process. 2026-07-10: added because an empty KV cache caused analyzePageContent
// to mint brand-new queries even when duplicates of the same keyword already
// existed in the project (~67 empty shells, ~5x per keyword). Reusing an
// existing query costs zero analyses; only truly-new keywords hit new-query.
const _existingByProject = new Map();
async function existingQueryFor(proj, keyword) {
  if (!_existingByProject.has(proj)) {
    const p = (async () => {
      const rows = await listQueries(proj);
      const byKeyword = {};
      for (const q of Array.isArray(rows) ? rows : []) {
        const k = String(q.keyword ?? '').trim().toLowerCase();
        if (!k) continue;
        if (!byKeyword[k] || String(q.created ?? '') > String(byKeyword[k].created ?? '')) byKeyword[k] = q;
      }
      return byKeyword;
    })();
    _existingByProject.set(proj, p);
  }
  const byKeyword = await _existingByProject.get(proj).catch(() => ({}));
  const hit = byKeyword[String(keyword).trim().toLowerCase()];
  return hit ? (hit.query ?? hit.query_id ?? hit.id ?? null) : null;
}

// Create a new NLP query for a keyword inside a project.
// project falls back to NEURONWRITER_PROJECT in env.
// Returns { query, ... }
export async function createQuery(keyword, { project, engine = 'google.com', language = 'English' } = {}) {
  const proj = project ?? process.env.NEURONWRITER_PROJECT;
  if (!proj) throw new Error('NeuronWriter: no project id (pass opts.project or set NEURONWRITER_PROJECT)');
  return post('new-query', { project: proj, keyword, engine, language });
}

// Get current status and data for an existing query.
export async function getQuery(queryId) {
  return post('get-query', { query: queryId });
}

// Poll until the query analysis is ready or timeout.
export async function pollUntilReady(queryId, { maxWaitMs = 300_000, intervalMs = 10_000 } = {}) {
  const deadline = Date.now() + maxWaitMs;
  while (Date.now() < deadline) {
    const data = await getQuery(queryId);
    const status = String(data.status ?? '').toLowerCase();
    if (status === 'ready' || status === 'done' || status === 'completed') return data;
    if (status === 'error' || status === 'failed' || status === 'not found') {
      throw new Error(`NeuronWriter query ${queryId} errored: ${JSON.stringify(data).slice(0, 300)}`);
    }
    process.stdout.write('.');
    await new Promise(r => setTimeout(r, intervalMs));
  }
  throw new Error(`NeuronWriter: timed out after ${maxWaitMs}ms waiting for query ${queryId}`);
}

// Evaluate content against a completed query.
// content: HTML (or plain text) of the page.
// Returns the raw evaluate-content payload (content_score, terms, ...).
export async function scoreContent(queryId, content) {
  return post('evaluate-content', { query: queryId, html: content, title: '', description: '' });
}

// Count case-insensitive occurrences of a term in text.
function countTerm(text, term) {
  if (!term) return 0;
  const esc = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return (text.match(new RegExp(`\\b${esc}\\b`, 'gi')) ?? []).length;
}

// Record a query that was created but never successfully scored so the empty
// shells can be cleaned up later. NeuronWriter API 0.5 is POST-only and exposes
// no delete-query endpoint, so we MARK (persist the id) rather than delete.
async function markOrphanQuery(queryId) {
  const KEY = 'neuronwriter:orphan_queries';
  const list = (await stateGet(KEY)) ?? [];
  if (!list.includes(queryId)) {
    list.push(queryId);
    await stateSet(KEY, list);
  }
  console.warn(`[neuronwriter] query ${queryId} created but not scored — marked orphan for cleanup`);
}

// Convenience: create query, wait for it, score content, return normalised result.
// `content` is either a string (used for both scoring and term counting) or
// { html, text } — html goes to evaluate-content (better score fidelity),
// text is used for local term counting.
// evaluate-content only returns { status, content_score }; missing/underused
// terms are computed locally against the query's content_basic term list.
// Returns { queryId, score, missing, underused, questions }
// 60 of the 75-analysis plan is the fleet's ceiling; the remaining 15 are
// Phillip's for manual use. Billing renews on the 10th (NEURONWRITER_RENEWAL_DAY).
const MONTHLY_BUDGET = Math.max(1, Number(process.env.NEURONWRITER_MONTHLY_BUDGET ?? 60) || 60);
const RENEWAL_DAY = Math.min(28, Math.max(1, Number(process.env.NEURONWRITER_RENEWAL_DAY ?? 10) || 10));
function billingCycleTag(now = new Date()) {
  const y = now.getUTCFullYear(), m = now.getUTCMonth(), d = now.getUTCDate();
  const start = d >= RENEWAL_DAY ? new Date(Date.UTC(y, m, RENEWAL_DAY)) : new Date(Date.UTC(y, m - 1, RENEWAL_DAY));
  return start.toISOString().slice(0, 10);
}

export async function analyzePageContent(keyword, content, opts = {}) {
  const html = typeof content === 'string' ? content : content.html;
  const text = typeof content === 'string' ? content : (content.text ?? content.html);

  // Reuse a previously-scored query per (project, keyword) instead of minting a
  // brand-new row every run — that, plus the try/finally cleanup below, is what
  // stops orphaned empty shells (~67 of them) from piling up on NeuronWriter.
  const proj = opts.project ?? process.env.NEURONWRITER_PROJECT;
  const cacheKey = proj ? `neuronwriter:query:${proj}:${keyword}` : null;

  let queryId = cacheKey ? await stateGet(cacheKey) : null;

  // KV cache miss → check the project's existing queries before creating.
  // list-queries is free; new-query burns one of the 75 monthly analyses.
  if (!queryId && proj) {
    queryId = await existingQueryFor(proj, keyword);
    if (queryId) console.log(`[neuronwriter] reusing existing query ${queryId} for "${keyword}" (no quota spent)`);
  }

  let createdThisRun = false;
  let scored = false;

  // HARD BUDGET. Every gate so far lived in a caller (weekly → first-Monday →
  // renewal-day) and every one was bypassed by a different caller: 20 new
  // queries were minted Aug 31–Sep 1 2026 (27% of the 75/month plan in two
  // days). This lives in the one function that spends quota, so no caller can
  // route around it. Counter key rolls with the billing cycle.
  if (!queryId) {
    const budgetKey = `neuronwriter:budget:${billingCycleTag()}`;
    const used = Number((await stateGet(budgetKey)) ?? 0);
    if (used >= MONTHLY_BUDGET) {
      throw new Error(`NeuronWriter budget: ${used}/${MONTHLY_BUDGET} new analyses already used this cycle (${budgetKey}); refusing to create "${keyword}". Raise NEURONWRITER_MONTHLY_BUDGET only with Phillip's OK.`);
    }
    await stateSet(budgetKey, used + 1);
    console.log(`[neuronwriter] budget ${used + 1}/${MONTHLY_BUDGET} after "${keyword}"`);
  }

  // create → poll → score wrapped so a failure anywhere never leaves a silent
  // orphan: the finally marks the shell for cleanup and clears any bad cache id.
  try {
    if (!queryId) {
      const q = await createQuery(keyword, opts);
      createdThisRun = true;
      queryId = q.query ?? q.query_id ?? q.id;
      if (!queryId) throw new Error(`NeuronWriter: new-query returned no query id: ${JSON.stringify(q).slice(0, 200)}`);
    }

    process.stdout.write(`[neuronwriter] Query ${queryId} (reused if cached), waiting for analysis`);
    const queryData = await pollUntilReady(queryId);
    process.stdout.write(' done\n');

    const scoreResp = await scoreContent(queryId, html);
    const score = scoreResp.content_score ?? scoreResp.score ?? 0;

    const basicTerms = queryData?.terms?.content_basic ?? [];
    const missing = [];
    const underused = [];
    for (const g of basicTerms) {
      const term = g.t ?? '';
      if (!term) continue;
      const count = countTerm(text, term);
      const recMin = Array.isArray(g.sugg_usage) ? g.sugg_usage[0] : null;
      if (count === 0) missing.push(term);
      else if (recMin != null && count < recMin) underused.push({ term, count, recommended: recMin });
    }

    const questions = (queryData?.ideas?.suggest_questions ?? queryData?.ideas?.questions ?? [])
      .map(i => (typeof i === 'string' ? i : i.q ?? i.question ?? '')).filter(Boolean);

    scored = true;
    if (cacheKey) await stateSet(cacheKey, queryId); // cache only a fully-scored query
    return { queryId, score, missing, underused, questions };
  } finally {
    if (!scored && queryId) {
      // Mark a freshly-created-but-unscored query as an orphan; for a reused id
      // that went bad, just drop it from cache so the next run recreates.
      if (createdThisRun) await markOrphanQuery(queryId).catch(() => {});
      if (cacheKey) await stateSet(cacheKey, null).catch(() => {});
    }
  }
}
