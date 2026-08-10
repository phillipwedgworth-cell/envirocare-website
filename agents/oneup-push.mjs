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
//   POST MANAGEMENT — these DO exist, under non-obvious names (2026-08-07).
//   An earlier probe concluded OneUp had no way to list or edit scheduled posts
//   because it guessed listposts/listpost/getposts/listscheduled — all 404.
//   The real names are:
//     GET  /api/getscheduledposts     -> { data: [ { post_id, content,
//                                          date_time, social_network_username,
//                                          category_name, ... } ] }
//     POST /api/editpost              -> post_id + content   ("Post updated successfully")
//     POST /api/deletescheduledpost   -> post_id
//   Note the listing field is social_network_username and the id is post_id
//   (NOT id — that key is absent). Do not conclude an endpoint is missing from
//   a handful of guessed names; walk the error messages.
//
// SAFETY: dry run unless --live is passed. Every post is compliance-scanned
// first — an approved row in this queue was found on 2026-08-06 carrying a bare
// "no contract", which is banned language (the $35/mo plan IS a 12-month ACH
// agreement). Never trust `status='approved'` as a compliance signal.
//
// Run:  node agents/oneup-push.mjs            # dry run, prints what it would send
//       node agents/oneup-push.mjs --live     # actually schedules in OneUp
//       node agents/oneup-push.mjs --audit    # NAP-check everything already scheduled

import { supabase, logAgentRun } from "./lib/supabase.mjs";

const AGENT_NAME = "oneup-push";
const API = "https://www.oneupapp.io/api";
const KEY = process.env.ONEUP_API;
const LIVE = process.argv.includes("--live");

