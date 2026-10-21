// Exercise the real client with an in-memory state module and a mocked API.
// No real credentials, network requests, shared /tmp state, or API quota.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createContext, SourceTextModule, SyntheticModule } from 'node:vm';

const source = await readFile(new URL('../agents/lib/neuronwriter.mjs', import.meta.url), 'utf8');
const project = 'test-project';
const keyword = 'pest control birmingham al';
const html = '<h1>Pest control</h1><p>Test content.</p>';
const response = (payload, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => payload,
  text: async () => JSON.stringify(payload),
});

async function client(inventory, initialState = []) {
  const requests = [];
  const state = new Map(initialState);
  const context = createContext({
    console: { log() {}, warn() {} },
    process: {
      env: { NEURONWRITER_API_KEY: 'mock-key-only' },
      stdout: { write() {} },
    },
    fetch: async (url, init) => {
      assert.equal(new URL(url).origin, 'https://app.neuronwriter.com');
      assert.equal(init.method, 'POST');
      assert.equal(init.headers['X-API-KEY'], 'mock-key-only');
      const endpoint = new URL(url).pathname.split('/').pop();
      const body = JSON.parse(init.body);
      requests.push({ endpoint, body });
      if (endpoint === 'list-queries') {
        assert.equal(body.project, project);
        return typeof inventory === 'function' ? inventory() : inventory;
      }
      if (endpoint === 'new-query') return response({ query: 'new-query-id' });
      if (endpoint === 'get-query') return response({ status: 'ready', terms: { content_basic: [] } });
      if (endpoint === 'evaluate-content') return response({ content_score: 78 });
      throw new Error(`Unexpected mock API endpoint: ${endpoint}`);
    },
  });
  const kv = new SyntheticModule(['stateGet', 'stateSet'], function () {
    this.setExport('stateGet', async (key) => state.get(key) ?? null);
    this.setExport('stateSet', async (key, value) => {
      if (value == null) state.delete(key);
      else state.set(key, value);
    });
  }, { context });
  const module = new SourceTextModule(source, { context });
  await module.link((specifier) => {
    assert.equal(specifier, './kv.mjs', 'all external state must remain mocked');
    return kv;
  });
  await module.evaluate();
  return {
    analyze: (term = keyword) => module.namespace.analyzePageContent(term, html, { project }),
    endpoints: () => requests.map((r) => r.endpoint),
    requests,
    state,
  };
}

// An unreadable inventory is not permission to create an analysis. This also
// covers the next page in the same run: one outage must not cause a retry flood.
for (const [name, inventory, error] of [
  ['HTTP failure', response({ error: 'unavailable' }, 503), /list-queries 503/],
  ['network failure', () => { throw new Error('mock network unavailable'); }, /network unavailable/],
  ['invalid JSON', { ok: true, json: async () => { throw new SyntaxError('mock invalid JSON'); } }, /invalid JSON/],
]) {
  const c = await client(inventory);
  await assert.rejects(c.analyze(), error, name);
  await assert.rejects(c.analyze('pest control huntsville al'), error, `${name}: subsequent page`);
  assert.deepEqual(c.endpoints(), ['list-queries'], `${name}: no new-query or additional requests`);
  assert.equal(c.state.size, 0, `${name}: no quota reservation or cache write`);
}

for (const payload of [
  null,
  {},
  { data: [] },
  { queries: null },
  { queries: {} },
  { queries: [], error: 'inventory unavailable' },
  { queries: [], status: 'failed' },
  { queries: [], status: 'ERROR' },
  [null],
  [{ query: 'known-id' }],
  [{ keyword }],
  [{ keyword, query: '' }],
  [{ keyword: '', query: 'known-id' }],
]) {
  const c = await client(response(payload));
  await assert.rejects(c.analyze(), /inventory|incomplete query row/, JSON.stringify(payload));
  assert.deepEqual(c.endpoints(), ['list-queries'], 'malformed inventory cannot spend quota');
  assert.equal(c.state.size, 0, 'malformed inventory cannot reserve quota');
}

// Both supported list shapes and all existing ID aliases reuse the newest
// matching query despite keyword case or repeated whitespace.
for (const wrap of [(rows) => rows, (rows) => ({ queries: rows })]) {
  const c = await client(response(wrap([
    { keyword, query: 'old-id', created: '2026-10-01' },
    { keyword: '  PEST  control Birmingham AL ', query_id: 'newest-id', created: '2026-10-17' },
    { keyword, id: 'middle-id', created: '2026-10-10' },
  ])));
  const result = await c.analyze(' PEST  CONTROL   BIRMINGHAM AL ');
  assert.equal(result.queryId, 'newest-id');
  assert.equal(result.score, 78);
  assert.deepEqual(c.endpoints(), ['list-queries', 'get-query', 'evaluate-content']);
  assert.ok(c.requests.slice(1).every((r) => r.body.query === 'newest-id'));
  assert.ok(![...c.state.keys()].some((key) => key.startsWith('neuronwriter:budget:')));
}

// A verified empty inventory, or one containing only other keywords, still
// allows a genuinely new analysis. The next call reuses its saved ID.
for (const payload of [[], { queries: [] }, [{ keyword: 'other keyword', query: 'other-id' }]]) {
  const c = await client(response(payload));
  assert.equal((await c.analyze()).queryId, 'new-query-id');
  assert.deepEqual(c.endpoints(), ['list-queries', 'new-query', 'get-query', 'evaluate-content']);
  assert.equal((await c.analyze()).queryId, 'new-query-id');
  assert.equal(c.requests.filter((r) => r.endpoint === 'new-query').length, 1);
  const budgets = [...c.state.entries()].filter(([key]) => key.startsWith('neuronwriter:budget:'));
  assert.equal(budgets.length, 1);
  assert.equal(budgets[0][1], 1);
}

const cached = await client(response({ error: 'unavailable' }, 503), [
  [`neuronwriter:query:${project}:${keyword}`, 'cached-query-id'],
]);
assert.equal((await cached.analyze()).queryId, 'cached-query-id');
assert.deepEqual(cached.endpoints(), ['get-query', 'evaluate-content'], 'cached IDs do not require a new inventory read');

const variant = '  Pest   Control BIRMINGHAM al ';
const sequential = await client(response([]));
await sequential.analyze();
await sequential.analyze(variant);
assert.equal(sequential.requests.filter((r) => r.endpoint === 'new-query').length, 1,
  'a newly created query must be discoverable for a normalized variant in the same run');

const concurrent = await client(response({ queries: [] }));
const together = await Promise.all([concurrent.analyze(), concurrent.analyze(variant)]);
assert.ok(together.every((result) => result.queryId === 'new-query-id'));
assert.equal(concurrent.requests.filter((r) => r.endpoint === 'list-queries').length, 1);
assert.equal(concurrent.requests.filter((r) => r.endpoint === 'new-query').length, 1,
  'concurrent pages for the same normalized keyword must share one creation');
assert.equal(concurrent.requests.filter((r) => r.endpoint === 'evaluate-content').length, 2,
  'each page still gets its own content evaluation');
assert.equal([...concurrent.state.entries()].find(([key]) => key.startsWith('neuronwriter:budget:'))?.[1], 1);

console.log('✓ NeuronWriter: failed or malformed inventories never create analyses or reserve quota');
console.log('✓ NeuronWriter: both list shapes reuse existing IDs; verified absence creates once; cached IDs are preserved');
console.log('✓ NeuronWriter: sequential keyword variants and concurrent same-key calls share one new analysis');
