// agents/morning-brief.mjs
// THE MORNING BRIEF — fills the command center's "Morning Brief" panel (the
// morning_brief table, which previously had NO writer). Turns the proposer's
// ranked SHIP findings + recent agent activity into a tight, plain-English
// "here's what to decide today" brief. Recommends only — never acts.
//
// Reads Supabase agent_findings (last ~30h), asks Claude for a prioritized brief,
// upserts one row per day into morning_brief (brief_date is unique).
//
// Env: SUPABASE_SERVICE_KEY, ANTHROPIC_API_KEY (already GitHub secrets).

const PROJECT_REF = 'dyoujmyleihcpqgeifre';
const BASE = `https://${PROJECT_REF}.supabase.co/rest/v1`;
const TZ = 'America/Chicago';
const MODEL = process.env.BRIEF_MODEL || 'claude-sonnet-4-6';

function sbHeaders(extra = {}) {
  return {
    apikey: process.env.SUPABASE_SERVICE_KEY,
    authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
    'content-type': 'application/json',
    ...extra,
  };
}
const arr = (x) => (Array.isArray(x) ? x : []);
function briefDate() {
  // YYYY-MM-DD in Chicago time
  const d = new Date().toLocaleDateString('en-CA', { timeZone: TZ }); // en-CA => YYYY-MM-DD
  return d;
}
function niceDate() {
  return new Date().toLocaleDateString('en-US', { timeZone: TZ, dateStyle: 'full' });
}

async function fetchFindings() {
  const since = new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString();
  const [findings, runs] = await Promise.all([
    fetch(`${BASE}/agent_findings?created_at=gte.${since}&order=created_at.desc`, { headers: sbHeaders() }).then((r) => r.json()).catch(() => []),
    fetch(`${BASE}/agent_runs?started_at=gte.${since}&order=started_at.desc`, { headers: sbHeaders() }).then((r) => r.json()).catch(() => []),
  ]);
  return { findings: arr(findings), runs: arr(runs) };
}

function buildContext({ findings, runs }) {
  const ship = findings.filter((f) => f.panel_verdict === 'SHIP');
  const pool = (ship.length ? ship : findings).slice(0, 30);
  const lines = pool.map((f) => {
    const parts = [
      f.agent ? `[${f.agent}]` : '',
      f.severity ? `(${f.severity})` : '',
      f.category ? `${f.category}:` : '',
      f.title || f.finding || '',
      f.page_url ? `— ${f.page_url}` : '',
    ].filter(Boolean);
    return '- ' + parts.join(' ');
  });
  const agentsRan = [...new Set(runs.map((r) => r.agent).filter(Boolean))];
  return {
    shipCount: ship.length,
    totalFindings: findings.length,
    agentsRan,
    findingsBlock: lines.join('\n') || '(no findings in the last 30 hours)',
  };
}

const SYSTEM = `You are EnviroCare's marketing chief of staff. EnviroCare is a family-owned Alabama pest & termite company (since 1958, three offices: Birmingham/Alabaster, Lake Martin/Alex City, Huntsville). You write a concise daily MORNING BRIEF for the owner, Phillip, who is busy and wants to make decisions fast.

Rules:
- Lead with the 3-5 things that actually matter today, RANKED, most important first.
- For each: one line on WHAT, one short clause on WHY it matters, and the suggested action.
- Plain English. No jargon, no filler, no "as an AI". Operator tone.
- If it's a quiet day, say so in one line and list 1-2 things worth watching.
- You RECOMMEND. You never claim to have done anything or to auto-publish.
- Keep the whole brief under ~250 words. Use short lines, not big paragraphs.`;

async function generateBrief(ctx) {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY not set');
  const mod = await import('@anthropic-ai/sdk');
  const Anthropic = mod.default ?? mod;
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 1 });

  const user = `Date: ${niceDate()}
Agents that ran in the last 30h: ${ctx.agentsRan.join(', ') || 'none'}
SHIP-flagged items (need human decision): ${ctx.shipCount}
Total findings examined: ${ctx.totalFindings}

Findings / proposed changes:
${ctx.findingsBlock}

Write today's Morning Brief.`;

  const resp = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 900,
    system: SYSTEM,
    messages: [{ role: 'user', content: user }],
  });
  return (resp.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
}

async function upsertBrief(content) {
  const body = [{ brief_date: briefDate(), content }];
  const res = await fetch(`${BASE}/morning_brief`, {
    method: 'POST',
    headers: sbHeaders({ Prefer: 'resolution=merge-duplicates,return=minimal' }),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`morning_brief upsert failed: ${res.status} ${await res.text()}`);
}

async function main() {
  const data = await fetchFindings();
  const ctx = buildContext(data);
  const content = await generateBrief(ctx);
  if (!content) throw new Error('empty brief from model');
  await upsertBrief(content);
  console.log(`Morning Brief written for ${briefDate()} (${ctx.shipCount} SHIP / ${ctx.totalFindings} findings).`);
  console.log('---\n' + content);
}

main().catch((e) => { console.error('Morning Brief failed:', e.message); process.exit(1); });
