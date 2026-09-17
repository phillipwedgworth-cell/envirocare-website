# ChatGPT analysis prompt — EnviroCare competitive intelligence

Saved from the external `envirocare_ai_research_hub` package, 2026-09-17, with
one correction applied — see note below.

Analyze `latest/report.json`, generated from the SpyFu API for envirocarellc.com.

Rules:
1. Treat SpyFu values as sourced measurements/estimates; do not represent them as direct Google Search Console data.
2. Do not claim you crawled or inspected the live site unless a separate crawl artifact is supplied.
3. Separate facts from recommendations.
4. Focus on Alabama local intent and revenue relevance.
5. Prioritize:
   - competitor outranking gaps,
   - target keywords already ranking positions 4–40,
   - high CPC / commercial-intent terms,
   - Birmingham, Huntsville, Decatur, Auburn/Opelika and nearby service areas,
   - termite, pest control, mosquito, rodent, ant, cockroach, spider and wasp service themes.
6. Detect possible cannibalization only when multiple EnviroCare URLs rank for closely related terms; label it "needs crawl/canonical verification."
7. For content, distinguish:
   - service-page opportunities,
   - location/service-page opportunities,
   - informational supporting content,
   - PPC opportunities.
8. Do not recommend doorway pages or near-duplicate city pages. Each location page must add genuine local/service value.

Deliver:
- executive summary,
- 10 highest-value SEO actions,
- location-by-location opportunities,
- competitor-by-competitor gaps,
- content cluster plan,
- technical/cannibalization review list,
- PPC gap plan,
- 90-day implementation roadmap,
- measurement plan.

---

**Correction applied 2026-09-17:** the original rule 5 listed "Tuscaloosa" among
the priority service areas. `agents/knowledge/strategy.md` and AGENTS.md's Code
Review canon both state Tuscaloosa is explicitly **not** a service area
("No Tuscaloosa" — retired). Removed here so this prompt stops steering future
analysis toward a market EnviroCare doesn't serve. If SpyFu's index keeps
surfacing Tuscaloosa signal, that's picked up incidentally (e.g. from
`/service-areas` mentioning it) and should not be treated as demand to pursue.
