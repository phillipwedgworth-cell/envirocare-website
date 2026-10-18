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

const normalizeKeyword = (keyword) => String(keyword ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
const queryIdOf = (row) => row?.query ?? row?.query_id ?? row?.id ?? null;

// Only a verified inventory can establish that a keyword is absent. An error,
// unknown envelope or malformed row must never look like an empty project and
// authorize a quota-consuming new-query request.
function queryInventory(payload) {
  const rows = Array.isArray(payload) ? payload : payload?.queries;
  const failed = ['error', 'failed'].includes(String(payload?.status ?? '').toLowerCase());
  if (!Array.isArray(rows) || payload?.error || failed) {
    throw new Error('NeuronWriter list-queries returned an unrecognized inventory; refusing to create a new analysis');
  }
  for (const row of rows) {
    const id = queryIdOf(row);
    const validId = (typeof id === 'string' && id.trim() !== '') || (typeof id === 'number' && Number.isFinite(id) && id > 0);
    if (!row || typeof row.keyword !== 'string' || !normalizeKeyword(row.keyword) || !validId) {
      throw new Error('NeuronWriter list-queries returned an incomplete query row; refusing to create a new analysis');
    }
  }
  return rows;
}

// List all existing queries in a project. Costs NO quota (read-only).
// Known API responses are either an array or an object containing queries[].
export async function listQueries(project) {
  const proj = project ?? process.env.NEURONWRITER_PROJECT;
  if (!proj) throw new Error('NeuronWriter: no project id for list-queries');
  return queryInventory(await post('list-queries', { project: proj }));
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
      const byKeyword = new Map();
      for (const q of rows) {
        const k = normalizeKeyword(q.keyword);
        const current = byKeyword.get(k);
        if (!current || String(q.created ?? '') > String(current.created ?? '')) byKeyword.set(k, q);
      }
      return byKeyword;
    })();
    _existingByProject.set(proj, p);
  }
  // Propagate a failed inventory read. Keeping the rejected promise also stops
  // other pages in this run from retrying the outage or creating duplicates.
  const byKeyword = await _existingByProject.get(proj);
  return queryIdOf(byKeyword.get(normalizeKeyword(keyword)));
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

// Concurrent pages may share a keyword (city + service page). One verified
// absence permits one creation per normalized keyword in this process. Keep
// failures too: an ambiguous failed request is not permission to retry a write.
const _queryCreations = new Map();
async function reserveAndCreateQuery(keyword, opts, proj) {
  const inventory = await _existingByProject.get(proj);
  if (!inventory) throw new Error('NeuronWriter: no verified query inventory; refusing to create a new analysis');

  // HARD BUDGET. Reserve only for the caller that actually creates the query,
  // after the inventory read succeeded. Counter rolls with the billing cycle.
  const budgetKey = `neuronwriter:budget:${billingCycleTag()}`;
  const used = Number((await stateGet(budgetKey)) ?? 0);
  if (used >= MONTHLY_BUDGET) {
    throw new Error(`NeuronWriter budget: ${used}/${MONTHLY_BUDGET} new analyses already used this cycle (${budgetKey}); refusing to create "${keyword}". Raise NEURONWRITER_MONTHLY_BUDGET only with Phillip's OK.`);
  }
  await stateSet(budgetKey, used + 1);
  console.log(`[neuronwriter] budget ${used + 1}/${MONTHLY_BUDGET} after "${keyword}"`);

  const q = await createQuery(keyword, opts);
  const queryId = queryIdOf(q);
  if (!queryId) throw new Error(`NeuronWriter: new-query returned no query id: ${JSON.stringify(q).slice(0, 200)}`);
  // Register immediately, before scoring. A later case/spacing variant
  // must reuse this ID even if its raw KV key differs or the first score fails.
  inventory.set(normalizeKeyword(keyword), { keyword, query: queryId });
  return queryId;
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

  // create → poll → score wrapped so a failure anywhere never leaves a silent
  // orphan: the finally marks the shell for cleanup and clears any bad cache id.
  try {
    if (!queryId) {
      const creationKey = `${proj}:${normalizeKeyword(keyword)}`;
      let pending = _queryCreations.get(creationKey);
      const ownsCreation = !pending;
      if (!pending) {
        pending = reserveAndCreateQuery(keyword, opts, proj);
        _queryCreations.set(creationKey, pending);
      }
      queryId = await pending;
      createdThisRun = ownsCreation;
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
      // that went bad, drop it from cache so the next run rechecks inventory.
      if (createdThisRun) await markOrphanQuery(queryId).catch(() => {});
      if (cacheKey) await stateSet(cacheKey, null).catch(() => {});
    }
  }
}
