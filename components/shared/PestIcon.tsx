// components/shared/PestIcon.tsx
// Shared inline-SVG icon set used across city / neighborhood / service pages.
// Replaces emoji-as-icons (🪵 🐜 🦟 🕷️ 🐾 🔥 📞 …) with consistent, brand-colored
// vector glyphs. All icons inherit `color` via currentColor.

import type { CSSProperties } from "react";

export type PestIconName =
  | "pest"      // general shield / pest control
  | "termite"   // wood / termite
  | "ant"       // carpenter & sugar ants
  | "mosquito"  // mosquito
  | "spider"    // spiders / brown recluse
  | "tick"      // ticks / fleas (paw-adjacent)
  | "fireant"   // fire ants
  | "rodent"    // mice / rats
  | "roach"     // cockroaches
  | "wasp"      // wasps / hornets
  | "phone"     // telephone
  | "check"     // checkmark
  | "leaf"      // eco / outdoor
  | "home"      // residential
  | "building"; // commercial

// Map legacy emoji to icon names so migrations are mechanical and consistent.
export const EMOJI_TO_ICON: Record<string, PestIconName> = {
  "🛡️": "pest", "🛡": "pest", "🐛": "pest", "🪲": "roach",
  "🪵": "termite",
  "🐜": "ant",
  "🦟": "mosquito",
  "🕷️": "spider", "🕷": "spider",
  "🐾": "tick", "🪰": "tick",
  "🔥": "fireant",
  "🐭": "rodent", "🐀": "rodent",
  "🪳": "roach",
  "🐝": "wasp", "🐞": "wasp",
  "📞": "phone", "☎️": "phone", "☎": "phone",
  "✅": "check", "✓": "check",
  "🌿": "leaf", "🌻": "leaf",
  "🏠": "home", "🏡": "home",
  "🏢": "building", "🏛️": "building", "🏛": "building", "🏗️": "building", "🏗": "building",
};

// Brand-cohesive, per-pest accent colors (match the homepage service grid).
export const ICON_COLOR: Record<PestIconName, string> = {
  pest: "#0E8E40",
  termite: "#C77A00",
  ant: "#0E8E40",
  mosquito: "#0E7490",
  spider: "#3F6184",
  tick: "#9A5B2E",
  fireant: "#DC4A1A",
  rodent: "#6B4F3A",
  roach: "#7A5A2E",
  wasp: "#C77A00",
  phone: "#0E8E40",
  check: "#0E8E40",
  leaf: "#0E8E40",
  home: "#0A7935",
  building: "#0A7935",
};

