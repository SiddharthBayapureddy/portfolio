import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { path, referrer } = body;

    if (!path || typeof path !== "string") {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const userAgent = req.headers.get("user-agent") ?? "";

    let supabase;
    try {
      supabase = createAdminClient();
    } catch (err) {
      console.error("Supabase admin configuration error:", err);
      // We don't return 500 for tracking errors to avoid breaking the frontend
      return NextResponse.json({ error: "Tracking configuration error" }, { status: 500 });
    }

    const { error } = await supabase.from("page_views").insert({
      path,
      referrer: referrer ?? null,
      user_agent: userAgent,
    });

    if (error) {
      console.error("Failed to track page view:", error.message);
      return NextResponse.json({ error: "Database insert failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error in tracking API:", err);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
