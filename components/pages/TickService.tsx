"use client";
import { useState } from "react";
import { Phone, Check, Shield, AlertTriangle, Heart, Calendar, ChevronDown } from "lucide-react";

import Header from "@/components/shared/Header";
const G = "#1B7A3C";
const GOLD = "#F5A800";
const DARK = "#0E1A0F";
const CREAM = "#FEFDF8";
const sf = { fontFamily: "system-ui, -apple-system, sans-serif" } as const;

const FAQS: Array<[string, string]> = [
  ["When is tick season in Alabama?", "Alabama ticks are active year-round in mild years, but peak pressure runs March through October. Lone star ticks become especially heavy May–August. We recommend starting treatment by early spring to suppress populations before they build."],
  ["Are tick treatments safe for pets and kids?", "Yes — once the treatment dries (about 30–60 minutes), it's safe for kids and pets to be back in the yard. We use the same product class your veterinarian uses for tick prevention on dogs, applied to the resting and questing zones in your yard, not directly on animals."],
  ["What's the difference between tick control and just pest control?", "Standard pest control treats the perimeter of your home for crawling pests. Tick control specifically targets where ticks rest and hunt — wooded edges, leaf litter, tall grass, and shaded transitional zones. They need different products and application techniques."],
  ["How often do treatments happen?", "Most Alabama yards do well with treatments every 21–30 days during tick season (April through October). Larger wooded properties or homes near the lake or trails may need more frequent applications. We assess your property and recommend a schedule that works."],
  ["Will this also kill fleas?", "The treatments we use for ticks are also effective on fleas in the yard. Many of our customers add tick control specifically because of a flea problem and find both go away."],
  ["Do you treat the whole yard or specific zones?", "We focus on tick habitat — wooded borders, fence lines, garden edges, ornamental plantings, leaf litter zones, and pathways through grass. Open lawn and direct sun areas are low-tick habitats and don't need heavy treatment. Smart targeting beats blanket spraying every time."],
];

