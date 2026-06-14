import { Resend } from "resend";
import { createAdDraft } from "@/lib/ads";

interface DraftRequest {
  title?: string;
  body?: string;
  cta?: string;
  landingUrl?: string;
  agentName?: string;
  metadata?: Record<string, unknown>;
}

function sanitize(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function safeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br />");
}

export async function POST(request: Request) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    return Response.json({ error: "Supabase is not configured" }, { status: 503 });
  }

  let body: DraftRequest;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const title = sanitize(body.title);
  const copy = sanitize(body.body);
  const cta = sanitize(body.cta);
  const landingUrl = sanitize(body.landingUrl);
  const agentName = sanitize(body.agentName) || "ad-automation-bot";

  if (!title || !copy || !cta || !landingUrl) {
    return Response.json(
      { error: "title, body, cta, and landingUrl are required" },
      { status: 422 }
    );
  }

  const id = crypto.randomUUID();
  let draft;

  try {
    draft = await createAdDraft({
      id,
      agent_name: agentName,
      title,
      body: copy,
      cta,
      landing_url: landingUrl,
      metadata: body.metadata ?? {},
    });
  } catch (error) {
    console.error("[ads] createAdDraft failed", error);
    return Response.json({ error: "Failed to store ad draft" }, { status: 500 });
  }

  const reviewer = process.env.NOTIFY_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM || process.env.NOTIFY_FROM || "onboarding@resend.dev";
  const reviewUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.envirocarellc.com'}/ads/${id}`;

  if (resendKey && reviewer) {
    const resend = new Resend(resendKey);
    const html = `
      <div style="font-family:system-ui,sans-serif;max-width:680px;color:#0f172a">
        <h2 style="margin-top:0;color:#0e5626">New ad draft ready for review</h2>
        <p style="color:#475569">A new ad draft has been submitted by <strong>${agentName}</strong>.</p>
        <p><strong>Title:</strong> ${safeHtml(title)}</p>
        <p><strong>CTA:</strong> ${safeHtml(cta)}</p>
        <p><strong>Landing URL:</strong> <a href="${landingUrl}">${landingUrl}</a></p>
        <div style="margin:18px 0;padding:16px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc">
          <strong style="display:block;margin-bottom:8px">Ad body</strong>
          <div style="font-size:15px;line-height:1.7;color:#0f172a">${safeHtml(copy)}</div>
        </div>
        <p style="margin:0;font-size:14px;color:#475569">Review JSON preview: <a href="${reviewUrl}">${reviewUrl}</a></p>
      </div>
    `;

    try {
      await resend.emails.send({
        from: fromAddress,
        to: reviewer,
        subject: `New Ad Draft Ready for Review — ${title}`,
        html,
      });
    } catch (error) {
      console.error("[ads] send notification failed", error);
    }
  }

  return Response.json({ ok: true, id: draft.id, status: draft.status });
}
