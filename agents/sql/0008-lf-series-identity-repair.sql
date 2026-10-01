-- 0008 — Local Falcon series identity repair (2026-09-30)
--
-- What went wrong: campaign 4ee47a23fc4793e measured the ALABASTER profile
-- (2025 Butler Rd, ChIJr8cmt-EeiYgR_jgX9xsiZWY) through its 2026-09-18 run.
-- PR #213 (09-27) re-pointed the key to the Birmingham profile from 10-02 and
-- relabelled it "Birmingham" in config. On 09-28 seo-snapshot re-upserted the
-- 09-18 run as location = 'Birmingham' (11 rows), and seo-monitor compared that
-- Alabaster 13.36% with an older Birmingham 1.78% series and filed finding 9769
-- "Birmingham blended SoLV 13.36% … +11.58 w/w". Neither number is Birmingham's.
--
-- lf_visibility was NOT affected (ingest labels by the scan's place_id).
-- Legacy 'Birmingham/Alabaster' labels on older runs are left as they are.
-- Code fix: localFalconRunIdentity / localFalconComparison in
-- agents/lib/local-falcon-campaigns.mjs. Idempotent; safe to re-run.

UPDATE seo_metrics
   SET location = 'Alabaster'
 WHERE source = 'local_falcon'
   AND campaign_key = '4ee47a23fc4793e'
   AND run_date < '2026-10-02'
   AND location = 'Birmingham';

UPDATE agent_findings
   SET status = 'retired',
       resolved_at = now(),
       resolution_note = 'Invalid comparison (2026-09-30 audit): 13.36% is the 09-18 run of 4ee47a23 on the ALABASTER profile, compared against a different Birmingham 1.78% series (5x5-10mi monthly e9348fff). Not a Birmingham reading and not a +11.58 change. Birmingham Core series starts with its first Birmingham-profile run (2026-10-02). See agents/sql/0008-lf-series-identity-repair.sql.'
 WHERE id = 9769
   AND status = 'open';
