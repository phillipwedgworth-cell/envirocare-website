// Reference asset, not a sales page. Built to be BOOKMARKED AND LINKED by real
// estate agents, closing attorneys and lender processors — that is the whole
// point. The pitch lives at /wdo-inspection-letters-alabama; this page earns
// links, and links are what Google AI Overviews reads.
//
// Compliance rules observed here:
// - NO form number is asserted. Rule text read directly 2026-08-08
//   (admincode.legislature.state.al.us/api/rule/80-10-9-.18): the instrument is
//   the "Official Alabama Wood Infestation Inspection Report", Part A and Part B,
//   and the form is Exhibit "A" to the rule, available from the Commissioner for
//   reproduction. Alabama uses its OWN report — it is not the NPMA-33 industry
//   form, and no "ADAI-WDO-100" designation exists anywhere in the rule.
// - NO turnaround-time promise. Same rule as the B2B page.
// - NO claim about who pays — that is set by the purchase contract and varies.
//   The ninety-day retreatment provision IS stated, because the rule fixes it;
//   it is distinguished from a lender's acceptance window, which the rule does
//   not set.
// - NO contract/agreement claims of any kind (see data/compliance.ts).
// - NO use of the word "guarantee" — banned outright in agents/lib/compliance.mjs.
//   Termite coverage is "up to $1,000,000 in damage repair coverage, subject to
//   the terms of the agreement".
import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "Alabama WDO Letter Checklist for Realtors | EnviroCare";
const DESC =
  "A practical pre-inspection checklist for Alabama real estate closings: what to have ready, what delays a WDO letter, and what to do when the report finds activity. Free reference for agents, closing attorneys and lenders.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/wdo-letter-checklist-alabama" },
  openGraph: { title: TITLE, description: DESC, url: "https://www.envirocarellc.com/wdo-letter-checklist-alabama", images: ["/og-image.png"], type: "article" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og-image.png"] },
};

const GREEN = "#0A7935";
const DEEP = "#07642B";
const GOLD = "#F5A800";
const CREAM = "#FEFDF8";
const INK = "#0E1A0F";
const MUT = "#4b5563";

/* ---------------------------------------------------------------- content */

const ORDER_INFO: [string, string][] = [
  ["Full property address", "Including unit or lot number. A wrong address is the single most common reason a letter has to be reissued."],
  ["Closing date", "Give it at order time. Everything is scheduled backward from this."],
  ["Loan type", "VA, FHA, conventional or refinance. It changes who receives the report and how closely it gets read."],
  ["Who gets the finished letter", "Agent, closing attorney, lender processor, buyer — list every address up front rather than forwarding it later."],
  ["Access contact", "The person who can physically open the house, the crawlspace and any gates. Usually the listing agent or seller, rarely the buyer."],
  ["Occupancy status", "Vacant, seller-occupied or tenant-occupied. Tenants need notice, and that notice period is a scheduling constraint."],
];

const PREP = [
  { t: "Crawlspace access, unlocked and clear", b: "This is the number one cause of a return trip. The inspector has to physically enter. A padlocked door, a screwed-down panel, or a hatch blocked by stored furniture means the inspection cannot be completed that day." },
  { t: "Attic hatch reachable", b: "Move anything stacked underneath it. If the only access is inside a closet, clear the shelf below." },
  { t: "Garage perimeter walls exposed", b: "Boxes, shelving and stored lumber against the walls hide exactly the areas that have to be examined. Twelve to eighteen inches of clearance is enough." },
  { t: "Water heater and under-sink cabinets clear", b: "Plumbing penetrations and any long-term moisture around them are inspection points." },
  { t: "Gates unlocked, pets secured", b: "A dog in the back yard stops the exterior inspection as completely as a locked gate does." },
  { t: "Utilities on", b: "On a vacant or foreclosure property, no power means no light in the crawlspace or attic. Confirm before the appointment, not on the day." },
  { t: "Stored firewood and mulch noted", b: "Wood in contact with the structure is a conducive condition and gets recorded. Moving it before the inspection is legitimate; it is a genuine correction, not concealment." },
];

