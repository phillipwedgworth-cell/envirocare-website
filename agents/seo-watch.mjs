/**
 * agents/seo-watch.mjs — recurring SEO-intelligence agent (multi-model)
 *
 * Repo:   phillipwedgworth-cell/envirocare-website (PUBLIC)
 * Path:   agents/seo-watch.mjs
 * Commit: feat(agents): weekly SEO-watch (Claude+Gemini+GPT consensus)
 * Push:   main
 * ─────────────────────────────────────────────────────────
 * Phillip's ask: "have Gemini work with whomever on a consistent basis to see
 * if SEO rules have changed and what to modify." This is that, done responsibly:
 *
 *   1. FETCH primary sources (Google Search Central, Search Status Dashboard) —
 *      an LLM's memory is NOT a reliable source for "did a rule change this week."
 *   2. Run the multi-model panel (Claude + Gemini + GPT, 2-of-3 consensus) to
 *      interpret what changed and what it means for a local pest-control site.
 *   3. Cross-check every recommendation against EnviroCare's LOCKED rules so it
 *      never suggests something that violates compliance.
 *   4. Write prioritized recommendations to agent_findings for HUMAN review.
 *      It NEVER changes the site — it advises.
 *
 * Cadence: weekly (see .github/workflows/seo-watch.yml). Needs GEMINI_API_KEY +
 * OPENAI_API_KEY + ANTHROPIC_API_KEY as Actions secrets (panel skips any missing
 * provider and notes it).
 */
import { panel } from './lib/llm-panel.mjs';
import { writeFinding, logAgentRun, readFindings } from './lib/supabase.mjs';
import { getDailyTrend, getOpportunities, getLatestSnapshotLabel } from './lib/seo-history.mjs';
import { pushToNotion } from './lib/notifier.mjs';

const AGENT_NAME = 'seo-watch';
const PROMPT_VERSION = '2026-06-16';

// Primary sources — verify/extend these. LLM opinion is secondary to these.
const SOURCES = [
  { name: 'Google Search Central Blog', url: 'https://developers.google.com/search/blog' },
  { name: 'Google Search Status Dashboard', url: 'https://status.search.google.com/' },
];

// EnviroCare locked rules the agent must respect when advising.
const LOCKED_RULES = `
- No "pet-safe/kid-safe/non-toxic/eco-safe"; use EPA-registered/label language.
- No same-day/there-today/available-now claims. No competitor names. No review/customer counts.
- Mosquito never "guaranteed/eliminated". Bundling = convenience, not discount.
- Content is repo/file-based (data/*.ts), deployed via git PR — NOT auto-published.
- No mass-generated doorway/city pages; human approval before production.
`;

async function fetchText(url) {
  try {
    const r = await fetch(url, { headers: { 'user-agent': 'EnviroCare-SEO-Watch/1.0' } });
    const t = await r.text();
    return t.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 6000);
  } catch (e) {
    return `[fetch failed: ${e.message}]`;
  }
}

// Pull EnviroCare's OWN movement from data already collected by seo-monitor /
// brightlocal / GSC sync — so the panel advises on our data, not just Google's
// announcements. Reuses Supabase rows (no new Local Falcon API spend). Every
// call is guarded: a DB miss degrades to "[no data]" and never breaks the run.
async function gatherLiveData() {
  const blocks = [];
  const safe = async (label, fn) => {
    try {
      const v = await fn();
      if (v && (Array.isArray(v) ? v.length : true)) {
        blocks.push(`## ${label}\n${typeof v === 'string' ? v : JSON.stringify(v).slice(0, 2500)}`);
      }
    } catch (e) {
      blocks.push(`## ${label}\n[unavailable: ${e.message}]`);
    }
  };

  await safe('Latest snapshot', () => getLatestSnapshotLabel());
  await safe('GSC 28-day trend (clicks/impressions)', () => getDailyTrend(28));
  await safe('GSC opportunity queries', () => getOpportunities(8));
  await safe('Local Falcon SoLV + BrightLocal findings (last 7 days)', async () => {
    const f = await readFindings(['seo-monitor', 'brightlocal'], 168);
    return (f || []).slice(0, 15).map((x) => `- [${x.severity || '?'}] ${x.finding || x.category || JSON.stringify(x).slice(0, 120)}`).join('\n');
  });

  return blocks.length ? blocks.join('\n\n') : '[no live data yet — DB may be empty/unconfigured]';
}

