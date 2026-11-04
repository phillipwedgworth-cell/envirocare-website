// Focused tests for the isolated, credential-bearing read-only inventory job.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { API, PROJECTS, STATUSES, MAX_REQUESTS, MAX_RESPONSE_BYTES, MAX_RUN_MS, buildTargets, createInventoryClient, knownProjectsOnly, summarizeQueries, collectInventory, assertReviewContext, markdown } from './inventory-editorial-queries.mjs';

const qid = '1111111111111111';
const targets = [{ keyword: 'mosquito season alabama', route: '/blog/mosquito-season-birmingham-al', origins: ['saved-seasonal-guidance'] }];
const json = (data) => new Response(JSON.stringify(data), { headers: { 'content-type': 'application/json' } });
const projectRows = PROJECTS.map((p) => ({ project: p.id, name: p.expectedName }));

test('only seven unique reads, two fixed project IDs and the official host are permitted', async () => {
  const sent = [];
  const client = createInventoryClient({ key: 'TEST-KEY', fetchImpl: async (url, options) => { sent.push({ url, options }); return json([]); } });
  for (const method of ['new-query', 'get-query', 'get-content', 'evaluate-content', 'import-content', 'https://example.com/list-projects']) await assert.rejects(client.call(method, {}), /method-not-permitted/);
  await assert.rejects(client.call('list-projects', { project: PROJECTS[0].id }), /no-parameters/);
  await assert.rejects(client.call('list-queries', { project: 'ffffffffffffffff', status: 'ready' }), /fixed-scope/);
  await assert.rejects(client.call('list-queries', { project: PROJECTS[0].id, status: 'all' }), /fixed-scope/);
  await assert.rejects(client.call('list-queries', { project: PROJECTS[0].id, status: 'ready', url: 'https://example.com' }), /fixed-scope/);
  await client.call('list-projects');
  await assert.rejects(client.call('list-projects'), /duplicate/);
  for (const p of PROJECTS) for (const status of STATUSES) await client.call('list-queries', { project: p.id, status });
  await assert.rejects(client.call('list-projects'), /request-limit/);
  assert.equal(client.requestsUsed, MAX_REQUESTS);
  assert.equal(sent.length, 7);
  for (const request of sent) {
    assert.ok([`${API}/list-projects`, `${API}/list-queries`].includes(request.url));
    assert.equal(request.options.method, 'POST');
    assert.equal(request.options.redirect, 'error');
    assert.ok(request.options.signal instanceof AbortSignal);
  }
});

test('deadline and missing credentials stop before a request', async () => {
  let now = 0;
  let sent = 0;
  const fetchImpl = async () => { sent++; return json([]); };
  const client = createInventoryClient({ key: 'TEST-KEY', fetchImpl, now: () => now });
  now = MAX_RUN_MS;
  await assert.rejects(client.call('list-projects'), /run-deadline/);
  await assert.rejects(createInventoryClient({ fetchImpl }).call('list-projects'), /credential-unavailable/);
  assert.equal(sent, 0);
});

test('response bytes are capped with or without a trustworthy content-length header', async () => {
  for (const headers of [{ 'content-length': String(MAX_RESPONSE_BYTES + 1) }, {}]) {
    const client = createInventoryClient({ key: 'TEST-KEY', fetchImpl: async () => new Response(' '.repeat(MAX_RESPONSE_BYTES + 1), { headers }) });
    await assert.rejects(client.call('list-projects'), /response-byte-limit/);
    await assert.rejects(client.call('list-queries', { project: PROJECTS[0].id, status: 'ready' }), /halted/);
    assert.equal(client.requestsUsed, 1);
  }
});