const PATHS: Record<PestIconName, JSX.Element> = {
  pest: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3z" />
      <path d="M9.2 11.8l1.9 1.9 3.7-3.9" />
    </>
  ),
  termite: (
    <>
      <ellipse cx="12" cy="12" rx="3.4" ry="6.2" />
      <path d="M12 5.8V3.2M8.8 8.2L6.4 6.6M15.2 8.2l2.4-1.6M8.4 12H5.6M15.6 12h2.8M8.8 15.8l-2.4 1.6M15.2 15.8l2.4 1.6" />
    </>
  ),
  ant: (
    <>
      <circle cx="12" cy="5.5" r="2" />
      <circle cx="12" cy="11.5" r="2.4" />
      <circle cx="12" cy="18" r="2.6" />
      <path d="M10.4 10.2L6.5 8M13.6 10.2L17.5 8M10 16.6l-4-1.4M14 16.6l4-1.4M11 4l-1.6-1.4M13 4l1.6-1.4" />
    </>
  ),
  mosquito: (
    <>
      <circle cx="12" cy="9" r="2.2" />
      <path d="M12 11.2V21M12 21l-2.4-1.8M12 21l2.4-1.8" />
      <path d="M10.4 7.4C7 5 4 5.4 3 6.6M13.6 7.4C17 5 20 5.4 21 6.6" />
      <path d="M10.6 9.2C8 9 5.4 9.8 4 11M13.4 9.2C16 9 18.6 9.8 20 11" />
    </>
  ),
  spider: (
    <>
      <circle cx="12" cy="12" r="2.6" />
      <path d="M9.6 10.6L5 8.4M9.4 12.6L4.6 13.4M9.8 14.4L6 17.6M14.4 10.6L19 8.4M14.6 12.6L19.4 13.4M14.2 14.4L18 17.6M11 9.6L9.6 5.6M13 9.6l1.4-4" />
    </>
  ),
  tick: (
    <>
      <ellipse cx="12" cy="13" rx="4" ry="4.6" />
      <circle cx="12" cy="7.4" r="1.8" />
      <path d="M8.6 11L5.8 9.6M8.2 14l-2.8 1M15.4 11l2.8-1.4M15.8 14l2.8 1" />
    </>
  ),
  fireant: (
    <>
      <path d="M12 3c1.8 2 1.8 3.6.6 5 1.8 1 2.4 3 1.2 4.8C16 13 17 15 16 17.4c1.4-.4 2.4-1.6 2.4-1.6M12 3c-1.8 2-1.8 3.6-.6 5-1.8 1-2.4 3-1.2 4.8C8 13 7 15 8 17.4c-1.4-.4-2.4-1.6-2.4-1.6" />
      <path d="M12 8.2v9.6" />
    </>
  ),
  rodent: (
    <>
      <circle cx="9" cy="13" r="4" />
      <circle cx="6.4" cy="9.4" r="1.8" />
      <circle cx="12" cy="9.4" r="1.8" />
      <path d="M12.8 14.5c3 .3 5.5-.4 6.8-2.2M18 12.4c1.2-.3 1.8-1.2 1.6-2.2" />
      <circle cx="8.4" cy="12.6" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  roach: (
    <>
      <ellipse cx="12" cy="13" rx="3.6" ry="5" />
      <path d="M12 8V4.6M10.4 5.2L8.8 3.4M13.6 5.2l1.6-1.8" />
      <path d="M9 11L5.6 9.4M9 14l-3.6 1M15 11l3.4-1.6M15 14l3.6 1" />
    </>
  ),
  wasp: (
    <>
      <ellipse cx="12" cy="14" rx="2.6" ry="4" />
      <circle cx="12" cy="7.6" r="2" />
      <path d="M12 18v2.4M9.6 6.2C7 5 5 5.4 4 6.6M14.4 6.2C17 5 19 5.4 20 6.6" />
      <path d="M10 12.5h4M10 15h4" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  check: <path d="M20 6L9 17l-5-5" />,
  leaf: (
    <>
      <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 8-4 12-9 12z" />
      <path d="M4 20c4-4 6-7 7-11" />
    </>
  ),
  home: (
    <>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
    </>
  ),
};

export default function PestIcon({
  name,
  size = 28,
  strokeWidth = 1.7,
  className,
  style,
  title,
}: {
  name: PestIconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {PATHS[name]}
    </svg>
  );
}

// Convenience helper: resolve an emoji or icon-name string to a PestIconName.
export function resolveIconName(input: string): PestIconName {
  if (input in EMOJI_TO_ICON) return EMOJI_TO_ICON[input];
  if (PATHS[input as PestIconName]) return input as PestIconName;
  return "pest";
}

// Drop-in replacement for rendering a legacy emoji glyph as a branded SVG tile.
// Used by the city/neighborhood page migration: `{emoji}` -> `<EmojiIcon glyph={emoji} />`.
export function EmojiIcon({
  glyph,
  size = 26,
  tile = true,
}: {
  glyph: string;
  size?: number;
  tile?: boolean;
}) {
  const name = resolveIconName(glyph);
  const color = ICON_COLOR[name];
  if (!tile) return <PestIcon name={name} size={size} style={{ color }} />;
  return (
    <span
      style={{
        width: size + 22,
        height: size + 22,
        borderRadius: 12,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: `${color}14`,
        color,
      }}
    >
      <PestIcon name={name} size={size} />
    </span>
  );
}
