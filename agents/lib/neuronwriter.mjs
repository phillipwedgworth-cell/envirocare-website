// agents/lib/neuronwriter.mjs
// Thin HTTP client for the NeuronWriter content intelligence API.
// Auth: X-API-KEY header pulled from env at call time.
// Never logs or echoes the key value.

const BASE = 'https://app.neuronwriter.com';

function apiHeaders() {
  const key = process.env.NEURONWRITER_API_KEY;
  if (!key) throw new Error('NEURONWRITER_API_KEY is not set in environment');
  return {
    'X-API-KEY': key,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

// Create a new NLP query for a keyword.
// Returns { query_id, status, ... }
export async function createQuery(keyword, { engine = 'google.com', language = 'en' } = {}) {
  const resp = await fetch(`${BASE}/neuron-api/v1/queries`, {
    method: 'POST',
    headers: apiHeaders(),
    body: JSON.stringify({ keyword, search_engine: engine, language }),
  });
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`NeuronWriter createQuery ${resp.status}: ${text.slice(0, 400)}`);
  }
  return resp.json();
}

// Get current status and data for an existing query.
export async function getQuery(queryId) {
  const resp = await fetch(`${BASE}/neuron-api/v1/queries/${queryId}`, {
    headers: apiHeaders(),
  });
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`NeuronWriter getQuery ${resp.status}: ${text.slice(0, 400)}`);
  }
  return resp.json();
}

// Poll until the query status is done/ready/completed or timeout.
export async function pollUntilReady(queryId, { maxWaitMs = 180_000, intervalMs = 6_000 } = {}) {
  const deadline = Date.now() + maxWaitMs;
  while (Date.now() < deadline) {
    const data = await getQuery(queryId);
    const status = String(data.status ?? '').toLowerCase();
    if (status === 'done' || status === 'ready' || status === 'completed') return data;
    if (status === 'error' || status === 'failed') {
      throw new Error(`NeuronWriter query ${queryId} errored: ${JSON.stringify(data).slice(0, 300)}`);
    }
    process.stdout.write('.');
    await new Promise(r => setTimeout(r, intervalMs));
  }
  throw new Error(`NeuronWriter: timed out after ${maxWaitMs}ms waiting for query ${queryId}`);
}

// Evaluate content against a completed query.
// content: plain text or HTML of the page.
// Returns { score, guidelines: [{term, status, count, recommended}], questions: [...] }
export async function scoreContent(queryId, content) {
  const resp = await fetch(`${BASE}/neuron-api/v1/queries/${queryId}/content-score`, {
    method: 'POST',
    headers: apiHeaders(),
    body: JSON.stringify({ content }),
  });
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`NeuronWriter scoreContent ${resp.status}: ${text.slice(0, 400)}`);
  }
  return resp.json();
}

// Convenience: create query, wait for it, score content, return normalised result.
// Returns { queryId, score, missing, underused, questions }
export async function analyzePageContent(keyword, content, opts = {}) {
  const q = await createQuery(keyword, opts);
  const queryId = q.query_id ?? q.id ?? q.queryId;
  if (!queryId) throw new Error(`NeuronWriter: createQuery returned no query_id: ${JSON.stringify(q).slice(0, 200)}`);

  process.stdout.write(`[neuronwriter] Query ${queryId} created, waiting for analysis`);
  const queryData = await pollUntilReady(queryId);
  process.stdout.write(' done\n');

  const scored = await scoreContent(queryId, content);
  const score = scored.score ?? scored.content_score ?? 0;

  const guidelines = scored.guidelines ?? queryData.guidelines ?? [];
  const missing   = guidelines.filter(g => g.status === 'missing').map(g => g.term);
  const underused = guidelines.filter(g => g.status === 'underused').map(g => ({
    term: g.term, count: g.count, recommended: g.recommended,
  }));

  const questions = scored.questions ?? queryData.questions ?? [];

  return { queryId, score, missing, underused, questions };
}
