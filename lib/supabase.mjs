import { createClient } from "@supabase/supabase-js";
import { cleanEnv } from "../agents/lib/cleanEnv.mjs";

const SUPABASE_URL = cleanEnv(process.env.SUPABASE_URL);
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export const supabase = SUPABASE_URL && SUPABASE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;
