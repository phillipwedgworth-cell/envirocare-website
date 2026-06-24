"use client";
import { useState } from "react";
import { Phone, CheckCircle, ChevronDown, Shield, Award } from "lucide-react";

import Header from "@/components/shared/Header";
/* ── BRAND COLORS (confirmed from logo)
   Green:  #0A7935  (forest green — primary)
   Gold:   #F5A800  (sunflower yellow — accents)
   White:  #FFFFFF
   Dark:   #1A1A1A
─────────────────────────────────────── */

export default function SentriconProtection() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Sentricon Termite Protection",
          "provider": {
            "@type": "LocalBusiness",
            "name": "EnviroCare Pest Control",
            "description": "Certified Sentricon Specialist serving Alabama since 1958",
            "telephone": "(205) 940-6360"
          },
          "description": "EnviroCare is a Certified Sentricon Specialist providing the #1 termite bait system in Alabama. Colony elimination, always-active protection, low-impact application.",
          "areaServed": ["Birmingham, AL", "Huntsville, AL", "Lake Martin, AL", "Alexander City, AL"]
        }
      `}</script>

      {/* HERO */}
      <section className="relative overflow-hidden text-white py-20 md:py-28" style={{background:"linear-gradient(135deg, #0A7935 0%, #0f4d26 60%, #1a1a1a 100%)"}}>
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:"radial-gradient(circle at 80% 20%, #F5A800 0%, transparent 50%)"}} />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6 px-5 py-2 rounded-full border border-yellow-400/40" style={{background:"rgba(245,168,0,0.15)"}}>
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-bold text-yellow-200">EnviroCare is a Certified Sentricon Specialist™</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Sentricon® Termite<br/>
              <span style={{color:"#F5A800"}}>Protection That Never Stops</span>
            </h1>
            <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl leading-relaxed">
              The #1 termite bait system in America. Protects the White House, the Smithsonian, and thousands of Alabama homes — including yours. EnviroCare installs, monitors, and maintains Sentricon so you never have to think about termites again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button onClick={() => setQuoteOpen(true)}
                className="px-8 py-4 text-white font-bold rounded-xl transition shadow-lg text-base"
                style={{background:"#F5A800", color:"#1A1A1A"}}>
                Get Free Termite Inspection
              </button>
              <a href="tel:2059406360"
                className="flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-xl transition border text-base"
                style={{background:"rgba(255,255,255,0.1)", borderColor:"rgba(255,255,255,0.2)"}}>
                <Phone className="w-5 h-5" /> (205) 940-6360
              </a>
            </div>
            {/* Key facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-8 border-t border-white/10">
              {[
                { n: "#1", sub: "Termite bait system in America" },
                { n: "24/7", sub: "Always-active protection" },
                { n: "Colony", sub: "Elimination including queen" },
                { n: "Low-Impact", sub: "No trenching or drilling" },
              ].map((t, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold" style={{color:"#F5A800"}}>{t.n}</div>
                  <div className="text-xs text-green-200 mt-1 leading-tight">{t.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFIED SPECIALIST BADGE SECTION */}
      <section className="py-10 px-6 bg-amber-50 border-y border-amber-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{background:"#0A7935"}}>
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-lg">EnviroCare is a Certified Sentricon Specialist™</p>
              <p className="text-slate-600 text-sm">Certified Sentricon Specialists are hand-picked by Corteva Agriscience — the makers of Sentricon — for their expertise, training, and commitment to proper installation and monitoring.</p>
            </div>
          </div>
          <div className="flex-shrink-0 text-center">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Protecting Alabama Since</p>
            <p className="text-4xl font-bold" style={{color:"#0A7935"}}>1958</p>
          </div>
        </div>
      </section>

      {/* HOW SENTRICON WORKS */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-semibold text-sm uppercase tracking-wider mb-3" style={{color:"#0A7935"}}>How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The Science Behind Sentricon®
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Sentricon doesn't just kill individual termites. It uses termite behavior against them to eliminate the entire colony — including the queen.
            </p>
          </div>

          {/* Step-by-step process */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {[
              {
                step: "01",
                title: "Installation Around Your Home",
                description: "EnviroCare's Certified Sentricon Specialists install bait stations in the ground around your property's perimeter, typically spaced 10–20 feet apart. No trenching. No drilling. Minimal disruption.",
                photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop",
                photoAlt: "Pest control technician installing bait station in yard",
                tip: "Stations can be installed in a single visit — most Alabama homes done in 2–4 hours"
              },
              {
                step: "02",
                title: "Termites Discover the Bait",
                description: "Termites forage constantly — some colonies up to 100 yards from their nest. Worker termites are scientifically proven to prefer Sentricon bait nearly 10 times more than wood. When they find it, they feed.",
                photo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop",
                photoAlt: "Close-up of Sentricon bait station in ground",
                tip: "The active ingredient (noviflumuron) works slowly — so termites can't detect the threat"
              },
              {
                step: "03",
                title: "Bait Spreads Through the Colony",
                description: "Worker termites carry the bait back to the colony and share it with nestmates, including the queen. The active ingredient disrupts molting — termites can't develop without it. The colony begins to collapse.",
                photo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&auto=format&fit=crop",
                photoAlt: "Professional termite inspection of home foundation",
                tip: "Colony elimination typically occurs within 60–90 days depending on colony size"
              },
              {
                step: "04",
                title: "Annual Monitoring Keeps You Protected",
                description: "EnviroCare's Certified Specialists visit annually (or more frequently if needed) to inspect all stations, refill bait, and confirm your protection is active. You get a written report after every visit.",
                photo: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop",
                photoAlt: "Pest control professional writing inspection report",
                tip: "You don't even need to be home — we handle it and notify you when complete"
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition">
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img src={item.photo} alt={item.photoAlt} className="w-full h-full object-cover" />
                  {/* STOCK PHOTO NOTE: Replace with real EnviroCare technician photos when available */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg" style={{background:"#0A7935"}}>
                    {item.step}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">{item.description}</p>
                  <div className="flex items-start gap-2 p-3 rounded-lg" style={{background:"#f0fdf4", border:"1px solid #bbf7d0"}}>
                    <span style={{color:"#0A7935"}} className="font-bold mt-0.5 flex-shrink-0">💡</span>
                    <p className="text-sm" style={{color:"#166534"}}>{item.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sentricon vs Liquid comparison */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <div className="p-6 text-white text-center" style={{background:"#0A7935"}}>
              <h3 className="text-2xl font-bold">Sentricon vs. Traditional Liquid Treatment</h3>
              <p className="text-green-100 mt-2">Why EnviroCare recommends Sentricon for Alabama homes</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="p-4 text-left text-slate-600 font-semibold">Feature</th>
                    <th className="p-4 text-center font-bold" style={{color:"#0A7935"}}>Sentricon® System</th>
                    <th className="p-4 text-center text-slate-500 font-semibold">Liquid Treatment</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Eliminates entire colony (including queen)", sentricon: "✅ Yes", liquid: "❌ No — repels only" },
                    { feature: "Requires trenching or drilling", sentricon: "✅ No disruption", liquid: "❌ Yes — major disruption" },
                    { feature: "Low chemical volume / safer near water", sentricon: "✅ Minimal chemicals", liquid: "⚠️ Large volume chemicals" },
                    { feature: "Always-active 24/7 protection", sentricon: "✅ Always active", liquid: "❌ Degrades over time" },
                    { feature: "Annual monitoring included", sentricon: "✅ Yes", liquid: "⚠️ Varies by company" },
                    { feature: "Targeted application — minimal exposure", sentricon: "✅ Yes", liquid: "⚠️ Requires precautions" },
                    { feature: "Effective at Lake Martin waterfront", sentricon: "✅ Ideal near water", liquid: "⚠️ Restrictions near water" },
                    { feature: "Used to protect the White House", sentricon: "✅ Yes", liquid: "❌ No" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="p-4 text-slate-700 font-medium">{row.feature}</td>
                      <td className="p-4 text-center font-semibold text-sm" style={{color:"#0A7935"}}>{row.sentricon}</td>
                      <td className="p-4 text-center text-slate-500 text-sm">{row.liquid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS FOR ALABAMA */}
      <section className="py-16 px-6" style={{background:"#f7f9f7"}}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Why Alabama Homes Need<br/>Year-Round Termite Protection
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Alabama ranks among the highest-risk states for termite damage in the country. The combination of warm temperatures, high humidity, and clay-rich soil creates near-perfect conditions for subterranean termite colonies to establish and thrive year-round.
              </p>
              <p className="text-slate-600 leading-relaxed mb-5">
                Unlike northern states where termites are dormant in winter, Alabama termites are active most of the year — feeding silently inside the wood of your home while you go about your life. By the time visible damage appears, a colony may have been feeding for three to five years.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Sentricon's Always Active™ technology means the bait is in the ground, monitoring, and working 365 days a year — whether it's July at Lake Martin or January in Huntsville.
              </p>
              <div className="space-y-3">
                {[
                  "Alabama is one of the top 5 states for termite activity",
                  "Average repair cost from termite damage: $8,000–$30,000",
                  "Most homeowner insurance does not cover termite damage",
                  "Termites work silently — no noise, no visible signs for years",
                  "Lake Martin's moisture makes waterfront homes especially high risk",
                ].map((fact, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color:"#0A7935"}} />
                    <span className="text-slate-700 text-sm">{fact}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {/* Stock photo placeholder with instructions */}
              <div className="rounded-2xl overflow-hidden shadow-lg bg-slate-100 h-64 flex items-center justify-center relative">
                <img
                  src="https://images.unsplash.com/photo-1523413555884-c0f9a8e3a11a?w=600&auto=format&fit=crop"
                  alt="Termite damage in wood structural beam"
                  className="w-full h-full object-cover"
                />
                {/* STOCK PHOTO: Use actual termite damage photo or get from NPMA library */}
              </div>
              <div className="p-5 rounded-xl border-2" style={{borderColor:"#F5A800", background:"#fffbeb"}}>
                <p className="font-bold text-slate-900 mb-2" style={{color:"#0A7935"}}>EnviroCare Sentricon Fact</p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Sentricon® with Always Active™ protects national landmarks including the White House, the U.S. Capitol Building, and the Smithsonian Museums. The same proven technology protects Alabama homes through EnviroCare's Certified Specialist program.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SENTRICON FOR NEW HOMES */}
      <section className="py-16 px-6 text-white" style={{background:"#0A7935"}}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Pre-Construction & New Home Protection</h2>
              <p className="text-green-100 leading-relaxed mb-5">
                The best time to install Sentricon is before termites find your home — ideally before or during construction. EnviroCare works with Alabama home builders to install Sentricon pre-treat systems at the building phase, providing the most effective protection possible from day one.
              </p>
              <p className="text-green-100 leading-relaxed mb-6">
                New homeowners who choose Sentricon at move-in inherit a property already protected — with monitoring stations in the ground and annual service built in.
              </p>
              <a href="/builders" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition" style={{background:"#F5A800", color:"#1A1A1A"}}>
                Learn About Our Builder Program →
              </a>
            </div>
            <div className="space-y-3">
              {[
                { title: "Pre-treat during construction", desc: "Most effective — soil treatment applied before slab pour or framing begins" },
                { title: "New construction installation", desc: "Sentricon stations installed at move-in, property immediately protected" },
                { title: "Existing home installation", desc: "Can be installed anytime — same effectiveness on older homes" },
                { title: "Home purchase inspection", desc: "WDO inspection + Sentricon installation — protect your investment from closing day" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl" style={{background:"rgba(255,255,255,0.1)"}}>
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white text-sm">{item.title}</p>
                    <p className="text-green-200 text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Sentricon Questions — Answered</h2>
          <div className="space-y-3">
            {[
              {
                q: "How quickly does Sentricon work?",
                a: "Termites must first find the bait stations, which depends on how actively they're foraging. Once they begin feeding, the active ingredient spreads through the colony. Most homeowners see colony elimination within 60–90 days, though this varies by colony size and termite pressure."
              },
              {
                q: "What about kids and pets around the stations?",
                a: "The active ingredient in Sentricon (noviflumuron) targets a biological process unique to insects — it prevents molting and does not affect humans, pets, or other mammals. The bait is contained within locked bait stations in the ground, so there's nothing exposed in your yard."
              },
              {
                q: "Can Sentricon be used near Lake Martin's water?",
                a: "Yes — this is one of Sentricon's major advantages over liquid treatments. Because Sentricon uses minimal chemical application contained within bait stations, it's appropriate for use near water bodies including Lake Martin. Liquid barriers carry higher risk of runoff near waterfront properties."
              },
              {
                q: "How often does EnviroCare visit to service the stations?",
                a: "Certified Sentricon Specialists service stations a minimum of once per year, though many properties benefit from more frequent monitoring. EnviroCare provides a written inspection report after every service visit. You don't need to be home — we can coordinate with your schedule or use a lockbox."
              },
              {
                q: "What if termites are found between service visits?",
                a: "Your annual EnviroCare plan includes re-treatment if active termite activity is found. We also offer above-ground Recruit AG stations for immediate response if termites are discovered indoors or in active feeding areas."
              },
              {
                q: "Can Sentricon work alongside other pest treatments?",
                a: "Yes. Sentricon works independently and does not interfere with general pest control, mosquito treatments, or tick control. Many EnviroCare customers bundle Sentricon monitoring with their pest and mosquito programs."
              },
              {
                q: "Is Sentricon effective on existing infestations or just prevention?",
                a: "Both. Sentricon is fully effective whether you have an active infestation or are protecting a termite-free home. For active infestations, we may add above-ground bait stations for faster access. Colony elimination occurs whether or not damage is visible."
              },
              {
                q: "How does the Sentricon system compare to traditional termite control?",
                a: "Traditional termite control means trenching and injecting liquid around the foundation — a chemical barrier that degrades over 5–7 years. The Sentricon system uses in-ground bait stations termites actively prefer over wood, eliminating the colony itself. It's the same reason many customers pair it with regular pest control: protection that's maintained, not re-applied."
              },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition">
                  <span className="font-semibold text-slate-900 pr-4">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${faqOpen === i ? "rotate-180" : ""}`} />
                </button>
                {faqOpen === i && (
                  <div className="px-5 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-white text-center" style={{background:"linear-gradient(135deg, #0A7935, #0f4d26)"}}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Free Termite Inspection for Alabama Homeowners</h2>
          <p className="text-green-100 text-lg mb-8">Our Certified Sentricon Specialists will assess your property, explain your options, and give you a written quote — no obligation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setQuoteOpen(true)}
              className="px-8 py-4 font-bold rounded-xl transition shadow-lg"
              style={{background:"#F5A800", color:"#1A1A1A"}}>
              Schedule Free Inspection
            </button>
            <a href="tel:2059406360"
              className="flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-xl transition border"
              style={{background:"rgba(255,255,255,0.1)", borderColor:"rgba(255,255,255,0.3)"}}>
              <Phone className="w-5 h-5" /> (205) 940-6360
            </a>
          </div>
          <p className="text-green-300 text-sm mt-6">3 Alabama offices · Birmingham · Alexander City · Huntsville</p>
        </div>
      </section>

      {quoteOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setQuoteOpen(false)}>
          <div className="bg-white rounded-2xl w-full sm:w-[440px] overflow-hidden shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <div className="text-white p-5 flex justify-between items-start" style={{background:"#0A7935"}}>
              <div><h3 className="font-bold text-xl">Free Termite Inspection</h3><p className="text-green-200 text-sm mt-1">Select your area</p></div>
              <button onClick={() => setQuoteOpen(false)} className="text-3xl leading-none text-green-300 hover:text-white mt-[-4px]">×</button>
            </div>
            <div className="p-6 space-y-3">
              {[
                { label: "Birmingham / Hoover / Chelsea / Shelby County", phone: "(205) 940-6360", tel: "2059406360" },
                { label: "Lake Martin / Alexander City / Auburn area", phone: "(256) 234-6162", tel: "2562346162" },
                { label: "Huntsville / Madison / Athens / Decatur", phone: "(256) 937-7676", tel: "2569377676" },
              ].map((o, i) => (
                <a key={i} href={`tel:${o.tel}`}
                  className="flex justify-between items-center w-full p-4 border-2 border-slate-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition group">
                  <div>
                    <div className="text-sm font-medium text-slate-700">{o.label}</div>
                    <div className="font-bold mt-0.5" style={{color:"#0A7935"}}>{o.phone}</div>
                  </div>
                  <Phone className="w-5 h-5 text-slate-400 group-hover:text-green-600 transition" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
