// agents/seed-nw-cache.mjs
// One-shot: seed the KV query cache (agent_state) from NeuronWriter list-queries
// so every agent path reuses existing query IDs instead of minting new ones.
// Costs ZERO quota. Safe to re-run any time.
//
// Run: node agents/seed-nw-cache.mjs
import { listQueries } from './lib/neuronwriter.mjs';
import { stateSet } from './lib/kv.mjs';

const proj = process.env.NEURONWRITER_PROJECT ?? '9d0bec3a70f4743c';
const rows = await listQueries(proj);
const byKeyword = {};
for (const q of Array.isArray(rows) ? rows : []) {
  const k = String(q.keyword ?? '').trim().toLowerCase();
  if (!k) continue;
  if (!byKeyword[k] || String(q.created ?? '') > String(byKeyword[k].created ?? '')) byKeyword[k] = q;
}
let n = 0;
for (const [keyword, q] of Object.entries(byKeyword)) {
  const id = q.query ?? q.query_id ?? q.id;
  if (!id) continue;
  await stateSet(`neuronwriter:query:${proj}:${keyword}`, id);
  console.log(`seeded "${keyword}" → ${id}`);
  n++;
}
console.log(`\n${Object.keys(byKeyword).length} unique keywords found in ${Array.isArray(rows) ? rows.length : 0} queries · ${n} cached`);
