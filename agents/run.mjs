// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/run.mjs
// Commit: feat(agents): register seo-snapshot as a runnable CLI target
// Push: main
// ─────────────────────────────────────
// agents/run.mjs
// Local CLI entry point: `node agents/run.mjs [agent-name]`
//
// No args                — runs the orchestrator (full Monday flow).
// brightlocal            — runs only the BrightLocal agent.
// site-reviewer          — runs only the site-reviewer agent.
// cfo-agent              — runs only the CFO agent.
//
// Loads .env from repo root automatically.

import fs from "fs/promises";
import path from "path";

async function loadDotenv() {
  // Try .env first, then .env.local (Next.js convention). Skip missing files silently.
  for (const name of [".env", ".env.local"]) {
    try {
      const raw = await fs.readFile(path.join(process.cwd(), name), "utf8");
      for (const line of raw.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eq = trimmed.indexOf("=");
        if (eq < 0) continue;
        const k = trimmed.slice(0, eq).trim();
        const v = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[k]) process.env[k] = v;
      }
    } catch {
      // file absent — that's fine
    }
  }
}

const TARGETS = {
  orchestrator: "./orchestrator.mjs",
  brightlocal: "./brightlocal.mjs",
  "site-reviewer": "./site-reviewer.mjs",
  "seo-monitor": "./seo-monitor.mjs",
  "cfo-agent": "./cfo-agent.mjs",
  "neuronwriter-qa": "./neuronwriter-qa.mjs",
  // seo-snapshot exports run() but had no CLI target and no workflow, so it
  // never executed in Actions. seo_metrics was being fed by the local
  // Title-Case "SEO Monitor" process instead; when that was killed on
  // 2026-08-21 20:34 the table stopped receiving rows the same second.
  // This is the supported path back.
  "seo-snapshot": "./seo-snapshot.mjs",
};

async function main() {
  await loadDotenv();
  const target = process.argv[2] ?? "orchestrator";
  const modPath = TARGETS[target];
  if (!modPath) {
    console.error(`Unknown agent: ${target}`);
    console.error(`Available: ${Object.keys(TARGETS).join(", ")}`);
    process.exit(2);
  }
  const mod = await import(modPath);
  if (typeof mod.run !== "function") {
    console.error(`${target} does not export run()`);
    process.exit(3);
  }
  const result = await mod.run();
  console.log("\n--- RESULT ---");
  console.log(typeof result === "string" ? result : JSON.stringify(result, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
