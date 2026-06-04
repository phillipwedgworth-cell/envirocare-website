import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WDO Inspection Letters | EnviroCare Pest & Termite Services",
  description:
    "Wood-Destroying Organism (WDO) inspection letters for Alabama real estate closings. VA, FHA, and conventional. ADAI Form WDO-100. 24-hour turnaround. Birmingham, Huntsville & Lake Martin.",
  alternates: { canonical: "/services/wdo-letters" },
  robots: { index: true, follow: true },
};

const BRAND_GREEN = "#0E8E40";
const DEEP = "#07642B";
const GOLD = "#F5A800";
const CREAM = "#FEFDF8";
const INK = "#0E1A0F";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "WDO Wood-Destroying Organism Inspection Letter",
      provider: {
        "@type": "LocalBusiness",
        name: "EnviroCare Pest & Termite Services",
        telephone: "(205) 940-6360",
        url: "https://envirocarellc.com",
      },
      areaServed: { "@type": "State", name: "Alabama" },
      description:
        "Official WDO inspection letters (ADAI Form WDO-100) for Alabama real estate closings. Accepted for VA, FHA, and conventional loans. 24-hour turnaround available.",
      serviceType: "WDO Termite Inspection",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://envirocarellc.com/" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://envirocarellc.com/services" },
        { "@type": "ListItem", position: 3, name: "WDO Inspection Letters" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is a WDO letter and when is it required?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A WDO (Wood-Destroying Organism) letter is an official inspection report — ADAI Form WDO-100 in Alabama — documenting whether a property shows evidence of termites, wood-boring beetles, or fungal damage. VA loans require it at closing; FHA and many conventional lenders also require or request it.",
          },
        },
        {
          "@type": "Question",
          name: "How fast can you turn around a WDO letter?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We typically complete the inspection and issue the letter within 24 hours of the inspection for most areas we serve. Call as early as possible in the contract period — rush timelines are tight when closings are imminent.",
          },
        },
        {
          "@type": "Question",
          name: "Do you use the official ADAI WDO-100 form?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All WDO letters are issued on Alabama Department of Agriculture and Industries (ADAI) Form WDO-100, which is the required form accepted by lenders and title companies statewide.",
          },
        },
        {
          "@type": "Question",
          name: "What if the inspection finds active termites or damage?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We document the findings accurately. If treatment is needed, we can discuss options — including Sentricon® installation — and re-inspect as needed. Sellers, buyers, and their agents can all contact us directly.",
          },
        },
        {
          "@type": "Question",
          name: "Who pays for the WDO inspection?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In Alabama it varies by contract. VA loans typically require the seller to pay. Conventional and FHA it depends on the purchase agreement. Your real estate agent or lender can clarify who's responsible under your specific contract.",
          },
        },
      ],
    },
  ],
};

