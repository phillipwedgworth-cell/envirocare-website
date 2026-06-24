// app/pricing/PricingContent.tsx — "use client" interactive pricing page
// Metadata + JSON-LD are exported from app/pricing/page.tsx (server component).
//
// JOB 4 pricing model (June 15 2026):
//   ACH MONTHLY (monthly price ONLY when pest anchors the plan):
//     Pest + Mosquito  From $69/mo · $79 startup · tick +$20/visit
//     Pest + Termite   From $35/mo + Termite Quote · $229 startup
//     Complete         From $69/mo + Termite Quote · $229 startup · tick +$20/visit
//   BASE / À LA CARTE:
//     Pest only        From $35/mo · $99 startup
//     Mosquito alone   $45/visit × 9 (no monthly — no pest anchor)
//     Mosquito + Tick  $65/visit × 9 (no monthly — no pest anchor)
//   RULES: termite is NEVER a flat number; mosquito/tick without pest = per-service only.

"use client";

import { useState } from "react";

// ---------- BRAND TOKENS ----------
const GREEN = "#0A7935";
const FOREST = "#0A7935";
const DEEP = "#07642B";
const GOLD = "#F5A800";
const GOLD_DARK = "#C18400";
const INK = "#0E1A0F";
const CREAM = "#FEFDF8";
const PAPER = "#F8F6EE";
const GREY = "#6B7569";
const LINE = "rgba(14,26,15,0.12)";

// ---------- DATA ----------
type Plan = {
  name: string;
  tagline: string;
  priceLabel: string;     // big headline price, e.g. "From $69/mo" or "$45/visit × 9"
  startup: string;        // e.g. "$79 startup" or "No monthly — per service"
  note?: string;          // e.g. "Add tick: +$20/visit" or "Sentricon® priced after free WDO inspection"
  features: string[];
  cta: string;
  featured?: boolean;
};

// Monthly ACH plans — pest anchors every one (ACH/monthly requires a year-round anchor).
const MONTHLY_PLANS: Plan[] = [
  {
    name: "Pest + Mosquito",
    tagline: "Bimonthly pest + seasonal mosquito — most popular",
    priceLabel: "From $69/mo",
    startup: "$99 startup · ACH autopay",
    note: "Add tick: +$20/visit",
    features: [
      "Bimonthly perimeter pest treatment",
      "Seasonal mosquito (March–November)",
      "Unlimited free pest re-service",
      "Tick add-on available (+$20/visit)",
      "No contract — cancel anytime",
    ],
    cta: "Get my quote",
    featured: true,
  },
  {
    name: "Complete",
    tagline: "Pest + Termite + Mosquito — best value",
    priceLabel: "From ~$100/mo",
    startup: "$229 startup · ACH autopay",
    note: "+ Sentricon® termite, priced at inspection · add tick +$20/visit",
    features: [
      "Everything in Pest + Mosquito",
      "Sentricon® Always Active™ termite protection",
      "Up to $1,000,000 EnviroCare repair coverage",
      "One technician, one invoice",
      "Termite service & price provided upon inspection & approval",
    ],
    cta: "Get my quote",
  },
  {
    name: "Pest",
    tagline: "Bimonthly perimeter pest control",
    priceLabel: "From $35/mo",
    startup: "$79 startup · ACH · cancel anytime",
    note: "Add mosquito for $20 more at startup",
    features: [
      "Bimonthly perimeter treatment",
      "30+ common Alabama pests, incl. mice & rats",
      "Unlimited free re-service between visits",
      "Applied per label directions once dry",
      "No contract",
    ],
    cta: "Get my quote",
  },
];

