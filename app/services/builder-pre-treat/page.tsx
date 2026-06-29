import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "New Construction Termite Pre-Treatment | EnviroCare Pest & Termite",
  description:
    "Code-compliant termite pre-treatment for Alabama builders. Soil treatment, Sentricon® baiting, or combination. WDO paperwork included. Birmingham, Huntsville & Lake Martin.",
  alternates: { canonical: "/services/builder-pre-treat" },
  robots: { index: true, follow: true },
};

const BRAND_GREEN = "#0A7935";
const FOREST = "#0A7935";
const DEEP = "#07642B";
const GOLD = "#F5A800";
const CREAM = "#FEFDF8";
const INK = "#0E1A0F";

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "New Construction Termite Pre-Treatment",
  serviceType: "Builder Termite Pre-Treatment",
  provider: {
    "@type": "LocalBusiness",
    name: "EnviroCare Pest & Termite Services",
    telephone: "+1-205-940-6360",
    areaServed: "Alabama",
    address: { "@type": "PostalAddress", streetAddress: "2025 Butler Rd", addressLocality: "Alabaster", addressRegion: "AL", postalCode: "35007", addressCountry: "US" },
  },
  description:
    "Code-compliant termite pre-treatments for Alabama new construction: soil treatment, Sentricon® baiting system, or combination. Paperwork and WDO documentation included.",
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.envirocarellc.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.envirocarellc.com/services" },
    { "@type": "ListItem", position: 3, name: "Builder Pre-Treatment", item: "https://www.envirocarellc.com/services/builder-pre-treat" },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When during construction does the pre-treatment happen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Soil treatment happens after footings are poured and before the slab is placed — timing is critical. Sentricon® can be installed at or after framing. We coordinate directly with your super to hit the right window.",
      },
    },
    {
      "@type": "Question",
      name: "What paperwork does the builder receive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide a treatment certificate and the Alabama Department of Agriculture WDO documentation required by most lenders and inspectors. Sentricon® installations also include an EnviroCare service agreement.",
      },
    },
    {
      "@type": "Question",
      name: "Can the homeowner continue Sentricon® service after closing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Sentricon® installations transfer to the homeowner seamlessly. We contact them directly before their first renewal so there's no coverage gap.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with production builders on multiple lots?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We batch-schedule across active lots in the same subdivision to minimize your superintendent's coordination time. Call our office to set up a builder account.",
      },
    },
  ],
};

