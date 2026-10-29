// Exact-render scoring for the 36-item editorial review. No editor writes,
// query creation, model generation, publication, email or database writes.
// API contract: https://neuronwriter.com/faqs/neuronwriter-api-how-to-use/
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

export const PROJECT = '9d0bec3a70f4743c';
export const API = 'https://app.neuronwriter.com/neuron-api/0.5/writer';
export const SITE = 'https://www.envirocarellc.com';
const METHODS = new Set(['list-queries', 'evaluate-content']);
const BATCH_SIZE = 36;
const MAX_EVALUATIONS = 72;
const sha256 = (s) => createHash('sha256').update(s).digest('hex');
export const normalizeKeyword = (s) => String(s ?? '').trim().toLowerCase().replace(/\s+/g, ' ');

function decode(s) {
  const named = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ' };
  return String(s).replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (all, v) => {
    if (v[0] !== '#') return named[v.toLowerCase()] ?? all;
    const n = v[1].toLowerCase() === 'x' ? parseInt(v.slice(2), 16) : Number(v.slice(1));
    return Number.isInteger(n) && n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : all;
  });
}

function attrs(tag) {
  const a = {};
  for (const m of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    a[m[1].toLowerCase()] = decode(m[2] ?? m[3] ?? m[4]);
  }
  return a;
}

function plain(html) {
  return decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

// The renderer's containers are stable. Balance nested divs rather than ending
// at the first closing div, which would silently score a truncated article.
export function fragmentByClass(html, tag, className) {
  const re = new RegExp(`<!--[^]*?-->|<\\/?${tag}\\b(?:[^>"']|"[^"]*"|'[^']*')*>`, 'gi');
  let first = null, depth = 0, count = 0, fragment = null;
  for (const m of html.matchAll(re)) {
    if (m[0].startsWith('<!--')) continue;
    const closing = m[0].startsWith('</');
    const classes = closing ? [] : (attrs(m[0]).class ?? '').split(/\s+/);
    if (classes.includes(className)) {
      count++;
      if (first !== null) throw new Error(`nested duplicate ${className}`);
      first = { start: m.index, inner: m.index + m[0].length };
      depth = 1;
    } else if (first !== null) {
      if (closing) depth--;
      else if (!m[0].endsWith('/>')) depth++;
      if (depth === 0) {
        fragment = { outer: html.slice(first.start, m.index + m[0].length), inner: html.slice(first.inner, m.index) };
        first = null;
      }
    }
  }
  if (count !== 1 || first !== null || !fragment) throw new Error(`expected one complete ${className}`);
  return fragment;
}

export function extractRenderedPost(html, route) {
  const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
  const descriptions = [...html.matchAll(/<meta\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi)]
    .map((m) => attrs(m[0])).filter((a) => a.name === 'description');
  const canonicals = [...html.matchAll(/<link\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi)]
    .map((m) => attrs(m[0])).filter((a) => a.rel === 'canonical');
  if (titles.length !== 1 || descriptions.length !== 1 || canonicals.length !== 1) throw new Error('ambiguous or missing metadata');
  const canonical = canonicals[0].href;
  if (canonical !== SITE + route) throw new Error('canonical does not match the intended production route');
  const h1 = fragmentByClass(html, 'h1', 'bpp-title');
  const excerpt = fragmentByClass(html, 'p', 'bpp-excerpt');
  const body = fragmentByClass(html, 'div', 'bpp-body');
  if (!plain(h1.inner) || plain(body.inner).split(/\s+/).length < 80) throw new Error('missing or implausibly short rendered article');
  if (/<(?:script|iframe)\b/i.test(body.inner)) throw new Error('unexpected executable article content');
  const title = plain(titles[0][1]);
  const description = descriptions[0].content;
  if (!title || !description) throw new Error('empty title or description');
  const scoringHtml = `${h1.outer}\n${excerpt.outer}\n${body.inner}`;
  const payloadHash = sha256(JSON.stringify({ html: scoringHtml, title, description }));
  return {
    html: scoringHtml, title, description, canonical,
    h1: plain(h1.inner), articleWords: plain(body.inner).split(/\s+/).length,
    renderedSha256: sha256(html), scoringPayloadSha256: payloadHash,
  };
}

export function validateManifest(batch) {
  if (!Array.isArray(batch?.posts) || batch.posts.length !== BATCH_SIZE) throw new Error('expected exactly 36 review items');
  const slugs = new Set(), keywords = new Set();
  for (const p of batch.posts) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug) || p.route !== `/blog/${p.slug}`) throw new Error('invalid review route');
    const keyword = normalizeKeyword(p.keyword);
    if (!keyword || slugs.has(p.slug) || keywords.has(keyword)) throw new Error('duplicate or missing review slug/keyword');
    if (!['refresh-existing', 'new-data-center-guide', 'draft-from-pr-286'].includes(p.kind)) throw new Error('unknown review item kind');
    slugs.add(p.slug); keywords.add(keyword);
  }
  return batch.posts;
}

