// lib/brand.ts — EnviroCare locked design tokens (single source of truth).
// Locked by Phillip 2026-06-10. Do not introduce greens/fonts outside this set.

export const GREEN = "#0E8E40";
export const GOLD = "#F5A800";
export const FOREST = "#0A7935";
export const DEEP = "#07642B";
export const CREAM = "#FEFDF8";
export const INK = "#0E1A0F";

export const displayFont = "'Playfair Display', Georgia, serif";
export const bodyFont = "'DM Sans', system-ui, -apple-system, sans-serif";

export const TAGLINE = "No One Cares Like EnviroCare";
export const HERITAGE = "Family-owned since 1958 · Third generation";

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
