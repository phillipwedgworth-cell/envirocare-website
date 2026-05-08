# EnviroCare Website — Next Steps

Updated: 2026-05-05

This is your running checklist. When something is done, delete the line.

---

## 1. How to ship changes

From `C:\Users\pwedg\Desktop\Envirocare Stuf\envirocare-web`:

```
git add .
git commit -m "describe what changed"
git push
```

Vercel auto-deploys in about 2 minutes after a push. See `DEPLOY.md` for click-by-click in GitHub Desktop.

---

## 2. Things only you can do (need real info / accounts)

### Payment portal — when ready
When you get the URL from your billing vendor, open:

`components/shared/Header.tsx`

At the top, change this one line:

```
export const PAYMENT_PORTAL_URL = "/pay";
```

Set it to e.g. `"https://pay.envirocarellc.com"` — every "Pay Bill" link on every page updates.

The stub page at `/pay` (`app/pay/page.tsx`) can stay or be deleted once the real portal is live.

### Email
There is currently NO contact email shown anywhere on the site. Decide on:
- A real address you'll watch (e.g. `info@envirocarellc.com`, `office@envirocarellc.com`)
- Or just stay phone-only

Once you have an email, it should go in the footer and contact page.

### Google Search Console
1. Go to https://search.google.com/search-console
2. Add property: `https://envirocarellc.com`
3. Verify ownership (Vercel makes this easy via DNS or HTML file)
4. Submit sitemap: `https://envirocarellc.com/sitemap.xml`

Without this, Google takes weeks to find new pages instead of hours.

### Google Business Profile
Verify all 3 offices and make sure Phone + Address + Hours match exactly what's in `app/layout.tsx` schema:
- Birmingham: 2025 Butler Rd, Alabaster, AL 35007 · (205) 940-6360
- Lake Martin: 1785 Tallapoosa St, Alexander City, AL 35010 · (256) 234-6162
- Huntsville: 7027 Old Madison Pike Suite 108, Huntsville, AL 35806 · (256) 937-7676

Mismatches between site schema and GBP hurt local SEO.

### Real review count
Homepage schema and stats currently say `500+ reviews`. If your actual Google count is different, fix it in:
- `app/layout.tsx` (the `aggregateRating.reviewCount`)
- `components/pages/Homepage.tsx` (search for "500" — appears in stats and glass card)

Google flags inflated counts.

### Auburn page phone
Currently routes through Lake Martin number on `/auburn`. Auburn has its own routing line `(334) 332-3321`. Update `components/pages/Auburn.tsx` if you want Auburn calls dialed direct.

---

## 3. Quick wins for after launch (in priority order)

### A. Test it in real life
- Open the deployed site on your phone, tap the hamburger, walk through every link
- Open https://pagespeed.web.dev/ and run the homepage URL — target 90+ on Performance
- Open in Chrome desktop, right-click → Inspect → toggle device toolbar → check at iPhone / iPad / desktop sizes

### B. Real photography
The truck photo in the hero is fine but a real on-location shot beats it:
- Truck on a Southern porch, technician in EnviroCare polo
- Family on a lawn (no stock vibe)
- Kevin on-site (not just a headshot)

Drop new JPGs into `public/` — keep filenames the same to avoid changing code (`truck.jpg`, `kevin-headshot.jpg`).

Run them through https://squoosh.app first to compress (or call me to do it).

### C. Shared footer (same as we did with header)
City pages still have copy-pasted footers with broken `#` links. Should become a `<Footer />` component like the header. ~30 minutes of work.

### D. Analytics
Add Google Analytics 4 + Microsoft Clarity (both free):
1. Get GA4 measurement ID from https://analytics.google.com/
2. Get Clarity tag from https://clarity.microsoft.com/
3. Drop both into `app/layout.tsx` as `<script>` tags

You'll see what visitors actually click and how far they scroll.

### E. Blog
Best long-term play to beat Waynes in local SEO. Topics:
- "When do termites swarm in Alabama?"
- "Fire ant season in Lake Martin: April–October"
- "Mosquito control around Lake Martin homes"
- "Birmingham termite inspection checklist"

One post a month, 800–1500 words each, with internal links to your service pages. Google rewards local relevance.

### F. 404 page
Default Next.js 404 is ugly. Custom one with logo + "Call us" CTA = 10 min of work.

### G. OpenGraph social-share image
When you paste a link in iMessage, Facebook, etc., the preview is just the logo right now. A 1200×630 image with truck + tagline + "Since 1958" makes shares look professional.

---

## 4. Important file locations

| What | Where |
|---|---|
| Site-wide header (logo, nav, hamburger) | `components/shared/Header.tsx` |
| Homepage hero & sections | `components/pages/Homepage.tsx` |
| Site-wide schema markup (Org + 3 LocalBusiness) | `app/layout.tsx` |
| Sitemap (URLs Google sees) | `app/sitemap.ts` |
| Robots rules | `app/robots.ts` |
| Per-route metadata (title, description) | `app/{route}/page.tsx` |
| Compressed image originals (in case you need them) | `public_originals/` |
| Live images (compressed, what visitors see) | `public/` |

---

## 5. What NOT to touch unless you know what you're doing

- `node_modules/` — auto-generated, don't edit
- `.next/` — build output, don't commit (gitignored)
- `package-lock.json` — auto-managed
- `next.config.ts` — has `ignoreBuildErrors: true` which silences TypeScript errors. Eventually fix the underlying errors and remove that flag.
- The big SVG paths in `public/logo.svg` — that's the logo, leave it alone

---

## 6. If something breaks

1. Don't push the broken commit
2. Run `npm run build` locally — if it errors, fix before pushing
3. If you already pushed and it's broken in production: `git revert HEAD && git push` rolls it back
4. Vercel keeps deployment history — you can also "Promote to Production" any earlier deploy from the Vercel dashboard
