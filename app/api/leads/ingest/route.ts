// POST /api/leads/ingest — the Gmail relay hands one Sameday email to the Lead
// Coordinator. Header `x-leads-key` must equal LEADS_INGEST_KEY (Vercel env).
// Body: { subject, body, receivedAt, messageId }. Idempotent per Sameday conversation.
// Relay script: docs/lead-coordinator/gmail-relay.gs
import { NextResponse } from 'next/server';
import { ingestSamedayEmail, keyMatches } from '@/lib/leads/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!keyMatches(request.headers.get('x-leads-key'), 'LEADS_INGEST_KEY')) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'body must be JSON' }, { status: 400 });
  }
  const subject = String(payload.subject ?? '');
  const body = String(payload.body ?? '');
  if (!body) return NextResponse.json({ ok: false, error: 'body is required' }, { status: 400 });

  const result = await ingestSamedayEmail({
    subject,
    body: body.slice(0, 20_000),
    receivedAt: String(payload.receivedAt ?? ''),
    messageId: payload.messageId ? String(payload.messageId) : undefined,
  });
  // 200 for created / already-had-it / not-a-call, so the relay labels the email
  // and moves on. 500 only when the lead could not be stored — the relay retries.
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
