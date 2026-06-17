/**
 * data/compliance.ts — SINGLE SOURCE OF TRUTH: compliance & approved language
 *
 * Repo:   phillipwedgworth-cell/envirocare-website (PUBLIC)
 * Path:   data/compliance.ts
 * Commit: feat(data): add compliance rules for the source-of-truth auditor
 * Push:   main
 * ─────────────────────────────────────────────────────────
 * These are MACHINE-CHECKABLE. agents/source-of-truth-auditor.mjs imports
 * BANNED_PATTERNS and scans built pages; any hit blocks the deploy.
 * Approved replacements are provided so fixes are unambiguous.
 */

export interface BannedTerm {
  /** Case-insensitive regex source */
  pattern: string;
  reason: string;
  approvedInstead: string;
  /** Optional: if the SAME line also matches this regex, the hit is suppressed
   *  (e.g. founder ≠ owner — a history reference to Phillip M. Wedgworth). */
  notIf?: string;
  /** Where the rule applies. 'content' (default) = static copy in app/components/data.
   *  'chat' = the chatbot prompt/output only (app/api/chat). Use 'chat' for
   *  AI-tell / stylistic rules so they never flag ordinary site punctuation. */
  scope?: 'content' | 'chat';
}

export const BANNED_PATTERNS: BannedTerm[] = [
  { pattern: 'pet[\\s-]?safe',        reason: 'safety claim',  approvedInstead: 'EPA-registered, applied per label directions' },
  { pattern: 'kid[\\s-]?safe',        reason: 'safety claim',  approvedInstead: 'EPA-registered, applied per label directions' },
  { pattern: 'child[\\s-]?safe',      reason: 'safety claim',  approvedInstead: 'EPA-registered, applied per label directions' },
  { pattern: 'non[\\s-]?toxic',       reason: 'safety claim',  approvedInstead: 'EPA-registered products' },
  { pattern: 'eco[\\s-]?(safe|friendly)', reason: 'safety/green claim', approvedInstead: 'EPA-registered products' },
  { pattern: 'safe once dry',         reason: 'safety claim',  approvedInstead: 'allow applications to dry per label directions' },
  { pattern: 'same[\\s-]?day',        reason: 'availability claim', approvedInstead: 'prompt scheduling' },
  { pattern: 'there today',           reason: 'availability claim', approvedInstead: 'prompt scheduling' },
  { pattern: 'available now',         reason: 'availability claim', approvedInstead: 'prompt scheduling' },
  // "same technician" alone is fine ("real people, same technician on your route"); only a
  // PROMISE of it is a staffing claim. Require an every-time/guaranteed qualifier nearby.
  { pattern: '\\bsame technician\\b[^.]*\\b(every (time|visit)|always|guaranteed?|each (visit|service))\\b', reason: 'staffing promise', approvedInstead: 'a familiar local team whenever possible' },
  { pattern: 'bundle\\s*&\\s*save',   reason: 'bundle-discount claim', approvedInstead: 'bundle for convenience (one invoice, one tech)' },
  // Dead Scorpion tracking number — must never appear.
  { pattern: '649[\\s-]?5278',        reason: 'dead tracking number', approvedInstead: 'the correct office line from data/offices.ts' },
  // GENERATION — company is FOURTH-generation; Kevin is the THIRD-generation OWNER.
  // Allowed (never flagged): "fourth/4th-generation" and "third/3rd-generation owner".
  // Flag only company-level third-gen: "(3rd|third)-generation [Wedgworth] family/business/company".
  { pattern: '(third|3rd)[ -]generation\\s+(wedgworth\\s+)?(family|business|company)', reason: 'wrong generation (company is fourth)', approvedInstead: 'fourth-generation Wedgworth family (see data/business.ts)' },
  // OWNERSHIP — owner is Kevin Wedgworth (gen 3). Flag an "owner" claim naming anyone else.
  // notIf excludes founder/history references (Phillip M. Wedgworth is the gen-1 FOUNDER, not owner).
  { pattern: '\\bowner\\b[^.\\n]*\\b(phillip|lex|william)\\b', notIf: '(Phillip M\\.|founder|founded)', reason: 'wrong owner', approvedInstead: 'Kevin Wedgworth (owner, gen 3); Phillip M. Wedgworth is the founder (gen 1)' },
];

/** Hard rules that need human judgment (auditor flags as WARN, not auto-block). */
export const SOFT_RULES: string[] = [
  'Mosquito: never guarantee or imply elimination ("mosquito-free", "eliminate mosquitoes").',
  'No public review counts ("289 reviews"). Star ratings OK. 4.9★ homepage only.',
  'No customer counts ("45+ Athens homes").',
  'No competitor names anywhere in public copy.',
  '$1M coverage is EnviroCareʼs own guarantee — never imply Corteva/manufacturer backing.',
  'Carpenter bees: existing customers only — never marketed to new customers.',
  'Tuscaloosa: NOT serviced — must not appear in any city list, footer, or nav.',
];

/** Services EnviroCare does NOT offer — must not be marketed. */
export const SERVICES_NOT_OFFERED = ['bed bug', 'raccoon', 'squirrel', 'wildlife removal', 'rodent removal'];

/** Locked seasonal facts (the Lake Martin "April–October" mismatch is the bug to fix). */
export const SEASONS = {
  mosquito: { label: 'March–November', treatments: 9 },
};
