# Google Sheets Integration — Setup Guide

Everything below is a manual step you must do yourself. The code is already in place; these steps wire it to real credentials.

---

## Step 1 — Create a Google Cloud Project

1. Go to [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. Click **Select a project → New Project**. Name it anything (e.g. `corn-and-cheese`).
3. Open the project dashboard.

---

## Step 2 — Enable the Google Sheets API

1. In the left sidebar → **APIs & Services → Library**.
2. Search for **Google Sheets API**.
3. Click it → **Enable**.

---

## Step 3 — Create a Service Account

1. Go to **APIs & Services → Credentials**.
2. Click **Create Credentials → Service Account**.
3. Give it a name (e.g. `sheets-writer`), leave role blank, click **Done**.
4. Click the service account you just created → **Keys** tab → **Add Key → Create new key → JSON**.
5. A JSON file downloads to your computer. **Keep it secret — never commit it.**

---

## Step 4 — Create the Google Sheet

1. Go to [https://sheets.google.com/](https://sheets.google.com/) and create a new blank sheet.
2. Rename the first tab to **`Enquiries`** (right-click the tab at the bottom → Rename).
3. Copy the **Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit
   ```

---

## Step 5 — Share the Sheet with the Service Account

1. Open the downloaded JSON file. Copy the value of **`client_email`** — it looks like:
   ```
   sheets-writer@your-project.iam.gserviceaccount.com
   ```
2. In your Google Sheet, click **Share** (top-right).
3. Paste the service account email, set role to **Editor**, uncheck "Notify people", click **Share**.

---

## Step 6 — Fill in `.env.local`

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Open the downloaded JSON key file and map values:

| `.env.local` key | JSON key field |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `client_email` |
| `GOOGLE_PRIVATE_KEY` | `private_key` |
| `GOOGLE_SHEET_ID` | (from the Sheet URL) |
| `GOOGLE_SHEET_TAB` | `Enquiries` (or whatever you named the tab) |

> **Important for `GOOGLE_PRIVATE_KEY`:** The JSON file contains literal `\n` inside the key string. In `.env.local`, the value must be wrapped in double quotes exactly as it appears in the JSON, e.g.:
> ```env
> GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
> ```
> The code handles the `\n to newline` conversion automatically.

---

## Step 7 — Run Locally

```bash
npm run dev
```

Then open http://localhost:3000/contact and submit the form. Check the Google Sheet for the new row.

---

## Step 8 — Deploy to Vercel

In your Vercel project:

1. Go to **Settings → Environment Variables**.
2. Add all four variables:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SHEET_TAB`
3. Set the **Environment** to **Production** (and Preview if you want it on preview deploys too).
4. Redeploy.

> **Never paste credentials into your code or commit `.env.local`.**
> The file is already covered by `.gitignore` via the `.env*.local` glob.

---

## Quick Sanity Check — curl Tests

After `npm run dev`, run these from a separate terminal:

### Valid submission
```bash
curl -s -X POST http://localhost:3000/api/enquiry \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"message\":\"Hello from curl\",\"company\":\"\",\"phone\":\"\",\"link\":\"\",\"services\":[]}" \
  | python -m json.tool
```
Expected: `{"success": true}`

### Validation error (missing required fields)
```bash
curl -s -X POST http://localhost:3000/api/enquiry \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"\",\"email\":\"not-an-email\",\"message\":\"\"}" \
  | python -m json.tool
```
Expected: `{"success": false, "errors": { "name": [...], "email": [...], "message": [...] }}`

### Honeypot (bot fill-in)
```bash
curl -s -X POST http://localhost:3000/api/enquiry \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Bot\",\"email\":\"bot@spam.com\",\"message\":\"Buy now!\",\"website\":\"http://spam.com\",\"company\":\"\",\"phone\":\"\",\"link\":\"\",\"services\":[]}" \
  | python -m json.tool
```
Expected: `{"success": true}` — fake success, nothing written to the sheet.

### Method not allowed
```bash
curl -s -X GET http://localhost:3000/api/enquiry | python -m json.tool
```
Expected: `{"message": "Method Not Allowed"}` with HTTP 405.
