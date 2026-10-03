/**
 * Google Sheets helper — server-only.
 *
 * Authentication uses a service account. Credentials must live in .env.local
 * and must never be exposed to the client bundle. Import this file only from
 * API routes or server components.
 */

import { google } from "googleapis";

// ─── env helpers ─────────────────────────────────────────────────────────────

function requireEnv(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing required env var: ${key}`);
  return v;
}

// ─── auth ─────────────────────────────────────────────────────────────────────

function getAuth() {
  const email = requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  // Cloud env vars store \n literally; convert to real newlines.
  const key = requireEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");

  return new google.auth.GoogleAuth({
    credentials: { client_email: email, private_key: key },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

// ─── formula-injection guard ──────────────────────────────────────────────────

/**
 * Prefix any value that starts with =, +, -, or @ with a single quote so
 * Google Sheets treats it as plain text instead of a formula.
 */
function sanitize(value: string): string {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

// ─── public API ───────────────────────────────────────────────────────────────

const HEADER_ROW = [
  "Timestamp",
  "Name",
  "Company",
  "Email",
  "Phone",
  "Website / Social Link",
  "Services Interested In",
  "Message",
  "Source URL",
];

export interface EnquiryRow {
  name: string;
  company: string;
  email: string;
  phone: string;
  link: string;
  services: string[];
  message: string;
  sourceUrl: string;
}

/**
 * Appends one enquiry row to the configured Google Sheet.
 * If the tab is empty, writes the header row first.
 */
export async function appendEnquiry(data: EnquiryRow): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = requireEnv("GOOGLE_SHEET_ID");
  const tab = process.env.GOOGLE_SHEET_TAB ?? "Enquiries";
  const range = `${tab}!A1`;

  // Check whether the sheet already has content (header written before).
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${tab}!A1`,
  });

  const isEmpty =
    !existing.data.values || existing.data.values.length === 0;

  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const rows: string[][] = [];

  if (isEmpty) {
    rows.push(HEADER_ROW);
  }

  rows.push([
    timestamp,
    sanitize(data.name),
    sanitize(data.company),
    sanitize(data.email),
    sanitize(data.phone),
    sanitize(data.link),
    data.services.map(sanitize).join(", "),
    sanitize(data.message),
    data.sourceUrl,
  ]);

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: rows },
  });
}
