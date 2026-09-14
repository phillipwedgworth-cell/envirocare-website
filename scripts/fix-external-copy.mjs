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

// The FIRST probe (2026-09-14) tried four REST shapes and got HTTP 404 on all
// four — "The requested resource was not found." A 404 is not an auth failure, so
// concluding "the key is MCP-only" from it was wrong: it only proved the PATHS
// were guessed wrong. BrightLocal's current docs live in a JS-only developer
// portal that cannot be read from here, so guessing more paths is a poor bet.
//
// The better question is what the MCP endpoint itself offers. agents/brightlocal.mjs
// authenticates to https://mcp.brightlocal.com/mcp with the SAME `?api-key=` query
// param the REST docs describe, so the credential is almost certainly a normal
// BrightLocal API key. And the claude.ai connector exposes a read-only SUBSET of
// whatever that server implements — the raw `tools/list` is the authority on
// whether a write tool exists at all.
const BL_MCP = 'https://mcp.brightlocal.com/mcp';

async function mcpToolsList() {
  const url = `${BL_MCP}?api-key=${encodeURIComponent(BL_KEY)}`;
  const hdrs = { 'content-type': 'application/json', accept: 'application/json, text/event-stream' };
  const init = await fetch(url, {
    method: 'POST',
    headers: hdrs,
    body: JSON.stringify({
      jsonrpc: '2.0', id: 0, method: 'initialize',
      params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'envirocare-extfix', version: '1.0' } },
    }),
  });
  const sid = init.headers.get('mcp-session-id');
  const raw = await init.text();
  if (!init.ok) throw new Error(`initialize ${init.status}: ${raw.slice(0, 160)}`);
  const shdrs = sid ? { ...hdrs, 'mcp-session-id': sid } : hdrs;
  if (sid) await fetch(url, { method: 'POST', headers: shdrs, body: JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) });

  const r = await fetch(url, { method: 'POST', headers: shdrs, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} }) });
  const body = await r.text();
  if (!r.ok) throw new Error(`tools/list ${r.status}: ${body.slice(0, 160)}`);
  // The endpoint may answer as SSE; pull the first JSON object either way.
  const jsonText = body.startsWith('{') ? body : (body.match(/^data:\s*(\{.*\})\s*$/m)?.[1] ?? body);
  const parsed = JSON.parse(jsonText);
  return (parsed?.result?.tools ?? []).map((t) => t.name);
}

async function blProbe() {
  if (!BL_KEY) return { ok: false, why: 'BRIGHTLOCAL_API_KEY is not set' };
  try {
    const tools = await mcpToolsList();
    // Match the VERB at the start of the tool name, not a substring anywhere in it.
    // The first version was a bare substring alternation and reported
    // `get_cb_credits` / `get_lsg_credits` as write-capable — "cr-EDIT-s". A
    // diagnostic that cries wolf is worse than no diagnostic, and this one's whole
    // job is to answer "can CI write to BrightLocal or not".
    const MUTATING = /^(update|create|set|edit|save|patch|put|write|delete|remove|add|post|send|publish|sync|push)(_|$)/i;
    const writey = tools.filter((n) => MUTATING.test(n));
    return { ok: true, tools, writey };
  } catch (e) {
    return { ok: false, why: String(e.message).slice(0, 200) };
  }
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
    console.log(`  MCP authenticated. ${bl.tools.length} tool(s) exposed to this key:`);
    for (const n of bl.tools) console.log(`    ${n}`);
    if (bl.writey.length) {
      console.log(`  → WRITE-CAPABLE TOOLS PRESENT: ${bl.writey.join(', ')}`);
      console.log('    The listing fix is reachable from here. Wire dry/ship against these.');
    } else {
      console.log('  → no write/update tool on this MCP endpoint for this key.');
      console.log('    That is the authority, not the claude.ai connector subset: the server itself');
      console.log('    offers no mutation. Listings must be fixed in the BrightLocal UI.');
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
