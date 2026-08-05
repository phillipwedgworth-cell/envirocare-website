// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website
// Path: next.config.ts
// Commit: fix(seo): correct 4 legacy 301 targets from Scorpion URL-inventory audit
// Push: main

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
          ignoreBuildErrors: true,
    },
    images: {
          remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'envirocarellc.com' },
                ],
    },
    // ──────────────────────────────────────────────────────────────────────
    // 301 REDIRECTS — preserves SEO equity from the legacy Scorpion site
    // (247 clicks/mo, 35.8K impressions/mo) when DNS flips to this site.
    // Every destination below was validated against pages that exist in this
    // repo as of 2026-05-27. Migrated/corrected from the old envirocare-web map.
    // ──────────────────────────────────────────────────────────────────────
    async redirects() {
          return [
            // ─── HOST-LEVEL: enforce canonical https://www.envirocarellc.com ─
            // NOTE: the CURRENT live host (envirocare-web.vercel.app) is intentionally
            // NOT redirected — www does not resolve until the DNS flip, so redirecting
            // the live host pre-flip would take the site down. Apex + the stray alias
            // are safe: apex serves the old site until flip, the alias is unused.
            {
                      source: '/:path*',
                      has: [{ type: 'host', value: 'envirocarellc.com' }],
                      destination: 'https://www.envirocarellc.com/:path*',
                      permanent: true,
            },
            {
                      source: '/:path*',
                      has: [{ type: 'host', value: 'envirocare-website.vercel.app' }],
                      destination: 'https://www.envirocarellc.com/:path*',
                      permanent: true,
            },
            {
                      source: '/:path*',
                      has: [{ type: 'host', value: 'envirocarepestservices.com' }],
                      destination: 'https://www.envirocarellc.com/:path*',
                      permanent: true,
            },
            {
                      source: '/:path*',
                      has: [{ type: 'host', value: 'www.envirocarepestservices.com' }],
                      destination: 'https://www.envirocarellc.com/:path*',
                      permanent: true,
            },

            // ─── SHORT SERVICE ALIASES (existing) ───────────────────────────
            // NOTE: /pricing is a REAL page now (app/pricing/*) — do NOT redirect it.
            { source: '/why-envirocare', destination: '/about-us', permanent: true },
            { source: '/contact', destination: '/contact-us', permanent: true },
            // GBP appointment link on the Alex City profile still points at the
            // old Scorpion-era /contact.php (found in BrightLocal Jul 12) — 301
            // it so the live listing link works until the profile is updated.
            { source: '/contact.php', destination: '/contact-us', permanent: true },
            { source: '/services/termite', destination: '/services/termite-control', permanent: true },
            // Crawlspace encapsulation is NOT a service EnviroCare offers — see the
            // SERVICES WE DO NOT OFFER block in agents/lib/compliance.mjs. Killed
            // Jun 13 2026 in the compliance scrub; Phillip DECIDED Jun 26 2026 that
            // it stays killed permanently. This is settled, not pending: do not
            // revive /services/crawlspace or re-apply the next-steps branch copy.
            { source: '/services/crawlspace', destination: '/services/termite-control', permanent: true },
            { source: '/services/mosquito-control', destination: '/services/mosquito', permanent: true },  // canonical moved to /services/mosquito Jun 25 (only /services/mosquito page exists)
            { source: '/services/pest', destination: '/services/pest-control', permanent: true },
            { source: '/services/rodent', destination: '/services/pest-control', permanent: true },
            { source: '/termite', destination: '/services/termite-control', permanent: true },
            { source: '/mosquito', destination: '/services/mosquito', permanent: true },
            { source: '/pest-control', destination: '/services/pest-control', permanent: true },
            { source: '/sentricon', destination: '/services/sentricon', permanent: true },
            { source: '/madison', destination: '/service-areas/madison', permanent: true },  // /madison had no top-level route; consolidate to the maintained service-area page (avoids duplicate content)
            { source: '/pay', destination: 'https://payenvirocare.key7app.com', permanent: false },

            // ─── SCORPION CITY URLS → city pages (Birmingham region) ─────────
            { source: '/where-we-service/birmingham-al-pest-control', destination: '/birmingham', permanent: true },
            { source: '/where-we-service/alabaster-al-pest-control', destination: '/alabaster', permanent: true },
            { source: '/where-we-service/hoover-al-pest-control', destination: '/hoover', permanent: true },
            { source: '/where-we-service/vestavia-hills-al-pest-control', destination: '/vestavia-hills', permanent: true },
            { source: '/where-we-service/mountain-brook-al-pest-control', destination: '/mountain-brook', permanent: true },
            { source: '/where-we-service/chelsea-al-pest-control', destination: '/chelsea', permanent: true },
            { source: '/where-we-service/pelham-al-pest-control', destination: '/pelham', permanent: true },
            { source: '/where-we-service/homewood-al-pest-control', destination: '/homewood', permanent: true },
            { source: '/where-we-service/helena-al-pest-control', destination: '/helena', permanent: true },
            { source: '/where-we-service/calera-al-pest-control', destination: '/calera', permanent: true },
            { source: '/where-we-service/mt-laurel-al-pest-control', destination: '/mt-laurel', permanent: true },
            // Gardendale now has its own dedicated page (Jun 25, 2026)
            { source: '/where-we-service/gardendale-al-pest-control', destination: '/gardendale', permanent: true },
            // Fultondale / Leeds / Moody have dedicated pages (Jul 11, 2026 metro rebuild)
            { source: '/where-we-service/fultondale-al-pest-control', destination: '/fultondale', permanent: true },
            { source: '/where-we-service/leeds-al-pest-control', destination: '/leeds', permanent: true },
            { source: '/where-we-service/moody-al-pest-control', destination: '/moody', permanent: true },
            // Old static service-area page superseded by the full city page
            { source: '/service-areas/fultondale', destination: '/fultondale', permanent: true },
            // ─── /service-areas/[city] duplicates retired (2026-07-11 cleanup) ──
            // The dynamic route duplicated 7 flat city pages with stale office
            // addresses and drifted copy. Route deleted; each URL 301s to the
            // canonical flat page. /service-areas/madison and /redstone-arsenal
            // remain real static pages (no flat equivalents).
            { source: '/service-areas/birmingham', destination: '/birmingham', permanent: true },
            { source: '/service-areas/hoover', destination: '/hoover', permanent: true },
            { source: '/service-areas/vestavia-hills', destination: '/vestavia-hills', permanent: true },
            { source: '/service-areas/mountain-brook', destination: '/mountain-brook', permanent: true },
            { source: '/service-areas/huntsville', destination: '/huntsville', permanent: true },
            { source: '/service-areas/auburn', destination: '/auburn', permanent: true },
            { source: '/service-areas/lake-martin', destination: '/lake-martin', permanent: true },
            { source: '/where-we-service/pest-control-in-trussville-al', destination: '/trussville', permanent: true },
            { source: '/where-we-service/wilsonville-al-pest-control', destination: '/birmingham', permanent: true },
            { source: '/where-we-service/indian-springs-al-pest-control', destination: '/indian-springs', permanent: true },
            { source: '/where-we-service/oak-mountain-al-pest-control', destination: '/birmingham', permanent: true },
            { source: '/where-we-service/highland-lake-al-pest-control', destination: '/birmingham', permanent: true },

            // ─── SCORPION CITY URLS (Lake Martin / Alex City region) ─────────
            { source: '/where-we-service/alexander-city-al-pest-control', destination: '/alexander-city', permanent: true },
            { source: '/where-we-service/lake-martin-al-pest-control', destination: '/lake-martin', permanent: true },
            { source: '/where-we-service/auburn-al-pest-control', destination: '/auburn', permanent: true },
            { source: '/where-we-service/opelika-al-pest-control', destination: '/opelika', permanent: true },

            // ─── SCORPION CITY URLS (Huntsville region) ─────────────────────
            { source: '/where-we-service/huntsville-al-pest-control', destination: '/huntsville', permanent: true },
            { source: '/where-we-service/madison-al-pest-control', destination: '/service-areas/madison', permanent: true },
            { source: '/where-we-service/athens-al-pest-control', destination: '/athens', permanent: true },
            { source: '/where-we-service/decatur-al-pest-control', destination: '/decatur', permanent: true },
            { source: '/where-we-service/harvest-al-pest-control', destination: '/harvest', permanent: true },

            // Tuscaloosa — NOT serviced (confirmed Jun 14).
            // Legacy Scorpion URL keeps its redirect to capture residual impressions, but it
            // must land on the service-area INDEX, never a city page — pointing it at
            // /birmingham implied we serve Tuscaloosa. /service-areas is the real index page
            // (app/service-areas/page.tsx); /where-we-service only 301s to home, so targeting
            // that would chain 301->301.
            { source: '/where-we-service/tuscaloosa-al-pest-control', destination: '/service-areas', permanent: true },
            // Service-area hub
            { source: '/where-we-service', destination: '/', permanent: true },

            // ─── SERVICE PAGES ──────────────────────────────────────────────
            { source: '/termite-control', destination: '/services/termite-control', permanent: true },
            { source: '/home-pest-control', destination: '/services/pest-control', permanent: true },
            { source: '/commercial-pest-control', destination: '/services/commercial', permanent: true },
            { source: '/mosquito-and-tick-control', destination: '/services/mosquito', permanent: true },
            { source: '/fire-ant-control', destination: '/services/fire-ant', permanent: true },
            // Legacy /flea-control had no redirect (gap found 2026-07-12 via URL-inventory audit) → real /services/flea page
            { source: '/flea-control', destination: '/services/flea', permanent: true },

            // ─── RODENT (no dedicated page → pest-control) ──────────────────
            { source: '/rodent-control', destination: '/services/pest-control', permanent: true },
            { source: '/rodent-control/rat-control', destination: '/services/pest-control', permanent: true },
            { source: '/rodent-control/squirrel-control', destination: '/services/pest-control', permanent: true },

            // ─── SERVICES NOT OFFERED → clean redirects ─────────────────────
            { source: '/bed-bug-control', destination: '/services/pest-control', permanent: true },
            { source: '/raccoon-control', destination: '/services/pest-control', permanent: true },
            { source: '/fly-control', destination: '/services/pest-control', permanent: true },
            { source: '/earwig-control', destination: '/services/pest-control', permanent: true },
            { source: '/bee-wasp-control', destination: '/services/pest-control', permanent: true },

            // ─── PEST LIBRARY ───────────────────────────────────────────────
            // REBUILT 2026-06-27 as real content pages at the SAME legacy URLs
            // (app/pest-library + app/pest-library/[pest], data/pest-library.ts) —
            // recovers the SEO the old Scorpion pest library ranked for. No longer
            // redirected to service pages. /pest-library/mosquitoes & /ticks now have
            // their own profiles (each links out to the relevant service).

            // ─── CORE / MISC ────────────────────────────────────────────────
            // NOTE: /faq is a REAL page now — intentionally NOT redirected.
            // /faqs (plural) was a live 404 — GSC-confirmed legacy URL (2026-07-26).
            { source: '/faqs', destination: '/faq', permanent: true },
            { source: '/site-map', destination: '/', permanent: true },
            { source: '/site-search', destination: '/', permanent: true },   // legacy Scorpion search page → home (gap found 2026-07-12)
            { source: '/common', destination: '/', permanent: true },        // legacy crawl artifact → home (retire the 404)
            { source: '/accessibility-statement', destination: '/', permanent: true },
            { source: '/photo-gallery/:slug*', destination: '/', permanent: true },

            // ─── NAV / FOOTER BROKEN-LINK FIXES (2026-06-09) ───────────────
            // Fixes the 6 broken hrefs found by the June 8 crawl that were not
            // already covered above. /pricing and /why-envirocare already exist;
            // /faq has a real page and is intentionally NOT redirected.
            // UN-SHADOWED per SHADOWED-PAGES-RECOMMENDATION.md: /services (real services
            // overview page, ServicesIndexPage — like Orkin/Terminix/Waynes) and /realtor
            // (B2B referral page, app/realtor) are now live, reachable pages — not redirected.
            // FIXED 2026-06-10: was '/services/commercial' → '/commercial' (a 404 —
            // the real page lives AT /services/commercial; the old rule shadowed it).
            { source: '/commercial', destination: '/services/commercial', permanent: true },
            { source: '/services/fire-ant-control', destination: '/services/fire-ant', permanent: true },
            { source: '/services/rodent-control', destination: '/services/pest-control', permanent: true },
            { source: '/services/real-estate-wdo', destination: '/services/wdo-letters', permanent: true },

            // ─── BUILDER CONSOLIDATION (2026-07-24) ─────────────────────────
            // Three pages were splitting the builder / pre-construction keyword
            // (/builders, /services/builder, /services/builder-pre-treat).
            // /builders is now the one canonical page; the other two 301 here.
            // Route dirs app/services/builder and app/services/builder-pre-treat
            // must be DELETED in the same commit (config redirects win over
            // filesystem routes, but dead routes still build).
            { source: '/services/builder', destination: '/builders', permanent: true },
            { source: '/services/builder-pre-treat', destination: '/builders', permanent: true },
            // NeuronWriter target keyword URL — capture direct hits
            { source: '/pre-construction-pest-treatment', destination: '/builders', permanent: true },
            { source: '/pre-construction-termite-treatment', destination: '/builders', permanent: true },

            // ─── BLOG: legacy Scorpion /blog/{year}/{month}/{slug} URLs ─────
            // Now owned by middleware.ts, which 301s each legacy post to the
            // best-matching live blog post by topic (recovering impressions) and
            // sends year/month archives to /blog. Replaces the old blanket
            // /blog/{2022..2026}/:path* → /blog redirects (a config redirect could
            // otherwise shadow the middleware before it runs).

            // ─── SCORPION SUB-CITY SERVICE PAGES ────────────────────────────
            { source: '/where-we-service/birmingham-al-pest-control/insect-control', destination: '/services/pest-control', permanent: true },
            { source: '/where-we-service/birmingham-al-pest-control/mouse-control', destination: '/services/pest-control', permanent: true },

            // ─── CITY PAGES MIGRATED TO /service-areas/* ────────────────────
            // (/madison is declared once, higher up in this list — a second rule here
            // was dead config, since Next matches the first source that hits.)

            // NOTE: /reviews is a REAL page now (app/reviews/page.tsx) — do NOT redirect it.
            // NOTE: /special-offers is a REAL, reachable landing page (un-shadowed per
            // SHADOWED-PAGES-RECOMMENDATION.md) — its own claim-offer modal + phone CTAs,
            // ranks/converts on its own URL — so it is intentionally NOT redirected.
            // /bundle-services stays redirected to /quote (overlaps the estimator flow).
            { source: '/bundle-services', destination: '/quote', permanent: true },
            // ─── LAUNCH redirect-gap fixes (2026-06-26) — DO NOT DROP ───────
            { source: '/mosquito-control', destination: '/services/mosquito', permanent: true },
            { source: '/privacy-policy', destination: '/privacy', permanent: true },
            { source: '/request-appointment', destination: '/quote', permanent: true },
            { source: '/coupons', destination: '/quote', permanent: true },
            { source: '/coupons/:path*', destination: '/quote', permanent: true },

            // ─── LEGACY ASSET 404 CATCH (post-flip cleanup) ───
            // The old Scorpion site served assets under /images/* and /cms/*.
            // This repo hosts nothing at those paths (no public/images or
            // public/cms dir, and no /images//cms references in code), so a
            // blanket 308 to home retires the legacy 404s without intercepting
            // any real asset. Revisit if a real /images or /cms route is added.
            { source: '/images/:path*', destination: '/', permanent: true },
            { source: '/cms/:path*', destination: '/', permanent: true },
                ];
    },
};

export default nextConfig;
