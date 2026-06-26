// lib/brand.ts — EnviroCare locked design tokens (single source of truth).
// Locked by Phillip 2026-06-10. Do not introduce greens/fonts outside this set.

export const GREEN = "#0E8E40";
export const GOLD = "#F5A800";
export const FOREST = "#0A7935";
export const DEEP = "#07642B";
export const CREAM = "#FEFDF8";
export const INK = "#0E1A0F";

// Resolve to the self-hosted next/font families (set on <html> in app/layout.tsx).
// The var() falls back to Georgia/system-ui automatically via globals.css.
export const displayFont = "var(--font-serif)";
export const bodyFont = "var(--font-sans)";

export const TAGLINE = "No One Cares Like EnviroCare";
export const HERITAGE = "Family-owned since 1958 · Fourth generation";

const brand = {
  GREEN,
  GOLD,
  FOREST,
  DEEP,
  CREAM,
  INK,
  displayFont,
  bodyFont,
  TAGLINE,
  HERITAGE,
} as const;

export default brand;
