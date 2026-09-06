// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/executor.mjs
// Commit: feat(agents): executor — ship approved approval_queue rows to GBP via OneUp
// Push: main (via branch + PR)
// ─────────────────────────────────────
/**
 * executor — the last mile. Everything upstream of this agent works: the
 * proposer writes rows, Phillip approves them in the command centre, and then
 * NOTHING HAPPENS. Measured 2026-09-06: 16 rows sit at status='approved', the
 * oldest approved 2026-07-25, and social_posts has not had a row since
 * 2026-07-16. The queue is a place approvals go to be forgotten.
 *
 * This agent closes that loop for ONE action type and refuses to guess at the
 * others.
 *
 * SCOPE v1 — action_type = 'post_publish' with action_payload.proposed_type =
 * 'gbp_post'. Rows with action_type NULL (the ads/web proposals) are SKIPPED
 * and say so in the log. They are not failures and they are not shipped; there
 * is no Google Ads or web-edit execution path in this repo yet, and inventing
 * one against a live ad account is not a thing an agent gets to improvise.
 *
 * WHAT IT WILL NOT DO
 *   - Trust compliance_clean. It is a write-time claim; see lib/publish-canon.mjs.
 *   - Publish without an explicit mode=ship. Dry run is the default everywhere:
 *     no flag, a bad flag, a missing flag all mean dry run.
 *   - Publish more than EXECUTOR_CAP (3) posts in a run, or more than one per
 *     office. A queue that has been dammed since July would otherwise empty
 *     itself onto three Business Profiles in one morning, which reads as spam
 *     and is the fastest way to get a profile suspended.
 *   - Publish the same copy twice. Two independent guards: a deterministic
 *     social_posts id derived from the queue row (so a re-run collides instead
 *     of duplicating), and a 30-day location+title dedup against what actually
 *     shipped.
 *
 * Run:
 *   node agents/executor.mjs                      # dry run against the live queue
 *   node agents/executor.mjs --mode=ship          # publish (workflow_dispatch only)
 *   node agents/executor.mjs --fixture=rows.json  # dry run, no Supabase at all
 */
import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "node:fs";

import { supabase, logAgentRun, writeFinding } from "./lib/supabase.mjs";
import { gateOrSkip } from "./lib/agent-gate.mjs";
import { createMessage } from "./lib/llm-with-logging.mjs";
import { cleanEnv } from "./lib/env-url.mjs";
import { gateCopy } from "./lib/publish-canon.mjs";

const AGENT_NAME = "executor";
const API = "https://www.oneupapp.io/api";
const MODEL = process.env.EXECUTOR_MODEL || "claude-sonnet-4-6";

const CAP = Number(process.env.EXECUTOR_CAP ?? 3);
const DEDUP_DAYS = Number(process.env.EXECUTOR_DEDUP_DAYS ?? 30);
const LEAD_DAYS = Number(process.env.EXECUTOR_STALE_LEAD_DAYS ?? 2);

const argv = process.argv.slice(2);
const argOf = (name) => argv.find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=") ?? null;

// DRY RUN IS THE DEFAULT AND THE FALLBACK. Only the exact string "ship" — from
// the flag or from the workflow_dispatch input, which the workflow passes
// through as EXECUTOR_MODE — turns on publishing. Anything else, including a
// typo'd "shipp" or an empty input, stays dry.
const MODE = (argOf("mode") ?? cleanEnv("EXECUTOR_MODE") ?? "").toLowerCase();
const SHIP = MODE === "ship";
const FIXTURE = argOf("fixture");

// GBP listings, keyed the way action_payload.location is keyed. `phone` is the
// number of the LISTING a post publishes to, which is not always the number of
// the nominal city — see the Birmingham note. Mirrors the route table in
// agents/oneup-push.mjs; the account ids themselves are resolved at runtime
// from OneUp so a reconnect or a new listing needs no edit here.
const ROUTES = {
  huntsville: { match: "old madison pike", phone: "(256) 937-7676", listing: "Huntsville GBP" },
  lake_martin: { match: "tallapoosa", phone: "(256) 234-6162", listing: "Alex City GBP" },
  alabaster: { match: "butler rd", phone: "(205) 940-6360", listing: "Alabaster GBP" },
  // The 16th Ave S profile was GBP-verified 2026-09-05, but OneUp is not
  // connected to it (verify with listsocialaccounts before changing this).
  // Until it is, Birmingham-metro posts publish to the Alabaster listing and
  // must therefore carry Alabaster's number — 940-6360, which is also the
  // primary company line. Flagged as a fallback so the log says so out loud.
  birmingham: { match: "butler rd", phone: "(205) 940-6360", listing: "Alabaster GBP", fallback: true },
};

