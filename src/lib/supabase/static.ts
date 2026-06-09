import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function createStaticClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error("Supabase environment variables are missing.");
    return null;
  }

  // Basic validation and cleanup to prevent "Invalid path specified in request URL"
  let cleanUrl = url;
  try {
    const urlObj = new URL(url);
    // Supabase client expects the base URL (e.g., https://xyz.supabase.co), 
    // not the REST endpoint (https://xyz.supabase.co/rest/v1).
    if (urlObj.pathname.includes("/rest/v1")) {
      cleanUrl = urlObj.origin;
    } else {
      // Ensure no trailing slash
      cleanUrl = urlObj.origin;
    }
  } catch {
    console.error(`Invalid Supabase URL provided: "${url}". Ensure it includes the protocol (https://).`);
    return null;
  }

  if (!client) {
    client = createClient(cleanUrl, key);
  }

  return client;
}