// Per-service & inspection-priced — mosquito/tick alone are per-visit (no monthly without a pest anchor).
const ALACARTE_PLANS: Plan[] = [
  {
    name: "Mosquito",
    tagline: "Seasonal yard treatment",
    priceLabel: "$45/visit × 9",
    startup: "Per service — or $34/mo with a pest plan",
    note: "March–November · monthly only when bundled with pest",
    features: [
      "30-day yard barrier treatment",
      "Breeding sites + adult mosquitoes targeted",
      "9 rounds, March through November",
      "$34/mo rate available only with a pest plan",
    ],
    cta: "Get my quote",
  },
  {
    name: "Mosquito + Tick",
    tagline: "Seasonal yard treatment",
    priceLabel: "$65/visit × 9",
    startup: "Per service",
    note: "March–November · tick rides with mosquito only",
    features: [
      "Everything in Mosquito",
      "Tick coverage — also covers chiggers",
      "Popular for wooded + lakefront lots",
      "9 rounds, March through November",
    ],
    cta: "Get my quote",
  },
  {
    name: "Termite",
    tagline: "Sentricon® Always Active™",
    priceLabel: "Free inspection",
    startup: "Priced upon inspection & approval",
    note: "Alabama requires an on-site WDO inspection first",
    features: [
      "Sentricon® Always Active™ bait stations",
      "Up to $1,000,000 EnviroCare repair coverage",
      "No drilling — in-ground stations",
      "Service & price provided upon inspection & approval",
    ],
    cta: "Book free inspection",
  },
];

// Plan-comparison table (AEO / featured-snippet play). Termite = quote, never a flat number.
const COMPARE_ROWS = [
  { plan: "Pest", startup: "$79", monthly: "From $35/mo", perVisit: "—", included: "Bimonthly perimeter pest, incl. mice & rats; unlimited re-service" },
  { plan: "Pest + Mosquito", startup: "$99", monthly: "From $69/mo", perVisit: "Tick +$20/visit", included: "Pest plan + seasonal mosquito (Mar–Nov)" },
  { plan: "Complete", startup: "$229", monthly: "From ~$100/mo", perVisit: "Tick +$20/visit", included: "Pest + mosquito + Sentricon® termite (priced at inspection)" },
  { plan: "Mosquito (alone)", startup: "—", monthly: "$34/mo with pest", perVisit: "$45/visit × 9", included: "Seasonal yard barrier, Mar–Nov (monthly only when bundled with pest)" },
  { plan: "Mosquito + Tick (alone)", startup: "—", monthly: "—", perVisit: "$65/visit × 9", included: "Seasonal + tick (rides with mosquito), Mar–Nov" },
  { plan: "Termite", startup: "Free inspection", monthly: "—", perVisit: "—", included: "Sentricon® — service & price provided upon inspection & approval" },
];

// Coverage table — what's in scope vs out. Carpenter bees: existing customers only.
const TREAT = [
  "Ants (incl. fire ants)",
  "Cockroaches",
  "Spiders (incl. brown recluse)",
  "Mice & rats (within a pest plan)",
  "Silverfish, crickets, millipedes, centipedes",
  "Mosquitoes (seasonal)",
  "Ticks (with mosquito service)",
  "Termites — Sentricon® (quoted after free WDO inspection)",
  "Fleas (interior add-on)",
  "Carpenter bees (existing customers only)",
];
const DONT_TREAT = [
  "Bed bugs",
  "Wildlife (raccoons, squirrels, bats)",
  "Standalone rodent / trapping jobs",
  "Earwigs",
  "General bee & wasp removal",
];

