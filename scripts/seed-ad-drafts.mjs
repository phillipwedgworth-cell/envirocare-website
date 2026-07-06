// ─── Seed EnviroCare ad drafts into the review queue (PAUSED / dry-run by default) ───
// Purpose: load agents/ad-campaign-drafts.json into the `agent_drafts` table so the
//          drafts appear in the /ads/<id> review UI and the Command Center. Every draft
//          is inserted with status "pending-review" (PAUSED). This NEVER touches Google
//          Ads and NEVER spends money — there is no ad-platform integration here.
//
// Usage:   node scripts/seed-ad-drafts.mjs            # dry-run: prints what WOULD be seeded
//          node scripts/seed-ad-drafts.mjs --commit    # actually insert (requires Supabase env)
//
// Env (only needed with --commit):  SUPABASE_URL  SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_KEY)
//
// SAFETY: status is forced to "pending-review". This script cannot approve, publish, or
//         launch anything. Going live is a separate, manual human step — see
//         agents/ad-launch-plan.md.

import fs from 'node:fs';
import path from 'node:path';

const DRAFTS_FILE = path.join(process.cwd(), 'agents', 'ad-campaign-drafts.json');
const commit = process.argv.includes('--commit');

const data = JSON.parse(fs.readFileSync(DRAFTS_FILE, 'utf8'));
const rows = data.drafts.map((d) => ({
  id: d.id,
  agent_name: d.agent_name || 'ad-automation-bot',
  title: d.title,
  body: d.body,
  cta: d.cta,
  landing_url: d.landing_url,
  status: 'pending-review', // forced PAUSED — never approved/published by this script
  metadata: d.metadata ?? {},
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));

console.log(`Prepared ${rows.length} PAUSED ad draft(s) from ${path.relative(process.cwd(), DRAFTS_FILE)}:`);
for (const r of rows) console.log(`  • ${r.id}  [${r.status}]  ${r.title}`);

if (!commit) {
  console.log('\nDry-run. Nothing written. Re-run with --commit (and Supabase env) to insert into agent_drafts.');
  process.exit(0);
}

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
if (!url || !key) {
  console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_KEY). Refusing to commit.');
  process.exit(1);
}

const { createClient } = await import('@supabase/supabase-js');
const db = createClient(url, key, { auth: { persistSession: false } });

const { data: inserted, error } = await db
  .from('agent_drafts')
  .upsert(rows, { onConflict: 'id' })
  .select();

if (error) {
  console.error('Insert failed:', error.message);
  process.exit(1);
}
console.log(`\n✅ Seeded ${inserted.length} draft(s) as PAUSED (pending-review). Review at /ads/<id> and approve when ready.`);
