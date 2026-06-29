import { createClient } from "@supabase/supabase-js";
import { envUrl } from "../agents/lib/env-url.mjs";

// envUrl() strips a stray BOM/whitespace so a pasted SUPABASE_URL can't silently
// break every client call (same class of bug that broke FORMSPREE_LEAD_URL).
const SUPABASE_URL = envUrl("SUPABASE_URL") || undefined;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export const supabase = SUPABASE_URL && SUPABASE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;
