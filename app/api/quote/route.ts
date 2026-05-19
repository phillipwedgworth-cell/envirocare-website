import { Resend } from 'resend';
import { officeForZip } from '@/data/zip-to-office';

const SERVICES = [
  'Pest Control (bi-monthly)',
  'Termite / Sentricon®',
  'Mosquito Control',
  'Tick Control',
  'Fire Ant Control',
  'Flea Control',
  'Builder Pre-Treat',
  'Real Estate / WDO Letter',
  'Crawlspace Service',
  'Commercial Service',
  'Not sure yet',
];

function isValidService(s: string) {
  return SERVICES.includes(s) || s === '';
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: 'Email service not configured' }, { status: 500 });
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, phone, email, address, zip, plan, service, message } = body;

  if (!name?.trim() || !phone?.trim() || !email?.trim() || !zip?.trim()) {
    return Response.json({ error: 'Name, phone, email, and ZIP are required' }, { status: 422 });
  }

  if (!/^\d{5}$/.test(zip.trim())) {
    return Response.json({ error: 'ZIP must be 5 digits' }, { status: 422 });
  }

  if (!isValidService(service || '')) {
    return Response.json({ error: 'Invalid service selection' }, { status: 422 });
  }

  const office = officeForZip(zip.trim());
  const subject = `[${office.name}] New Lead: ${name.trim()} — ${plan || 'Not sure'}`;

  const html = `
<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#1A1A1A">
  <div style="background:#0E8E40;padding:20px 24px;border-radius:8px 8px 0 0">
    <h2 style="margin:0;color:#fff;font-size:18px">New Quote Request</h2>
    <p style="margin:4px 0 0;color:rgba(255,255,255,0.85);font-size:14px">Routed to: ${office.name} · ${office.phoneDisplay}</p>
  </div>
  <div style="border:1px solid #E8E2D8;border-top:none;padding:24px;border-radius:0 0 8px 8px">
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="padding:8px 0;color:#5A6660;width:130px">Name</td><td style="padding:8px 0;font-weight:600">${name.trim()}</td></tr>
      <tr><td style="padding:8px 0;color:#5A6660">Phone</td><td style="padding:8px 0;font-weight:600">${phone.trim()}</td></tr>
      <tr><td style="padding:8px 0;color:#5A6660">Email</td><td style="padding:8px 0">${email.trim()}</td></tr>
      ${address?.trim() ? `<tr><td style="padding:8px 0;color:#5A6660">Address</td><td style="padding:8px 0">${address.trim()}</td></tr>` : ''}
      <tr><td style="padding:8px 0;color:#5A6660">ZIP</td><td style="padding:8px 0">${zip.trim()}</td></tr>
      <tr><td style="padding:8px 0;color:#5A6660">Plan</td><td style="padding:8px 0">${plan || 'Not sure'}</td></tr>
      <tr><td style="padding:8px 0;color:#5A6660">Service</td><td style="padding:8px 0">${service || 'Not specified'}</td></tr>
    </table>
    ${message?.trim() ? `<div style="margin-top:16px;padding:14px;background:#FAFAFA;border-radius:6px;font-size:14px;line-height:1.6"><strong>Message:</strong><br>${message.trim()}</div>` : ''}
    <hr style="margin:20px 0;border:none;border-top:1px solid #E8E2D8">
    <p style="font-size:12px;color:#5A6660;margin:0">Submitted via envirocarellc.com/request-quote · ZIP routed to ${office.name}</p>
  </div>
</div>`;

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.LEAD_INBOX_EMAIL || 'service@envirocarellc.com',
      replyTo: email.trim(),
      subject,
      html,
    });
  } catch (err) {
    console.error('Resend error:', err);
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return Response.json({ ok: true, office: office.name });
}
