// Code-level backstop for the SoLV rule in morning-brief.mjs SYSTEM (Sunday audit 2026-10-04, R5):
// the 10-02 and 10-03 briefs said "Alabaster surge (+25 pts since Aug 27)" by
// subtracting a 9x9/20-mile-grid baseline from goals.md from a new campaign's
// 7x7 figure. A prompt rule alone is a suggestion, so any line that pairs a
// point change with "since <date>" is removed and a note says why.
const MONTH = '(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\\.?';
const SINCE_DATE = new RegExp(`\\bsince\\s+(?:${MONTH}\\s+\\d{1,2}|\\d{4}-\\d{2}-\\d{2}|\\d{1,2}/\\d{1,2})`, 'i');
const POINT_MOVE = /(?:(?:[+\u2212-]|\b(?:up|down|rose|fell|gained|lost|dropped|climbed)\s+)\s?\d+(?:\.\d+)?\s?(?:pts?|points?|pp|%)|\b(?:surge|jump|leap|soar)\w*)/i;
export function stripCrossSeriesClaims(text) {
  let removed = 0;
  const out = String(text).split('\n').filter((line) => {
    const bad = SINCE_DATE.test(line) && POINT_MOVE.test(line);
    if (bad) removed++;
    return !bad;
  });
  if (removed) out.push('', `(${removed} line(s) removed: a ranking change computed against an older, differently measured baseline is not a real movement.)`);
  return { text: out.join('\n'), removed };
}