// Part A / Part B structure. Sourced from Ala. Admin. Code r. 80-10-9-.18,
// which requires both parts and attaches the form as Exhibit "A"; the
// per-part breakdown is corroborated by the printed state forms in circulation
// (Part A = the report, Part B = the diagram plus the consumer information
// section). Physical format deliberately not asserted — it varies by printer.
const PARTS = [
  {
    tag: "Part A",
    title: "The report itself",
    b: "Carries the inspecting company's identity — name, address and the license or permit number of the certified operator — plus the inspection date, the findings, and any recommendations. This is the part everyone means when they say “the termite letter.” It also carries the buyer's acknowledgment line, and that line refers to Part A AND Part B together.",
  },
  {
    tag: "Part B",
    title: "The diagram and the consumer information section",
    b: "A sketch of the structure showing where findings and inaccessible areas actually are, plus the CONSUMER INFORMATION SECTION setting out the scope and limitations of the inspection. It is not an optional attachment or a courtesy page — Rule 80-10-9-.18 names Part B in the same breath as Part A and requires both.",
  },
];

const DELAYS = [
  { t: "Obstructed or inaccessible areas", b: "Anything the inspector cannot reach is recorded as inaccessible. Lenders and VA appraisers read that line, and it can generate a request for a re-inspection — which costs more days than clearing the space would have." },
  { t: "Ordering too late in the file", b: "A WDO letter is a small line item that can hold a six-figure closing. Order when the inspection period opens, not the week of closing." },
  { t: "Address or party details wrong on the order", b: "The letter has to be reissued, and re-issued letters arrive after the original deadline." },
  { t: "Nobody can open the house", b: "Lockbox codes that have changed, a tenant who was not given notice, a seller who is out of town." },
  { t: "Activity found with no treatment quote attached", b: "If the report documents activity and the parties have no number to negotiate against, the file stalls while they get one. Ask for the treatment quote at the same visit." },
];

const FAQS = [
  {
    q: "What is the official Alabama WDO report?",
    a: "Alabama Administrative Code Rule 80-10-9-.18 establishes the Official Alabama Wood Infestation Inspection Report as the written instrument used when a report is required as a condition of sale financing or refinancing. It has two parts — Part A and Part B — and the form itself is Exhibit A to that rule, available from the Commissioner of Agriculture and Industries. Alabama uses its own state report rather than an industry form. The inspection may only be performed by a qualified inspector, and the report only completed and issued by someone certified and permitted in the structural pest control category covering wood-destroying organisms.",
  },
  {
    q: "When should the inspection be ordered?",
    a: "As soon as the inspection period opens. Ordering early costs nothing and leaves room for the two things that actually delay files: an access problem that forces a return trip, and findings that need a treatment quote before the parties can negotiate.",
  },
  {
    q: "What happens if the report documents activity?",
    a: "The findings go on the form as required — that is not negotiable and no reputable inspector will leave them off. What keeps the file moving is getting a treatment quote at the same time, so the parties are negotiating against a real number instead of an unknown. Ask for both when you order.",
  },
  {
    q: "Who pays for the inspection, and how long is a report good for?",
    a: "Who pays is set by the purchase contract, not by the inspection company, and it varies between transactions — check the contract on each file. On validity, note what Rule 80-10-9-.18 actually provides: where the report certifies apparent freedom from wood-destroying organisms and an infestation is found within ninety days of issuance, the licensee must treat the structure at no charge. That ninety-day provision is not the same thing as a lender's acceptance window, which is set by the lender. Confirm the lender's requirement separately.",
  },
  {
    q: "What happens to areas the inspector cannot reach?",
    a: "Rule 80-10-9-.18 requires the inspection to examine visible, accessible areas in accordance with accepted procedures, and states plainly that inspection of inaccessible areas is not required — concealed infestation or damage in those areas may not be discovered. That is exactly why the preparation list above matters: anything left blocked simply does not get inspected, and the report says so. The permittee is responsible for the accuracy of the report as to what was visible and accessible on the date of inspection.",
  },
  {
    q: "How long does the inspector keep a copy?",
    a: "Rule 80-10-9-.18 requires the permittee to keep a copy of Part A and Part B on file for one year following the inspection, available to the Commissioner of Agriculture and Industries or an authorized agent on request. If you need a reissue inside that window, the file exists.",
  },
  {
    q: "Does moving firewood or mulch before the inspection look like concealment?",
    a: "No. Wood in contact with a structure is a conducive condition, and correcting it is a real correction. What is not acceptable is concealing evidence of activity or damage — that is a different thing entirely, and an experienced inspector will find it regardless.",
  },
  {
    q: "Can termite coverage transfer to the buyer at closing?",
    a: "An existing Sentricon® system's coverage can transfer with the home, and a new plan can be set up at or after closing, with up to $1,000,000 in damage repair coverage, subject to the terms of the agreement and to inspection. Worth raising with the buyer during the inspection period rather than after they move in.",
  },
];

