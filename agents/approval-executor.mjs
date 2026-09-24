// agents/approval-executor.mjs
//
// Ships what Phillip APPROVED in approval_queue. app/api/approve/route.ts has
// always said an executor would do this; none existed, so as of 2026-09-24 there
// were 81 approved rows (68 GBP posts, 10 ads, 3 web) and not one had ever been
// marked shipped or failed.
//
// DRY RUN BY DEFAULT. Nothing is written anywhere — not Supabase, not OneUp —
// unless --live is passed. The scheduled workflow never passes it and does not
// hold the OneUp key, so it cannot publish even by mistake.
//
//   node agents/approval-executor.mjs          # print the plan, write nothing
//   node agents/approval-executor.mjs --live   # apply it
//
// ORDER OF RULES, per approved row:
//   1. ads / web rows          -> 'fix'  "needs_human: …" (a person does these)
//   2. older than 21 days      -> 'skip' "expired: …"
//   3. names a month now past  -> 'skip' "expired: stale seasonal …"
//   4. near-duplicate title    -> 'skip' "merged: near-duplicate of <id>"
//   5. compliance gate fails   -> 'fix'  "compliance: …"
//   6. no OneUp listing        -> 'fix'  "needs_human: …"
//   7. otherwise               -> scheduled in OneUp >= 7 days out, 'shipped'
//   OneUp API error            -> 'failed' with the reason
//
// STATUS VALUES. The spec asked for 'expired', 'merged' and 'needs_human'. The
// table's CHECK constraint (approval_queue_status_check) allows only pending,
// approved, fix, skip, shipped, failed — those three would be rejected on the
// first write. Rather than change the production schema, each maps to the
// nearest existing status and the reason leads decision_note, so it stays
// filterable: `decision_note like 'expired:%'`.
//
// COMPLIANCE. Every row is re-scanned by TWO gates, and it must pass both:
//   - scan() from oneup-push.mjs — the GBP-specific gate (phone numbers in a GBP
//     body, which Google silently rejects; unqualified $1M; "guarantee";
//     retired names; the dead 649-5278 line; founder-date claims)
//   - scanText() from scripts/lib/compliance-rules.mjs — the repo's 40-rule canon
//     (superseded March–November season, entity-attached 1958, "no contract", …)
// All 68 approved posts carry compliance_clean = true. That flag is NOT trusted:
// it is how a banned "guarantee" phrase reached this queue before.
//
// ONEUP HAS NO DRAFT ENDPOINT (only scheduletextpost, per oneup-push.mjs's
// verified API contract), so posts are SCHEDULED at least 7 days out, one per
// listing per day at 14:00 UTC — review window, not a publish-now.

