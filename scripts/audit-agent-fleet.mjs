// Runs the five-question checklist from agents/BEST-PRACTICES.md against every
// agent in the fleet. Mechanical, not impressionistic: each answer names the
// symbol it matched on, so a "no" can be checked rather than trusted.
import { readFileSync, readdirSync } from "node:fs";

const files = readdirSync("agents").filter((f) => f.endsWith(".mjs")).sort();

// Q1 read-before-act: pulls its own prior state at start
// Widened after two false negatives on the first run: morning-brief reads
// yesterday's brief with a RAW REST call (brief_date=lt…&order=…desc&limit=1)
// rather than the kv helper. Matching only stateGet() reported failures that
// were not real.
const READS = /\bstateGet\b|\bstateGetAll\b|readFinding|getLastRun|priorFindings|last_run|previousBrief|loadLedger|DRAFTED_LEDGER|brief_date=lt|=lt\.|\.lt\(|order=[a-z_]+\.desc|\.order\([^)]*desc|knowledgeBlock|agent_knowledge/i;
// Q2 distilled learning written after
const WRITES = /\bstateSet\b|writeFinding|writeDiscussion|writeKnowledge|agent_knowledge|stateClear|logAgentRun/;
// Q3 idempotent / gated side effects
// Widened: social-poster gates on .eq("status","approved") — a Supabase filter,
// not a === comparison. The first run called it UNGATED, which was wrong, and is
// the most dangerous kind of wrong in a checklist about safety.
const GATED = /status\s*===?\s*['"]approved|\.eq\(\s*['"]status['"]\s*,\s*['"]approved|--live|DRY|dryRun|already|dedup|ledger|seen\b|idempot|LIVE\b/;
// Q4 watchdog visibility: writes to the one ledger
const LEDGER = /logAgentRun/;
// Q5 outcome metric rather than activity count
const OUTCOME = /impressions|clicks|conversion|solv|saiv|rank|score|position|ctr/i;

// Scripts that are one-shot utilities, not scheduled agents. The checklist is
// about the FLEET; holding a repair script to a memory-read rule is noise.
const UTILITY = new Set([
  "nw-price-repair.mjs", "rescore-all.mjs", "rescore-once.mjs", "seed-nw-cache.mjs",
  "run.mjs", "measure-380.mjs", "shots-380.mjs", "verify-380.mjs",
  "nw-scores-snapshot.mjs", "ingest-seo-history.mjs",
]);

const rows = [];
for (const f of files) {
  const src = readFileSync(`agents/${f}`, "utf8");
  rows.push({
    f,
    utility: UTILITY.has(f),
    q1: READS.test(src),
    q2: WRITES.test(src),
    q3: GATED.test(src),
    q4: LEDGER.test(src),
    q5: OUTCOME.test(src),
    sideEffects: /fetch\(|supabase\.from\([^)]*\)\s*\.\s*(insert|update|upsert|delete)|sendEmail|scheduletextpost|import-content/.test(src),
  });
}

const agents = rows.filter((r) => !r.utility);
const mark = (b) => (b ? "y" : "·");
console.log(`FLEET CHECKLIST — ${agents.length} scheduled agents (${rows.length - agents.length} one-shot utilities excluded)\n`);
console.log("                              Q1   Q2   Q3   Q4   Q5");
console.log("                              read write gate ledg outcome");
for (const r of agents) {
  console.log(`  ${r.f.replace(".mjs", "").padEnd(26)} ${mark(r.q1).padEnd(4)} ${mark(r.q2).padEnd(5)} ${mark(r.q3).padEnd(4)} ${mark(r.q4).padEnd(4)} ${mark(r.q5)}`);
}

const fail = (k) => agents.filter((r) => !r[k]).map((r) => r.f.replace(".mjs", ""));
console.log("\n── gaps ──────────────────────────────────────────────");
console.log(`Q1 no read-before-act  (${fail("q1").length}): ${fail("q1").join(", ") || "none"}`);
console.log(`Q2 no learning written (${fail("q2").length}): ${fail("q2").join(", ") || "none"}`);
console.log(`Q4 invisible to watchdog (${fail("q4").length}): ${fail("q4").join(", ") || "none"}`);

// The one that actually matters for safety: side effects with no gate.
const ungated = agents.filter((r) => r.sideEffects && !r.q3);
console.log(`\nUNGATED SIDE EFFECTS (${ungated.length}): ${ungated.map((r) => r.f).join(", ") || "none"}`);
