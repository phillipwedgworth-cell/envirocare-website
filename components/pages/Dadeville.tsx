"use client";
import { useState } from "react";
import { Phone, MapPin, CheckCircle, ChevronDown } from "lucide-react";

import Header from "@/components/shared/Header";
export default function Dadeville() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "EnviroCare Pest Control - Dadeville, AL",
          "description": "Professional mosquito, termite, and pest control in Dadeville, Alabama and the eastern Lake Martin shoreline. Serving Dadeville from our Alexander City office since 1958.",
          "telephone": "+12562346162",
          "url": "https://www.envirocarellc.com/dadeville",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1785 Tallapoosa St",
            "addressLocality": "Alexander City",
            "addressRegion": "AL",
            "postalCode": "35010"
          },
          "areaServed": ["Dadeville, AL", "Tallapoosa County, AL", "Lake Martin, AL"],
          
        }
      `}</script>

      <section className="relative overflow-hidden bg-gradient-to-br from-teal-950 via-slate-900 to-teal-900 text-white py-20 md:py-28">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 bg-teal-500/20 rounded-full border border-teal-400/30">
            <MapPin className="w-4 h-4 text-teal-300" />
            <span className="text-sm font-semibold text-teal-100">Dadeville · Tallapoosa County · Eastern Lake Martin</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Dadeville Pest Control<br/>
            <span className="text-teal-400">Lake Martin's Local Experts</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Dadeville and the eastern Lake Martin shoreline have trusted EnviroCare since 1958. Mosquito control, termite protection, and pest control for waterfront and inland properties alike.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button onClick={() => setQuoteOpen(true)} className="px-8 py-4 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-400 transition shadow-lg">Get Free Inspection</button>
            <a href="tel:2562346162" className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition border border-white/20">
              <Phone className="w-5 h-5" /> (256) 234-6162
            </a>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            {["Since 1958 at Lake Martin","Fast Scheduling from Alex City","Waterfront-Approved Products","FREE Termite Inspection"].map((t,i) => (
              <span key={i} className="flex items-center gap-2 text-teal-200"><span className="text-teal-400">✓</span>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-teal-50 border-b border-teal-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-5">Dadeville's Pest Challenges Are Unique</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Dadeville sits at the Tallapoosa County seat and along the eastern shore of Lake Martin — some of the most beautiful waterfront property in Alabama. It's also some of the most pest-active. 
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Mosquitoes from the lake, termites drawn to the moisture-rich soil, fire ants throughout the lawns and waterfront areas — Dadeville homes need pest protection that understands the waterfront environment. Our Alexander City office is minutes away and has served this community for over 68 years.
            </p>
            <div className="space-y-2">
              {[
                "Waterfront mosquito control (waterfront-approved products)",
                "Termite inspection including dock and pier structures",
                "Fire ant control for yards and lake access areas",
                "Fast scheduling from Alexander City office",
                "Seasonal and year-round programs available",
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-teal-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Areas We Serve Near Dadeville</h3>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {["Dadeville","Eastern Lake Martin","Tallapoosa County","Camp Hill area","Lake Martin waterfront","HWY 49 corridor","Lake Martin State Park area","Surrounding communities"].map(c => (
                <div key={c} className="flex items-center gap-2 text-sm text-slate-600"><div className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0"/>{c}</div>
              ))}
            </div>
            <a href="tel:2562346162" className="flex items-center gap-2 text-teal-700 font-bold text-lg hover:text-teal-800 mb-4">
              <Phone className="w-5 h-5" /> (256) 234-6162
            </a>
            <p className="text-xs text-slate-500">Alexander City office · Serving Dadeville and Lake Martin</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Services in Dadeville & Eastern Lake Martin</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🦟", name: "Mosquito Control", desc: "Monthly waterfront-approved mosquito treatments March–November. Essential for Dadeville's lake proximity.", highlight: true },
              { icon: "🪲", name: "Termite Control", desc: "Free inspection. Dadeville's lake soil creates ideal termite conditions. We inspect docks too.", highlight: false },
              { icon: "🐜", name: "Pest Control", desc: "Full perimeter pest control for Dadeville homes. Ants, roaches, spiders, crickets and more.", highlight: false },
              { icon: "🔥", name: "Fire Ant Control", desc: "Fire ants throughout Tallapoosa County lawns and waterfront areas. Colony elimination.", highlight: false },
              { icon: "🕷️", name: "Tick Control", desc: "Waterfront and wooded properties need tick protection. Yard treatments bundled free with mosquito service.", highlight: false },
              { icon: "📦", name: "Bundle Your Services", desc: "Pest + Mosquito + Termite combined. Most popular for Lake Martin area homeowners.", highlight: false },
            ].map((s, i) => (
              <div key={i} className={`p-6 rounded-xl border transition ${s.highlight ? "border-teal-500 bg-teal-50 shadow-md" : "border-slate-200 hover:border-teal-300 hover:shadow-sm"}`}>
                {s.highlight && <span className="inline-block mb-3 px-3 py-1 bg-teal-600 text-white text-xs font-bold rounded-full">50% OFF FIRST TREATMENT</span>}
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{s.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-teal-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Protecting Dadeville Since 1958</h2>
          <p className="text-teal-100 text-lg mb-8">Your local Alexander City office. Fast scheduling. Free inspection.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setQuoteOpen(true)} className="px-8 py-4 bg-white text-teal-900 font-bold rounded-xl hover:bg-teal-50 transition shadow-lg">Get Free Inspection</button>
            <a href="tel:2562346162" className="flex items-center justify-center gap-2 px-8 py-4 bg-teal-700 text-white font-bold rounded-xl hover:bg-teal-600 transition border border-teal-500">
              <Phone className="w-5 h-5" /> (256) 234-6162
            </a>
          </div>
        </div>
      </section>

      {quoteOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setQuoteOpen(false)}>
          <div className="bg-white rounded-2xl w-full sm:w-[420px] overflow-hidden shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <div className="bg-teal-700 text-white p-5 flex justify-between items-center">
              <div><h3 className="font-bold text-xl">Free Dadeville Inspection</h3><p className="text-teal-200 text-sm">Alex City office · We'll call within 2 hrs</p></div>
              <button onClick={() => setQuoteOpen(false)} className="text-3xl leading-none text-teal-300 hover:text-white">×</button>
            </div>
            <div className="p-6 space-y-3">
              {["Mosquito Control","Termite Inspection","Pest Control","Fire Ants","Bundle Package","Not sure — just inspect"].map(o => (
                <button key={o} className="w-full text-left px-4 py-3 border border-slate-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition text-slate-700 text-sm font-medium">{o}</button>
              ))}
              <div className="pt-3 border-t border-slate-100 text-center">
                <a href="tel:2562346162" className="flex items-center justify-center gap-2 text-teal-700 font-bold"><Phone className="w-4 h-4" /> (256) 234-6162</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
