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
  { pattern: 'same technician',       reason: 'staffing promise',   approvedInstead: 'a familiar local team whenever possible' },
  { pattern: 'bundle\\s*&\\s*save',   reason: 'bundle-discount claim', approvedInstead: 'bundle for convenience (one invoice, one tech)' },
  // Dead Scorpion tracking number — must never appear.
  { pattern: '649[\\s-]?5278',        reason: 'dead tracking number', approvedInstead: 'the correct office line from data/offices.ts' },
  // "third generation" — wrong; company is fourth-generation.
  { pattern: 'third[\\s-]?generation', reason: 'wrong generation', approvedInstead: 'fourth-generation (see data/business.ts)' },
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