export default function BuilderPreTreatPage() {
  const serif: React.CSSProperties = { fontFamily: "var(--font-serif)" };
  const sans: React.CSSProperties = { fontFamily: "var(--font-sans)" };

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
              For Alabama Builders
            </div>
            <h1 style={{ ...serif, fontSize: "clamp(36px, 5.5vw, 52px)", fontWeight: 700, margin: "0 0 18px", lineHeight: 1.1 }}>
              New Construction
              <br />
              <em style={{ color: GOLD, fontWeight: 500 }}>Termite Pre-Treatment</em>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.92, maxWidth: 720, margin: "0 auto 36px" }}>
              Code-compliant pre-treat at the right point in the build. We coordinate around your schedule, deliver the paperwork
              your inspector needs, and hand the homeowner a clean termite warranty at closing.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="tel:2059406360"
                style={{
                  display: "inline-block",
                  background: GOLD,
                  color: "#000",
                  padding: "14px 32px",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: "none",
                }}
              >
                Birmingham: (205) 940-6360
              </Link>
              <Link
                href="tel:2569377676"
                style={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.15)",
                  border: "2px solid rgba(255,255,255,0.5)",
                  color: "#fff",
                  padding: "14px 32px",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: "none",
                }}
              >
                Huntsville: (256) 937-7676
              </Link>
            </div>
          </div>
        </section>

        {/* 3 TREATMENT PATHS */}
        <section style={{ padding: "72px 24px", maxWidth: 1020, margin: "0 auto" }}>
          <h2 style={{ ...serif, fontSize: 32, color: DEEP, textAlign: "center", marginBottom: 10 }}>
            Three Treatment Paths
          </h2>
          <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 52 }}>
            We match the method to the site, budget, and buyer expectations.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
            {[
              {
                title: "Soil Treatment",
                badge: "Most Common",
                badgeColor: BRAND_GREEN,
                desc: "Liquid termiticide applied to the soil under and around the slab before it's poured. Fast, one-time application. Meets Alabama code. Best for production builds where speed matters.",
                points: ["Applied at pre-slab stage", "Alabama code-compliant", "Paperwork issued promptly", "Transferable to homeowner"],
              },
              {
                title: "Sentricon® Always Active™",
                badge: "Best Long-Term Value",
                badgeColor: GOLD,
                badgeTextColor: INK,
                desc: "In-ground bait stations installed around the perimeter. No drilling, no tank trucks — bait is always active 24/7. Includes up to $1,000,000 repair coverage. Homeowner continues service at annual renewal.",
                points: ["No drilling or soil injection", "Up to $1M repair coverage", "Transfers seamlessly to owner", "Annual renewal keeps coverage active"],
              },
              {
                title: "Combination",
                badge: "Premium Protection",
                badgeColor: DEEP,
                desc: "Soil treatment at pre-slab for immediate code compliance, followed by Sentricon® installation at framing or after. Two-layer protection for high-value construction or lots with known termite pressure.",
                points: ["Code compliance at slab stage", "Sentricon® warranty at closing", "Up to $1M coverage", "Ideal for high-value homes"],
              },
            ].map((path, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "32px 26px",
                  boxShadow: "0 3px 16px rgba(0,0,0,0.08)",
                  borderTop: `5px solid ${path.badgeColor}`,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    background: path.badgeColor,
                    color: path.badgeTextColor || "#fff",
                    padding: "4px 12px",
                    borderRadius: 4,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                    alignSelf: "flex-start",
                  }}
                >
                  {path.badge}
                </div>
                <h3 style={{ ...serif, fontSize: 22, color: DEEP, marginBottom: 12 }}>{path.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "#555", marginBottom: 20, flexGrow: 1 }}>{path.desc}</p>
                <ul style={{ margin: 0, padding: "0 0 0 18px", color: "#444", fontSize: 14, lineHeight: 2 }}>
                  {path.points.map((pt, j) => <li key={j}>{pt}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section style={{ background: "#fff", padding: "56px 24px", borderTop: `1px solid rgba(14,142,64,0.1)`, borderBottom: `1px solid rgba(14,142,64,0.1)` }}>
          <div style={{ maxWidth: 920, margin: "0 auto" }}>
            <h2 style={{ ...serif, fontSize: 28, color: DEEP, margin: "0 0 36px", textAlign: "center" }}>
              How the scheduling works
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
              {[
                { day: "Contract", text: "Call us when the lot closes or permit is pulled" },
                { day: "Pre-Slab", text: "Soil treatment scheduled around your concrete pour" },
                { day: "Framing", text: "Sentricon® stations installed if that's the path" },
                { day: "Closing", text: "Certificate + warranty delivered to closing agent" },
              ].map((s, i) => (
                <div key={i} style={{ background: CREAM, padding: 20, borderRadius: 10, border: `1px solid rgba(14,142,64,0.15)`, textAlign: "center" }}>
                  <div style={{ ...serif, fontSize: 13, color: GOLD, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 8, textTransform: "uppercase" }}>
                    {s.day}
                  </div>
                  <p style={{ fontSize: 14, color: INK, fontWeight: 500, margin: 0, lineHeight: 1.5 }}>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY ENVIROCARE FOR BUILDERS */}
        <section style={{ padding: "64px 24px", maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ ...serif, fontSize: 28, color: DEEP, textAlign: "center", marginBottom: 40 }}>
            Why builders choose EnviroCare
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {[
              { title: "Family-owned since 1958", detail: "Four generations in Alabama. We've been doing pre-treats longer than most builders have been building." },
              { title: "Sentricon® Certified Specialist", detail: "Not every company is certified. We are. That matters when the homeowner calls years later." },
              { title: "Paperwork handled", detail: "Alabama ADAI documentation, treatment certificates, and warranty transfers — all included, no chasing." },
              { title: "Three Alabama offices", detail: "Birmingham/Alabaster, Alex City/Lake Martin, and Huntsville. We cover most of the state without long-haul scheduling." },
              { title: "Homeowner-ready handoff", detail: "We contact your buyer before their first renewal so there's no coverage gap between closing and ownership." },
              { title: "WDO letters too", detail: "Need a WDO inspection letter for a resale or refinance? We do those as well — same company, same standards." },
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: `1px solid rgba(14,142,64,0.18)`,
                  borderRadius: 10,
                  padding: 20,
                }}
              >
                <div style={{ ...serif, fontSize: 17, color: DEEP, fontWeight: 700, marginBottom: 6 }}>{c.title}</div>
                <p style={{ fontSize: 14, color: "#4b5563", margin: 0, lineHeight: 1.6 }}>{c.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: "#fff", padding: "64px 24px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <h2 style={{ ...serif, fontSize: 28, color: DEEP, textAlign: "center", marginBottom: 40 }}>
              Builder FAQs
            </h2>
            {[
              {
                q: "When during construction does the pre-treatment happen?",
                a: "Soil treatment happens after footings are poured and before the slab is placed — timing is critical. Sentricon® can be installed at or after framing. We coordinate directly with your super to hit the right window.",
              },
              {
                q: "What paperwork does the builder receive?",
                a: "We provide a treatment certificate and the Alabama Department of Agriculture WDO documentation required by most lenders and inspectors. Sentricon® installations also include an EnviroCare service agreement.",
              },
              {
                q: "Can the homeowner continue Sentricon® service after closing?",
                a: "Yes. Sentricon® installations transfer to the homeowner seamlessly. We contact them directly before their first renewal so there's no coverage gap.",
              },
              {
                q: "Do you work with production builders on multiple lots?",
                a: "Yes. We batch-schedule across active lots in the same subdivision to minimize your superintendent's coordination time. Call our office to set up a builder account.",
              },
              {
                q: "Why does a new home need termite treatment at all?",
                a: "Alabama has some of the heaviest subterranean termite pressure in the country, and a fresh slab on disturbed soil is a prime target. Pre-construction termite treatment plus the Sentricon® bait system gives the home two layers of termite control from day one — far cheaper than dealing with a termite infestation after drywall is up. Buyers also increasingly expect pest control protection to convey at closing.",
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

        {/* CROSS-LINK + OFFICE CONTACTS */}
        <section style={{ padding: "48px 24px", background: DEEP, color: "#fff" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: 15, opacity: 0.8, marginBottom: 12 }}>
              Need a WDO letter for a resale or refinance?{" "}
              <Link href="/services/wdo-letters" style={{ color: GOLD, textDecoration: "underline" }}>
                See our WDO Inspection Letters page →
              </Link>
            </p>
          </div>
        </section>

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
