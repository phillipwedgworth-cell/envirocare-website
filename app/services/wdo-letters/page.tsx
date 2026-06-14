import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WDO Inspection Letters in Alabama | Real Estate Termite Reports | EnviroCare",
  description:
    "Alabama WDO (wood-destroying organism) inspection letters for real estate closings. Fast turnaround for realtors and lenders across Birmingham, Lake Martin, and Huntsville.",
  alternates: { canonical: "/services/wdo-letters" },
  robots: { index: true, follow: true },
};

const BRAND_GREEN = "#0E8E40";
const FOREST = "#0A7935";
const DEEP = "#07642B";
const GOLD = "#F5A800";
const CREAM = "#FEFDF8";
const INK = "#0E1A0F";

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "WDO Inspection Letter",
  serviceType: "Wood-Destroying Organism Inspection Report",
  provider: {
    "@type": "LocalBusiness",
    name: "EnviroCare Pest & Termite Services",
    telephone: "+1-205-940-6360",
    areaServed: "Alabama",
  },
  description:
    "Official Alabama wood-destroying organism (WDO) inspection letters for real estate closings, refinances, and VA/FHA loans.",
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.envirocarellc.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.envirocarellc.com/services" },
    { "@type": "ListItem", position: 3, name: "WDO Inspection Letters", item: "https://www.envirocarellc.com/services/wdo-letters" },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a WDO letter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A WDO (wood-destroying organism) letter — formally the Alabama Wood Infestation Report — is the official termite inspection document required by most lenders for real estate closings. Issued by a licensed pest control company, the wood infestation report documents any current or past evidence of termites, powderpost beetles, wood borers, or wood-decay fungi.",
      },
    },
    {
      "@type": "Question",
      name: "How fast can I get a WDO inspection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most WDO inspections in our service areas are scheduled within 48–72 hours. The completed letter is typically emailed to the realtor and lender within 24 hours of inspection. Rush options are available for tight closings.",
      },
    },
    {
      "@type": "Question",
      name: "Do you accept VA and FHA loan inspections?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We provide the Alabama Department of Agriculture and Industries Official WDO Inspection Report (Form ADAI-WDO-100), which is accepted for VA, FHA, conventional, and refinance loans.",
      },
    },
    {
      "@type": "Question",
      name: "What if the inspection finds active termites?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If we find active wood-destroying organisms, we'll document the findings and provide a quote for treatment using Sentricon® or other appropriate methods. Treatment can usually happen quickly enough to keep the closing on schedule.",
      },
    },
    {
      "@type": "Question",
      name: "Can the buyer get a termite plan at closing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We can set up a Sentricon® Always Active termite plan at or after closing. Many buyers include this as part of their negotiated repairs or purchase a plan directly. Up to $1,000,000 repair coverage available.",
      },
    },
  ],
};

