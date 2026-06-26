"use client";

import { useState } from "react";
import { Phone, ChevronDown } from "lucide-react";

const G = "#0A7935";
const GOLD = "#F5A800";
const DARK = "#0E1A0F";
const sf = { fontFamily: "var(--font-sans)" };

export default function AntControlContent() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  return (
    <div style={{ minHeight: "100vh", background: "#FEFDF8", fontFamily: "var(--font-sans)" }}>
      <section style={{ background: `linear-gradient(160deg, ${DARK}, #1a3a2a)`, color: "#fff", padding: "72px 40px 64px", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,168,0,0.12)", border: "1px solid rgba(245,168,0,0.3)", borderRadius: 5, padding: "5px 14px", marginBottom: 22 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.1em", ...sf, textTransform: "uppercase" }}>Included in 30+ Pest Coverage</span>
          </div>
          <h1 style={{ fontSize: "clamp(34px,4.5vw,58px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 6, fontFamily: "var(--font-serif)" }}>Ant Control</h1>
          <h1 style={{ fontSize: "clamp(34px,4.5vw,58px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 22, color: GOLD, fontFamily: "var(--font-serif)" }}>Alabama Specialists.</h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.75, maxWidth: 560, marginBottom: 32, ...sf }}>Alabama hosts dozens of ant species — fire ants in the yard, Argentine ants in the kitchen, carpenter ants damaging wood, and odorous house ants trailing across counters. EnviroCare treats them all with targeted baiting and perimeter barrier programs.</p>
          <a href="tel:2059406360" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: GOLD, color: DARK, borderRadius: 8, padding: "14px 28px", fontWeight: 800, fontSize: 15, textDecoration: "none", ...sf }}><Phone size={16} /> (205) 940-6360</a>
        </div>
      </section>

      <section style={{ padding: "72px 40px", background: "#f7f9f7" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 400, color: DARK, textAlign: "center", marginBottom: 40, fontFamily: "var(--font-serif)" }}>Ants in <em style={{ color: G }}>Alabama</em></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { title: "Common Species", desc: "Fire ants, Argentine ants, carpenter ants, odorous house ants, pavement ants, little black ants" },
              { title: "Carpenter Ant Warning", desc: "Excavate galleries in wood — can cause structural damage similar to termites in older Alabama homes" },
              { title: "Why They Invade", desc: "Food, moisture, and nesting sites. Trails follow pheromone paths once scouts find a food source" },
              { title: "Peak Season", desc: "Spring through fall outdoors. Ants active year-round indoors in heated Alabama homes" },
            ].map((item, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid rgba(14,142,64,0.1)", borderRadius: 12, padding: "22px 20px" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: DARK, ...sf, marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65, ...sf }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 40px", background: `linear-gradient(160deg, ${DARK}, #1a3a2a)`, color: "#fff" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 400, marginBottom: 20, fontFamily: "var(--font-serif)" }}>How We Treat <em style={{ color: GOLD }}>Ants</em></h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, ...sf }}>Indoor ant control uses slow-acting bait that workers carry back to the colony. Spraying active ant trails backfires — it scatters the colony. Exterior perimeter barrier stops scouts before they establish interior trails. For fire ants, broadcast bait covers the whole yard, not just visible mounds.</p>
        </div>
      </section>

      <section style={{ background: "#FEFDF8", padding: "56px 40px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 400, color: DARK, marginBottom: 28, textAlign: "center", fontFamily: "var(--font-serif)" }}>Ant FAQ</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { q: "Why do ants keep coming back after I spray them?", a: "Spraying kills foragers but not the colony. Surviving workers release stress signals that can scatter the colony and create new entry points. Bait-based treatment reaches the queen." },
              { q: "Are carpenter ants dangerous?", a: "They do not eat wood like termites, but they excavate galleries in moist or decayed wood. A mature colony can cause structural damage over years. Signs include sawdust-like frass near baseboards." },
              { q: "How do I stop ants in my kitchen?", a: "Keep surfaces clean and food sealed. But once a trail is established, over-the-counter sprays rarely solve it. Professional bait placement eliminates the colony within 1-2 weeks." },
            ].map((item, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid rgba(14,142,64,0.1)", borderRadius: 10, overflow: "hidden" }}>
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontWeight: 700, color: DARK, fontSize: 14, ...sf, paddingRight: 16 }}>{item.q}</span>
                  <ChevronDown size={18} color="#9ca3af" style={{ flexShrink: 0, transform: faqOpen === i ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
                </button>
                {faqOpen === i && (
                  <div style={{ padding: "12px 20px 16px", color: "#4b5563", fontSize: 14, lineHeight: 1.7, ...sf, borderTop: "1px solid rgba(0,0,0,0.05)" }}>{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: `linear-gradient(160deg, ${G}, #0d3a1a)`, padding: "56px 40px", textAlign: "center", color: "#fff" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 400, lineHeight: 1.2, marginBottom: 12, fontFamily: "var(--font-serif)" }}>Stop Ants <em>For Good</em></h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, ...sf, lineHeight: 1.7, marginBottom: 28 }}>Included in our bi-monthly plan — 30+ pests, starting at $35/month.</p>
          <a href="tel:2059406360" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: GOLD, color: DARK, borderRadius: 8, padding: "14px 28px", fontWeight: 800, fontSize: 15, textDecoration: "none", ...sf }}><Phone size={16} /> (205) 940-6360</a>
        </div>
      </section>
    </div>
  );
}