async function run() {
  const sources = [];
  for (const s of SOURCES) sources.push(`## ${s.name} (${s.url})\n${await fetchText(s.url)}`);
  const liveData = await gatherLiveData();

  const prompt = `You are an SEO intelligence analyst for EnviroCare, a family-owned Alabama pest & termite company (local SEO + Google Business Profile + AI search visibility).

You have TWO inputs: (A) recent text from Google's PRIMARY sources, and (B) EnviroCare's OWN ranking/traffic data. Connect them: don't just report Google's changes in the abstract — say what they mean given where EnviroCare is actually weak or moving.

For each genuinely recent/actionable item (last ~30 days), output:
- what changed or what the data shows (one line, grounded — do not invent)
- why it matters for EnviroCare specifically (tie to the live data when relevant)
- a concrete action, ranked priority 1-3

Respect these locked rules — never recommend anything that violates them:
${LOCKED_RULES}

If nothing material changed and the data is flat, say so plainly. Do not manufacture urgency.

<google_primary_sources>
${sources.join('\n\n')}
</google_primary_sources>

<envirocare_live_data>
${liveData}
</envirocare_live_data>

Return a short prioritized list. Be specific and skeptical, and lean on EnviroCare's own numbers.`;

  // --dry-run: show what WOULD be sent, spend nothing, write nothing. Use this to
  // verify wiring + that your live data flows before any model call costs money.
  if (process.argv.includes('--dry-run')) {
    console.log('\n=== DRY RUN — no model calls, no DB/Notion writes ===\n');
    console.log(`Google sources fetched: ${SOURCES.length}`);
    console.log(`\n--- EnviroCare live data block ---\n${liveData}\n`);
    console.log(`--- Assembled prompt: ${prompt.length} chars ---`);
    console.log(`Would call panel() across: Claude${process.env.GEMINI_API_KEY ? ' + Gemini' : ''}${process.env.OPENAI_API_KEY ? ' + GPT' : ''}`);
    console.log('\n(Re-run without --dry-run to execute for real.)\n');
    process.exit(0);
  }

  // Collect all three models' takes (Claude + Gemini + GPT). panel() is built for
  // SHIP/SKIP/HOLD votes; here we use each provider's reasoning as its analysis.
  const result = await panel(prompt);
  const perModel = result.votes
    .map((v) => `### ${v.source}\n${v.reasoning || '[no output]'}`)
    .join('\n\n');
  const summary = `Multi-model SEO scan (${result.votes.map((v) => v.source).join(' + ')})\n\n${perModel}`;

  await writeFinding(
    AGENT_NAME,
    'seo-update',
    'info',
    null,
    'Weekly SEO change scan',
    { promptVersion: PROMPT_VERSION, providers: result.votes.map((v) => v.source), summary },
  ).catch((e) => console.error('writeFinding failed:', e.message));

  await pushToNotion({
    title: 'Weekly SEO change scan',
    source: AGENT_NAME,
    summary,
    url: '',
    tags: ['seo', 'watch', 'review-me'],
    panelReasoning: perModel,
  }).catch((e) => console.error('pushToNotion failed:', e.message));

  await logAgentRun(AGENT_NAME, 'ok', summary).catch(() => {});

  console.log(`\n[${AGENT_NAME}] done.\n${summary}\n`);
  return { summary };
}

run().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
