// agents/lib/cleanEnv.mjs
// Node/ESM twin of lib/cleanEnv.ts — the agent scripts run as standalone .mjs
// and cannot import the TypeScript file. Keep the two implementations identical.
//
// Strip a leading BOM, drop zero-width spaces/joiners anywhere, then trim.
// Returns "" for an unset var so callers can use `|| fallback` / truthiness.
export const cleanEnv = (v) =>
  (v ?? '').replace(/^\uFEFF/, '').replace(/[\u200B-\u200D]/g, '').trim();