test('HTTP, network and malformed JSON failures never expose response bodies, keys or raw exception text', async () => {
  for (const fetchImpl of [
    async () => new Response('PRIVATE-RESPONSE TEST-SECRET', { status: 401 }),
    async () => new Response('PRIVATE-RESPONSE TEST-SECRET', { status: 403 }),
    async () => new Response('PRIVATE-RESPONSE TEST-SECRET', { status: 429 }),
    async () => { throw new Error('PRIVATE-RESPONSE TEST-SECRET'); },
    async () => new Response('not JSON: PRIVATE-RESPONSE TEST-SECRET'),
  ]) {
    const client = createInventoryClient({ key: 'TEST-SECRET', fetchImpl });
    await assert.rejects(client.call('list-projects'), (error) => !/PRIVATE-RESPONSE|TEST-SECRET/.test(String(error)));
    await assert.rejects(client.call('list-queries', { project: PROJECTS[0].id, status: 'ready' }), /halted/);
    assert.equal(client.requestsUsed, 1);
  }
});

test('project summary never emits unrelated project IDs, names, URLs or extra fields', () => {
  const summary = knownProjectsOnly([...projectRows, { project: '9999999999999999', name: 'PRIVATE OTHER CLIENT', key: 'PRIVATE VALUE', url: 'https://private.example/' }]);
  assert.equal(summary.length, 2);
  assert.ok(summary.every((p) => p.listed && p.nameMatchesHistoricalRecord));
  assert.doesNotMatch(JSON.stringify(summary), /9999999999999999|PRIVATE|private\.example/);
  assert.equal(knownProjectsOnly([])[0].listed, false);
  assert.throws(() => knownProjectsOnly({ error: 'PRIVATE VALUE', projects: [] }), /unrecognized/);
  assert.throws(() => knownProjectsOnly([...projectRows, projectRows[0]]), /duplicate/);
  assert.throws(() => knownProjectsOnly([{ ...projectRows[0], name: 'PRIVATE OTHER CLIENT' }]), /name-mismatch/);
  assert.equal(knownProjectsOnly([{ ...projectRows[0], name: 'https://www.envirocarellc.com/' }])[0].nameMatchesHistoricalRecord, true);
});

test('exact target matches retain only bounded diagnostic metadata; pending and other-project matches do not authorize scoring', () => {
  const rows = [
    { query: qid, keyword: ' Mosquito  Season Alabama ', status: 'waiting', language: 'English', engine: 'google.com', created: '2026-10-29T10:00:00+00:00', tags: ['PRIVATE TAG'], content: 'PRIVATE CONTENT' },
    { query: '2222222222222222', keyword: 'mosquito control birmingham al', content: 'PRIVATE BUYER CONTENT' },
    { query: '3333333333333333', keyword: 'mosquito season in alabama' },
    { query: '4444444444444444', keyword: 'PRIVATE OTHER CLIENT' },
  ];
  const summary = summarizeQueries(rows, targets, 'waiting');
  assert.equal(summary.returnedRows, 4);
  assert.equal(summary.matchingRows, 1);
  assert.equal(summary.matches[0].queryId, qid);
  assert.equal(summary.matches[0].automaticScoringSelection, false);
  assert.equal(summary.matches[0].requestedStatus, 'waiting');
  assert.doesNotMatch(JSON.stringify(summary), /PRIVATE|2222222222222222|3333333333333333|4444444444444444|mosquito control|mosquito season in alabama/);
  assert.throws(() => summarizeQueries({ error: 'bad', queries: [] }, targets, 'ready'), /unrecognized/);
  assert.throws(() => summarizeQueries({ queries: [], has_more: true, next: 'PRIVATE CURSOR' }, targets, 'ready'), /incomplete/);
  assert.throws(() => summarizeQueries({ queries: [], total: 200 }, targets, 'ready'), /incomplete/);
  assert.throws(() => summarizeQueries([{ query: '../bad', keyword: 'mosquito season alabama' }], targets, 'ready'), /malformed/);
});