export default function WdoLettersPage() {
  const serif: React.CSSProperties = { fontFamily: "'Playfair Display', Georgia, serif" };
  const sans: React.CSSProperties = { fontFamily: "'DM Sans', system-ui, sans-serif" };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main style={{ background: CREAM, minHeight: "100vh", color: INK, ...sans }}>

        {/* HERO */}
        <section
          style={{
            background: `linear-gradient(135deg, ${DEEP} 0%, #0a5e28 100%)`,
            color: "#fff",
            padding: "72px 24px 56px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p style={{ fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.7, marginBottom: 12 }}>
              For Realtors, Lenders & Home Buyers
            </p>
            <h1 style={{ ...serif, fontSize: "clamp(30px, 5vw, 46px)", fontWeight: 700, margin: "0 0 16px", lineHeight: 1.2 }}>
              WDO Inspection Letters
            </h1>
            <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 580, margin: "0 auto 12px", lineHeight: 1.65 }}>
              Official ADAI Form WDO-100 for Alabama real estate closings. Accepted by VA, FHA, and conventional lenders.
            </p>
            <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 32 }}>
              24-hour turnaround available in most service areas.
            </p>
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
              Schedule an Inspection → (205) 940-6360
            </Link>
          </div>
        </section>

        {/* WHAT IT IS */}
        <section style={{ padding: "72px 24px", maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "start" }}>
            <div>
              <h2 style={{ ...serif, fontSize: 30, color: DEEP, marginBottom: 16 }}>
                What Is a WDO Letter?
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: "#444", marginBottom: 16 }}>
                A Wood-Destroying Organism (WDO) inspection letter is an official report — ADAI Form WDO-100 in Alabama — documenting
                whether a property shows evidence of termites, wood-boring beetles, or fungal wood decay.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: "#444", marginBottom: 16 }}>
                VA loans require it at closing. FHA and many conventional lenders also require or request it, especially in Alabama's
                termite-prone climate.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: "#444" }}>
                The letter is issued by a licensed pest control operator and becomes part of the closing packet.
              </p>
            </div>
            <div>
              <h2 style={{ ...serif, fontSize: 30, color: DEEP, marginBottom: 16 }}>
                Who Requests It?
              </h2>
              {[
                { who: "Buyers", why: "Required by lender; protects against buying a home with hidden termite damage." },
                { who: "Sellers", why: "Ordered proactively to speed closing and avoid last-minute surprises." },
                { who: "Realtors", why: "Coordinated early in the contract period to protect closing timelines." },
                { who: "Lenders & Title", why: "Required by VA; often required or requested on FHA and conventional." },
              ].map((r) => (
                <div
                  key={r.who}
                  style={{
                    display: "flex",
                    gap: 14,
                    marginBottom: 16,
                    padding: "14px 16px",
                    background: "#fff",
                    borderRadius: 8,
                    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                    borderLeft: `3px solid ${BRAND_GREEN}`,
                  }}
                >
                  <p style={{ fontWeight: 700, color: DEEP, minWidth: 70, margin: 0, fontSize: 15 }}>{r.who}</p>
                  <p style={{ fontSize: 15, color: "#444", lineHeight: 1.5, margin: 0 }}>{r.why}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOAN TYPES */}
        <section style={{ background: DEEP, color: "#fff", padding: "56px 24px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{ ...serif, fontSize: 28, marginBottom: 12, textAlign: "center" }}>
              Accepted for All Major Loan Types
            </h2>
            <p style={{ textAlign: "center", opacity: 0.85, marginBottom: 40, fontSize: 16 }}>
              Our WDO letters are issued on the official ADAI WDO-100 form and accepted statewide.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
              {[
                { type: "VA Loans", note: "Required at closing — seller typically pays per VA guidelines" },
                { type: "FHA Loans", note: "Required when evidence of infestation is noted or lender requests" },
                { type: "Conventional", note: "Frequently requested by lender; varies by underwriter" },
                { type: "Cash Sales", note: "Optional but recommended in Alabama's termite-active climate" },
              ].map((l) => (
                <div
                  key={l.type}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: 10,
                    padding: "24px 20px",
                    borderTop: `3px solid ${GOLD}`,
                  }}
                >
                  <p style={{ fontWeight: 700, fontSize: 17, margin: "0 0 8px", color: GOLD }}>{l.type}</p>
                  <p style={{ fontSize: 14, opacity: 0.85, margin: 0, lineHeight: 1.6 }}>{l.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section style={{ padding: "72px 24px", maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ ...serif, fontSize: 28, color: DEEP, textAlign: "center", marginBottom: 8 }}>
            How the Process Works
          </h2>
          <p style={{ textAlign: "center", color: "#555", marginBottom: 40, fontSize: 16 }}>
            Don't wait until the week of closing — schedule as soon as the contract is signed.
          </p>
          {[
            { day: "Day 1", title: "Schedule", body: "Call or contact your nearest EnviroCare office. Provide the property address and your closing date so we can prioritize." },
            { day: "Day 1–2", title: "Inspection", body: "A licensed technician inspects the interior and exterior of the structure, crawlspace, and accessible areas for evidence of WDO activity or damage." },
            { day: "Within 24 hrs", title: "Letter Issued", body: "We complete and issue ADAI Form WDO-100. It can be emailed directly to your agent, lender, or title company." },
            { day: "Closing", title: "Part of Your Packet", body: "The WDO letter becomes part of the closing disclosure package. If treatment was needed, we document that as well." },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 20,
                marginBottom: 28,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  minWidth: 80,
                  background: BRAND_GREEN,
                  color: "#fff",
                  borderRadius: 8,
                  padding: "8px 6px",
                  textAlign: "center",
                  flexShrink: 0,
                }}
              >
                <p style={{ fontSize: 11, opacity: 0.85, margin: "0 0 2px", fontWeight: 600 }}>STEP</p>
                <p style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>{item.day}</p>
              </div>
              <div>
                <p style={{ fontWeight: 700, color: DEEP, margin: "0 0 6px", fontSize: 16 }}>{item.title}</p>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "#444", margin: 0 }}>{item.body}</p>
              </div>
            </div>
          ))}
        </section>

        {/* FAQ */}
        <section style={{ background: "#fff", padding: "64px 24px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <h2 style={{ ...serif, fontSize: 28, color: DEEP, textAlign: "center", marginBottom: 40 }}>
              WDO Letter FAQs
            </h2>
            {[
              {
                q: "What is a WDO letter and when is it required?",
                a: "A WDO letter is an official inspection report — ADAI Form WDO-100 in Alabama — documenting whether a property shows evidence of termites, wood-boring beetles, or fungal damage. VA loans require it at closing; FHA and many conventional lenders also require or request it.",
              },
              {
                q: "How fast can you turn around a WDO letter?",
                a: "We typically complete the inspection and issue the letter within 24 hours in most areas we serve. Call early in the contract period — rush timelines are tight when closings are imminent.",
              },
              {
                q: "Do you use the official ADAI WDO-100 form?",
                a: "Yes. All WDO letters are issued on ADAI Form WDO-100, which is the required form accepted by lenders and title companies statewide.",
              },
              {
                q: "What if the inspection finds active termites or damage?",
                a: "We document findings accurately. If treatment is needed, we can discuss options — including Sentricon® installation — and re-inspect as needed. Sellers, buyers, and their agents can all contact us directly.",
              },
              {
                q: "Who pays for the WDO inspection?",
                a: "In Alabama it varies by contract. VA loans typically require the seller to pay. Conventional and FHA depend on the purchase agreement. Your real estate agent or lender can clarify who's responsible.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{ borderBottom: "1px solid rgba(14,142,64,0.15)", padding: "24px 0" }}
              >
                <h3 style={{ ...serif, fontSize: 18, color: DEEP, marginBottom: 10 }}>{item.q}</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "#444", margin: 0 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* OFFICES */}
        <section style={{ padding: "56px 24px", maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ ...serif, fontSize: 24, color: DEEP, textAlign: "center", marginBottom: 8 }}>
            Schedule Your WDO Inspection
          </h2>
          <p style={{ textAlign: "center", color: "#555", marginBottom: 32 }}>
            Call the office closest to the property.
          </p>
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
          <p style={{ textAlign: "center", marginTop: 24 }}>
            <Link href="/services/builder-pre-treat" style={{ color: BRAND_GREEN, fontWeight: 600 }}>
              Need pre-construction treatment for a new build? →
            </Link>
          </p>
        </section>

      </main>
    </>
  );
}
