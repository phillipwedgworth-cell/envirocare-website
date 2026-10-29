// Boundary tests for the credential-bearing, score-only validation path.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { API, PROJECT, SITE, fragmentByClass, extractRenderedPost, validateManifest, selectQuery, createClient, scorePair, qualityFlags } from './score-editorial-batch.mjs';

const words = Array.from({ length: 90 }, (_, i) => `word${i}`).join(' ');
const route = '/blog/test-article';
const fixture = `<html><head><title>Article &amp; guide</title><meta name="description" content="A useful &quot;description&quot;"><link rel="canonical" href="${SITE}${route}"></head><body><nav>Not article copy</nav><h1 class="bpp-title">The article</h1><p class="bpp-excerpt">Exact introduction.</p><div class="bpp-body"><p>${words}</p><div class="callout"><div>Nested content</div></div><h2>Final section</h2><p>Final paragraph.</p></div><aside>Shared CTA</aside></body></html>`;
const input = { html: '<h1>Exact rendered draft</h1>', title: 'Title', description: 'Description' };

test('extracts the complete nested article and exact visible excerpt, excluding shared chrome', () => {
  const r = extractRenderedPost(fixture, route);
  assert.match(r.html, /Nested content/);
  assert.match(r.html, /Final paragraph/);
  assert.match(r.html, /Exact introduction/);
  assert.doesNotMatch(r.html, /Not article copy|Shared CTA/);
  assert.equal(r.title, 'Article & guide');
  assert.equal(r.description, 'A useful "description"');
  assert.equal(r.canonical, SITE + route);
  assert.equal(r.scoringPayloadSha256.length, 64);
  assert.notEqual(r.scoringPayloadSha256, extractRenderedPost(fixture.replace('Final paragraph.', 'Changed paragraph.'), route).scoringPayloadSha256);
});

test('fails closed on wrong canonicals, ambiguous or truncated containers, and executable article content', () => {
  assert.throws(() => extractRenderedPost(fixture, '/blog/wrong'), /canonical/);
  assert.throws(() => extractRenderedPost(fixture.replace('</body>', '<div class="bpp-body">duplicate</div></body>'), route), /expected one/);
  assert.throws(() => fragmentByClass('<div class="bpp-body"><div>unclosed', 'div', 'bpp-body'), /complete/);
  assert.throws(() => extractRenderedPost(fixture.replace('<h2>Final', '<script>unexpected()</script><h2>Final'), route), /executable/);
  assert.throws(() => extractRenderedPost(fixture.replace('<title>', '<title>duplicate</title><title>'), route), /metadata/);
});

test('the actual manifest contains exactly 36 unique routes and keyword intents', async () => {
  const manifest = JSON.parse(await readFile(new URL('../agents/knowledge/editorial-batch-36.json', import.meta.url), 'utf8'));
  assert.equal(validateManifest(manifest).length, 36);
  assert.equal(manifest.posts.filter((p) => p.kind === 'refresh-existing').length, 30);
  assert.throws(() => validateManifest({ posts: manifest.posts.slice(1) }), /exactly 36/);
  const duplicate = structuredClone(manifest);
  duplicate.posts[1] = duplicate.posts[0];
  assert.throws(() => validateManifest(duplicate), /duplicate/);
  const changedRoute = structuredClone(manifest);
  changedRoute.posts[0].route = '/api/nw';
  assert.throws(() => validateManifest(changedRoute), /route/);
});

test('matches exact English google.com READY queries and picks only an unambiguous newest duplicate', () => {
  const rows = [
    { query: 'old-query', keyword: ' Target   Keyword ', created: '2026-10-01' },
    { query: 'new-query', keyword: 'target keyword', created: '2026-10-28', status: 'ready', language: 'English', engine: 'google.com' },
    { query: 'wrong-intent', keyword: 'target keyword near me', created: '2026-10-29' },
    { query: 'not-ready', keyword: 'target keyword', created: '2026-10-29', status: 'pending' },
    { query: 'wrong-engine', keyword: 'target keyword', created: '2026-10-29', engine: 'google.co.uk' },
  ];
  assert.equal(selectQuery(rows, 'TARGET KEYWORD').id, 'new-query');
  assert.equal(selectQuery(rows, 'other keyword').status, 'missing-existing-query');
  assert.equal(selectQuery(rows.slice(0, 2).map((r) => ({ ...r, created: undefined })), 'target keyword').status, 'ambiguous-existing-query');
  assert.equal(selectQuery(rows.slice(0, 2).map((r) => ({ ...r, created: '2026-10-28' })), 'target keyword').status, 'ambiguous-existing-query');
  assert.throws(() => selectQuery([{ query: '../unsafe', keyword: 'target keyword' }], 'target keyword'), /invalid ID/);
});

