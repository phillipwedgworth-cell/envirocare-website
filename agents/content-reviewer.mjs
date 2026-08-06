// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/content-reviewer.mjs
// Commit: chore(agents): move content-reviewer OpenAI leg to gpt-5.6-luna
// Push: main

// agents/content-reviewer.mjs — EnviroCare multi-model content review panel
// =========================================================================
// Every open content PR (blog drafts, city pages) and every pending
// social_posts row gets reviewed by three models — Claude, GPT, Gemini.
// Each returns verdict (approve/revise/flag) + reasoning. The FULL dialogue,
// including disagreements, is posted where Phillip actually looks:
//   1. As a comment on the GitHub PR
//   2. To Supabase agent_findings (system of record)
//   3. To the Notion "Awaiting Your Review" Approval Hub page
//
// Panel disagreement = the signal. 3/3 approve → safe fast-merge candidate.
// Any split → human judgment needed, and the comment says exactly where.
//
// Follows the repo agent conventions: guarded clients that no-op with
// {skipped:true} until their env vars are set, so this is safe to merge
// and schedule immediately.
//
// ENV (all optional — each missing one disables just that piece):
//   ANTHROPIC_API_KEY, OPENAI_API_KEY, GEMINI_API_KEY   panel members
//   GITHUB_TOKEN                                        PR read + comment
//   SUPABASE_URL, SUPABASE_KEY                          findings + social queue
//   NOTION_TOKEN, NOTION_REVIEW_HUB_PAGE_ID             Approval Hub updates
//   REVIEW_REPO   default: phillipwedgworth-cell/envirocare-website
//
// Run:  node agents/content-reviewer.mjs
// Cron: daily 11:00 UTC (after nw-optimize drafts land, before Phillip's review)

const REPO = process.env.REVIEW_REPO || "phillipwedgworth-cell/envirocare-website";
const MAX_CHARS = 12000; // per-item content cap sent to each model

const COMPLIANCE_RULES = `
EnviroCare compliance guardrails (Alabama pest control):
- Termite $1M repair coverage is EnviroCare's OWN guarantee — NEVER manufacturer/Corteva-backed
- Termite quotes always "subject to inspection"
- No crawlspace service (killed service — must not appear)
- Pricing only if it matches the locked Jun 2026 sheet ($35/mo pest, $325/$380 termite, etc.)
- No guarantees termites "will never return"; no PII; no unverifiable claims`;

const RUBRIC = `You are one reviewer on a 3-model editorial panel for EnviroCare Pest & Termite (family-owned, Alabama, since 1958).
Review the content below. Respond ONLY with JSON, no markdown fences:
{"verdict":"approve"|"revise"|"flag","confidence":1-5,"reasoning":"2-3 sentences","specific_issues":["..."],"best_line":"the strongest sentence in the piece"}
Verdicts: approve = publish as-is; revise = good bones, named fixes needed; flag = compliance/brand/factual problem, human must decide.
${COMPLIANCE_RULES}`;

// ---------------------------------------------------------------- panel ---

async function askClaude(content) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { skipped: true, model: "claude" };
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6", max_tokens: 600,
      system: RUBRIC,
      messages: [{ role: "user", content }],
    }),
  });
  const d = await r.json();
  return parseVerdict("Claude", d?.content?.[0]?.text);
}

async function askGPT(content) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return { skipped: true, model: "gpt" };
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      model: "gpt-5.6-luna", max_tokens: 600,
      messages: [{ role: "system", content: RUBRIC }, { role: "user", content }],
    }),
  });
  const d = await r.json();
  return parseVerdict("GPT", d?.choices?.[0]?.message?.content);
}

async function askGemini(content) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return { skipped: true, model: "gemini" };
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${RUBRIC}\n\n${content}` }] }],
        generationConfig: { maxOutputTokens: 600 },
      }),
    },
  );
  const d = await r.json();
  return parseVerdict("Gemini", d?.candidates?.[0]?.content?.parts?.[0]?.text);
}

function parseVerdict(model, text) {
  if (!text) return { model, verdict: "error", reasoning: "empty response" };
  try {
    const j = JSON.parse(text.replace(/```json|```/g, "").trim());
    return { model, verdict: j.verdict || "error", confidence: j.confidence,
             reasoning: j.reasoning, issues: j.specific_issues || [], best_line: j.best_line };
  } catch {
    return { model, verdict: "error", reasoning: `unparseable: ${text.slice(0, 120)}` };
  }
}

// ---------------------------------------------------------- work sources ---

async function gh(path, opts = {}) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  const r = await fetch(`https://api.github.com${path}`, {
    ...opts,
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json",
               "content-type": "application/json", ...(opts.headers || {}) },
  });
  return r.ok ? r.json() : null;
}

async function openContentPRs() {
  const prs = (await gh(`/repos/${REPO}/pulls?state=open&per_page=20`)) || [];
  // Content PRs only: skip infra/agent code changes
  return prs.filter((p) =>
    /content|blog|draft|page|seo|copy|nw-optimize/i.test(`${p.title} ${p.head?.ref}`));
}

