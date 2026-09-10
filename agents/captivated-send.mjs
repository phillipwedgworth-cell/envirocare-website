// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/captivated-send.mjs
// Commit: feat(agents): Captivated review-request sender — dry-run default, triple-gated
// Push: main
// ─────────────────────────────────────
//
// WHAT THIS IS
// ------------
// The review-request sender for goals.md priority #1: Huntsville at 34 reviews
// against a ~150 map-pack floor, Alex City at 12. Consent to text customers was
// confirmed by Phillip on 2026-09-09.
//
// DRY RUN IS THE DEFAULT. Running this with no flags sends nothing. It builds
// the exact audience, renders the exact message, runs the compliance scan, and
// writes a manifest of what WOULD go out. Read the manifest before you pass
// --send.
//
// FOUR GATES, ALL OF WHICH MUST PASS BEFORE A SINGLE TEXT LEAVES
// --------------------------------------------------------------
//   1. --send on the command line                    (deliberate act)
//   2. CAPTIVATED_ALLOW_SENDS=1 in the environment   (deliberate act, elsewhere)
//   3. every rendered body passes data/compliance.ts (no banned language)
//   4. every rendered body contains opt-out text     (STOP instructions)
//
// Plus per-contact screening: opted-out contacts are dropped, and nobody is
// texted twice inside MIN_DAYS_BETWEEN_SENDS. Plus a hard quiet-hours block
// with NO override flag — a 2am send is never a legitimate emergency, and an
// override exists to be used at 2am.
//
// Gates 1 and 2 are the sync_contacts.py pattern. Gate 3 exists because the
// 2026-09-09 sweep found banned language reaching Google through two surfaces
// no guard read. Gate 4 exists because consent is revocable and a customer
// cannot revoke what the message never told them how to revoke.
//
// Run:
//   node agents/captivated-send.mjs                        # dry run, 25 contacts
//   node agents/captivated-send.mjs --limit 5              # dry run, 5
//   node agents/captivated-send.mjs --limit 5 --send       # sends, if env allows

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { gateOrSkip } from "./lib/agent-gate.mjs";
import { logRunREST, logFindingREST } from "./lib/run-log.mjs";
import { compileRules, scanText } from "../scripts/lib/compliance-rules.mjs";
import {
  isConfigured,
  sendsEnabled,
  listContacts,
  listConversations,
  getConversationMessages,
  sendBulk,
  waitForJob,
  CaptivatedError,
} from "./lib/captivated.mjs";
import {
  DEFAULT_TZ,
  sendWindowReason,
  collectOptOuts,
  loadSuppressed,
  mergeSuppressed,
  loadSuppressedPhones,
  loadSuppressedEmails,
  loadSendHistory,
  recordSends,
  screenContact,
  MIN_DAYS_BETWEEN_SENDS,
} from "./lib/captivated-safety.mjs";

const AGENT_NAME = "captivated-send";
const CAMPAIGN = "review-request";

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(`--${name}`);
const val = (name, dflt) => {
  const eq = argv.find((a) => a.startsWith(`--${name}=`));
  if (eq) return eq.split("=").slice(1).join("=");
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : dflt;
};

const WANT_SEND = flag("send");
const LIMIT = Math.max(1, Number(val("limit", 25)) || 25);

// Opt-out instructions. Gate 4 checks the rendered body against this.
const OPT_OUT_SENTENCE = "Reply STOP to opt out.";
const OPT_OUT_RE = /\bstop\b[^.]*\bopt\s*out\b|\breply\s+stop\b/i;

// Message body. Deliberately carries no price, no coverage figure and no
// superlative — a review request needs none of them, and every one of those is
// a compliance surface. {{first_name}} falls back to a neutral greeting.
const TEMPLATE =
  "Hi {{first_name}}, this is EnviroCare. Thanks for letting our {{office}} team take care of your home. " +
  "If you have a minute, a short Google review genuinely helps the local crew: {{review_link}} " +
  OPT_OUT_SENTENCE;

