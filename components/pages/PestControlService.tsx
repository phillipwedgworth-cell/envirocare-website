"use client";
import { useState } from "react";
import { Phone, Check, Shield, ChevronDown } from "lucide-react";

import Header from "@/components/shared/Header";
const G = "#0A7935";
const GOLD = "#F5A800";
const DARK = "#0E1A0F";
const CREAM = "#FEFDF8";
const sf = { fontFamily: "system-ui, -apple-system, sans-serif" } as const;

const PESTS: Array<{ icon: string; name: string; body: string }> = [
  { icon: "🐜", name: "Ants",    body: "Argentine, sugar, carpenter, fire ants — every Alabama species, treated at the colony level." },
  { icon: "🪳", name: "Roaches", body: "American, German, smoky brown — interior baiting and exterior perimeter prevention." },
  { icon: "🕷️", name: "Spiders", body: "Brown recluse, black widow, common house spiders — eliminated and prevented from returning." },
  { icon: "🦗", name: "Crickets",body: "Field and camel crickets — common in Alabama basements and garages, especially in fall." },
  { icon: "🐞", name: "Beetles", body: "Carpet beetles, ladybugs, weevils, kudzu beetles — interior and exterior treatment." },
  { icon: "🦂", name: "Earwigs & Centipedes", body: "Moisture pests common around foundations, decks, and damp basement areas." },
];

const FAQS: Array<[string, string]> = [
  ["How does your bi-monthly pest control work?", "Every other month a licensed technician treats your home's exterior perimeter, foundation, eaves, and entry points with a long-lasting barrier product. Interior treatment included if you're seeing pests inside. Between visits, if you ever see a pest — call us, we come back free."],
  ["What about kids and pets during treatment?", "We use EPA-registered products applied at proper rates. After exterior application dries (usually 30 minutes), kids and pets can be back outside. Interior products are placed in cracks and crevices, away from living areas."],
  ["Will I be locked into a contract?", "No long-term contracts. You can cancel anytime. We earn your business every visit, not lock you into a commitment."],
  ["What's the difference between pest control and termite control?", "Pest control protects against ants, roaches, spiders, rodents, and most household pests. Termites are an entirely separate program — they require Sentricon® bait or liquid soil treatment because they live underground and travel through wood. Most customers add termite protection as a bundle."],
  ["How quickly can you get to my property?", "Often yes — call your nearest office. Birmingham, Lake Martin, and Huntsville offices all keep appointments available most weekdays."],
];

