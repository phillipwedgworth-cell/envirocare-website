"use client";

import { useEffect, useState, useRef } from "react";
import { Phone, ArrowRight, ChevronDown, User } from "lucide-react";
import BrandBand from "./BrandBand";

// When the customer payment portal goes live, change this single value.
// Example: "https://pay.envirocarellc.com" or whatever URL the vendor gives you.
export const PAYMENT_PORTAL_URL = "/pay";

const G = "#0A7935";
const GOLD = "#F5A800";
const DARK = "#0E1A0F";

const sf = { fontFamily: "var(--font-sans)" };

const SERVICES_ITEMS: [string, string][] = [
  ["All Services", "/services"],
  ["Pest Control", "/services/pest-control"],
  ["Interior Pest Control", "/services/interior-pest-control"],
  ["Termite / Sentricon®", "/services/termite-control"],
  ["Mosquito Control", "/services/mosquito"],
  ["Tick Control", "/services/tick-control"],
  ["Fire Ant Control", "/services/fire-ant"],
  ["Flea Control", "/services/flea"],
  ["Builder Pre-Treat", "/services/builder"],
  ["Real Estate / WDO", "/services/wdo-letters"],
  ["Commercial Service", "/services/commercial"],
];

const AREAS_ITEMS: [string, string, string][] = [
  ["Birmingham / Shelby County", "/birmingham", "(205) 940-6360"],
  ["Lake Martin / Alex City", "/lake-martin", "(256) 234-6162"],
  ["Huntsville / North Alabama", "/huntsville", "(256) 937-7676"],
];

const OVERLAY_LINKS: [string, string, boolean][] = [
  ["Services", "/services", false],
  ["Service Areas", "/find-office", false],
  ["Pricing", "/quote", false],
  ["About", "/about-us", false],
  ["Reviews", "/reviews", false],
  ["Specials", "/special-offers", false],
  ["Contact", "/contact-us", false],
];

const OFFICES = [
  { name: "Birmingham", phone: "(205) 940-6360", tel: "2059406360" },
  { name: "Lake Martin · Alex City", phone: "(256) 234-6162", tel: "2562346162" },
  { name: "Huntsville", phone: "(256) 937-7676", tel: "2569377676" },
];

function Dropdown({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#1f2a23", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4, padding: "0.5rem 0.6rem", ...sf, lineHeight: 1 }}
      >
        {label}
        <ChevronDown size={13} style={{ transition: "transform 0.15s", transform: open ? "rotate(180deg)" : "none", opacity: 0.6 }} />
      </button>

      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: "#fff", border: "1px solid #E8E2D8", borderRadius: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.10)", minWidth: 200, padding: "6px 0", zIndex: 200 }}>
          {children}
        </div>
      )}
    </div>
  );
}

function DropItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{ display: "block", padding: "9px 18px", fontSize: 13.5, color: "#1f2a23", textDecoration: "none", fontWeight: 500, ...sf, whiteSpace: "nowrap" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F0FAF4"; (e.currentTarget as HTMLElement).style.color = G; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#1f2a23"; }}
    >
      {children}
    </a>
  );
}

