// Fails when something runs on a schedule that is not on agents/ROSTER.json,
// or the roster lists something that no longer runs. Added 2026-09-27: the
// July consolidation plan was prose and the fleet grew anyway. A rule that is
// not a test is a suggestion.
import fs from "node:fs";
import path from "node:path";

const roster = JSON.parse(fs.readFileSync("agents/ROSTER.json", "utf8"));
const errors = [];

const wfDir = ".github/workflows";
const scheduled = fs.readdirSync(wfDir).filter((f) => f.endsWith(".yml") || f.endsWith(".yaml"))
  .filter((f) => /^\s*-\s*cron:/m.test(fs.readFileSync(path.join(wfDir, f), "utf8")));
for (const f of scheduled) if (!roster.workflows[f]) errors.push(`workflow ${f} runs on a schedule but is not in agents/ROSTER.json`);
for (const f of Object.keys(roster.workflows)) {
  if (!fs.existsSync(path.join(wfDir, f))) errors.push(`ROSTER lists ${f} but the workflow file does not exist`);
  else if (!scheduled.includes(f)) errors.push(`ROSTER lists ${f} but it has no cron schedule`);
}

const crons = (JSON.parse(fs.readFileSync("vercel.json", "utf8")).crons ?? []).map((c) => c.path);
for (const p of crons) if (!roster.vercel[p]) errors.push(`vercel.json cron ${p} is not in agents/ROSTER.json`);
for (const p of Object.keys(roster.vercel)) if (!crons.includes(p)) errors.push(`ROSTER lists Vercel cron ${p} but vercel.json does not schedule it`);

const seen = new Map();
for (const [src, e] of [...Object.entries(roster.workflows), ...Object.entries(roster.vercel)])
  for (const a of Object.keys(e.agents ?? {})) {
    if (seen.has(a)) errors.push(`agent ${a} is scheduled twice (${seen.get(a)} and ${src})`);
    seen.set(a, src);
  }

if (errors.length) { console.error("✗ roster:\n  " + errors.join("\n  ")); process.exit(1); }
console.log(`✓ roster: ${scheduled.length} scheduled workflows + ${crons.length} Vercel crons, all on agents/ROSTER.json; ${seen.size} agents, none scheduled twice`);
