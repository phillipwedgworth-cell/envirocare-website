// app/approve/page.tsx
// Live approval console. Source of truth = Supabase approval_queue.
// Bookmark this on your phone/tablet WITH the key:  /approve?k=YOUR_KEY
import { createClient } from "@supabase/supabase-js";
import QueueClient, { type Item } from "./QueueClient";

export const dynamic = "force-dynamic"; // never cache — always fresh

const RISK_ORDER: Record<string, number> = { red: 0, yellow: 1, green: 2 };

export default async function ApprovePage({
  searchParams,
}: {
  searchParams: Promise<{ k?: string }>;
}) {
  const { k } = await searchParams;
  const key = process.env.APPROVE_KEY;

  // Minimal gate for a single-user internal tool.
  if (!key || k !== key) {
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

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

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
            Check SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in Vercel.
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