async function prContent(pr) {
  const files = (await gh(`/repos/${REPO}/pulls/${pr.number}/files?per_page=30`)) || [];
  const text = files
    .filter((f) => /\.(md|mdx|tsx?|json)$/.test(f.filename))
    .map((f) => `--- ${f.filename} ---\n${(f.patch || "").slice(0, 4000)}`)
    .join("\n\n");
  return `PR #${pr.number}: ${pr.title}\n\n${text}`.slice(0, MAX_CHARS);
}

async function sb(path, opts = {}) {
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_KEY;
  if (!url || !key) return null;
  const r = await fetch(`${url}/rest/v1/${path}`, {
    ...opts,
    headers: { apikey: key, Authorization: `Bearer ${key}`,
               "content-type": "application/json", Prefer: "return=representation",
               ...(opts.headers || {}) },
  });
  return r.ok ? r.json() : null;
}

const pendingSocialPosts = () =>
  sb(`social_posts?status=eq.pending_review&select=id,platform,office,body,scheduled_for&limit=20`);

// ------------------------------------------------------------- reporting ---

function renderDialogue(item, votes) {
  const real = votes.filter((v) => !v.skipped);
  const tally = real.map((v) => `${v.model}: **${v.verdict}**`).join(" · ");
  const split = new Set(real.map((v) => v.verdict)).size > 1;
  let md = `## 🤖 Panel review — ${item}\n${tally}${split ? "  ⚠️ **PANEL SPLIT — your call**" : "  ✅ unanimous"}\n\n`;
  for (const v of real) {
    md += `**${v.model}** (confidence ${v.confidence ?? "?"}/5): ${v.reasoning}\n`;
    if (v.issues?.length) md += v.issues.map((i) => `  - ${i}`).join("\n") + "\n";
    md += "\n";
  }
  if (split) {
    md += `**Where they disagree:** ${real.map((v) => `${v.model} says ${v.verdict}`).join(", ")} — read the flagged issues above first.\n`;
  }
  return md;
}

async function postEverywhere(kind, ref, dialogueMd, votes) {
  // 1. GitHub PR comment
  if (kind === "pr") {
    await gh(`/repos/${REPO}/issues/${ref}/comments`, {
      method: "POST", body: JSON.stringify({ body: dialogueMd }),
    });
  }
  // 2. Supabase agent_findings (system of record)
  await sb("agent_findings", {
    method: "POST",
    body: JSON.stringify({
      agent: "content-reviewer", kind, ref: String(ref),
      summary: votes.filter((v) => !v.skipped).map((v) => `${v.model}:${v.verdict}`).join(","),
      detail: dialogueMd, created_at: new Date().toISOString(),
    }),
  });
  // 3. Notion Approval Hub
  const nToken = process.env.NOTION_TOKEN, nPage = process.env.NOTION_REVIEW_HUB_PAGE_ID;
  if (nToken && nPage) {
    await fetch(`https://api.notion.com/v1/blocks/${nPage}/children`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${nToken}`, "Notion-Version": "2022-06-28",
                 "content-type": "application/json" },
      body: JSON.stringify({
        children: [{
          object: "block", type: "toggle",
          toggle: {
            rich_text: [{ text: { content: `🤖 Panel: ${kind} ${ref} — ${votes.filter(v=>!v.skipped).map(v=>`${v.model} ${v.verdict}`).join(", ")}` } }],
            children: [{ object: "block", type: "paragraph",
              paragraph: { rich_text: [{ text: { content: dialogueMd.slice(0, 1900) } }] } }],
          },
        }],
      }),
    });
  }
}

// ------------------------------------------------------------------ main ---

async function run() {
  const results = [];

  const prs = await openContentPRs();
  for (const pr of prs || []) {
    const content = await prContent(pr);
    const votes = await Promise.all([askClaude(content), askGPT(content), askGemini(content)]);
    const md = renderDialogue(`PR #${pr.number} ${pr.title}`, votes);
    await postEverywhere("pr", pr.number, md, votes);
    results.push({ ref: `PR#${pr.number}`, votes: votes.map((v) => v.verdict || "skipped") });
  }

  const posts = (await pendingSocialPosts()) || [];
  for (const post of posts) {
    const content = `Social post (${post.platform}, ${post.office}, scheduled ${post.scheduled_for}):\n\n${post.body}`;
    const votes = await Promise.all([askClaude(content), askGPT(content), askGemini(content)]);
    const md = renderDialogue(`social_post ${post.id}`, votes);
    await postEverywhere("social", post.id, md, votes);
    results.push({ ref: `social:${post.id}`, votes: votes.map((v) => v.verdict || "skipped") });
  }

  console.log(JSON.stringify({ agent: "content-reviewer", reviewed: results.length, results }, null, 2));
  // TODO: wire to the repo's logAgentRun() helper (agents/lib) so the watchdog
  // sees this agent in agent_runs — pass name 'content-reviewer', status 'ok'.
}

run().catch((e) => { console.error("content-reviewer failed:", e.message); process.exit(1); });
