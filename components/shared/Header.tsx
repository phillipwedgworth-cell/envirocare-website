// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: components/shared/Header.tsx
// Commit: fix(header): Auburn/Opelika call button dials the direct Auburn line
// Push: main
// ──────────────────────────────────────

"use client";


/**
 * Header — single SITEWIDE sticky header (rendered once in app/layout.tsx).
 * Custom EnviroCare identity (NOT a v0 template): /logo.png sunflower + Playfair
 * wordmark, "Family-Owned · Since 1958" microline, green (#0A7935) + gold (#F5A800)
 * accents, gold hover. Top bar = three cohesive controls only:
 *   [logo]  ……  [Ask an Expert (→Scout)] [Call (primary green)] [☰ Menu]
 * Everything else (Services, Service Areas, Pest Library, Pricing, About, Reviews,
 * Contact, Customer Login) lives in the hamburger. On phones the top bar is just
 * [logo] [Call] [Menu] — Ask an Expert + Get a Free Quote move into the menu, and
 * Scout also has a floating chat bubble (ChatWidget). Ask still dispatches
 * ec:open-scout, which ChatWidget listens for.
 */

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone, Menu, X, Sparkles, User, Flower2 } from "lucide-react";
import { phoneForPath } from "../../data/city-offices";

const PAY_BILL_URL = "https://payenvirocare.key7app.com/User/Login";

function openScout(message?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("ec:open-scout", { detail: { message } }));
  }
}

const MENU_LINKS: [string, string][] = [
  ["Services", "/services"],
  ["What's Bugging You?", "/what-pest-problem"],
  ["Service Areas", "/service-areas"],
  ["Pest Library", "/pest-library"],
  ["Pest Tips & Blog", "/blog"],
  ["Pricing", "/pricing"],
  ["About", "/about-us"],
  ["Reviews", "/reviews"],
  ["Contact", "/contact-us"],
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // PER-MARKET CALL BUTTON: a Huntsville or Lake Martin visitor should reach the
  // office that actually serves them, not the Birmingham main line. Service
  // cities with their own local line (Auburn/Opelika) dial that number, matching
  // what their page copy advertises. Unmapped routes fall back to Birmingham —
  // the previous sitewide behavior.
  const pathname = usePathname();
  const office = phoneForPath(pathname ?? "/");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  return (
    <div className="sh-shell" data-scrolled={scrolled}>
      <style dangerouslySetInnerHTML={{ __html: SH_CSS }} />

      {/* SITEWIDE ROTATING BANNER — trust strip above nav */}
      <div className="sh-banner" aria-label="Company highlights">
        <div className="sh-banner-inner">
          <Flower2 size={14} className="sh-banner-sun" aria-hidden="true" />
          <div className="sh-banner-rotator" aria-live="off">
            <span className="sh-banner-msg"><span className="sh-banner-gold">Family-owned since 1958</span> · Four generations of the Wedgworth family</span>
            <span className="sh-banner-msg"><span className="sh-banner-gold">Sentricon® termite protection</span> · Up to $1M repair coverage · No drilling</span>
            <span className="sh-banner-msg"><span className="sh-banner-gold">Realtors &amp; closings:</span> WDO inspection letters · Fast, lender-ready turnaround</span>
          </div>
        </div>
      </div>

      <header className="sh-header">
        <div className="sh-inner">
          {/* BRAND: sunflower logo + 1958 microline */}
          <Link href="/" className="sh-brand" aria-label="EnviroCare — home">
            <Image src="/logo.png" alt="EnviroCare Pest & Termite Services" width={260} height={68} className="sh-logo" priority />
            <span className="sh-tagline">Family-Owned <span className="sh-tagline-dot">·</span> Since 1958</span>
          </Link>

          {/* CONTROLS: Ask an Expert / Pay Bill / Get Free Quote / Call / Menu */}
          <div className="sh-actions">
            <button type="button" className="sh-ask" onClick={() => openScout()}>
              <Sparkles size={16} aria-hidden="true" /> <span>Ask an Expert</span>
            </button>
            <a href={PAY_BILL_URL} target="_blank" rel="noopener noreferrer" className="sh-pay">
              <span>Pay Bill</span>
            </a>
            <Link href="/request-quote" className="sh-quote">
              <span className="sh-quote-full">Get Free{' '}</span><span>Quote</span>
            </Link>
            <a href={office.phoneHref} className="sh-call" aria-label={`Call EnviroCare ${office.label} at ${office.phone}`}>
              <Phone size={16} aria-hidden="true" /> <span className="sh-call-num">{office.phone}</span><span className="sh-call-word">Call</span>
            </a>
            <button type="button" className="sh-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen} aria-controls="sh-menu-panel">
              <Menu size={20} aria-hidden="true" /> <span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* HAMBURGER PANEL — holds ALL nav + Customer Login */}
      <div className={`sh-overlay${menuOpen ? " sh-overlay-open" : ""}`} id="sh-menu-panel" role="dialog" aria-modal="true" aria-label="Site menu" onClick={() => setMenuOpen(false)}>
        <nav className="sh-panel" onClick={(e) => e.stopPropagation()} aria-label="Full navigation">
          <div className="sh-panel-top">
            <span className="sh-panel-mark" aria-hidden="true">✿</span>
            <span className="sh-panel-eyebrow">EnviroCare · Since 1958</span>
            <button type="button" className="sh-panel-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={22} /></button>
          </div>
          <div className="sh-panel-links">
            {MENU_LINKS.map(([label, href]) => (
              <Link key={href} href={href} className="sh-panel-link" onClick={() => setMenuOpen(false)}>{label}</Link>
            ))}
          </div>
          <div className="sh-panel-cta">
            <Link href="/request-quote" className="sh-panel-quote" onClick={() => setMenuOpen(false)}>Get a Free Quote</Link>
            <button type="button" className="sh-panel-ask" onClick={() => { setMenuOpen(false); openScout(); }}>
              <Sparkles size={16} aria-hidden="true" /> Ask an Expert
            </button>
          </div>
          <a href={PAY_BILL_URL} target="_blank" rel="noopener noreferrer" className="sh-panel-login" onClick={() => setMenuOpen(false)}>
            <User size={17} aria-hidden="true" /> Customer Login
          </a>
          <div className="sh-panel-foot">Family-Owned · Fourth Generation · Birmingham · Lake Martin · Huntsville</div>
        </nav>
      </div>
    </div>
  );
}