// Four offices as of 2026-08-05. The Birmingham/Alabaster split follows the
// dispatch decision: Jefferson County and the Hwy 280 / 35242 corridor answer
// from Birmingham; the rest of Shelby answers from Alabaster.
const OFFICES = [
  { area: "Birmingham — Jefferson & the Hwy 280 corridor", phone: "(205) 991-2882", tel: "2059912882" },
  { area: "Alabaster — Pelham, Helena, Calera & south Shelby", phone: "(205) 940-6360", tel: "2059406360" },
  { area: "Huntsville — Madison County", phone: "(256) 937-7676", tel: "2569377676" },
  { area: "Lake Martin / Alex City — Tallapoosa & Lee", phone: "(256) 234-6162", tel: "2562346162" },
];

/* ----------------------------------------------------------------- schema */

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to prepare a property for an Alabama WDO inspection",
    description:
      "A pre-inspection checklist for Alabama real estate closings — what to have ready so a wood-destroying organism inspection can be completed in one visit.",
    totalTime: "PT30M",
    step: PREP.map((p, i) => ({ "@type": "HowToStep", position: i + 1, name: p.t, text: p.b })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Alabama WDO Letter Checklist for Realtors",
    description: DESC,
    audience: { "@type": "BusinessAudience", name: "Real estate agents, closing attorneys and mortgage lenders" },
    author: {
      "@type": "Organization",
      name: "EnviroCare",
      url: "https://www.envirocarellc.com/",
    },
    publisher: { "@type": "Organization", name: "EnviroCare", url: "https://www.envirocarellc.com/" },
    about: { "@type": "Thing", name: "Wood-destroying organism inspection reports in Alabama" },
    isAccessibleForFree: true,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.envirocarellc.com/" },
      { "@type": "ListItem", position: 2, name: "WDO Letters for Closings", item: "https://www.envirocarellc.com/wdo-inspection-letters-alabama" },
      { "@type": "ListItem", position: 3, name: "WDO Letter Checklist" },
    ],
  },
];

/* ------------------------------------------------------------------- page */

