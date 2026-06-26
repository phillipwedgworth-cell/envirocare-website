// components/shared/Footer.tsx — unified site footer. Self-contained (inline
// styles, no page CSS dependency) so any template can drop it in. Content
// mirrors the CityPage footer: correct phones, services, areas, legal links.

import { GOLD, INK, displayFont, bodyFont, TAGLINE, HERITAGE } from "@/lib/brand";

const COL_HEAD: React.CSSProperties = {
  fontFamily: bodyFont,
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: GOLD,
  marginBottom: 14,
};

const LINK: React.CSSProperties = {
  color: "rgba(255,255,255,0.72)",
  textDecoration: "none",
  fontFamily: bodyFont,
  fontSize: 14,
  lineHeight: 2.1,
  display: "block",
};

const SERVICES: [string, string][] = [
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
];

const AREAS: [string, string][] = [
  ["Birmingham, AL", "/birmingham"],
  ["Huntsville, AL", "/huntsville"],
  ["Lake Martin / Alex City", "/lake-martin"],
  ["Hoover, AL", "/hoover"],
  ["Madison, AL", "/service-areas/madison"],
  ["Auburn, AL", "/auburn"],
  ["All Service Areas →", "/service-areas"],
];

export default function Footer() {
  return (
    <footer style={{ background: INK, padding: "56px clamp(20px,5vw,64px) 28px" }}>
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
          <div style={{ fontFamily: displayFont, color: "#fff", fontSize: 18, fontWeight: 600, marginBottom: 6 }}>
            🌻 EnviroCare Pest &amp; Termite Services
          </div>
          <div style={{ fontFamily: displayFont, fontStyle: "italic", color: GOLD, fontSize: 14, marginBottom: 10 }}>
            {TAGLINE}
          </div>
          <p style={{ ...LINK, lineHeight: 1.7, marginBottom: 14 }}>
            {HERITAGE} of the Wedgworth family. Serving Alabama from three offices.
          </p>
          <a href="tel:2059406360" style={{ ...LINK, fontWeight: 700, color: "#fff" }}>📞 (205) 940-6360 — Birmingham</a>
          <a href="tel:2562346162" style={LINK}>📞 (256) 234-6162 — Lake Martin / Alex City</a>
          <a href="tel:2569377676" style={LINK}>📞 (256) 937-7676 — Huntsville</a>
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
          <div style={COL_HEAD}>Service Areas</div>
          {AREAS.map(([label, href]) => (
            <a key={href} href={href} style={LINK}>{label}</a>
          ))}
        </div>
      </div>
      <div
        style={{
          maxWidth: 1120,
          margin: "40px auto 0",
          paddingTop: 22,
          borderTop: "1px solid rgba(255,255,255,0.12)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          fontFamily: bodyFont,
          fontSize: 12.5,
          color: "rgba(255,255,255,0.5)",
        }}
      >
        <span>© 2026 EnviroCare Pest &amp; Termite Services LLC. All rights reserved. Licensed in Alabama · Sentricon® Certified Specialist</span>
        <span style={{ display: "flex", gap: 22 }}>
          <a href="/privacy" style={{ ...LINK, display: "inline", fontSize: 12.5 }}>Privacy Policy</a>
          <a href="/terms" style={{ ...LINK, display: "inline", fontSize: 12.5 }}>Terms of Service</a>
        </span>
      </div>
    </footer>
  );
}
