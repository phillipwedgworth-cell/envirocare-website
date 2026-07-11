// POST /api/social-approve — the Command Center's approve/skip action for
// queued social posts. Plain HTML-form target (no client JS on the cockpit):
// validates the same COMMAND_CENTER_KEY gate as the page, flips a DRAFT row in
// social_posts to 'approved' (poster publishes it on schedule) or 'skipped',
// then 303s back to the cockpit. Fails closed if the key env var is unset.
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const key = String(form.get('key') ?? '');
  const id = String(form.get('id') ?? '');
  const action = String(form.get('action') ?? '');

  const gate = process.env.COMMAND_CENTER_KEY;
  if (!gate || key !== gate) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  if (!id || (action !== 'approve' && action !== 'skip')) {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }

  const url = process.env.SUPABASE_URL, sbKey = process.env.SUPABASE_KEY;
  if (!url || !sbKey) {
    return NextResponse.json({ error: 'supabase not configured' }, { status: 500 });
  }
  const sb = createClient(url, sbKey);

  // Only a 'draft' row may be decided here — approved/posted/failed rows are
  // owned by the poster. The .eq guard makes double-submits harmless.
  const { error } = await sb
    .from('social_posts')
    .update({
      status: action === 'approve' ? 'approved' : 'skipped',
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('status', 'draft');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Back to the cockpit (same key), anchored at the approval panel.
  const back = new URL('/command-center', req.nextUrl.origin);
  back.searchParams.set('key', key);
  back.hash = 'approvals';
  return NextResponse.redirect(back, 303);
}
