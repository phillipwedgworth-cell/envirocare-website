// app/api/approve/route.ts
// Records your decision. Does NOT execute the action — a separate
// executor (agent / GitHub Action) reads status='approved' and ships,
// then flips to 'shipped' or 'failed'. 'failed' resurfaces on /approve in red.
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cleanEnv } from "@/lib/env-url";

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

  // cleanEnv on both sides -- see the note in app/approve/page.tsx. A key that is
  // right but carries an invisible character fails === and reads as "unauthorized",
  // which is indistinguishable from a wrong key at the UI.
  const approveKey = cleanEnv("APPROVE_KEY");
  if (!approveKey || (key ?? "").trim() !== approveKey) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!id || !decision || !VALID.has(decision)) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  // Same SERVICE_ROLE_KEY -> SUPABASE_KEY fallback as /api/quote and /api/chat.
  // Without it this route 500s against a live database, and the console reports
  // the failure as if the decision had been saved.
  const supabaseUrl = cleanEnv("SUPABASE_URL");
  const supabaseKey =
    cleanEnv("SUPABASE_SERVICE_ROLE_KEY") || cleanEnv("SUPABASE_KEY");

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: "supabase not configured (SUPABASE_URL + SERVICE_ROLE_KEY or SUPABASE_KEY)" },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

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
