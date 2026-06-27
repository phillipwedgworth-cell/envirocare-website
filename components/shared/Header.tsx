"use client";

/**
 * Header — single SITEWIDE sticky header (rendered once in app/layout.tsx).
 * Design ported from the v0 "website-redesign-inspiration" SiteHeader
 * (per Phillip 2026-06-27): collapsing utility bar, pinned main nav, "Ask an
 * Expert" AI CTA. Self-contained with sh-* prefixed classes so it can never
 * collide with page-level ec-* CSS. Keeps the existing /logo.png (no swap).
 */

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Phone, Menu, X, Flower2, User } from "lucide-react";

const PAY_BILL_URL = "https://payenvirocare.key7app.com/User/Login";
const QUOTE_PROMPT = "I'd like a free quote. Can you help me get started?";

// Opens the floating Scout AI assistant (ChatWidget listens for ec:open-scout).
function openScout(message?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("ec:open-scout", { detail: { message } }));
  }
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="sh-shell" data-scrolled={scrolled}>
      <style dangerouslySetInnerHTML={{ __html: SH_CSS }} />

      {/* UTILITY BAR — desktop only; collapses on scroll */}
      <div className="sh-utility" aria-hidden={scrolled}>
        <div className="sh-utility-inner">
          <div className="sh-utility-desktop">
            <div className="sh-banner-rotator" aria-live="off">
              <span className="sh-banner-msg"><Flower2 size={13} className="sh-banner-sun" aria-hidden="true" /> <span className="sh-banner-gold">Family-owned since 1958</span> · Four generations of the Wedgworth family</span>
              <span className="sh-banner-msg"><Flower2 size={13} className="sh-banner-sun" aria-hidden="true" /> <span className="sh-banner-gold">Sentricon® termite protection</span> · Up to $1M repair coverage · No drilling</span>
              <span className="sh-banner-msg"><Flower2 size={13} className="sh-banner-sun" aria-hidden="true" /> <span className="sh-banner-gold">Realtors &amp; closings:</span> WDO inspection letters · Fast, lender-ready turnaround</span>
            </div>
            <div className="sh-utility-right">
              <a href={PAY_BILL_URL} target="_blank" rel="noopener noreferrer" className="sh-util-link">
                <User size={14} aria-hidden="true" /> Customer Login
              </a>
              <span className="sh-util-sep" aria-hidden="true" />
              <a href="tel:2059406360" className="sh-util-link"><Phone size={13} aria-hidden="true" /> (205) 940-6360</a>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER — pinned */}
      <header className="sh-header">
        <div className="sh-header-inner">
          <Link href="/" className="sh-brand" aria-label="EnviroCare home">
            <Image src="/logo.png" alt="EnviroCare Pest & Termite Services" width={280} height={72} className="sh-brand-logo" priority />
          </Link>

          <nav className="sh-nav" aria-label="Main navigation">
            <Link href="/services/pest-control">Services</Link>
            <Link href="/service-areas">Service Areas</Link>
            <Link href="/pest-library">Pest Library</Link>
            <Link href="/quote">Pricing</Link>
            <Link href="/about-us">About</Link>
            <Link href="/reviews">Reviews</Link>
            <Link href="/contact-us">Contact</Link>
          </nav>

          <div className="sh-header-cta">
            <a href={PAY_BILL_URL} target="_blank" rel="noopener noreferrer" className="sh-header-pay">Pay Bill</a>
            <a href="tel:2059406360" className="sh-header-phone">
              <Phone size={14} className="sh-phone-icon" aria-hidden="true" />
              <span>(205) 940-6360</span>
            </a>
            <button type="button" className="sh-header-quote" onClick={() => openScout(QUOTE_PROMPT)}>Ask an Expert</button>
          </div>

          <div className="sh-header-mobile-actions">
            <a href={PAY_BILL_URL} target="_blank" rel="noopener noreferrer" className="sh-header-login-btn" aria-label="Customer Login">
              <User size={18} aria-hidden="true" /><span>Log In</span>
            </a>
            <a href="tel:2059406360" className="sh-header-icon-btn" aria-label="Call EnviroCare"><Phone size={19} aria-hidden="true" /></a>
            <button type="button" className="sh-header-quote-sm" onClick={() => openScout(QUOTE_PROMPT)}>Ask an Expert</button>
            <button type="button" className="sh-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" aria-expanded={mobileOpen} aria-controls="sh-mobile-menu">
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="sh-mobile-menu" id="sh-mobile-menu">
            <Link href="/services/pest-control" onClick={() => setMobileOpen(false)}>Services</Link>
            <Link href="/service-areas" onClick={() => setMobileOpen(false)}>Service Areas</Link>
            <Link href="/pest-library" onClick={() => setMobileOpen(false)}>Pest Library</Link>
            <Link href="/quote" onClick={() => setMobileOpen(false)}>Pricing</Link>
            <Link href="/about-us" onClick={() => setMobileOpen(false)}>About</Link>
            <Link href="/reviews" onClick={() => setMobileOpen(false)}>Reviews</Link>
            <Link href="/contact-us" onClick={() => setMobileOpen(false)}>Contact</Link>
            <a href={PAY_BILL_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>Customer Login</a>
            <a href="tel:2059406360" onClick={() => setMobileOpen(false)} className="sh-mobile-phone"><Phone size={15} aria-hidden="true" /> (205) 940-6360</a>
            <button type="button" className="sh-mobile-cta" onClick={() => { setMobileOpen(false); openScout(QUOTE_PROMPT); }}>Talk to an Expert →</button>
          </div>
        )}
      </header>
    </div>
  );
}