export default function WDOLettersPage() {
  const serif: React.CSSProperties = { fontFamily: "'Playfair Display', Georgia, serif" };
  const sans: React.CSSProperties = { fontFamily: "'DM Sans', system-ui, sans-serif" };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <main style={{ background: CREAM, minHeight: "100vh", color: INK, ...sans }}>

        {/* HERO */}
        <section
          style={{
            background: `linear-gradient(135deg, ${DEEP} 0%, ${FOREST} 60%, ${BRAND_GREEN} 100%)`,
            color: "#fff",
            padding: "80px 24px 64px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 920, margin: "0 auto" }}>
            <div
              style={{
                display: "inline-block",
                background: GOLD,
                color: INK,
                padding: "6px 14px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              For Realtors &amp; Lenders
            </div>
            <h1 style={{ ...serif, fontSize: "clamp(36px, 5.5vw, 52px)", fontWeight: 700, margin: "0 0 18px", lineHeight: 1.1 }}>
              WDO Inspection Letters
              <br />
              <em style={{ color: GOLD, fontWeight: 500 }}>For Alabama Closings</em>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.92, maxWidth: 720, margin: "0 auto 36px" }}>
              Schedule an inspection in under a minute. Letter sent to your inbox within 24 hours of the visit. Closings don't
              wait — neither do we.
            </p>
            <Link
              href="tel:2059406360"
              style={{
                display: "inline-block",
                background: GOLD,
                color: "#000",
                padding: "14px 36px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 17,
                textDecoration: "none",
              }}
            >
              Schedule a WDO Inspection →
            </Link>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section
          style={{
            background: "#fff",
            borderBottom: `1px solid rgba(14,142,64,0.12)`,
            padding: "20px 24px",
          }}
        >
          <div
            style={{
              maxWidth: 860,
              margin: "0 auto",
              display: "flex",
              gap: 32,
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {["Alabama Licensed & Insured", "Form ADAI-WDO-100", "VA / FHA / Conventional", "Family-owned since 1958"].map((t) => (
              <span key={t} style={{ fontSize: 13.5, fontWeight: 600, color: DEEP, letterSpacing: "0.02em" }}>
                ✓ {t}
              </span>
            ))}
          </div>
        </section>

        {/* WHAT'S COVERED */}
        <section style={{ padding: "64px 24px", maxWidth: 920, margin: "0 auto" }}>
          <h2 style={{ ...serif, fontSize: 30, color: DEEP, textAlign: "center", marginBottom: 10 }}>
            What the WDO inspection covers
          </h2>
          <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 48 }}>
            Alabama uses the ADAI-WDO-100 form — the same form accepted by VA, FHA, and conventional lenders statewide.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {[
              { label: "Subterranean termites", icon: "🐜" },
              { label: "Drywood termites", icon: "🐜" },
              { label: "Powderpost beetles", icon: "🪲" },
              { label: "Old house borers", icon: "🪲" },
              { label: "Wood-decay fungi", icon: "🍄" },
              { label: "Previous damage evidence", icon: "🏠" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "#fff",
                  border: `1px solid rgba(14,142,64,0.15)`,
                  borderRadius: 10,
                  padding: "20px 18px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <p style={{ fontSize: 14, fontWeight: 600, color: DEEP, margin: 0 }}>{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section style={{ background: "#fff", padding: "56px 24px", borderTop: `1px solid rgba(14,142,64,0.1)`, borderBottom: `1px solid rgba(14,142,64,0.1)` }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{ ...serif, fontSize: 28, color: DEEP, textAlign: "center", marginBottom: 36 }}>
              From call to closing — how fast it moves
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
              {[
                { day: "Call or request", text: "Takes under a minute — we just need the address" },
                { day: "48–72 hrs", text: "Inspection scheduled in most service areas" },
                { day: "Inspection Day", text: "Licensed inspector on-site, full ADAI form completed" },
                { day: "+24 Hours", text: "Letter emailed to realtor, lender, and buyer" },
              ].map((s, i) => (
                <div key={i} style={{ background: CREAM, padding: 20, borderRadius: 10, border: `1px solid rgba(14,142,64,0.15)`, textAlign: "center" }}>
                  <div style={{ ...serif, fontSize: 13, color: GOLD, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 8, textTransform: "uppercase" }}>
                    {s.day}
                  </div>
                  <p style={{ fontSize: 14, color: INK, fontWeight: 500, margin: 0, lineHeight: 1.5 }}>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOAN TYPES */}
        <section style={{ padding: "64px 24px", maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ ...serif, fontSize: 28, color: DEEP, textAlign: "center", marginBottom: 40 }}>
            Accepted for every loan type
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {[
              {
                type: "VA Loans",
                detail: "VA requires a WDO inspection in Alabama. We provide the ADAI-WDO-100 form accepted by VA appraisers statewide.",
              },
              {
                type: "FHA Loans",
                detail: "FHA requires evidence of no active infestation at time of appraisal. Our inspection and report satisfies that requirement.",
              },
              {
                type: "Conventional",
                detail: "Most conventional lenders require a clean WDO letter. We provide the standard Alabama form — accepted by all major lenders.",
              },
              {
                type: "Refinance",
                detail: "Refinances often require a fresh WDO inspection, especially for government-backed loans. We handle those same-week in most cases.",
              },
            ].map((loan, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: `1px solid rgba(14,142,64,0.18)`,
                  borderLeft: `4px solid ${BRAND_GREEN}`,
                  borderRadius: 10,
                  padding: "22px 20px",
                }}
              >
                <h3 style={{ ...serif, fontSize: 19, color: DEEP, marginBottom: 8 }}>{loan.type}</h3>
                <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.65, margin: 0 }}>{loan.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: "#fff", padding: "64px 24px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <h2 style={{ ...serif, fontSize: 28, color: DEEP, textAlign: "center", marginBottom: 40 }}>
              Questions from realtors and buyers
            </h2>
            {[
              {
                q: "What is a WDO letter?",
                a: "A WDO (wood-destroying organism) letter — formally the Alabama Wood Infestation Report — is the official termite inspection document required by most lenders for real estate closings. Issued by a licensed pest control company, the wood infestation report documents any current or past evidence of termites, powderpost beetles, wood borers, or wood-decay fungi.",
              },
              {
                q: "How fast can I get a WDO inspection?",
                a: "Most inspections in our service areas are scheduled within 48–72 hours. The completed letter is typically emailed to the realtor and lender within 24 hours of inspection. Rush options are available for tight closings.",
              },
              {
                q: "Do you accept VA and FHA loan inspections?",
                a: "Yes. We provide the Alabama Department of Agriculture and Industries Official WDO Inspection Report (Form ADAI-WDO-100), which is accepted for VA, FHA, conventional, and refinance loans.",
              },
              {
                q: "What if the inspection finds active termites?",
                a: "If we find active wood-destroying organisms, we'll document the findings and provide a quote for treatment. Sentricon® treatment can usually be completed quickly enough to keep the closing on schedule.",
              },
              {
                q: "Can the buyer get a termite plan at closing?",
                a: "Yes. We can set up a Sentricon® Always Active termite plan at or after closing. Many buyers include this as part of negotiated repairs or purchase a plan directly. Up to $1,000,000 repair coverage available.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid rgba(14,142,64,0.15)",
                  padding: "24px 0",
                }}
              >
                <h3 style={{ ...serif, fontSize: 18, color: DEEP, marginBottom: 10 }}>{item.q}</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "#444", margin: 0 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CROSS-LINK */}
        <section style={{ padding: "32px 24px", background: DEEP, color: "#fff", textAlign: "center" }}>
          <p style={{ fontSize: 15, opacity: 0.85, margin: 0 }}>
            Building a new home?{" "}
            <Link href="/services/builder-pre-treat" style={{ color: GOLD, textDecoration: "underline" }}>
              See our Builder Pre-Treatment page →
            </Link>
          </p>
        </section>

        {/* OFFICE CONTACTS */}
        <section style={{ padding: "48px 24px", maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ ...serif, fontSize: 24, color: DEEP, textAlign: "center", marginBottom: 32 }}>
            Call Your Nearest Office
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {[
              { city: "Birmingham / Alabaster", phone: "(205) 940-6360", href: "tel:2059406360" },
              { city: "Alex City / Lake Martin", phone: "(256) 234-6162", href: "tel:2562346162" },
              { city: "Huntsville", phone: "(256) 937-7676", href: "tel:2569377676" },
            ].map((o) => (
              <Link
                key={o.city}
                href={o.href}
                style={{
                  display: "block",
                  background: BRAND_GREEN,
                  color: "#fff",
                  borderRadius: 10,
                  padding: "22px 20px",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                <p style={{ fontWeight: 700, fontSize: 15, margin: "0 0 6px" }}>{o.city}</p>
                <p style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{o.phone}</p>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </>
  );
}
