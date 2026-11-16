// Pure gates used before NeuronNarrator changes an editor. No API calls or credits.
import { readFileSync } from 'node:fs';
import { compileRules, scanText } from '../../scripts/lib/compliance-rules.mjs';

export const SOURCES = JSON.parse(readFileSync(new URL('../knowledge/editorial-sources.json', import.meta.url), 'utf8')).sources;
const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const strip = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
// The narrator workflow runs without npm install. Decode the named references
// used in editorial copy locally; unknown names fail the gate instead of being
// silently discarded. Numeric references support the full Unicode range.
const NAMED = {
  amp: '&', AMP: '&', lt: '<', LT: '<', gt: '>', GT: '>', quot: '"', QUOT: '"', apos: "'",
  nbsp: '\u00a0', NonBreakingSpace: '\u00a0', ensp: '\u2002', emsp: '\u2003', thinsp: '\u2009',
  hairsp: '\u200a', ThinSpace: '\u2009', VeryThinSpace: '\u200a', MediumSpace: '\u205f',
  ThickSpace: '\u205f\u200a', Tab: '\t', NewLine: '\n', ZeroWidthSpace: '\u200b',
  shy: '\u00ad', ndash: '\u2013', mdash: '\u2014', hyphen: '\u2010', dash: '\u2010',
  lsquo: '\u2018', rsquo: '\u2019', ldquo: '\u201c', rdquo: '\u201d',
  copy: '\u00a9', reg: '\u00ae', trade: '\u2122', hellip: '\u2026', bull: '\u2022',
  dollar: '$', percnt: '%', num: '#', colon: ':', semi: ';', period: '.', comma: ',',
  sol: '/', bsol: '\\', equals: '=', quest: '?', excl: '!', lpar: '(', rpar: ')',
};
const LEGACY_NUMERIC = {
  128: 0x20ac, 130: 0x201a, 131: 0x0192, 132: 0x201e, 133: 0x2026, 134: 0x2020,
  135: 0x2021, 136: 0x02c6, 137: 0x2030, 138: 0x0160, 139: 0x2039, 140: 0x0152,
  142: 0x017d, 145: 0x2018, 146: 0x2019, 147: 0x201c, 148: 0x201d, 149: 0x2022,
  150: 0x2013, 151: 0x2014, 152: 0x02dc, 153: 0x2122, 154: 0x0161, 155: 0x203a,
  156: 0x0153, 158: 0x017e, 159: 0x0178,
};
function visibleText(value, unknown) {
  const withoutTags = String(value || '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '')
    .replace(/<\/?[a-z](?:[^"'<>]|"[^"]*"|'[^']*')*>/gi, tag =>
      /^<\/?(?:address|article|aside|blockquote|br|div|dl|dt|dd|fieldset|figcaption|figure|footer|form|h[1-6]|header|hr|li|main|nav|ol|p|pre|section|table|tbody|td|th|thead|tr|ul)\b/i.test(tag) ? '\n' : '');
  return withoutTags.replace(/&(?:#(x[0-9a-f]+|[0-9]+);?|([a-z][a-z0-9]*);|(amp|lt|gt|quot|nbsp|copy|reg|shy))/gi, (match, numeric, named, legacy) => {
    if (numeric) {
      let point = /^x/i.test(numeric) ? parseInt(numeric.slice(1), 16) : Number(numeric);
      point = LEGACY_NUMERIC[point] ?? point;
      return point > 0 && point <= 0x10ffff && !(point >= 0xd800 && point <= 0xdfff) ? String.fromCodePoint(point) : '\ufffd';
    }
    const name = named || legacy;
    if (Object.hasOwn(NAMED, name)) return NAMED[name];
    unknown.add(match);
    return match;
  }).normalize('NFKC').replace(/[\u00ad\u200b-\u200d\ufeff]/g, '').replace(/[\u2010-\u2015\u2212]/g, '-')
    .replace(/[^\S\n]+/g, ' ').trim();
}
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
  const unknown = new Set();
  const visible = [title, metaTitle, metaDescription, html].map(value => visibleText(value, unknown)).join('\n');
  // Keep block boundaries for contextual carve-outs, and also check a compact
  // view so a line break cannot split a prohibited phrase. Inline tags add no
  // spaces: pet-<strong>safe</strong> renders as pet-safe.
  const rules = compileRules();
  const scans = [visible, visible.replace(/\s+/g, ' ')].map(text => scanText(text, rules));
  for (const reason of new Set(scans.flatMap(scan => scan.blocking.map(hit => hit.reason)))) problems.push(`compliance: ${reason}`);
  if (unknown.size) problems.push(`use literal text for unsupported HTML character references: ${[...unknown].join(', ')}`);
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
  return { pass: problems.length === 0, problems, warnings: scans.flatMap(scan => scan.warnings || []), citations: external };
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
