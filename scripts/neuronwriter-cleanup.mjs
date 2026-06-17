#!/usr/bin/env node
// Bulk-delete EMPTY NeuronWriter query shells. Dry-run unless --confirm passed.
// Safe by design: only deletes rows where content score AND word count are empty.
//
// ⚠️  Do NOT run the --confirm delete until the agent's NeuronWriter try/finally
//     cleanup fix (agents/lib/neuronwriter.mjs markOrphanQuery / query reuse) is
//     LIVE in production. If the agent is still minting fresh queries every run,
//     deleting now just lets the next run refill the shells.
//
// Project id: reuses the SAME value the agent posts to — process.env.NEURONWRITER_PROJECT
// (see agents/lib/neuronwriter.mjs createQuery). NEURONWRITER_PROJECT_ID overrides it.
//
// ⚠️  Endpoint/field names are NOT verified against the live API. The agent's
//     client (agents/lib/neuronwriter.mjs) only uses list-projects / new-query /
//     get-query / evaluate-content on base /neuron-api/0.5 — list-queries and
//     delete-query are assumed here and may differ by plan. The file header there
//     warns a previous hypothetical path 404'd on every call. Verify both the
//     `/writer` base and the score/word field names against current NeuronWriter
//     API docs, then trust the DRY RUN counts before ever passing --confirm.

const API = "https://app.neuronwriter.com/neuron-api/0.5/writer";
const KEY = process.env.NEURONWRITER_API_KEY;
// Reuse the agent's project (NEURONWRITER_PROJECT); allow an explicit override.
const PROJECT = process.env.NEURONWRITER_PROJECT_ID || process.env.NEURONWRITER_PROJECT;
const CONFIRM = process.argv.includes("--confirm");

if (!KEY)     { console.error("Missing NEURONWRITER_API_KEY"); process.exit(1); }
if (!PROJECT) { console.error("Missing NEURONWRITER_PROJECT (or NEURONWRITER_PROJECT_ID)"); process.exit(1); }

async function api(path, body) {
  const r = await fetch(`${API}/${path}`, {
    method: "POST",
    headers: { "X-API-KEY": KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`${path} → ${r.status} ${await r.text()}`);
  return r.json();
}

// 1. List all queries in the project
const list = await api("list-queries", { project: PROJECT });
const queries = list.queries ?? list ?? [];
console.log(`Total queries in project: ${queries.length}`);

// 2. Identify EMPTY shells: no content score AND no/zero words.
//    NeuronWriter field names vary by API version — match defensively.
const isEmpty = (q) => {
  const score = q.content_score ?? q.score ?? null;
  const words = q.word_count ?? q.words ?? 0;
  const hasScore = score !== null && score !== "" && Number(score) > 0;
  const hasWords = Number(words) > 0;
  return !hasScore && !hasWords;
};
const empties = queries.filter(isEmpty);
const keep = queries.filter((q) => !isEmpty(q));

console.log(`\nEMPTY shells (would delete): ${empties.length}`);
console.log(`Real queries (KEEP, untouched): ${keep.length}`);
console.log("\nFirst 10 to be deleted (id | date | score | words):");
empties.slice(0, 10).forEach((q) =>
  console.log(`  ${q.query ?? q.id} | ${q.created ?? q.date ?? "?"} | score=${q.content_score ?? q.score ?? "-"} | words=${q.word_count ?? q.words ?? 0}`)
);

// 3. Safety rails before any destructive action
if (keep.length === 0 && queries.length > 0) {
  console.error("\nABORT: filter would delete EVERY query (0 kept). Field names");
  console.error("likely don't match — inspect one query object and fix isEmpty().");
  process.exit(1);
}
if (!CONFIRM) {
  console.log(`\nDRY RUN. Nothing deleted. Re-run with --confirm to delete ${empties.length}.`);
  process.exit(0);
}

// 4. Delete (only reached with --confirm)
let ok = 0, fail = 0;
for (const q of empties) {
  const id = q.query ?? q.id;
  try { await api("delete-query", { query: id }); ok++; process.stdout.write("."); }
  catch (e) { fail++; console.error(`\n  delete ${id} failed: ${e.message}`); }
}
console.log(`\nDone. Deleted ${ok}, failed ${fail}, kept ${keep.length}.`);
