// agents/blog-from-drafts.mjs — finished NeuronWriter editor drafts → blog posts → PR.
//
// WHY (2026-10-12): the narrator and the NeuronWriter editor produce finished
// article drafts, but nothing ever moved them to the website. On 10-12 three
// complete drafts (spiders on boat docks, homeowners insurance and termites, how
// long Sentricon takes) sat in the editor until a person found them by hand; each
// also carried compliance errors ("safe", "Alabama law requires a WDO", "free WDO
// inspection", "the only company with…"). Over the previous 30 days the agent
// fleet published zero pages. This agent closes that gap.
//
// PER RUN (max CONTENT_DRAFTS_MAX posts, default 2):
//   1. FIND      READY NeuronWriter queries that are not tagged "Optimize" (those
//                belong to existing pages), have a saved editor draft (get-content,
//                free) of 600+ words, and are not in the ledger already.
//   2. DEDUPE    Skip if an existing post already covers the topic (keyword tokens
//                vs every post slug/title) — a second post on one topic splits
//                rankings (handoff 0014 found four such pairs on 10-12).
//   3. REWRITE   One model rewrites the draft in house voice with the compliance
//                canon as system prompt, working in under-used NeuronWriter terms.
//                Providers rotate Claude → GPT → Gemini (agents/lib/nw-writer.mjs).
//   4. GATES     compliance scanText (same rules as the repo guard) · originality
//                (8-word shingles vs NeuronWriter's competitor pages ≤ 0.03 and
//                every existing post ≤ 0.15) · NeuronWriter evaluate-content ≥ 70
//                · meta title ≤ 60, description ≤ 155. One guided retry, then park.
//   5. IMAGE     A branded hero card drawn as SVG and rendered with sharp (no
//                AI people/vehicles — AGENTS.md §7) at 1600×900 + 1200×630 og.
//   6. WRITE     Insert into data/blog-posts.ts, a content_refresh_ledger row
//                (source 'blog-from-drafts'), a lesson in agent_memory, and
//                agents/.blog-drafts-manifest.json for the PR body.
//
// Never publishes: the workflow rebuilds, runs `npm test`, opens a PR, a human merges.
// Usage: node agents/blog-from-drafts.mjs [--max 2] [--query <id>] [--dry]
import fs from 'node:fs';
import path from 'node:path';
import Anthropic from '@anthropic-ai/sdk';
import { supabase, logAgentRun } from './lib/supabase.mjs';
import { remember, recall } from './lib/memory.mjs';
import { COMPLIANCE_SYSTEM } from './lib/compliance.mjs';
import { checkOriginality } from './lib/originality.mjs';
import { assessEditorialDraft, sourcePrompt } from './lib/editorial-quality.mjs';
import { compileRules, scanText } from '../scripts/lib/compliance-rules.mjs';
import { NW_PROJECT, nw, score, competitorTexts, missingTerms, openQuestions, makeCompleter, parseJson } from './lib/nw-writer.mjs';

const AGENT = 'blog-from-drafts';
const ROOT = process.cwd();
const POSTS = path.join(ROOT, 'data/blog-posts.ts');
const IMG_DIR = path.join(ROOT, 'public/images/blog');
const MANIFEST = path.join(ROOT, 'agents/.blog-drafts-manifest.json');
const MODEL = process.env.CONTENT_REFRESH_MODEL || 'claude-sonnet-4-6';
const MIN_SCORE = 70, MAX_SCORE = 92, MIN_WORDS = 600;
const args = process.argv.slice(2);
const argVal = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const MAX = Number(argVal('--max', process.env.CONTENT_DRAFTS_MAX || 2));
const ONLY = argVal('--query', process.env.CONTENT_DRAFTS_QUERY || '') || null;
const DRY = args.includes('--dry');
const today = () => new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' });
const complete = makeCompleter({ agent: AGENT, model: MODEL, maxTokens: 8000 });