export default function PestControlService() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  return (
    <div style={{ minHeight: "100vh", background: CREAM }}>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Pest Control",
        "provider": { "@type": "LocalBusiness", "name": "EnviroCare Pest Control" },
        "areaServed": { "@type": "State", "name": "Alabama" },
        "description": "Bi-monthly residential and commercial pest control. Ants, roaches, spiders, rodents, crickets, beetles, bees, and more. Family-owned Alabama company since 1958.",
      }) }} />

      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", background: `linear-gradient(160deg, ${DARK} 0%, #1a3a1f 50%, #0f3d1e 100%)`, color: "#fff", padding: "76px 24px 64px" }}>
        <div style={{ position: "absolute", right: -40, top: -40, fontSize: 260, opacity: 0.05, lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>🌻</div>
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,168,0,0.15)", border: `1px solid ${GOLD}55`, borderRadius: 5, padding: "5px 14px", marginBottom: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.1em", ...sf, textTransform: "uppercase" }}>
              🐜 Alabama Pest Control · Family Owned Since 1958
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(34px,6vw,58px)", lineHeight: 1.1, margin: "0 0 18px", maxWidth: 720 }}>
            Pest Control That <em style={{ color: GOLD }}>Actually</em><br />Solves the Problem.
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, marginBottom: 28, ...sf, maxWidth: 580 }}>
            Bi-monthly home protection from every common Alabama pest — ants, roaches, spiders, rodents, crickets, beetles, and more. One licensed technician. One thorough treatment. Re-visits free if pests come back.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="/quote" style={{ background: GOLD, color: DARK, padding: "15px 28px", borderRadius: 8, fontWeight: 800, fontSize: 15, textDecoration: "none", ...sf }}>
              Get a Free Inspection
            </a>
            <a href="tel:2059406360" style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: "15px 22px", fontWeight: 600, fontSize: 15, textDecoration: "none", ...sf }}>
              <Phone size={16} /> (205) 940-6360
            </a>
          </div>
        </div>
      </section>

      {/* OFFER STRIP */}
      <div style={{ background: GOLD, color: DARK, padding: "12px 24px", display: "flex", justifyContent: "center", alignItems: "center", gap: 18, flexWrap: "wrap", fontSize: 13, fontWeight: 600, ...sf }}>
        <span>$50 OFF Initial Pest Control</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>No long-term contracts</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>Free re-visits between treatments</span>
      </div>

      {/* PESTS WE TREAT */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ display: "inline-block", border: `1px solid ${G}`, borderRadius: 4, padding: "3px 12px", marginBottom: 14, fontSize: 11, letterSpacing: "0.12em", color: G, ...sf, fontWeight: 700, textTransform: "uppercase" }}>
              Pests We Eliminate
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 32, color: DARK, marginBottom: 8 }}>
              Every Common Alabama Pest, Handled.
            </h2>
            <p style={{ fontSize: 15, color: "#6b7d70", maxWidth: 600, margin: "0 auto", ...sf, lineHeight: 1.7 }}>
              From the small stuff to the big nuisances. If it's an Alabama pest, we've treated for it.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
            {PESTS.map((p) => (
              <div key={p.name} style={{ background: "#fff", border: "1px solid rgba(27,122,60,0.12)", borderRadius: 14, padding: "22px 20px" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{p.icon}</div>
                <div style={{ fontWeight: 700, color: DARK, fontSize: 15, marginBottom: 6, ...sf }}>{p.name}</div>
                <div style={{ fontSize: 13, color: "#5b6f60", lineHeight: 1.6, ...sf }}>{p.body}</div>
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
              How Our Bi-Monthly Plan Works
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 30, color: DARK }}>
              Four Visits a Year. Pests Gone, And Stay Gone.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
            {[
              { n: "01", title: "Free Inspection", body: "Licensed tech walks your property and identifies activity, entry points, and risk areas. You get a written quote — no obligation." },
              { n: "02", title: "Initial Treatment", body: "Thorough exterior perimeter + interior knockdown if needed. Long-lasting barrier products applied where pests travel." },
              { n: "03", title: "Bi-Monthly Visits", body: "Every 60 days we re-treat the perimeter, refresh the barrier, and check for new activity." },
              { n: "04", title: "Free Re-Visits", body: "See a pest between treatments? Call us. We come back free until the problem is solved. That's the EnviroCare guarantee." },
            ].map((s) => (
              <div key={s.n} style={{ background: "#fff", border: "1px solid rgba(27,122,60,0.12)", borderRadius: 14, padding: "22px 20px" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 36, color: GOLD, fontWeight: 700, lineHeight: 1, marginBottom: 8 }}>{s.n}</div>
                <div style={{ fontWeight: 700, color: DARK, fontSize: 15, marginBottom: 6, ...sf }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "#5b6f60", lineHeight: 1.6, ...sf }}>{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 30, color: DARK }}>What's Included</h2>
          </div>
          <div style={{ background: "#fff", border: "1px solid rgba(27,122,60,0.12)", borderRadius: 14, padding: "28px 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
              {[
                "Full property inspection each visit",
                "Exterior perimeter barrier treatment",
                "Foundation, eaves, soffit + entry point treatment",
                "Interior treatment when needed (no extra charge)",
                "Web removal from accessible eaves",
                "Wasp + spider nest removal",
                "Free re-visits between treatments",
                "Detailed service report after each visit",
                "Licensed Alabama pest control technicians",
                "No long-term contracts",
              ].map((line) => (
                <div key={line} style={{ display: "flex", gap: 10, fontSize: 14, color: "#374151", ...sf, alignItems: "flex-start" }}>
                  <Check size={16} color={G} style={{ flexShrink: 0, marginTop: 3 }} />
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#f7f8f4", padding: "64px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 30, color: DARK }}>Common Questions</h2>
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
                  {open && <div style={{ padding: "0 20px 18px", fontSize: 14, color: "#5b6f60", lineHeight: 1.7, ...sf }}>{a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: `linear-gradient(160deg, ${G}, #0f4d26)`, padding: "72px 24px", textAlign: "center", color: "#fff" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <Shield size={42} color={GOLD} style={{ margin: "0 auto 14px" }} />
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 34, fontWeight: 400, lineHeight: 1.2, marginBottom: 12 }}>
            Ready for a <em>Pest-Free</em> Home?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 15, ...sf, lineHeight: 1.7, marginBottom: 28 }}>
            Free property inspection. No long-term contracts. The EnviroCare guarantee since 1958.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/quote" style={{ background: GOLD, color: DARK, padding: "15px 30px", borderRadius: 8, fontWeight: 800, fontSize: 15, textDecoration: "none", ...sf }}>
              Get Free Inspection
            </a>
            <a href="tel:2059406360" style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, padding: "15px 22px", fontWeight: 600, fontSize: 15, textDecoration: "none", ...sf }}>
              <Phone size={16} /> (205) 940-6360
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
