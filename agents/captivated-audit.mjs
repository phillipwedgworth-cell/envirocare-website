// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/captivated-audit.mjs
// Commit: feat(agents): read-only Captivated audit — is the review engine firing?
// Push: main
// ─────────────────────────────────────
//
// WHAT THIS ANSWERS
// -----------------
// agents/knowledge/goals.md names reviews as priority #1 this quarter:
// Huntsville has 34 reviews against a ~150 map-pack floor, Alex City has 12, and
// "the review engine (Fieldster + Captivated) is wired but MAY NOT BE FIRING —
// contact Harris Ramm to confirm."
//
// This agent answers that from the API instead of by phone. It reports, for the
// last N days: how many outbound messages Captivated actually sent, when the
// most recent one was, how many conversations are active, what templates exist,
// and whether any template carries language data/compliance.ts bans.
//
// STRICTLY READ-ONLY. It imports no send function. There is no flag that makes
// it send. If you want to send, that is a different file, and it is double-gated
// (see agents/lib/captivated.mjs).
//
// WHY READ-ONLY FIRST
// -------------------
// Two reasons, both learned here. scripts/sync_contacts.py sets the convention:
// anything touching customer records extracts and reports before it ever writes.
// And the 2026-09-09 sweep is a 40k-word argument for verifying a system's real
// behaviour before trusting its status: four guards were green while the site
// was dirty, and agent_registry marked two agents 'paused' while they ran 16
// times a day. "Wired" is a claim. "37 messages sent, most recent Tuesday" is a
// measurement.
//
// Run:  node agents/captivated-audit.mjs [--days 30] [--json]

import { gateOrSkip } from "./lib/agent-gate.mjs";
import { logRunREST, logFindingREST } from "./lib/run-log.mjs";
import { compileRules, scanText } from "../scripts/lib/compliance-rules.mjs";
import {
  isConfigured,
  apiKey,
  listTemplates,
  listConversations,
  getConversationMessages,
  listTags,
  CaptivatedError,
} from "./lib/captivated.mjs";

const AGENT_NAME = "captivated-audit";

const args = process.argv.slice(2);
const DAYS = Number(
  (args.find((a) => a.startsWith("--days=")) || "").split("=")[1] ||
    (args.includes("--days") ? args[args.indexOf("--days") + 1] : "") ||
    30,
);
const AS_JSON = args.includes("--json");

const TEXT_FIELDS = ["body", "content", "message", "text", "template", "body_text"];
const NAME_FIELDS = ["name", "title", "label"];
const TIME_FIELDS = ["created_at", "createdAt", "sent_at", "sentAt", "inserted_at", "timestamp", "date"];
const DIRECTION_FIELDS = ["direction", "type", "kind"];

const pick = (o, fields) => {
  for (const f of fields) {
    const v = o?.[f];
    if (typeof v === "string" && v.trim()) return v;
  }
  return null;
};

function asArray(payload) {
  if (Array.isArray(payload)) return payload;
  for (const k of ["data", "templates", "conversations", "messages", "results", "items", "records", "tags"]) {
    if (Array.isArray(payload?.[k])) return payload[k];
  }
  return [];
}

const parseTime = (o) => {
  const raw = pick(o, TIME_FIELDS) ?? o?.created_at ?? null;
  if (!raw) return null;
  const t = new Date(raw);
  return Number.isNaN(t.getTime()) ? null : t;
};

const isOutbound = (m) => {
  const d = (pick(m, DIRECTION_FIELDS) || "").toLowerCase();
  if (d) return d.includes("out") || d === "sent";
  // Fall back to an explicit boolean if the API uses one; unknown counts as
  // neither, and the report says how many were unclassified rather than
  // guessing in the flattering direction.
  if (typeof m?.outbound === "boolean") return m.outbound;
  return null;
};