// ── existing posts ──────────────────────────────────────────────────────────
const strip = (h) => String(h).replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();
// Fields are written with either quote style (e.g. title: "Stink Bugs ... Alabama's ...").
function field(rec, name) {
  const m = rec.match(new RegExp(`\\n    ${name}: (?:'((?:[^'\\\\]|\\\\.)*)'|"((?:[^"\\\\]|\\\\.)*)")`));
  return m ? (m[1] ?? m[2]).replace(/\\(['"])/g, '$1') : '';
}
function existingPosts() {
  const src = fs.readFileSync(POSTS, 'utf8');
  return src.split(/\n  \{\n    slug: '/).slice(1).map((r) => ({
    slug: r.split("'")[0],
    title: field(r, 'title'),
    text: strip((r.match(/body: `([\s\S]*?)`,/) || [])[1] || ''),
    html: (r.match(/body: `([\s\S]*?)`,/) || [])[1] || '',
    metaTitle: field(r, 'metaTitle'),
    metaDescription: field(r, 'metaDescription'),
  }));
}
const STOP = new Set('a an and are as at be by can do does for from how i in is it my of on or the to what when where which who why will with you your al alabama near me best'.split(' '));
const tokens = (s) => String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w && !STOP.has(w)).map((w) => w.replace(/s$/, ''));
// Words shared by almost every pest search cannot establish matching intent.
// Keep "treatment" meaningful so termite treatment can find its existing post.
const GENERIC = new Set('pest control service company exterminator'.split(' '));
function coveredBy(keyword, posts) {
  const all = tokens(keyword);
  const k = all.some((w) => !GENERIC.has(w)) ? all.filter((w) => !GENERIC.has(w)) : all;
  if (!k.length) return null;
  let best = null, bestHit = 0.6 - 1e-9;
  for (const p of posts) {
    const t = new Set(tokens(`${p.slug.replace(/-/g, ' ')} ${p.title}`));
    const hit = k.filter((w) => t.has(w)).length / k.length;
    if (hit > bestHit) { best = p.slug; bestHit = hit; }
  }
  return best;
}
const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70);

// Token overlap misses synonyms ("mice in house in winter" vs rodents-alabama-homes-fall),
// so a second check asks a model to compare the search against every post title.
async function modelDuplicate(anthropic, keyword, posts) {
  const list = posts.map((p) => `${p.slug}: ${p.title}`).join('\n');
  const { text } = await complete(anthropic, 'You decide whether a blog already answers a search. Reply with ONLY the slug of the post that already answers it, or NONE.',
    `Search: "${keyword}"\n\nExisting posts:\n${list}\n\nIf one existing post would satisfy someone making this search, reply with its slug. Otherwise reply NONE.`, { tokens: 60 });
  const m = String(text).trim().match(/[a-z0-9]+(?:-[a-z0-9]+)+/);
  return m && posts.some((p) => p.slug === m[0]) ? m[0] : null;
}

// ── ledger (Supabase memory) ────────────────────────────────────────────────
async function alreadyHandled(queryId) {
  if (!supabase) return false;
  const { data } = await supabase.from('content_refresh_ledger').select('status,created_at,reason').eq('query_id', queryId)
    .eq('source', AGENT).order('created_at', { ascending: false }).limit(1);
  const r = data?.[0];
  if (!r) return false;
  if (r.status === 'measured') return !/^requeue/.test(r.reason || ''); // content-results sent it back
  if (['proposed', 'published'].includes(r.status)) return true;
  return Date.now() - new Date(r.created_at).getTime() < 28 * 86400000; // rejected/error: retry after 28 days
}
async function isRequeued(route) {
  if (!supabase) return false;
  const { data } = await supabase.from('content_refresh_ledger').select('status,reason').eq('route', route).order('created_at', { ascending: false }).limit(1);
  return data?.[0]?.status === 'measured' && /^requeue/.test(data[0].reason || '');
}
async function ledger(row) {
  if (!supabase || DRY) return;
  const { error } = await supabase.from('content_refresh_ledger').insert({ ...row, source: AGENT, run_id: process.env.GITHUB_RUN_ID || null });
  if (error) console.warn(`[ledger] ${error.message}`);
}

