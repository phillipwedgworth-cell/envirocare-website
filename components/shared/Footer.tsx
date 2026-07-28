// components/shared/Footer.tsx — unified site footer. Self-contained (inline
// styles, no page CSS dependency) so any template can drop it in. Light cream
// palette matching the homepage footer. Content mirrors the homepage: correct
// phones, services, areas, legal links.

import { GREEN, FOREST, DEEP, displayFont, bodyFont, TAGLINE, HERITAGE } from "@/lib/brand";

const TEXT = "#4a5750";
const MUTED = "#7a887e";
const SURFACE = "#F2F6EF";
const HAIRLINE = "#d6e2d8";

const COL_HEAD: React.CSSProperties = {
  fontFamily: bodyFont,
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: DEEP,
  marginBottom: 14,
};

const LINK: React.CSSProperties = {
  color: TEXT,
  textDecoration: "none",
  fontFamily: bodyFont,
  fontSize: 14,
  lineHeight: 2.1,
  display: "block",
};

const PHONE: React.CSSProperties = {
  color: FOREST,
  textDecoration: "none",
  fontFamily: bodyFont,
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 2,
  display: "flex",
  alignItems: "center",
  gap: 8,
};

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

const SERVICES: [string, string][] = [
  ["All Services", "/services"],
  ["What Pest Problem Do You Have?", "/what-pest-problem"],
  ["Pest Control", "/services/pest-control"],
  ["Termite Control", "/services/termite-control"],
  ["Mosquito Control", "/services/mosquito"],
  ["Tick Control", "/services/tick-control"],
  ["Plans & Pricing", "/quote"],
];

const SPECIALTY: [string, string][] = [
  ["Fire Ant Control", "/services/fire-ant"],
  ["Interior Pest Control", "/services/interior-pest-control"],
  ["Flea Control", "/services/flea"],
  ["Builder Pre-Treat", "/builders"],
  ["Real Estate / WDO Letters", "/realtor"],
  ["Commercial Service", "/services/commercial"],
  ["Pest Library", "/pest-library"],
  ["Seasonal Pest Calendar", "/pest-calendar"],
  ["Pest Tips & Blog", "/blog"],
  ["Local vs National Chains", "/family-owned-vs-national-chains"],
  ["Special Offers", "/special-offers"],
];

// Crawlable Birmingham-metro cluster + the other two regions. Every link is a
// real routed page — this is the site-wide internal-link mesh for local SEO.
const AREAS: [string, string][] = [
  ["Birmingham, AL", "/birmingham"],
  ["Hoover, AL", "/hoover"],
  ["Vestavia Hills, AL", "/vestavia-hills"],
  ["Mountain Brook, AL", "/mountain-brook"],
  ["Homewood, AL", "/homewood"],
  ["Trussville, AL", "/trussville"],
  ["Chelsea, AL", "/chelsea"],
  ["Pelham, AL", "/pelham"],
  ["Helena, AL", "/helena"],
  ["Alabaster, AL", "/alabaster"],
];

const AREAS_2: [string, string][] = [
  ["Calera, AL", "/calera"],
  ["Greystone", "/greystone"],
  ["Gardendale, AL", "/gardendale"],
  ["Bessemer, AL", "/bessemer"],
  ["Huntsville, AL", "/huntsville"],
  ["Madison, AL", "/service-areas/madison"],
  ["Athens, AL", "/athens"],
  ["Decatur, AL", "/decatur"],
  ["Lake Martin / Alex City", "/lake-martin"],
  ["Alexander City, AL", "/alexander-city"],
  ["Auburn, AL", "/auburn"],
  ["Opelika, AL", "/opelika"],
  ["Find Your Office", "/find-office"],
  ["All Service Areas →", "/service-areas"],
];

export default function Footer() {
  return (
    <footer style={{ background: SURFACE, borderTop: `4px solid ${GREEN}`, padding: "56px clamp(20px,5vw,64px) 28px" }}>
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 36,
        }}
      >
        <div>
          <div style={{ fontFamily: displayFont, color: DEEP, fontSize: 18, fontWeight: 600, marginBottom: 6 }}>
            EnviroCare Pest &amp; Termite Services
          </div>
          <div style={{ fontFamily: displayFont, fontStyle: "italic", color: FOREST, fontSize: 14, marginBottom: 10 }}>
            {TAGLINE}
          </div>
          <p style={{ ...LINK, color: MUTED, lineHeight: 1.7, marginBottom: 14 }}>
            {HERITAGE} of the Wedgworth family. Serving Alabama from three offices.
          </p>
          <a href="tel:2059406360" style={PHONE}><PhoneIcon /> (205) 940-6360 — Birmingham</a>
          <a href="tel:2562346162" style={PHONE}><PhoneIcon /> (256) 234-6162 — Lake Martin / Alex City</a>
          <a href="tel:2569377676" style={PHONE}><PhoneIcon /> (256) 937-7676 — Huntsville</a>
        </div>
        <div>
          <div style={COL_HEAD}>Core Services</div>
          {SERVICES.map(([label, href]) => (
            <a key={href} href={href} style={LINK}>{label}</a>
          ))}
        </div>
        <div>
          <div style={COL_HEAD}>Specialty</div>
          {SPECIALTY.map(([label, href]) => (
            <a key={href} href={href} style={LINK}>{label}</a>
          ))}
        </div>
        <div>
          <div style={COL_HEAD}>Birmingham Metro</div>
          {AREAS.map(([label, href]) => (
            <a key={href} href={href} style={LINK}>{label}</a>
          ))}
        </div>
        <div>
          <div style={COL_HEAD}>More Service Areas</div>
          {AREAS_2.map(([label, href]) => (
            <a key={href} href={href} style={LINK}>{label}</a>
          ))}
        </div>
      </div>
      <div
        style={{
          maxWidth: 1120,
          margin: "40px auto 0",
          paddingTop: 22,
          borderTop: `1px solid ${HAIRLINE}`,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          fontFamily: bodyFont,
          fontSize: 12.5,
          color: MUTED,
        }}
      >
        <span>© 2026 EnviroCare Pest &amp; Termite Services LLC. All rights reserved. Licensed in Alabama · Sentricon® Certified Specialist</span>
        <span style={{ display: "flex", gap: 22 }}>
          <a href="/privacy" style={{ ...LINK, display: "inline", fontSize: 12.5, color: MUTED }}>Privacy Policy</a>
          <a href="/terms" style={{ ...LINK, display: "inline", fontSize: 12.5, color: MUTED }}>Terms of Service</a>
        </span>
      </div>
    </footer>
  );
}
