// components/ComboPage.tsx — layout shell for city×service combo pages
// (e.g. /birmingham-termite-control). The shell is shared for design cohesion;
// every content prop is unique per page — these are NOT doorway clones.

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { GREEN, GOLD, DEEP, CREAM, INK, displayFont, bodyFont } from "@/lib/brand";

export type ComboContent = {
  eyebrow: string;
  h1: string;
  h1Accent: string;            // italic gold tail of the H1
  intro: string[];             // 2-3 unique paragraphs
  localAngles: { title: string; body: string }[];
  anglesHeading: string;
  price: { label: string; amount: string; sub: string; bullets: string[] };
  faqs: { q: string; a: string }[];
  office: { name: string; phone: string; tel: string; address: string };
  cityHub: { name: string; href: string };
  servicePage: { name: string; href: string };
  schemaName: string;
  canonicalPath: string;
};

export default function ComboPage({ c }: { c: ComboContent }) {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "PestControlService" as const,
      name: c.schemaName,
      telephone: c.office.phone,
      address: { "@type": "PostalAddress", streetAddress: c.office.address, addressRegion: "AL", addressCountry: "US" },
      url: `https://www.envirocarellc.com${c.canonicalPath}`,
      parentOrganization: { "@type": "Organization", name: "EnviroCare Pest & Termite Services", foundingDate: "1958" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage" as const,
      mainEntity: c.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  const sf = { fontFamily: bodyFont } as const;
  const ss = { fontFamily: displayFont } as const;

  return (
    <div style={{ minHeight: "100vh", background: CREAM, ...sf }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* HERO */}
      <section style={{ background: `linear-gradient(160deg, ${INK} 0%, ${DEEP} 100%)`, color: "#fff", padding: "64px clamp(20px,5vw,64px) 56px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "inline-block", border: `1px solid ${GOLD}55`, background: `${GOLD}22`, borderRadius: 6, padding: "5px 14px", marginBottom: 18 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase" }}>{c.eyebrow}</span>
          </div>
          <h1 style={{ ...ss, fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 600, lineHeight: 1.12, margin: "0 0 18px" }}>
            {c.h1}{" "}
            <em style={{ color: GOLD, fontStyle: "italic" }}>{c.h1Accent}</em>
          </h1>
          {c.intro.map((p, i) => (
            <p key={i} style={{ fontSize: 16.5, lineHeight: 1.75, color: "rgba(255,255,255,0.78)", margin: "0 0 14px", maxWidth: 680 }}>{p}</p>
          ))}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <a href="/quote" style={{ background: GOLD, color: INK, padding: "14px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Get a Free Quote →</a>
            <a href={`tel:${c.office.tel}`} style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.3)", padding: "14px 28px", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>📞 {c.office.phone}</a>
          </div>
        </div>
      </section>

      {/* LOCAL ANGLES */}
      <section style={{ padding: "56px clamp(20px,5vw,64px)", background: "#fff" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ ...ss, fontSize: "clamp(1.5rem,2.8vw,2rem)", fontWeight: 600, color: INK, margin: "0 0 28px" }}>{c.anglesHeading}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 16 }}>
            {c.localAngles.map((a, i) => (
              <div key={i} style={{ border: "1px solid rgba(14,142,64,0.15)", borderRadius: 14, padding: "20px 20px", background: CREAM }}>
                <h3 style={{ ...ss, fontSize: 17, color: DEEP, margin: "0 0 8px", fontWeight: 700 }}>{a.title}</h3>
                <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.65, margin: 0 }}>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: "56px clamp(20px,5vw,64px)", background: CREAM }}>
        <div style={{ maxWidth: 560, margin: "0 auto", background: "#fff", border: `1px solid rgba(14,142,64,0.2)`, borderRadius: 16, padding: "32px 30px", textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: GREEN, textTransform: "uppercase", marginBottom: 8 }}>{c.price.label}</div>
          <div style={{ ...ss, fontSize: 44, fontWeight: 700, color: INK, lineHeight: 1 }}>{c.price.amount}</div>
          <div style={{ fontSize: 14, color: "#5A6660", margin: "6px 0 18px" }}>{c.price.sub}</div>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px", textAlign: "left" }}>
            {c.price.bullets.map((b, i) => (
              <li key={i} style={{ fontSize: 14.5, color: "#374151", padding: "5px 0" }}>✓ {b}</li>
            ))}
          </ul>
          <a href="/quote" style={{ display: "inline-block", background: GREEN, color: "#fff", padding: "14px 34px", borderRadius: 999, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Start Today →</a>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "56px clamp(20px,5vw,64px)", background: "#fff" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ ...ss, fontSize: "clamp(1.5rem,2.8vw,2rem)", fontWeight: 600, color: INK, margin: "0 0 24px" }}>Common Questions</h2>
          {c.faqs.map((f, i) => (
            <details key={i} style={{ border: "1px solid rgba(14,142,64,0.15)", borderRadius: 10, marginBottom: 10, background: CREAM, padding: "0 18px" }}>
              <summary style={{ padding: "14px 0", cursor: "pointer", fontWeight: 600, color: DEEP, fontSize: 15.5 }}>{f.q}</summary>
              <p style={{ color: "#4b5563", fontSize: 14.5, lineHeight: 1.7, padding: "0 0 16px", margin: 0 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CROSS LINKS + NAP */}
      <section style={{ padding: "40px clamp(20px,5vw,64px) 64px", background: CREAM }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.8 }}>
            Served by the <strong>{c.office.name}</strong> — {c.office.address} ·{" "}
            <a href={`tel:${c.office.tel}`} style={{ color: GREEN, fontWeight: 700, textDecoration: "none" }}>{c.office.phone}</a>
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 14 }}>
            <a href={c.cityHub.href} style={{ border: `1px solid rgba(14,142,64,0.3)`, borderRadius: 999, padding: "9px 18px", color: DEEP, fontWeight: 600, fontSize: 14, textDecoration: "none", background: "#fff" }}>{c.cityHub.name} →</a>
            <a href={c.servicePage.href} style={{ border: `1px solid rgba(14,142,64,0.3)`, borderRadius: 999, padding: "9px 18px", color: DEEP, fontWeight: 600, fontSize: 14, textDecoration: "none", background: "#fff" }}>{c.servicePage.name} →</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
