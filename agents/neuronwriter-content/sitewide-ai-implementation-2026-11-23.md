# Sitewide AI discoverability — editorial implementation
Draft review only; do not merge, deploy, publish, contact anyone or modify GBP. This public repository is not a place for private audit exports.

## P0: correct entity and offers
- Use approved public brand name EnviroCare Pest Services; consistent stable Organization @id and distinct legitimate location @ids, linked by parentOrganization/provider. Verify physical location status and hours before adding them; do not present a virtual office as staffed. Use canonical www.envirocarellc.com URLs; sameAs only for verified owned profiles.
- Review /, /services, /pricing, /services/pest-control, /services/mosquito for Offer objects lacking price or currency. If a price cannot be verified, omit incomplete Offer rather than invent it. Differentiate introductory promotional price, standard initial price, recurring ACH monthly billing, and per-visit charge; name each clearly and use USD and appropriate billing period. Do not conflate visit frequency and billing frequency.
- Verify all pricing against current owner-approved schedule and rendered pages before changing it. Do not assume old bundle prices or promotions remain current.
- Apply schema.org properties only where valid; use visible coverage terms, do not add retail return policy to a service as a workaround. Do not imply guaranteed results.
- Preserve indexability and server-rendered content; customer login does not belong in public sitemap. Do not alter robots policy without reason.

## P0: termite and builder content
Target existing /services/sentricon and /builders routes. Improve contextual internal links from /, /services, /pricing, city pages, relevant termite articles and about page. Avoid duplicate intent. Confirm canonical URL and index status in Search Console; request indexing after approved release, not before.

Proposed Sentricon opening:
EnviroCare Pest Services provides termite inspections and Sentricon bait-station protection for Alabama homes. The system uses stations around the property. Ask about inspection findings, monitoring, renewal terms and eligibility for up to $1,000,000 in EnviroCare damage repair coverage, subject to inspection and approval and subject to the terms of the agreement.
Questions to answer with verified facts: What happens during a termite inspection? How do bait stations work? What does the agreement cover and exclude? What happens when activity is found? How does renewal work? When should a homeowner request a WDO letter?
Never attribute repair coverage to Sentricon; do not imply universal coverage, liquid barrier treatments, or offer unsupported safety claims.

Proposed builder opening:
EnviroCare Pest Services works with Alabama builders to coordinate termite protection with construction schedules. Ask which treatment method is appropriate for your project, what documentation is provided, and how the homeowner's termite agreement is established.
Confirm actual preconstruction methods (bait stations versus soil treatment), scheduling, documentation and applicable Alabama requirements before drafting detailed claims. No invented deadlines or prices.

## P1: brand identity
On /about-us and /services, explicitly identify Alabama company, verified family history dating to 1958, actual markets and services. Link to location pages and genuine external references. Distinguish similarly named companies using geography and canonical website, not competitor attacks or unnecessary external links. Avoid fictitious testimonials, ratings, superlatives and unavailable services.

## P1: Alabaster draft addendum (supersedes conflicting wording in earlier handoff)
Use full approved brand name on first mention. Replace all draft 'warranty' wording with 'repair coverage' or 'agreement terms'. Do not use urgency claims or phone numbers in generated body copy. Use only owner-approved treatment language; never assert treatment safety. If applicable, use approved exact label-directed product statement. Do not add landlord legal FAQ merely to satisfy scoring; if included, source Alabama law and make it informational. Use landing page brief and keep existing canonical. Preserve existing strong title/snippet unless a measured reason to change exists.

## P2: measurement
Record baseline then compare 28/90-day Search Console query/page impressions, clicks, CTR, position and conversion events. Use branded prompts with Alabama context and unbranded location/service prompts separately. Record citation source, service accuracy and competitor mentions; small samples are directional only. Check archive discovery without treating Common Crawl as proof of training. Re-run domain audit after approved fixes and sufficient crawl time. Re-score actual NeuronWriter drafts; never invent a resulting score.
