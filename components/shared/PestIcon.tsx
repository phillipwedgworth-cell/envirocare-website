import type { CSSProperties } from "react";

/**
 * Shared insect / service icon set used across city and service templates.
 * Replaces emoji so the whole site matches the homepage icon system.
 *
 * Accepts either a semantic key ("pest", "termite", ...) OR a legacy emoji
 * (🪵, 🦟, ...) so existing page configs keep working without edits.
 */

type IconKey =
  | "pest"
  | "termite"
  | "mosquito"
  | "tick"
  | "ant"
  | "flea"
  | "roach"
  | "spider"
  | "cricket"
  | "beetle"
  | "earwig"
  | "commercial"
  | "builder"
  | "complete"
  | "doc";

const EMOJI_MAP: Record<string, IconKey> = {
  "🛡️": "pest",
  "🛡": "pest",
  "🪳": "roach",
  "🪵": "termite",
  "🦟": "mosquito",
  "🐾": "tick",
  "🕷️": "spider",
  "🕷": "spider",
  "🐜": "ant",
  "🔥": "ant",
  "🪲": "beetle",
  "🐞": "beetle",
  "🦗": "cricket",
  "🦂": "earwig",
  "🏢": "commercial",
  "🏛️": "commercial",
  "🏛": "commercial",
  "🏗️": "builder",
  "🏗": "builder",
  "📋": "doc",
};

const ACCENT: Record<IconKey, string> = {
  pest: "#C62828",
  termite: "#E0A100",
  mosquito: "#E2711D",
  tick: "#07642B",
  ant: "#DC4A1A",
  flea: "#0E7490",
  roach: "#8A4B2F",
  spider: "#3A3A3A",
  cricket: "#3F7A3F",
  beetle: "#B0451F",
  earwig: "#8A6D2F",
  commercial: "#0E1A0F",
  builder: "#5A6660",
  complete: "#0E8E40",
  doc: "#0A7935",
};

function resolveKey(name: string): IconKey {
  if ((name as IconKey) in ACCENT) return name as IconKey;
  return EMOJI_MAP[name] ?? "pest";
}

function Glyph({ name }: { name: IconKey }) {
  const p = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "pest":
      return (
        <svg {...p}>
          <ellipse cx="12" cy="13" rx="4.5" ry="6.5" />
          <path d="M12 6.5V13" />
          <path d="M9.5 4.5L11 7M14.5 4.5L13 7" />
          <path d="M7.5 9.5L4.5 8M16.5 9.5l3-1.5" />
          <path d="M7.2 13H4M16.8 13H20" />
          <path d="M7.5 16.5L4.5 18.5M16.5 16.5l3 2" />
        </svg>
      );
    case "mosquito":
      return (
        <svg {...p}>
          <path d="M11 7l3.5 8" />
          <path d="M11 7L6 3" />
          <ellipse cx="9.5" cy="9" rx="3.5" ry="2" transform="rotate(28 9.5 9)" />
          <ellipse cx="14" cy="9.5" rx="3.5" ry="2" transform="rotate(28 14 9.5)" />
          <path d="M13.2 13l3 4M14 15l3.5 1.5M12.5 14l1 4" />
        </svg>
      );
    case "tick":
      return (
        <svg {...p}>
          <circle cx="12" cy="13" r="5" />
          <path d="M12 8c0-1.6 .9-2.4 0-2.4S12 6.4 12 8" />
          <path d="M7.5 10L4.5 8.5M7 13H4M7.5 16l-3 1.5" />
          <path d="M16.5 10l3-1.5M17 13h3M16.5 16l3 1.5" />
        </svg>
      );
    case "ant":
      return (
        <svg {...p}>
          <circle cx="12" cy="5.5" r="2" />
          <circle cx="12" cy="10.5" r="2.2" />
          <ellipse cx="12" cy="16.5" rx="2.8" ry="3.5" />
          <path d="M11 4L9.5 2.5M13 4l1.5-1.5" />
          <path d="M10 9.5L6 8M14 9.5l4-1.5M10 11l-4 2M14 11l4 2" />
        </svg>
      );
    case "flea":
      return (
        <svg {...p}>
          <path d="M9 16c0-5 2-9 5.5-9 2 0 3 1.5 3 3.5 0 4-3 6.5-6 6.5" />
          <path d="M9 16h7" />
          <path d="M14.5 7L13 4.5" />
          <path d="M15 15l3 3M11 16l1.5 3" />
        </svg>
      );
    case "roach":
      return (
        <svg {...p}>
          <ellipse cx="12" cy="13" rx="5" ry="7" />
          <path d="M9 4.5L7 2M15 4.5l2-2.5" />
          <path d="M7 11L4 10M17 11l3-1M6.5 14H4M17.5 14H20M7 17l-2.5 1.5M17 17l2.5 1.5" />
        </svg>
      );
    case "spider":
      return (
        <svg {...p}>
          <circle cx="12" cy="13" r="3.5" />
          <circle cx="12" cy="8" r="1.6" />
          <path d="M9 11L4 8M9 13H4M9 15l-4 3" />
          <path d="M15 11l5-3M15 13h5M15 15l4 3" />
        </svg>
      );
    case "cricket":
      return (
        <svg {...p}>
          <path d="M7 14c0-4 2.5-7 6-7s5 2 5 5-2 5-5 5H7z" />
          <path d="M9.5 7L7 3.5M11 7L9 3" />
          <path d="M16 12l3 5M9 16l-3 4" />
        </svg>
      );
    case "beetle":
      return (
        <svg {...p}>
          <ellipse cx="12" cy="13" rx="5" ry="6.5" />
          <path d="M12 6.5V19.5" />
          <circle cx="12" cy="5" r="1.6" />
          <path d="M7 11L4 9.5M7 15l-3 1.5M17 11l3-1.5M17 15l3 1.5" />
        </svg>
      );
    case "earwig":
      return (
        <svg {...p}>
          <ellipse cx="11" cy="11" rx="3.5" ry="5.5" />
          <path d="M11 16.5c0 2 1 3.5 2.5 4.5M11 16.5c0 2-1 3.5-2.5 4.5" />
          <path d="M9 3.5L8 1.5M13 3.5l1-2" />
          <path d="M7.5 9L4.5 8M7.5 13l-3 1" />
        </svg>
      );
    case "termite":
      return (
        <svg {...p}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <ellipse cx="7" cy="12" rx="1.3" ry="3" />
          <path d="M12 6v12M17 6v12" />
        </svg>
      );
    case "complete":
      return (
        <svg {...p}>
          <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "doc":
      return (
        <svg {...p}>
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v4h4" />
          <path d="M10 13h6M10 16h6" />
        </svg>
      );
    case "builder":
      return (
        <svg {...p}>
          <path d="M3 21h18" />
          <path d="M6 21V8l6-4 6 4v13" />
          <path d="M10 21v-5h4v5" />
        </svg>
      );
    case "commercial":
      return (
        <svg {...p}>
          <path d="M3 21h18" />
          <rect x="5" y="3" width="14" height="18" rx="1" />
          <path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

/**
 * Renders a colored, rounded tile containing the icon for the given
 * service/pest. `size` controls the tile dimensions.
 */
export default function PestIcon({
  name,
  size = 48,
  style,
}: {
  name: string;
  size?: number;
  style?: CSSProperties;
}) {
  const key = resolveKey(name);
  const accent = ACCENT[key];
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: size * 0.25,
        background: `${accent}14`,
        color: accent,
        flexShrink: 0,
        ...style,
      }}
    >
      <Glyph name={key} />
    </span>
  );
}
