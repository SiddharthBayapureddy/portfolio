import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase admin credentials are not configured.");
  }

  let cleanUrl = url;
  try {
    const urlObj = new URL(url);
    cleanUrl = urlObj.origin;
  } catch {
    throw new Error(`Invalid Supabase URL: "${url}". It must start with https://`);
  }

  return createClient(cleanUrl, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
