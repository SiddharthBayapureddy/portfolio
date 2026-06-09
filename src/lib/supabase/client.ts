import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase environment variables are missing.");
  }

  let cleanUrl = url;
  try {
    const urlObj = new URL(url);
    cleanUrl = urlObj.origin;
  } catch {
    throw new Error(`Invalid Supabase URL: "${url}". It must be a full URL starting with https://`);
  }

  return createBrowserClient(cleanUrl, key);
}
