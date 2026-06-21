// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/lib/memory.mjs
// Commit: feat(agents): long-term memory helper (remember/recall) on agent_memory
// Push: main
// ─────────────────────────────────────
//
// Lets an agent KEEP what it learns instead of rediscovering it every run.
// Writes/reads the existing `agent_memory` table (created by
// agents/supabase-scaling-schema.sql). Text mode — no embeddings required, so
// it works whether or not pgvector is enabled. Embeddings are a later upgrade.
//
//   remember(agent, content, { type, metadata, expiresAt })  -> store a lesson
//   recall(agent, { type, like, limit })                     -> get past lessons
//
// Never throws. If the table doesn't exist yet, recall returns [] and remember
// returns false (run supabase-scaling-schema.sql to enable it).

import { supabase } from './supabase.mjs';

export async function remember(agentName, content, { type = 'fact', metadata = {}, expiresAt = null } = {}) {
  if (!supabase || !agentName || !content) return false;
  try {
    const { error } = await supabase.from('agent_memory').insert({
      agent_name: agentName, memory_type: type, content,
      metadata, expires_at: expiresAt,            // embedding left null (text mode)
    });
    if (error) { console.warn(`[memory] remember: ${error.message}`); return false; }
    return true;
  } catch (e) { console.warn(`[memory] remember: ${e.message}`); return false; }
}

export async function recall(agentName, { type = null, like = null, limit = 5 } = {}) {
  if (!supabase || !agentName) return [];
  try {
    let q = supabase.from('agent_memory').select('content,metadata,created_at')
      .eq('agent_name', agentName).order('created_at', { ascending: false }).limit(limit);
    if (type) q = q.eq('memory_type', type);
    if (like) q = q.ilike('content', `%${like}%`);
    const { data, error } = await q;
    if (error) { console.warn(`[memory] recall: ${error.message}`); return []; }
    return data ?? [];
  } catch (e) { console.warn(`[memory] recall: ${e.message}`); return []; }
}
