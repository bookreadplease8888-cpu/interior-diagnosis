import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function getBrowserSupabase() {
  if (!url || !anon) throw new Error("Supabase public env is missing");
  return createClient(url, anon);
}

export function getAdminSupabase() {
  if (!url || !serviceRole) throw new Error("Supabase service role env is missing");
  return createClient(url, serviceRole, { auth: { autoRefreshToken: false, persistSession: false } });
}
