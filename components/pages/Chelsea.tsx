"use client";
import { useState } from "react";
import { Phone, MapPin, Star, CheckCircle, ChevronDown } from "lucide-react";

import Header from "@/components/shared/Header";
export default function Chelsea() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "EnviroCare Pest Control - Chelsea, AL",
          "description": "Professional pest, termite, and mosquito control serving Chelsea, Alabama and zip code 35242. Family-owned since 1958. Local Birmingham-area office.",
          "telephone": "+12059406360",
          "url": "https://www.envirocarellc.com/chelsea",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "2025 Butler Rd",
            "addressLocality": "Alabaster",
            "addressRegion": "AL",
            "postalCode": "35007"
          },
          "areaServed": ["Chelsea, AL", "35242", "Shelby County, AL"],
          
        }
      `}</script>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 text-white py-20 md:py-28">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:"radial-gradient(ellipse at 30% 80%, #0A7935 0%, transparent 55%)"}} />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-400/30">
            <MapPin className="w-4 h-4 text-emerald-300" />
            <span className="text-sm font-semibold text-emerald-100">Chelsea, AL · 35242 · Shelby County</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Chelsea Pest Control<br/>
            <span className="text-emerald-400">Trusted in Your Neighborhood</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Chelsea families and businesses have trusted EnviroCare for generations. Licensed technicians, low-impact treatments, fast scheduling from our nearby Alabaster office.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button onClick={() => setQuoteOpen(true)}
              className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-400 transition shadow-lg">
              Get Free Inspection
            </button>
            <a href="tel:2059406360"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition border border-white/20">
              <Phone className="w-5 h-5" /> (205) 940-6360
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { n: "Since 1958", sub: "Family Owned" },
              { n: "★★★★★", sub: "Verified Reviews" },
              { n: "Fast", sub: "Scheduling Available" },
              { n: "Family", sub: "Owned Since 1958" },
            ].map((t, i) => (
              <div key={i} className="text-center">
                <div className="font-bold text-emerald-400 text-lg">{t.n}</div>
                <div className="text-xs text-slate-400 mt-1">{t.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <div className="bg-emerald-700 text-white py-3 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-5 justify-center text-sm font-medium">
          <span>✓ <strong>$50 OFF</strong> Initial Pest Control</span>
          <span>✓ <strong>50% OFF</strong> First Mosquito Treatment</span>
          <span>✓ <strong>FREE</strong> Termite Inspection</span>
          <button onClick={() => setQuoteOpen(true)} className="px-4 py-1 bg-white text-emerald-800 font-bold rounded-lg text-xs hover:bg-emerald-50 transition">Claim →</button>
        </div>
      </div>

      {/* SERVICES */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Services in Chelsea & 35242</h2>
            <p className="text-lg text-slate-600">Comprehensive pest protection for Chelsea homes and businesses</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              { icon: "🐜", name: "Pest Control", desc: "Perimeter protection from ants, roaches, spiders, and all common Chelsea pests. Bi-monthly or monthly programs.", href: "/services/pest-control" },
              { icon: "🪲", name: "Termite Control", desc: "Chelsea's newer construction isn't immune. We inspect, treat, and protect with industry-leading termite solutions.", href: "/services/termite-control", highlight: true },
              { icon: "🦟", name: "Mosquito Control", desc: "Shelby County summers are prime mosquito season. Monthly yard treatments protect your family all season long.", href: "/services/mosquito-control" },
              { icon: "🔥", name: "Fire Ant Control", desc: "Fire ants are a real hazard in Chelsea's growing neighborhoods. Colony elimination and lasting perimeter protection.", href: "/services/fire-ant-control" },
              { icon: "🕷️", name: "Tick Control", desc: "Chelsea's wooded areas and greenways mean tick pressure. Yard treatments break the tick lifecycle around your home.", href: "/services/tick-control" },
              { icon: "📦", name: "Bundle Your Services", desc: "Most popular: Pest + Mosquito + Termite in one simple monthly plan. Maximum protection, easy payment.", href: "/bundle-services" },
            ].map((s, i) => (
              <div key={i} className={`p-6 rounded-xl border transition ${s.highlight ? "border-emerald-500 bg-emerald-50 shadow-md" : "border-slate-200 hover:border-emerald-300 hover:shadow-md"}`}>
                {s.highlight && <span className="inline-block mb-3 px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">FREE INSPECTION</span>}
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{s.name}</h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">{s.desc}</p>
                <a href={s.href} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">Learn more →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL RELEVANCE */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Protecting Chelsea Homes</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Chelsea is one of Alabama's fastest-growing communities. New construction, wooded lots, and Shelby County's warm climate create year-round pest pressure — especially from termites, fire ants, and mosquitoes.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Our Birmingham-area office in Alabaster serves Chelsea directly. We know 35242 — the neighborhoods, the soil, the pest pressures specific to your area. That local knowledge makes all the difference.
              </p>
              <div className="space-y-3">
                {[
                  "Serving Chelsea and 35242 zip code directly",
                  "New construction termite inspections available",
                  "Mosquito programs timed to Shelby County's season",
                  "Fast scheduling from nearby Alabaster office",
                  "Licensed for all Alabama pest control services",
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4">Chelsea Area Coverage</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["Chelsea","35242 zip","Shelby County","Columbiana Rd area","Chelsea Park","Meadow Brook","Sterrett","Chelsea Commons"].map(c => (
                    <div key={c} className="flex items-center gap-2 text-sm text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      {c}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900 rounded-xl p-6 text-white">
                <h3 className="font-bold text-emerald-400 mb-3">Why EnviroCare in Chelsea?</h3>
                <div className="space-y-2 text-sm text-slate-300">
                  <p>✓ Family-owned since 1958 — not a franchise</p>
                  <p>✓ Local Alabaster office serves Chelsea directly</p>
                  <p>✓ ★★★★★ Verified by Google</p>
                  <p>✓ Low-impact products applied by licensed technicians</p>
                  <p>✓ Satisfaction guaranteed on every treatment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Trusted by Alabama Families</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Sheree P.", loc: "Chelsea area", text: "Our household uses EnviroCare for termite protection.", stars: 5 },
              { name: "Jessica M.", loc: "Shelby County", text: "My husband and I use EnviroCare for our pest control. We absolutely love the service and the technicians.", stars: 5 },
              { name: "Evelyn F.", loc: "Birmingham area", text: "Great service with knowledgeable and friendly staff.", stars: 5 },
            ].map((r, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex gap-1 mb-3">{[...Array(r.stars)].map((_, s) => <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />)}</div>
                <p className="text-slate-700 italic mb-4">"{r.text}"</p>
                <div><p className="font-bold text-slate-900 text-sm">{r.name}</p><p className="text-xs text-slate-500">{r.loc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Chelsea Pest Control FAQ</h2>
          <div className="space-y-3">
            {[
              { q: "Do you serve the 35242 zip code?", a: "Yes — 35242 is one of our primary service areas in the Birmingham region. Our Alabaster office is just minutes away, giving us fast response times across Chelsea and the surrounding zip codes." },
              { q: "Chelsea is growing fast. Do you handle new construction?", a: "Absolutely. New construction in Chelsea and Shelby County brings its own pest challenges — disturbed soil attracts termites, and new builds need pre-treatment before the slab is poured. We offer builder pre-treatment and post-construction inspections." },
              { q: "What pests are most common in Chelsea?", a: "Termites are the biggest threat — Shelby County's soil and humidity are ideal for them. Fire ants are a major issue in Chelsea's lawns. Mosquitoes are heavy in summer. Moisture ants appear in older crawlspaces." },
              { q: "How do I know which plan is right for my Chelsea home?", a: "We start with a free inspection. Our technician assesses your property — the type of home, lot, surrounding vegetation, existing pest pressure — and recommends a plan tailored to your specific situation. No pressure, no one-size-fits-all." },
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
      <section className="py-20 px-6 bg-emerald-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Protect Your Chelsea Home</h2>
          <p className="text-emerald-100 text-lg mb-8">Free inspection. Fast scheduling. Local experts you can trust.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setQuoteOpen(true)}
              className="px-8 py-4 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 transition shadow-lg">
              Get Free Inspection
            </button>
            <a href="tel:2059406360"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-600 transition border border-emerald-500">
              <Phone className="w-5 h-5" /> (205) 940-6360
            </a>
          </div>
        </div>
      </section>

      {quoteOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setQuoteOpen(false)}>
          <div className="bg-white rounded-2xl w-full sm:w-[420px] overflow-hidden shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <div className="bg-emerald-700 text-white p-5 flex justify-between items-center">
              <div><h3 className="font-bold text-xl">Free Chelsea Inspection</h3><p className="text-emerald-200 text-sm">We'll call within 2 hours</p></div>
              <button onClick={() => setQuoteOpen(false)} className="text-3xl leading-none text-emerald-300 hover:text-white">×</button>
            </div>
            <div className="p-6 space-y-3">
              {["Pest Control","Termite Inspection","Mosquito Control","Fire Ants","Bundle Package","Not sure — just inspect"].map(o => (
                <button key={o} className="w-full text-left px-4 py-3 border border-slate-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition text-slate-700 text-sm font-medium">{o}</button>
              ))}
              <div className="pt-3 border-t border-slate-100 text-center">
                <a href="tel:2059406360" className="flex items-center justify-center gap-2 text-emerald-700 font-bold">
                  <Phone className="w-4 h-4" /> (205) 940-6360
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
