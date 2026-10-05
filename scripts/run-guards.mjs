// scripts/run-guards.mjs — `npm test`
//
// Runs EVERY guard and reports every result, then exits 1 if any failed.
//
// Why not `a && b && c`: that chain stops at the first failure. From 09-27 to
// 10-04 test:lastmod failed on every push to main, so test:tracking,
// test:similarity, test:captivated-safety and test:listings (the guard that
// reads the live BrightLocal/Google descriptions) never ran in CI at all, and
// nobody could tell (Sunday audit 2026-10-04, R1). One red guard must not hide
// the others.
import { spawnSync } from "node:child_process";

const GUARDS = [
  "test:roster", "test:compliance", "test:source", "test:blogposts", "test:generated",
  "test:imagery", "test:zombies", "test:citynap", "test:local-falcon", "test:zip-routing",
  "test:breadcrumbs", "test:og", "test:brief", "test:lastmod", "test:tracking",
  "test:similarity", "test:captivated-safety", "test:listings",
];

const SKIP_RE = /\bSKIPPED\b|\bSkipping\b|checks nothing|no build output/i;

const results = [];
for (const g of GUARDS) {
  console.log(`\n━━━ ${g} ━━━`);
  const t = Date.now();
  const r = spawnSync("npm", ["run", "-s", g], { encoding: "utf8", shell: process.platform === "win32", maxBuffer: 64 * 1024 * 1024 });
  const out = `${r.stdout ?? ""}${r.stderr ?? ""}`;
  process.stdout.write(out);
  // A guard that exits 0 after skipping its checks is not a pass. Report it
  // as SKIP so a missing build or credential is visible in the summary.
  const skipped = r.status === 0 && SKIP_RE.test(out);
  results.push({ g, ok: r.status === 0, skipped, code: r.status, s: ((Date.now() - t) / 1000).toFixed(1) });
}

console.log("\n━━━ GUARD SUMMARY ━━━");
for (const r of results) console.log(`${!r.ok ? "FAIL" : r.skipped ? "SKIP" : "PASS"}  ${r.g.padEnd(24)} ${r.s}s${r.ok ? (r.skipped ? "  (exit 0, but checked less than it should — see its output)" : "") : `  (exit ${r.code})`}`);
const failed = results.filter((r) => !r.ok);
const skipped = results.filter((r) => r.ok && r.skipped);
console.log(`\n${results.length - failed.length - skipped.length}/${results.length} fully passed` +
  (skipped.length ? ` · ${skipped.length} skipped or partial: ${skipped.map((r) => r.g).join(", ")}` : "") +
  (failed.length ? ` · FAILED: ${failed.map((r) => r.g).join(", ")}` : ""));
process.exit(failed.length ? 1 : 0);