async function run() {
  const gate = await gateOrSkip(AGENT_NAME);
  if (!gate.allowed) return gate.result;

  const started = Date.now();
  const since = new Date(Date.now() - DAYS * 86400000);
  const out = {
    agent: AGENT_NAME,
    window_days: DAYS,
    since: since.toISOString(),
    configured: false,
    key_source: null,
    templates: { total: 0, scanned: 0, unreadable: 0, blocking: [], warnings: [] },
    conversations: { total: 0, sampled: 0, in_window: 0 },
    messages: { outbound: 0, inbound: 0, unclassified: 0, most_recent_outbound: null },
    verdict: null,
    errors: [],
  };

  if (!isConfigured()) {
    out.verdict = "UNKNOWN — no API key in the environment";
    console.log(`[${AGENT_NAME}] no API key. Set captivated_api (or CAPTIVATED_API_KEY).`);
    await logRunREST(AGENT_NAME, "error", out).catch(() => {});
    return out;
  }
  out.configured = true;
  out.key_source = apiKey().source;

  // ── Templates + compliance ────────────────────────────────────────────────
  try {
    const templates = asArray(await listTemplates());
    out.templates.total = templates.length;
    const rules = compileRules();
    for (const t of templates) {
      const name = pick(t, NAME_FIELDS) || String(t?.id ?? "(unnamed)");
      const body = pick(t, TEXT_FIELDS);
      if (!body) {
        out.templates.unreadable++;
        continue;
      }
      out.templates.scanned++;
      const scan = scanText(body, rules);
      for (const h of scan.blocking || []) out.templates.blocking.push({ template: name, ...h });
      for (const h of scan.warnings || []) out.templates.warnings.push({ template: name, ...h });
    }
  } catch (e) {
    out.errors.push(`templates: ${e.message}`);
  }

  // ── Tags (cheap, tells us whether the account is organised at all) ────────
  try {
    out.tags = asArray(await listTags()).length;
  } catch (e) {
    out.errors.push(`tags: ${e.message}`);
  }

  // ── Conversations + message volume — the actual question ─────────────────
  let conversations = [];
  try {
    conversations = asArray(await listConversations());
    out.conversations.total = conversations.length;
  } catch (e) {
    out.errors.push(`conversations: ${e.message}`);
  }

  // Sample rather than walk everything: this is a heartbeat check, and the docs
  // give no bulk message export. 40 is enough to distinguish "firing" from
  // "silent" without hammering the API.
  const SAMPLE = 40;
  let mostRecent = null;
  for (const c of conversations.slice(0, SAMPLE)) {
    const id = c?.id ?? c?.conversation_id;
    if (!id) continue;
    out.conversations.sampled++;
    try {
      const msgs = asArray(await getConversationMessages(id));
      for (const m of msgs) {
        const t = parseTime(m);
        if (t && t < since) continue;
        const dir = isOutbound(m);
        if (dir === true) {
          out.messages.outbound++;
          if (t && (!mostRecent || t > mostRecent)) mostRecent = t;
        } else if (dir === false) out.messages.inbound++;
        else out.messages.unclassified++;
      }
      if (msgs.some((m) => { const t = parseTime(m); return t && t >= since; })) out.conversations.in_window++;
    } catch (e) {
      out.errors.push(`conversation ${id}: ${e.message}`);
    }
  }
  out.messages.most_recent_outbound = mostRecent ? mostRecent.toISOString() : null;

  // ── Verdict ───────────────────────────────────────────────────────────────
  const sent = out.messages.outbound;
  if (out.errors.length && sent === 0 && out.conversations.sampled === 0) {
    out.verdict = "UNKNOWN — could not read conversations; see errors";
  } else if (sent === 0) {
    out.verdict = `NOT FIRING — zero outbound messages in the last ${DAYS} days across ${out.conversations.sampled} sampled conversations`;
  } else {
    out.verdict = `FIRING — ${sent} outbound message(s) in the last ${DAYS} days, most recent ${out.messages.most_recent_outbound}`;
  }

  // ── Report ────────────────────────────────────────────────────────────────
  if (AS_JSON) {
    console.log(JSON.stringify(out, null, 2));
  } else {
    console.log(`\n[${AGENT_NAME}] window: last ${DAYS} days (since ${since.toISOString().slice(0, 10)})`);
    console.log(`  key source        : ${out.key_source}`);
    console.log(`  templates         : ${out.templates.total} total, ${out.templates.scanned} scanned, ${out.templates.unreadable} unreadable`);
    console.log(`  tags              : ${out.tags ?? "?"}`);
    console.log(`  conversations     : ${out.conversations.total} total, ${out.conversations.sampled} sampled, ${out.conversations.in_window} active in window`);
    console.log(`  messages (sampled): ${out.messages.outbound} outbound, ${out.messages.inbound} inbound, ${out.messages.unclassified} unclassified`);
    console.log(`  most recent out   : ${out.messages.most_recent_outbound ?? "none"}`);
    if (out.templates.blocking.length) {
      console.log(`\n  🔴 ${out.templates.blocking.length} template(s) carry BANNED language:`);
      for (const b of out.templates.blocking) console.log(`     ${b.template}: "${b.match}" — ${b.reason}`);
    }
    if (out.templates.warnings.length) {
      console.log(`\n  ${out.templates.warnings.length} template warning(s):`);
      for (const w of out.templates.warnings) console.log(`     ${w.template}: "${w.match}" — ${w.reason}`);
    }
    if (out.errors.length) {
      console.log(`\n  errors (${out.errors.length}):`);
      for (const e of out.errors.slice(0, 10)) console.log(`     ${e}`);
    }
    console.log(`\n  VERDICT: ${out.verdict}\n`);
  }

  // ── Persist ───────────────────────────────────────────────────────────────
  const runDate = new Date().toISOString().slice(0, 10);
  if (sent === 0 && out.conversations.sampled > 0) {
    await logFindingREST({
      agent_name: AGENT_NAME,
      category: "reviews",
      severity: "critical",
      finding: `Captivated sent zero outbound messages in ${DAYS} days across ${out.conversations.sampled} sampled conversations. goals.md priority #1 assumes this engine is firing.`,
      run_date: runDate,
    }).catch(() => {});
  }
  for (const b of out.templates.blocking) {
    await logFindingREST({
      agent_name: AGENT_NAME,
      category: "compliance",
      severity: "critical",
      finding: `Captivated template "${b.template}" carries banned language: "${b.match}" — ${b.reason}`,
      run_date: runDate,
    }).catch(() => {});
  }

  await logRunREST(AGENT_NAME, out.errors.length ? "partial" : "ok", {
    ...out,
    duration_sec: Math.round((Date.now() - started) / 1000),
  }).catch(() => {});

  return out;
}

run().catch((e) => {
  const msg = e instanceof CaptivatedError ? `${e.message}` : e?.stack || String(e);
  console.error(`[${AGENT_NAME}] FAILED: ${msg}`);
  // exitCode, not exit(): process.exit() here would kill the process before the
  // logRunREST POST above lands, so the failure would be reported on the console
  // and NOT recorded in agent_runs — the one place a watchdog would look for it.
  // It also trips a libuv assertion on Windows when a socket is mid-close, which
  // turns a clean exit 1 into a 127 (see scripts/test-captivated-templates.mjs).
  process.exitCode = 1;
});
