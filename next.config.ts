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
            // ─── HOST-LEVEL: old domain → canonical domain ──────────────────
            {
                      source: '/:path*',
                      has: [{ type: 'host', value: 'envirocarepestservices.com' }],
                      destination: 'https://envirocarellc.com/:path*',
                      permanent: true,
            },
            {
                      source: '/:path*',
                      has: [{ type: 'host', value: 'www.envirocarepestservices.com' }],
                      destination: 'https://envirocarellc.com/:path*',
                      permanent: true,
            },

            // ─── SHORT SERVICE ALIASES (existing) ───────────────────────────
            { source: '/pricing', destination: '/quote', permanent: true },
            { source: '/why-envirocare', destination: '/about-us', permanent: true },
            { source: '/contact', destination: '/contact-us', permanent: true },
            { source: '/services/termite', destination: '/services/termite-control', permanent: true },
            { source: '/services/mosquito', destination: '/services/mosquito-control', permanent: true },
            { source: '/services/pest', destination: '/services/pest-control', permanent: true },
            { source: '/services/rodent', destination: '/services/pest-control', permanent: true },
            { source: '/termite', destination: '/services/termite-control', permanent: true },
            { source: '/mosquito', destination: '/services/mosquito-control', permanent: true },
            { source: '/pest-control', destination: '/services/pest-control', permanent: true },
            { source: '/sentricon', destination: '/services/sentricon', permanent: true },
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
            // Birmingham metro outliers without their own page → /birmingham hub
            { source: '/where-we-service/gardendale-al-pest-control', destination: '/birmingham', permanent: true },
            { source: '/where-we-service/fultondale-al-pest-control', destination: '/birmingham', permanent: true },
            { source: '/where-we-service/leeds-al-pest-control', destination: '/birmingham', permanent: true },
            { source: '/where-we-service/moody-al-pest-control', destination: '/birmingham', permanent: true },
            { source: '/where-we-service/pest-control-in-trussville-al', destination: '/trussville', permanent: true },
            { source: '/where-we-service/wilsonville-al-pest-control', destination: '/birmingham', permanent: true },
            { source: '/where-we-service/indian-springs-al-pest-control', destination: '/birmingham', permanent: true },
            { source: '/where-we-service/oak-mountain-al-pest-control', destination: '/birmingham', permanent: true },
            { source: '/where-we-service/highland-lake-al-pest-control', destination: '/birmingham', permanent: true },

            // ─── SCORPION CITY URLS (Lake Martin / Alex City region) ─────────
            { source: '/where-we-service/alexander-city-al-pest-control', destination: '/alexander-city', permanent: true },
            { source: '/where-we-service/lake-martin-al-pest-control', destination: '/lake-martin', permanent: true },
            { source: '/where-we-service/auburn-al-pest-control', destination: '/auburn', permanent: true },
            { source: '/where-we-service/opelika-al-pest-control', destination: '/opelika', permanent: true },

            // ─── SCORPION CITY URLS (Huntsville region) ─────────────────────
            { source: '/where-we-service/huntsville-al-pest-control', destination: '/huntsville', permanent: true },
            { source: '/where-we-service/madison-al-pest-control', destination: '/madison', permanent: true },
            { source: '/where-we-service/athens-al-pest-control', destination: '/athens', permanent: true },
            { source: '/where-we-service/decatur-al-pest-control', destination: '/decatur', permanent: true },
            { source: '/where-we-service/harvest-al-pest-control', destination: '/harvest', permanent: true },

            // Tuscaloosa — page exists; CONFIRM you actually service it
            { source: '/where-we-service/tuscaloosa-al-pest-control', destination: '/tuscaloosa', permanent: true },
            // Service-area hub
            { source: '/where-we-service', destination: '/', permanent: true },

            // ─── SERVICE PAGES ──────────────────────────────────────────────
            { source: '/termite-control', destination: '/services/termite-control', permanent: true },
            { source: '/home-pest-control', destination: '/services/pest-control', permanent: true },
            { source: '/commercial-pest-control', destination: '/services/commercial', permanent: true },
            { source: '/mosquito-and-tick-control', destination: '/services/mosquito-control', permanent: true },
            { source: '/fire-ant-control', destination: '/services/fire-ant', permanent: true },

            // ─── RODENT (no dedicated page → pest-control) ──────────────────
            { source: '/rodent-control', destination: '/services/pest-control', permanent: true },
            { source: '/rodent-control/rat-control', destination: '/services/pest-control', permanent: true },
            { source: '/rodent-control/squirrel-control', destination: '/', permanent: true },

            // ─── SERVICES NOT OFFERED → clean redirects ─────────────────────
            { source: '/bed-bug-control', destination: '/', permanent: true },
            { source: '/raccoon-control', destination: '/', permanent: true },
            { source: '/fly-control', destination: '/services/pest-control', permanent: true },
            { source: '/earwig-control', destination: '/services/pest-control', permanent: true },
            { source: '/bee-wasp-control', destination: '/services/pest-control', permanent: true },

            // ─── PEST LIBRARY → relevant service pages ──────────────────────
            { source: '/pest-library', destination: '/services/pest-control', permanent: true },
            { source: '/pest-library/ants', destination: '/services/pest-control', permanent: true },
            { source: '/pest-library/centipedes', destination: '/services/pest-control', permanent: true },
            { source: '/pest-library/cockroaches', destination: '/services/pest-control', permanent: true },
            { source: '/pest-library/crickets', destination: '/services/pest-control', permanent: true },
            { source: '/pest-library/millipedes', destination: '/services/pest-control', permanent: true },
            { source: '/pest-library/mosquitoes', destination: '/services/mosquito-control', permanent: true },
            { source: '/pest-library/pill-bugs', destination: '/services/pest-control', permanent: true },
            { source: '/pest-library/silverfish', destination: '/services/pest-control', permanent: true },
            { source: '/pest-library/sow-bugs', destination: '/services/pest-control', permanent: true },
            { source: '/pest-library/spiders', destination: '/services/pest-control', permanent: true },
            { source: '/pest-library/termites', destination: '/services/termite-control', permanent: true },
            { source: '/pest-library/ticks', destination: '/services/mosquito-control', permanent: true },

            // ─── CORE / MISC ────────────────────────────────────────────────
            // NOTE: /faq is a REAL page now — intentionally NOT redirected.
            { source: '/site-map', destination: '/', permanent: true },
            { source: '/accessibility-statement', destination: '/', permanent: true },
            { source: '/photo-gallery/:slug*', destination: '/', permanent: true },

            // ─── NAV / FOOTER BROKEN-LINK FIXES (2026-06-09) ───────────────
            // Fixes the 6 broken hrefs found by the June 8 crawl that were not
            // already covered above. /pricing and /why-envirocare already exist;
            // /faq has a real page and is intentionally NOT redirected.
            { source: '/services', destination: '/services/pest-control', permanent: true },
            { source: '/realtor', destination: '/services/wdo-letters', permanent: true },
            { source: '/services/commercial', destination: '/commercial', permanent: true },
            { source: '/services/fire-ant-control', destination: '/services/fire-ant', permanent: true },
            { source: '/services/rodent-control', destination: '/services/pest-control', permanent: true },
            { source: '/services/real-estate-wdo', destination: '/services/wdo-letters', permanent: true },
                ];
    },
};

export default nextConfig;