// ── rewrite ─────────────────────────────────────────────────────────────────
const VOICE = `House voice: first person plural ("we"), plain and direct, an Alabama family pest control company talking to a homeowner. Open with <p class="lede">…</p>. Use <h2>/<h3>, <p>, <ul><li>. Short honest answers; say what does NOT work too. Reduction language only for mosquitoes ("reduce", "knock down"). Products are "EPA-registered" and "applied according to label directions" — never "EPA-approved" and never "safe". Termite work is "quoted after a free termite inspection, never over the phone". The Official Alabama Wood Infestation Inspection Report (closing letter) is NOT free and is not "required by law" — lenders require it. Termite coverage wording, exactly: "up to $1,000,000 in termite damage repair coverage provided by EnviroCare, subject to the terms of the agreement". Treating an active wasp/hornet nest is an add-on at an additional charge. No prices except via a link to /pricing. Offices (use only the ones relevant): Birmingham (205) 991-2882, Alabaster (205) 940-6360, Alexander City and Lake Martin (256) 234-6162, Huntsville (256) 937-7676. End with a short call to action and then <p><strong>No One Cares Like EnviroCare.</strong></p>. No competitor or retail brand names, no review counts, no "only/best/#1" claims, no availability promises.`;

async function rewrite(anthropic, { keyword, draft, terms, questions, related, lessons, feedback, existing = null }) {
  const user = `${existing ? `UPGRADE the existing EnviroCare post /blog/${existing.slug} ("${existing.title}") for the search "${keyword}". Keep its topic and URL. Combine the strongest, accurate parts of the live post and of the editor draft below into ONE better post; keep every correct fact the live post already has.\n\nLIVE POST NOW:\n"""${existing.text.slice(0, 9000)}"""\n\n` : `Rewrite this NeuronWriter editor draft into a finished EnviroCare blog post for the search "${keyword}".`}

DRAFT (facts may be wrong — keep only what is accurate and compliant; never copy a sentence you would not sign):
"""${strip(draft).slice(0, 14000)}"""

Under-used NeuronWriter terms (work in the ones that fit naturally; skip the rest):
${terms.join('; ') || '(none)'}

Questions searchers ask:
${questions.map((q) => `- ${q}`).join('\n') || '- (none)'}

Existing posts you may link to with <a href="/blog/SLUG">…</a> (2-4 links, only where relevant):
${related.map((p) => `- ${p.slug}: ${p.title}`).join('\n')}

${VOICE}

CITATIONS AND ANSWERS: Open with a concise direct answer in the lede and include question headings. Cite the specific point supported by a relevant source below. Use only the supplied external URLs; do not invent references or imply endorsement.
${sourcePrompt(keyword)}

Lessons from earlier runs:
${lessons.map((l) => `- ${l.content}`).join('\n') || '- (none yet)'}
${feedback ? `\nYOUR PREVIOUS VERSION FAILED A GATE. Fix exactly this:\n${feedback}\n` : ''}
Length 900-1400 words of body. Return ONLY JSON:
{"title":"…","excerpt":"1-2 sentences","metaTitle":"≤60 chars ending ' | EnviroCare'","metaDescription":"≤155 chars","category":"one of: Ants, Fire Ants, Fleas, Local, Mosquitoes, Pests, Real Estate, Roaches, Rodents, Seasonal, Spiders, Termites, Ticks, Tips","heroEmoji":"one emoji","body":"<p class=\\"lede\\">…</p>…"}`;
  const { provider, text } = await complete(anthropic, COMPLIANCE_SYSTEM, user);
  const j = parseJson(text);
  for (const k of ['title', 'excerpt', 'metaTitle', 'metaDescription', 'category', 'body']) if (!j[k]) throw new Error(`${provider} reply missing ${k}`);
  return { provider, ...j, body: String(j.body).replace(/\\/g, '\\\\').replace(/`/g, "'").replace(/\$\{/g, '$ {') }; // backslash first, or \u / \x break the template literal
}

// ── hero image: branded card drawn as SVG, rendered by sharp ───────────────
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function wrap(text, max) {
  const out = []; let line = '';
  for (const w of String(text).split(/\s+/)) {
    if ((line + ' ' + w).trim().length > max) { if (line) out.push(line); line = w; } else line = (line + ' ' + w).trim();
  }
  if (line) out.push(line);
  return out.slice(0, 4);
}
async function heroImage(slug, title, category) {
  const lines = wrap(title.replace(/\s*\|.*$/, ''), 26);
  const fs1 = lines.length > 3 ? 58 : 66;
  const t = lines.map((l, i) => `<text x="80" y="${250 + i * (fs1 + 18)}" font-size="${fs1}" font-weight="700" fill="#0E1A0F">${esc(l)}</text>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <rect width="1600" height="900" fill="#FEFDF8"/>
  <circle cx="1350" cy="420" r="300" fill="#E4F1E0"/>
  <path d="M1170 520 L1350 360 L1530 520 L1530 700 L1170 700 Z" fill="#07642B"/>
  <rect x="1310" y="590" width="80" height="110" fill="#FEFDF8"/>
  <rect x="1215" y="560" width="60" height="55" fill="#C4E2BE"/><rect x="1425" y="560" width="60" height="55" fill="#C4E2BE"/>
  <path d="M1120 700 Q1350 640 1580 700 L1580 760 L1120 760 Z" fill="#7FB46E"/>
  <g font-family="Inter, DejaVu Sans, Helvetica, Arial, sans-serif">
    <text x="80" y="150" font-size="28" font-weight="600" letter-spacing="3" fill="#0E8E40">${esc(String(category).toUpperCase())} · ALABAMA</text>
    ${t}
    <rect x="0" y="810" width="1600" height="90" fill="#07642B"/>
    <text x="80" y="867" font-size="28" font-weight="600" fill="#FEFDF8">EnviroCare · Family-owned pest control in Alabama since 1958</text>
  </g></svg>`;
  // sharp arrives only as Next's optional dependency, so load it lazily: if it is
  // missing the post still ships, just with its emoji instead of a hero image.
  let sharp;
  try { sharp = (await import('sharp')).default; } catch (e) { console.warn(`[${AGENT}] sharp unavailable, no hero image: ${e.message}`); return null; }
  fs.mkdirSync(IMG_DIR, { recursive: true });
  const base = sharp(Buffer.from(svg));
  await base.clone().webp({ quality: 86 }).toFile(path.join(IMG_DIR, `${slug}.webp`));
  await base.clone().resize(1200, 675).extract({ left: 0, top: 22, width: 1200, height: 630 }).jpeg({ quality: 86 }).toFile(path.join(IMG_DIR, `${slug}-og.jpg`));
  return { src: `/images/blog/${slug}.webp`, og: `/images/blog/${slug}-og.jpg`, width: 1600, height: 900,
    alt: `Illustrated EnviroCare title card for the article "${title.replace(/\s*\|.*$/, '')}", with a simple house graphic.` };
}

// ── write the post ──────────────────────────────────────────────────────────
const q1 = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ');
function insertPost(p) {
  const src = fs.readFileSync(POSTS, 'utf8');
  const marker = '\n  {\n    slug: \'';
  const first = src.indexOf(marker); const second = src.indexOf(marker, first + 1);
  if (first < 0 || second < 0) throw new Error('could not find the BLOG_POSTS records');
  const words = strip(p.body).split(' ').length;
  const rec = `
  {
    slug: '${p.slug}',
    title: '${q1(p.title)}',
    excerpt: '${q1(p.excerpt)}',
    publishedAt: '${today()}',
    author: 'Kevin Wedgworth',
    category: '${q1(p.category)}',
    readMinutes: ${Math.max(3, Math.round(words / 220))},
    heroEmoji: '${q1(p.heroEmoji || '🐜')}',${p.hero ? `
    heroImage: {
      src: '${p.hero.src}',
      og: '${p.hero.og}',
      width: ${p.hero.width},
      height: ${p.hero.height},
      alt: '${q1(p.hero.alt)}',
    },` : ''}
    metaTitle: '${q1(p.metaTitle)}',
    metaDescription: '${q1(p.metaDescription)}',
    body: \`
${p.body.trim()}
\`,
  },`;
  // After the first record: inserting ABOVE it would inherit that record's leading
  // comment, which the blog guard scans (handoff 0014 gotcha).
  fs.writeFileSync(POSTS, src.slice(0, second) + rec + src.slice(second));
}

// Upgrade in place: new body, excerpt and meta description; title, slug, hero and
// publishedAt stay; updatedAt (emits dateModified) is set to today.
function replacePost(slug, p) {
  const src = fs.readFileSync(POSTS, 'utf8');
  const start = src.indexOf(`\n  {\n    slug: '${slug}',`);
  if (start < 0) throw new Error(`post ${slug} not found`);
  const end = src.indexOf('\n  },', src.indexOf('body: `', start)) + 5;
  let rec = src.slice(start, end);
  rec = rec.replace(/\n    excerpt: (?:'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"),/, () => `\n    excerpt: '${q1(p.excerpt)}',`)
    .replace(/\n    metaDescription: (?:'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"),/, () => `\n    metaDescription: '${q1(p.metaDescription)}',`)
    .replace(/body: `[\s\S]*?`,/, () => `body: \`\n${p.body.trim()}\n\`,`);
  if (/\n    updatedAt: '[^']*',/.test(rec)) rec = rec.replace(/\n    updatedAt: '[^']*',/, `\n    updatedAt: '${today()}',`);
  else rec = rec.replace(/(\n    publishedAt: '[^']*',)/, `$1\n    updatedAt: '${today()}',`);
  fs.writeFileSync(POSTS, src.slice(0, start) + rec + src.slice(end));
}

// ── main ────────────────────────────────────────────────────────────────────
async function run() {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const rules = compileRules();
  const lessons = await recall(AGENT, { type: 'lesson', limit: 8 });
  const rows = await nw('list-queries', { project: NW_PROJECT, status: 'ready' });
  const cands = (Array.isArray(rows) ? rows : [])
    .filter((q) => (ONLY ? (q.query || q.id) === ONLY : !(q.tags || []).some((t) => /optimi[sz]e/i.test(t))))
    .sort((a, b) => String(b.updated).localeCompare(String(a.updated)));
  const report = []; let shipped = 0, tried = 0;

  for (const q of cands) {
    if (shipped >= MAX || tried >= MAX * 3) break; // cap attempts too: failing gates must not eat the 30-minute job
    const id = q.query || q.id; const keyword = q.keyword;
    try {
      if (!ONLY && await alreadyHandled(id)) continue;
      const posts = existingPosts();
      const content0 = await nw('get-content', { query: id }).catch(() => ({}));
      if (strip(content0?.content || '').split(' ').length < MIN_WORDS) continue; // no finished draft yet — not an error
      const tokenDup = coveredBy(keyword, posts);
      const dup = tokenDup || await modelDuplicate(anthropic, keyword, posts);
      // A topic that already has a post is never a second post (that splits rankings).
      // But a much fuller editor draft can UPGRADE the live post in place: same URL,
      // updatedAt set, and only if it beats the live post's NeuronWriter score by 5+.
      // Preserve #285's protection: a model-only match may suppress a duplicate,
      // but cannot authorize replacing an existing article with a different topic.
      if (dup && !tokenDup) {
        report.push({ keyword, outcome: `skipped: model judged it covered by /blog/${dup} (no in-place upgrade on a model-only match)` });
        await ledger({ route: `dup:/blog/${dup}`, keyword, query_id: id, status: 'rejected', reason: `model-judged duplicate of /blog/${dup}; upgrade needs a keyword/title token match` });
        continue;
      }
      const existing = dup ? posts.find((p) => p.slug === dup) : null;
      const draftWords = strip(content0.content).split(' ').length;
      const requeued = existing && await isRequeued(`/blog/${existing.slug}`);
      if (existing && !requeued && draftWords < existing.text.split(' ').length * 1.2) {
        report.push({ keyword, outcome: `skipped: covered by /blog/${dup} (draft not fuller)` });
        // Not under the live post's route: content-results reads the newest row per route,
        // and a skip row there would hide the post's own proposed/published rows.
        await ledger({ route: `dup:/blog/${dup}`, keyword, query_id: id, status: 'rejected', reason: `duplicate topic of /blog/${dup}; draft ${draftWords}w is not fuller` });
        continue;
      }
      const draftHtml = content0.content;
      tried++;
      const full = await nw('get-query', { query: id });
      const before = existing ? await score(id, `<h1>${existing.title}</h1>${existing.html}`, existing.metaTitle, existing.metaDescription) : null;
      const floor = Math.min(MAX_SCORE, existing ? Math.max(MIN_SCORE, before + 5) : MIN_SCORE);
      if (existing && before + 5 > MAX_SCORE) { report.push({ keyword, outcome: `skipped: /blog/${existing.slug} already scores ${before}` }); continue; }
      const competitors = await competitorTexts(id, full);
      const related = posts.filter((p) => tokens(keyword).some((w) => tokens(p.slug.replace(/-/g, ' ')).includes(w))).slice(0, 12);

      let feedback = null, ok = null, last = null;
      for (let attempt = 0; attempt < 2 && !ok; attempt++) {
        const p = await rewrite(anthropic, { keyword, draft: draftHtml, terms: missingTerms(full, draftHtml), questions: openQuestions(full), related, lessons, feedback, existing });
        const text = strip(p.body);
        const comp = scanText(`${p.title}\n${p.excerpt}\n${p.metaTitle}\n${p.metaDescription}\n${text}`, rules);
        const orig = checkOriginality(text, { competitors, sitePages: posts.filter((x) => x.slug !== existing?.slug).map((x) => ({ route: `/blog/${x.slug}`, text: x.text })) });
        const sc = await score(id, `<h1>${p.title}</h1>${p.body}`, p.metaTitle, p.metaDescription);
        const problems = assessEditorialDraft(p.body, { keyword, title: p.title, metaTitle: p.metaTitle, metaDescription: p.metaDescription }).problems;
        if (comp.blocking.length) problems.push(`compliance: ${comp.blocking.map((b) => `"${b.match}" (${b.reason})`).join('; ')}`);
        if ((orig.competitorsChecked || 0) < 3) problems.push(`originality: only ${orig.competitorsChecked || 0} competitor pages could be read, so plagiarism was not really checked`);
        if (!orig.pass) problems.push(`originality: competitor ${orig.maxCompetitorOverlap} (max 0.03), own site ${orig.maxSiteOverlap} vs ${orig.worstSitePage} (max 0.15); reworded needed: ${orig.examples.join(' | ')}`);
        if (sc < floor) problems.push(`NeuronWriter ${sc} < ${floor}${existing ? ` (live post scores ${before})` : ''}; still missing: ${missingTerms(full, text, 25).join('; ')}`);
        if (sc > MAX_SCORE) problems.push(`NeuronWriter ${sc} > ${MAX_SCORE}: keyword-stuffed, write more naturally`);
        if (p.metaTitle.length > 60) problems.push(`metaTitle is ${p.metaTitle.length} chars (max 60)`);
        if (p.metaDescription.length > 155) problems.push(`metaDescription is ${p.metaDescription.length} chars (max 155)`);
        // An upgrade retains the live title and URL. Check the new snippet's
        // topic without letting generic terms buried in a long body satisfy it.
        if (existing) {
          const t = tokens(existing.title), have = new Set(tokens(`${p.excerpt} ${p.metaDescription}`));
          const onTopic = t.length ? t.filter((w) => have.has(w)).length / t.length : 1;
          if (onTopic < 0.5) problems.push(`off-topic upgrade: the post is titled "${existing.title}" but the new excerpt and meta description share only ${Math.round(onTopic * 100)}% of its title words; keep the live post's topic`);
        }
        last = { p, sc, orig };
        if (problems.length) feedback = problems.join('\n'); else ok = last;
      }
      if (!ok) {
        report.push({ keyword, score: last?.sc, outcome: `parked: ${feedback.slice(0, 200)}` });
        await ledger({ route: `/blog/${slugify(keyword)}`, keyword, query_id: id, status: 'rejected', score_after: last?.sc, competitor_overlap: last?.orig?.maxCompetitorOverlap, site_overlap: last?.orig?.maxSiteOverlap, competitors_checked: last?.orig?.competitorsChecked, reason: feedback.slice(0, 900) });
        await remember(AGENT, `"${keyword}" parked: ${feedback.slice(0, 300)}`, { type: 'lesson', metadata: { date: today() } });
        continue;
      }
      const { p, sc, orig } = ok;
      if (existing) {
        if (DRY) { report.push({ keyword, slug: existing.slug, score: sc, provider: p.provider, outcome: `dry run: would upgrade (${before} -> ${sc})` }); shipped++; continue; }
        replacePost(existing.slug, p);
        shipped++;
        report.push({ keyword, slug: existing.slug, score: sc, provider: p.provider, competitor: orig.maxCompetitorOverlap, site: orig.maxSiteOverlap, checked: orig.competitorsChecked, outcome: `upgraded existing post ${before} -> ${sc}` });
        await ledger({ route: `/blog/${existing.slug}`, keyword, query_id: id, status: 'proposed', score_before: before, score_after: sc, words_added: strip(p.body).split(' ').length - existing.text.split(' ').length, competitor_overlap: orig.maxCompetitorOverlap, site_overlap: orig.maxSiteOverlap, competitors_checked: orig.competitorsChecked, reason: `upgrade awaiting PR merge [${p.provider}]` });
        await remember(AGENT, `/blog/${existing.slug} upgraded from "${keyword}" draft [${p.provider}] ${before}->${sc}.`, { type: 'lesson', metadata: { date: today() } });
        continue;
      }
      p.slug = slugify(p.title.replace(/\s*\|.*$/, '').replace(/[:?].*$/, '')) || slugify(keyword);
      if (posts.some((x) => x.slug === p.slug)) p.slug = slugify(keyword);
      if (DRY) { report.push({ keyword, slug: p.slug, score: sc, provider: p.provider, outcome: 'dry run: would publish' }); shipped++; continue; }
      p.hero = await heroImage(p.slug, p.title, p.category);
      insertPost(p);
      shipped++;
      report.push({ keyword, slug: p.slug, score: sc, provider: p.provider, competitor: orig.maxCompetitorOverlap, site: orig.maxSiteOverlap, checked: orig.competitorsChecked, outcome: 'proposed' });
      await ledger({ route: `/blog/${p.slug}`, keyword, query_id: id, status: 'proposed', score_after: sc, words_added: strip(p.body).split(' ').length, competitor_overlap: orig.maxCompetitorOverlap, site_overlap: orig.maxSiteOverlap, competitors_checked: orig.competitorsChecked, image_src: p.hero?.src || null, reason: `awaiting PR merge [${p.provider}]` });
      await remember(AGENT, `/blog/${p.slug} from "${keyword}" [${p.provider}] scored ${sc}.`, { type: 'lesson', metadata: { date: today() } });
    } catch (e) {
      report.push({ keyword, outcome: `error: ${e.message.slice(0, 200)}` });
      await ledger({ route: `/blog/${slugify(keyword)}`, keyword, query_id: id, status: 'error', reason: e.message.slice(0, 900) });
    }
  }
  fs.writeFileSync(MANIFEST, JSON.stringify({ date: today(), changed: shipped, report }, null, 2));
  for (const r of report) console.log(`[${AGENT}] ${r.keyword}: ${r.outcome}${r.score ? ` (NW ${r.score})` : ''}`);
  await logAgentRun(AGENT, report.some((r) => r.outcome.startsWith('error')) ? 'partial' : 'ok', { shipped, report }, `${shipped} post(s) proposed`);
}

run().catch(async (e) => { console.error(`[${AGENT}] ${e.message}`); try { await logAgentRun(AGENT, 'fail', { error: e.message }); } catch {} process.exit(1); });
