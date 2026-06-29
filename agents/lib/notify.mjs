// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/lib/notify.mjs
// Commit: feat(agents): Resend email helper — the missing alert pipe
// Push: main
// ─────────────────────────────────────
// Sends an email via Resend. This is the ONLY way the agent fleet reaches
// Phillip when he is not in a chat. Never throws — a dead email pipe must not
// crash an agent run; it logs and returns false.

import { cleanEnv } from './cleanEnv.mjs';

export async function sendEmail(subject, text) {
  const key  = process.env.RESEND_API_KEY;
  const from = cleanEnv(process.env.NOTIFY_FROM);
  // Base inboxes always get every alert; env adds any extras (comma-separated),
  // deduped so no inbox is hit twice.
  const baseRecipients = ['phillipwedgworth@gmail.com', 'service@envirocarellc.com'];
  const envRecipients  = (cleanEnv(process.env.ALERT_EMAIL) || cleanEnv(process.env.NOTIFY_EMAIL))
    .split(',').map(s => cleanEnv(s)).filter(Boolean);
  const to = Array.from(new Set([...baseRecipients, ...envRecipients]));
  if (!key || !from || !to.length) {
    console.warn('[notify] missing RESEND_API_KEY / NOTIFY_FROM — email skipped');
    return false;
  }
  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject, text }),
    });
    if (!resp.ok) {
      console.error(`[notify] resend ${resp.status}: ${(await resp.text()).slice(0, 200)}`);
      return false;
    }
    console.log(`[notify] sent: ${subject}`);
    return true;
  } catch (e) {
    console.error(`[notify] ${e.message}`);
    return false;
  }
}