// ---------- COMPONENT ----------
export default function PricingContent() {
  return (
    <main style={{ background: CREAM, color: INK, minHeight: "100vh", fontFamily: "var(--font-sans)" }}>

      {/* HERO */}
      <section style={{
        background: `radial-gradient(circle at 80% 20%, rgba(245,168,0,0.1), transparent 50%), linear-gradient(160deg, ${INK} 0%, ${DEEP} 100%)`,
        color: "#fff",
        padding: "80px 36px 64px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{
            display: "inline-block",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: GOLD,
            border: `1px solid ${GOLD}`, borderRadius: 4,
            padding: "4px 12px", marginBottom: 18,
          }}>
            Plans &amp; Pricing
          </div>
          <h1 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: "clamp(40px, 5.5vw, 64px)", fontWeight: 400,
            lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 18,
          }}>
            Honest pricing, <em style={{ color: GOLD, fontWeight: 500 }}>no surprises.</em>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", lineHeight: 1.6, maxWidth: 640, margin: "0 auto" }}>
            Real &ldquo;from&rdquo; rates, on the page. Pest control is bimonthly with no contract.
            Termite is quoted after a <strong style={{ color: GOLD }}>free on-site WDO inspection</strong> — Alabama requires it.
          </p>
        </div>
      </section>

      {/* PLAN-COMPARISON TABLE (above the cards) */}
      <section style={{ padding: "56px 36px 0" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 26, fontWeight: 500, marginBottom: 6, letterSpacing: "-0.01em" }}>
            Compare every plan at a glance
          </h2>
          <p style={{ fontSize: 14, color: GREY, marginBottom: 20 }}>
            &ldquo;From&rdquo; rates for standard property sizes. Termite is quoted after a free WDO inspection — see the note below.
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 720 }}>
              <thead>
                <tr>
                  <th style={cellHead}>Plan</th>
                  <th style={cellHead}>Startup</th>
                  <th style={cellHead}>Monthly (ACH)</th>
                  <th style={cellHead}>Per-service</th>
                  <th style={cellHead}>What&rsquo;s included</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((r) => (
                  <tr key={r.plan}>
                    <td style={{ ...cell, fontWeight: 700, color: FOREST }}>{r.plan}</td>
                    <td style={cell}>{r.startup}</td>
                    <td style={cell}>{r.monthly}</td>
                    <td style={cell}>{r.perVisit}</td>
                    <td style={{ ...cell, color: GREY }}>{r.included}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* MONTHLY PLANS */}
      <section style={{ padding: "48px 36px 0" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <GroupLabel text="Monthly plans · ACH autopay" sub="Pest anchors the plan, so you get a low monthly rate." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, marginTop: 22 }}>
            {MONTHLY_PLANS.map((p) => <PlanCard key={p.name} plan={p} />)}
          </div>
        </div>
      </section>

      {/* À LA CARTE */}
      <section style={{ padding: "44px 36px 0" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <GroupLabel text="À la carte" sub="Mosquito and tick without a pest plan are billed per service — no monthly." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, marginTop: 22 }}>
            {ALACARTE_PLANS.map((p) => <PlanCard key={p.name} plan={p} />)}
          </div>
        </div>
      </section>

      {/* TRUST DISCLAIMER */}
      <section style={{ padding: "44px 36px 0" }}>
        <div style={{
          maxWidth: 900, margin: "0 auto",
          background: "linear-gradient(135deg, rgba(14,142,64,0.05), rgba(245,168,0,0.08))",
          border: `1px solid ${LINE}`, borderRadius: 10, padding: "24px 28px",
        }}>
          <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 17, fontWeight: 600, color: INK, marginBottom: 8 }}>
            Pricing Transparency
          </div>
          <p style={{ fontSize: 14.5, color: "rgba(14,26,15,0.78)", lineHeight: 1.65, margin: 0 }}>
            Published &ldquo;From&rdquo; rates are based on standard property sizes with straightforward monthly billing.
            Pest control is bimonthly (treatment every other month) with zero hidden cancellation fees. Alabama regulates
            termite treatment, so an on-site WDO inspection is required before we provide your exact Sentricon® quote —
            based on linear footage and foundation type. That inspection is always free.
          </p>
        </div>
      </section>

      {/* COVERAGE TABLE */}
      <section style={{ padding: "56px 36px 0" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 26, fontWeight: 500, marginBottom: 6, letterSpacing: "-0.01em" }}>
            Pests we treat &mdash; and what we don&rsquo;t
          </h2>
          <p style={{ fontSize: 14, color: GREY, marginBottom: 22 }}>
            Straight answers so you know before you call.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
            <CoverageCard title="We treat" items={TREAT} positive />
            <CoverageCard title="We don't treat" items={DONT_TREAT} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "64px 36px 120px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{
              display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: FOREST, border: `1px solid ${FOREST}`,
              borderRadius: 4, padding: "4px 12px", marginBottom: 14,
            }}>
              Pricing FAQ
            </div>
            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 36, fontWeight: 400, letterSpacing: "-0.01em" }}>
              The questions we get most.
            </h2>
          </div>
          <div>
            <FAQ q="Is there a contract?" a="No. Pest plans are month-to-month on ACH autopay — cancel anytime, with zero hidden cancellation fees." />
            <FAQ q="Why isn't there a flat termite price?" a="Alabama regulates termite treatment, so we have to do an on-site WDO (wood-destroying organism) inspection before quoting. Your Sentricon® price depends on your home's linear footage and foundation type. The inspection is always free, and there's no obligation." />
            <FAQ q="What are the startup fees?" a="Pest is $79 to start. Pest + Mosquito is $99. The Complete bundle (which includes termite) is $229 to start. Mosquito and tick booked on their own have no startup — they're billed per service." />
            <FAQ q="Can I get mosquito or tick without a pest plan?" a="Yes — on its own, mosquito is $45 per visit and mosquito + tick is $65 per visit, nine rounds March through November, charged at each service. The $34/mo mosquito rate is only available bundled with a pest plan, since monthly autopay needs a year-round anchor. Tick is only offered alongside mosquito, never on its own." />
            <FAQ q="Is the bundle a discount?" a="No — bundling is a convenience play, not a discount. One technician, one invoice, one schedule. We keep our base prices honest rather than inflate them and call the bundle a 'savings.'" />
            <FAQ q="What does Mosquito + Tick cover?" a="A 30-day yard barrier from March through November targeting mosquito breeding sites and adult populations, plus tick pressure — including the chiggers that come with wooded and lakefront lots. (Flea is a separate interior add-on.)" />
            <FAQ q="What's the Sentricon $1M coverage?" a="If termites cause structural damage to your home while you're on active Sentricon® protection, EnviroCare covers repairs up to $1,000,000 — our guarantee. Sentricon® is also the only termite product to win the EPA's Presidential Green Chemistry Challenge Award." />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: `linear-gradient(160deg, ${GREEN} 0%, ${DEEP} 100%)`, padding: "80px 36px", textAlign: "center", color: "#fff" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 48, color: GOLD, marginBottom: 16, fontFamily: "'Fraunces', serif" }}>🌻</div>
          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(32px, 4.5vw, 48px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 14 }}>
            Get your free quote. <em style={{ color: GOLD, fontStyle: "italic" }}>We&rsquo;ll call you back.</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
            No obligation. No hidden fees. The Wedgworth family guarantee.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/quote" style={{
              background: GOLD, color: INK, border: "none", borderRadius: 8,
              padding: "16px 32px", fontWeight: 800, fontSize: 15, textDecoration: "none",
            }}>
              Get my free quote →
            </a>
            <a href="tel:2059406360" style={{
              background: "transparent", color: "#fff",
              border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8,
              padding: "16px 24px", fontWeight: 600, fontSize: 15,
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              📞 (205) 940-6360
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

// ---------- GROUP LABEL ----------
function GroupLabel({ text, sub }: { text: string; sub: string }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 24, fontWeight: 500, letterSpacing: "-0.01em", margin: 0 }}>{text}</h2>
      <p style={{ fontSize: 13.5, color: GREY, margin: "4px 0 0" }}>{sub}</p>
    </div>
  );
}

