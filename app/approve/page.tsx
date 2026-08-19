// app/approve/page.tsx
// Live approval console. Source of truth = Supabase approval_queue.
// Bookmark this on your phone/tablet WITH the key:  /approve?k=YOUR_KEY
import { createClient } from "@supabase/supabase-js";
import { cleanEnv } from "@/lib/env-url";
import QueueClient, { type Item } from "./QueueClient";

export const dynamic = "force-dynamic"; // never cache — always fresh

// Internal tool — keep out of search engines entirely.
export const metadata = {
  robots: { index: false, follow: false },
};

const RISK_ORDER: Record<string, number> = { red: 0, yellow: 1, green: 2 };

export default async function ApprovePage({
  searchParams,
}: {
  searchParams: Promise<{ k?: string }>;
}) {
  const { k } = await searchParams;
  // Read through cleanEnv for the same reason /api/quote does: a key pasted into
  // the Vercel dashboard can carry a trailing newline or a zero-width character
  // that is invisible in the field and makes an exact === comparison fail. The
  // symptom is "my key does not work" with a key that is, in fact, correct.
  const key = cleanEnv("APPROVE_KEY");

  // Minimal gate for a single-user internal tool.
  if (!key || (k ?? "").trim() !== key) {
    return (
      <main className="min-h-dvh grid place-items-center bg-[#f6f8f5] px-6 text-center">
        <div>
          <p className="text-lg font-semibold text-[#14532d]">Approval console</p>
          <p className="mt-2 text-sm text-neutral-500">
            Add your key to the address: <code>/approve?k=…</code>
          </p>
        </div>
      </main>
    );
  }

  // SUPABASE_SERVICE_ROLE_KEY -> SUPABASE_KEY, the same fallback /api/quote and
  // /api/chat already use. Two call sites carried the fallback and two did not;
  // these were the two, which is why this console returned "Invalid API key"
  // while the quote and chat routes kept writing rows against the same database.
  const supabaseUrl = cleanEnv("SUPABASE_URL");
  const supabaseKey =
    cleanEnv("SUPABASE_SERVICE_ROLE_KEY") || cleanEnv("SUPABASE_KEY");

  if (!supabaseUrl || !supabaseKey) {
    return (
      <main className="min-h-dvh grid place-items-center bg-[#f6f8f5] px-6 text-center">
        <div>
          <p className="text-lg font-semibold text-red-700">Queue not configured</p>
          <p className="mt-2 text-sm text-neutral-500">
            Missing {!supabaseUrl ? "SUPABASE_URL" : "SUPABASE_SERVICE_ROLE_KEY or SUPABASE_KEY"}.
          </p>
        </div>
      </main>
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("approval_queue")
    .select("*")
    .in("status", ["pending", "failed"])
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-dvh grid place-items-center bg-[#f6f8f5] px-6 text-center">
        <div>
          <p className="text-lg font-semibold text-red-700">Couldn’t load the queue</p>
          <p className="mt-2 text-sm text-neutral-500">{error.message}</p>
          <p className="mt-1 text-xs text-neutral-400">
            Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_KEY) in Vercel.
          </p>
        </div>
      </main>
    );
  }

  const items = (data ?? []).sort((a, b) => {
    // failed first (loud), then by risk, then newest
    if (a.status !== b.status) return a.status === "failed" ? -1 : 1;
    const r = (RISK_ORDER[a.risk] ?? 3) - (RISK_ORDER[b.risk] ?? 3);
    if (r !== 0) return r;
    return b.created_at.localeCompare(a.created_at);
  }) as Item[];

  return <QueueClient items={items} apiKey={key} />;
}
