// Pure gates used before NeuronNarrator changes an editor. No API calls or credits.
import { readFileSync } from 'node:fs';
import { compileRules, scanText } from '../../scripts/lib/compliance-rules.mjs';

export const SOURCES = JSON.parse(readFileSync(new URL('../knowledge/editorial-sources.json', import.meta.url), 'utf8')).sources;
const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const strip = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
const canonicalSource = value => {
  try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password && !u.port ? `${u.origin}${u.pathname.replace(/\/$/, '')}` : null; }
  catch { return null; }
};

export function sourcesFor(keyword) {
  const text = norm(keyword);
  const matched = SOURCES.filter(s => s.topics.some(t => {
    const phrase = norm(t);
    return [phrase, `${phrase}s`, `${phrase}es`].some(v => ` ${text} `.includes(` ${v} `));
  }));
  return matched.length ? matched : SOURCES.filter(s => s.id === 'epa-prevention');
}

export function sourcePrompt(keyword) {
  return sourcesFor(keyword).map(s => `- ${s.title}: ${s.url}\n  Supported point ONLY: ${s.supports}`).join('\n');
}

export function assessEditorialDraft(html, { keyword = '', title = '', metaTitle, metaDescription } = {}) {
  const problems = [];
  if (metaTitle !== undefined && (!String(metaTitle).trim() || metaTitle.length > 60)) problems.push('meta title must contain 1–60 characters');
  if (metaDescription !== undefined && (!String(metaDescription).trim() || metaDescription.length > 155)) problems.push('meta description must contain 1–155 characters');
  const scan = scanText(`${title}\n${html}`, compileRules());
  for (const hit of scan.blocking || []) problems.push(`compliance: ${hit.reason}`);
  if (/<script\b|<iframe\b|\bon[a-z]+\s*=/i.test(html)) problems.push('active HTML is not permitted');
  const lede = String(html).match(/^\s*<p\b[^>]*class=["'][^"']*\blede\b[^"']*["'][^>]*>([\s\S]*?)<\/p>/i);
  const words = strip(lede?.[1]).split(/\s+/).filter(Boolean).length;
  if (!lede || words < 15 || words > 100) problems.push('open with a concise 15–100 word lede answering the search');
  if (![...String(html).matchAll(/<h[23]\b[^>]*>([\s\S]*?)<\/h[23]>/gi)].some(m => strip(m[1]).endsWith('?'))) problems.push('include a question heading with a useful answer');
  if (/\bhref\s*=\s*(?![\s"'])[^\s]/i.test(html)) problems.push('link attributes must be quoted');
  const links = [...String(html).matchAll(/href\s*=\s*["']([^"']+)["']/gi)].map(m => m[1]);
  if (links.some(h => !h.startsWith('/') && !h.startsWith('#') && !h.startsWith('https://') && !h.startsWith('tel:'))) problems.push('unsupported link scheme');
  if (links.some(h => h.startsWith('//'))) problems.push('protocol-relative links are not permitted');
  const external = links.filter(h => h.startsWith('https://') && !h.startsWith('https://www.envirocarellc.com/'));
  const allowed = new Set(sourcesFor(keyword).map(s => canonicalSource(s.url)));
  if (!external.some(h => allowed.has(canonicalSource(h)))) problems.push('cite at least one relevant verified source from the supplied source list');
  if (external.some(h => !allowed.has(canonicalSource(h)))) problems.push('external citation is outside the relevant verified source list');
  return { pass: problems.length === 0, problems, warnings: scan.warnings || [], citations: external };
}

// One editor per normalized keyword per run. Prefer READY rows, then newest;
// stable ID breaks ties so API response ordering cannot change the selection.
export function selectNarratorQueries(rows, priorities = []) {
  const rank = new Map(priorities.map((k, i) => [norm(k), i]));
  const byKeyword = new Map();
  const valid = rows.filter(q => (q.query || q.id) && norm(q.keyword));
  const ordered = [...valid].sort((a, b) =>
    Number(b.status === 'ready') - Number(a.status === 'ready') ||
    String(b.updated || '').localeCompare(String(a.updated || '')) ||
    String(a.query || a.id).localeCompare(String(b.query || b.id)));
  for (const q of ordered) if (!byKeyword.has(norm(q.keyword))) byKeyword.set(norm(q.keyword), q);
  return [...byKeyword.values()].sort((a, b) => (rank.get(norm(a.keyword)) ?? Infinity) - (rank.get(norm(b.keyword)) ?? Infinity) || norm(a.keyword).localeCompare(norm(b.keyword)));
}

export function narratorWriteLimit(value = '3') {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1 || n > 40) throw new Error('NARRATOR_MAX_WRITES must be an integer from 1 to 40');
  return n;
}
