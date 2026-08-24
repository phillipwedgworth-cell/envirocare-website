#!/usr/bin/env node
/**
 * scripts/proposer.mjs — generates approval-queue proposals for EnviroCare.
 * (Distinct from agents/proposer.mjs, which consolidates observer findings.)
 *
 * Design rules (learned the hard way):
 *   1. NEVER exit 0 on a failed or empty write. A green check must mean rows landed.
 *   2. Haiku only. No Opus, no multi-model panel. Cost cap discipline.
 *   3. Dedupe against pending rows so re-runs don't spam the queue.
 *
 * Env required:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY  (the workflow maps the repo's SUPABASE_KEY secret here)
 *   ANTHROPIC_API_KEY
 *
 * ── SCHEMA (verified against supabase/approval_queue.sql, Jul 24 2026) ──
 * The delivered pack assumed columns type/body/context/location — none exist.
 * Real columns the /approve console (app/approve/QueueClient.tsx Item) reads:
 *   title · category('comms'|'web'|'ads'|'post'|'ops') · preview · risk
 *   ('green'|'yellow'|'red') · compliance_clean · compliance_notes · status
 *   · source · action_type · action_payload(jsonb)
 * Mapping: model "type" -> category, "body" -> preview, "context"+"location"
 * -> action_payload jsonb (and the location label prefixes the title so the
 * queue is scannable). All rows land risk='yellow' (customer-facing copy).
 */
const TABLE = "approval_queue";
const PENDING = "pending";

const MODEL = "claude-haiku-4-5-20251001";
const MAX_PROPOSALS = 6;

const LOCATIONS = [
  { key: "birmingham", label: "Birmingham / Alabaster", phone: "(205) 940-6360" },
  { key: "huntsville", label: "Huntsville", phone: "(256) 937-7676" },
  { key: "lake_martin", label: "Lake Martin / Alexander City", phone: "(256) 234-6162" },
];
const CATEGORY_FOR_TYPE = { gbp_post: "post", content_brief: "web", seasonal_campaign: "ads" };

// RULES ARE NOT COPIED HERE ANY MORE, 2026-08-18.
//
// This block used to hold a "compact form of data/compliance.ts BANNED_PATTERNS":
// 9 hand-transcribed rules against 30 in the real file. The 21 never copied are
// exactly the ones that leaked -- the retired name, unqualified $1,000,000, and
// the possessive-guarantee shape. Six rows in approval_queue carry those claims
// and every one says compliance_clean = true, because this scan DID run. It just
// could not see rules nobody had transcribed into it.
//
// A drifted second copy of a rule set is worse than no copy, because it reports
// PASS with authority. There is now ONE source: scripts/lib/compliance-rules.mjs
// reads data/compliance.ts directly, and the repo guard uses the same function.
import { compileRules, scanText } from "./lib/compliance-rules.mjs";

const COMPLIANCE_RULES = compileRules();

function die(msg, err) {
  console.error(`\n✗ PROPOSER FAILED: ${msg}`);
  if (err) console.error(err?.message ?? err);
  process.exit(1);
}

function env(name) {
  const v = process.env[name];
  if (!v) die(`missing env var ${name}`);
  return v;
}

const SUPABASE_URL = env("SUPABASE_URL").replace(/\/$/, "");
const SUPABASE_KEY = env("SUPABASE_SERVICE_ROLE_KEY");
const ANTHROPIC_KEY = env("ANTHROPIC_API_KEY");

const sbHeaders = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
};

async function sb(path, init = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: { ...sbHeaders, ...(init.headers || {}) },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Supabase ${res.status} on ${path}\n${text}`);
  }
  return text ? JSON.parse(text) : [];
}

/** Fail fast if the table is unreachable — don't discover it at insert time. */
async function preflight() {
  try {
    await sb(`${TABLE}?select=status&limit=1`);
    console.log(`✓ ${TABLE} reachable`);
  } catch (e) {
    die(
      `cannot read ${TABLE}. Either the table doesn't exist (run supabase/approval_queue.sql), ` +
        `the service-role key is wrong, or SUPABASE_URL points at a different project.`,
      e
    );
  }
}

