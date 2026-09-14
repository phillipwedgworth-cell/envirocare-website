/**
 * scripts/fix-external-copy.mjs — the two compliance defects that live OUTSIDE this repo.
 *
 * WHY THIS EXISTS (2026-09-14)
 * ---------------------------------------------------------------------------
 * Two known-bad pieces of copy are not in the codebase, so no guard here can fix
 * them and every session that finds them writes another handoff note instead:
 *
 *   1. BrightLocal listing descriptions. 8 banned phrases across 7 fields and 4
 *      locations, EVERY ONE on a channel with Active Sync ON — i.e. publishing to
 *      the live Google and Bing listings. "(March through November)" is the retired
 *      mosquito season (ruled March-October 2026-08-26); Birmingham's GMB field
 *      also says "EnviroCare's own damage repair guarantee", and "guarantee" on
 *      the figure is banned outright. This is what keeps PR #171 red.
 *
 *   2. The OneUp content-system Google Doc teaches the INCOMPLETE termite
 *      qualifier ("subject to the terms of the agreement", missing "inspection,
 *      approval, and"). That is the document ChatGPT writes social copy from, so
 *      the defect regenerates on every content cycle. Fixing the 11 queued posts
 *      on 2026-09-07 did not stop it; only fixing the source does.
 *
 * The credentials for both already exist as repo secrets — BRIGHTLOCAL_API_KEY,
 * and GOOGLE_CLIENT_ID/SECRET/REFRESH_TOKEN. They exist ONLY in Actions, never on
 * a developer machine, which is why this runs as a workflow rather than a script
 * someone runs locally.
 *
 * DRY RUN IS THE DEFAULT AND THE FALLBACK, same contract as agents/executor.mjs:
 * only the exact string "ship" publishes. A typo, an empty input, or no input at
 * all stays read-only.
 *
 *   probe  (default) — authenticate only. Report which credential works, which
 *                      scopes were granted, and whether each target is reachable.
 *                      Reads nothing it does not need and writes nothing.
 *   dry             — fetch the live content, compute the exact replacement, print
 *                      a before/after diff. Writes nothing.
 *   ship            — apply. Refuses any field whose live text is not what the dry
 *                      run saw, so a concurrent edit cannot be silently clobbered.
 *
 * Every replacement is re-checked against data/compliance.ts at ship time. A
 * replacement that does not pass the repo's own scanner is never sent, no matter
 * what this file says it should be.
 */
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { scanText, compileRules } from './lib/compliance-rules.mjs';

const MODE = (argOf('mode') ?? (process.env.EXTFIX_MODE || '').trim() ?? '').toLowerCase() || 'probe';
const SHIP = MODE === 'ship';
const DRY = MODE === 'dry' || SHIP;

function argOf(name) {
  const hit = process.argv.slice(2).find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : undefined;
}
const env = (k) => (process.env[k] ?? '').replace(/^﻿/, '').trim();

// ── The corrections ─────────────────────────────────────────────────────────
// Anchored on the EXACT live text, not a regex, so a field that has since been
// edited by hand fails loudly instead of being overwritten from a stale premise.
const SEASON_FROM = '(March through November)';
const SEASON_TO = '(March through October)';
const BHAM_GUARANTEE_FROM =
  "Sentricon termite protection backed by EnviroCare's own damage repair guarantee of up to $1,000,000, subject to the terms of the agreement and to inspection";
const BHAM_GUARANTEE_TO =
  'Sentricon termite protection with up to $1,000,000 in EnviroCare damage repair coverage, subject to the terms of the agreement and to inspection';

// location_id -> which active_sync_data channels carry a description we must fix
const LISTINGS = [
  { id: 4068729, name: 'Alexander City', channels: ['gmb', 'bing'] },
  { id: 4068730, name: 'Huntsville', channels: ['gmb', 'bing'] },
  { id: 4068335, name: 'Alabaster', channels: ['gmb', 'bing'] },
  { id: 4130578, name: 'Birmingham', channels: ['gmb'] },
];

