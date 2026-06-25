// components/shared/BrandBand.tsx — slim signature strip rendered near the top
// of every interior page. The per-page EnviroCare identifier: sunflower mark +
// tagline + heritage line. Server component, no interactivity.

import { GREEN, GOLD, CREAM, INK, displayFont, bodyFont, TAGLINE, HERITAGE } from "@/lib/brand";

export default function BrandBand() {
  return (
    <div
      style={{
        background: CREAM,
        borderTop: `3px solid ${GOLD}`,
        borderBottom: "1px solid rgba(14,26,15,0.08)",
        padding: "10px clamp(16px,5vw,64px)",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          flexWrap: "wrap",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: displayFont,
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: 15,
            color: INK,
            letterSpacing: "0.01em",
          }}
        >
          {TAGLINE}
        </span>
        <span aria-hidden="true" style={{ color: GREEN, opacity: 0.5 }}>·</span>
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: 12.5,
            fontWeight: 600,
            color: GREEN,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {HERITAGE}
        </span>
      </div>
    </div>
  );
}
