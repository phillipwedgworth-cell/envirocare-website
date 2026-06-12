/**
 * Notify Phillip about AEO-Watch findings.
 *
 * Two channels:
 *   1. Notion Approvals Queue — every SHIP-consensus finding gets a card
 *   2. Resend email — once-daily digest of all SHIP findings since last digest
 *
 * Env required:
 *   NOTION_TOKEN
 *   NOTION_APPROVALS_DB_ID    (the Approvals Queue database)
 *   RESEND_API_KEY            (already set in the EnviroCare stack)
 *   ALERT_EMAIL               (Phillip's email)
 *   NOTIFY_FROM               (alerts@envirocarellc.com — already configured)
 */

export async function pushToNotion({ title, source, summary, url, tags, panelReasoning }) {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_APPROVALS_DB_ID) {
    return { skipped: true, reason: 'notion env missing' };
  }
  const r = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      'content-type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      parent: { database_id: process.env.NOTION_APPROVALS_DB_ID },
      properties: {
        // Common Notion property names — adjust to match your real DB schema
        Name: { title: [{ text: { content: `[AEO-Watch] ${title}` } }] },
        Source: { rich_text: [{ text: { content: source } }] },
        Status: { select: { name: 'Pending Review' } },
        Tags: { multi_select: (tags || []).map((t) => ({ name: t })) },
        URL: { url },
      },
      children: [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: { rich_text: [{ text: { content: summary || '(no summary)' } }] },
        },
        {
          object: 'block',
          type: 'callout',
          callout: {
            icon: { emoji: '🧠' },
            rich_text: [{ text: { content: `Panel reasoning: ${panelReasoning || '(none)'}` } }],
          },
        },
      ],
    }),
  });
  if (!r.ok) {
    return { skipped: false, ok: false, error: `${r.status}: ${await r.text()}` };
  }
  return { skipped: false, ok: true };
}

export async function emailDigest(findings) {
  if (!process.env.RESEND_API_KEY || !process.env.ALERT_EMAIL || !findings.length) {
    return { skipped: true };
  }
  const items = findings
    .map(
      (f) => `
<li style="margin-bottom:14px">
  <div style="font-weight:700;color:#0A7935">${escapeHtml(f.title)}</div>
  <div style="font-size:12px;color:#5b6f60;margin:2px 0">${escapeHtml(f.source)} · ${(f.tags || []).join(', ')}</div>
  <div style="font-size:14px;color:#1f2a23;margin:6px 0">${escapeHtml(f.summary || '')}</div>
  <a href="${escapeHtml(f.url)}" style="color:#0E8E40;font-size:13px">Read source →</a>
</li>`
    )
    .join('');

  const html = `<!doctype html><html><body style="font-family:system-ui,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#0E1A0F">
    <h2 style="font-family:Georgia,serif;color:#0A7935;margin:0 0 4px">AEO-Watch Daily Digest</h2>
    <div style="color:#5b6f60;font-size:13px;margin-bottom:18px">${findings.length} new item${findings.length === 1 ? '' : 's'} worth your attention.</div>
    <ul style="list-style:none;padding:0;margin:0">${items}</ul>
    <hr style="border:none;border-top:1px solid #E4E0D4;margin:24px 0">
    <div style="font-size:12px;color:#8a948c">
      Review the full queue in Notion Approvals · Approve in chat with the AEO-Watch sender.
    </div>
  </body></html>`;

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: process.env.NOTIFY_FROM || 'alerts@envirocarellc.com',
      to: process.env.ALERT_EMAIL,
      subject: `🌻 AEO-Watch: ${findings.length} new finding${findings.length === 1 ? '' : 's'}`,
      html,
    }),
  });
  if (!r.ok) return { skipped: false, ok: false, error: `${r.status}: ${await r.text()}` };
  return { skipped: false, ok: true };
}

function escapeHtml(s = '') {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
