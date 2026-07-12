/**
 * Approval decision recorder. Server-side only (service role). Gated by APPROVE_KEY.
 * POST { id, decision: 'approved'|'fix'|'skipped', note?, k }
 * Records the decision on approval_queue. Does NOT ship anything — a separate
 * executor polls status='approved' and performs the merge / launch / post / reply.
 */
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 15;

const GATE = process.env.APPROVE_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

const ALLOWED = new Set(['approved', 'fix', 'skipped']);

export async function POST(req: Request) {
  try {
    if (!GATE) return NextResponse.json({ ok: false, error: 'APPROVE_KEY not set' }, { status: 500 });
    if (!SUPABASE_URL || !SUPABASE_KEY) return NextResponse.json({ ok: false, error: 'Supabase not configured' }, { status: 500 });

    const body = await req.json().catch(() => ({}));
    const { id, decision, note, k } = body as { id?: number; decision?: string; note?: string; k?: string };

    if (k !== GATE) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
    if (typeof id !== 'number' || !decision || !ALLOWED.has(decision))
      return NextResponse.json({ ok: false, error: 'bad request' }, { status: 400 });

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const { error } = await supabase
      .from('approval_queue')
      .update({
        status: decision,                              // 'approved' | 'fix' | 'skipped'
        decision_note: decision === 'fix' ? (note ?? '') : null,
        decided_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, id, decision });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
