// Read-only diagnosis of existing queries in two known EnviroCare projects.
// No scoring, new analyses, saved revisions, tags, publishing or account writes.
// API contract: https://neuronwriter.com/faqs/neuronwriter-api-how-to-use/
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const API = 'https://app.neuronwriter.com/neuron-api/0.5/writer';
export const PROJECTS = Object.freeze([
  Object.freeze({ id: '9d0bec3a70f4743c', expectedName: 'envirocarellc.com' }),
  Object.freeze({ id: '165a2e80745be990', expectedName: 'envirocarepestservices.com' }),
]);
export const STATUSES = Object.freeze(['ready', 'waiting', 'in progress']);
export const MAX_REQUESTS = 7; // One project list and three statuses per known project.
export const MAX_RESPONSE_BYTES = 2 * 1024 * 1024;
export const MAX_RUN_MS = 120_000;
const REQUEST_MS = 15_000;
const MAX_ROWS = 5000;
const MAX_MATCHED_ROWS = 250;
const METHODS = new Set(['list-projects', 'list-queries']);
const REPOSITORY = 'phillipwedgworth-cell/envirocare-website';
const BRANCH = 'seo/narrator-cited-content-36-2026-10-28';
const MANIFEST = 'agents/knowledge/editorial-batch-36.json';
// The Aug 12 handoff explicitly identifies this existing seasonal topic. It is
// an additional exact-match lookup, not a fuzzy substitute for a buyer query.
export const SEASONAL_CANDIDATES = Object.freeze([
  Object.freeze({ keyword: 'mosquito season alabama', route: '/blog/mosquito-season-birmingham-al', source: 'docs/NW-ENRICHMENT-HANDOFF-AUG12.md' }),
  Object.freeze({ keyword: 'mosquito season birmingham al', route: '/blog/mosquito-season-birmingham-al', source: 'agents/knowledge/editorial-batch-36.json: mosquito seasonal-intent review note, 2026-10-29' }),
]);
const normalize = (s) => s.trim().toLowerCase().replace(/\s+/g, ' ');
const validId = (s) => typeof s === 'string' && /^[a-f0-9]{16}$/.test(s);
const record = (x) => x !== null && typeof x === 'object' && !Array.isArray(x);
const fail = (code) => Object.assign(new Error(code), { inventoryCode: code });
const failureCode = (error) => typeof error?.inventoryCode === 'string' ? error.inventoryCode : 'unexpected-inventory-failure';
const safeMetadata = (s) => s == null ? '(omitted)' : typeof s === 'string' && /^[a-zA-Z0-9 ._()-]{1,80}$/.test(s) ? s : '(unrecognized representation)';
const safeDate = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}[T\d:.+Z-]{0,30}$/.test(s) && Number.isFinite(Date.parse(s)) ? s : null;

export function buildTargets(batch) {
  if (!Array.isArray(batch?.posts) || batch.posts.length !== 36) throw fail('invalid-36-item-manifest');
  const targets = new Map(), slugs = new Set();
  for (const p of batch.posts) {
    if (!record(p) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug ?? '') || p.route !== `/blog/${p.slug}` || typeof p.keyword !== 'string' || !/^[a-zA-Z0-9 '&?(),.-]{1,180}$/.test(p.keyword)) throw fail('invalid-manifest-target');
    const keyword = normalize(p.keyword);
    if (!keyword || slugs.has(p.slug) || targets.has(keyword)) throw fail('duplicate-manifest-target');
    slugs.add(p.slug);
    targets.set(keyword, { keyword, route: p.route, origins: ['editorial-manifest'] });
  }
  for (const candidate of SEASONAL_CANDIDATES) {
    const previous = targets.get(candidate.keyword);
    if (previous) previous.origins.push('saved-seasonal-guidance');
    else targets.set(candidate.keyword, { keyword: candidate.keyword, route: candidate.route, origins: ['saved-seasonal-guidance'] });
  }
  return [...targets.values()];
}

async function boundedJson(response) {
  const length = response.headers?.get('content-length');
  if (length !== null && length !== undefined && /^\d+$/.test(length) && Number(length) > MAX_RESPONSE_BYTES) {
    await response.body?.cancel().catch(() => {});
    throw fail('response-byte-limit');
  }
  if (!response.body?.getReader) throw fail('missing-response-stream');
  const reader = response.body.getReader();
  const chunks = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_RESPONSE_BYTES) throw fail('response-byte-limit');
      chunks.push(value);
    }
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks)));
  } catch (error) {
    await reader.cancel().catch(() => {});
    throw error?.inventoryCode ? error : fail('invalid-or-incomplete-json-response');
  } finally {
    reader.releaseLock();
  }
}

