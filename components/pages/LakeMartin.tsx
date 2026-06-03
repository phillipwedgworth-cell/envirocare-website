"use client";
import { useState } from "react";
import { MapPin, Phone, Star, Shield, CheckCircle, ChevronDown } from "lucide-react";

import Header from "@/components/shared/Header";
export default function LakeMartin() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "EnviroCare Pest Control - Lake Martin, AL",
          "description": "Professional mosquito, termite, and pest control for Lake Martin waterfront homes and communities. Serving Lake Martin since 1958 from our Alexander City office.",
          "image": "https://envirocarellc.com/logo.png",
          "telephone": "+12562346162",
          "url": "https://envirocarellc.com/lake-martin",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1785 Tallapoosa St",
            "addressLocality": "Alexander City",
            "addressRegion": "AL",
            "postalCode": "35010"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "32.9571",
            "longitude": "-85.9538"
          },
          "areaServed": ["Lake Martin, AL", "Alexander City, AL", "Dadeville, AL", "Eclectic, AL", "Wetumpka, AL"],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "312"
          },
          "priceRange": "$$",
          "foundingDate": "1958"
        }
      `}</script>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-emerald-900 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "radial-gradient(circle at 70% 30%, #0d9488 0%, transparent 60%), radial-gradient(circle at 20% 80%, #065f46 0%, transparent 50%)"}}></div>

        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 bg-teal-400/20 rounded-full border border-teal-400/30">
              <MapPin className="w-4 h-4 text-teal-300" />
              <span className="text-sm font-semibold text-teal-100">Lake Martin, Alabama</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Lake Martin's<br />
              <span className="text-teal-300">Pest & Mosquito</span><br />
              Control Experts
            </h1>

            <p className="text-lg md:text-xl text-teal-50 mb-8 leading-relaxed">
              Protecting Lake Martin waterfront homes, lake houses, and communities since 1958. 
              Your neighbors trust us — and have for over 68 years.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button onClick={() => setQuoteOpen(true)}
                className="px-8 py-4 bg-white text-teal-900 font-bold rounded-lg hover:bg-teal-50 transition shadow-lg text-base">
                Get Free Inspection
              </button>
              <a href="tel:2562346162"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition text-base">
                <Phone className="w-5 h-5" />
                (256) 234-6162
              </a>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: "🏆", val: "Since 1958", label: "Serving Lake Martin" },
                { icon: "⭐", val: "4.9 Stars", label: "Verified" },
                { icon: "📍", val: "Local Office", label: "Alexander City" },
                { icon: "🌿", val: "Eco-Safe", label: "Pet & kid friendly" },
              ].map((t, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl mb-1">{t.icon}</div>
                  <div className="text-sm font-bold text-white">{t.val}</div>
                  <div className="text-xs text-teal-200">{t.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY LAKE MARTIN IS DIFFERENT */}
      <section className="py-16 px-6 bg-teal-50 border-b border-teal-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Lake Martin Homes Need<br/>
                <span className="text-teal-600">Different Pest Control</span>
              </h2>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                880 miles of shoreline. Warm Alabama summers. Water everywhere. Lake Martin is paradise — and paradise for mosquitoes, termites, and pests too. Standard pest control doesn't cut it here.
              </p>
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                We've been protecting Lake Martin homes since 1958. Our Alexander City office means our technicians are your neighbors — they know every cove, community, and crawlspace challenge specific to lakefront living.
              </p>
              <div className="space-y-3">
                {[
                  "Mosquito treatments formulated for waterfront environments",
                  "Termite protection for pier and dock structures",
                  "Eco-safe solutions that won't harm lake wildlife",
                  "Seasonal programs timed to Alabama's pest calendar",
                  "Same-day service from our Alexander City office",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-teal-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Lake Martin Fast Facts</h3>
              <div className="space-y-5">
                {[
                  { label: "Shoreline", val: "880 miles", note: "More than Lake Tahoe" },
                  { label: "Surface area", val: "40,000 acres", note: "Alabama's largest lake" },
                  { label: "Avg home value", val: "$778,000+", note: "Premium waterfront market" },
                  { label: "Growth rate", val: "+8–10% annually", note: "One of AL's fastest growing" },
                  { label: "EnviroCare serving", val: "Since 1958", note: "Your original local experts" },
                ].map((f, i) => (
                  <div key={i} className="flex justify-between items-start border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <div>
                      <div className="text-sm font-medium text-slate-500">{f.label}</div>
                      <div className="text-xs text-slate-400">{f.note}</div>
                    </div>
                    <div className="text-right font-bold text-teal-700">{f.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITIES SERVED */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Communities We Serve Around Lake Martin
            </h2>
            <p className="text-lg text-slate-600">
              From the north shore to the south, every community on the lake
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                community: "Alexander City",
                description: "Our home base since 1958. Full services, fastest response times, local expertise you won't find anywhere else.",
                highlight: "Office Location",
                color: "teal",
              },
              {
                community: "Dadeville",
                description: "Serving Dadeville homes and waterfront properties along the eastern shore of Lake Martin.",
                highlight: "Tallapoosa County seat",
                color: "blue",
              },
              {
                community: "Eclectic",
                description: "Most lake shoreline of any city. Eclectic homes get the full waterfront treatment including dock and pier inspection.",
                highlight: "Most lake shoreline",
                color: "blue",
              },
              {
                community: "Russell Lands / The Ridge",
                description: "Premium waterfront communities deserve premium protection. We service all Russell Lands developments including The Ridge, Chimney Rock, and Stillwaters.",
                highlight: "Premium communities",
                color: "amber",
              },
              {
                community: "Wind Creek State Park Area",
                description: "Homes near Wind Creek benefit from our seasonal mosquito programs timed to park visitor peaks.",
                highlight: "State park area",
                color: "green",
              },
              {
                community: "Auburn (from Alex City)",
                description: "Serving Auburn and Opelika from our Alexander City office. Growing market, college-town demand.",
                highlight: "Growth market",
                color: "green",
              },
            ].map((c, i) => {
              const colors = {
                teal: "border-teal-500 bg-teal-50",
                blue: "border-blue-400 bg-blue-50",
                amber: "border-amber-400 bg-amber-50",
                green: "border-emerald-500 bg-emerald-50",
              };
              const badgeColors = {
                teal: "bg-teal-100 text-teal-800",
                blue: "bg-blue-100 text-blue-800",
                amber: "bg-amber-100 text-amber-800",
                green: "bg-emerald-100 text-emerald-800",
              };
              return (
                <div key={i} className={`p-6 rounded-xl border-l-4 ${colors[c.color]}`}>
                  <span className={`inline-block text-xs font-bold px-2 py-1 rounded mb-3 ${badgeColors[c.color]}`}>
                    {c.highlight}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{c.community}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{c.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Services for Lake Martin Properties
            </h2>
            <p className="text-lg text-slate-600">Built for waterfront living, not just any house</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "🦟",
                name: "Mosquito Control",
                tagline: "The #1 complaint at every lake house",
                description: "Our Lake Martin mosquito program is engineered for waterfront. We treat your yard, shoreline, and surrounding vegetation on a recurring schedule throughout mosquito season (April–October). 50% off your first treatment.",
                cta: "50% off first treatment",
                href: "/services/mosquito-control",
                highlight: true,
              },
              {
                icon: "🪲",
                name: "Termite Control",
                tagline: "Moisture + wood = termite paradise",
                description: "Lake Martin's humidity and water proximity create ideal termite conditions. We inspect and treat decks, docks, crawlspaces, and structural wood with solutions specific to high-moisture environments.",
                cta: "Free termite inspection",
                href: "/services/termite-control",
                highlight: false,
              },
              {
                icon: "🐜",
                name: "General Pest Control",
                tagline: "Ants, spiders, roaches, and more",
                description: "Full perimeter pest control for your lake home. We keep the inside clean and the outside protected all season long. Bundle with mosquito for maximum savings.",
                cta: "Get free estimate",
                href: "/services/pest-control",
                highlight: false,
              },
              {
                icon: "🔥",
                name: "Fire Ant Control",
                tagline: "A real danger around water and bare feet",
                description: "Fire ants around lake homes are a serious hazard, especially with children playing outside. We eliminate colonies and create lasting barriers around your property.",
                cta: "Learn more",
                href: "/services/fire-ant-control",
                highlight: false,
              },
            ].map((s, i) => (
              <div key={i} className={`p-8 rounded-xl border ${s.highlight ? "border-teal-500 bg-teal-50 shadow-lg" : "border-slate-200 bg-white"}`}>
                {s.highlight && (
                  <span className="inline-block mb-3 px-3 py-1 bg-teal-600 text-white text-xs font-bold rounded-full">
                    MOST POPULAR FOR LAKE HOMES
                  </span>
                )}
                <div className="text-4xl mb-3">{s.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{s.name}</h3>
                <p className="text-sm font-medium text-teal-600 mb-3">{s.tagline}</p>
                <p className="text-slate-600 mb-5 leading-relaxed">{s.description}</p>
                <a href={s.href}
                  className={`inline-block px-5 py-2 rounded-lg text-sm font-bold transition ${
                    s.highlight
                      ? "bg-teal-600 text-white hover:bg-teal-700"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                  }`}>
                  {s.cta} →
                </a>
              </div>
            ))}
          </div>

          {/* Bundle callout */}
          <div className="mt-10 p-8 bg-emerald-900 text-white rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-3">Bundle & Save — Most Popular at Lake Martin</h3>
            <p className="text-emerald-100 mb-6 text-lg">
              Combine Pest Control + Mosquito + Termite into one easy monthly plan.<br/>
              Most Lake Martin homeowners bundle. It's the smartest way to protect a waterfront property.
            </p>
            <a href="/bundle-services"
              className="inline-block px-8 py-3 bg-white text-emerald-900 font-bold rounded-lg hover:bg-emerald-50 transition">
              See Bundle Options
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            What Lake Martin Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Robert M.",
                location: "Lake Martin",
                text: "I have used Envirocare for many years and I have to say they are and have been the best pest service we have ever used.",
                stars: 5,
              },
              {
                name: "Janet H.",
                location: "Alexander City",
                text: "The person who did our treatment was great. Very friendly and very careful of our things.",
                stars: 5,
              },
              {
                name: "Mashonda T.",
                location: "Lake Martin area",
                text: "This is my second year using Envirocare for termite services and I continue to value their professionalism and flexibility when scheduling.",
                stars: 5,
              },
            ].map((t, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex gap-1 mb-3">
                  {[...Array(t.stars)].map((_, s) => <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-slate-700 mb-4 italic">"{t.text}"</p>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
            Lake Martin Pest Control FAQ
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "Are your treatments safe for use near the lake and water?",
                a: "Yes. All of our Lake Martin treatments use EPA-approved products specifically selected for use near water. We follow strict environmental protocols to protect Lake Martin's ecosystem, fish, and wildlife while effectively controlling pests.",
              },
              {
                q: "How often should I treat my lake house for mosquitoes?",
                a: "For waterfront properties on Lake Martin, we recommend monthly treatments from April through October. The lake environment and Alabama humidity create ideal breeding conditions all summer. Many homeowners bundle mosquito control with general pest for maximum protection.",
              },
              {
                q: "Do you treat docks, piers, and boathouses?",
                a: "Yes. Docks, piers, and boathouses are high-moisture wood structures that attract termites and wood-boring insects. Our waterfront inspection includes all exterior structures, not just the main house.",
              },
              {
                q: "I only use my lake house seasonally. Can you work around my schedule?",
                a: "Absolutely. Many of our Lake Martin customers are seasonal or weekend visitors. We offer flexible scheduling, lockbox access arrangements, and can treat while you're away. We'll notify you before and after every visit.",
              },
              {
                q: "How quickly can you get out to Lake Martin?",
                a: "Same-day and next-day service is available from our Alexander City office. We're your literal neighbors — we're here year-round and know every community around the lake.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition">
                  <span className="font-semibold text-slate-900 pr-4">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${faqOpen === i ? "rotate-180" : ""}`} />
                </button>
                {faqOpen === i && (
                  <div className="px-5 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-teal-800 to-emerald-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Protect Your Lake Martin Home?
          </h2>
          <p className="text-teal-100 text-lg mb-8">
            Call your neighbors at EnviroCare. We've been right here at Lake Martin since 1958 — and we're not going anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setQuoteOpen(true)}
              className="px-8 py-4 bg-white text-teal-900 font-bold rounded-lg hover:bg-teal-50 transition shadow-lg">
              Get Free Inspection
            </button>
            <a href="tel:2562346162"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition border border-teal-500">
              <Phone className="w-5 h-5" />
              Call (256) 234-6162
            </a>
          </div>
          <p className="text-teal-300 text-sm mt-6">Alexander City Office · Same-Day Service Available · Licensed & Insured</p>
        </div>
      </section>

      {/* Quote Modal */}
      {quoteOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full sm:w-[420px] overflow-hidden shadow-2xl">
            <div className="bg-teal-700 text-white p-5 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Free Lake Martin Inspection</h3>
                <p className="text-teal-200 text-sm">We'll call you within 2 hours</p>
              </div>
              <button onClick={() => setQuoteOpen(false)} className="text-3xl leading-none text-teal-200 hover:text-white">×</button>
            </div>
            <div className="p-6 space-y-3">
              <p className="text-slate-700 font-medium mb-2">What do you need help with?</p>
              {["Mosquito Control", "Termite Inspection", "General Pest Control", "Fire Ants", "Bundle Package", "Not sure — just inspect"].map(opt => (
                <button key={opt}
                  className="w-full text-left px-4 py-3 border border-slate-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition text-slate-700 text-sm font-medium">
                  {opt}
                </button>
              ))}
              <div className="pt-3 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-500 mb-3">Or call us directly:</p>
                <a href="tel:2562346162"
                  className="flex items-center justify-center gap-2 text-teal-700 font-bold">
                  <Phone className="w-4 h-4" />
                  (256) 234-6162
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
