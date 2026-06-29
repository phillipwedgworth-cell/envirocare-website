import { createClient } from "@supabase/supabase-js";
import { envUrl } from "../agents/lib/env-url.mjs";

const SUPABASE_URL = envUrl("SUPABASE_URL");
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export const supabase = SUPABASE_URL && SUPABASE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;
