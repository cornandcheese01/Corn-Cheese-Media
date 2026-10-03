/**
 * POST /api/enquiry
 *
 * Validates the enquiry form payload, applies spam/rate-limit protection,
 * then appends a row to Google Sheets via a service account.
 *
 * The browser never sees the spreadsheet ID or credentials — they are
 * only read server-side from environment variables.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { appendEnquiry } from "@/lib/googleSheets";
import { isRateLimited } from "@/lib/rateLimiter";

// ─── Zod schema ───────────────────────────────────────────────────────────────

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please add your name.")
    .max(100, "Name is too long."),

  company: z.string().trim().max(100, "Company name is too long.").optional().default(""),

  email: z
    .string()
    .trim()
    .min(1, "Please add an email we can reply to.")
    .email("That email doesn't look right.")
    .max(254, "Email is too long."),

  phone: z
    .string()
    .trim()
    .max(20, "Phone number is too long.")
    .optional()
    .default("")
    .refine(
      (v) => v === "" || /^[+\d\s\-()\u2013\u2014]+$/.test(v),
      "Phone number contains invalid characters.",
    ),

  link: z
    .string()
    .trim()
    .max(500, "Link is too long.")
    .optional()
    .default(""),

  services: z.array(z.string().trim().max(100)).optional().default([]),

  message: z
    .string()
    .trim()
    .min(1, "Tell us a little about the brand.")
    .max(5000, "Message is too long."),

  // Hidden honeypot — bots fill this in, humans don't see it.
  website: z.string().optional().default(""),
});

// ─── Helper: extract IP ───────────────────────────────────────────────────────

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // 1. Rate limiting
  const ip = getIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  // 2. Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  // 3. Validate
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  const { website, ...data } = parsed.data;

  // 4. Honeypot check — silently succeed so bots learn nothing
  if (website) {
    return NextResponse.json({ success: true });
  }

  // 5. Write to Google Sheets
  try {
    const sourceUrl =
      req.headers.get("referer") ?? req.headers.get("origin") ?? "";

    await appendEnquiry({
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      link: data.link,
      services: data.services,
      message: data.message,
      sourceUrl,
    });
  } catch (err) {
    // Log server-side only — never expose internal errors to the client.
    console.error("[enquiry] Google Sheets write failed:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}

// Reject every non-POST method.
export function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
export { GET as PUT, GET as PATCH, GET as DELETE };
