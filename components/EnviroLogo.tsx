// components/EnviroLogo.tsx
// ============================================================================
// SINGLE SOURCE OF TRUTH FOR THE ENVIROCARE LOGO
// ============================================================================
// Why this file exists:
//   Before this component, the logo was rendered ~12 different ways across
//   the site (different widths, heights, props, and CSS). Any new page or
//   tweak risked making the logo "not fit" again. This component ends that.
//
// What this update adds (June 2026):
//   - colorMode prop: "green" (default) or "white"
//   - "green" uses /logo.png — sunflower + green wordmark, for LIGHT backgrounds
//   - "white" uses /logo-white.png — sunflower + WHITE wordmark, for DARK
//     backgrounds (footer, dark hero sections, green banners)
//   - Drop /logo-white.png into the /public folder alongside /logo.png
//   - Existing usages with no colorMode prop continue to render the green
//     variant — fully backward compatible
//
// How it works:
//   - Next.js `width` and `height` are HINTS for image optimization only —
//     they do NOT constrain the rendered display.
//   - Display sizing is controlled by `style.height` using CSS `clamp()`,
//     which gives a minimum/preferred/maximum height that responds to viewport.
//   - `style.width: 'auto'` preserves the source PNG's natural aspect ratio.
//   - `object-fit: contain` guarantees the image is never cropped or squished.
//   - `sizes` tells Next.js which optimized version to serve at each breakpoint.
//   - `priority` keeps the header logo from being lazy-loaded (it's above fold).
//
// Variants:
//   - "nav"      → header/navbar (compact, ~40-56px height)
//   - "footer"   → footer (slightly larger, ~48-64px) — typically colorMode="white"
//   - "hero"     → hero sections if ever needed (~80-120px)
//   - "feedback" → /feedback page header (centered, ~48-64px)
//
// Color modes:
//   - "green" (default) → /logo.png — use on cream, white, light backgrounds
//   - "white"           → /logo-white.png — use on dark/green backgrounds
//
// Usage:
//   import EnviroLogo from "@/components/EnviroLogo";
//   <EnviroLogo variant="nav" />                          // light bg, green wordmark
//   <EnviroLogo variant="footer" colorMode="white" />     // dark footer, white wordmark
//   <EnviroLogo variant="hero" colorMode="white" />       // dark hero, white wordmark
// ============================================================================

import Image from "next/image";
import Link from "next/link";

type Variant = "nav" | "footer" | "hero" | "feedback";
type ColorMode = "green" | "white";

interface EnviroLogoProps {
  variant?: Variant;
  colorMode?: ColorMode;
  href?: string;        // pass empty string "" to render without link wrapper
  className?: string;
}

// Each variant defines: display height range (clamp), max width, optional max height.
// These ranges are deliberately wide so the logo NEVER feels too small or too big
// regardless of which page or screen size.
const VARIANT_STYLES: Record<Variant, React.CSSProperties> = {
  nav: {
    width: "auto",
    height: "clamp(40px, 6vw, 56px)",
    maxWidth: "240px",
    objectFit: "contain"
  },
  footer: {
    width: "auto",
    height: "clamp(44px, 6.5vw, 64px)",
    maxWidth: "280px",
    objectFit: "contain"
  },
  hero: {
    width: "auto",
    height: "clamp(72px, 12vw, 120px)",
    maxWidth: "420px",
    objectFit: "contain"
  },
  feedback: {
    width: "auto",
    height: "clamp(48px, 8vw, 72px)",
    maxWidth: "280px",
    objectFit: "contain"
  }
};

// `sizes` tells Next.js what resolution to request at each viewport width.
// Mobile gets a smaller optimized PNG; desktop gets a larger one.
const VARIANT_SIZES: Record<Variant, string> = {
  nav:      "(max-width: 768px) 180px, 240px",
  footer:   "(max-width: 768px) 200px, 280px",
  hero:     "(max-width: 768px) 320px, 420px",
  feedback: "(max-width: 768px) 220px, 280px"
};

// File paths per color mode. Both files live in /public.
const SRC_BY_COLOR: Record<ColorMode, string> = {
  green: "/logo.png",
  white: "/logo-white.png"
};

export default function EnviroLogo({
  variant = "nav",
  colorMode = "green",
  href = "/",
  className
}: EnviroLogoProps) {
  // width/height here are HINTS to Next.js for picking the right optimized
  // image size — they do NOT control display sizing. Display is set by `style`.
  const img = (
    <Image
      src={SRC_BY_COLOR[colorMode]}
      alt="EnviroCare Pest & Termite Services"
      width={800}
      height={240}
      sizes={VARIANT_SIZES[variant]}
      priority={variant === "nav" || variant === "hero"}
      style={VARIANT_STYLES[variant]}
      className={className}
    />
  );

  // If href is empty string, render bare (no Link wrapper)
  if (href === "") return img;

  return (
    <Link
      href={href}
      style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}
      aria-label="EnviroCare home"
    >
      {img}
    </Link>
  );
}