// ---------- PLAN CARD ----------
function PlanCard({ plan }: { plan: Plan }) {
  const f = plan.featured;
  return (
    <div style={{
      background: f ? `linear-gradient(180deg, ${INK} 0%, #1a2a1c 100%)` : "#fff",
      color: f ? "#fff" : INK,
      border: f ? "none" : `1px solid ${LINE}`,
      borderRadius: 12, padding: "30px 26px", position: "relative",
      transform: f ? "scale(1.03)" : "none",
      boxShadow: f ? "0 20px 50px rgba(14,26,15,0.15)" : "none",
      display: "flex", flexDirection: "column",
    }}>
      {f && (
        <div style={{
          position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
          background: GOLD, color: INK, fontSize: 10, fontWeight: 800, letterSpacing: "0.12em",
          padding: "5px 14px", borderRadius: 4, textTransform: "uppercase", whiteSpace: "nowrap",
        }}>
          Most Popular
        </div>
      )}
      <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em", marginBottom: 4 }}>
        {plan.name}
      </div>
      <div style={{ fontSize: 12, color: f ? GOLD : GREY, marginBottom: 18, fontWeight: 500 }}>
        {plan.tagline}
      </div>
      <div style={{
        fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, fontWeight: 600,
        color: f ? GOLD : FOREST, letterSpacing: "-0.02em", lineHeight: 1.15,
      }}>
        {plan.priceLabel}
      </div>
      <div style={{ fontSize: 12.5, color: f ? "rgba(255,255,255,0.6)" : GREY, marginTop: 4, fontWeight: 600 }}>
        {plan.startup}
      </div>
      <div style={{
        fontSize: 12, color: f ? "rgba(255,255,255,0.5)" : GREY,
        marginTop: 10, marginBottom: 18, paddingBottom: 18,
        borderBottom: f ? "1px solid rgba(255,255,255,0.1)" : `1px solid ${LINE}`,
        minHeight: 18,
      }}>
        {plan.note}
      </div>
      <ul style={{ listStyle: "none", marginBottom: 24, padding: 0, flexGrow: 1 }}>
        {plan.features.map((ft, i) => (
          <li key={i} style={{
            fontSize: 13, color: f ? "rgba(255,255,255,0.85)" : "rgba(14,26,15,0.78)",
            padding: "7px 0", display: "flex", gap: 10, lineHeight: 1.5,
          }}>
            <span style={{ color: f ? GOLD : FOREST, fontWeight: 800, flexShrink: 0 }}>✓</span>
            {ft}
          </li>
        ))}
      </ul>
      <a href="/quote" style={{
        background: f ? GOLD : FOREST, color: f ? INK : "#fff",
        border: "none", borderRadius: 7, padding: 13, fontWeight: 700, fontSize: 14,
        textAlign: "center", textDecoration: "none", width: "100%",
        fontFamily: "var(--font-sans)",
      }}>
        {plan.cta}
      </a>
    </div>
  );
}

