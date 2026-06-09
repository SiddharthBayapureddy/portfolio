import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { name, message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "A message is required. Don't leave me hanging." },
        { status: 400 }
      );
    }

    const senderName = name?.trim() || "An Anonymous Vibecoder";

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
      console.error("SMTP credentials are not configured in environment variables.");
      return NextResponse.json(
        { error: "Server configuration error. Hit me up on LinkedIn instead." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const mailOptions = {
      from: `"${senderName}" <${user}>`, // Spoofing the 'from' name, but email is your own to avoid spam filters
      to: user, // Send to yourself
      subject: `Portfolio Message from ${senderName}`,
      text: `You received a new message from your portfolio contact form:\n\nName: ${senderName}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error in contact API:", err);
    return NextResponse.json(
      { error: "Failed to beam message into the ether. Try again?" },
      { status: 500 }
    );
  }
}
