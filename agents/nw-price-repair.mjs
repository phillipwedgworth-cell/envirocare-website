// agents/nw-price-repair.mjs
// Surgical price/cadence repair across every NeuronWriter draft.
//
// WHY (2026-08-06)
// The Aug-6 compliance rewrite re-authored all 44 live drafts under a rule that
// declared "$35/$67/$127" the only permitted prices. Those are wrong:
//   - real tiers are $35 / $69 / ~$100 (+$79 startup) per data/pricing.ts, which
//     matches the live /pricing page
//   - $67 is the retired 11-Jun-2026 sheet (Foundation $67); $127 exists nowhere
// The same pass also called the pest plan "quarterly"; it is BI-MONTHLY (cities.ts
// says bi-monthly 32x, quarterly 0x, and pay-per-visit is $70 every OTHER month).
// Sampling confirmed 12/12 drafts affected.
//
// This repairs the strings in place rather than regenerating, so the meta
// descriptions, keyword differentiation and scores from that pass are preserved.
//
// ⚠️ import-content takes RAW HTML. Passing entity-escaped markup is accepted
// silently, stores escaped text and craters the score (~42 vs ~81). This script
// round-trips get-content -> string replace -> import-content, so it never
// introduces entities; do not "helpfully" escape anything here.
//
// Run:  node agents/nw-price-repair.mjs            # dry run, reports what would change
//       node agents/nw-price-repair.mjs --live     # writes the repaired drafts back
//       node agents/nw-price-repair.mjs --live --only "<keyword substring>"

const API = "https://app.neuronwriter.com/neuron-api/0.5/writer";
const KEY = process.env.NEURONWRITER_API_KEY;
const PROJECT = process.env.NEURONWRITER_PROJECT || "9d0bec3a70f4743c";
const LIVE = process.argv.includes("--live");
const onlyIdx = process.argv.indexOf("--only");
const ONLY = onlyIdx > -1 ? process.argv[onlyIdx + 1] : null;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Ordered: longest / most specific first so a broader rule cannot eat a narrower one.
const FIXES = [
  ["$35 per month, $67 per month, or $127 per month", "$35 per month, $69 per month, or about $100 per month"],
  ["$35, $67, or $127 per month", "$35, $69, or about $100 per month"],
  ["$35/month, $67/month, $127/month", "$35/month, $69/month, about $100/month"],
  ["$35, $67, and $127", "$35, $69, and about $100"],
  ["$67 per month", "$69 per month"],
  ["$127 per month", "about $100 per month"],
  ["$67/month", "$69/month"],
  ["$127/month", "about $100/month"],
  ["$67", "$69"],
  ["$127", "about $100"],
  ["quarterly exterior service", "bi-monthly exterior service"],
  ["quarterly service", "bi-monthly service"],
  ["quarterly visits", "bi-monthly visits"],
  ["Quarterly", "Bi-monthly"],
  ["quarterly", "bi-monthly"],
  // Swept sitewide earlier the same day; the rewrite reintroduced it.
  ["was founded in 1958", "has been protecting Alabama homes since 1958"],
  ["founded in 1958", "doing pest control in Alabama since 1958"],
];

async function nw(method, body) {
  const res = await fetch(`${API}/${method}`, {
    method: "POST",
    headers: { "X-API-KEY": KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${res.status}: ${text.slice(0, 160)}`);
  try { return JSON.parse(text); } catch { return { _raw: text }; }
}

function repair(html) {
  let out = html, changed = 0;
  for (const [from, to] of FIXES) {
    if (out.includes(from)) { changed += out.split(from).length - 1; out = out.split(from).join(to); }
  }
  return { out, changed };
}

export async function run() {
  if (!KEY) throw new Error("NEURONWRITER_API_KEY not set");
  const list = await nw("list-queries", { project: PROJECT });
  const queries = Array.isArray(list) ? list : list.queries || [];
  console.log(`[nw-price-repair] ${queries.length} queries; ${LIVE ? "LIVE" : "DRY RUN"}`);

  let touched = 0, edits = 0, skipped = 0;
  for (const q of queries) {
    const id = q.query || q.id;
    const keyword = q.keyword || "(no keyword)";
    if (ONLY && !keyword.includes(ONLY)) continue;

    let content;
    try { content = await nw("get-content", { query: id }); }
    catch (e) { console.error(`  ! ${keyword}: ${e.message}`); continue; }

    const html = typeof content?.content === "string" ? content.content : "";
    if (!html.trim()) { skipped++; continue; }

    const { out, changed } = repair(html);
    if (!changed) continue;

    touched++; edits += changed;
    if (!LIVE) {
      console.log(`  DRY ${keyword} — ${changed} replacement(s)`);
    } else {
      try {
        await nw("import-content", {
          project: PROJECT, query: id, html: out,
          title: content.title || keyword,
          description: content.description || "",
        });
        console.log(`  fixed ${keyword} — ${changed} replacement(s)`);
      } catch (e) {
        console.error(`  ! write failed ${keyword}: ${e.message}`);
      }
      await sleep(1200); // gentle on the API
    }
  }

  const summary = `${touched} drafts ${LIVE ? "repaired" : "would change"} (${edits} replacements), ${skipped} empty`;
  console.log(`[nw-price-repair] ${summary}`);
  return { touched, edits, summary };
}

run().catch((e) => { console.error(e); process.exit(1); });
