# EnviroCare Master Analysis Prompt

Saved from the external `envirocare_ai_research_hub` package, 2026-09-18.
No correction needed — no Tuscaloosa or other retired-scope reference, good
source-separation discipline built in already.

Analyze `latest/master_report.json`.

Use SpyFu for competitor/search-market intelligence and first-party sources for actual performance.
Never add SpyFu estimated clicks to GSC clicks. Do not double-count GA4 and CRM revenue. Do not claim a
live-site crawl unless one is supplied. Label cannibalization/duplicate-page ideas as hypotheses until
a crawl verifies canonicals/redirects.

Prioritize real business outcomes first: booked jobs, CRM revenue, qualified calls and conversions.
Then use GSC impressions/clicks and SpyFu rank gaps/CPC/search demand to decide what to improve next.

Deliver:
1. Executive summary
2. Revenue-producing pages
3. High-impression / low-click GSC opportunities
4. Competitor gaps validated by first-party demand
5. Location-by-location plan
6. Service-line plan: pest, termite, mosquito, rodents, ants, roaches, spiders, wasps/hornets
7. Content clusters supporting commercial pages
8. PPC opportunities where organic visibility is weak
9. Technical/cannibalization verification queue
10. Pages to improve, consolidate, preserve or deprioritize
11. 30/60/90-day roadmap
12. Measurement plan
13. "What to do this week" — maximum 10 actions

For each major recommendation, identify the supporting source/field.

---

**Not yet wired to anything.** This supersedes the earlier `spyfu-*-prompt.md`
pair — it's the same package, evolved to combine SpyFu with first-party data
(`refresh_all.py` / `master_report.json` per `FIRST_PARTY_DATA_GUIDE.md`,
saved alongside this file). Still missing: the actual Python code, and this
version needs more than SpyFu credentials — see that file's note on what
else is required before this can run.
