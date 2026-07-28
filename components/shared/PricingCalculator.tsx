"use client";
import { useState, useMemo } from "react";
import { Phone, Check, ChevronRight, Home, Bug, Shield } from "lucide-react";
import PestIcon, { type PestIconName, ICON_COLOR } from "@/components/shared/PestIcon";

const G = "#0E8E40";
const G_BRIGHT = "#2EAA61";
const GOLD = "#F5A800";
const GOLD_BRIGHT = "#FBC51A";
const DARK = "#0E1A0F";
const CREAM = "#FEFDF8";
const sf = { fontFamily: "'Inter', system-ui, -apple-system, sans-serif" } as const;

type Service = "pest" | "termite" | "mosquito-tick" | "mosquito" | "bundle";
type Frequency = "bimonthly" | "monthly" | "onetime";
type Size = "sm" | "md" | "lg" | "xl";

const SERVICES: Array<{ id: Service; label: string; icon: PestIconName; sub: string }> = [
  { id: "bundle",         label: "Bundle (Best Value)",      icon: "pest",     sub: "Pest + Termite + Mosquito/Tick" },
  { id: "pest",           label: "Bi-Monthly Pest Control",  icon: "ant",      sub: "Ants, roaches, spiders" },
  { id: "termite",        label: "Termite Protection",       icon: "termite",  sub: "Sentricon® system" },
  { id: "mosquito-tick",  label: "Mosquito + Tick Combo",    icon: "tick",     sub: "Both threats, one visit" },
  { id: "mosquito",       label: "Mosquito Only",            icon: "mosquito", sub: "Yard treatment season" },
];

const SIZES: Array<{ id: Size; label: string; desc: string }> = [
  { id: "sm", label: "Under 1,500 sq ft", desc: "Condo / townhome / small home" },
  { id: "md", label: "1,500 – 2,500 sq ft", desc: "Average single-family home" },
  { id: "lg", label: "2,500 – 4,000 sq ft", desc: "Larger home" },
  { id: "xl", label: "Over 4,000 sq ft",   desc: "Estate / large home" },
];

const FREQUENCIES: Array<{ id: Frequency; label: string; desc: string }> = [
  { id: "bimonthly", label: "Bi-Monthly Plan", desc: "Every 2 months — what most homes do" },
  { id: "monthly",   label: "Monthly Plan",    desc: "Heavy pressure / new construction" },
  { id: "onetime",   label: "One-Time Visit",  desc: "Single treatment, no commitment" },
];

// Internal price ranges per service / size / frequency.
// These are estimate ranges only — every quote is finalized by phone.
function priceRange(svc: Service, size: Size, freq: Frequency, fireants: boolean): { lo: number; hi: number; unit: string } {
  const sizeMult = { sm: 0.85, md: 1.0, lg: 1.20, xl: 1.45 }[size];

  let lo = 0, hi = 0, unit = "/month";
  if (svc === "bundle") {
    lo = 65 * sizeMult; hi = 99 * sizeMult; unit = "/month";
  } else if (svc === "pest") {
    if (freq === "monthly")    { lo = 39 * sizeMult; hi = 59 * sizeMult; unit = "/month"; }
    if (freq === "bimonthly")  { lo = 49 * sizeMult; hi = 79 * sizeMult; unit = "/visit"; }
    if (freq === "onetime")    { lo = 175 * sizeMult; hi = 295 * sizeMult; unit = " one-time"; }
  } else if (svc === "termite") {
    lo = 850 * sizeMult; hi = 1450 * sizeMult; unit = " first year";
  } else if (svc === "mosquito-tick") {
    lo = 95 * sizeMult; hi = 135 * sizeMult; unit = "/treatment";
  } else if (svc === "mosquito") {
    lo = 75 * sizeMult; hi = 105 * sizeMult; unit = "/treatment";
  }
  if (fireants) { lo += 25; hi += 40; }
  return { lo: Math.round(lo / 5) * 5, hi: Math.round(hi / 5) * 5, unit };
}