test('a complete two-project inventory remains separate from remaining allowance and scoring selection', async () => {
  const client = createInventoryClient({ key: 'TEST-KEY', fetchImpl: async (url, options) => {
    if (url.endsWith('/list-projects')) return json([...projectRows, { project: '9999999999999999', name: 'PRIVATE CLIENT' }]);
    const payload = JSON.parse(options.body);
    return json(payload.project === PROJECTS[1].id && payload.status === 'ready' ? [{ query: qid, keyword: targets[0].keyword }] : []);
  } });
  const result = await collectInventory({ client, targets });
  assert.equal(result.requestsUsed, 7);
  assert.equal(result.completeForBothKnownProjects, true);
  assert.equal(result.remainingMonthlyAllowance, null);
  assert.equal(result.contentEvaluations, 0);
  assert.equal(result.newQueriesCreated, 0);
  assert.equal(result.revisionsSaved, 0);
  assert.equal(result.exactMatchesAcrossInspectedProjects[0].matches[0].projectId, PROJECTS[1].id);
  assert.equal(result.exactMatchesAcrossInspectedProjects[0].absenceEstablishedWithinBothKnownProjects, false);
  assert.doesNotMatch(JSON.stringify(result), /PRIVATE CLIENT|9999999999999999/);
  assert.match(markdown(result), /Remaining monthly allowance: unknown/);
});

test('an inventory failure stops later calls and never converts an incomplete read into absence', async () => {
  const client = createInventoryClient({ key: 'TEST-KEY', fetchImpl: async (url) => url.endsWith('/list-projects') ? json(projectRows) : new Response('PRIVATE CONTENT', { status: 429 }) });
  const result = await collectInventory({ client, targets });
  assert.equal(result.status, 'blocked');
  assert.equal(result.requestsUsed, 2);
  assert.equal(result.issue, 'http-429');
  assert.equal(result.completeForBothKnownProjects, false);
  assert.equal(result.exactMatchesAcrossInspectedProjects[0].absenceEstablishedWithinBothKnownProjects, false);
  assert.equal(result.projects[1].status, 'not-attempted');
  assert.doesNotMatch(JSON.stringify(result), /PRIVATE CONTENT/);
});

test('the current manifest and two explicit seasonal candidates define the complete lookup scope', async () => {
  const batch = JSON.parse(await readFile(new URL('../agents/knowledge/editorial-batch-36.json', import.meta.url), 'utf8'));
  const found = buildTargets(batch);
  assert.ok(found.length >= 36 && found.length <= 38);
  assert.equal(found.filter((t) => t.origins.includes('editorial-manifest')).length, 36);
  assert.deepEqual(found.filter((t) => t.origins.includes('saved-seasonal-guidance')).map((t) => t.keyword), ['mosquito season alabama', 'mosquito season birmingham al']);
  assert.throws(() => buildTargets({ posts: batch.posts.slice(1) }), /36-item/);
  const duplicate = structuredClone(batch);
  duplicate.posts[1] = duplicate.posts[0];
  assert.throws(() => buildTargets(duplicate), /duplicate/);
});

test('execution is bound to the exact internal PR287 head, not a fork, merge ref or arbitrary branch', () => {
  const head = 'a'.repeat(40);
  const context = { head, eventName: 'pull_request', repository: 'phillipwedgworth-cell/envirocare-website', event: { number: 287, pull_request: { head: { sha: head, ref: 'seo/narrator-cited-content-36-2026-10-28', repo: { full_name: 'phillipwedgworth-cell/envirocare-website' } } } } };
  assert.doesNotThrow(() => assertReviewContext(context));
  for (const alter of [
    (c) => { c.head = 'b'.repeat(40); },
    (c) => { c.event.number = 288; },
    (c) => { c.event.pull_request.head.ref = 'main'; },
    (c) => { c.event.pull_request.head.repo.full_name = 'external/fork'; },
    (c) => { c.eventName = 'workflow_dispatch'; },
  ]) {
    const changed = structuredClone(context); alter(changed);
    assert.throws(() => assertReviewContext(changed), /incorrect-exact-review-context/);
  }
});
