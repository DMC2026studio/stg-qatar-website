import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
  website?: string;
  locale?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  // Honeypot: treat as accepted without sending.
  if (body.website?.trim()) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (name.length < 2 || !emailPattern.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Name and a valid email are required." },
      { status: 400 },
    );
  }

  if (message && message.length < 20) {
    return NextResponse.json(
      { ok: false, error: "Message must be at least 20 characters when provided." },
      { status: 400 },
    );
  }

  const providerConfigured = Boolean(
    process.env.CONTACT_WEBHOOK_URL || process.env.RESEND_API_KEY,
  );

  if (!providerConfigured) {
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        error:
          "Email delivery is not configured. Set CONTACT_WEBHOOK_URL or RESEND_API_KEY on the server.",
      },
      { status: 503 },
    );
  }

  // Reserved for future provider wiring. Do not claim delivery without a real integration.
  return NextResponse.json(
    {
      ok: false,
      delivered: false,
      error:
        "An email provider variable is present, but delivery code is not connected yet. Configure the provider integration before go-live.",
    },
    { status: 501 },
  );
}
