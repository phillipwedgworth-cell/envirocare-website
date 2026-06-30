// middleware.ts
//
// WHY THIS EXISTS:
// The old Scorpion blog lived at /blog/<year>/<month>/<slug>. None of those ~80
// posts (~70k GSC impressions) exist at the same URL on the new site, so every
// one 404s and Google drops the impressions. This middleware 301-redirects each
// legacy URL to the BEST-MATCHING live page — by keyword in the slug. Where a real
// new blog post exists for the topic (spiders, termites, roaches, ants, mosquitoes,
// silverfish, crickets, centipedes, ticks) it points there (blog→blog, best intent
// match). Year/month archives and anything unmatched go to the blog index. New posts
// at /blog/<slug> (a single segment, no year) are untouched.
//
// This is the SINGLE owner of legacy blog URLs: it replaces the old
// next.config.ts `/blog/{2022..2026}/:path* → /blog` blanket redirects (removed),
// so the request can't be shadowed by a config redirect before reaching here.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Order matters: first match wins, so more specific patterns come first
// (e.g. "recluse" before generic "spider"). Every destination is a confirmed
// live route — every destination blog slug exists in data/blog-posts.ts.
const TOPIC_MAP: [RegExp, string][] = [
  [/recluse/, "/blog/brown-recluse-spiders-alabama"],
  [/termite/, "/blog/how-to-identify-termites-alabama"],
  [/cockroach|roach/, "/blog/cockroach-control-alabama"],
  [/spider/, "/blog/spider-control-alabama"],
  [/tick/, "/blog/tick-control-alabama"],
  [/mosquito/, "/blog/mosquito-season-birmingham-al"],
  [/silverfish/, "/blog/silverfish-control-alabama"],
  [/cricket/, "/blog/cricket-control-alabama"],
  [/centipede|millipede/, "/blog/centipede-millipede-control-alabama"],
  [/\bants?\b|ant-/, "/blog/ant-control-alabama"],
];

// Specific legacy posts that have been REPUBLISHED as their own article get an
// exact-slug override (checked before the topic buckets above), so the old URL
// recovers its impressions against the matching article instead of a category
// page. Add a line here each time a blog-recovery post ships.
const POST_OVERRIDES: [RegExp, string][] = [
  [/keeping-the-wolf-spiders/, "/blog/wolf-spiders-birmingham"],
  [/common-winter-pest-problems/, "/blog/winter-pests-alabama"],
  [/diy-pest-control-mistakes/, "/blog/diy-pest-control-mistakes"],
  [/complete-guide-to-eff|property-owners-complete-guide/, "/blog/pest-control-birmingham-guide"],
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only legacy Scorpion blog URLs begin with /blog/<4-digit year>. New posts
  // (/blog/<slug>, no year) pass straight through untouched.
  if (!/^\/blog\/\d{4}(\/|$)/.test(pathname)) return NextResponse.next();

  // A full post URL is /blog/<year>/<month>/<slug...>; match its slug to a topic.
  // Year/month archives (and unmatched posts) fall back to the blog index.
  let dest = "/blog";
  const post = pathname.match(/^\/blog\/\d{4}\/[^/]+\/(.+?)\/?$/);
  if (post) {
    const slug = post[1].toLowerCase();
    // Exact republished-post override wins over the topic bucket.
    const override = POST_OVERRIDES.find(([re]) => re.test(slug));
    if (override) {
      dest = override[1];
    } else {
      for (const [re, d] of TOPIC_MAP) {
        if (re.test(slug)) {
          dest = d;
          break;
        }
      }
    }
  }

  const url = req.nextUrl.clone();
  url.pathname = dest;
  url.search = "";
  return NextResponse.redirect(url, 301);
}

// Scope to /blog only — the middleware never runs on any other route.
export const config = {
  matcher: ["/blog/:path*"],
};