// ── OneUp ────────────────────────────────────────────────────────────────────

async function oneup(endpoint, body) {
  const key = cleanEnv("ONEUP_API");
  if (!key) throw new Error("ONEUP_API not set");
  const url = `${API}/${endpoint}?apiKey=${encodeURIComponent(key)}`;
  const res = body
    ? await fetch(url, { method: "POST", body: new URLSearchParams(body) })
    : await fetch(url);
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) throw new Error(`OneUp ${endpoint}: ${json.message || `HTTP ${res.status}`}`);
  return json.data;
}

async function resolveAccounts() {
  const accounts = await oneup("listsocialaccounts");
  const gbp = (accounts ?? []).filter((a) => a.social_network_type === "GBP");
  const out = {};
  for (const [loc, r] of Object.entries(ROUTES)) {
    const hit = gbp.find((a) => String(a.full_name || "").toLowerCase().includes(r.match));
    out[loc] = hit ? { ...r, id: hit.social_account_id, account: hit.full_name } : { ...r, id: null };
  }
  return out;
}

function fmtDateTime(d) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}`;
}

// ── Queue ────────────────────────────────────────────────────────────────────

function normalizeTitle(title) {
  // Strip the "Huntsville: " office prefix the proposer prepends, then reduce
  // to comparable words. Two posts that differ only in office prefix or
  // punctuation are the same post as far as a Business Profile is concerned.
  return String(title || "")
    .replace(/^[A-Za-z .'-]{3,24}:\s*/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// Deterministic social_posts id. social_posts.id is text with no default, so
// the executor supplies it — and deriving it from the queue row means a second
// run of the same row collides on the primary key instead of double-posting.
// This is guard #1 of the idempotency pair; see shippedRecently() for #2.
const postIdFor = (queueId) => `exec-${queueId}`;

// A fixture is either a bare array of queue rows or
// { rows, prohibitions, canonRows } — the second shape lets the gate run with
// the real rule tables on a machine that has no Supabase credentials, which is
// how the decision table in this PR's body was produced.
let _fixture = null;
function fixture() {
  if (!FIXTURE) return null;
  if (!_fixture) {
    const parsed = JSON.parse(readFileSync(FIXTURE, "utf8"));
    _fixture = Array.isArray(parsed) ? { rows: parsed } : parsed;
  }
  return _fixture;
}

async function loadQueue() {
  const f = fixture();
  if (f) return f.rows ?? [];
  const { data, error } = await supabase
    .from("approval_queue")
    .select("id,title,category,preview,action_type,action_ref,action_payload,compliance_clean,status,source,created_at")
    .eq("status", "approved")
    .order("created_at", { ascending: true });
  if (error) throw new Error(`approval_queue read: ${error.message}`);
  return data ?? [];
}

async function loadRuleSources() {
  const f = fixture();
  if (f?.prohibitions || f?.canonRows) return { prohibitions: f.prohibitions ?? [], canonRows: f.canonRows ?? [] };
  if (!supabase) return { prohibitions: [], canonRows: [] };
  const [p, c] = await Promise.all([
    supabase.from("compliance_prohibitions").select("id,phrase,category,reason,severity"),
    supabase.from("service_canon").select("service_key,label,standard_price,current_price,price_unit,requires_inspection,notes"),
  ]);
  if (p.error) throw new Error(`compliance_prohibitions read: ${p.error.message}`);
  if (c.error) throw new Error(`service_canon read: ${c.error.message}`);
  return { prohibitions: p.data ?? [], canonRows: c.data ?? [] };
}

/**
 * Guard #2: has this location already published this headline recently?
 * Scoped to rows that actually WENT OUT (posted_at set, or a shipped/queued
 * status) — a row that previously failed must be allowed to retry.
 */
async function shippedRecently(location, normTitle) {
  if (!supabase) return null;
  const since = new Date(Date.now() - DEDUP_DAYS * 86400000).toISOString();
  const { data, error } = await supabase
    .from("social_posts")
    .select("id,location,headline,status,posted_at,external_id")
    .eq("location", location)
    .gte("posted_at", since);
  if (error) {
    // A dedup read that fails must not silently open the gate.
    throw new Error(`social_posts dedup read: ${error.message}`);
  }
  return (data ?? []).find((r) => normalizeTitle(r.headline) === normTitle) ?? null;
}

async function alreadyPublished(queueId) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("social_posts")
    .select("id,external_id,status,permalink,posted_at")
    .eq("id", postIdFor(queueId))
    .maybeSingle();
  if (error && error.code !== "PGRST116") throw new Error(`social_posts idempotency read: ${error.message}`);
  return data ?? null;
}

// ── Decisions ────────────────────────────────────────────────────────────────

/**
 * Classify one queue row. Pure — no I/O — so the dry run and the ship run make
 * exactly the same decision from exactly the same inputs.
 *
 * @returns {{decision:'ship'|'fix'|'skip', reason:string|null, gate:object|null}}
 */
export function evaluateRow(row, { prohibitions, canonRows, now, leadDays = LEAD_DAYS }) {
  const payload = row.action_payload ?? {};
  const location = payload.location ?? null;

  if (row.action_type == null) {
    return { decision: "skip", reason: `action_type is null (proposed_type='${payload.proposed_type ?? "?"}', category='${row.category ?? "?"}') — ads/web execution is out of scope for executor v1`, gate: null };
  }
  if (row.action_type !== "post_publish") {
    return { decision: "skip", reason: `action_type='${row.action_type}' — executor v1 handles post_publish only`, gate: null };
  }
  if (payload.proposed_type !== "gbp_post") {
    return { decision: "skip", reason: `proposed_type='${payload.proposed_type ?? "null"}' — executor v1 handles gbp_post only`, gate: null };
  }
  if (!location || !ROUTES[location]) {
    return { decision: "skip", reason: `no GBP route for location='${location ?? "null"}'`, gate: null };
  }

  const copy = String(row.preview ?? "").trim();
  if (!copy) return { decision: "skip", reason: "empty preview — nothing to publish", gate: null };

  // THE RE-CHECK. row.compliance_clean is deliberately not consulted.
  //
  // TITLE AND BODY ARE GATED TOGETHER. Only the body is published to GBP, but
  // the title is stored as social_posts.headline and is what the command centre
  // and every downstream report display — and it carries claims the body does
  // not. Row 74ae135d is exactly this: the body never says "Labor Day", the
  // title does ("Knock Down Mosquitoes Before Labor Day Weekend"), so gating
  // the body alone let a post about a holiday that has passed read as
  // publishable. Separate lines because scanText's carve-outs are line-scoped.
  const gate = gateCopy(`${row.title ?? ""}\n\n${copy}`, { prohibitions, canonRows, now, leadDays });

  // NAP: a post publishes to ONE listing. If the copy advertises a different
  // office's number, that listing now carries a conflicting phone — the exact
  // inconsistency the citation cleanup exists to remove.
  const route = ROUTES[location];
  const phones = [...new Set(copy.match(/\(\d{3}\)\s?\d{3}-\d{4}/g) ?? [])];
  const wrong = phones.filter((p) => p !== route.phone);
  if (wrong.length) {
    gate.blocking.push({ rule: "nap:listing-mismatch", match: wrong.join(", "), reason: `publishes to ${route.listing} (${route.phone})${route.fallback ? " — a FALLBACK route, this location has no OneUp-connected GBP" : ""} but the copy says ${wrong.join(", ")}` });
    gate.clean = false;
  }

  if (!gate.clean) {
    const note = gate.blocking.map((b) => `${b.rule}: ${b.reason} ("${String(b.match).slice(0, 60)}")`).join(" | ");
    return { decision: "fix", reason: note, gate };
  }
  return { decision: "ship", reason: null, gate };
}

// ── LLM run digest ───────────────────────────────────────────────────────────
//
// HARD RULE 6: every LLM call goes through createMessage so agent_costs gets a
// row. This is the executor's only LLM call and it is strictly optional — it
// summarises decisions that were already made deterministically, so a missing
// key or an API failure costs a nicer finding, never a shipped or blocked post.
async function digest(decisions, mode) {
  if (!cleanEnv("ANTHROPIC_API_KEY")) return null;
  const lines = decisions.map((d) => `- [${d.decision}] ${d.row.title} (${d.location ?? "no location"}) ${d.reason ? `— ${d.reason.slice(0, 220)}` : ""}`).join("\n");
  const prompt = `You are writing one short status note for EnviroCare's publishing log. Mode: ${mode}.
