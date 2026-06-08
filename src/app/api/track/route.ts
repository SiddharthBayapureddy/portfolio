import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const { path, referrer } = await req.json();

    if (!path || typeof path !== "string") {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const userAgent = req.headers.get("user-agent") ?? "";

    const supabase = createAdminClient();
    const { error } = await supabase.from("page_views").insert({
      path,
      referrer: referrer ?? null,
      user_agent: userAgent,
    });

    if (error) {
      console.error("Failed to track page view:", error.message);
      return NextResponse.json({ error: "Tracking failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
