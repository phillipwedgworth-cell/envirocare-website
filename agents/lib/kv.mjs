// agents/lib/kv.mjs
// Shared state layer — all agents read/write here
// Uses Supabase in production, local JSON file in dev

import fs from "fs/promises";
import { supabase } from "./supabase.mjs";

const IS_LOCAL = !supabase;
const LOCAL_STATE_FILE = "/tmp/agent-state.json";

export async function stateGet(key) {
  if (IS_LOCAL) {
    try {
      const raw = await fs.readFile(LOCAL_STATE_FILE, "utf8");
      return JSON.parse(raw)[key] ?? null;
    } catch {
      return null;
    }
  }
  const { data, error } = await supabase
    .from("agent_state")
    .select("value")
    .eq("key", key)
    .single();
  if (error && error.code !== "PGRST116") {
    console.error(`[kv] stateGet error: ${error.message}`);
  }
  return data?.value ?? null;
}

export async function stateSet(key, value) {
  if (IS_LOCAL) {
    let store = {};
    try {
      store = JSON.parse(await fs.readFile(LOCAL_STATE_FILE, "utf8"));
    } catch {}
    store[key] = value;
    await fs.writeFile(LOCAL_STATE_FILE, JSON.stringify(store, null, 2));
    return;
  }
  const { error } = await supabase
    .from("agent_state")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
  if (error) console.error(`[kv] stateSet error: ${error.message}`);
}

export async function stateGetAll(prefix) {
  if (IS_LOCAL) {
    try {
      const raw = await fs.readFile(LOCAL_STATE_FILE, "utf8");
      const store = JSON.parse(raw);
      return Object.fromEntries(
        Object.entries(store).filter(([k]) => k.startsWith(prefix))
      );
    } catch {
      return {};
    }
  }
  const { data, error } = await supabase
    .from("agent_state")
    .select("key, value")
    .like("key", `${prefix}%`);
  if (error) {
    console.error(`[kv] stateGetAll error: ${error.message}`);
    return {};
  }
  return Object.fromEntries((data ?? []).map(r => [r.key, r.value]));
}