export function createInventoryClient({ key, fetchImpl = fetch, now = Date.now } = {}) {
  const expires = now() + MAX_RUN_MS;
  const sent = new Set();
  let requests = 0, halted = false;
  return {
    get requestsUsed() { return requests; },
    async call(method, payload = {}) {
      if (!METHODS.has(method)) throw fail('method-not-permitted');
      if (!record(payload)) throw fail('invalid-request-payload');
      let operation = method;
      if (method === 'list-projects' && Object.keys(payload).length) throw fail('project-list-must-have-no-parameters');
      if (method === 'list-queries') {
        if (Object.keys(payload).length !== 2 || !PROJECTS.some((p) => p.id === payload.project) || !STATUSES.includes(payload.status)) throw fail('query-list-outside-fixed-scope');
        operation += `:${payload.project}:${payload.status}`;
      }
      if (requests >= MAX_REQUESTS) throw fail('request-limit');
      if (sent.has(operation)) throw fail('duplicate-inventory-request');
      if (halted) throw fail('inventory-client-halted');
      const remaining = expires - now();
      if (remaining <= 0) throw fail('run-deadline');
      if (typeof key !== 'string' || !key.trim()) throw fail('credential-unavailable');
      requests++;
      sent.add(operation);
      try {
        const response = await fetchImpl(`${API}/${method}`, {
          method: 'POST', redirect: 'error', signal: AbortSignal.timeout(Math.min(REQUEST_MS, remaining)),
          headers: { 'X-API-KEY': key, 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          await response.body?.cancel().catch(() => {});
          throw fail(`http-${Number.isInteger(response.status) && response.status >= 100 && response.status <= 599 ? response.status : 'failure'}`);
        }
        return await boundedJson(response);
      } catch (error) {
        // No retries after an HTTP, network, deadline, parse or size failure.
        // Never return an upstream body, request headers or raw exception text.
        halted = true;
        throw error?.inventoryCode ? error : fail('network-or-request-timeout');
      }
    },
  };
}

function inventoryArray(payload, field) {
  const rows = Array.isArray(payload) ? payload : payload?.[field];
  // The documented response is an array. Also recognize the historical named
  // array envelope, but reject pagination/unknown metadata rather than mistake
  // a partial page, failure or unfamiliar shape for a complete inventory.
  const validEnvelope = Array.isArray(payload) || record(payload) && Object.keys(payload).every((k) => [field, 'status'].includes(k)) && (!payload.status || ['ok', 'success'].includes(payload.status));
  if (!validEnvelope || !Array.isArray(rows) || rows.length > MAX_ROWS) throw fail('unrecognized-or-incomplete-inventory');
  return rows;
}

export function knownProjectsOnly(payload) {
  const rows = inventoryArray(payload, 'projects');
  const known = new Map();
  for (const row of rows) {
    if (!record(row) || !validId(row.project)) throw fail('malformed-project-inventory');
    if (!PROJECTS.some((p) => p.id === row.project)) continue;
    if (known.has(row.project)) throw fail('duplicate-known-project');
    const expected = PROJECTS.find((p) => p.id === row.project).expectedName;
    const name = typeof row.name === 'string' ? normalize(row.name).replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '') : '';
    if (name !== expected) throw fail('known-project-name-mismatch');
    known.set(row.project, row);
  }
  return PROJECTS.map((p) => {
    const row = known.get(p.id);
    return { id: p.id, expectedName: p.expectedName, listed: Boolean(row), nameMatchesHistoricalRecord: row ? true : null };
  });
}

export function summarizeQueries(payload, targets, requestedStatus) {
  if (!STATUSES.includes(requestedStatus)) throw fail('invalid-inventory-status');
  const rows = inventoryArray(payload, 'queries');
  const wanted = new Map(targets.map((t) => [t.keyword, t]));
  const matches = [];
  for (const row of rows) {
    if (!record(row) || typeof row.keyword !== 'string' || !normalize(row.keyword) || !validId(row.query ?? row.id)) throw fail('malformed-query-inventory');
    const target = wanted.get(normalize(row.keyword));
    if (!target) continue;
    if (matches.length >= MAX_MATCHED_ROWS) throw fail('matched-row-limit');
    matches.push({
      keyword: target.keyword, route: target.route, origins: target.origins,
      queryId: row.query ?? row.id, requestedStatus,
      reportedStatus: safeMetadata(row.status), language: safeMetadata(row.language), engine: safeMetadata(row.engine),
      created: safeDate(row.created), updated: safeDate(row.updated),
      // Discovery does not authorize a different query/project for scoring.
      automaticScoringSelection: false,
    });
  }
  return { status: 'read', returnedRows: rows.length, matchingRows: matches.length, matches };
}

export async function collectInventory({ client, targets }) {
  const result = {
    status: 'complete', methodsAllowed: [...METHODS], requestsUsed: 0,
    newQueriesCreated: 0, contentEvaluations: 0, revisionsSaved: 0,
    remainingMonthlyAllowance: null,
    allowanceNote: 'Unknown. Inventory counts and repository budget counters are not the account monthly balance. Check Profile details > Monthly usage limit in NeuronWriter.',
    scope: 'Only two previously documented EnviroCare project IDs. Other account projects and their queries are neither inspected nor retained. No account-wide absence claim.',
    selectionNote: 'Exact case/whitespace normalization only. Matches require human intent review; none are automatically substituted into scoring. Waiting/in-progress matches are diagnostics only.',
    targetCount: targets.length, seasonalCandidates: SEASONAL_CANDIDATES,
    projects: PROJECTS.map((p) => ({ ...p, listed: null, status: 'not-attempted', inventories: {} })),
  };
  try {
    const discovered = knownProjectsOnly(await client.call('list-projects'));
    for (const project of result.projects) {
      Object.assign(project, discovered.find((p) => p.id === project.id));
      if (!project.listed) { project.status = 'not-listed'; continue; }
      project.status = 'reading';
      for (const status of STATUSES) project.inventories[status] = summarizeQueries(await client.call('list-queries', { project: project.id, status }), targets, status);
      project.status = 'read';
    }
  } catch (error) {
    result.status = 'blocked';
    result.issue = failureCode(error);
    for (const project of result.projects) if (project.status === 'reading') project.status = 'incomplete';
  }
  result.requestsUsed = client.requestsUsed;
  result.completeForBothKnownProjects = result.projects.every((p) => p.status === 'read');
  result.exactMatchesAcrossInspectedProjects = targets.map((target) => {
    const matches = result.projects.flatMap((p) => Object.values(p.inventories).flatMap((s) => s.matches.filter((q) => q.keyword === target.keyword).map((q) => ({ projectId: p.id, queryId: q.queryId, requestedStatus: q.requestedStatus }))));
    return { ...target, matches, absenceEstablishedWithinBothKnownProjects: result.completeForBothKnownProjects && matches.length === 0 };
  });
  return result;
}

export function assertReviewContext({ eventName, repository, event, head }) {
  const pr = event?.pull_request;
  if (eventName !== 'pull_request' || repository !== REPOSITORY || event?.number !== 287 || pr?.head?.repo?.full_name !== REPOSITORY || pr?.head?.ref !== BRANCH || !/^[a-f0-9]{40}$/.test(head ?? '') || pr?.head?.sha !== head) throw fail('incorrect-exact-review-context');
}

export function markdown(result) {
  let out = `# Existing NeuronWriter query inventory\n\nChecked: ${result.checkedAt}\n\nCommit: ${result.headCommit}\n\nStatus: **${result.status}**; ${result.requestsUsed}/${MAX_REQUESTS} maximum read requests.\n\n`;
  out += `${result.scope}\n\n${result.selectionNote}\n\n**Remaining monthly allowance: unknown.** ${result.allowanceNote}\n\nNo new analyses, content scores, saved revisions or other account changes were made.\n\n`;
  out += '| Known project | Listed | Read state | Ready rows | Waiting rows | In-progress rows |\n|---|---|---|---:|---:|---:|\n';
  for (const p of result.projects) out += `| ${p.id} (${p.expectedName}) | ${p.listed ?? 'unknown'} | ${p.status} | ${p.inventories.ready?.returnedRows ?? 'not read'} | ${p.inventories.waiting?.returnedRows ?? 'not read'} | ${p.inventories['in progress']?.returnedRows ?? 'not read'} |\n`;
  out += '\n## Exact target matches\n\nQuery IDs below are discovery evidence, not approved scoring mappings.\n\n| Keyword | Known-project matches | Absence established in both known projects |\n|---|---|---|\n';
  for (const row of result.exactMatchesAcrossInspectedProjects) out += `| ${row.keyword} | ${row.matches.map((m) => `${m.projectId}/${m.queryId} (${m.requestedStatus})`).join('; ') || 'none observed'} | ${row.absenceEstablishedWithinBothKnownProjects} |\n`;
  out += '\nThe explicit seasonal lookups are `mosquito season alabama` (Aug 12 handoff) and `mosquito season birmingham al` (Oct 29 editorial review note). These are exact diagnostic candidates, not automatic keyword remapping. A commercial mosquito-control query does not validate seasonal search intent.\n';
  if (result.issue) out += `\nStopped with sanitized diagnostic: ${result.issue}. An incomplete inventory does not prove absence.\n`;
  return out;
}

async function run() {
  if (process.env.GITHUB_ACTIONS !== 'true' || !process.env.GITHUB_EVENT_PATH) throw fail('github-review-job-required');
  const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, 'utf8'));
  // The child process receives no service key and performs no network action.
  const head = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8', env: { PATH: process.env.PATH, LANG: 'C' } }).trim();
  assertReviewContext({ eventName: process.env.GITHUB_EVENT_NAME, repository: process.env.GITHUB_REPOSITORY, event, head });
  const rawManifest = await readFile(MANIFEST, 'utf8');
  const targets = buildTargets(JSON.parse(rawManifest));
  const client = createInventoryClient({ key: process.env.NEURONWRITER_API_KEY?.replace(/^\uFEFF/, '').trim() });
  const result = {
    checkedAt: new Date().toISOString(), headCommit: head,
    manifestPath: MANIFEST, manifestSha256: createHash('sha256').update(rawManifest).digest('hex'),
    ...(await collectInventory({ client, targets })),
  };
  const out = resolve('audit-results/editorial-query-inventory');
  await mkdir(out, { recursive: true });
  await writeFile(resolve(out, 'results.json'), JSON.stringify(result, null, 2) + '\n');
  await writeFile(resolve(out, 'results.md'), markdown(result));
  console.log(`Existing-query inventory: ${result.status}; ${result.requestsUsed}/${MAX_REQUESTS} read requests. Monthly allowance remains unknown. No account changes.`);
  if (result.status !== 'complete' || !result.completeForBothKnownProjects) process.exitCode = 2;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run().catch((error) => { console.error(`Existing-query inventory blocked: ${failureCode(error)}.`); process.exitCode = 1; });
}
