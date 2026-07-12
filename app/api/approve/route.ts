// app/api/approve/route.ts
// Records your decision. Does NOT execute the action — a separate
// executor (agent / GitHub Action) reads status='approved' and ships,
// then flips to 'shipped' or 'failed'. 'failed' resurfaces on /approve in red.
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const VALID = new Set(["approved", "fix", "skip"]);

export async function POST(req: Request) {
  let body: { id?: string; decision?: string; note?: string; key?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const { id, decision, note, key } = body;

  if (!key || key !== process.env.APPROVE_KEY) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!id || !decision || !VALID.has(decision)) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { error } = await supabase
    .from("approval_queue")
    .update({
      status: decision, // 'approved' | 'fix' | 'skip'
      decided_at: new Date().toISOString(),
      decision_note: note ?? null,
    })
    .eq("id", id)
    .in("status", ["pending", "failed"]); // don't re-decide something already handled

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
