// Guard for agents/spyfu-load.mjs — parsing only, no network, no Supabase.
import assert from "node:assert/strict";
import { parseCsv, mapHeader, toRows, dateFromName } from "../agents/spyfu-load.mjs";

assert.deepEqual(parseCsv('"a","b,c"\r\n"d ""q""",e\n'), [["a", "b,c"], ['d "q"', "e"]], "quoted commas, doubled quotes, CRLF");
assert.equal(dateFromName("MySpyFu_envirocarellc.com_9_18_2026.csv"), "2026-09-18");

// My SpyFu tracked-keyword export (real header, 2026-09-18 file).
const tracked = '"Term","CostPerClick","MonthlySearches","RankingDifficulty","CurrentRank","RankChange","EstimatedClicks","ClickChange"\n' +
  '"pest control birmingham","NaN","26","40","46","-3","1","0"\n"top choice ant control","NaN","40","27","","","0","0"\n' +
  '"Pest  Control Birmingham","NaN","26","40","12","","1","0"\n';
const t = toRows(tracked, { exportDate: "2026-09-18", sourceFile: "x.csv" });
assert.equal(t.kind, "tracked_keywords");
assert.equal(t.rows.length, 2, "keywords normalised and de-duplicated");
const pcb = t.rows.find((r) => r.keyword === "pest control birmingham");
assert.equal(pcb.rank, 12, "duplicate keyword keeps the better rank");
assert.equal(t.rows.find((r) => r.keyword === "top choice ant control").rank, null, "blank rank is null, never 0");
assert.equal(pcb.cpc, null, "NaN is null");

// Organic Keywords export: a URL column switches the kind.
const organic = "Keyword,Rank,URL,Search Volume,Keyword Difficulty\npest control birmingham al,30,https://www.envirocarellc.com/services/pest-control,660,45\n";
const o = toRows(organic, { exportDate: "2026-10-05", sourceFile: "o.csv" });
assert.equal(o.kind, "organic_keywords");
assert.equal(o.rows[0].ranking_url, "https://www.envirocarellc.com/services/pest-control");
assert.equal(o.rows[0].search_volume, 660);
// Oct 5 GPT/API pull uses snake_case ("monthly_search_volume").
assert.equal(mapHeader(["keyword", "rank", "url", "monthly_search_volume"]).search_volume, 3, "monthly_search_volume is the volume column");
assert.equal(mapHeader(["Foo", "Bar"]).keyword, undefined);
assert.throws(() => toRows("Foo,Bar\n1,2\n", { exportDate: "2026-10-05" }), /unrecognised SpyFu export/, "unknown files stop, never load guesses");

console.log("✓ spyfu-load: both export shapes parse; blanks stay null; unknown headers refused");