function correct(text) {
  let out = text;
  if (out.includes(BHAM_GUARANTEE_FROM)) out = out.split(BHAM_GUARANTEE_FROM).join(BHAM_GUARANTEE_TO);
  if (out.includes(SEASON_FROM)) out = out.split(SEASON_FROM).join(SEASON_TO);
  return out;
}

// The Google Doc bullets, verbatim as read from the live document 2026-09-14.
const DOC_ID = env('CONTENT_DOC_ID') || '1G2iXoWvBLpumW2T6FGoXx-xvnkgMQhaT';
const DOC_EDITS = [
  {
    from: 'If `$1,000,000` appears, include `subject to the terms of the agreement` in the same post.',
    to: 'If `$1,000,000` appears, the same post must contain the literal phrase `subject to inspection, approval, and the terms of the agreement`. The shorter `subject to the terms of the agreement` is NOT sufficient — it omits the inspection and approval conditions.',
  },
  {
    from: 'Approved feature wording: `Up to $1,000,000 EnviroCare repair coverage.` Any additional eligibility wording supplied by current canon also applies.',
    to: 'The ONLY approved feature wording is: `up to $1,000,000 in EnviroCare repair coverage, subject to inspection, approval, and the terms of the agreement`. Name EnviroCare as the provider. Never attribute the coverage to Corteva, Sentricon, or a manufacturer; never write it as a possessive; and never call it a warranty or a guarantee.',
  },
];

// ── BrightLocal ─────────────────────────────────────────────────────────────
// The key in BRIGHTLOCAL_API_KEY is used by agents/brightlocal.mjs as an MCP
// bearer. Whether the SAME string authenticates the REST Management API is not
// documented anywhere in this repo, so probe mode tries the documented shapes and
// reports which one answers rather than assuming.
const BL_KEY = env('BRIGHTLOCAL_API_KEY');
const BL_BASE = 'https://tools.brightlocal.com/seo-tools/api';

async function blProbe() {
  if (!BL_KEY) return { ok: false, why: 'BRIGHTLOCAL_API_KEY is not set' };
  const attempts = [
    { label: 'v4 header x-api-key', url: `${BL_BASE}/v4/location?page=1`, init: { headers: { 'x-api-key': BL_KEY, accept: 'application/json' } } },
    { label: 'v4 header api-key', url: `${BL_BASE}/v4/location?page=1`, init: { headers: { 'api-key': BL_KEY, accept: 'application/json' } } },
    { label: 'v4 bearer', url: `${BL_BASE}/v4/location?page=1`, init: { headers: { authorization: `Bearer ${BL_KEY}`, accept: 'application/json' } } },
    { label: 'v2 query api-key', url: `${BL_BASE}/v2/clients?api-key=${encodeURIComponent(BL_KEY)}`, init: {} },
  ];
  const results = [];
  for (const a of attempts) {
    try {
      const r = await fetch(a.url, { ...a.init, redirect: 'manual' });
      const body = (await r.text()).slice(0, 160).replace(/\s+/g, ' ');
      results.push({ label: a.label, status: r.status, body });
    } catch (e) {
      results.push({ label: a.label, status: 'ERR', body: String(e.message).slice(0, 120) });
    }
  }
  return { ok: true, results };
}

// ── Google ──────────────────────────────────────────────────────────────────
async function googleAccessToken() {
  const id = env('GOOGLE_CLIENT_ID');
  const secret = env('GOOGLE_CLIENT_SECRET');
  const refresh = env('GOOGLE_REFRESH_TOKEN');
  if (!id || !secret || !refresh) throw new Error('GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN not all set');
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: id, client_secret: secret, refresh_token: refresh, grant_type: 'refresh_token' }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`token exchange ${r.status}: ${JSON.stringify(j).slice(0, 200)}`);
  return j.access_token;
}

async function googleScopes(token) {
  const r = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${encodeURIComponent(token)}`);
  const j = await r.json().catch(() => ({}));
  return String(j.scope || '(unknown)');
}

async function docGet(token) {
  const r = await fetch(`https://docs.googleapis.com/v1/documents/${DOC_ID}`, { headers: { authorization: `Bearer ${token}` } });
  const j = await r.json();
  if (!r.ok) throw new Error(`docs.get ${r.status}: ${JSON.stringify(j?.error?.message ?? j).slice(0, 220)}`);
  return j;
}

