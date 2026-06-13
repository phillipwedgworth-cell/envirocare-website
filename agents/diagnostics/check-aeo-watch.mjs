// agents/diagnostics/check-aeo-watch.mjs
// Reproduces the two Supabase writes AEO-Watch makes (startRun + upsertFinding),
// reports the real status, then deletes its own test rows. Read-only to your real data.
import { readFile } from 'node:fs/promises';

// Load .env without a dependency
try {
  const env = await readFile(new URL('../../.env', import.meta.url), 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
} catch { /* env vars may already be set */ }

const KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY;
const REF = 'dyoujmyleihcpqgeifre';
const BASE = (process.env.SUPABASE_URL || `https://${REF}.supabase.co`).replace(/\/$/, '') + '/rest/v1';

if (!KEY) { console.error('FAIL: no SUPABASE_SERVICE_KEY / SUPABASE_KEY found in env or .env'); process.exit(1); }

const H = {
  'content-type': 'application/json',
  apikey: KEY,
  authorization: `Bearer ${KEY}`,
  Prefer: 'return=representation',
};
const TAG = `__diag_${Date.now()}`;

async function post(table, body) {
  const r = await fetch(`${BASE}/${table}`, { method: 'POST', headers: H, body: JSON.stringify([body]) });
  const text = await r.text();
  return { status: r.status, ok: r.ok, text, id: r.ok ? (JSON.parse(text)[0]?.id) : null };
}
async function del(table, id) {
  if (id == null) return;
  await fetch(`${BASE}/${table}?id=eq.${id}`, { method: 'DELETE', headers: H }).catch(() => {});
}

console.log(`Supabase: ${BASE}`);
console.log(`Key: ${KEY.slice(0, 6)}…${KEY.slice(-4)} (${KEY.length} chars)\n`);

// TEST 1 — mirror startRun()
const run = await post('agent_runs', {
  agent: TAG, agent_name: TAG, status: 'running', started_at: new Date().toISOString(),
});
console.log(`RUN insert:     ${run.status}${run.ok ? ' ✓' : '  ' + run.text.slice(0, 240)}`);

// TEST 2 — mirror upsertFinding() (needs 0002-aeo-watch.sql columns)
const find = await post('agent_findings', {
  agent: TAG, agent_name: TAG, category: 'diag', finding: 'diag', // legacy NOT NULL cols
  dedup_key: TAG, source: 'diag', title: 'diag', url: 'https://example.com',
  summary: 'diag', tags: ['diag'], panel_verdict: 'SKIP', panel_split: false, panel_payload: {},
});
console.log(`FINDING insert: ${find.status}${find.ok ? ' ✓' : '  ' + find.text.slice(0, 240)}`);

// Cleanup
await del('agent_runs', run.id);
await del('agent_findings', find.id);
console.log('\n(cleaned up test rows)');

// Verdict
console.log('\n──────── VERDICT ────────');
if (run.ok && find.ok) console.log('Both writes OK → Supabase is NOT the cause. Read the Actions FATAL line.');
else if (!run.ok && run.status === 401) console.log('401 on RUN → SUPABASE_KEY is wrong/anon. Fix the Actions secret + local .env (use service-role key).');
else if (!run.ok) console.log('RUN failed → base agent_runs table/columns issue. Check the error text above.');
else if (!find.ok) console.log('RUN ok but FINDING failed → migration 0002-aeo-watch.sql not applied. Run it in Supabase (Step 3).');
process.exit(run.ok && find.ok ? 0 : 1);
