// agents/social-poster.mjs
// Posts due items from the social_posts queue to Facebook / Instagram / Google
// Business Profile, then records the result. Exports run() (orchestrator-compatible)
// and seedFromCalendar() to load agents/social/content-calendar.json into the queue.
//
// Safe by design: platform clients no-op with { skipped:true } until their tokens
// exist, so this can be scheduled now and "go live" the moment you add secrets.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { supabase, logAgentRun, writeFinding } from "./lib/supabase.mjs";
import { postToFacebook, postToInstagram } from "./lib/meta.mjs";
import { postGbp } from "./lib/gbp.mjs";

const AGENT_NAME = "social-poster";

function loadCalendar() {
  // The calendar ships in a companion PR; tolerate its absence so the poster
  // (which also reads the live social_posts queue) never hard-crashes.
  // Path is built dynamically (not `new URL(literal, import.meta.url)`) so the
  // Next.js/webpack build doesn't try to bundle the JSON as a static asset.
  try {
    const dir = dirname(fileURLToPath(import.meta.url));
    return JSON.parse(readFileSync(join(dir, "social", "content-calendar.json"), "utf8"));
  } catch {
    return { locations: {}, defaults: {}, posts: [] };
  }
}

// Import calendar rows into social_posts (status 'draft'). Idempotent by id+platform.
export async function seedFromCalendar() {
  if (!supabase) return { seeded: 0, reason: "no supabase" };
  const cal = loadCalendar();
  const rows = [];
  for (const p of cal.posts || []) {
    for (const platform of p.platforms || []) {
      rows.push({
        id: `${p.id}--${platform}`,
        location: p.location,
        platform,
        post_type: p.type || null,
        headline: p.headline || null,
        body: p.body,
        cta: p.cta || cal.defaults?.cta || null,
        scheduled_for: new Date(`${p.publish_date}T14:00:00Z`).toISOString(),
        status: "draft",
      });
    }
  }
  const { error } = await supabase.from("social_posts").upsert(rows, { onConflict: "id" });
  if (error) return { seeded: 0, error: error.message };
  return { seeded: rows.length };
}

async function postOne(row, cal) {
  const phone = cal.locations?.[row.location]?.phone;
  if (row.platform === "facebook") {
    const msg = [row.headline, row.body, row.cta].filter(Boolean).join("\n\n");
    return postToFacebook({ message: msg, imageUrl: row.graphic_url || undefined });
  }
  if (row.platform === "instagram") {
    const caption = [row.headline, row.body, row.cta].filter(Boolean).join("\n\n");
    return postToInstagram({ caption, imageUrl: row.graphic_url || undefined });
  }
  if (row.platform === "google") {
    const summary = [row.headline, row.body].filter(Boolean).join(" ");
    return postGbp({
      location: row.location,
      summary,
      actionType: phone ? "CALL" : "LEARN_MORE",
      actionUrl: "https://www.envirocarellc.com/" + row.location.replace("_", "-"),
      phone,
      imageUrl: row.graphic_url || undefined,
    });
  }
  return { ok: false, error: `unknown platform ${row.platform}` };
}

export async function run({ nowIso } = {}) {
  if (!supabase) {
    await logAgentRun(AGENT_NAME, "skipped", "supabase not configured");
    return { agent: AGENT_NAME, status: "skipped", posted: 0, failed: 0, skipped: 0 };
  }
  const now = nowIso || new Date().toISOString();
  const cal = loadCalendar();

  // Only 'approved' posts that are due auto-publish. Drafts wait for approval.
  const { data: due, error } = await supabase
    .from("social_posts")
    .select("*")
    .eq("status", "approved")
    .lte("scheduled_for", now)
    .order("scheduled_for", { ascending: true })
    .limit(25);
  if (error) {
    await logAgentRun(AGENT_NAME, "error", error.message);
    return { agent: AGENT_NAME, status: "error", error: error.message };
  }

  let posted = 0, failed = 0, skipped = 0;
  // A post skipped for missing credentials used to increment `skipped` only, which
  // meant the run still logged "ok" and the daily health email printed
  // "ok social-poster — success" while nothing reached Facebook. Approving posts in
  // /command-center#approvals looked like it worked. Collect the skip reasons so an
  // unpublished queue is loud instead of silent. NOTE: the Meta/IG tokens must exist
  // as GitHub Actions secrets — this agent runs in Actions, so /api/agents/health
  // (which only inspects Vercel) reporting missingRequired: [] says nothing about them.
  const skipReasons = new Map(); // reason -> count
  for (const row of due || []) {
    const result = await postOne(row, cal);
    if (result.ok) {
      posted++;
      await supabase.from("social_posts").update({
        status: "posted", external_id: result.id ?? null, permalink: result.permalink ?? null,
        posted_at: new Date().toISOString(), error: null, updated_at: new Date().toISOString(),
      }).eq("id", row.id);
    } else if (result.skipped) {
      // creds missing — leave the row 'approved' so it publishes once tokens exist,
      // but record why so the run can escalate instead of reporting success.
      skipped++;
      const reason = result.reason || `${row.platform}: credentials not set`;
      skipReasons.set(reason, (skipReasons.get(reason) || 0) + 1);
    } else {
      failed++;
      await supabase.from("social_posts").update({
        status: "failed", error: result.error ?? "unknown", updated_at: new Date().toISOString(),
      }).eq("id", row.id);
      await writeFinding(AGENT_NAME, "social", "warning", null,
        `Failed to post ${row.platform} for ${row.location}: ${result.error}`, { id: row.id });
    }
  }

  // A due, approved post that could not publish for want of credentials is a
  // failure to publish, not a success — surface it in the run status, the summary
  // line, and a warning finding that names the missing variables.
  const reasonList = [...skipReasons.entries()].map(([reason, n]) => `${reason} (${n})`);
  const blocked = skipped > 0;
  const summary = [
    `posted ${posted}, failed ${failed}, skipped ${skipped} (of ${due?.length || 0} due)`,
    ...(blocked ? [`NOT PUBLISHED — ${reasonList.join("; ")}`] : []),
  ].join(" · ");
  const status = failed || blocked ? "escalated" : "ok";
  await logAgentRun(AGENT_NAME, status, summary);
  if (posted) await writeFinding(AGENT_NAME, "social", "info", null, `Published ${posted} scheduled post(s).`, {});
  if (blocked) {
    await writeFinding(
      AGENT_NAME, "social", "warning", null,
      `${skipped} approved post(s) were due but did NOT publish — missing credentials: ${reasonList.join("; ")}. ` +
      `These must be set as GitHub Actions secrets (this agent runs in Actions, not on Vercel). ` +
      `The posts remain 'approved' and will publish on the next run once the secrets exist.`,
      { skipped, reasons: reasonList, due: due?.length || 0 },
    );
  }
  return { agent: AGENT_NAME, status, posted, failed, skipped, due: due?.length || 0, skipReasons: reasonList };
}
