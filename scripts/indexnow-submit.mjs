/**
 * scripts/indexnow-submit.mjs
 * -----------------------------------------------------------------------------
 * Tell Bing (and Yandex, Seznam, Naver) that pages changed, via IndexNow.
 *
 * WHY THIS EXISTS
 * -----------------------------------------------------------------------------
 * ChatGPT's web search runs on Bing's index. The Sep 16 AI-citation probe found
 * envirocarellc.com cited in 15 of 25 prompts on Gemini (Google-grounded) and
 * 1 of 25 on ChatGPT. Google finds this site; Bing largely does not, and
 * nothing on the site has ever told Bing when a page changed.
 *
 * IndexNow is the cheap half of closing that gap: one POST per deploy listing
 * changed URLs. The other half is registering the domain in Bing Webmaster
 * Tools, which needs a Microsoft login and is not something a script can do.
 * IndexNow still works without it — Bing accepts submissions for any host that
 * proves key ownership — but the pair is what actually moves the needle.
 *
 * HOW OWNERSHIP IS PROVEN
 * The key file must be live at https://<host>/<key>.txt and contain exactly the
 * key. This script FETCHES it first and refuses to submit if it is missing or
 * does not match. That ordering is deliberate: submitting against a key the
 * host cannot serve gets the host rejected, and a script that reports success
 * while Bing silently discarded the batch is worse than no script.
 *
 * SAFE TO RUN REPEATEDLY. IndexNow is idempotent — resubmitting an unchanged
 * URL is explicitly allowed and simply re-confirms it.
 *
 * Usage:
 *   node scripts/indexnow-submit.mjs              submit every sitemap URL
 *   node scripts/indexnow-submit.mjs --dry-run    show what would be sent
 *   node scripts/indexnow-submit.mjs --limit 50   cap the batch
 *
 * Exit 0 = submitted (or dry run). Exit 1 = refused, with the reason.
 */

const HOST = 'www.envirocarellc.com';
const ORIGIN = `https://${HOST}`;
const KEY = '965711c8894f256fb63c85d84696e5ab';
const KEY_URL = `${ORIGIN}/${KEY}.txt`;
const SITEMAP = `${ORIGIN}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

// IndexNow caps a single submission at 10,000 URLs. This site is ~183 routes,
// so the cap is a guard against a runaway sitemap, not a real limit.
const HARD_CAP = 10000;

const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const limitArg = args.indexOf('--limit');
const LIMIT = limitArg !== -1 ? Number(args[limitArg + 1]) : HARD_CAP;

// Throws rather than calling process.exit(). Hard-exiting while a fetch is
// still in flight trips a libuv assertion on Windows ("handle->flags &
// UV_HANDLE_CLOSING"), which buries the actual refusal message under a crash
// dump. Setting exitCode and unwinding lets node close its handles first, so
// the reason stays the last thing on screen.
class Refused extends Error {}
function die(msg) {
  throw new Refused(msg);
}

async function main() {
  // ── 1. Prove the key file is live BEFORE submitting anything ───────────────
  let keyBody;
  try {
    const res = await fetch(KEY_URL, { redirect: 'follow' });
    if (!res.ok) die(`key file ${KEY_URL} returned HTTP ${res.status}. It must be live and public before any submission.`);
    keyBody = (await res.text()).trim();
  } catch (e) {
    // Rethrow our own refusal untouched — wrapping it would print the reason twice.
    if (e instanceof Refused) throw e;
    die(`could not fetch ${KEY_URL} — ${e.message}`);
  }
  if (keyBody !== KEY) {
    die(`key file is live but its contents do not match the key this script submits.\n  served: ${JSON.stringify(keyBody.slice(0, 80))}\n  expected: ${JSON.stringify(KEY)}`);
  }
  console.log(`key file verified live at ${KEY_URL}`);

  // ── 2. Read the sitemap ────────────────────────────────────────────────────
  let xml;
  try {
    const res = await fetch(SITEMAP, { redirect: 'follow' });
    if (!res.ok) die(`sitemap ${SITEMAP} returned HTTP ${res.status}`);
    xml = await res.text();
  } catch (e) {
    if (e instanceof Refused) throw e;
    die(`could not fetch ${SITEMAP} — ${e.message}`);
  }

  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
    .map((m) => m[1].trim())
    // Only URLs on the declared host are legal in an IndexNow batch. A stray
    // off-host <loc> would get the WHOLE batch rejected, not just that row.
    .filter((u) => {
      try { return new URL(u).host === HOST; } catch { return false; }
    });

  const unique = [...new Set(urls)].slice(0, Math.min(LIMIT, HARD_CAP));
  if (!unique.length) die('sitemap parsed but produced zero URLs on this host — refusing to submit an empty batch');
  console.log(`sitemap: ${urls.length} URL(s), ${unique.length} submitted after dedupe/limit`);

  const payload = { host: HOST, key: KEY, keyLocation: KEY_URL, urlList: unique };

  if (DRY) {
    console.log('\n--dry-run: nothing submitted. First 10 URLs:');
    for (const u of unique.slice(0, 10)) console.log(`  ${u}`);
    console.log(`\nwould POST ${unique.length} URL(s) to ${ENDPOINT}`);
    return;
  }

  // ── 3. Submit ──────────────────────────────────────────────────────────────
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  // IndexNow returns 200 (accepted) or 202 (accepted, key validation pending).
  // Both are success. 403 means the key file check failed on their side, which
  // should be impossible given step 1 — report it loudly rather than swallow it.
  if (res.status === 200 || res.status === 202) {
    console.log(`\nsubmitted ${unique.length} URL(s) — HTTP ${res.status}`);
    return;
  }
  const body = await res.text().catch(() => '');
  die(`IndexNow returned HTTP ${res.status}. ${body.slice(0, 300)}`);
}

main().catch((e) => {
  console.error(`REFUSED: ${e.message}`);
  process.exitCode = 1;
});
