"use client";
import React, { useState } from 'react';
import { ChevronDown, MapPin, Phone, CheckCircle, AlertTriangle, Home } from 'lucide-react';

import Header from "@/components/shared/Header";
export default function TermiteInspectionServicePage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Schema.org - Service + FAQ */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Termite Inspection & Treatment",
          "description": "Professional termite inspection, detection, and treatment services. Free inspections, guaranteed results.",
          "provider": {
            "@type": "LocalBusiness",
            "name": "EnviroCare Pest Control",
            "telephone": "(205) 940-6360"
          },
          "areaServed": ["Huntsville, AL", "Madison, AL", "Birmingham, AL"],
          "offers": {
            "@type": "Offer",
            "description": "Sentricon® termite protection. Pricing is determined after a free on-site WDO inspection, as Alabama requires."
          }
        }
      `}</script>

      {/* HEADER */}
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-slate-900 text-white py-20 md:py-32">
        <div
          className="absolute inset-0 opacity-25 mix-blend-overlay"
          style={{ backgroundImage: "url('/termite-damage.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Professional Termite <span className="text-red-300">Inspection & Treatment</span>
          </h1>

          <p className="text-lg md:text-xl text-red-50 max-w-3xl mx-auto mb-8">
            Termites cost homeowners $5 billion annually in damage. Don't become a statistic. Free inspection, guaranteed results, licensed termite experts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="px-8 py-4 bg-white text-red-900 font-bold rounded-lg hover:bg-red-50 transition shadow-lg">
              Schedule Free Inspection
            </button>
            <a href="tel:2059406360" className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition">
              Call (205) 940-6360
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 text-center text-sm">
            <div>
              <div className="text-2xl mb-2">🔍</div>
              <div className="font-semibold">Free Inspection</div>
            </div>
            <div>
              <div className="text-2xl mb-2">✓</div>
              <div className="font-semibold">Licensed Experts</div>
            </div>
            <div>
              <div className="text-2xl mb-2">✓</div>
              <div className="font-semibold">Guaranteed Results</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY TERMITE INSPECTIONS MATTER */}
      <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <div className="bg-red-50 border-l-4 border-red-600 p-8 rounded-lg mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Termite Inspections Are Critical</h2>
          <p className="text-lg text-slate-700 mb-4">
            Termites work silently. By the time you notice damage, thousands of dollars in structural repairs are already needed. A professional inspection detects termites before they become catastrophic.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="flex gap-4">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Structural Damage</h3>
                <p className="text-slate-600">Can cost $25,000+ to repair. Early detection saves thousands.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Home Value</h3>
                <p className="text-slate-600">Termite history can reduce home resale value 10-20%.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Insurance Issues</h3>
                <p className="text-slate-600">Most homeowners insurance doesn't cover termite damage.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Hidden Damage</h3>
                <p className="text-slate-600">Termites hide inside walls. You need professionals to find them.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNS OF TERMITES */}
      <section className="py-16 md:py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
            7 Signs You May Have Termites
          </h2>
          <p className="text-center text-slate-600 mb-16 text-lg">
            Many of these signs are invisible. That's why professional inspection is critical.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                sign: "Mud Tubes",
                description: "Thin mud-like tunnels on walls, crawlspaces, or foundations. Termites use these for protection.",
                severity: "HIGH RISK"
              },
              {
                sign: "Wood Damage",
                description: "Hollow-sounding wood, blistering paint, or visible damage to framing and walls.",
                severity: "CRITICAL"
              },
              {
                sign: "Swarmers",
                description: "Winged termites during spring (April-May). Often mistaken for flying ants. This means active infestation.",
                severity: "IMMEDIATE"
              },
              {
                sign: "Discarded Wings",
                description: "After swarming season, you may find piles of wings on windowsills or near lights.",
                severity: "HIGH RISK"
              },
              {
                sign: "Frass (Termite Droppings)",
                description: "Small, dark pellets that look like sawdust or sand. Found near termite activity.",
                severity: "HIGH RISK"
              },
              {
                sign: "Sagging Floors",
                description: "Structural settling or bouncy floors indicate damage to support beams. This is serious.",
                severity: "CRITICAL"
              },
              {
                sign: "Clicking Sounds",
                description: "Soldier termites make clicking sounds when disturbed. Audible from inside walls.",
                severity: "MEDIUM"
              },
              {
                sign: "NO VISIBLE SIGNS",
                description: "The most dangerous scenario. Termites can work undetected for 3-8 years. Professional inspection is ONLY way to know.",
                severity: "SNEAKY"
              }
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-white rounded-lg border border-slate-200 hover:border-red-600 hover:shadow-lg transition">
                <div className="flex items-start gap-4 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{item.sign}</h3>
                    <span className="inline-block mt-2 px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded">
                      {item.severity}
                    </span>
                  </div>
                </div>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-red-50 border-2 border-red-600 rounded-lg text-center">
            <p className="text-lg text-slate-900 mb-4">
              <strong>Seeing any of these signs?</strong> Don't wait. Termites cause exponential damage the longer they feed.
            </p>
            <button className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition">
              Schedule Free Inspection Today
            </button>
          </div>
        </div>
      </section>

      {/* OUR INSPECTION PROCESS */}
      <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16 text-center">
          Our Professional Inspection Process
        </h2>

        <div className="space-y-8">
          {[
            {
              step: 1,
              title: "Initial Assessment",
              description: "We walk your property, identify potential entry points, and assess risk factors (moisture, wood-to-soil contact, age of home)."
            },
            {
              step: 2,
              title: "Detailed Inspection",
              description: "Licensed termite inspectors examine crawlspace, attic, foundation, exterior, and interior walls. We use moisture meters and acoustic listening devices."
            },
            {
              step: 3,
              title: "Attic & Crawlspace Inspection",
              description: "The most common areas for termite damage. We look for mud tubes, damaged wood, frass, and termite activity."
            },
            {
              step: 4,
              title: "Foundation & Perimeter Check",
              description: "Inspect foundation cracks, soil-to-wood contact, gutters/drainage, and exterior wood damage."
            },
            {
              step: 5,
              title: "Written Report",
              description: "Detailed findings with photos, risk assessment, and treatment recommendations if needed."
            },
            {
              step: 6,
              title: "Treatment Plan (If Needed)",
              description: "If termites detected, we explain treatment options: barriers, spot treatments, bait systems, or monitoring."
            }
          ].map((item) => (
            <div key={item.step} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-600 text-white font-bold text-lg">
                  {item.step}
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TREATMENT OPTIONS */}
      <section className="py-16 md:py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
            Treatment Options (If Termites Found)
          </h2>
          <p className="text-center text-slate-600 mb-16 text-lg">
            We'll explain all options and recommend the best solution for your situation.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Liquid Barriers",
                description: "Protective chemicals applied to soil around foundation. Creates barrier termites cannot cross.",
                effectiveness: "Highly effective",
                duration: "3-5 years"
              },
              {
                name: "Bait Systems",
                description: "Tamper-proof stations placed around property. Termites consume poison and carry it back to colony (slow kill).",
                effectiveness: "Extremely effective",
                duration: "Ongoing monitoring"
              },
              {
                name: "Spot Treatments",
                description: "For isolated infestations inside walls. Injection into damaged wood areas.",
                effectiveness: "Targeted solution",
                duration: "As needed"
              }
            ].map((option, idx) => (
              <div key={idx} className="p-8 bg-white rounded-lg border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{option.name}</h3>
                <p className="text-slate-600 mb-6">{option.description}</p>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-slate-900">Effectiveness:</span>
                    <p className="text-slate-600">{option.effectiveness}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Duration:</span>
                    <p className="text-slate-600">{option.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
          Transparent Pricing
        </h2>
        <p className="text-center text-slate-600 mb-16 text-lg">
          No surprises. You'll know the cost before any work begins.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-8 bg-slate-100 rounded-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Free Inspection</h3>
            <p className="text-slate-600 mb-4">
              Honestly, we want you to know if you have termites. A free inspection lets us diagnose the problem.
            </p>
            <button className="w-full px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition">
              Schedule Free Inspection
            </button>
          </div>

          <div className="p-8 bg-white border-2 border-red-600 rounded-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Treatment Cost</h3>
            <div className="mb-6">
              <p className="text-slate-600 mb-2">Sentricon® Always Active™:</p>
              <p className="text-3xl font-bold text-red-600">Free inspection</p>
              <p className="text-sm text-slate-600 mt-2">Price provided after your free WDO inspection &amp; approval.</p>
            </div>
            <p className="text-slate-600 text-sm">
              After inspection, we'll provide exact quote. No hidden fees. Satisfaction guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "How often should I have my home inspected for termites?",
                a: "Annual inspections are recommended, especially for older homes or if you've had termites before. If you're in a high-risk area or notice signs, we recommend twice yearly."
              },
              {
                q: "How long does a termite inspection take?",
                a: "Typically 30-60 minutes depending on home size and age. Crawlspaces and attics take longer because that's where termites hide."
              },
              {
                q: "Are the chemicals safe for my family and pets?",
                a: "Yes. Modern termite treatments are EPA-approved and safe when applied by licensed professionals. We only use products safe around children and pets."
              },
              {
                q: "Will I need to leave my home during treatment?",
                a: "Depends on treatment type. Barrier treatments usually require 24-48 hours of limited access. Bait systems allow you to stay. We'll explain."
              },
              {
                q: "What if I sell my house? Do I need to disclose termites?",
                a: "Yes, you must disclose termite history. Our reports help with that. If you treat and clear the problem, you're protected."
              },
              {
                q: "Can termites come back?",
                a: "Yes, if barriers/treatments aren't maintained. That's why we recommend ongoing monitoring. Most treatments last 3-5 years."
              }
            ].map((item, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full p-6 flex items-center justify-between bg-white hover:bg-slate-50 transition"
                >
                  <h3 className="text-lg font-bold text-slate-900 text-left">{item.q}</h3>
                  <ChevronDown
                    className={`w-6 h-6 text-slate-600 flex-shrink-0 transition ${
                      faqOpen === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {faqOpen === idx && (
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                    <p className="text-slate-600">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-6 bg-red-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Stop Worrying About Termites</h2>
          <p className="text-lg mb-8 text-red-50">
            Get a free professional inspection today. Early detection saves thousands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-red-50 transition">
              Schedule Free Inspection
            </button>
            <a href="tel:2059406360" className="px-8 py-4 bg-red-700 text-white font-bold rounded-lg hover:bg-red-800 transition">
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 EnviroCare Pest Control. Licensed Termite Experts.</p>
        </div>
      </footer>
    </div>
  );
}
