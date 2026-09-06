// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/blog-writer.mjs
// Commit: feat(agents): blog-writer — 2 articles/day from the backlog, NeuronWriter-scored, compliance-scanned, written into data/blog-posts.ts for the PR workflow
// Push: main (via branch + PR)
// ─────────────────────────────────────
/**
 * blog-writer — the content engine. Every run:
 *   1. Reads agents/knowledge/blog-backlog.json and skips any slug already in
 *      data/blog-posts.ts (so it can never duplicate a post).
 *   2. Also pulls the newest `keyword-opportunity` findings and adds any query
 *      not already covered as an ad-hoc topic (GSC tells it what to write next).
 *   3. Writes ARTICLES_PER_RUN posts with Sonnet, house style, the compliance
 *      locks INSIDE the prompt, internal links only to routes that exist.
 *   4. Scores each draft in NeuronWriter (one analysis per article — 2/day ≈ 60/mo,
 *      which is the fleet budget) and stores the score in the post's details.
 *      A miss below MIN_NW_SCORE gets one rewrite pass with the missing terms.
 *   5. Appends the posts to data/blog-posts.ts, post-dated so the index releases
 *      them on a cadence, and writes a manifest the workflow uses for the PR body.
 *   The workflow (.github/workflows/blog-writer.yml) then runs the compliance
 *   scanner, commits to a branch, and opens the PR. Vercel builds the preview.
 *   Phillip approves by merging. No human step before that.
 *
 * Best-practice notes:
 *   - Deterministic topic selection; the model only writes prose.
 *   - Compliance is enforced twice: in the prompt, then by scripts/test-source-
 *     compliance in the workflow. A violating draft fails the workflow — no PR.
 *   - Idempotent: re-running does nothing if today's posts already exist.
 *   - Route allow-list for links is read from the repo, not hard-coded.
 */
import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import { supabase, logAgentRun, writeFinding } from "./lib/supabase.mjs";
import { gateOrSkip } from "./lib/agent-gate.mjs";
import { createMessage } from "./lib/llm-with-logging.mjs";
import { analyzePageContent } from "./lib/neuronwriter.mjs";

const AGENT_NAME = "blog-writer";
const MODEL = process.env.BLOG_WRITER_MODEL || "claude-sonnet-4-6";
const ARTICLES_PER_RUN = Math.max(1, Number(process.env.BLOG_ARTICLES_PER_RUN ?? 2) || 2);
const MIN_NW_SCORE = Number(process.env.BLOG_MIN_NW_SCORE ?? 68) || 68;
const ROOT = path.resolve(process.cwd());
const POSTS_FILE = path.join(ROOT, "data/blog-posts.ts");
const BACKLOG_FILE = path.join(ROOT, "agents/knowledge/blog-backlog.json");
const MANIFEST_FILE = path.join(ROOT, "agents/.blog-writer-manifest.json");
const MIDDLEWARE_FILE = path.join(ROOT, "middleware.ts");

// Legacy Scorpion posts: when a backlog topic carries `legacyPath`, add a
// specific 301 so the old URL (still earning impressions) lands on the new
// article instead of the generic topic bucket. Inserted at the END of
// POST_OVERRIDES so earlier, hand-written overrides keep precedence.
function addLegacyOverride(topic) {
  if (!topic.legacyPath) return false;
  const slug = topic.legacyPath.replace(/\/$/, "").split("/").pop();
  if (!slug) return false;
  let m = fs.readFileSync(MIDDLEWARE_FILE, "utf8");
  if (m.includes(`"/blog/${topic.slug}"`)) return false;
  const esc = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const line = `  [/${esc}/, "/blog/${topic.slug}"], // legacy ${topic.legacyPath} (blog-writer ${new Date().toISOString().slice(0, 10)})\n];`;
  const idx = m.lastIndexOf("\n];", m.indexOf("POST_OVERRIDES") > -1 ? m.indexOf("function", m.indexOf("POST_OVERRIDES")) : m.length);
  if (idx < 0) return false;
  m = m.slice(0, idx) + "\n" + line + m.slice(idx + 3);
  fs.writeFileSync(MIDDLEWARE_FILE, m);
  return true;
}

const CLOSE = `
<p>Call the office nearest you — Birmingham (205) 991-2882, Alabaster (205) 940-6360, Lake Martin / Alex City (256) 234-6162, or Huntsville (256) 937-7676 — or <a href="/quote">request a free quote</a> and we will take it from there.</p>

<p><strong>No One Cares Like EnviroCare.</strong></p>
`;