test('client permits only the fixed account inventory and raw-HTML evaluations, with a hard request bound', async () => {
  const calls = [];
  const call = createClient({ key: 'TEST-KEY', maxEvaluations: 1, fetchImpl: async (url, options) => {
    calls.push({ url, options });
    return { ok: true, json: async () => ({ content_score: 55 }) };
  } });
  await assert.rejects(call('new-query', {}), /not permitted/);
  await assert.rejects(call('import-content', {}), /not permitted/);
  await assert.rejects(call('list-queries', { project: 'wrong', status: 'ready' }), /scope/);
  await call('list-queries', { project: PROJECT, status: 'ready' });
  await call('evaluate-content', { query: 'test-query', ...input });
  await assert.rejects(call('evaluate-content', { query: 'test-query', ...input }), /limit/);
  assert.equal(calls.length, 2);
  assert.equal(calls[0].url, `${API}/list-queries`);
  assert.equal(calls[1].url, `${API}/evaluate-content`);
  assert.equal(calls[1].options.redirect, 'error');
  assert.equal(calls[1].options.method, 'POST');
  assert.throws(() => createClient({ key: 'TEST-KEY', maxEvaluations: 73 }), /limit/);
  const urlCall = createClient({ key: 'TEST-KEY', fetchImpl: () => { throw new Error('must not send'); } });
  await assert.rejects(urlCall('evaluate-content', { query: 'test-query', ...input, url: 'https://example.com' }), /URL import/);
});

test('HTTP authorization or rate errors stop the run without echoing an upstream body or key', async () => {
  for (const status of [401, 403, 429]) {
    const call = createClient({ key: 'TEST-SECRET', fetchImpl: async () => ({ ok: false, status, json: () => { throw new Error('TEST-SECRET'); } }) });
    await assert.rejects(call('list-queries', { project: PROJECT, status: 'ready' }), (error) => error.stopRun === true && !error.message.includes('TEST-SECRET'));
  }
});

test('before/after uses the same existing query; numeric zero is valid and malformed scores never pass', async () => {
  const seen = [];
  const scores = [0, 52];
  const result = await scorePair({ queryId: 'test-query', before: input, after: { ...input, html: '<h1>Revised</h1>' }, call: async (method, payload) => {
    seen.push({ method, payload });
    return { status: 'ok', content_score: scores.shift() };
  } });
  assert.deepEqual(result, { before: 0, after: 52, delta: 52 });
  assert.deepEqual(seen.map((c) => c.method), ['evaluate-content', 'evaluate-content']);
  assert.deepEqual(seen.map((c) => c.payload.query), ['test-query', 'test-query']);
  for (const score of ['52', null, undefined, -1, 101, NaN]) {
    await assert.rejects(scorePair({ queryId: 'test-query', after: input, call: async () => ({ content_score: score }) }), /numeric score/);
  }
  await assert.rejects(scorePair({ queryId: 'test-query', after: input, call: async () => ({ status: 'error', content_score: 80 }) }), /success/);
});

test('numeric scoring success remains separate from low-score and regression review gates', () => {
  assert.deepEqual(qualityFlags({ after: 64, delta: -1 }), ['below-existing-65-floor', 'below-70-target', 'regression']);
  assert.deepEqual(qualityFlags({ after: 69, delta: 2 }), ['below-70-target']);
  assert.deepEqual(qualityFlags({ after: 75, delta: -1 }), ['regression']);
  assert.deepEqual(qualityFlags({ after: 80, delta: null }), []);
});