Below is the executor's decision on every approved item in the queue. Write 3-5 sentences for a business owner: how many would ship, how many are blocked, and what the DOMINANT reasons for blocking are (group them, do not list every row). Name the fix in plain words.
Do not invent prices, dates, or counts that are not below. Do not restate the whole list.

${lines}`;
  try {
    const res = await createMessage(
      new Anthropic({ apiKey: cleanEnv("ANTHROPIC_API_KEY") }),
      { model: MODEL, max_tokens: 400, messages: [{ role: "user", content: prompt }] },
      { agentName: AGENT_NAME, role: "digest" },
    );
    return res?.content?.map((c) => c.text ?? "").join("").trim() || null;
  } catch (e) {
    console.warn(`[${AGENT_NAME}] digest skipped: ${e.message}`);
    return null;
  }
}

// ── Run ──────────────────────────────────────────────────────────────────────

export async function run() {
  const gate = await gateOrSkip(AGENT_NAME);
  if (!gate.allowed) return gate.result;

  const now = new Date();
  const rows = await loadQueue();
  const { prohibitions, canonRows } = await loadRuleSources();

  console.log(`[${AGENT_NAME}] mode=${SHIP ? "SHIP" : "DRY RUN"} · ${rows.length} approved row(s) · ${prohibitions.length} prohibitions · ${canonRows.length} canon services`);
  if (!SHIP) console.log(`[${AGENT_NAME}] DRY RUN — nothing will be published. Real publish needs workflow_dispatch with mode=ship.`);

  const decisions = [];
  for (const row of rows) {
    const verdict = evaluateRow(row, { prohibitions, canonRows, now });
    decisions.push({ row, location: row.action_payload?.location ?? null, ...verdict });
  }

  // Dedup + per-run caps, applied only to what survived the gate. Order is the
  // queue's own (oldest approved first), so the backlog drains fairly.
  const shipped = [];
  const seenOffices = new Set();
  for (const d of decisions) {
    if (d.decision !== "ship") continue;

    const normTitle = normalizeTitle(d.row.title);
    try {
      const dupe = await shippedRecently(d.location, normTitle);
      if (dupe) {
        d.decision = "skip";
        d.reason = `dedup: "${d.row.title}" already shipped to ${d.location} within ${DEDUP_DAYS} days (social_posts ${dupe.id}, ${String(dupe.posted_at).slice(0, 10)})`;
        continue;
      }
    } catch (e) {
      d.decision = "skip";
      d.reason = `dedup check failed, holding row rather than risking a duplicate: ${e.message}`;
      continue;
    }

    if (seenOffices.has(d.location)) {
      d.decision = "hold";
      d.reason = `cap: one post per office per run — ${d.location} already has one this run`;
      continue;
    }
    if (shipped.length >= CAP) {
      d.decision = "hold";
      d.reason = `cap: ${CAP} posts per run reached`;
      continue;
    }
    seenOffices.add(d.location);
    shipped.push(d);
  }

  // ── Publish ────────────────────────────────────────────────────────────────
  let accounts = null;
  let categoryId = null;
  if (SHIP && shipped.length) {
    const categories = await oneup("listcategory");
    categoryId = categories?.[0]?.id;
    if (!categoryId) throw new Error("OneUp: no categories found");
    accounts = await resolveAccounts();
  }

  for (const [i, d] of shipped.entries()) {
    const route = accounts?.[d.location] ?? ROUTES[d.location];
    if (!SHIP) {
      console.log(`[${AGENT_NAME}] WOULD SHIP ${d.row.id} → ${d.location} (${route.listing})${route.fallback ? " [fallback route]" : ""}: ${d.row.title}`);
      if (d.gate?.warnings?.length) {
        for (const w of d.gate.warnings) console.log(`[${AGENT_NAME}]   warn — ${w.rule}: ${w.reason} ("${String(w.match).slice(0, 60)}")`);
      }
      continue;
    }

    // Idempotency, re-checked immediately before the write rather than once at
    // the top: a concurrent run or a retried job must not double-post.
    const already = await alreadyPublished(d.row.id);
    if (already) {
      d.decision = "skip";
      d.reason = `already published (social_posts ${already.id}, external_id ${already.external_id ?? "none"})`;
      console.log(`[${AGENT_NAME}] SKIP ${d.row.id} — ${d.reason}`);
      continue;
    }
    const { data: fresh, error: freshErr } = await supabase
      .from("approval_queue").select("status").eq("id", d.row.id).maybeSingle();
    if (freshErr) throw new Error(`approval_queue re-read: ${freshErr.message}`);
    if (fresh?.status !== "approved") {
      d.decision = "skip";
      d.reason = `queue status changed to '${fresh?.status ?? "missing"}' since this run started`;
      console.log(`[${AGENT_NAME}] SKIP ${d.row.id} — ${d.reason}`);
      continue;
    }
    if (!route?.id) {
      d.decision = "fix";
      d.reason = `no OneUp GBP account matching "${route?.match}" for ${d.location}`;
      await markQueue(d.row.id, "fix", d.reason);
      continue;
    }

    // OneUp schedules rather than posts instantly. Stagger by 5 minutes so the
    // run's posts do not all hit Google in the same second.
    const when = new Date(now.getTime() + (10 + i * 5) * 60000);
    const payload = {
      category_id: String(categoryId),
      social_network_id: JSON.stringify([route.id]),
      scheduled_date_time: fmtDateTime(when),
      content: String(d.row.preview).trim(),
      google_post_type: "update",
    };

    try {
      const res = await oneup("scheduletextpost", payload);
      // scheduletextpost returns the scheduled post, not a published one, so a
      // GBP permalink does not exist yet. Record whatever id OneUp gives back
      // and leave permalink null until the post actually publishes.
      const externalId = String(res?.post_id ?? res?.id ?? res?.[0]?.post_id ?? "") || null;
      const permalink = res?.permalink ?? res?.post_url ?? null;

      const { error: insErr } = await supabase.from("social_posts").insert({
        id: postIdFor(d.row.id),
        location: d.location,
        platform: "google",
        post_type: "update",
        headline: d.row.title,
        body: String(d.row.preview).trim(),
        scheduled_for: when.toISOString(),
        status: "shipped",
        external_id: externalId,
        permalink,
        posted_at: new Date().toISOString(),
      });
      if (insErr) throw new Error(`social_posts insert: ${insErr.message}`);

      await markQueue(d.row.id, "shipped", `OneUp ${externalId ?? "scheduled"} → ${route.listing} at ${payload.scheduled_date_time} UTC`);
      d.external_id = externalId;
      console.log(`[${AGENT_NAME}] SHIPPED ${d.row.id} → ${route.listing} (OneUp ${externalId ?? "?"}) at ${payload.scheduled_date_time} UTC`);
    } catch (e) {
      d.decision = "failed";
      d.reason = e.message;
      await markQueue(d.row.id, "failed", e.message);
      console.error(`[${AGENT_NAME}] FAILED ${d.row.id}: ${e.message}`);
    }
  }

  // ── Write back the blocked rows ────────────────────────────────────────────
  if (SHIP) {
    for (const d of decisions.filter((x) => x.decision === "fix")) {
      await markQueue(d.row.id, "fix", d.reason);
    }
  }

  // ── Report ─────────────────────────────────────────────────────────────────
  const counts = decisions.reduce((a, d) => ((a[d.decision] = (a[d.decision] ?? 0) + 1), a), {});
  const summary = {
    mode: SHIP ? "ship" : "dry-run",
    approved: rows.length,
    shippable: shipped.length,
    rejected: decisions.filter((d) => d.decision === "fix").length,
    skipped: decisions.filter((d) => d.decision === "skip").length,
    held_by_cap: decisions.filter((d) => d.decision === "hold").length,
    failed: decisions.filter((d) => d.decision === "failed").length,
    counts,
    decisions: decisions.map((d) => ({ id: d.row.id, title: d.row.title, location: d.location, decision: d.decision, reason: d.reason ?? null })),
  };

  console.log(`\n[${AGENT_NAME}] ${rows.length} approved → ${summary.shippable} shippable, ${summary.rejected} rejected, ${summary.skipped} skipped, ${summary.held_by_cap} held by cap`);
  for (const d of decisions) {
    if (d.decision === "ship") continue;
    console.log(`[${AGENT_NAME}]   ${d.decision.toUpperCase().padEnd(6)} ${d.row.title}\n[${AGENT_NAME}]          ${d.reason}`);
  }

  const note = await digest(decisions, summary.mode);
  if (note) console.log(`\n[${AGENT_NAME}] digest: ${note}`);

  if (supabase) {
    // One finding per blocked row so the command centre and morning brief show
    // WHICH row needs a rewrite, not just a count.
    for (const d of decisions.filter((x) => x.decision === "fix")) {
      await writeFinding(AGENT_NAME, "publish-blocked", "warning", null, `Approved but not publishable: ${d.row.title}`, {
        queue_id: d.row.id, location: d.location, reason: d.reason, mode: summary.mode,
      });
    }
    await logAgentRun(AGENT_NAME, summary.failed ? "escalated" : "ok", { ...summary, digest: note });
  }
  return summary;
}

async function markQueue(id, status, note) {
  if (!supabase) return;
  const { error } = await supabase
    .from("approval_queue")
    .update({ status, decision_note: String(note ?? "").slice(0, 4000), decided_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) console.error(`[${AGENT_NAME}] queue update ${id} → ${status} failed: ${error.message}`);
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("executor.mjs")) {
  run().catch((e) => { console.error(`[${AGENT_NAME}] FATAL`, e); process.exit(1); });
}
