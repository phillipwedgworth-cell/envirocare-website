import { supabase } from "@/lib/supabase.mjs";

export const AD_DRAFTS_TABLE = "agent_drafts";

export interface AdDraft {
  id: string;
  agent_name: string;
  title: string;
  body: string;
  cta: string;
  landing_url: string;
  status: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export async function createAdDraft(draft: Omit<AdDraft, "created_at" | "updated_at" | "status"> & { status?: string }) {
  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

  const row = {
    ...draft,
    status: draft.status ?? "pending-review",
    metadata: draft.metadata ?? {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from(AD_DRAFTS_TABLE)
    .insert(row)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as AdDraft;
}

export async function getAdDraftById(id: string) {
  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

  const { data, error } = await supabase
    .from<AdDraft>(AD_DRAFTS_TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }

  return data;
}

export async function updateAdDraftStatus(id: string, status: string) {
  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

  const { data, error } = await supabase
    .from<AdDraft>(AD_DRAFTS_TABLE)
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function appendAdDraftFeedback(id: string, feedback: string) {
  const existing = await getAdDraftById(id);
  if (!existing) {
    return null;
  }

  const metadata = {
    ...(existing.metadata ?? {}),
    feedback: [
      ...(Array.isArray((existing.metadata as Record<string, unknown>)?.feedback)
        ? (existing.metadata as Record<string, unknown>).feedback
        : []),
      { message: feedback, submitted_at: new Date().toISOString() },
    ],
  } as Record<string, unknown>;

  if (!supabase) {
    throw new Error("Supabase is not configured");
  }

  const { data, error } = await supabase
    .from<AdDraft>(AD_DRAFTS_TABLE)
    .update({ metadata, status: "needs-changes", updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