export default function PricingCalculator() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<Service>("bundle");
  const [size, setSize] = useState<Size>("md");
  const [freq, setFreq] = useState<Frequency>("bimonthly");
  const [fireants, setFireants] = useState(false);
  const [zip, setZip] = useState("");

  const range = useMemo(
    () => priceRange(service, size, freq, fireants),
    [service, size, freq, fireants],
  );

  const officePhone = useMemo(() => {
    const z = zip.trim();
    if (z.startsWith("358") || z.startsWith("357")) return { name: "Huntsville Office",   tel: "2569377676", display: "(256) 937-7676" };
    if (z.startsWith("368") || z.startsWith("369")) return { name: "Lake Martin Office",  tel: "2562346162", display: "(256) 234-6162" };
    if (z.startsWith("36830") || z.startsWith("36801") || z.startsWith("36832") || z.startsWith("36802")) return { name: "Auburn Routing", tel: "3343323321", display: "(334) 332-3321" };
    if (z.startsWith("35"))                         return { name: "Birmingham Office",   tel: "2059406360", display: "(205) 940-6360" };
    return { name: "EnviroCare Main Line", tel: "2059406360", display: "(205) 940-6360" };
  }, [zip]);

  const showSummary = step === 4;

  const stepLabel = ["Service", "Home Size", "Frequency", "Your Quote"];

  return (
    <div style={{ background: CREAM, minHeight: "100vh", padding: "32px 16px 64px", ...sf }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,168,0,0.12)", border: `1px solid ${GOLD}33`, borderRadius: 999, padding: "5px 14px", marginBottom: 14 }}>
            <PestIcon name="check" size={14} style={{ color: GOLD }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Free · No obligation · 60 seconds
            </span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(26px, 6vw, 38px)", color: DARK, lineHeight: 1.15, margin: "0 0 8px" }}>
            Get Your Pest Control Estimate
          </h1>
          <p style={{ fontSize: 14, color: "#5b6f60", lineHeight: 1.55, margin: 0 }}>
            Three quick questions and we'll show you a transparent price range — no email required.
          </p>
        </div>

        {/* PROGRESS */}
        <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
          {stepLabel.map((label, i) => {
            const idx = i + 1;
            const active = idx === step;
            const done = idx < step;
            return (
              <div key={label} style={{ flex: 1 }}>
                <div style={{ height: 4, borderRadius: 4, background: done || active ? G : "rgba(14,142,64,0.15)" }} />
                <div style={{ fontSize: 10, fontWeight: 700, marginTop: 6, color: active ? G : "#9aa6a0", letterSpacing: "0.06em", textTransform: "uppercase", textAlign: "center" }}>
                  {label}
                </div>
              </div>
            );
          })}
        </div>

        {/* CARD */}
        <div style={{ background: "#fff", borderRadius: 18, boxShadow: "0 8px 32px rgba(0,0,0,0.08)", overflow: "hidden", border: "1px solid rgba(14,142,64,0.12)" }}>

          {/* STEP 1 — Service */}
          {step === 1 && (
            <div style={{ padding: "24px 20px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: 22, color: DARK, marginBottom: 4 }}>What do you need?</h2>
              <p style={{ fontSize: 13, color: "#6b7d70", marginBottom: 18 }}>Pick one — bundle gives you the best value.</p>
              <div style={{ display: "grid", gap: 10 }}>
                {SERVICES.map(s => {
                  const sel = service === s.id;
                  return (
                    <button key={s.id} onClick={() => setService(s.id)}
                      style={{
                        display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
                        border: sel ? `2px solid ${G}` : "2px solid rgba(14,142,64,0.12)",
                        background: sel ? "rgba(14,142,64,0.04)" : "#fff",
                        borderRadius: 12, cursor: "pointer", textAlign: "left", width: "100%",
                        transition: "all 0.15s",
                      }}>
                      <span style={{
                        width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        background: `${ICON_COLOR[s.icon]}14`, color: ICON_COLOR[s.icon],
                      }}>
                        <PestIcon name={s.icon} size={24} />
                      </span>
                      <span style={{ flex: 1 }}>
                        <span style={{ display: "block", fontWeight: 700, color: DARK, fontSize: 15 }}>{s.label}</span>
                        <span style={{ display: "block", fontSize: 12, color: "#6b7d70", marginTop: 2 }}>{s.sub}</span>
                      </span>
                      {sel && <Check size={18} color={G} />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2 — Home Size */}
          {step === 2 && (
            <div style={{ padding: "24px 20px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: 22, color: DARK, marginBottom: 4 }}>How big is your home?</h2>
              <p style={{ fontSize: 13, color: "#6b7d70", marginBottom: 18 }}>This helps us give you a realistic price range.</p>
              <div style={{ display: "grid", gap: 8 }}>
                {SIZES.map(s => {
                  const sel = size === s.id;
                  return (
                    <button key={s.id} onClick={() => setSize(s.id)}
                      style={{
                        display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
                        border: sel ? `2px solid ${G}` : "2px solid rgba(14,142,64,0.12)",
                        background: sel ? "rgba(14,142,64,0.04)" : "#fff",
                        borderRadius: 12, cursor: "pointer", textAlign: "left", width: "100%",
                      }}>
                      <Home size={18} color={sel ? G : "#9aa6a0"} />
                      <span style={{ flex: 1 }}>
                        <span style={{ display: "block", fontWeight: 700, color: DARK, fontSize: 15 }}>{s.label}</span>
                        <span style={{ display: "block", fontSize: 12, color: "#6b7d70", marginTop: 2 }}>{s.desc}</span>
                      </span>
                      {sel && <Check size={18} color={G} />}
                    </button>
                  );
                })}
              </div>

              {(service === "pest" || service === "bundle") && (
                <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid rgba(14,142,64,0.12)" }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#5b6f60", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Add-on (optional)</p>
                  <label style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", border: "1px solid rgba(14,142,64,0.15)", borderRadius: 10, cursor: "pointer", background: fireants ? "rgba(14,142,64,0.06)" : "#fff" }}>
                    <input type="checkbox" checked={fireants} onChange={(e) => setFireants(e.target.checked)} style={{ accentColor: G, width: 18, height: 18 }} />
                    <span style={{ flex: 1 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, color: DARK, fontSize: 14 }}><PestIcon name="fireant" size={16} style={{ color: ICON_COLOR.fireant }} /> Fire Ant Control</span>
                      <span style={{ display: "block", fontSize: 11, color: "#6b7d70" }}>Colony elimination, season-long</span>
                    </span>
                  </label>
                </div>
              )}
            </div>
          )}

          {/* STEP 3 — Frequency */}
          {step === 3 && (
            <div style={{ padding: "24px 20px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: 22, color: DARK, marginBottom: 4 }}>How often?</h2>
              <p style={{ fontSize: 13, color: "#6b7d70", marginBottom: 18 }}>Bi-monthly is what most homes do. You can always switch.</p>
              <div style={{ display: "grid", gap: 8 }}>
                {(service === "termite" ? [{ id: "onetime" as Frequency, label: "Annual Sentricon® Plan", desc: "Includes monitoring + bait" }] : FREQUENCIES).map(f => {
                  const sel = freq === f.id;
                  return (
                    <button key={f.id} onClick={() => setFreq(f.id)}
                      style={{
                        display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
                        border: sel ? `2px solid ${G}` : "2px solid rgba(14,142,64,0.12)",
                        background: sel ? "rgba(14,142,64,0.04)" : "#fff",
                        borderRadius: 12, cursor: "pointer", textAlign: "left", width: "100%",
                      }}>
                      <Bug size={18} color={sel ? G : "#9aa6a0"} />
                      <span style={{ flex: 1 }}>
                        <span style={{ display: "block", fontWeight: 700, color: DARK, fontSize: 15 }}>{f.label}</span>
                        <span style={{ display: "block", fontSize: 12, color: "#6b7d70", marginTop: 2 }}>{f.desc}</span>
                      </span>
                      {sel && <Check size={18} color={G} />}
                    </button>
                  );
                })}
              </div>

              <div style={{ marginTop: 22 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#5b6f60", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Your ZIP code (so we route you to the right office)</label>
                <input value={zip} onChange={(e) => setZip(e.target.value)} placeholder="e.g. 35007" inputMode="numeric" maxLength={5}
                  style={{ width: "100%", padding: "14px 16px", border: "2px solid rgba(14,142,64,0.15)", borderRadius: 12, fontSize: 16, color: DARK, outline: "none", ...sf }} />
              </div>
            </div>
          )}

          {/* STEP 4 — Quote */}
          {showSummary && (
            <div>
              <div style={{ background: `linear-gradient(160deg, ${DARK} 0%, #1a3a1f 100%)`, color: "#fff", padding: "28px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Your Estimated Range</div>
                <div style={{ fontSize: "clamp(34px,8vw,46px)", fontWeight: 800, color: GOLD, lineHeight: 1, fontFamily: "'Playfair Display', Georgia, serif" }}>
                  ${range.lo}<span style={{ color: "#fff" }}>–</span>${range.hi}
                  <span style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", fontFamily: "system-ui", fontWeight: 500, marginLeft: 4 }}>{range.unit}</span>
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 10, lineHeight: 1.6 }}>
                  Final price confirmed during your free inspection. No surprises.
                </div>
              </div>

              <div style={{ padding: "20px 20px 24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 18, fontSize: 12 }}>
                  {[
                    ["Service", SERVICES.find(s => s.id === service)?.label],
                    ["Home Size", SIZES.find(s => s.id === size)?.label],
                    ["Plan", FREQUENCIES.find(f => f.id === freq)?.label || "Annual"],
                    ["Add-on", fireants ? "Fire Ant" : "None"],
                  ].map(([k, v]) => (
                    <div key={k as string} style={{ background: "#f7f8f4", borderRadius: 8, padding: "8px 12px" }}>
                      <div style={{ color: "#6b7d70", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 700 }}>{k}</div>
                      <div style={{ color: DARK, fontWeight: 600, marginTop: 2 }}>{v}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background: "rgba(245,168,0,0.08)", border: `1px solid ${GOLD}33`, borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>
                  <div style={{ fontSize: 11, color: "#7a5200", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Why EnviroCare</div>
                  <div style={{ fontSize: 13, color: DARK, lineHeight: 1.55 }}>
                    ✓ Free quote · no hidden fees · free termite inspection
                  </div>
                </div>

                <a href={`tel:${officePhone.tel}`}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", padding: "16px", background: GOLD, color: DARK, fontWeight: 800, fontSize: 16, borderRadius: 12, textDecoration: "none", marginBottom: 10 }}>
                  <Phone size={18} /> Call {officePhone.display}
                </a>
                <div style={{ fontSize: 11, color: "#6b7d70", textAlign: "center", marginBottom: 14 }}>
                  Connects you to your {officePhone.name}. Fast scheduling available.
                </div>

                <a href="/contact-us"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", padding: "14px", background: "transparent", color: G, border: `1.5px solid ${G}`, fontWeight: 700, fontSize: 14, borderRadius: 12, textDecoration: "none" }}>
                  <Shield size={16} /> Schedule Free Inspection Online
                </a>
              </div>
            </div>
          )}

          {/* NAV BAR */}
          {!showSummary && (
            <div style={{ display: "flex", gap: 8, padding: "14px 16px", borderTop: "1px solid rgba(14,142,64,0.08)", background: "#fafbf8" }}>
              {step > 1 && (
                <button onClick={() => setStep(step - 1)}
                  style={{ flex: 1, padding: "13px", background: "#fff", color: "#5b6f60", border: "1px solid rgba(14,142,64,0.15)", borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                  Back
                </button>
              )}
              <button onClick={() => setStep(step + 1)}
                style={{ flex: 2, padding: "13px", background: G, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {step === 3 ? "See My Estimate" : "Continue"} <ChevronRight size={16} />
              </button>
            </div>
          )}

          {showSummary && (
            <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(14,142,64,0.08)", background: "#fafbf8", textAlign: "center" }}>
              <button onClick={() => setStep(1)}
                style={{ background: "transparent", color: "#5b6f60", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}>
                ← Start Over
              </button>
            </div>
          )}
        </div>

        {/* TRUST */}
        <div style={{ marginTop: 26, textAlign: "center", fontSize: 11, color: "#6b7d70", lineHeight: 1.7 }}>
          The Wedgworth Family · Alabama Pest Control Since 1958<br />
          Birmingham · Lake Martin · Huntsville · Auburn
        </div>
      </div>
    </div>
  );
}
