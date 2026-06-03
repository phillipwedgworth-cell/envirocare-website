"use client";

import { useEffect, useState } from "react";
import { Phone, ArrowRight } from "lucide-react";

// When the customer payment portal goes live, change this single value.
// Example: "https://pay.envirocarellc.com" or whatever URL the vendor gives you.
export const PAYMENT_PORTAL_URL = "/pay";

const G = "#0E8E40";
const GOLD = "#F5A800";
const DARK = "#0E1A0F";

const sf = { fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif" };

const NAV_LINKS: [string, string][] = [
  ["Services", "/services/pest-control"],
  ["Lake Martin", "/lake-martin"],
  ["Pricing", "/quote"],
  ["About", "/about-us"],
];

const OVERLAY_LINKS: [string, string, boolean][] = [
  ["Services", "/services/pest-control", false],
  ["Lake Martin", "/lake-martin", true],
  ["Pricing", "/quote", false],
  ["About", "/about-us", false],
  ["Specials", "/special-offers", false],
  ["Contact", "/contact-us", false],
];

const OFFICES = [
  { name: "Birmingham", phone: "(205) 940-6360", tel: "2059406360" },
  { name: "Lake Martin · Alex City", phone: "(256) 234-6162", tel: "2562346162" },
  { name: "Huntsville", phone: "(256) 937-7676", tel: "2569377676" },
];

export default function Header({ showTopBar = true }: { showTopBar?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.classList.add("ec-menu-locked");
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.classList.remove("ec-menu-locked"); window.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  return (
    <>
      {/* MOBILE OVERLAY MENU */}
      <div id="ec-mobile-menu" className="ec-menu-overlay" data-open={menuOpen} role="dialog" aria-modal="true" aria-label="Site menu">
        <div className="ec-menu-bar">
          <a href="/" onClick={() => setMenuOpen(false)} aria-label="EnviroCare home">
            <img src="/logo.png" alt="EnviroCare" width={220} height={85} style={{ width: 200, height: "auto", display: "block" }} />
          </a>
          <button type="button" className="ec-menu-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0E1A0F" strokeWidth="2.2" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
          </button>
        </div>
        <div className="ec-menu-body">
          {OVERLAY_LINKS.map(([label, href, italic]) => (
            <a key={label} href={href} className="ec-menu-link" onClick={() => setMenuOpen(false)}>
              {italic ? <em>{label}</em> : label}
              <span className="ec-menu-arrow">→</span>
            </a>
          ))}

          <a href={PAYMENT_PORTAL_URL} className="ec-menu-pay" onClick={() => setMenuOpen(false)}>
            <span>Pay My Bill <span className="ec-menu-pay-sub" style={{ display: "block", marginTop: 2 }}>Customer Portal</span></span>
            <ArrowRight size={20} />
          </a>
          <a href="/quote" className="ec-menu-quote" onClick={() => setMenuOpen(false)}>Get a Free Quote <ArrowRight size={18} /></a>

          <div className="ec-menu-offices">
            <div className="ec-menu-offices-label">Call Your Local Office</div>
            {OFFICES.map(o => (
              <a key={o.tel} href={`tel:${o.tel}`} className="ec-menu-office">
                <span className="ec-menu-office-name">{o.name}</span>
                <span className="ec-menu-office-phone">{o.phone}</span>
              </a>
            ))}
          </div>

          <div className="ec-menu-foot">
            <span className="ec-menu-foot-dot ec-pulse-dot" /> Available Today · Same-Day Service
          </div>
        </div>
      </div>

      {/* TOP PHONE BAR */}
      {showTopBar && (
        <div style={{ background: DARK, color: "#FBC51A", fontSize: 12, padding: "9px 24px", display: "flex", justifyContent: "center", gap: 22, flexWrap: "wrap", letterSpacing: "0.04em", fontWeight: 500, ...sf }}>
          <span>Birmingham <strong style={{ color: "#fff" }}>(205) 940-6360</strong></span>
          <span style={{ color: "#2EAA61", opacity: 0.7 }}>·</span>
          <span>Lake Martin <strong style={{ color: "#fff" }}>(256) 234-6162</strong></span>
          <span style={{ color: "#2EAA61", opacity: 0.7 }}>·</span>
          <span>Huntsville <strong style={{ color: "#fff" }}>(256) 937-7676</strong></span>
        </div>
      )}

      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(14px)", borderBottom: `1px solid ${scrolled ? "rgba(14,142,64,0.18)" : "#D4E8D8"}`, padding: "0 clamp(1.5rem, 5vw, 4rem)", transition: "all 0.2s", boxShadow: scrolled ? "0 4px 28px rgba(0,0,0,0.06)" : "none" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 96 }}>
          <a href="/" style={{ display: "block", textDecoration: "none", flexShrink: 0 }} aria-label="EnviroCare home">
            <img src="/logo.png" alt="EnviroCare Pest & Termite Services" width={380} height={146} style={{ width: "clamp(220px, 26vw, 380px)", height: "auto", display: "block" }} />
          </a>

          <nav className="ec-desktop-only" style={{ gap: 28, alignItems: "center", ...sf }}>
            {NAV_LINKS.map(([l, h]) => (
              <a key={l} href={h} style={{ fontSize: 14, color: l === "Lake Martin" ? G : "#1f2a23", textDecoration: "none", fontWeight: l === "Lake Martin" ? 700 : 600 }}>{l}</a>
            ))}
            <a href={PAYMENT_PORTAL_URL} style={{ fontSize: 14, color: "#1f2a23", textDecoration: "none", fontWeight: 600 }}>Pay Bill</a>
            <a href="tel:2056495278" style={{ fontSize: 13, fontWeight: 600, color: G, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Phone size={14} /> (205) 649-5278
            </a>
            <a href="/quote" style={{ background: GOLD, color: DARK, borderRadius: 50, padding: "0.55rem 1.4rem", fontWeight: 700, fontSize: 13, textDecoration: "none", boxShadow: `0 4px 14px ${GOLD}40` }}>Get Free Quote</a>
          </nav>

          <div className="ec-mobile-only" style={{ alignItems: "center", gap: 8 }}>
            <a href="tel:2056495278" aria-label="Call EnviroCare" style={{ width: 44, height: 44, borderRadius: 12, border: "1px solid rgba(14,142,64,0.18)", background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", color: G, textDecoration: "none" }}><Phone size={18} /></a>
            <button type="button" className="ec-burger" aria-label="Open menu" aria-expanded={menuOpen} aria-controls="ec-mobile-menu" onClick={() => setMenuOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0E1A0F" strokeWidth="2.2" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="13" x2="20" y2="13"/><line x1="4" y1="19" x2="14" y2="19"/></svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