const divider = (
  <span style={{ width: 1, height: 18, background: "rgba(0,0,0,0.12)", display: "inline-block", margin: "0 4px", verticalAlign: "middle" }} />
);

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
            <span>Customer Login <span className="ec-menu-pay-sub" style={{ display: "block", marginTop: 2 }}>Pay My Bill</span></span>
            <ArrowRight size={20} />
          </a>
          <a href="/request-quote" className="ec-menu-quote" onClick={() => setMenuOpen(false)}>Talk to an Expert <ArrowRight size={18} /></a>

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
            <span className="ec-menu-foot-dot ec-pulse-dot" /> Fast Scheduling Available
          </div>
        </div>
      </div>

      {/* STICKY SHELL: top utility bar collapses on scroll, main bar stays pinned */}
      <div className="ec-sticky-shell" style={{ position: "sticky", top: 0, zIndex: 50 }}>

      {/* TOP UTILITY BAR — collapses cleanly on scroll */}
      {showTopBar && (
        <div
          aria-hidden={scrolled}
          style={{
            background: DARK,
            maxHeight: scrolled ? 0 : 56,
            opacity: scrolled ? 0 : 1,
            overflow: "hidden",
            transition: "max-height 0.28s ease, opacity 0.2s ease",
            ...sf,
          }}
        >
          {/* DESKTOP: local office phone numbers */}
          <div className="ec-desktop-only" style={{ color: "#FBC51A", fontSize: 12, padding: "9px 24px", justifyContent: "center", gap: 22, flexWrap: "wrap", letterSpacing: "0.04em", fontWeight: 500 }}>
            {OFFICES.map((o, i) => (
              <span key={o.tel} style={{ display: "inline-flex", alignItems: "center", gap: 22 }}>
                {i > 0 && <span style={{ color: "#2EAA61", opacity: 0.7 }}>·</span>}
                <a href={`tel:${o.tel}`} style={{ color: "#FBC51A", textDecoration: "none" }}>
                  {o.name} <strong style={{ color: "#fff" }}>{o.phone}</strong>
                </a>
              </span>
            ))}
          </div>

          {/* MOBILE: customer login (left) + tap-to-call link (right) — no number text */}
          <div className="ec-mobile-only" style={{ alignItems: "stretch", justifyContent: "space-between", padding: 0, height: 48 }}>
            <a href={PAYMENT_PORTAL_URL} style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#fff", textDecoration: "none", fontSize: 13.5, fontWeight: 600, padding: "0 18px" }}>
              <User size={17} style={{ color: GOLD }} /> Customer Login
            </a>
            <a href="tel:2059406360" aria-label="Call EnviroCare" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#fff", textDecoration: "none", fontSize: 13.5, fontWeight: 600, padding: "0 18px" }}>
              <Phone size={16} style={{ color: GOLD }} /> Call Us
            </a>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(14px)", borderBottom: `1px solid ${scrolled ? "rgba(14,142,64,0.18)" : "#D4E8D8"}`, padding: "0 clamp(1.5rem, 5vw, 4rem)", transition: "all 0.2s", boxShadow: scrolled ? "0 4px 28px rgba(0,0,0,0.06)" : "none" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 80 }}>

          {/* LEFT: Logo — ~50px tall */}
          <a href="/" style={{ display: "block", textDecoration: "none", minWidth: 0 }} aria-label="EnviroCare home">
            <img className="ec-header-logo" src="/logo.png" alt="EnviroCare Pest & Termite Services" style={{ width: "auto", display: "block" }} />
          </a>

          {/* CENTER: Nav with dropdowns */}
          <nav className="ec-desktop-only" style={{ gap: 2, alignItems: "center", ...sf }}>
            <Dropdown label="Services">
              {SERVICES_ITEMS.map(([label, href]) => (
                <DropItem key={label} href={href}>{label}</DropItem>
              ))}
            </Dropdown>

            <Dropdown label="Service Areas">
              {AREAS_ITEMS.map(([label, href, phone]) => (
                <DropItem key={label} href={href}>
                  <span style={{ display: "block" }}>{label}</span>
                  <span style={{ display: "block", fontSize: 12, color: G, marginTop: 1 }}>{phone}</span>
                </DropItem>
              ))}
              <div style={{ borderTop: "1px solid #E8E2D8", margin: "6px 0" }} />
              <DropItem href="/find-office">Find My Office →</DropItem>
            </Dropdown>

            <a href="/quote" style={{ fontSize: 14, color: "#1f2a23", textDecoration: "none", fontWeight: 600, padding: "0.5rem 0.6rem" }}>Pricing</a>
            <a href="/about-us" style={{ fontSize: 14, color: "#1f2a23", textDecoration: "none", fontWeight: 600, padding: "0.5rem 0.6rem" }}>About</a>
            <a href="/reviews" style={{ fontSize: 14, color: "#1f2a23", textDecoration: "none", fontWeight: 600, padding: "0.5rem 0.6rem" }}>Reviews</a>
          </nav>

          {/* RIGHT: Phone | Customer Login | Get Free Quote */}
          <div className="ec-desktop-only" style={{ alignItems: "center", gap: 0, ...sf }}>
            <a href="tel:2059406360" style={{ fontSize: 13.5, fontWeight: 600, color: "#0A7935", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5, padding: "0 12px" }}>
              <Phone size={14} /> (205) 940-6360
            </a>
            {divider}
            <a href={PAYMENT_PORTAL_URL} style={{ fontSize: 13.5, color: "#1f2a23", textDecoration: "none", fontWeight: 600, padding: "0 12px" }}>Customer Login</a>
            {divider}
            <a href="/request-quote" style={{ marginLeft: 8, background: GOLD, color: DARK, borderRadius: 50, padding: "0.52rem 1.3rem", fontWeight: 700, fontSize: 13, textDecoration: "none", boxShadow: `0 4px 14px ${GOLD}40`, whiteSpace: "nowrap" }}>Talk to an Expert</a>
          </div>

          {/* MOBILE: Talk to an Expert + burger (login + call live in the top bar) */}
          <div className="ec-mobile-only" style={{ alignItems: "center", gap: 10 }}>
            <a href="/request-quote" style={{ background: GOLD, color: DARK, borderRadius: 50, padding: "0.5rem 0.95rem", fontWeight: 700, fontSize: 12.5, textDecoration: "none", whiteSpace: "nowrap", ...sf }}>Talk to an Expert</a>
            <button type="button" className="ec-burger" aria-label="Open menu" aria-expanded={menuOpen} aria-controls="ec-mobile-menu" onClick={() => setMenuOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0E1A0F" strokeWidth="2.2" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="13" x2="20" y2="13"/><line x1="4" y1="19" x2="14" y2="19"/></svg>
            </button>
          </div>

        </div>
      </header>
      </div>
      <BrandBand />
    </>
  );
}
