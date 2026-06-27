"use client";
import React, { useState } from 'react';
import { ChevronDown, MapPin, Phone, Star, Shield, Clock, Users } from 'lucide-react';

import Header from "@/components/shared/Header";
export default function MadisonLandingPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [quoteStep, setQuoteStep] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Schema.org LocalBusiness JSON-LD */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "EnviroCare Pest Control - Athens, AL",
          "image": "https://www.envirocarellc.com/logo.png",
          "description": "Professional pest control, termite treatment, and mosquito control in Athens, AL",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Athens",
            "addressRegion": "AL",
            "postalCode": "35611"
          },
          "telephone": "+12569377676",
          "url": "https://www.envirocarellc.com/athens",
          "sameAs": [
            "https://www.facebook.com/envirocare",
            "https://www.google.com/maps/place/EnviroCare+Madison"
          ],
          "priceRange": "$$"
        }
      `}</script>

      {/* HEADER / NAV */}
      <Header />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white py-20 md:py-32">
        {/* Decorative background element */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-emerald-400/20 rounded-full border border-emerald-400/30">
            <span className="text-sm font-semibold text-emerald-100">Madison, AL</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Athens Pest Control Experts
          </h1>

          <p className="text-lg md:text-xl text-emerald-50 max-w-3xl mx-auto mb-8 leading-relaxed">
            Serving Athens, Alabama with professional pest control. Licensed technicians, local knowledge, guaranteed results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setChatOpen(true)}
              className="px-8 py-4 bg-white text-emerald-900 font-bold rounded-lg hover:bg-emerald-50 transition shadow-lg"
            >
              Get Instant Quote
            </button>
            <a
              href="tel:2569377676"
              className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition"
            >
              Call (256) 937-7676
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-12 grid grid-cols-3 gap-6 text-center text-sm">
            <div>
              <div className="text-2xl mb-2">🏆</div>
              <div className="font-semibold">68+ Years</div>
              <div className="text-emerald-100 text-xs">Experience</div>
            </div>
            <div>
              <div className="text-2xl mb-2">⭐</div>
              <div className="font-semibold">★★★★★ Google Reviews</div>
              <div className="text-emerald-100 text-xs">250+ Reviews</div>
            </div>
            <div>
              <div className="text-2xl mb-2">✓</div>
              <div className="font-semibold">Licensed</div>
              <div className="text-emerald-100 text-xs">Fully Certified</div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL EXPERTISE SECTION */}
      <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why Athens Chooses EnviroCare
          </h2>
          <p className="text-lg text-slate-600">
            We understand Madison's unique pest challenges
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "🏠",
              title: "Local Expertise",
              description: "Experienced with Madison's climate, soil, and pest species. We know what works here."
            },
            {
              icon: "⚡",
              title: "Fast Scheduling",
              description: "Call in the morning, technician visits by afternoon. No week-long waits."
            },
            {
              icon: "🌱",
              title: "Low-Impact",
              description: "EPA-registered treatments. We protect your family while eliminating pests."
            },
            {
              icon: "💰",
              title: "Fair Pricing",
              description: "No surprise charges. Upfront quotes, flexible payment plans, money-back guarantee."
            },
            {
              icon: "🔒",
              title: "Warranty Coverage",
              description: "Every treatment backed by our satisfaction guarantee. Service issues? We fix it free."
            },
            {
              icon: "👥",
              title: "Background-Checked",
              description: "All technicians licensed, insured, and vetted. You're inviting professionals into your home."
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-8 border border-slate-200 rounded-lg hover:border-emerald-600 hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-16 md:py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
            Services We Offer in Madison
          </h2>
          <p className="text-center text-slate-600 mb-16 text-lg">
            Comprehensive pest control for residential and commercial properties
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Termite Inspection & Treatment",
                description: "Protect your home's foundation. We detect, treat, and prevent termite damage."
              },
              {
                name: "Mosquito Control",
                description: "Say goodbye to mosquitoes. Yard treatments that last all season."
              },
              {
                name: "Pest Control",
                description: "Ants, roaches, spiders, crickets, and more. We handle it all."
              },
              {
                name: "Crawlspace Encapsulation",
                description: "Prevent mold and pests. Moisture-barrier encapsulation for lasting protection."
              },
              {
                name: "Tick Control",
                description: "Tick control for Athens-area lawns, rural acreage, and properties bordering wooded land."
              },
              {
                name: "Commercial Pest Control",
                description: "For Athens and Limestone County businesses and restaurants. Discreet, compliant service."
              }
            ].map((service, idx) => (
              <div key={idx} className="p-8 bg-white rounded-lg border border-slate-200 hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.name}</h3>
                <p className="text-slate-600 mb-4">{service.description}</p>
                <button
                  onClick={() => setChatOpen(true)}
                  className="text-emerald-600 font-semibold hover:text-emerald-700"
                >
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING / PLANS SECTION */}
      <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
          Flexible Plans for Madison
        </h2>
        <p className="text-center text-slate-600 mb-16 text-lg">
          One-time treatments or year-round protection
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Pest Control",
              price: "From $35/mo",
              features: [
                "Bimonthly perimeter treatment",
                "30+ Alabama pests, incl. mice & rats",
                "Unlimited free re-service between visits",
                "$79 startup · no contract"
              ]
            },
            {
              name: "Pest + Mosquito",
              price: "From $69/mo",
              features: [
                "Everything in Pest Control",
                "Seasonal mosquito (March–November)",
                "Tick add-on available (+$20/visit)",
                "$99 startup · cancel anytime"
              ],
              popular: true
            },
            {
              name: "Complete",
              price: "From ~$100/mo",
              features: [
                "Everything in Pest + Mosquito",
                "Sentricon® termite — quoted at free WDO inspection",
                "Up to $1,000,000 repair coverage",
                "$229 startup · one technician, one invoice"
              ]
            }
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-lg border-2 transition ${
                plan.popular
                  ? 'border-emerald-600 bg-emerald-50 shadow-lg scale-105'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {plan.popular && (
                <div className="inline-block mb-4 px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-emerald-600 mb-6">{plan.price}</div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="text-emerald-600 font-bold mt-1">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setChatOpen(true)}
                className={`w-full py-3 rounded-lg font-bold transition ${
                  plan.popular
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF / TESTIMONIALS */}
      <section className="py-16 md:py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Trusted by Madison Families & Businesses
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                name: "Sarah M.",
                location: "Madison",
                text: "Best decision we made. No termites in 2 years. Highly recommend!",
                rating: 5
              },
              {
                name: "John D.",
                location: "Madison",
                text: "Professional, on time, and actually fixed the mosquito problem. Worth every penny.",
                rating: 5
              },
              {
                name: "Lisa T.",
                location: "Madison",
                text: "They treated our rental property. Tenants are happy, no pest complaints.",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="p-8 bg-slate-800 rounded-lg border border-slate-700">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-slate-100 mb-6">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-slate-400">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COVERAGE AREA */}
      <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
          We Serve Madison & Surrounding Areas
        </h2>
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="p-8 border border-slate-200 rounded-lg">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Madison Coverage</h3>
                <p className="text-slate-600">
                  Madison, north Madison, south Madison, downtown Madison, and all neighborhoods within Madison city limits.
                </p>
              </div>
            </div>
          </div>
          <div className="p-8 border border-slate-200 rounded-lg">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Surrounding Communities</h3>
                <p className="text-slate-600">
                  Huntsville, Hampton Cove, Harvest, Athens, Ardmore, Decatur, and Hartselle. Call for service availability outside Madison.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 md:py-24 px-6 bg-emerald-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Go Pest-Free?</h2>
          <p className="text-lg mb-8 text-emerald-50">
            Get a free estimate today. No obligation, no pressure — just honest answers about your pest problem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setChatOpen(true)}
              className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-emerald-50 transition"
            >
              Get Free Estimate
            </button>
            <a
              href="tel:2569377676"
              className="px-8 py-4 bg-emerald-700 text-white font-bold rounded-lg hover:bg-emerald-800 transition"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">EnviroCare Madison</h4>
              <p className="text-sm">Professional pest control serving Madison since 1958.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Services</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <p className="text-sm">📞 (256) 937-7676</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Follow Us</h4>
              <p className="text-sm">Facebook • Google • Yelp</p>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-sm">
            <p>&copy; 2026 EnviroCare Pest Control. Licensed Pest Control Operator. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* CHAT MODAL (Placeholder) */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full sm:w-96 max-h-96 overflow-hidden shadow-2xl">
            <div className="bg-emerald-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold">Get Free Estimate</h3>
              <button onClick={() => setChatOpen(false)} className="text-2xl leading-none">&times;</button>
            </div>
            <div className="p-6 text-slate-700">
              <p className="mb-4">What pest problem are you experiencing?</p>
              <div className="space-y-2">
                {['Termites', 'Mosquitoes', 'Ants/Roaches', 'Other'].map((option) => (
                  <button
                    key={option}
                    className="w-full text-left p-3 border border-slate-200 rounded hover:bg-emerald-50 hover:border-emerald-600 transition"
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-6">
                💡 This chatbot integrates with FieldRoutes CRM and sends leads to your team automatically.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