// Banned strings from agents/lib/compliance.mjs. Kept literal here so this agent
// never publishes something the writer-side rules would have rejected.
//
// ── EXPANDED 2026-08-09 ──────────────────────────────────────────────────────
// An audit of the 24 scheduled GBP posts found a banned claim on three of them
// that THIS GATE WOULD HAVE PASSED. The gate is the only control between a draft
// and Google — every rule that lives only in prose is a rule that does not exist.
// Six classes were missing entirely; one was actively wrong.
const BANNED = [
  // WAS: /\bno contracts?\b(?!\s*when)/ with a comment saying "no long-term
  // contract" is approved. That phrasing was RETIRED by owner direction: agreement
  // practice is not uniform, so every absence-framing is inaccurate. State the two
  // billing options positively instead. The old lookahead actively permitted the
  // exact sentence that had to be pulled from a scheduled post on Aug 7.
  /\bno[\s-]+(long[\s-]?term[\s-]+)?(contract|agreement|commitment)s?\b/i,
  /\bcancel\s+(any\s?time|whenever)\b/i,
  /\bnot\s+locked\s+in\b/i,

  // $1M coverage is EnviroCare's OWN. Attributing it to Corteva/Sentricon's maker
  // is a misrepresentation of who is liable. Found on the Aug-13 post, all three
  // locations. Being a "Sentricon Certified Specialist" is a real credential and
  // is NOT caught here -- only the coverage attribution is.
  /(coverage|repair|warrant\w*)[^.]{0,40}\b(from|by|backed by|through)\s+(corteva|the\s+manufacturer|sentricon)/i,
  /\b(corteva|manufacturer)(['’]s)?\s+(guarantee|warranty|coverage)\b/i,

  // A BARE $1,000,000 coverage claim -- correct attribution, missing qualifier.
  // The site states it 91 times and attaches ", subject to the terms of the
  // agreement" every time. Four GBP posts scheduled 2026-08-10/13 stated the figure
  // with no qualifier at all, and the previous version of this gate passed them:
  // it only checked WHO the coverage came from, never whether it was qualified.
  //
  // Tempered token -- matches a sentence containing the figure UNLESS that same
  // sentence also contains "subject to the terms". Sentence-scoped on purpose, so a
  // qualifier three sentences away does not launder an unqualified claim.
  /(?:^|[.!?]\s)(?:(?!subject to the terms)[^.!?])*\$\s?1[,.]?000[,.]?000(?:(?!subject to the terms)[^.!?])*(?=[.!?]|$)/i,
  /(?:^|[.!?]\s)(?:(?!subject to the terms)[^.!?])*\$\s?1\s?(million|M)\b(?:(?!subject to the terms)[^.!?])*(?=[.!?]|$)/i,

  // "guarantee" as a claim. Negated hedges ("we never guarantee elimination") are
  // legitimate and must still pass, hence the lookbehind.
  /(?<!\b(?:never|not|don['’]t|doesn['’]t|cannot|can['’]t|no)\s)\b(our|your|its|EnviroCare(?:['’]|&apos;|&#39;)s)\s+(own\s+)?(?:[$\w,.]+\s+){0,3}guarantee\b/i,
  /\b\d{1,3}[\s-]?(day|days|month|months|year|years)\s+guarantee\b/i,

  // Retired company name, in every encoding it has actually appeared in.
  /EnviroCare Pest (&|&amp;|and) Termite( Services)?/i,   // 'and' spelled out: seen in generated copy 2026-08-09
  /\bEnviroCare\s+LLC\b/i,          // must carry the comma: "EnviroCare, LLC"
  /EnviroCare[^.]{0,20}\bLawn\b/i,  // no name containing "Lawn"

  // GOOGLE REJECTS a GBP post whose BODY carries a phone number. This is a
  // publish-blocker, not a style rule -- the post silently fails to go live.
  /\(?\b\d{3}\)?[.\-\s]\d{3}[.\-\s]\d{4}\b/,

  // No reputation numbers of any kind.
  /\b\d(\.\d)?[\s-]?star\b/i, /\b\d{2,}\+?\s+(reviews?|customers?)\b/i,
  /\bhighly[\s-]rated\b/i, /\bfive[\s-]star\b/i,

  /\bpet[- ]safe\b/i, /\bkid[- ]safe\b/i, /\bchild[- ]safe\b/i,
  /\bnon[- ]toxic\b/i, /\bchemical[- ]free\b/i, /\beco[- ]safe\b/i,
  /\bmosquito[- ]free\b/i, /\beliminate\s+mosquito/i,
  /\bsame[\s-]day\b/i, /\bthere today\b/i, /\bavailable now\b/i,
  /\bbundle\s*&\s*save\b/i, /\d+%\s*off/i, /\bcoupon\b/i,
  /\bbed\s*bug/i, /\bwildlife\b/i, /\bhoneybee\b/i,
  /\blawn\s+care\b/i,
  // 'founded 1958' WITHOUT the "in" was live on five pages, including the
  // /about-us meta description, while this rule required it.
  /\b(founded|established|est\.?)\s+(in\s+)?1958\b/i,
  /205[.\-\s)]*649[.\-\s]*5278/,     // dead Scorpion line
].filter((r) => r instanceof RegExp);

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

/**
 * NAP audit of everything already scheduled in OneUp — including posts this
 * agent did not create. A post publishes to ONE listing; if its copy advertises
 * a different office's number, that listing carries a conflicting phone.
 */
async function auditScheduled() {
  const posts = await oneup("getscheduledposts");
  const expected = [
    [/butler/i, "(205) 940-6360", "Alabaster"],
    [/madison pike/i, "(256) 937-7676", "Huntsville"],
    [/tallapoosa/i, "(256) 234-6162", "Alex City"],
  ];
  let bad = 0;
  for (const p of posts) {
    const listing = p.social_network_username || "";
    const rule = expected.find(([re]) => re.test(listing));
    if (!rule) continue;                       // Facebook / X carry no office phone
    const [, phone, label] = rule;
    for (const found of new Set(p.content?.match(/\(\d{3}\) \d{3}-\d{4}/g) || [])) {
      if (found !== phone) {
        bad++;
        console.error(`[${AGENT_NAME}] MISMATCH post ${p.post_id} (${p.date_time}) -> ${label} listing expects ${phone}, copy says ${found}`);
      }
    }
  }
  console.log(`[${AGENT_NAME}] audited ${posts.length} scheduled posts — ${bad} NAP mismatch(es)`);
  return { audited: posts.length, mismatches: bad };
}

export async function run() {
  if (process.argv.includes("--audit")) return auditScheduled();
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
