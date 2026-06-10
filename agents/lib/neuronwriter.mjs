// agents/lib/neuronwriter.mjs
// Thin HTTP client for the NeuronWriter content intelligence API.
// Auth: X-API-KEY header pulled from env at call time.
// Never logs or echoes the key value.
//
// 2026-06-10: rewritten against the REAL NeuronWriter API (/neuron-api/0.5/*,
// POST-only, project-scoped). The previous /neuron-api/v1/queries paths were
// hypothetical and 404'd on every call.

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

// Convenience: create query, wait for it, score content, return normalised result.
// `content` is either a string (used for both scoring and term counting) or
// { html, text } — html goes to evaluate-content (better score fidelity),
// text is used for local term counting.
// evaluate-content only returns { status, content_score }; missing/underused
// terms are computed locally against the query's content_basic term list.
// Returns { queryId, score, missing, underused, questions }
export async function analyzePageContent(keyword, content, opts = {}) {
  const html = typeof content === 'string' ? content : content.html;
  const text = typeof content === 'string' ? content : (content.text ?? content.html);

  const q = await createQuery(keyword, opts);
  const queryId = q.query ?? q.query_id ?? q.id;
  if (!queryId) throw new Error(`NeuronWriter: new-query returned no query id: ${JSON.stringify(q).slice(0, 200)}`);

  process.stdout.write(`[neuronwriter] Query ${queryId} created, waiting for analysis`);
  const queryData = await pollUntilReady(queryId);
  process.stdout.write(' done\n');

  const scored = await scoreContent(queryId, html);
  const score = scored.content_score ?? scored.score ?? 0;

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

  return { queryId, score, missing, underused, questions };
}