export default function TickService() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  return (
    <div style={{ minHeight: "100vh", background: CREAM }}>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Tick Control",
        "provider": { "@type": "LocalBusiness", "name": "EnviroCare Pest Control" },
        "areaServed": { "@type": "State", "name": "Alabama" },
        "description": "Professional tick control for Alabama yards. Family- and pet-safe treatments targeting tick habitat — wooded edges, leaf litter, tall grass, and trail areas.",
        "offers": { "@type": "Offer", "priceCurrency": "USD", "price": "Contact for pricing" }
      }) }} />

      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", background: `linear-gradient(160deg, ${DARK} 0%, #1a3a1f 50%, #0f3d1e 100%)`, color: "#fff", padding: "76px 24px 64px" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.18, backgroundImage: "url(/tick-grass.jpg)", backgroundSize: "cover", backgroundPosition: "center", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,168,0,0.15)", border: `1px solid ${GOLD}55`, borderRadius: 5, padding: "5px 14px", marginBottom: 20 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.1em", ...sf, textTransform: "uppercase" }}>
                🕷️ Alabama Tick Control · Family & Pet Safe
              </span>
            </div>
            <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "clamp(34px,6vw,58px)", lineHeight: 1.1, margin: "0 0 18px" }}>
              Take Your Yard <em style={{ color: GOLD }}>Back</em><br />from Ticks.
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, marginBottom: 28, ...sf, maxWidth: 580 }}>
              Lone star ticks. American dog ticks. Black-legged (deer) ticks. Alabama has all three — and they carry more diseases than any other state pest. EnviroCare's tick program targets where they hunt: wooded edges, leaf litter, tall grass, and trail zones.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="/quote" style={{ background: GOLD, color: DARK, padding: "15px 28px", borderRadius: 8, fontWeight: 800, fontSize: 15, textDecoration: "none", ...sf }}>
                Get a Free Inspection
              </a>
              <a href="tel:2056495278" style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: "15px 22px", fontWeight: 600, fontSize: 15, textDecoration: "none", ...sf }}>
                <Phone size={16} /> (205) 649-5278
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ display: "inline-block", border: `1px solid ${G}`, borderRadius: 4, padding: "3px 12px", marginBottom: 14, fontSize: 11, letterSpacing: "0.12em", color: G, ...sf, fontWeight: 700, textTransform: "uppercase" }}>
              Why Tick Control Matters
            </div>
            <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 32, color: DARK, marginBottom: 8 }}>
              Alabama Ticks Carry More Than an Itch.
            </h2>
            <p style={{ fontSize: 15, color: "#6b7d70", maxWidth: 680, margin: "0 auto", ...sf, lineHeight: 1.7 }}>
              Lyme disease, Rocky Mountain spotted fever, alpha-gal syndrome (the red meat allergy), ehrlichiosis, anaplasmosis — every one of these has been reported in Alabama, and tick-borne illness cases have climbed every year for the past decade.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
            {[
              { icon: <AlertTriangle size={22} color={GOLD} />, title: "Highest in the South", body: "Alabama consistently ranks in the top 10 states for tick-borne illness incidence." },
              { icon: <Heart size={22} color={GOLD} />, title: "Pets Are At Risk Too", body: "Dogs, cats, horses — ticks transmit anaplasma, ehrlichia, and Lyme to pets year-round." },
              { icon: <Shield size={22} color={GOLD} />, title: "Yards Are the #1 Source", body: "Most tick exposure happens 20 feet from your back door, not on hiking trails." },
              { icon: <Calendar size={22} color={GOLD} />, title: "Year-Round Pressure", body: "Mild Alabama winters keep ticks active even in January and February." },
            ].map((c, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid rgba(27,122,60,0.12)", borderRadius: 14, padding: "22px 20px" }}>
                <div style={{ marginBottom: 10 }}>{c.icon}</div>
                <div style={{ fontWeight: 700, color: DARK, fontSize: 15, marginBottom: 6, ...sf }}>{c.title}</div>
                <div style={{ fontSize: 13, color: "#5b6f60", lineHeight: 1.6, ...sf }}>{c.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: "#f7f8f4", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "inline-block", border: `1px solid ${G}`, borderRadius: 4, padding: "3px 12px", marginBottom: 14, fontSize: 11, letterSpacing: "0.12em", color: G, ...sf, fontWeight: 700, textTransform: "uppercase" }}>
              Our 4-Step Tick Program
            </div>
            <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 32, color: DARK, marginBottom: 8 }}>
              Targeted Treatment, Not Blanket Spraying.
            </h2>
            <p style={{ fontSize: 15, color: "#6b7d70", ...sf }}>
              Smart application means better results, less product, and a yard that's safer for your family.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18 }}>
            {[
              { n: "01", title: "Property Inspection", body: "We walk your yard and identify tick habitat — wooded edges, leaf litter, ornamental beds, fence lines, transitional zones." },
              { n: "02", title: "Targeted Application", body: "EPA-registered treatments applied where ticks rest and quest. Open lawn and play areas get minimal product." },
              { n: "03", title: "Monthly Re-Treatments", body: "April–October monthly cadence. Each visit re-treats high-pressure zones based on what we observed last visit." },
              { n: "04", title: "Year-Round Monitoring", body: "Off-season check-ins for hot zones (creeks, woods, trail edges). Winter doesn't stop Alabama ticks completely." },
            ].map((s) => (
              <div key={s.n} style={{ background: "#fff", border: "1px solid rgba(27,122,60,0.12)", borderRadius: 14, padding: "22px 20px", position: "relative" }}>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 36, color: GOLD, fontWeight: 700, lineHeight: 1, marginBottom: 8 }}>{s.n}</div>
                <div style={{ fontWeight: 700, color: DARK, fontSize: 15, marginBottom: 6, ...sf }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "#5b6f60", lineHeight: 1.6, ...sf }}>{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO BENEFITS */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 28, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", border: `1px solid ${G}`, borderRadius: 4, padding: "3px 12px", marginBottom: 14, fontSize: 11, letterSpacing: "0.12em", color: G, ...sf, fontWeight: 700, textTransform: "uppercase" }}>
              Who Needs Tick Control
            </div>
            <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 30, color: DARK, marginBottom: 18, lineHeight: 1.2 }}>
              If You Live in Alabama, You Probably Do.
            </h2>
            <div style={{ display: "grid", gap: 10 }}>
              {[
                "Families with children playing outdoors",
                "Dog and cat owners (ticks travel on pets)",
                "Properties bordering woods, creeks, or parks",
                "Lake Martin and waterfront homes",
                "Homes with deer or wildlife visitors",
                "Anyone who's pulled a tick off lately",
              ].map((line, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#374151", ...sf }}>
                  <Check size={16} color={G} />
                  {line}
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.12)", aspectRatio: "4/3", background: "#1a3a1f" }}>
            <img src="/family-yard.jpg" alt="Alabama family enjoying tick-free yard with pet" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#f7f8f4", padding: "64px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ display: "inline-block", border: `1px solid ${G}`, borderRadius: 4, padding: "3px 12px", marginBottom: 14, fontSize: 11, letterSpacing: "0.12em", color: G, ...sf, fontWeight: 700, textTransform: "uppercase" }}>
              Common Questions
            </div>
            <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 30, color: DARK }}>Tick Control FAQ</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQS.map(([q, a], i) => {
              const open = faqOpen === i;
              return (
                <div key={i} style={{ background: "#fff", border: "1px solid rgba(27,122,60,0.12)", borderRadius: 12, overflow: "hidden" }}>
                  <button onClick={() => setFaqOpen(open ? null : i)}
                    style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "transparent", border: "none", textAlign: "left", cursor: "pointer", ...sf }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: DARK }}>{q}</span>
                    <ChevronDown size={18} color={G} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
                  </button>
                  {open && (
                    <div style={{ padding: "0 20px 18px", fontSize: 14, color: "#5b6f60", lineHeight: 1.7, ...sf }}>
                      {a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: `linear-gradient(160deg, ${G}, #0f4d26)`, padding: "72px 24px", textAlign: "center", color: "#fff" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ fontSize: 44, marginBottom: 14 }}>🌻</div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 34, fontWeight: 400, lineHeight: 1.2, marginBottom: 12 }}>
            Stop Pulling Ticks Off<br /><em>Your Family.</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 15, ...sf, lineHeight: 1.7, marginBottom: 28 }}>
            Free property inspection. Same-day availability across Alabama. Family-safe treatments.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/quote" style={{ background: GOLD, color: DARK, padding: "15px 30px", borderRadius: 8, fontWeight: 800, fontSize: 15, textDecoration: "none", ...sf }}>
              Get Free Inspection
            </a>
            <a href="tel:2056495278" style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, padding: "15px 22px", fontWeight: 600, fontSize: 15, textDecoration: "none", ...sf }}>
              <Phone size={16} /> (205) 649-5278
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