// Per-office review links. Fill these in from the live GBP listings before the
// first real send; the dry run will show them verbatim so a placeholder cannot
// slip through unnoticed.
const REVIEW_LINKS = {
  huntsville: process.env.REVIEW_LINK_HUNTSVILLE || "",
  "alex city": process.env.REVIEW_LINK_ALEXCITY || "",
  alabaster: process.env.REVIEW_LINK_ALABASTER || "",
  birmingham: process.env.REVIEW_LINK_BIRMINGHAM || "",
};

const asArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  for (const k of ["data", "contacts", "conversations", "messages", "results", "items", "records"]) {
    if (Array.isArray(payload?.[k])) return payload[k];
  }
  return [];
};

const pick = (o, fields) => {
  for (const f of fields) {
    const v = o?.[f];
    if (typeof v === "string" && v.trim()) return v;
  }
  return null;
};

const contactId = (c) => c?.id ?? c?.contact_id ?? c?.external_id ?? null;
const firstName = (c) =>
  pick(c, ["first_name", "firstName", "given_name"]) ||
  (pick(c, ["name", "full_name"]) || "").split(" ")[0] ||
  "there";
const officeOf = (c) => (pick(c, ["office", "location", "market", "branch"]) || "").toLowerCase();

const isOutbound = (m) => {
  const d = (pick(m, ["direction", "type", "kind"]) || "").toLowerCase();
  if (d) return d.includes("out") || d === "sent";
  if (typeof m?.outbound === "boolean") return m.outbound;
  return null;
};

function render(contact) {
  const office = officeOf(contact);
  const link = REVIEW_LINKS[office] ?? "";
  return TEMPLATE.replace("{{first_name}}", firstName(contact))
    .replace("{{office}}", office ? office.replace(/\b\w/g, (m) => m.toUpperCase()) : "local")
    .replace("{{review_link}}", link);
}