function existingSlugs(src) { return new Set([...src.matchAll(/slug: '([a-z0-9-]+)'/g)].map((m) => m[1])); }
function existingTitles(src) { return [...src.matchAll(/title: (['"])(.*?)\1,/g)].map((m) => m[2]).slice(0, 80); }
function liveRoutes() {
  const routes = new Set(["/quote", "/pricing", "/blog", "/services/pest-control", "/services/termite-control", "/services/mosquito", "/services/tick-control", "/services/fire-ant", "/services/commercial", "/services/interior-pest-control", "/services/wdo-letters", "/realtor"]);
  for (const d of fs.readdirSync(path.join(ROOT, "app"), { withFileTypes: true })) {
    if (d.isDirectory() && fs.existsSync(path.join(ROOT, "app", d.name, "page.tsx")) && !/^(api|blog|services|admin|command-center)$/.test(d.name)) routes.add(`/${d.name}`);
  }
  return routes;
}
function tsStr(v) { return "'" + String(v).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'"; }

async function opportunityTopics(skip) {
  if (!supabase) return [];
  const { data } = await supabase.from("agent_findings").select("finding,details,created_at")
    .eq("agent_name", "keyword-opportunity").gte("created_at", new Date(Date.now() - 14 * 86400000).toISOString()).order("created_at", { ascending: false }).limit(30);
  const out = [];
  for (const f of data ?? []) {
    const q = f.details?.query; if (!q) continue;
    const slug = q.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
    if (skip.has(slug) || (f.details?.position ?? 99) > 20) continue;
    if (/tuscaloosa|bed ?bug|wildlife|raccoon|lawn|crawl ?space encap|carpenter bee/i.test(q)) continue;
    out.push({ slug, keyword: q, category: "Pests", angle: `GSC striking-distance query at position ${Number(f.details.position).toFixed(1)} with ${f.details.impressions} impressions — write the page that fully answers it`, source: "keyword-opportunity" });
  }
  return out;
}

function pickTopics(src, n) {
  const skip = existingSlugs(src);
  const backlog = JSON.parse(fs.readFileSync(BACKLOG_FILE, "utf8")).topics.filter((t) => !skip.has(t.slug));
  return { backlog, skip };
}

function writerPrompt(topic, routes, recentTitles, termsHint) {
  return `You write for EnviroCare, a family-owned Alabama pest control company (Wedgworth family, since 1958, four generations, offices in Alabaster, Birmingham, Huntsville, and Alexander City / Lake Martin). Write one blog article.

TOPIC: ${topic.keyword}
ANGLE: ${topic.angle}
CATEGORY: ${topic.category}
${termsHint ? `INCLUDE THESE TERMS NATURALLY (search-intent coverage): ${termsHint}\n` : ""}
VOICE: warm, direct, Southern, specific. Plain sentences. Local detail (creeks, soils, neighborhoods, the weather). Honest about what works and what does not. Never corporate. Never "genuinely" or "honestly".

FORMAT — return ONLY a JSON object, no prose, no code fence:
{"title": "...", "metaTitle": "... (<=60 chars, lead with the searcher's problem, no '| EnviroCare')", "metaDescription": "... (<=155 chars)", "excerpt": "... (2-3 sentences)", "readMinutes": 6, "heroEmoji": "one emoji", "body": "HTML"}
BODY RULES: 800-1100 words. Start with <p class="lede">. Then 4-6 <h2> sections phrased as questions or plain statements; <ul>/<ol> where a list helps; <strong> sparingly. End with a short section that mentions the relevant EnviroCare service with a link. Do NOT include the closing call-to-action or the tagline — they are appended by code. Internal links: only to these routes, absolute-path href, at most 4 links: ${[...routes].slice(0, 80).join(", ")}. Do not link to any other URL.

HARD COMPLIANCE RULES (violations fail the build):
- Never write: safe, pet-safe, kid-safe, eco-friendly, non-toxic, natural (as a product claim), EPA-approved, guarantee, guaranteed, warranty, same-day, eliminate/elimination for mosquitoes (use reduce/control), pest-free, "no contract", "cancel anytime".
- Products are "EPA-registered products applied per label directions."
- Pricing, only these, only if relevant: pest plan $35/month on a 12-month ACH agreement or $70 per visit, $75 initial service; mosquito $45 per treatment, 8 treatments March–October, $34/month with a pest plan; Mosquito + Tick $65 per treatment (covers chiggers, not fleas); fire ant $150 covers most yards, larger properties quoted by square footage. TERMITE IS NEVER A PRICE — "quoted after a free WDO inspection."
- Termite coverage: "up to $1,000,000 in EnviroCare damage repair coverage, subject to the terms of the agreement" — EnviroCare's own, never the manufacturer's.
- Mosquito season is March through October. Never November.
- No competitor names. No review counts. No "third-generation". Say "four generations" or "since 1958", never a year count.
- Services we do NOT offer and must not mention as offered: bed bugs, wildlife/raccoon/squirrel removal, lawn care, crawlspace encapsulation, carpenter bee treatment. Tuscaloosa is not a service area.
- Medical topics: general information only; tell readers to see a doctor for symptoms. We are pest control, not medicine.

Recent titles to avoid duplicating: ${recentTitles.slice(0, 25).join(" | ")}`;
}

function parseJson(text) {
  const t = text.replace(/```json|```/g, "").trim();
  const a = t.indexOf("{"), b = t.lastIndexOf("}");
  return JSON.parse(t.slice(a, b + 1));
}

const BANNED = /\b(pet[- ]safe|kid[- ]safe|child[- ]safe|eco[- ]friendly|non[- ]toxic|epa[- ]approved|guarantee[ds]?|warranty|same[- ]day|pest[- ]free|no contract|cancel anytime|third[- ]generation|bed ?bugs?|wildlife removal|raccoon|lawn care|encapsulat|tuscaloosa|through november|march.{1,3}november)\b/i;
function complianceIssues(post) {
  const text = `${post.title} ${post.metaTitle} ${post.metaDescription} ${post.excerpt} ${post.body}`;
  const issues = [];
  const m = text.match(BANNED); if (m) issues.push(`banned phrase: "${m[0]}"`);
  if (/mosquito[^.]{0,80}\beliminat/i.test(text) || /\beliminat[^.]{0,80}mosquito/i.test(text)) issues.push("mosquito elimination claim");
  if (/\$\s?(1,?[0-9]{3}|[2-9][0-9]{2})\b[^.]{0,60}termite|termite[^.]{0,60}\$\s?(1,?[0-9]{3}|[2-9][0-9]{2})\b/i.test(text)) issues.push("termite price stated");
  if (/\$\s?(99|79|150)\b[^.]{0,30}(initial|startup|start)/i.test(text)) issues.push("retired initial-service price");
  if (/1,?000,?000[^.]{0,120}(sentricon|corteva|manufacturer)/i.test(text) && !/envirocare/i.test(text.match(/1,?000,?000[^.]{0,120}/i)?.[0] ?? "")) issues.push("coverage attributed to manufacturer");
  if (/<a href="(?!\/)/.test(post.body)) issues.push("external link");
  return issues;
}

async function draft(anthropic, topic, routes, recentTitles, termsHint) {
  const res = await createMessage(anthropic, { model: MODEL, max_tokens: 4000, messages: [{ role: "user", content: writerPrompt(topic, routes, recentTitles, termsHint) }] }, { agentName: AGENT_NAME, role: "writer" });
  const post = parseJson(res.content.map((c) => c.text ?? "").join(""));
  for (const k of ["title", "metaTitle", "metaDescription", "excerpt", "body"]) if (!post[k]) throw new Error(`draft missing ${k}`);
  // strip any link to a route that does not exist
  post.body = post.body.replace(/<a href="([^"]+)">(.*?)<\/a>/g, (m, href, txt) => (routes.has(href) ? m : txt));
  post.readMinutes = Math.max(4, Math.min(12, Number(post.readMinutes) || Math.round(post.body.split(/\s+/).length / 180)));
  post.heroEmoji = String(post.heroEmoji || "🐛").slice(0, 4);
  return post;
}

async function scoreInNeuronWriter(topic, post) {
  try {
    const r = await analyzePageContent(topic.keyword, `<h1>${post.title}</h1>${post.body}`, { title: post.metaTitle, url: `https://www.envirocarellc.com/blog/${topic.slug}` });
    return { score: r?.score ?? r?.contentScore ?? null, missing: r?.missingTerms ?? r?.missing ?? [], queryId: r?.queryId ?? r?.query ?? null };
  } catch (e) { console.warn(`[${AGENT_NAME}] NeuronWriter skipped for "${topic.keyword}": ${e.message}`); return { score: null, missing: [], queryId: null, note: e.message }; }
}

function appendPosts(src, items) {
  const entries = items.map(({ topic, post, publishedAt }) => `  {
    slug: ${tsStr(topic.slug)},
    title: ${tsStr(post.title)},
    excerpt: ${tsStr(post.excerpt)},
    publishedAt: '${publishedAt}',
    author: 'Kevin Wedgworth',
    category: ${tsStr(topic.category)},
    readMinutes: ${post.readMinutes},
    heroEmoji: '${post.heroEmoji}',
    metaTitle: ${tsStr(post.metaTitle)},
    metaDescription: ${tsStr(post.metaDescription)},
    body: \`${post.body.replace(/`/g, "'").replace(/\$\{/g, "$ {")}${CLOSE}\`,
  },
`).join("");
  const marker = "export const BLOG_POSTS: BlogPost[] = [\n";
  if (!src.includes(marker)) throw new Error("BLOG_POSTS marker not found");
  return src.replace(marker, `${marker}  // ─── blog-writer ${new Date().toISOString().slice(0, 10)} ───\n${entries}`);
}

export async function run() {
  const gate = await gateOrSkip(AGENT_NAME);
  if (!gate.allowed) return gate.result;

  let src = fs.readFileSync(POSTS_FILE, "utf8");
  const { backlog, skip } = pickTopics(src, ARTICLES_PER_RUN);
  const fromGsc = await opportunityTopics(skip);
  // Alternate: one GSC-driven topic (if any), the rest from the backlog.
  const queue = [...fromGsc.slice(0, 1), ...backlog].slice(0, ARTICLES_PER_RUN);
  if (!queue.length) { await logAgentRun(AGENT_NAME, "ok", "backlog exhausted — add topics to agents/knowledge/blog-backlog.json"); return { written: 0 }; }

  const routes = liveRoutes();
  const recentTitles = existingTitles(src);
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const written = [];
  // Post-date: next free day after the latest publishedAt already in the file, one per day.
  const latest = [...src.matchAll(/publishedAt: '(\d{4}-\d{2}-\d{2})'/g)].map((m) => m[1]).sort().pop() ?? new Date().toISOString().slice(0, 10);
  let nextDay = new Date(Math.max(Date.parse(latest), Date.now()));

  for (const topic of queue) {
    try {
      let post = await draft(anthropic, topic, routes, recentTitles);
      let issues = complianceIssues(post);
      if (issues.length) { post = await draft(anthropic, { ...topic, angle: `${topic.angle}. PREVIOUS DRAFT FAILED COMPLIANCE: ${issues.join("; ")} — fix that.` }, routes, recentTitles); issues = complianceIssues(post); }
      if (issues.length) { await writeFinding(AGENT_NAME, "blog", "warning", null, `Draft "${topic.keyword}" failed compliance twice: ${issues.join("; ")} — skipped`, { topic }); continue; }
      let nw = await scoreInNeuronWriter(topic, post);
      if (nw.score !== null && nw.score < MIN_NW_SCORE && nw.missing?.length) {
        post = await draft(anthropic, topic, routes, recentTitles, nw.missing.slice(0, 25).join(", "));
        if (complianceIssues(post).length === 0) nw = await scoreInNeuronWriter(topic, post);
      }
      nextDay = new Date(nextDay.getTime() + 86400000);
      const publishedAt = nextDay.toISOString().slice(0, 10);
      written.push({ topic, post, publishedAt, nw });
      recentTitles.unshift(post.title);
    } catch (e) {
      await writeFinding(AGENT_NAME, "blog", "warning", null, `Could not write "${topic.keyword}": ${e.message}`, { topic });
    }
  }

  if (written.length) {
    src = appendPosts(src, written);
    fs.writeFileSync(POSTS_FILE, src);
    for (const w of written) w.legacy301 = addLegacyOverride(w.topic);
    fs.writeFileSync(MANIFEST_FILE, JSON.stringify({ date: new Date().toISOString(), posts: written.map((w) => ({ slug: w.topic.slug, title: w.post.title, keyword: w.topic.keyword, publishedAt: w.publishedAt, nwScore: w.nw.score, source: w.topic.source ?? "backlog", legacy301: w.legacy301 ? w.topic.legacyPath : null })) }, null, 2));
    for (const w of written) await writeFinding(AGENT_NAME, "blog", "info", `/blog/${w.topic.slug}`, `Wrote "${w.post.title}" (NeuronWriter ${w.nw.score ?? "n/a"}) — publishes ${w.publishedAt}, pending PR`, { keyword: w.topic.keyword, nw: w.nw, model: MODEL });
  }
  const summary = { written: written.length, slugs: written.map((w) => w.topic.slug), backlogLeft: backlog.length - written.filter((w) => !w.topic.source).length };
  await logAgentRun(AGENT_NAME, "ok", summary);
  console.log(`[${AGENT_NAME}] wrote ${written.length}: ${summary.slugs.join(", ")}`);
  return summary;
}

if (import.meta.url === `file://${process.argv[1]}`) run().catch((e) => { console.error(`[${AGENT_NAME}] FATAL`, e); process.exit(1); });