const SH_CSS = `
  .sh-shell { position: sticky; top: 0; z-index: 100; font-family: var(--font-sans), system-ui, sans-serif; }

  .sh-utility {
    display: none;
    background: linear-gradient(90deg, #07642B 0%, #0A7935 50%, #07642B 100%);
    color: #fff; overflow: hidden; max-height: 46px; opacity: 1;
    border-bottom: 1px solid rgba(255,255,255,0.12);
    transition: max-height 0.3s ease, opacity 0.22s ease;
  }
  .sh-shell[data-scrolled="true"] .sh-utility { max-height: 0; opacity: 0; border-bottom-color: transparent; }
  .sh-utility-inner { max-width: 1280px; margin: 0 auto; padding: 0 20px; }
  .sh-utility-desktop { display: none; align-items: center; justify-content: space-between; gap: 18px; height: 46px; font-size: 13px; }
  .sh-utility-right { display: inline-flex; align-items: center; gap: 14px; flex: none; }
  .sh-util-link { display: inline-flex; align-items: center; gap: 6px; color: #fff !important; font-weight: 600; font-size: 13px; text-decoration: none; transition: color 0.15s; }
  .sh-util-link:hover { color: #F5A800 !important; }
  .sh-util-sep { width: 1px; height: 16px; background: rgba(255,255,255,0.28); display: inline-block; }
  @media (min-width: 1024px) { .sh-utility { display: block; } .sh-utility-desktop { display: flex; } }

  .sh-banner-sun { flex: none; color: #F5A800; vertical-align: -2px; }
  .sh-banner-gold { color: #F5A800; font-weight: 600; }
  .sh-banner-rotator { position: relative; height: 46px; overflow: hidden; flex: 1 1 auto; }
  .sh-banner-msg { position: absolute; inset: 0; display: flex; align-items: center; justify-content: flex-start; gap: 6px; white-space: nowrap; opacity: 0; animation: sh-banner-cycle 15s infinite; }
  .sh-banner-msg:nth-child(2) { animation-delay: 5s; }
  .sh-banner-msg:nth-child(3) { animation-delay: 10s; }
  @keyframes sh-banner-cycle {
    0% { opacity: 0; transform: translateY(8px); }
    4% { opacity: 1; transform: translateY(0); }
    30% { opacity: 1; transform: translateY(0); }
    34% { opacity: 0; transform: translateY(-8px); }
    100% { opacity: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .sh-banner-msg { animation: none; }
    .sh-banner-msg:first-child { opacity: 1; position: static; }
    .sh-banner-msg:nth-child(2), .sh-banner-msg:nth-child(3) { display: none; }
  }

  .sh-header {
    background: #fff; border-bottom: 1px solid #E8E2D8; box-shadow: 0 1px 0 rgba(14,26,15,0.04);
    max-width: 100vw; overflow-x: hidden; transition: box-shadow 0.2s ease;
  }
  .sh-shell[data-scrolled="true"] .sh-header { box-shadow: 0 4px 22px rgba(14,26,15,0.08); border-bottom-color: rgba(14,142,64,0.18); }
  .sh-header-inner { max-width: 1280px; margin: 0 auto; padding: 12px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
  .sh-brand { display: inline-flex; align-items: center; flex-shrink: 0; max-height: 72px; }
  .sh-brand-logo { height: 64px !important; width: auto !important; max-width: 240px !important; object-fit: contain !important; display: block !important; }
  @media (max-width: 480px) {
    .sh-header-inner { padding: 8px 16px; }
    .sh-brand { max-height: 48px; }
    .sh-brand-logo { height: 44px !important; max-width: 168px !important; }
    .sh-mobile-toggle { width: 38px; height: 38px; font-size: 20px; }
  }

  .sh-nav { display: none; gap: 24px; font-size: 15px; font-weight: 500; }
  .sh-nav a { color: #1A2620; text-decoration: none; transition: color 0.15s; white-space: nowrap; }
  .sh-nav a:hover { color: #0E8E40; }

  .sh-header-cta { display: none; align-items: center; gap: 10px; }
  .sh-header-pay { font-size: 14px; font-weight: 600; color: #5A6660 !important; text-decoration: none; padding: 8px 14px; border-radius: 999px; border: 1px solid #E8E2D8; transition: all 0.15s; }
  .sh-header-pay:hover { color: #0E8E40 !important; border-color: #0E8E40; }
  .sh-header-phone { display: inline-flex; align-items: center; gap: 6px; padding: 10px 18px; border-radius: 999px; border: 1.5px solid #0E8E40; color: #0E8E40 !important; text-decoration: none; font-weight: 700; font-size: 15px; transition: all 0.15s; min-height: 42px; }
  .sh-header-phone:hover { background: #E8F5EE; border-color: #0A7935; }
  .sh-header-quote { padding: 10px 20px; background: #0E8E40; color: #fff !important; border: none; cursor: pointer; border-radius: 999px; font-weight: 700; font-size: 14px; font-family: inherit; box-shadow: 0 4px 14px rgba(14,142,64,0.28); transition: background 0.15s, transform 0.15s; }
  .sh-header-quote:hover { background: #0A7935; transform: translateY(-1px); }

  .sh-header-mobile-actions { display: flex; align-items: center; gap: 6px; }
  .sh-header-login-btn { display: inline-flex; align-items: center; gap: 5px; height: 38px; padding: 0 10px; border-radius: 10px; border: 1px solid #E8E2D8; background: #fff; color: #0A7935 !important; text-decoration: none; font-weight: 700; font-size: 12px; flex: none; white-space: nowrap; }
  .sh-header-login-btn:active { background: #F4F8F2; }
  .sh-header-icon-btn { display: inline-flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 10px; border: 1px solid #E8E2D8; background: #fff; color: #0A7935 !important; text-decoration: none; flex: none; }
  .sh-header-quote-sm { background: #0E8E40; color: #fff !important; border: none; cursor: pointer; border-radius: 999px; padding: 9px 13px; font-weight: 700; font-size: 12.5px; font-family: inherit; white-space: nowrap; box-shadow: 0 3px 12px rgba(14,142,64,0.26); }
  @media (max-width: 400px) {
    .sh-header-login-btn span { display: none; }
    .sh-header-login-btn { width: 38px; padding: 0; justify-content: center; gap: 0; }
  }
  @media (min-width: 1024px) { .sh-header-mobile-actions { display: none; } }

  .sh-mobile-toggle { background: transparent; border: 1px solid #E8E2D8; border-radius: 8px; width: 40px; height: 40px; font-size: 22px; color: #0E1A0F; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
  .sh-mobile-menu { display: flex; flex-direction: column; gap: 4px; padding: 12px 20px 20px; border-top: 1px solid #E8E2D8; background: #fff; }
  .sh-mobile-menu a { padding: 12px 8px; font-size: 16px; font-weight: 500; color: #1A2620; text-decoration: none; border-bottom: 1px solid #F1F5F2; display: inline-flex; align-items: center; gap: 6px; }
  .sh-mobile-cta { margin-top: 8px; padding: 14px 20px; background: #F5A800; color: #0E1A0F !important; border: none; cursor: pointer; border-radius: 999px; text-align: center; font-weight: 700; font-size: 16px; font-family: inherit; }
  @media (min-width: 1024px) {
    .sh-nav, .sh-header-cta { display: flex; }
    .sh-mobile-toggle, .sh-header-mobile-actions { display: none; }
    .sh-mobile-menu { display: none !important; }
  }
`;
