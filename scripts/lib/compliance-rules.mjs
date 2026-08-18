// ── ONE rule source for every compliance scan ─────────────────────────────────
// WHY THIS EXISTS, 2026-08-18.
//
// scripts/proposer.mjs carried its own "compact form of data/compliance.ts
// BANNED_PATTERNS" — a HAND-COPIED subset. It held 9 rules against 30 in
// data/compliance.ts, and the 21 it never copied included every shape that
// actually leaked into approval_queue:
//
//   - the retired name "EnviroCare Pest & Termite Services"
//   - $1,000,000 with no "subject to the terms of the agreement"
//   - the possessive-guarantee shape (EnviroCare's own ... guarantee)
//   - 1958 / 68 years attached to the ENTITY rather than the family
//
// Six queued items carry those claims, and every one was written with
// compliance_clean = true — because the scan that set the flag genuinely ran. It
// simply could not see rules that were never transcribed into it. A second,
// drifted copy of a rule set is worse than no copy at all, because it reports
// PASS with authority.
//
// So nobody hand-copies rules again. The repo guard and the proposer both import
// from here, and compileRules below is the SAME function the repo guard uses,
// moved rather than retyped.
import { readFileSync } from 'node:fs';

const COMPLIANCE_TS = new URL('../../data/compliance.ts', import.meta.url);

export function compileRules() {
  const src = readFileSync(COMPLIANCE_TS, 'utf8');
  const body = src.slice(src.indexOf('BANNED_PATTERNS'), src.indexOf('SOFT_RULES'));
  const rules = [];

  for (const line of body.split('\n')) {
    if (!line.includes('pattern:')) continue;
    const dq = line.match(/pattern:\s*"((?:\\.|[^"\\])*)"/);
    const sq = line.match(/pattern:\s*'((?:\\.|[^'\\])*)'/);
    if (!dq && !sq) continue;

    // TS string literal -> real string. The single-quote path MUST unescape
    // backslashes too, or every \\b-anchored rule compiles to a literal backslash
    // and silently never matches.
    //
    // This applies to notIf EXACTLY as much as to pattern, and forgetting it there
    // is not a theoretical bug: on the first run of this script every one of the
    // 163 "unlimited" hits was a false positive, because the carve-out
    // 'unlimited\\s+(free|...)' had compiled to "backslash, s" and matched nothing.
    // A carve-out that silently never fires turns a working rule into noise, which
    // is how a guard gets ignored.
    const unesc = (m, isDouble) =>
      JSON.parse(`"${isDouble ? m : m.replace(/\\'/g, "'").replace(/"/g, '\\"')}"`);

    const raw = unesc(dq ? dq[1] : sq[1], Boolean(dq));

    const nm = line.match(/notIf:\s*'((?:\\.|[^'\\])*)'/);
    const sv = line.match(/severity:\s*'(block|warn)'/);
    const sc = line.match(/scope:\s*'(content|chat)'/);
    const rs = line.match(/reason:\s*'((?:\\.|[^'\\])*)'/);
    const gr = line.match(/granularity:\s*'(line|file)'/);
    const rq = line.match(/requires:\s*'((?:\\.|[^'\\])*)'/);

    rules.push({
      re: new RegExp(raw, 'gi'),
      notIf: nm ? new RegExp(unesc(nm[1], false), 'i') : null,
      severity: sv ? sv[1] : 'block',
      scope: sc ? sc[1] : 'content',
      reason: rs ? rs[1] : raw,
      granularity: gr ? gr[1] : 'line',
      requires: rq ? new RegExp(unesc(rq[1], false), 'i') : null,
    });
  }
  return rules;
}

// Scan ONE blob of generated text — a proposal, a post, a draft — as a unit.
//
// A proposal is a single self-contained piece of copy, so file-granularity is the
// right reading of `requires`: a $1M figure anywhere in the blob is qualified if
// the blob states the terms anywhere. That is how the obligation works on a
// rendered page.
//
// scope 'chat' rules are skipped — they govern the chatbot's own output, not
// marketing copy.
//
// Returns { clean, blocking, warnings, notes }. `notes` is null when clean, so a
// clean row is written exactly as it is today.
export function scanText(text, rules = compileRules()) {
  const blocking = [];
  const warnings = [];
  const body = String(text || '');

  for (const rule of rules) {
    if (rule.scope === 'chat') continue;
    if (rule.requires && rule.requires.test(body)) continue;

    rule.re.lastIndex = 0;
    let m;
    let hit = null;
    while ((m = rule.re.exec(body)) !== null) {
      if (rule.notIf && rule.notIf.test(m[0])) continue;
      hit = m[0];
      break;
    }
    if (!hit) continue;

    const entry = { reason: rule.reason, match: hit.slice(0, 80) };
    if (rule.severity === 'warn') warnings.push(entry);
    else blocking.push(entry);
  }

  const parts = [];
  if (blocking.length) parts.push('BLOCKING: ' + blocking.map((b) => b.reason + ' ("' + b.match + '")').join('; '));
  if (warnings.length) parts.push('WARN: ' + warnings.map((w) => w.reason + ' ("' + w.match + '")').join('; '));

  return {
    clean: blocking.length === 0,
    blocking,
    warnings,
    notes: parts.length ? parts.join(' | ') : null,
  };
}