// Only exact normalized keyword matches. Existing READY queries are selected
// deterministically; different intents never fall back to a fuzzy match.
export function selectQuery(inventory, keyword) {
  if (!Array.isArray(inventory)) throw new Error('query inventory is not an array');
  const wanted = normalizeKeyword(keyword);
  const candidates = [];
  for (const row of inventory) {
    if (!row || typeof row !== 'object' || typeof row.keyword !== 'string') throw new Error('malformed query inventory');
    if (normalizeKeyword(row.keyword) !== wanted) continue;
    const id = row.query ?? row.id;
    if (typeof id !== 'string' || !/^[a-zA-Z0-9_-]{4,100}$/.test(id)) throw new Error('matched query has invalid ID');
    if (row.status && row.status !== 'ready') continue;
    if (row.language && !/^english$/i.test(row.language)) continue;
    if (row.engine && !/^google\.com$/i.test(row.engine)) continue;
    candidates.push({ id, created: row.created ?? null, timestamp: Date.parse(row.created ?? ''), language: row.language ?? null, engine: row.engine ?? null });
  }
  const unique = [...new Map(candidates.map((q) => [q.id, q])).values()];
  if (!unique.length) return { status: 'missing-existing-query' };
  if (unique.length > 1) {
    if (unique.some((q) => !Number.isFinite(q.timestamp))) return { status: 'ambiguous-existing-query', candidateCount: unique.length };
    unique.sort((a, b) => b.timestamp - a.timestamp);
    if (unique[0].timestamp === unique[1].timestamp) return { status: 'ambiguous-existing-query', candidateCount: unique.length };
  }
  const { timestamp, ...query } = unique[0];
  return { status: 'matched', ...query, candidateCount: unique.length };
}

