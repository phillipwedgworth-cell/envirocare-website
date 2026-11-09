// Guard: every internal API route fails closed (patch 0021, Sunday audit 2026-11-08 R5).
//
// The audit found production routes that ran paid agents or changed data with
// no auth (cfo/run, proposer/run, style-critic/run, ads approve/feedback/draft,
// three diagnostics) and six cron routes that let everyone in when CRON_SECRET
// was unset (`if (secret && …)`). This guard reads every app/api/**/route.ts and
// fails when a route is neither gated nor on the explicit PUBLIC list below.
// Adding a route to PUBLIC is a decision: write down why it must be open.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const PUBLIC = new Map([
  ["app/api/chat/route.ts", "site chatbot — customer-facing"],
  ["app/api/quote/route.ts", "quote form — customer-facing"],
  ["app/api/og/route.tsx", "social share images"],
  ["app/api/ads/[id]/route.ts", "read-only draft fetch by unguessable UUID, used server-side by /ads/[id]"],
  ["app/api/leads/desk-login/route.ts", "the login endpoint itself (checks LEADS_DESK_KEY)"],
]);
// Patterns that count as a real, fail-closed gate.
const GATES = [
  /requireCron\(|requireAdmin\(/,
  /function authorized\(/,
  /keyMatches\(/,
  /deskSessionOk\(/,
  /if \(!secret \|\|/,
  /if \(!routeKey \|\|/,
  /if \(!expected\)[\s\S]{0,200}status: 50[03]/,
  /cleanEnv\("APPROVE_KEY"\)/,
  /process\.env\.COMMAND_CENTER_KEY/,
];
const FAIL_OPEN = /if\s*\(\s*secret\s*&&/;

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/^route\.tsx?$/.test(n)) out.push(p.split("\\").join("/"));
  }
  return out;
}

let fail = 0;
const routes = walk("app/api");
for (const f of routes) {
  const src = readFileSync(f, "utf8");
  if (FAIL_OPEN.test(src)) { console.error(`FAIL-OPEN auth (passes when the secret is unset): ${f}`); fail++; continue; }
  if (PUBLIC.has(f)) continue;
  if (!GATES.some((g) => g.test(src))) { console.error(`NO AUTH GATE: ${f} — gate it with lib/api-auth.ts or add it to PUBLIC with a reason`); fail++; }
}
for (const f of PUBLIC.keys()) if (!routes.includes(f)) { console.error(`PUBLIC list names a route that no longer exists: ${f}`); fail++; }

// Self-test: the guard must catch the exact shapes the audit found.
const caught = (src) => FAIL_OPEN.test(src) || !GATES.some((g) => g.test(src));
if (!caught('const secret = process.env.CRON_SECRET;\n  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {')) { console.error("self-test: fail-open shape not caught"); fail++; }
if (!caught('export async function GET() {\n  return execute();\n}')) { console.error("self-test: ungated route not caught"); fail++; }
if (caught('export async function GET(req: Request) {\n  return requireCron(req) ?? execute();\n}')) { console.error("self-test: gated route wrongly flagged"); fail++; }

if (fail) { console.error(`\ntest:api-auth FAILED (${fail})`); process.exit(1); }
console.log(`test:api-auth OK — ${routes.length} routes: ${routes.length - PUBLIC.size} gated fail-closed, ${PUBLIC.size} public by decision`);
