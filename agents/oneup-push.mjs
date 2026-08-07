// agents/oneup-push.mjs
// Pushes approved rows from the Supabase `social_posts` queue into OneUp's
// scheduler, instead of posting to Facebook/GBP directly.
//
// WHY THIS EXISTS (2026-08-06)
// The direct poster (agents/social-poster.mjs) has never published anything:
//   - Facebook legs fail with "Session has expired on Friday, 26-Jun-26" — the
//     META_PAGE_TOKEN died in June and only Phillip can renew it in Meta.
//   - GBP legs sat at status='approved' because the GBP_LOCATION_* secrets did
//     not exist until 2026-08-06.
// OneUp already holds healthy connections to all of them (listsocialaccounts
// reports is_expired=0 for Facebook, all three GBP locations, and X), so
// routing through OneUp sidesteps the expired Meta token entirely.
//
// API CONTRACT — verified live 2026-08-06 by probing the endpoint:
//   POST https://www.oneupapp.io/api/scheduletextpost?apiKey=KEY
//     category_id          number   — from /api/listcategory
//     social_network_id    JSON array of account ids, e.g. ["100366543367762"]
//                          (the value of social_account_id from
//                           /api/listsocialaccounts — note the param is *_network_id
//                           while the listing calls it *_account_id)
//     scheduled_date_time  "YYYY-MM-DD HH:MM"
//     content              string
//   Validation fires in that order, so a missing field tells you which is next.
//   GET returns 405; POST only.
//
// SAFETY: dry run unless --live is passed. Every post is compliance-scanned
// first — an approved row in this queue was found on 2026-08-06 carrying a bare
// "no contract", which is banned language (the $35/mo plan IS a 12-month ACH
// agreement). Never trust `status='approved'` as a compliance signal.
//
// Run:  node agents/oneup-push.mjs            # dry run, prints what it would send
//       node agents/oneup-push.mjs --live     # actually schedules in OneUp

import { supabase, logAgentRun } from "./lib/supabase.mjs";

const AGENT_NAME = "oneup-push";
const API = "https://www.oneupapp.io/api";
const KEY = process.env.ONEUP_API;
const LIVE = process.argv.includes("--live");

// Banned strings from agents/lib/compliance.mjs. Kept literal here so this agent
// never publishes something the writer-side rules would have rejected.
const BANNED = [
  /\bno contracts?\b(?!\s*when)/i,   // bare "no contract" — only "no long-term contract" is approved
  /\bpet[- ]safe\b/i, /\bkid[- ]safe\b/i, /\bchild[- ]safe\b/i,
  /\bnon[- ]toxic\b/i, /\bchemical[- ]free\b/i, /\beco[- ]safe\b/i,
  /\bmosquito[- ]free\b/i, /\beliminate\s+mosquito/i,
  /\bbundle\s*&\s*save\b/i, /\d+%\s*off/i, /\bcoupon\b/i,
  /\bbed\s*bug/i, /\bwildlife\b/i, /\bhoneybee\b/i,
  /\bfounded in 1958\b/i,
  /205[.\-\s)]*649[.\-\s]*5278/,     // dead Scorpion line
];

function scan(text) {
  return BANNED.filter((re) => re.test(text)).map((re) => re.source);
}

async function oneup(endpoint, body) {
  if (!KEY) throw new Error("ONEUP_API not set");
  const url = `${API}/${endpoint}?apiKey=${encodeURIComponent(KEY)}`;
  const res = body
    ? await fetch(url, { method: "POST", body: new URLSearchParams(body) })
    : await fetch(url);
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) {
    throw new Error(`OneUp ${endpoint}: ${json.message || `HTTP ${res.status}`}`);
  }
  return json.data;
}

// location+platform -> OneUp account. Built at runtime from listsocialaccounts so
// a reconnected account (which changes nothing) or a NEW GBP location is picked
// up without editing this file.
async function buildAccountMap() {
  const accounts = await oneup("listsocialaccounts");
  const gbp = accounts.filter((a) => a.social_network_type === "GBP");
  const byCity = (needle) =>
    gbp.find((a) => a.full_name.toLowerCase().includes(needle))?.social_account_id ?? null;

  const facebook = accounts.find((a) => a.social_network_type === "Facebook")?.social_account_id ?? null;

  // Each route carries the phone of the LISTING it publishes to, not of the
  // nominal location. See the mismatch guard in run().
  return {
    // NOTE: there is no Birmingham GBP listing yet — Phillip is creating one.
    // Until it exists, Birmingham-metro GBP posts go to the ALABASTER listing,
    // which is the metro's verified profile. That makes Birmingham a FALLBACK
    // route, so its posts must carry Alabaster's number.
    "birmingham:google": { id: byCity("butler rd"), phone: "(205) 940-6360", listing: "Alabaster GBP", fallback: true },
    "alabaster:google": { id: byCity("butler rd"), phone: "(205) 940-6360", listing: "Alabaster GBP" },
    "huntsville:google": { id: byCity("old madison pike"), phone: "(256) 937-7676", listing: "Huntsville GBP" },
    "lake_martin:google": { id: byCity("tallapoosa"), phone: "(256) 234-6162", listing: "Alex City GBP" },
    "birmingham:facebook": { id: facebook, phone: null, listing: "Facebook page" },
    "huntsville:facebook": { id: facebook, phone: null, listing: "Facebook page" },
    "lake_martin:facebook": { id: facebook, phone: null, listing: "Facebook page" },
  };
}