// ── Sunday audit 2026-10-11, R2. From 10-05 to 10-10 every brief told Phillip
// "Approve or reset PR #144 — 190 keyword drafts" as his #1 call, with a day
// counter. #144 had merged on 10-06 and was never about keyword drafts. The
// prompt already says "a PR not in OPEN PULL REQUESTS is merged or closed";
// the model ignored it because the delta rule told it to carry yesterday's
// unanswered decisions forward. Prompt rules are suggestions; this is the code.
//
// stripStalePRClaims removes:
//   - in QUEUED / YOUR CALL: any item naming a PR that is not open (a numbered
//     YOUR CALL item is removed together with its continuation lines);
//   - anywhere: a line naming a PR that is neither open nor recently merged.
// prState = { ok, open: Set<number>, merged: Set<number> }. When ok is false
// (no GitHub token) every line that names a PR is removed — no PR claim at all.
const PR_REF = /(?:\bPRs?\s*#?\s*|#)(\d{2,5})(?:\s*[–-]\s*#?(\d{2,5}))?/gi;
function prNumbers(line) {
  const out = [];
  for (const m of String(line).matchAll(PR_REF)) {
    const a = Number(m[1]);
    const b = m[2] ? Number(m[2]) : null;
    if (b && Math.abs(b - a) <= 50) for (let n = Math.min(a, b); n <= Math.max(a, b); n++) out.push(n);
    else out.push(a);
  }
  return out;
}
const SECTION = (line) => {
  const t = line.replace(/[#*_`]/g, '').trim().toUpperCase();
  if (/^SHIPPED\b/.test(t)) return 'shipped';
  if (/^QUEUED\b/.test(t)) return 'queued';
  if (/^YOUR CALL\b/.test(t)) return 'call';
  if (/^SCOREBOARD\b/.test(t)) return 'scoreboard';
  return null;
};
export function stripStalePRClaims(text, prState) {
  const open = prState?.open ?? new Set();
  const merged = prState?.merged ?? new Set();
  const ok = !!prState?.ok;
  const lines = String(text).split('\n');
  const out = [];
  let section = null, removed = 0, dropping = false;
  for (const line of lines) {
    const s = SECTION(line);
    if (s) { section = s; dropping = false; out.push(line); continue; }
    if (dropping) {
      // continuation of a removed item: stop at a blank line or the next item
      if (!line.trim() || /^\s*(?:\*\*)?\d+\.|^\s*[-*]\s|^\s*---/.test(line)) dropping = false;
      else { removed++; continue; }
    }
    const nums = prNumbers(line);
    if (nums.length) {
      const pending = section === 'queued' || section === 'call';
      const bad = !ok
        || (pending && nums.some((n) => !open.has(n)))
        || nums.some((n) => !open.has(n) && !merged.has(n));
      if (bad) {
        removed++;
        dropping = /^\s*(?:\*\*)?\d+\./.test(line) || pending;
        continue;
      }
    }
    out.push(line);
  }
  if (removed) out.push('', `(${removed} line(s) removed: they described a pull request as waiting when GitHub shows it merged or closed.)`);
  return { text: out.join('\n'), removed };
}

// ── Sunday audit 2026-10-11, R3. The 10-10 brief said "Organic (7d ending
// Oct 7)" over numbers that end Oct 6 (gsc_daily max date). The window label
// must come from the data, not from the run date or the model.
const ENDING = /\bending\s+(?:(?:mon|tue|wed|thu|fri|sat|sun)[a-z]*,?\s+)?(?:(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\.?\s+\d{1,2}(?:,\s*\d{4})?|\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2})/i;
export function fixDataWindowLabel(text, lastDate) {
  if (!lastDate) return { text: String(text), fixed: 0 };
  const label = new Date(`${lastDate}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
  let fixed = 0;
  const out = String(text).split('\n').map((line) => {
    if (!/organic|clicks|impressions|gsc/i.test(line) || !ENDING.test(line)) return line;
    const next = line.replace(ENDING, `ending ${label}`);
    if (next !== line && !line.includes(`ending ${label}`)) fixed++;
    return next;
  });
  return { text: out.join('\n'), fixed };
}

// ── Sunday audit 2026-11-08, R4 (4th week). Briefs 11-03 and 11-05 said
// "PR #290 merged … (awaiting production deploy)" and "PR #287 merged …
// awaiting production deploy" while the production deployment carrying each
// commit was already READY (Vercel: cefc348 READY 11-03 02:23 UTC; 3081e26
// READY 11-04 20:50 UTC). The model was guessing deploy state.
// deployState = { ok, live: Map<number, boolean|null> } from fetchDeployState().
//   live true  -> any "not live / awaiting deploy" wording about that PR is removed
//   live false -> any "live / deployed" wording about that PR is removed
//   unknown (ok false, or null) -> both kinds of claim are removed: say nothing
const NOT_LIVE = /\b(?:awaiting (?:a |the )?(?:production )?deploy(?:ment)?|deploy(?:ment)? (?:is )?(?:tbd|pending)|not (?:yet )?live|not (?:yet )?deployed|production deploy (?:is )?not yet live|live on code only)\b/i;
const IS_LIVE = /\b(?:(?:is |now )?live in production|deployed to production|(?:now )?live on (?:the )?(?:site|www|envirocarellc))\b/i;
export function stripDeployClaims(text, deployState) {
  const ok = !!deployState?.ok;
  const live = deployState?.live ?? new Map();
  let removed = 0;
  const out = [];
  for (const line of String(text).split('\n')) {
    const saysNot = NOT_LIVE.test(line);
    const saysLive = !saysNot && IS_LIVE.test(line);
    if (!saysNot && !saysLive) { out.push(line); continue; }
    const nums = prNumbers(line);
    if (!nums.length) { out.push(line); continue; }
    const wrong = nums.some((n) => {
      const v = ok ? live.get(n) : null;
      if (v === true) return saysNot;
      if (v === false) return saysLive;
      return true; // unknown deploy state: no claim either way
    });
    if (wrong) { removed++; continue; }
    out.push(line);
  }
  if (removed) out.push('', `(${removed} line(s) removed: they stated a PR's production-deploy status that the production deployment record does not support.)`);
  return { text: out.join('\n'), removed };
}