import { supabase, logAgentRun } from "./lib/supabase.mjs";
import { logFindingREST } from "./lib/run-log.mjs";
import { scan as gbpGate } from "./oneup-push.mjs";
import { compileRules, scanText } from "../scripts/lib/compliance-rules.mjs";
import { appendFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const AGENT_NAME = "approval-executor";
const LIVE = process.argv.includes("--live");
const ONEUP = "https://www.oneupapp.io/api";
const ONEUP_KEY = process.env.ONEUP_API;

const MAX_AGE_DAYS = 21;
const DEDUP_JACCARD = 0.6;   // title-token overlap that counts as the same post
const LEAD_DAYS = 7;         // earliest a post may go live after scheduling
const SLOT_HOUR_UTC = 14;    // ~9am CT, the slot the calendar already used

// approval_queue location -> the GBP listing it publishes to, matched against
// OneUp's listsocialaccounts full_name.
//
// DECISION FOR PHILLIP — "birmingham". The proposer tags metro posts
// "birmingham", which in this codebase has historically meant the ALABASTER
// listing (data/offices.ts: OfficeId 'birmingham' IS Butler Rd — a documented
// naming trap), and oneup-push.mjs routes it there too. The 16th Ave Birmingham
// GBP has existed since 2026-09-05. 50 of the 68 approved posts are "birmingham".
// Kept on Alabaster to match every existing route; change to "16th ave" here to
// send them to the Birmingham listing instead.
const ROUTES = {
  birmingham: { needle: "butler rd", listing: "Alabaster GBP (Butler Rd)" },
  alabaster: { needle: "butler rd", listing: "Alabaster GBP (Butler Rd)" },
  huntsville: { needle: "old madison pike", listing: "Huntsville GBP" },
  lake_martin: { needle: "tallapoosa", listing: "Alex City GBP" },
};

const NEEDS_HUMAN = {
  ads: "needs_human: approved ad — build or edit it in Google Ads/Meta by hand, then mark shipped",
  web: "needs_human: approved site change — open a PR for it, then mark shipped",
};

const MONTHS = ["january", "february", "march", "april", "may", "june", "july",
  "august", "september", "october", "november", "december"];
const STOP = new Set(("a an and are as at be before but by for from get has have how in into is it its " +
  "now of on or our so than that the their this to up us we what when with you your").split(" "));

// ── helpers ─────────────────────────────────────────────────────────────────
function monthInChicago(d = new Date()) {
  return Number(new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", month: "numeric" }).format(d)) - 1;
}

// Months named in the text. "may" is only counted when capitalised as a month
// word ("in May"), so the verb "may" never trips it; abbreviations are ignored.
function monthsNamed(text) {
  const found = new Set();
  for (const m of text.matchAll(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g)) {
    found.add(MONTHS.indexOf(m[1].toLowerCase()));
  }
  return [...found];
}

function tokens(title) {
  return new Set(String(title || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/).filter((w) => w && !STOP.has(w)));
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
}

function fmtDateTime(d) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}`;
}

async function oneup(endpoint, body) {
  const url = `${ONEUP}/${endpoint}?apiKey=${encodeURIComponent(ONEUP_KEY)}`;
  const res = body
    ? await fetch(url, { method: "POST", body: new URLSearchParams(body) })
    : await fetch(url);
  const json = await res.json().catch(() => ({}));
  // Never surface the URL — it carries the API key.
  if (!res.ok || json.error) throw new Error(`OneUp ${endpoint}: ${json.message || `HTTP ${res.status}`}`);
  return json.data;
}

// ── plan: pure, no writes ──────────────────────────────────────────────────
export function plan(rows, now = new Date()) {
  const rules = compileRules();
  const nowMonth = monthInChicago(now);
  const out = [];
  const survivors = [];

  for (const r of rows) {
    const text = `${r.title || ""}\n${r.preview || ""}`;
    const ageDays = (now - new Date(r.created_at)) / 86400000;

    if (r.category === "ads" || r.category === "web") {
      out.push({ r, status: "fix", note: NEEDS_HUMAN[r.category] });
      continue;
    }
    if (r.action_type !== "post_publish") {
      out.push({ r, status: "fix", note: `needs_human: unknown action_type ${r.action_type ?? "null"} (category ${r.category})` });
      continue;
    }
    if (ageDays > MAX_AGE_DAYS) {
      out.push({ r, status: "skip", note: `expired: approved ${Math.floor(ageDays)} days ago (limit ${MAX_AGE_DAYS})` });
      continue;
    }
    const named = monthsNamed(text);
    if (named.length && named.every((m) => m < nowMonth)) {
      out.push({ r, status: "skip", note: `expired: stale seasonal (names ${named.map((m) => MONTHS[m]).join(", ")})` });
      continue;
    }
    survivors.push(r);
  }

  // Near-duplicates within a location: newest wins.
  const kept = [];
  survivors.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  for (const r of survivors) {
    const loc = r.action_payload?.location ?? "";
    const t = tokens(r.title);
    const dup = kept.find((k) => (k.action_payload?.location ?? "") === loc && jaccard(tokens(k.title), t) >= DEDUP_JACCARD);
    if (dup) {
      out.push({ r, status: "skip", note: `merged: near-duplicate of ${dup.id} ("${dup.title}")` });
      continue;
    }
    kept.push(r);
  }

  for (const r of kept) {
    // The proposer prefixes titles with a location label ("Birmingham: …"). That
    // is queue bookkeeping, not copy — never publish it as the post's first line.
    const headline = String(r.title || "").replace(/^(Birmingham|Alabaster|Huntsville|Lake Martin|Alexander City|Alex City)\s*:\s*/i, "");
    const content = [headline, r.preview].filter(Boolean).join("\n\n");
    const gbpHits = gbpGate(content);
    const canon = scanText(content, rules);
    const canonHits = (canon.blocking || []).map((b) => b.match || b.reason);
    if (gbpHits.length || canonHits.length) {
      const hits = [...canonHits.map((h) => `"${h}"`), ...gbpHits.map(() => "GBP gate")];
      out.push({ r, status: "fix", note: `compliance: ${[...new Set(hits)].join("; ")}` });
      continue;
    }
    const loc = r.action_payload?.location;
    const route = ROUTES[loc];
    if (!route) {
      out.push({ r, status: "fix", note: `needs_human: no GBP route for location "${loc}"` });
      continue;
    }
    out.push({ r, status: "ship", route, content });
  }
  return out;
}

// ── run ─────────────────────────────────────────────────────────────────────
export async function run() {
  if (!supabase) throw new Error("SUPABASE_URL / SUPABASE_KEY not set — cannot read approval_queue");

  const { data: rows, error } = await supabase
    .from("approval_queue")
    .select("id,created_at,title,category,preview,action_type,action_payload,status")
    .eq("status", "approved")
    .order("created_at", { ascending: true });
  if (error) throw new Error(`approval_queue read: ${error.message}`);

  const decisions = plan(rows || []);
  const toShip = decisions.filter((d) => d.status === "ship");

  // Schedule slots: one per listing per day, starting LEAD_DAYS out.
  const nextSlot = {};
  for (const d of toShip) {
    const n = (nextSlot[d.route.listing] = (nextSlot[d.route.listing] ?? -1) + 1);
    const when = new Date();
    when.setUTCDate(when.getUTCDate() + LEAD_DAYS + n);
    when.setUTCHours(SLOT_HOUR_UTC, 0, 0, 0);
    d.when = fmtDateTime(when);
  }

  let accounts = null;
  let categoryId = null;
  if (LIVE && toShip.length) {
    if (!ONEUP_KEY) throw new Error("--live needs ONEUP_API; nothing written");
    const [cats, accs] = await Promise.all([oneup("listcategory"), oneup("listsocialaccounts")]);
    categoryId = cats?.[0]?.id;
    if (!categoryId) throw new Error("OneUp: no categories found; nothing written");
    accounts = (accs || []).filter((a) => a.social_network_type === "GBP");
  }

  const counts = {};
  const lines = [];
  for (const d of decisions) {
    let status = d.status;
    let note = d.note;
    let ref = null;

    if (status === "ship") {
      if (!LIVE) {
        status = "shipped";
        note = `would schedule to ${d.route.listing} @ ${d.when} UTC`;
      } else {
        const acct = accounts.find((a) => String(a.full_name || "").toLowerCase().includes(d.route.needle));
        if (!acct) {
          status = "fix";
          note = `needs_human: ${d.route.listing} is not connected in OneUp`;
        } else {
          try {
            const res = await oneup("scheduletextpost", {
              category_id: String(categoryId),
              social_network_id: JSON.stringify([acct.social_account_id]),
              scheduled_date_time: d.when,
              content: d.content,
            });
            status = "shipped";
            ref = res?.post_id ? `oneup:${res.post_id}` : `oneup:scheduled:${d.when}:${acct.social_account_id}`;
            note = `scheduled to ${d.route.listing} @ ${d.when} UTC — review or delete in OneUp before then`;
          } catch (e) {
            status = "failed";
            note = `failed: ${e.message}`;
          }
        }
      }
    }

    counts[status] = (counts[status] || 0) + 1;
    lines.push(`${status.padEnd(7)} ${d.r.id.slice(0, 8)}  ${String(d.r.title || "").slice(0, 60).padEnd(60)}  ${note}`);

    if (LIVE) {
      const upd = { status, decision_note: `[executor ${new Date().toISOString().slice(0, 10)}] ${note}`, updated_at: new Date().toISOString() };
      if (ref) upd.action_ref = ref;
      const { error: uerr } = await supabase.from("approval_queue").update(upd).eq("id", d.r.id).eq("status", "approved");
      if (uerr) console.error(`[${AGENT_NAME}] update ${d.r.id} failed: ${uerr.message}`);
    }
  }

  const summary = `${LIVE ? "LIVE" : "DRY RUN"} over ${decisions.length} approved rows — ` +
    Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(", ");
  console.log(lines.join("\n"));
  console.log(`\n[${AGENT_NAME}] ${summary}${LIVE ? "" : " (nothing written; re-run with --live to apply)"}`);

  // In CI, put the plan on the run's summary page so the dry run is readable
  // without digging through logs. Not a database write.
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY,
      `## Approval executor — ${LIVE ? "LIVE" : "dry run"}\n\n${summary}\n\n\`\`\`\n${lines.join("\n")}\n\`\`\`\n`);
  }

  // Exactly one agent_runs row and one digest finding — live only.
  if (LIVE) {
    await logAgentRun(AGENT_NAME, "ok", summary).catch(() => {});
    await logFindingREST({ agent_name: AGENT_NAME, category: "ops", severity: "info", finding: summary }).catch(() => {});
  }
  return { summary, counts };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  run().catch((e) => { console.error(`[${AGENT_NAME}] ${e.message}`); process.exit(1); });
}
