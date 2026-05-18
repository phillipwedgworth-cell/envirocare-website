/**
 * Simplified site-wide CSS injection
 *
 * The new Homepage.tsx handles its own logo sizing perfectly.
 * This file now just adds the mobile bottom-padding so the
 * sticky call button doesn't cover footer content.
 */

export default function LogoFix() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      /* Bottom padding for sticky mobile call button */
      @media (max-width: 899px) {
        body { padding-bottom: 88px !important; }
        footer { padding-bottom: 24px !important; }
      }

      /* Safety: prevent any header from overflowing viewport */
      header { max-width: 100vw; overflow-x: hidden; }

      /* Help: ensure logo images never break their containers */
      img[src*="logo"] {
        max-height: 64px;
        max-width: 100%;
        object-fit: contain;
      }
    ` }} />
  );
}
