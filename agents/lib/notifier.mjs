/**
 * Unified Agent Command Center notifier.
 *
 * Replaces the old notifier.mjs. Every agent in the EnviroCare system
 * writes activity to ONE Notion database (the "Agent Activity" DB) with
 * a standard property schema. That database is the single source of truth
 * for what every agent is doing.
 *
 * Schema (the DB must have these properties — see
 * docs/NOTION-AGENT-COMMAND-CENTER-SETUP.md):
 *   Title       (title)
 *   Agent       (select: aeo-watch | monday-orchestrator | review-drafter | …)
 *   Type        (select: finding | run-summary | error | cost | review-draft)
 *   Status      (select: Pending Review | Approved | Dismissed | Auto-Filed)
 *   Priority    (select: 🔴 High | 🟡 Med | 🟢 Low)
 *   URL         (url)
 *   Tags        (multi-select)
 *   Cost USD    (number)        — optional
 *   Panel verdict (select)      — optional
 *
 * Env vars used:
 *   NOTION_TOKEN          (ntn_… integration token)
 *   NOTION_AGENT_DB_ID    (32-char DB id)
 *   RESEND_API_KEY        (existing)
 *   ALERT_EMAIL           (your email)
 *   NOTIFY_FROM           (Resend sender, e.g. "EnviroCare <onboarding@resend.dev>"
 *                          or "EnviroCare <alerts@envirocarellc.com>" once verified)
 */

const NOTION_API = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';

/**
 * Append one activity card to the Agent Command Center DB.
 *
 * Usage:
 *   await postActivity({
 *     agent: 'aeo-watch',
 *     type: 'finding',
 *     title: 'Google AI Overview now supports speakable schema',
 *     status: 'Pending Review',
 *     priority: 'High',
 *     url: 'https://example.com/blog-post',
 *     tags: ['aeo','schema'],
 *     panelVerdict: 'SHIP',
 *     costUSD: 0.02,
 *     bodyParagraphs: ['Long-form context for Phillip…', 'Second paragraph…'],
 *   });
 *
 * Returns: { ok: true, id } | { ok: false, error } | { skipped: true, reason }
 */
export async function postActivity(activity) {
  const token = process.env.NOTION_TOKEN;
  const dbId = process.env.NOTION_AGENT_DB_ID;
  if (!token || !dbId) return { skipped: true, reason: 'notion env missing' };

  const props = {
    Title: { title: [{ text: { content: activity.title.slice(0, 200) } }] },
    Agent: { select: { name: activity.agent } },
    Type: { select: { name: activity.type } },
    Status: { select: { name: activity.status || 'Pending Review' } },
  };
  if (activity.priority) {
    const map = { High: '🔴 High', Med: '🟡 Med', Low: '🟢 Low' };
    props.Priority = { select: { name: map[activity.priority] || activity.priority } };
  }
  if (activity.url) props.URL = { url: activity.url };
  if (activity.tags?.length) props.Tags = { multi_select: activity.tags.map((t) => ({ name: t })) };
  if (typeof activity.costUSD === 'number') props['Cost USD'] = { number: activity.costUSD };
  if (activity.panelVerdict) props['Panel verdict'] = { select: { name: activity.panelVerdict } };

  const children = (activity.bodyParagraphs || []).map((p) => ({
    object: 'block',
    type: 'paragraph',
    paragraph: { rich_text: [{ text: { content: p.slice(0, 1900) } }] },
  }));

  const r = await fetch(`${NOTION_API}/pages`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      'Notion-Version': NOTION_VERSION,
    },
    body: JSON.stringify({
      parent: { database_id: dbId },
      properties: props,
      children,
    }),
  });
  if (!r.ok) {
    return { ok: false, error: `${r.status}: ${(await r.text()).slice(0, 300)}` };
  }
  const j = await r.json();
  return { ok: true, id: j.id };
}

/**
 * Once-per-run summary card. Call this at the END of every agent run.
 * Records what the run did, how many items, how much it cost.
 */
