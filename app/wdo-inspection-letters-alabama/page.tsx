// B2B landing page — aimed at real-estate agents, closing attorneys, and
// lenders, NOT homeowners (the homeowner page is /services/wdo-letters).
// Campaign-plan Track E4: WDO letters are recurring, referral-driven volume,
// relationship-sold to the people who order them for every closing.
//
// Deliberate omissions (compliance):
// - NO turnaround-hour promises ("24 hours"/"48-72") — that claim is flagged
//   for Phillip's review on the homeowner page; this page says "built around
//   your closing date" until ops confirms what they honor.
// - No prices invented; scheduling call quotes the fee.
// - No individual employee named.
import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "WDO Letters for Alabama Closings — Agent & Attorney Direct | EnviroCare";
const DESC =
  "Order Alabama WDO inspection letters — the Official Alabama Wood Infestation Inspection Report — for your closings — VA, FHA, conventional & refi accepted. Direct scheduling for agents, closing attorneys & lenders. (205) 940-6360.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/wdo-inspection-letters-alabama" },
  openGraph: { title: TITLE, description: DESC, images: ["/og-image.png"], type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og-image.png"] },
};

const GREEN = "#0A7935";
const DEEP = "#07642B";
const GOLD = "#F5A800";
const CREAM = "#FEFDF8";
const INK = "#0E1A0F";

const OFFICES = [
  { area: "Birmingham metro — Jefferson & Shelby", phone: "(205) 940-6360", tel: "2059406360" },
  { area: "Huntsville — Madison County", phone: "(256) 937-7676", tel: "2569377676" },
  { area: "Lake Martin / Alex City — Tallapoosa & Lee", phone: "(256) 234-6162", tel: "2562346162" },
];

const FAQS = [
  {
    q: "What is actually in an Alabama WDO report?",
    a: "Two parts, and Rule 80-10-9-.18 requires both. Part A is the report proper — the inspecting company, the license or permit number of the certified operator, the inspection date, the findings and any recommendations, plus the buyer's acknowledgment line. Part B is the structural diagram together with the consumer information section that sets out the scope and limitations of the inspection. The buyer's acknowledgment on Part A refers to Part A and Part B together, so a file holding only Part A is incomplete. We keep both on file for one year after inspection, as the rule requires.",
  },
  {
    q: "How long does the report cover the property?",
    a: "Rule 80-10-9-.18 provides that where the report certifies apparent freedom from wood-destroying organisms and an infestation is found within ninety days of issuance, the licensee treats the structure at no charge. That is a specific obligation under the rule and is separate from a lender's acceptance window, which the lender sets — confirm that requirement on each file.",
  },
  {
    q: "Which loan types does your WDO letter satisfy?",
    a: "We complete the Alabama Department of Agriculture and Industries Official Alabama Wood Infestation Inspection Report, accepted for VA, FHA, conventional, and refinance transactions statewide. VA appraisers see this form constantly; there's no follow-up form fight.",
  },
  {
    q: "How do you handle a closing date?",
    a: "Tell us the date when you order and we schedule the inspection around it — the letter goes to the agent, lender, and buyer as soon as the inspection is complete. If a file is genuinely tight, say so on the phone and we'll tell you honestly whether we can make it before you commit.",
  },
  {
    q: "What happens when the inspection finds activity?",
    a: "The findings are documented on the form as required, and we quote treatment at the same time — usually Sentricon® — so the parties can negotiate repairs with a real number instead of an unknown. Treatment can typically be arranged fast enough to keep the file moving.",
  },
  {
    q: "Can the buyer keep termite coverage after closing?",
    a: "Yes, two ways: an existing Sentricon® system's coverage can transfer with the home, and a new Sentricon® plan can be set up at or after closing — with up to $1,000,000 in damage repair coverage backed by EnviroCare's own guarantee. Either one is a selling point your buyer hears from us, not a surprise.",
  },
  {
    q: "Do you work with the same offices repeatedly?",
    a: "That's the model. Most of our WDO volume is agents, closing attorneys, and lender processors who order from us on every file because the form is right the first time and the communication is direct. Ask for a direct scheduling contact for your office.",
  },
];

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Alabama WDO Inspection Letters (Real Estate Closings)",
    serviceType: "Wood-Destroying Organism Inspection Report",
    audience: { "@type": "BusinessAudience", name: "Real estate agents, closing attorneys, and mortgage lenders" },
    provider: {
      "@type": "LocalBusiness",
      name: "EnviroCare Pest & Termite Services",
      telephone: "+1-205-940-6360",
      address: { "@type": "PostalAddress", streetAddress: "2025 Butler Rd", addressLocality: "Alabaster", addressRegion: "AL", postalCode: "35007", addressCountry: "US" },
      parentOrganization: { "@type": "Organization", name: "EnviroCare Pest & Termite Services", foundingDate: "1958" },
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Jefferson County, Alabama" },
      { "@type": "AdministrativeArea", name: "Shelby County, Alabama" },
      { "@type": "AdministrativeArea", name: "Madison County, Alabama" },
      { "@type": "AdministrativeArea", name: "Tallapoosa County, Alabama" },
      { "@type": "AdministrativeArea", name: "Lee County, Alabama" },
    ],
    description:
      "Official Alabama Wood Infestation Inspection Reports for wood-destroying organisms, for Alabama real estate closings — VA, FHA, conventional, and refinance. Direct scheduling for agents, closing attorneys, and lenders.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.envirocarellc.com/" },
      { "@type": "ListItem", position: 2, name: "WDO Letters for Closings" },
    ],
  },
];

