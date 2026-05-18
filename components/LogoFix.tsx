/**
 * EnviroCare Logo Sizing Fix
 *
 * Injects CSS rules to size every logo on the site to sensible dimensions
 * across mobile, tablet, and desktop. Caps height and preserves aspect ratio.
 *
 * Targets: header logos, footer logos, nav logos.
 * Leaves alone: hero photos, heritage content images.
 */

export default function LogoFix() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      /* ============================================
         HEADER LOGO - sized for each breakpoint
         ============================================ */
      header img[src*="logo"],
      header img[alt*="EnviroCare" i],
      nav img[src*="logo"],
      nav img[alt*="EnviroCare" i],
      [class*="header"] img[src*="logo"],
      [class*="nav"] img[src*="logo"] {
        height: 48px !important;
        width: auto !important;
        max-width: 200px !important;
        object-fit: contain !important;
        display: block !important;
      }

      @media (min-width: 768px) {
        header img[src*="logo"],
        header img[alt*="EnviroCare" i],
        nav img[src*="logo"],
        nav img[alt*="EnviroCare" i],
        [class*="header"] img[src*="logo"],
        [class*="nav"] img[src*="logo"] {
          height: 56px !important;
          max-width: 240px !important;
        }
      }

      @media (min-width: 1024px) {
        header img[src*="logo"],
        header img[alt*="EnviroCare" i],
        nav img[src*="logo"],
        nav img[alt*="EnviroCare" i],
        [class*="header"] img[src*="logo"],
        [class*="nav"] img[src*="logo"] {
          height: 64px !important;
          max-width: 280px !important;
        }
      }

      /* ============================================
         MOBILE - tighten further on small phones
         ============================================ */
      @media (max-width: 480px) {
        header img[src*="logo"],
        header img[alt*="EnviroCare" i],
        nav img[src*="logo"],
        nav img[alt*="EnviroCare" i],
        [class*="header"] img[src*="logo"],
        [class*="nav"] img[src*="logo"] {
          height: 42px !important;
          max-width: 170px !important;
        }
      }

      /* ============================================
         FOOTER LOGO
         ============================================ */
      footer img[src*="logo"],
      footer img[alt*="EnviroCare" i],
      [class*="footer"] img[src*="logo"] {
        height: 56px !important;
        width: auto !important;
        max-width: 220px !important;
        object-fit: contain !important;
      }

      /* ============================================
         UNIVERSAL SAFETY NET
         no logo overflows its container, ever
         ============================================ */
      img[src*="logo"] {
        max-width: 100% !important;
      }

      /* ============================================
         BOTTOM PADDING for sticky call button on mobile
         so it doesn't cover footer content
         ============================================ */
      @media (max-width: 899px) {
        body {
          padding-bottom: 80px;
        }
        footer {
          padding-bottom: 24px !important;
        }
      }
    ` }} />
  );
}
