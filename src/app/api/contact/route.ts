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

    const { name, email, message } = body;

    if (
      !name ||
      typeof name !== "string" ||
      !email ||
      typeof email !== "string" ||
      !message ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    let supabase;
    try {
      supabase = createAdminClient();
    } catch (err) {
      console.error("Supabase admin configuration error:", err);
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    const { error } = await supabase.from("contact_submissions").insert({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    if (error) {
      console.error("Failed to submit contact form:", error.message);
      return NextResponse.json(
        { error: "Failed to save message to database." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error in contact API:", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