export async function postRunSummary({ agent, sourcesChecked, totalItems, panelCalls, shipped, costUSD, durationSec }) {
  return postActivity({
    agent,
    type: 'run-summary',
    title: `${agent} run · ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', dateStyle: 'medium', timeStyle: 'short' })}`,
    status: 'Auto-Filed',
    priority: 'Low',
    tags: ['run-summary'],
    costUSD,
    bodyParagraphs: [
      `Sources checked: ${sourcesChecked}`,
      `Total items examined: ${totalItems}`,
      `Panel calls: ${panelCalls}`,
      `SHIP findings: ${shipped}`,
      `Duration: ${durationSec}s`,
      `Cost: $${(costUSD || 0).toFixed(4)}`,
    ].filter(Boolean),
  });
}

/**
 * Email digest — same as before but with Notion link included so the
 * email points Phillip back to the Command Center for triage.
 */
export async function emailDigest({ agent, findings }) {
  if (!process.env.RESEND_API_KEY || !findings.length) {
    return { skipped: true };
  }
  // Base inboxes always get the digest; env adds extras (comma-separated), deduped.
  const baseRecipients = ['phillipwedgworth@gmail.com', 'service@envirocarellc.com'];
  const envRecipients  = (process.env.ALERT_EMAIL || process.env.NOTIFY_EMAIL || '')
    .split(',').map((s) => s.trim()).filter(Boolean);
  const notifyTo = Array.from(new Set([...baseRecipients, ...envRecipients]));
  const items = findings
    .map(
      (f) => `
<li style="margin-bottom:14px">
  <div style="font-weight:700;color:#0A7935">${esc(f.title)}</div>
  <div style="font-size:12px;color:#5b6f60;margin:2px 0">${esc(f.source || '')}${f.tags?.length ? ' · ' + f.tags.join(', ') : ''}</div>
  <div style="font-size:14px;color:#1f2a23;margin:6px 0">${esc(f.summary || '')}</div>
  ${f.url ? `<a href="${esc(f.url)}" style="color:#0E8E40;font-size:13px">Read source →</a>` : ''}
</li>`
    )
    .join('');

  const html = `<!doctype html><html><body style="font-family:system-ui,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#0E1A0F">
    <h2 style="font-family:Georgia,serif;color:#0A7935;margin:0 0 4px">${esc(agent)} Daily Digest</h2>
    <div style="color:#5b6f60;font-size:13px;margin-bottom:18px">${findings.length} new item${findings.length === 1 ? '' : 's'} for your review. Full triage in the Agent Command Center.</div>
    <ul style="list-style:none;padding:0;margin:0">${items}</ul>
    <hr style="border:none;border-top:1px solid #E4E0D4;margin:24px 0">
    <div style="font-size:12px;color:#8a948c">
      Triage in Notion → Agent Command Center · Agent Activity database
    </div>
  </body></html>`;

  const from = process.env.NOTIFY_FROM || 'EnviroCare <onboarding@resend.dev>';
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from,
      to: notifyTo,
      subject: `🌻 ${agent}: ${findings.length} new finding${findings.length === 1 ? '' : 's'}`,
      html,
    }),
  });
  if (!r.ok) return { ok: false, error: `${r.status}: ${(await r.text()).slice(0, 300)}` };
  return { ok: true };
}

function esc(s = '') {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Backward compatibility — keep pushToNotion exported so the original
// aeo-watch.mjs keeps working without code changes. It now routes through
// the new postActivity function automatically.
export async function pushToNotion({ title, source, summary, url, tags, panelReasoning }) {
  return postActivity({
    agent: 'aeo-watch',
    type: 'finding',
    title,
    status: 'Pending Review',
    priority: 'Med',
    url,
    tags,
    bodyParagraphs: [
      summary || '(no summary)',
      panelReasoning ? `Panel reasoning: ${panelReasoning}` : null,
      source ? `Source: ${source}` : null,
    ].filter(Boolean),
  });
}