// Flatten the document to plain text so we can confirm a bullet is present before
// asking the API to replace it. replaceAllText is literal and case-sensitive, so a
// bullet that does not appear verbatim must be reported, never guessed at.
function docText(doc) {
  const out = [];
  const walk = (els) => {
    for (const el of els ?? []) {
      if (el.paragraph) for (const pe of el.paragraph.elements ?? []) if (pe.textRun?.content) out.push(pe.textRun.content);
      if (el.table) for (const row of el.table.tableRows ?? []) for (const cell of row.tableCells ?? []) walk(cell.content);
      if (el.tableOfContents) walk(el.tableOfContents.content);
    }
  };
  walk(doc.body?.content);
  return out.join('');
}

async function docBatchUpdate(token, requests) {
  const r = await fetch(`https://docs.googleapis.com/v1/documents/${DOC_ID}:batchUpdate`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ requests }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`batchUpdate ${r.status}: ${JSON.stringify(j?.error?.message ?? j).slice(0, 220)}`);
  return j;
}

// ── run ─────────────────────────────────────────────────────────────────────
export async function run() {
  const rules = compileRules();
  console.log(`[extfix] mode=${SHIP ? 'SHIP' : MODE === 'dry' ? 'DRY RUN' : 'PROBE'}`);
  if (!SHIP) console.log('[extfix] nothing will be written. Real publish needs workflow_dispatch with mode=ship.');

  // ---- BrightLocal ----
  console.log('\n=== BrightLocal ===');
  const bl = await blProbe();
  if (!bl.ok) {
    console.log(`  SKIP — ${bl.why}`);
  } else {
    for (const r of bl.results) console.log(`  [${r.label}] HTTP ${r.status}  ${r.body}`);
    const working = bl.results.find((r) => r.status === 200);
    console.log(working ? `  → REST API reachable via "${working.label}"` : '  → no REST shape authenticated; the key is MCP-only and listings must be fixed in the UI');
    if (DRY && working) {
      console.log('  (dry/ship for listings is not wired until a shape is confirmed — rerun probe output is the input to that work)');
    }
  }

  // ---- Google Doc ----
  console.log('\n=== Google Doc ===');
  let token;
  try {
    token = await googleAccessToken();
    console.log('  token exchange OK');
    console.log(`  granted scopes: ${await googleScopes(token)}`);
  } catch (e) {
    console.log(`  SKIP — ${e.message}`);
    token = null;
  }

  if (token) {
    try {
      const doc = await docGet(token);
      const text = docText(doc);
      console.log(`  docs.get OK — "${doc.title}" (${text.length} chars)`);
      const requests = [];
      for (const [i, e] of DOC_EDITS.entries()) {
        const present = text.includes(e.from);
        console.log(`  edit ${i + 1}: ${present ? 'FOUND target text' : 'NOT FOUND — skipping (doc may already be fixed, or reworded)'}`);
        if (!present) continue;
        const verdict = scanText(e.to, rules);
        if (!verdict.clean) {
          console.log(`    REFUSED — replacement fails this repo's own scanner: ${verdict.notes}`);
          continue;
        }
        console.log(`    - ${e.from.slice(0, 96)}`);
        console.log(`    + ${e.to.slice(0, 96)}`);
        requests.push({ replaceAllText: { containsText: { text: e.from, matchCase: true }, replaceText: e.to } });
      }
      if (SHIP && requests.length) {
        const res = await docBatchUpdate(token, requests);
        const n = (res.replies ?? []).reduce((a, r) => a + (r.replaceAllText?.occurrencesChanged ?? 0), 0);
        console.log(`  SHIPPED — ${n} occurrence(s) replaced`);
      } else if (requests.length) {
        console.log(`  ${requests.length} replacement(s) ready. Re-run with mode=ship to apply.`);
      } else {
        console.log('  nothing to do');
      }
    } catch (e) {
      console.log(`  docs FAILED — ${e.message}`);
    }
  }

  console.log('\n[extfix] done');
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  run().catch((e) => {
    console.error('[extfix] FATAL', e);
    process.exit(1);
  });
}
