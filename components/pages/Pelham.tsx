"use client";
import { useState } from "react";
import { Phone, MapPin, Star, CheckCircle, ChevronDown } from "lucide-react";

import Header from "@/components/shared/Header";
export default function Pelham() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "EnviroCare Pest Control - Pelham, AL",
          "description": "Professional pest, termite, and mosquito control serving Pelham, Alabama. Local Birmingham-area office at 2025 Butler Rd, Alabaster. Family-owned since 1958.",
          "telephone": "+12059406360",
          "url": "https://envirocarellc.com/pelham",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "2025 Butler Rd",
            "addressLocality": "Alabaster",
            "addressRegion": "AL",
            "postalCode": "35007"
          },
          "areaServed": ["Pelham, AL","Shelby County, AL"],
          
        }
      `}</script>

      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white py-20 md:py-28">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-400/30">
            <MapPin className="w-4 h-4 text-emerald-300" />
            <span className="text-sm font-semibold text-emerald-100">Pelham, AL · Shelby County</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Pelham Pest Control<br/>
            <span className="text-emerald-400">Fast. Local. Guaranteed.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Pelham families trust EnviroCare for pest, termite, and mosquito control. Our Alabaster office is minutes away — fast scheduling, licensed technicians, family-owned since 1958.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button onClick={() => setQuoteOpen(true)} className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-400 transition shadow-lg">Get Free Inspection</button>
            <a href="tel:2059406360" className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition border border-white/20">
              <Phone className="w-5 h-5" /> (205) 940-6360
            </a>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            {["$50 Off Initial Service","50% Off First Mosquito","FREE Termite Inspection","Fast Scheduling"].map((t,i) => (
              <span key={i} className="flex items-center gap-2 text-emerald-200"><span className="text-emerald-400">✓</span>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Services in Pelham, AL</h2>
            <p className="text-lg text-slate-600">Complete pest protection for Pelham homes and businesses</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🐜", name: "Pest Control", desc: "Perimeter protection from ants, roaches, spiders, and all Pelham area pests. Quarterly programs with re-treatment guarantee.", highlight: false },
              { icon: "🪲", name: "Termite Control", desc: "Free inspection for Pelham homeowners. Pelham's soil and humidity make termite protection essential.", highlight: true },
              { icon: "🦟", name: "Mosquito Control", desc: "Monthly treatments March–November. Pelham's greenways and wooded areas drive heavy mosquito pressure.", highlight: false },
              { icon: "🔥", name: "Fire Ant Control", desc: "Aggressive fire ant populations throughout Shelby County. Colony elimination, not just suppression.", highlight: false },
              { icon: "🕷️", name: "Tick Control", desc: "Pelham's greenways and wooded areas create tick habitat. Yard treatments protect your family all season.", highlight: false },
              { icon: "📦", name: "Bundle & Save", desc: "Pest + Mosquito + Termite in one simple monthly plan. Most popular option for Pelham homeowners.", highlight: false },
            ].map((s, i) => (
              <div key={i} className={`p-6 rounded-xl border transition ${s.highlight ? "border-emerald-500 bg-emerald-50 shadow-md" : "border-slate-200 hover:border-emerald-300 hover:shadow-sm"}`}>
                {s.highlight && <span className="inline-block mb-3 px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">FREE INSPECTION</span>}
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{s.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Pelham Chooses EnviroCare</h2>
            <div className="space-y-4">
              {[
                { t: "Office in Alabaster — 5 minutes away", d: "Faster response than any company dispatching from Birmingham proper." },
                { t: "Family-owned since 1958", d: "Three generations of the Wedgworth family. We treat your home like our own." },
                { t: "4.7★ Google Rated", d: "Consistent 5-star service across the Birmingham metro for decades." },
                { t: "Licensed & insured in Alabama", d: "Every technician state-certified. EPA-registered treatments applied per label." },
                { t: "Satisfaction guaranteed", d: "Pests return between visits? So do we — at no charge." },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div><p className="font-semibold text-slate-900 text-sm">{item.t}</p><p className="text-sm text-slate-500">{item.d}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-3">Pelham Coverage Area</h3>
              <div className="grid grid-cols-2 gap-2">
                {["Pelham","Pelham Crossings","Shelby County","Oak Mountain area","Lee Branch area","Valley Road area","Highway 31 corridor","Inverness area"].map(c => (
                  <div key={c} className="flex items-center gap-2 text-sm text-slate-600"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"/>{c}</div>
                ))}
              </div>
            </div>
            <div className="bg-emerald-700 rounded-xl p-6 text-white">
              <p className="font-bold text-lg mb-1">(205) 940-6360</p>
              <p className="text-emerald-200 text-sm mb-4">Birmingham office · Serving Pelham</p>
              <button onClick={() => setQuoteOpen(true)} className="w-full py-3 bg-white text-emerald-800 font-bold rounded-lg hover:bg-emerald-50 transition">Get Free Quote</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-emerald-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Pelham's Trusted Pest Experts</h2>
          <p className="text-emerald-100 text-lg mb-8">Fast scheduling from our Alabaster office. Free inspection, guaranteed results.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setQuoteOpen(true)} className="px-8 py-4 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 transition shadow-lg">Get Free Inspection</button>
            <a href="tel:2059406360" className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-600 transition border border-emerald-500">
              <Phone className="w-5 h-5" /> (205) 940-6360
            </a>
          </div>
        </div>
      </section>

      {quoteOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setQuoteOpen(false)}>
          <div className="bg-white rounded-2xl w-full sm:w-[420px] overflow-hidden shadow-2xl" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <div className="bg-emerald-700 text-white p-5 flex justify-between items-center">
              <div><h3 className="font-bold text-xl">Free Pelham Inspection</h3><p className="text-emerald-200 text-sm">We'll call within 2 hours</p></div>
              <button onClick={() => setQuoteOpen(false)} className="text-3xl leading-none text-emerald-300 hover:text-white">×</button>
            </div>
            <div className="p-6 space-y-3">
              {["Pest Control","Termite Inspection","Mosquito Control","Fire Ants","Bundle Package","Not sure — just inspect"].map(o => (
                <button key={o} className="w-full text-left px-4 py-3 border border-slate-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition text-slate-700 text-sm font-medium">{o}</button>
              ))}
              <div className="pt-3 border-t border-slate-100 text-center">
                <a href="tel:2059406360" className="flex items-center justify-center gap-2 text-emerald-700 font-bold"><Phone className="w-4 h-4" /> (205) 940-6360</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