export default function Page() {
  const serif: React.CSSProperties = { fontFamily: "var(--font-serif)" };
  return (
    <main style={{ fontFamily: "var(--font-sans)", color: INK, background: "#fff" }}>
      {schema.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* HERO */}
      <section style={{ background: `linear-gradient(160deg, ${DEEP} 0%, ${GREEN} 70%)`, color: "#fff", padding: "clamp(48px, 8vw, 84px) 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <p style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, margin: "0 0 14px" }}>
            For Agents · Closing Attorneys · Lenders
          </p>
          <h1 style={{ ...serif, fontSize: "clamp(30px, 6.5vw, 50px)", lineHeight: 1.14, margin: "0 0 16px" }}>
            The WDO Letter Your Closing Is Waiting On
          </h1>
          <p style={{ fontSize: "clamp(16px, 2.4vw, 19px)", lineHeight: 1.6, opacity: 0.92, maxWidth: 620, margin: "0 auto 26px" }}>
            Official Alabama Wood Infestation Inspection Reports, scheduled around your closing date and delivered to every
            party on the file. Accepted for VA, FHA, conventional, and refinance loans statewide. One licensed,
            fourth-generation Alabama company since 1958 — and a direct line, not a queue.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a href="tel:2059406360" style={{ background: GOLD, color: INK, padding: "16px 30px", borderRadius: 10, fontWeight: 800, textDecoration: "none", fontSize: 17 }}>
              Order a Letter: (205) 940-6360
            </a>
            <Link href="/quote" style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.5)", padding: "14px 28px", borderRadius: 10, fontWeight: 700, textDecoration: "none", fontSize: 17 }}>
              Request Online
            </Link>
          </div>
          <p style={{ fontSize: 15, margin: "22px auto 0", maxWidth: 620, opacity: 0.9 }}>
            Ordering one this week?{" "}
            <Link href="/wdo-letter-checklist-alabama" style={{ color: GOLD, fontWeight: 700 }}>
              Run the free pre-inspection checklist first
            </Link>{" "}
            &mdash; it&rsquo;s the handful of preventable things that hold letters up.
          </p>
        </div>
      </section>

      {/* WHY US — B2B angles */}
      <section style={{ padding: "clamp(48px, 7vw, 72px) 20px", maxWidth: 1000, margin: "0 auto" }}>
        <h2 style={{ ...serif, fontSize: "clamp(26px, 5vw, 34px)", color: DEEP, margin: "0 0 10px", textAlign: "center" }}>
          Built for the people who order these every week
        </h2>
        <p style={{ fontSize: 16, color: "#4b5563", textAlign: "center", maxWidth: 680, margin: "0 auto 36px", lineHeight: 1.65 }}>
          A WDO letter is a small line item that can hold up a six-figure closing. Our job is making sure it never does.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 16 }}>
          {[
            {
              t: "The right form, the first time",
              b: "Every letter is the Alabama Department of Agriculture and Industries Official Alabama Wood Infestation Inspection Report, completed by a licensed inspector. VA and FHA files clear without a form fight, because it's the form their appraisers expect.",
            },
            {
              t: "Scheduled to the closing, not to our route",
              b: "Give us the closing date when you order and we work backward from it. Every party — agent, lender, buyer — gets the completed letter as soon as the inspection is done.",
            },
            {
              t: "Findings come with a number attached",
              b: "When we find activity, you don't just get a problem — you get the documented findings plus a treatment quote at the same time, so repairs can be negotiated with a real figure and the file keeps moving.",
            },
            {
              t: "A closing perk your buyer keeps",
              b: "Existing Sentricon® coverage can transfer with the home, and new buyers can start a plan at closing — up to $1,000,000 in damage repair coverage backed by EnviroCare's own guarantee. That's a talking point at the table, and a client of yours we then take care of for years.",
            },
            {
              t: "Four offices, five counties of closings",
              b: "Birmingham metro (Jefferson & Shelby), Huntsville (Madison), and Lake Martin/Alex City (Tallapoosa & Lee) — each with a local team that runs these inspections constantly.",
            },
            {
              t: "A direct contact for your office",
              b: "High-volume offices get a direct scheduling contact — no phone tree, no re-explaining your file. Most of our WDO work is repeat orders from the same closing teams, which tells you what you need to know.",
            },
          ].map((c) => (
            <div key={c.t} style={{ background: CREAM, border: "1px solid rgba(14,142,64,0.18)", borderRadius: 12, padding: "22px 20px" }}>
              <h3 style={{ ...serif, fontSize: 19, color: DEEP, margin: "0 0 8px" }}>{c.t}</h3>
              <p style={{ fontSize: 15.5, color: "#4b5563", lineHeight: 1.6, margin: 0 }}>{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OFFICES */}
      <section style={{ background: CREAM, padding: "clamp(44px, 6vw, 64px) 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ ...serif, fontSize: "clamp(24px, 5vw, 32px)", color: DEEP, margin: "0 0 24px" }}>
            Order from the office that covers your closing
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: 14 }}>
            {OFFICES.map((o) => (
              <a key={o.tel} href={`tel:${o.tel}`} style={{ display: "block", background: "#fff", border: "1px solid rgba(14,142,64,0.2)", borderRadius: 12, padding: "20px 16px", textDecoration: "none", color: INK }}>
                <div style={{ ...serif, fontSize: 17, color: DEEP, fontWeight: 700, marginBottom: 6 }}>{o.area}</div>
                <div style={{ fontSize: 17, color: GREEN, fontWeight: 700 }}>{o.phone}</div>
              </a>
            ))}
          </div>
          <p style={{ fontSize: 14, color: "#6b7280", marginTop: 18 }}>
            Homeowner ordering a letter for your own sale?{" "}
            <Link href="/services/wdo-letters" style={{ color: GREEN, fontWeight: 700 }}>
              Start here instead
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "clamp(44px, 6vw, 64px) 20px", maxWidth: 820, margin: "0 auto" }}>
        <h2 style={{ ...serif, fontSize: "clamp(24px, 5vw, 32px)", color: DEEP, margin: "0 0 28px", textAlign: "center" }}>
          Closing-desk questions
        </h2>
        {FAQS.map((f, i) => (
          <details key={i} style={{ background: "#fff", border: "1px solid rgba(14,142,64,0.15)", borderRadius: 12, padding: "18px 20px", marginBottom: 12 }}>
            <summary style={{ ...serif, fontSize: 17, color: DEEP, fontWeight: 700, cursor: "pointer", listStyle: "none" }}>{f.q}</summary>
            <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.65, marginTop: 12, marginBottom: 0 }}>{f.a}</p>
          </details>
        ))}
      </section>

      {/* CTA */}
      <section style={{ background: INK, color: "#fff", padding: "clamp(40px, 6vw, 56px) 20px", textAlign: "center" }}>
        <h2 style={{ ...serif, fontSize: "clamp(24px, 5vw, 30px)", color: GOLD, margin: "0 0 12px" }}>
          Put us on your closing checklist
        </h2>
        <p style={{ fontSize: 16, opacity: 0.85, marginBottom: 24, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
          One call orders the letter; every party gets it the moment it's done. Family-owned, four generations, since 1958.
        </p>
        <a href="tel:2059406360" style={{ background: GOLD, color: INK, padding: "16px 30px", borderRadius: 10, fontWeight: 800, textDecoration: "none", fontSize: 17 }}>
          Call (205) 940-6360
        </a>
      </section>
    </main>
  );
}