// ---------- COVERAGE CARD ----------
function CoverageCard({ title, items, positive }: { title: string; items: string[]; positive?: boolean }) {
  return (
    <div style={{ background: positive ? "#fff" : PAPER, border: `1px solid ${LINE}`, borderRadius: 12, padding: "26px 24px" }}>
      <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 19, fontWeight: 500, marginBottom: 16, color: positive ? FOREST : INK }}>
        {title}
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {items.map((it, i) => (
          <li key={i} style={{ fontSize: 13.5, color: "rgba(14,26,15,0.78)", padding: "8px 0", display: "flex", gap: 10, lineHeight: 1.5, borderTop: i ? `1px solid ${LINE}` : "none" }}>
            <span style={{ color: positive ? FOREST : "#B23B2E", fontWeight: 800, flexShrink: 0 }}>{positive ? "✓" : "✕"}</span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------- FAQ ITEM ----------
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${LINE}`, padding: "20px 0" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", textAlign: "left", background: "none", border: "none",
          cursor: "pointer", padding: 0, display: "flex", justifyContent: "space-between",
          alignItems: "center", gap: 20, fontFamily: "var(--font-sans)",
        }}>
        <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 18, fontWeight: 500, color: INK, letterSpacing: "-0.005em" }}>
          {q}
        </span>
        <span style={{ color: FOREST, fontSize: 20, fontWeight: 700, flexShrink: 0, transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>
          +
        </span>
      </button>
      {open && (
        <div style={{ marginTop: 14, paddingRight: 30, fontSize: 15, color: "rgba(14,26,15,0.7)", lineHeight: 1.7 }}>
          {a}
        </div>
      )}
    </div>
  );
}

// ---------- TABLE CELLS ----------
const cellHead: React.CSSProperties = {
  background: INK, color: GOLD, textAlign: "left", padding: "14px 16px",
  fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: 14,
};
const cell: React.CSSProperties = {
  padding: "14px 16px", borderBottom: `1px solid ${LINE}`, background: "#fff", fontSize: 14,
};