function fmtDateTime(d) {
  // OneUp wants "YYYY-MM-DD HH:MM" (no seconds, no timezone).
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}`;
}

/**
 * Every row in the queue is back-dated — the calendar was written in July and
 * nothing ever shipped. Sending those times verbatim would either be rejected or
 * fire all of them at once, which reads as spam on a Google Business Profile.
 *
 * So past-due posts are restaged: one per day at 14:00 UTC (~9am CT, the slot the
 * calendar already used), starting tomorrow, preserving the queue's order.
 * Future-dated posts keep their own time.
 */
function scheduleFor(iso, pastDueIndex) {
  const original = new Date(iso);
  const now = new Date();
  if (original > now) return { when: original, restaged: false };
  const d = new Date(now);
  d.setUTCDate(d.getUTCDate() + 1 + pastDueIndex);
  d.setUTCHours(14, 0, 0, 0);
  return { when: d, restaged: true };
}

export async function run() {
  if (!KEY) {
    const msg = "ONEUP_API not set — nothing pushed";
    console.warn(`[${AGENT_NAME}] ${msg}`);
    await logAgentRun(AGENT_NAME, "error", msg).catch(() => {});
    return { pushed: 0, error: msg };
  }

  const [categories, accountMap] = await Promise.all([oneup("listcategory"), buildAccountMap()]);
  const categoryId = categories?.[0]?.id;
  if (!categoryId) throw new Error("OneUp: no categories found");
  console.log(`[${AGENT_NAME}] category ${categoryId} (${categories[0].category_name}); ${Object.keys(accountMap).length} routes`);

  const { data: rows, error } = await supabase
    .from("social_posts")
    .select("id,location,platform,headline,body,cta,scheduled_for,status")
    .eq("status", "approved")
    .order("scheduled_for", { ascending: true });
  if (error) throw new Error(`social_posts read: ${error.message}`);
  if (!rows?.length) {
    console.log(`[${AGENT_NAME}] no approved posts`);
    return { pushed: 0 };
  }

  const results = [];
  let pastDue = 0;
  for (const r of rows) {
    const content = [r.headline, r.body, r.cta].filter(Boolean).join("\n\n");
    const violations = scan(content);
    const route = accountMap[`${r.location}:${r.platform}`];
    const account = route?.id ?? null;

    if (violations.length) {
      console.error(`[${AGENT_NAME}] BLOCKED ${r.id} — banned language: ${violations.join(", ")}`);
      results.push({ id: r.id, skipped: `compliance: ${violations.join(", ")}` });
      continue;
    }
    if (!account) {
      console.warn(`[${AGENT_NAME}] no OneUp account for ${r.location}:${r.platform} — skipping ${r.id}`);
      results.push({ id: r.id, skipped: "no matching OneUp account" });
      continue;
    }

    // NAP guard. A post publishes to ONE listing; if its CTA advertises a
    // different office's number, that listing now carries a conflicting phone —
    // exactly the inconsistency the citation cleanup exists to remove.
    // This bit on 2026-08-07: two Birmingham posts were pushed carrying
    // (205) 991-2882 while routing to the Alabaster listing, because Birmingham
    // has no GBP of its own yet.
    if (route.phone && content.includes("(") && !content.includes(route.phone)) {
      const shown = (content.match(/\(\d{3}\)\s?\d{3}-\d{4}/g) || []).join(", ") || "none";
      console.error(
        `[${AGENT_NAME}] BLOCKED ${r.id} — publishes to ${route.listing} (${route.phone}) but the copy says ${shown}.` +
        (route.fallback ? " This is a fallback route: no GBP exists for this location yet." : "")
      );
      results.push({ id: r.id, skipped: `NAP mismatch: ${route.listing} vs ${shown}` });
      continue;
    }

    const { when, restaged } = scheduleFor(r.scheduled_for, pastDue);
    if (restaged) pastDue++;
    const payload = {
      category_id: String(categoryId),
      social_network_id: JSON.stringify([account]),
      scheduled_date_time: fmtDateTime(when),
      content,
    };

    if (!LIVE) {
      console.log(`[${AGENT_NAME}] DRY RUN ${r.id} -> ${r.location}:${r.platform} @ ${payload.scheduled_date_time}${restaged ? " (restaged from " + String(r.scheduled_for).slice(0,10) + ")" : ""}`);
      results.push({ id: r.id, dryRun: true });
      continue;
    }

    try {
      await oneup("scheduletextpost", payload);
      await supabase.from("social_posts").update({ status: "queued_oneup" }).eq("id", r.id);
      console.log(`[${AGENT_NAME}] scheduled ${r.id} in OneUp`);
      results.push({ id: r.id, scheduled: true });
    } catch (e) {
      console.error(`[${AGENT_NAME}] FAILED ${r.id}: ${e.message}`);
      results.push({ id: r.id, error: e.message });
    }
  }

  const pushed = results.filter((x) => x.scheduled).length;
  const blocked = results.filter((x) => x.skipped).length;
  const summary = LIVE
    ? `pushed ${pushed}/${rows.length} to OneUp, ${blocked} skipped`
    : `DRY RUN over ${rows.length} approved posts (${blocked} would be skipped) — re-run with --live`;
  console.log(`[${AGENT_NAME}] ${summary}`);
  await logAgentRun(AGENT_NAME, "ok", summary).catch(() => {});
  return { pushed, results, summary };
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("oneup-push.mjs")) {
  run().catch((e) => { console.error(e); process.exit(1); });
}
