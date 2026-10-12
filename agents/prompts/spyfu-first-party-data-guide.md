# First-party data guide

Saved from the external `envirocare_ai_research_hub` package, 2026-09-18.

Add exports to `inputs/` using these exact columns:

- `gsc.csv`: `query,page,clicks,impressions,ctr,position`
- `ga4.csv`: `landing_page,sessions,engaged_sessions,conversions,revenue`
- `calls.csv`: `landing_page,source,calls,qualified_calls,booked_calls`
- `crm.csv`: `landing_page,source,leads,booked_jobs,revenue`
- `gbp.csv`: `location,website_clicks,calls,direction_requests`

Templates are in `input_templates/`.

Run:

```bash
python refresh_all.py
```

The main LLM input becomes `latest/master_report.json`.
Give that file together with `prompts/MASTER_PROMPT.md` to Claude or ChatGPT.

Recommended cadence:
- SpyFu: weekly or monthly
- GSC/GA4/calls/CRM: weekly
- GBP: monthly

Use matching date windows when comparing GSC, GA4, calls and CRM.

---

**What this actually needs before it can run, checked against this repo
2026-09-18:**
- `gsc.csv` — already automated (`agents/ingest-gsc.mjs`, weekly, stored in
  Supabase `gsc_queries`/`gsc_pages`). Would need a small export step, not a
  new data source.
- `ga4.csv` — same, already automated (`agents/ingest-ga4.mjs`).
- `gbp.csv` — BrightLocal/Local Falcon cover parts of this; not currently
  exported in this exact shape.
- `calls.csv` and `crm.csv` — **no automated source exists in this repo.**
  `agents/knowledge/strategy.md` names Fieldster/Key7 as the field-service
  contact but there's no call-tracking or CRM ingest anywhere in
  `agents/*.mjs` or the GitHub Actions workflows. These two files would have
  to be manually exported from wherever call tracking and CRM actually live
  before `refresh_all.py` could produce a real `master_report.json` — this
  is the biggest gap, bigger than the missing Python script itself.

Still missing entirely: `refresh_all.py`, `requirements.txt`, any workflow
file, `input_templates/`.