const SH_CSS = `
  .sh-shell { position: sticky; top: 0; z-index: 100; font-family: var(--font-sans), system-ui, sans-serif; }
  .sh-header {
    background: #fff;
    border-bottom: 1px solid #E6E0D2;
    box-shadow: 0 1px 0 rgba(14,26,15,0.04);
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
  }
  .sh-shell[data-scrolled="true"] .sh-header { box-shadow: 0 6px 24px rgba(14,26,15,0.10); border-bottom-color: rgba(245,168,0,0.45); }
  .sh-inner { max-width: 1240px; margin: 0 auto; padding: 10px clamp(16px,4vw,32px); display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 76px; }

  /* BRAND */
  .sh-brand { display: inline-flex; flex-direction: column; gap: 3px; flex-shrink: 0; text-decoration: none; }
  .sh-logo { height: 56px !important; width: auto !important; max-width: 230px !important; object-fit: contain !important; display: block !important; }
  .sh-tagline { font-family: var(--font-serif), Georgia, serif; font-style: italic; font-size: 12px; color: #0A7935; letter-spacing: 0.01em; padding-left: 2px; }
  .sh-tagline-dot { color: #F5A800; font-style: normal; font-weight: 700; }

  /* CONTROLS — one cohesive style, matching height, rounded, even spacing */
  .sh-actions { display: inline-flex; align-items: center; gap: 10px; }
  .sh-ask, .sh-pay, .sh-quote, .sh-call, .sh-menu {
    display: inline-flex; align-items: center; justify-content: center; gap: 7px;
    height: 44px; padding: 0 18px; border-radius: 999px;
    font-family: inherit; font-size: 14.5px; font-weight: 700; line-height: 1;
    white-space: nowrap; text-decoration: none; cursor: pointer;
    transition: background 0.15s, color 0.15s, border-color 0.15s, box-shadow 0.15s, transform 0.1s;
  }
  /* Ask an Expert — clear green-outline button (well-contrasted), gold sparkle */
  .sh-ask { background: #fff; color: #0A7935; border: 1.5px solid #0A7935; }
  .sh-ask svg { color: #F5A800; }
  .sh-ask:hover { background: #F0F9F3; border-color: #F5A800; }
  /* Call — PRIMARY solid EnviroCare green */
  .sh-call { background: #0A7935; color: #fff !important; border: 1.5px solid #0A7935; box-shadow: 0 4px 14px rgba(10,121,53,0.30); }
  .sh-call:hover { background: #086A2E; transform: translateY(-1px); }
  .sh-call-word { display: none; }
  /* Menu — subtle, gold-accent hover */
  .sh-menu { background: #fff; color: #0E1A0F; border: 1.5px solid #E0DACE; }
  .sh-menu:hover { border-color: #F5A800; color: #0A7935; }
  /* Pay Bill - subtle outline, same family as Menu */
  .sh-pay { background: #fff; color: #0E1A0F; border: 1.5px solid #E0DACE; }
  .sh-pay:hover { border-color: #F5A800; color: #0A7935; }
  /* Get Free Quote - PRIMARY lead CTA, solid gold */
  .sh-quote { background: #F5A800; color: #0E1A0F !important; border: 1.5px solid #F5A800; box-shadow: 0 4px 14px rgba(245,168,0,0.32); }
  .sh-quote:hover { background: #E89C00; border-color: #E89C00; transform: translateY(-1px); }

  /* Responsive */
  @media (max-width: 980px) {
    .sh-pay { display: none; }   /* Pay Bill folds into the menu (Customer Login) */
  }
  @media (max-width: 720px) {
    .sh-inner { min-height: 64px; }
    .sh-logo { height: 44px !important; max-width: 170px !important; }
    /* Declutter: Ask an Expert -> chat bubble + menu; Get Quote -> menu. Top bar = logo + Call + Menu. */
    .sh-ask, .sh-quote { display: none; }
    .sh-menu span { display: none; }                     /* icon-only Menu on phones */
    .sh-menu { height: 42px; padding: 0 12px; gap: 0; }
    .sh-call { height: 42px; padding: 0 16px; gap: 7px; }
  }
  @media (max-width: 560px) {
    .sh-quote-full { display: none; }
    .sh-actions { gap: 7px; }
  }
  @media (max-width: 420px) {
    .sh-call-num { display: none; }
    .sh-call-word { display: inline; }
    .sh-tagline { font-size: 11px; }
  }

  /* HAMBURGER OVERLAY + PANEL */
  .sh-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(14,26,15,0.45); opacity: 0; visibility: hidden; transition: opacity 0.25s ease, visibility 0.25s ease; }
  .sh-overlay-open { opacity: 1; visibility: visible; }
  .sh-panel {
    position: absolute; top: 0; right: 0; height: 100%; width: min(380px, 88vw);
    background: #FEFDF8; box-shadow: -16px 0 48px rgba(14,26,15,0.22);
    display: flex; flex-direction: column; padding: 18px 22px 26px;
    transform: translateX(100%); transition: transform 0.28s cubic-bezier(0.16,1,0.3,1);
    border-left: 4px solid #F5A800;
  }
  .sh-overlay-open .sh-panel { transform: translateX(0); }
  .sh-panel-top { display: flex; align-items: center; gap: 10px; padding-bottom: 16px; border-bottom: 1px solid rgba(10,121,53,0.14); margin-bottom: 10px; }
  .sh-panel-mark { color: #F5A800; font-size: 20px; line-height: 1; }
  .sh-panel-eyebrow { font-family: var(--font-serif), Georgia, serif; font-style: italic; font-size: 14px; color: #0A7935; font-weight: 700; }
  .sh-panel-close { margin-left: auto; width: 40px; height: 40px; border-radius: 10px; border: 1px solid #E0DACE; background: #fff; color: #0E1A0F; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
  .sh-panel-close:hover { border-color: #F5A800; color: #0A7935; }
  .sh-panel-links { display: flex; flex-direction: column; padding: 6px 0; }
  .sh-panel-link {
    font-family: var(--font-serif), Georgia, serif; font-size: 22px; font-weight: 700; color: #0E1A0F;
    text-decoration: none; padding: 12px 2px; border-bottom: 1px solid rgba(14,26,15,0.06);
    transition: color 0.15s, padding-left 0.2s; position: relative;
  }
  .sh-panel-link:hover { color: #0A7935; padding-left: 8px; }
  .sh-panel-link:hover::after { content: ""; position: absolute; left: 0; bottom: 8px; width: 22px; height: 3px; background: #F5A800; border-radius: 2px; }
  .sh-panel-login {
    margin-top: 18px; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 18px; border-radius: 999px; background: #0A7935; color: #fff !important;
    font-weight: 700; font-size: 15px; text-decoration: none; box-shadow: 0 4px 14px rgba(10,121,53,0.28);
  }
  .sh-panel-login:hover { background: #086A2E; }
  /* Mobile-only quick actions inside the menu (desktop header already shows these) */
  .sh-panel-cta { display: flex; flex-direction: column; gap: 10px; margin-top: 16px; }
  .sh-panel-quote {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 14px 18px; border-radius: 999px; background: #F5A800; color: #0E1A0F !important;
    font-weight: 800; font-size: 16px; text-decoration: none; box-shadow: 0 4px 14px rgba(245,168,0,0.32);
  }
  .sh-panel-quote:hover { background: #E89C00; }
  .sh-panel-ask {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 12px 18px; border-radius: 999px; background: #fff; color: #0A7935;
    border: 1.5px solid #0A7935; font-weight: 700; font-size: 15px; cursor: pointer; font-family: inherit;
  }
  .sh-panel-ask svg { color: #F5A800; }
  .sh-panel-ask:hover { background: #F0F9F3; border-color: #F5A800; }
  @media (min-width: 721px) { .sh-panel-cta { display: none; } }
  .sh-panel-foot { margin-top: auto; padding-top: 18px; font-size: 11.5px; color: #6b7d70; line-height: 1.5; }

  /* ── Sitewide rotating banner ── */
  .sh-banner {
    background: linear-gradient(135deg, #0A7935 0%, #07642B 100%);
    color: #fff; text-align: center; font-size: 13px; font-weight: 500;
    font-family: var(--font-sans), system-ui, sans-serif;
    padding: 7px 16px; overflow: hidden; position: relative;
  }
  .sh-banner-inner { display: flex; align-items: center; justify-content: center; gap: 8px; }
  .sh-banner-sun { color: #F5A800; flex-shrink: 0; }
  .sh-banner-gold { color: #F5A800; font-weight: 700; }
  .sh-banner-rotator {
    display: inline-flex; flex-direction: column; height: 1.4em; overflow: hidden;
    animation: sh-banner-scroll 12s cubic-bezier(0.4,0,0.2,1) infinite;
  }
  .sh-banner-msg { white-space: nowrap; height: 1.4em; line-height: 1.4em; }
  @keyframes sh-banner-scroll {
    0%, 28%   { transform: translateY(0); }
    33%, 61%  { transform: translateY(-1.4em); }
    66%, 94%  { transform: translateY(-2.8em); }
    100%      { transform: translateY(0); }
  }
  @media (max-width: 600px) {
    .sh-banner { font-size: 11.5px; padding: 6px 12px; }
  }
`;