export default function Page() {
  const serif: React.CSSProperties = { fontFamily: "var(--font-serif)" };
  const wrap: React.CSSProperties = { maxWidth: 860, margin: "0 auto" };

  return (
    <main style={{ fontFamily: "var(--font-sans)", color: INK, background: "#fff" }}>
      {schema.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* HERO */}
      <section style={{ background: `linear-gradient(160deg, ${DEEP} 0%, ${GREEN} 70%)`, color: "#fff", padding: "clamp(44px, 7vw, 76px) 20px" }}>
        <div style={wrap}>
          <p style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, margin: "0 0 14px" }}>
            Free reference · Agents · Closing attorneys · Lenders
          </p>
          <h1 style={{ ...serif, fontSize: "clamp(30px, 6vw, 46px)", lineHeight: 1.14, margin: "0 0 16px" }}>
            The Alabama WDO Letter Checklist
          </h1>
          <p style={{ fontSize: "clamp(16px, 2.3vw, 19px)", lineHeight: 1.65, opacity: 0.93, maxWidth: 660, margin: 0 }}>
            Almost every WDO letter that holds up a closing does so for one of five reasons, and four of them are
            preventable before the inspector arrives. This is the list we wish every file had run through first.
            Use it, print it, send it to your sellers — it is free and there is nothing to fill in.
          </p>
        </div>
      </section>

      {/* WHAT TO HAVE READY WHEN ORDERING */}
      <section style={{ padding: "clamp(44px, 6vw, 64px) 20px" }}>
        <div style={wrap}>
          <h2 style={{ ...serif, fontSize: "clamp(24px, 4.4vw, 32px)", color: DEEP, margin: "0 0 10px" }}>
            1. Have these six things in front of you when you order
          </h2>
          <p style={{ fontSize: 16, color: MUT, lineHeight: 1.65, margin: "0 0 26px" }}>
            Every one of these gets asked on the call. Having them ready turns a five-minute order into a
            ninety-second one, and prevents the reissues that cost days later.
          </p>
          <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {ORDER_INFO.map(([t, b]) => (
              <li key={t} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: "1px solid #E8EDE9" }}>
                <span aria-hidden style={{ color: GREEN, fontWeight: 800, fontSize: 18, lineHeight: 1.4 }}>·</span>
                <span>
                  <strong style={{ display: "block", fontSize: 16, marginBottom: 3 }}>{t}</strong>
                  <span style={{ fontSize: 15, color: MUT, lineHeight: 1.6 }}>{b}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PRE-INSPECTION PREP */}
      <section style={{ background: CREAM, padding: "clamp(44px, 6vw, 64px) 20px" }}>
        <div style={wrap}>
          <h2 style={{ ...serif, fontSize: "clamp(24px, 4.4vw, 32px)", color: DEEP, margin: "0 0 10px" }}>
            2. Send this to whoever is preparing the house
          </h2>
          <p style={{ fontSize: 16, color: MUT, lineHeight: 1.65, margin: "0 0 26px" }}>
            An inspector who cannot reach an area has to record it as inaccessible. That line gets read by lenders
            and VA appraisers, and it is how a routine file turns into a re-inspection request.
          </p>
          <div style={{ display: "grid", gap: 12 }}>
            {PREP.map((p, i) => (
              <div key={p.t} style={{ background: "#fff", border: "1px solid #E2E8E4", borderRadius: 12, padding: "16px 18px", display: "flex", gap: 14 }}>
                <span aria-hidden style={{ flex: "0 0 26px", height: 26, borderRadius: 7, background: GREEN, color: "#fff", fontWeight: 800, fontSize: 13, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  {i + 1}
                </span>
                <div>
                  <strong style={{ display: "block", fontSize: 16, marginBottom: 3 }}>{p.t}</strong>
                  <span style={{ fontSize: 15, color: MUT, lineHeight: 1.6 }}>{p.b}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PART A / PART B */}
      <section style={{ padding: "clamp(44px, 6vw, 64px) 20px" }}>
        <div style={wrap}>
          <h2 style={{ ...serif, fontSize: "clamp(24px, 4.4vw, 32px)", color: DEEP, margin: "0 0 10px" }}>
            3. A complete report is two parts, not one
          </h2>
          <p style={{ fontSize: 16, color: MUT, lineHeight: 1.65, margin: "0 0 26px" }}>
            This is the detail that most often makes a file incomplete without anyone noticing. Rule 80-10-9-.18
            requires the Official Alabama Wood Infestation Inspection Report as Part A <em>and</em> Part B, and the
            buyer&rsquo;s acknowledgment on Part A refers to both. A file holding only Part A is missing the half
            that defines what the inspection did and did not cover.
          </p>
          <div style={{ display: "grid", gap: 12 }}>
            {PARTS.map((p) => (
              <div key={p.tag} style={{ background: "#fff", border: "1px solid #E2E8E4", borderRadius: 12, padding: "16px 18px" }}>
                <span style={{ display: "inline-block", background: DEEP, color: "#fff", fontSize: 12, fontWeight: 800, letterSpacing: ".06em", padding: "3px 9px", borderRadius: 6, marginBottom: 8 }}>
                  {p.tag}
                </span>
                <strong style={{ display: "block", fontSize: 16, marginBottom: 4 }}>{p.title}</strong>
                <span style={{ fontSize: 15, color: MUT, lineHeight: 1.6 }}>{p.b}</span>
              </div>
            ))}
          </div>
          <div style={{ borderLeft: `4px solid ${GOLD}`, background: "#FFFDF6", borderRadius: "0 10px 10px 0", padding: "14px 18px", marginTop: 16 }}>
            <strong style={{ display: "block", fontSize: 15, marginBottom: 4 }}>Two practical consequences</strong>
            <span style={{ fontSize: 15, color: MUT, lineHeight: 1.6 }}>
              When a lender or closing attorney asks for &ldquo;the termite letter,&rdquo; send both parts — a Part A
              on its own can come back as incomplete. And because Part B is where inaccessible areas are drawn and
              the scope limitations are written, it is the part that answers a dispute later about what was actually
              examined. The permittee must keep both on file for one year after the inspection, so a reissue inside
              that window is a phone call.
            </span>
          </div>
        </div>
      </section>

      {/* WHAT ACTUALLY DELAYS THINGS */}
      <section style={{ padding: "clamp(44px, 6vw, 64px) 20px" }}>
        <div style={wrap}>
          <h2 style={{ ...serif, fontSize: "clamp(24px, 4.4vw, 32px)", color: DEEP, margin: "0 0 10px" }}>
            4. The five things that actually delay a letter
          </h2>
          <p style={{ fontSize: 16, color: MUT, lineHeight: 1.65, margin: "0 0 26px" }}>
            In our experience these account for nearly all of it. Only the last one is outside anybody&rsquo;s control
            — and even that one is manageable if you plan for it.
          </p>
          <div style={{ display: "grid", gap: 12 }}>
            {DELAYS.map((d) => (
              <div key={d.t} style={{ borderLeft: `4px solid ${GOLD}`, background: "#FFFDF6", borderRadius: "0 10px 10px 0", padding: "14px 18px" }}>
                <strong style={{ display: "block", fontSize: 16, marginBottom: 3 }}>{d.t}</strong>
                <span style={{ fontSize: 15, color: MUT, lineHeight: 1.6 }}>{d.b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: CREAM, padding: "clamp(44px, 6vw, 64px) 20px" }}>
        <div style={wrap}>
          <h2 style={{ ...serif, fontSize: "clamp(24px, 4.4vw, 32px)", color: DEEP, margin: "0 0 24px" }}>
            Questions agents ask us most
          </h2>
          <div style={{ display: "grid", gap: 12 }}>
            {FAQS.map((f) => (
              <details key={f.q} style={{ background: "#fff", border: "1px solid #E2E8E4", borderRadius: 12, padding: "14px 18px" }}>
                <summary style={{ fontWeight: 700, fontSize: 16, cursor: "pointer", listStyle: "none" }}>{f.q}</summary>
                <p style={{ fontSize: 15, color: MUT, lineHeight: 1.65, margin: "10px 0 0" }}>{f.a}</p>
              </details>
            ))}
          </div>
          <p style={{ fontSize: 13, color: MUT, lineHeight: 1.6, marginTop: 22 }}>
            This page is general information for real estate professionals, not legal advice. Contract terms,
            lender requirements and who pays for what vary by transaction — confirm on each file with the closing
            attorney and lender.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "clamp(44px, 6vw, 64px) 20px" }}>
        <div style={{ ...wrap, textAlign: "center" }}>
          <h2 style={{ ...serif, fontSize: "clamp(24px, 4.4vw, 32px)", color: DEEP, margin: "0 0 10px" }}>
            When you&rsquo;re ready to order
          </h2>
          <p style={{ fontSize: 16, color: MUT, lineHeight: 1.65, maxWidth: 620, margin: "0 auto 26px" }}>
            A real person answers, at the office that covers your county. A family company doing pest control in
            Alabama since 1958, now in its fourth generation, never franchised.{" "}
            <Link href="/wdo-inspection-letters-alabama" style={{ color: GREEN, fontWeight: 700 }}>
              More on how we handle closings &rarr;
            </Link>
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 12 }}>
            {OFFICES.map((o) => (
              <a key={o.tel} href={`tel:${o.tel}`} style={{ display: "block", border: `1.5px solid ${GREEN}`, borderRadius: 12, padding: "16px 18px", textDecoration: "none", color: INK }}>
                <span style={{ display: "block", fontSize: 13, color: MUT, marginBottom: 4 }}>{o.area}</span>
                <strong style={{ fontSize: 19, color: GREEN }}>{o.phone}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