async function run() {
  const gate = await gateOrSkip(AGENT_NAME);
  if (!gate.allowed) return gate.result;

  const started = Date.now();
  const out = {
    agent: AGENT_NAME,
    campaign: CAMPAIGN,
    mode: WANT_SEND ? "SEND" : "DRY RUN",
    limit: LIMIT,
    audience: { contacts_read: 0, eligible: 0, excluded: {} },
    compliance: { scanned: 0, blocked: [] },
    opt_outs: { discovered: 0, suppression_total: 0 },
    sent: { attempted: 0, job_id: null, job_status: null },
    refusals: [],
    errors: [],
  };

  const exclude = (reason) => {
    out.audience.excluded[reason] = (out.audience.excluded[reason] || 0) + 1;
  };

  if (!isConfigured()) {
    out.refusals.push("no API key — set captivated_api (or CAPTIVATED_API_KEY)");
    console.error(`[${AGENT_NAME}] ${out.refusals[0]}`);
    await logRunREST(AGENT_NAME, "error", out).catch(() => {});
    return out;
  }

  // ── Gate: quiet hours. No override exists. ────────────────────────────────
  const windowReason = sendWindowReason(DEFAULT_TZ);
  if (WANT_SEND && windowReason) {
    out.refusals.push(`outside send window (${windowReason})`);
    console.error(`[${AGENT_NAME}] REFUSED — ${out.refusals[0]}`);
    console.error("  There is no override flag. Re-run inside the window.");
    await logRunREST(AGENT_NAME, "skipped", out).catch(() => {});
    return out;
  }

  // ── Refresh the opt-out list before building any audience ────────────────
  try {
    const convos = asArray(await listConversations()).slice(0, 60);
    const found = new Set();
    for (const c of convos) {
      const id = c?.id ?? c?.conversation_id;
      if (!id) continue;
      try {
        const msgs = asArray(await getConversationMessages(id));
        const ids = collectOptOuts(msgs, isOutbound, (m) => m?.contact_id ?? c?.contact_id ?? c?.contact?.id ?? null);
        for (const x of ids) found.add(x);
      } catch (e) {
        out.errors.push(`conversation ${id}: ${e.message}`);
      }
    }
    out.opt_outs.discovered = found.size;
    const merged = await mergeSuppressed(found);
    out.opt_outs.suppression_total = merged.total;
  } catch (e) {
    // A failure here must NOT fall through to sending with a stale list.
    out.refusals.push(`could not refresh opt-out list: ${e.message}`);
    console.error(`[${AGENT_NAME}] REFUSED — ${out.refusals[0]}`);
    console.error("  Sending without a current opt-out list is the one failure worth stopping for.");
    await logRunREST(AGENT_NAME, "error", out).catch(() => {});
    return out;
  }

  const suppressed = await loadSuppressed();
  const history = await loadSendHistory(CAMPAIGN);

  // Phone-keyed do-not-contact, populated by agents/captivated-suppress-sync.mjs
  // from Fieldster notes ("COLLECTIONS DO NOT CALL"). The STOP list above only
  // covers people who opted out BY TEXT; this covers everyone recorded elsewhere.
  //
  // An EMPTY list is treated as a refusal, not as "nobody is suppressed". The
  // list is empty both when genuinely nobody is flagged and when the sync has
  // never run — and those are indistinguishable from here. Guessing the
  // flattering one is how you text 26 people who were sent to collections.
  const suppressedPhones = await loadSuppressedPhones();
  const suppressedEmails = await loadSuppressedEmails();
  out.opt_outs.suppressed_phones = suppressedPhones.size;
  out.opt_outs.suppressed_emails = suppressedEmails.size;
  if (suppressedPhones.size === 0) {
    out.refusals.push(
      "phone suppression list is empty — run `npm run captivated:suppress` first",
    );
    console.error(`[${AGENT_NAME}] REFUSED — ${out.refusals[out.refusals.length - 1]}`);
    console.error("  An empty list cannot be told apart from a sync that never ran.");
    await logRunREST(AGENT_NAME, "skipped", out).catch(() => {});
    return out;
  }

  // ── Build the audience ────────────────────────────────────────────────────
  let contacts = [];
  try {
    contacts = asArray(await listContacts());
    out.audience.contacts_read = contacts.length;
  } catch (e) {
    out.errors.push(`contacts: ${e.message}`);
    out.refusals.push("could not read contacts");
    await logRunREST(AGENT_NAME, "error", out).catch(() => {});
    return out;
  }

  const rules = compileRules();
  const queue = [];

  for (const c of contacts) {
    if (queue.length >= LIMIT) break;
    const id = contactId(c);
    if (!id) { exclude("no contact id"); continue; }

    const screen = screenContact(id, {
      suppressed,
      history,
      minDays: MIN_DAYS_BETWEEN_SENDS,
      suppressedPhones,
      suppressedEmails,
      contact: c,
    });
    if (!screen.ok) { exclude(screen.reason); continue; }

    const body = render(c);

    // Gate 4 — opt-out instructions present.
    if (!OPT_OUT_RE.test(body)) { exclude("no opt-out text in body"); continue; }

    // Gate 3 — compliance.
    out.compliance.scanned++;
    const scan = scanText(body, rules);
    if (!scan.clean && scan.blocking?.length) {
      out.compliance.blocked.push({ contact: String(id), hits: scan.blocking });
      exclude("compliance block");
      continue;
    }

    // A review request with an empty link is a wasted message.
    if (body.includes("  ") || /:\s*$/.test(body.trim()) || !/https?:\/\//.test(body)) {
      exclude("no review link configured for office");
      continue;
    }

    queue.push({ contact_id: String(id), body });
  }

  out.audience.eligible = queue.length;

  // ── Manifest — written in BOTH modes, always ─────────────────────────────
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const dir = path.join("agents", "reports", "captivated");
  const manifestPath = path.join(dir, `${CAMPAIGN}-${stamp}.json`);
  try {
    await mkdir(dir, { recursive: true });
    await writeFile(manifestPath, JSON.stringify({ ...out, queue }, null, 2));
  } catch (e) {
    out.errors.push(`manifest: ${e.message}`);
  }

  // ── Report ────────────────────────────────────────────────────────────────
  console.log(`\n[${AGENT_NAME}] ${out.mode} — campaign "${CAMPAIGN}"`);
  console.log(`  contacts read     : ${out.audience.contacts_read}`);
  console.log(`  opt-outs found    : ${out.opt_outs.discovered} (suppression list now ${out.opt_outs.suppression_total})`);
  console.log(`  eligible          : ${out.audience.eligible} (cap ${LIMIT})`);
  for (const [reason, n] of Object.entries(out.audience.excluded)) console.log(`    excluded ${n}: ${reason}`);
  if (out.compliance.blocked.length) {
    console.log(`\n  🔴 ${out.compliance.blocked.length} message(s) BLOCKED by data/compliance.ts:`);
    for (const b of out.compliance.blocked) {
      for (const h of b.hits) console.log(`     contact ${b.contact}: "${h.match}" — ${h.reason}`);
    }
  }
  if (queue.length) {
    console.log(`\n  sample of what would be sent:`);
    console.log(`     ${queue[0].body}`);
  }
  console.log(`\n  manifest: ${manifestPath}`);

  // ── Send, or explain why not ──────────────────────────────────────────────
  if (!WANT_SEND) {
    console.log(`\n  DRY RUN — nothing was sent. Re-run with --send (and CAPTIVATED_ALLOW_SENDS=1) to send.\n`);
    await logRunREST(AGENT_NAME, "ok", out).catch(() => {});
    return out;
  }

  if (!sendsEnabled()) {
    out.refusals.push("CAPTIVATED_ALLOW_SENDS is not \"1\"");
    console.error(`\n  REFUSED — ${out.refusals[0]}. Both --send and the env var are required.\n`);
    await logRunREST(AGENT_NAME, "skipped", out).catch(() => {});
    return out;
  }

  if (queue.length === 0) {
    console.log(`\n  Nothing eligible to send.\n`);
    await logRunREST(AGENT_NAME, "ok", out).catch(() => {});
    return out;
  }

  try {
    out.sent.attempted = queue.length;
    const job = await sendBulk(
      { messages: queue.map((q) => ({ contact_id: q.contact_id, body: q.body })) },
      { allowSend: true },
    );
    out.sent.job_id = job?.job_id ?? job?.id ?? null;
    console.log(`  bulk job created: ${out.sent.job_id ?? "(no id returned)"}`);
    if (out.sent.job_id) {
      const final = await waitForJob(out.sent.job_id);
      out.sent.job_status = final?.status ?? final?.state ?? (final?.timedOut ? "timed out" : "unknown");
      console.log(`  job status: ${out.sent.job_status}`);
    }
    await recordSends(CAMPAIGN, queue.map((q) => q.contact_id));
  } catch (e) {
    const detail = e instanceof CaptivatedError && e.status ? ` (HTTP ${e.status})` : "";
    out.errors.push(`send: ${e.message}${detail}`);
    console.error(`  SEND FAILED${detail}: ${e.message}`);
    await logFindingREST({
      agent_name: AGENT_NAME,
      category: "reviews",
      severity: "critical",
      finding: `Captivated bulk send failed: ${e.message}`,
      run_date: new Date().toISOString().slice(0, 10),
    }).catch(() => {});
  }

  await logRunREST(AGENT_NAME, out.errors.length ? "partial" : "ok", {
    ...out,
    duration_sec: Math.round((Date.now() - started) / 1000),
  }).catch(() => {});
  return out;
}

run().catch((e) => {
  console.error(`[${AGENT_NAME}] FAILED: ${e?.stack || e}`);
  logRunREST(AGENT_NAME, "error", { error: String(e?.message || e) }).catch(() => {});
  // exitCode, not exit() — process.exit() here races the logRunREST POST above
  // and would drop the failure from agent_runs. Same fix as #160.
  process.exitCode = 1;
});