async function fetchPendingTitles() {
  const rows = await sb(`${TABLE}?select=title&status=eq.${PENDING}&limit=500`);
  return new Set(rows.map((r) => (r.title || "").trim().toLowerCase()));
}

async function claude(prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) {
    throw new Error(`Anthropic ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  return data.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");
}

function buildPrompt() {
  const today = new Date().toISOString().slice(0, 10);
  return `You generate proposed marketing actions for EnviroCare Pest & Termite
Services, a fourth-generation family-owned Alabama pest control company founded
in 1958. Three offices: Birmingham/Alabaster, Huntsville, Lake Martin/Alexander City.

Facts you may use (do NOT invent others, especially prices):
- Bi-monthly pest control: $35/month on ACH, or $70 per visit. 30+ pests. Unlimited free re-services. Write that phrase in full — "unlimited" alone, or "unlimited service"/"unlimited protection", is a blocked claim. The only accepted forms are "unlimited free re-service" and "unlimited covered re-service".
- Termite: Sentricon Always Active bait system. No drilling. Free inspection. The damage coverage is EnviroCare-backed, and the ONLY accepted wording is: "up to $1,000,000 in damage repair coverage, subject to the terms of the agreement". Never attribute it to Corteva, Sentricon or a manufacturer, and never call it a guarantee — see the hard bans below.
- Mosquito: ~$45/treatment, ~9 treatments March-November (~$33.75/mo).
- Mosquito + Tick: ~$65/treatment. Covers chiggers. Does NOT cover fleas.
- Phones: Birmingham (205) 940-6360, Huntsville (256) 937-7676, Lake Martin (256) 234-6162.

HARD BANS — never use any of these (violations get the company in legal trouble):
"safe"/"pet-safe"/"kid-safe"/"non-toxic"/"eco-safe"/"chemical-free" (say
"EPA-registered products applied according to label directions"); "same-day"
or any availability promise; "Bundle & Save" or any discount/% off language;
review or customer counts; competitor names; "third generation" (always
fourth); Tuscaloosa; bed bug / wildlife / rodent removal (not offered);
promising to eliminate mosquitoes ("reduce"/"knock down" only).

MORE HARD BANS — these three are the ones that actually keep getting tripped,
so read them twice before you write a termite proposal:
1. NEVER write the coverage as a possessive guarantee. "our guarantee",
   "our own guarantee", "EnviroCare's guarantee", "EnviroCare's own guarantee",
   "EnviroCare's Termite Guarantee" are ALL blocked, including in a title.
   Write "up to $1,000,000 in damage repair coverage, subject to the terms of
   the agreement" instead. The word "guarantee" after a possessive is the
   trip-wire; avoid the construction entirely.
2. If the $1,000,000 figure appears ANYWHERE in a proposal, that same proposal
   MUST also contain the literal phrase "subject to the terms of the agreement".
   No exceptions, and it must be in the same proposal, not implied.
3. Never write "N-day guarantee" / "30-day guarantee" or any time-bounded
   guarantee. Say the commitment plainly: "if pests return between visits we
   come back at no charge".

A proposal that trips any of these is discarded, not fixed. It wastes the whole
cycle, so do not gamble on wording you are unsure of — use the exact approved
phrases above verbatim.

Today is ${today}. Generate exactly ${MAX_PROPOSALS} proposals appropriate for
this point in the Alabama pest season.

Return ONLY a JSON array. No preamble, no markdown fences. Each object:
{
  "type": "gbp_post" | "content_brief" | "seasonal_campaign",
  "location": "birmingham" | "huntsville" | "lake_martin",
  "title": "short label, under 60 chars, specific and unique",
  "body": "the actual draft copy or brief, ready for a human to approve",
  "context": "one sentence on why this is worth doing now"
}

Make titles specific enough to be distinguishable. Vary the locations.
Do not use em dashes. Do not make guarantees about eliminating all pests.`;
}

function parseProposals(raw) {
  const cleaned = raw.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("[");
  const end = cleaned.lastIndexOf("]");
  if (start === -1 || end === -1) {
    throw new Error(`no JSON array in model output:\n${cleaned.slice(0, 500)}`);
  }
  const parsed = JSON.parse(cleaned.slice(start, end + 1));
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("model returned an empty array");
  }
  const valid = LOCATIONS.map((l) => l.key);
  return parsed
    .filter((p) => p && p.title && p.body)
    .map((p) => {
      const locKey = valid.includes(p.location) ? p.location : "birmingham";
      const loc = LOCATIONS.find((l) => l.key === locKey);
      const body = String(p.body).trim();
      const context = String(p.context || "Generated by proposer").trim();
      // Scanned as one blob so `requires` carve-outs behave the way they do on a
      // rendered page: a $1M figure is qualified if the copy states the terms
      // anywhere in it, not only on the same line.
      const scan = scanText([p.title, body, context].join(String.fromCharCode(10)), COMPLIANCE_RULES);
      return {
        title: `${loc.label.split(" /")[0]}: ${String(p.title).trim()}`.slice(0, 120),
        category: CATEGORY_FOR_TYPE[p.type] || "post",
        preview: body,
        risk: "yellow", // customer-facing copy — always human-reviewed
        compliance_clean: scan.clean,
        compliance_notes: scan.notes,
        status: PENDING,
        source: "proposer",
        action_type: (CATEGORY_FOR_TYPE[p.type] || "post") === "post" ? "post_publish" : null,
        action_payload: { proposed_type: p.type || "gbp_post", location: locKey, context },
      };
    });
}

async function main() {
  console.log(`proposer starting ${new Date().toISOString()}`);
  await preflight();

  const seen = await fetchPendingTitles();
  console.log(`  ${seen.size} proposals already pending`);

  let proposals;
  try {
    proposals = parseProposals(await claude(buildPrompt()));
  } catch (e) {
    die("could not generate proposals", e);
  }

  const deduped = proposals.filter((p) => !seen.has(p.title.toLowerCase()));
  console.log(`  ${proposals.length} generated, ${deduped.length} new after dedupe`);

  // Banned language does NOT get queued. It used to: rows landed in
  // approval_queue with compliance_clean=false and a note, on the theory that a
  // human would catch them. By 2026-08-23 that had accumulated 13 of 33 pending
  // rows carrying BLOCKING claims (10 possessive-guarantee, 7 unqualified $1M,
  // 3 unapproved "unlimited"), growing ~2/day, in the one place Phillip goes to
  // click approve. A queue that contains claims the compliance gate would reject
  // is worse than a shorter queue: it puts the violation one click from live.
  const fresh = deduped.filter((p) => p.compliance_clean);
  const rejected = deduped.filter((p) => !p.compliance_clean);
  if (rejected.length) {
    console.log(`  ✗ ${rejected.length} proposal(s) DISCARDED — banned language, not queued:`);
    for (const r of rejected) console.log(`     - ${r.title}: ${r.compliance_notes}`);
  }

  if (fresh.length === 0) {
    die(
      rejected.length
        ? `nothing queueable: ${deduped.length} new proposal(s), all ${rejected.length} ` +
            "discarded for banned language. The generation prompt and " +
            "data/compliance.ts disagree — fix the prompt, not the scanner. " +
            "Exiting non-zero on purpose."
        : "every generated proposal duplicates something already pending. " +
            "Clear the queue or widen the prompt. Exiting non-zero on purpose: " +
            "a run that writes nothing is not a success."
    );
  }

  let inserted;
  try {
    inserted = await sb(TABLE, {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(fresh),
    });
  } catch (e) {
    die(
      "insert rejected. If this names an unknown column, re-verify against " +
        "supabase/approval_queue.sql and app/approve/QueueClient.tsx.",
      e
    );
  }

  if (!Array.isArray(inserted) || inserted.length === 0) {
    die("insert returned no rows. Check RLS policies on the service-role key.");
  }

  console.log(`\n✓ wrote ${inserted.length} proposals to ${TABLE}`);
  for (const r of inserted) console.log(`   - [${r.category}] ${r.title}`);
  process.exit(0);
}

main().catch((e) => die("unhandled error", e));