export function createClient({ key, fetchImpl = fetch, maxEvaluations = MAX_EVALUATIONS } = {}) {
  if (!Number.isInteger(maxEvaluations) || maxEvaluations < 1 || maxEvaluations > MAX_EVALUATIONS) throw new Error('invalid evaluation limit');
  let evaluations = 0;
  const deadline = Date.now() + 8 * 60 * 1000;
  return async function call(method, payload) {
    if (!METHODS.has(method)) throw new Error('API method not permitted in score-only validation');
    if (Date.now() >= deadline) {
      const err = new Error('bounded scoring duration reached');
      err.stopRun = true;
      throw err;
    }
    if (!key) throw new Error('NEURONWRITER_API_KEY unavailable to score-only job');
    if (method === 'list-queries' && (payload?.project !== PROJECT || payload?.status !== 'ready')) throw new Error('invalid query-list scope');
    if (method === 'evaluate-content') {
      if (++evaluations > maxEvaluations) throw new Error('bounded evaluation limit reached');
      if (!/^[a-zA-Z0-9_-]{4,100}$/.test(payload?.query ?? '') || typeof payload?.html !== 'string' || !payload.html || 'url' in payload || Object.keys(payload).some((k) => !['query', 'html', 'title', 'description'].includes(k))) throw new Error('rendered HTML required; URL import is prohibited');
    }
    const response = await fetchImpl(`${API}/${method}`, {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(30000),
      headers: { 'X-API-KEY': key, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    // Never log raw API responses: they can include account content or echoed input.
    if (!response.ok) {
      const err = new Error(`NeuronWriter ${method}: HTTP ${response.status}`);
      err.stopRun = [401, 403, 429].includes(response.status);
      throw err;
    }
    let data;
    try { data = await response.json(); } catch { throw new Error(`NeuronWriter ${method}: invalid JSON`); }
    return data;
  };
}

export async function scorePair({ call, queryId, before, after }) {
  const evaluate = async (input) => {
    const r = await call('evaluate-content', { query: queryId, html: input.html, title: input.title, description: input.description });
    if (r?.status && r.status !== 'ok') throw new Error('NeuronWriter evaluation did not report success');
    if (typeof r?.content_score !== 'number' || !Number.isFinite(r.content_score) || r.content_score < 0 || r.content_score > 100) throw new Error('NeuronWriter evaluation returned no valid numeric score');
    return r.content_score;
  };
  const beforeScore = before ? await evaluate(before) : null;
  const afterScore = await evaluate(after);
  return { before: beforeScore, after: afterScore, delta: beforeScore === null ? null : afterScore - beforeScore };
}

export function qualityFlags(score) {
  if (!score) return [];
  const flags = [];
  if (score.after < 65) flags.push('below-existing-65-floor');
  if (score.after < 70) flags.push('below-70-target');
  if (score.delta !== null && score.delta < 0) flags.push('regression');
  return flags;
}

async function readRendered(buildDir, post) {
  return extractRenderedPost(await readFile(join(buildDir, 'blog', `${post.slug}.html`), 'utf8'), post.route);
}

function safeError(error) {
  // Our errors are fixed messages. Unknown transport errors are intentionally
  // reduced to their class so no credentials or reflected headers are retained.
  const known = /^(NeuronWriter |expected |invalid |duplicate |unknown review|ambiguous |canonical |missing |unexpected |empty |query inventory|malformed |matched query|bounded |rendered HTML|NEURONWRITER_API_KEY)/;
  return known.test(error?.message ?? '') ? error.message : `validation failed (${error?.name ?? 'Error'})`;
}

function gitSha(cwd) {
  return execFileSync('git', ['rev-parse', 'HEAD'], { cwd, encoding: 'utf8' }).trim();
}

export async function run({
  root = process.cwd(),
  buildDir = resolve(root, '.next/server/app'),
  baseRoot = resolve(root, '../baseline'),
  baseBuildDir = resolve(baseRoot, '.next/server/app'),
  outputDir = resolve(root, 'audit-results/editorial-batch-score'),
  exportDir = null,
  provenancePath = null,
  prepareOnly = false,
  key = process.env.NEURONWRITER_API_KEY,
} = {}) {
  const batch = JSON.parse(await readFile(resolve(root, 'agents/knowledge/editorial-batch-36.json'), 'utf8'));
  const posts = validateManifest(batch);
  const result = {
    checkedAt: new Date().toISOString(), status: 'blocked',
    headCommit: gitSha(root), baseCommit: gitSha(baseRoot), project: PROJECT,
    scope: '36 exact rendered articles: H1, excerpt and article body with rendered title/description. Global navigation, byline and shared CTA excluded consistently.',
    methodsAllowed: [...METHODS], newQueriesCreated: 0, revisionsSaved: 0,
    scoringRun: !prepareOnly, rows: [],
  };
  await mkdir(outputDir, { recursive: true });
  const inputs = [];
  for (const post of posts) {
    const row = { slug: post.slug, route: post.route, keyword: post.keyword, kind: post.kind, status: 'blocked', score: null };
    result.rows.push(row);
    try {
      const after = await readRendered(buildDir, post);
      const before = post.kind === 'refresh-existing' ? await readRendered(baseBuildDir, post) : null;
      const auditInput = (input) => input && { title: input.title, description: input.description, canonical: input.canonical, h1: input.h1, articleWords: input.articleWords, renderedSha256: input.renderedSha256, scoringPayloadSha256: input.scoringPayloadSha256 };
      row.afterInput = auditInput(after); row.beforeInput = auditInput(before);
      row.status = 'prepared';
      inputs.push({ row, after, before });
    } catch (error) { row.issue = safeError(error); }
  }
  // The secret-bearing job receives inert HTML from this same workflow run.
  // Bind those artifacts to both exact commits and every prepared payload hash.
  if (provenancePath) {
    const proof = JSON.parse(await readFile(provenancePath, 'utf8'));
    if (inputs.length !== BATCH_SIZE || proof.headCommit !== result.headCommit || proof.baseCommit !== result.baseCommit || proof.status !== 'prepared-only' || proof.rows?.length !== BATCH_SIZE || new Set(proof.rows.map((p) => p.slug)).size !== BATCH_SIZE) throw new Error('invalid rendered-artifact provenance');
    for (const row of result.rows) {
      const expected = proof.rows.find((p) => p.slug === row.slug);
      if (expected?.status !== 'prepared' || expected.route !== row.route || expected.keyword !== row.keyword || expected.kind !== row.kind) throw new Error('invalid rendered-artifact source metadata');
      for (const side of ['beforeInput', 'afterInput']) {
        if (expected?.[side]?.renderedSha256 !== row[side]?.renderedSha256 || expected?.[side]?.scoringPayloadSha256 !== row[side]?.scoringPayloadSha256) throw new Error('invalid rendered-artifact hash');
      }
    }
  }
  if (!prepareOnly && inputs.length) {
    const call = createClient({ key });
    try {
      const inventory = await call('list-queries', { project: PROJECT, status: 'ready' });
      if (!Array.isArray(inventory)) throw new Error('query inventory is not an array');
      for (const item of inputs) {
        const { row, after, before } = item;
        try {
          const q = selectQuery(inventory, row.keyword);
          row.query = q;
          if (q.status !== 'matched') { row.status = 'blocked'; row.issue = q.status; continue; }
          row.score = await scorePair({ call, queryId: q.id, before, after });
          row.qualityFlags = qualityFlags(row.score);
          row.status = 'scored';
        } catch (error) {
          row.status = 'blocked'; row.issue = safeError(error);
          if (error.stopRun) throw error;
        }
        await new Promise((resolveDelay) => setTimeout(resolveDelay, 350));
      }
    } catch (error) { result.issue = safeError(error); }
  }
  for (const row of result.rows) if (row.status === 'prepared' && !prepareOnly) { row.status = 'blocked'; row.issue ??= result.issue ?? 'evaluation not completed'; }
  const scored = result.rows.filter((r) => r.status === 'scored').length;
  const prepared = result.rows.filter((r) => r.status === 'prepared').length;
  result.counts = { total: posts.length, scored, prepared, blocked: posts.length - scored - prepared };
  result.scoreQuality = {
    existingNarratorFloor: 65, desiredCoverageRange: [70, 80],
    belowFloor: result.rows.filter((r) => r.qualityFlags?.includes('below-existing-65-floor')).length,
    belowTarget: result.rows.filter((r) => r.qualityFlags?.includes('below-70-target')).length,
    regressions: result.rows.filter((r) => r.qualityFlags?.includes('regression')).length,
    releaseApproved: false,
    note: 'Scores are keyword-coverage guidance. Complete scoring does not approve factual accuracy, originality, layout, release or publication. Review any low score or regression; never add unsupported claims to raise a score.',
  };
  result.status = prepareOnly ? (prepared === posts.length ? 'prepared-only' : 'blocked') : scored === posts.length ? 'scored' : scored ? 'partial' : 'blocked';
  await writeFile(join(outputDir, 'results.json'), JSON.stringify(result, null, 2) + '\n');
  const esc = (v) => String(v ?? '').replace(/\|/g, '\\|').replace(/[\r\n]/g, ' ');
  const rows = result.rows.map((r) => `| ${esc(r.route)} | ${esc(r.query?.id)} | ${esc(r.score?.before)} | ${esc(r.score?.after)} | ${esc(r.score?.delta)} | ${esc(r.status)} | ${esc(r.issue ?? r.qualityFlags?.join(', '))} |`);
  const md = `# Exact editorial-batch scoring\n\nChecked: ${result.checkedAt}\n\nHead: ${result.headCommit}\n\nBase: ${result.baseCommit}\n\nStatus: **${result.status}**. Scored ${scored}/36; prepared ${prepared}; blocked ${result.counts.blocked}.\n\n${result.scope}\n\nNo new analyses, editor revisions, publishing, fill runs, messages or database writes are performed. Missing exact queries stay blocked.\n\n## Score quality — release remains unapproved\n\nExisting Narrator floor: 65. Desired coverage range: 70–80. Of the scored rows: ${result.scoreQuality.belowFloor} below 65, ${result.scoreQuality.belowTarget} below 70, ${result.scoreQuality.regressions} regressions. ${result.scoreQuality.note}\n\n| Route | Existing query | Before | After | Delta | State | Issue / quality flag |\n|---|---|---:|---:|---:|---|---|\n${rows.join('\n')}\n`;
  await writeFile(join(outputDir, 'results.md'), md);
  if (exportDir && result.status === 'prepared-only') {
    await mkdir(join(exportDir, 'head/blog'), { recursive: true });
    await mkdir(join(exportDir, 'base/blog'), { recursive: true });
    for (const post of posts) {
      await copyFile(join(buildDir, 'blog', `${post.slug}.html`), join(exportDir, 'head/blog', `${post.slug}.html`));
      if (post.kind === 'refresh-existing') await copyFile(join(baseBuildDir, 'blog', `${post.slug}.html`), join(exportDir, 'base/blog', `${post.slug}.html`));
    }
    await copyFile(join(outputDir, 'results.json'), join(exportDir, 'provenance.json'));
  }
  return result;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const fromArtifact = process.argv.includes('--from-rendered-artifact');
  run({
    prepareOnly: process.argv.includes('--prepare-only'),
    exportDir: process.argv.includes('--export-rendered') ? resolve('audit-results/editorial-rendered') : null,
    ...(fromArtifact ? {
      buildDir: resolve('../rendered/head'),
      baseBuildDir: resolve('../rendered/base'),
      provenancePath: resolve('../rendered/provenance.json'),
    } : {}),
  }).then((r) => {
    console.log(`Exact-content validation: ${r.status}; ${r.counts.scored} scored, ${r.counts.prepared} prepared, ${r.counts.blocked} blocked. No writes or new analyses.`);
    process.exitCode = ['scored', 'prepared-only'].includes(r.status) ? 0 : 2;
  }).catch((error) => { console.error(safeError(error)); process.exitCode = 1; });
}
