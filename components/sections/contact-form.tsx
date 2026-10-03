"use client";

import { useMemo, useState } from "react";

import { GlassButton, GlassButtonAction } from "@/components/ui/glass-button";
import { cn } from "@/lib/utils";
import { contact, contactPage } from "@/content/site";

/**
 * Premium contact form.
 *
 * On submit, POSTs to /api/enquiry which writes the row to Google Sheets
 * via a server-side service account. No credentials are ever sent to the
 * browser.
 *
 * Spam protection (honeypot + server rate limiting) is handled in the API
 * route. Client-side validation mirrors the server schema so the user gets
 * instant feedback without a round-trip.
 */

type Field = {
  name: keyof typeof EMPTY;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
};

const EMPTY = {
  name: "",
  company: "",
  email: "",
  phone: "",
  link: "",
  message: "",
};

const FIELDS: Field[] = [
  { name: "name", label: "Name", required: true, autoComplete: "name" },
  { name: "company", label: "Company", autoComplete: "organization" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  {
    name: "link",
    label: "Website / Social link",
    placeholder: "https://",
    autoComplete: "url",
  },
];

const inputClass =
  "peer w-full border-0 border-b border-line bg-transparent pb-3 pt-2 font-body text-[1.0625rem] " +
  "text-ink outline-none transition-colors duration-400 ease-brand placeholder:text-line " +
  "focus:border-brand hover:border-grey";

// ─── server-side field error shape ────────────────────────────────────────────
type ServerErrors = Partial<Record<keyof typeof EMPTY | "services" | "general", string[]>>;

export function ContactForm() {
  const [values, setValues] = useState({ ...EMPTY });
  const [services, setServices] = useState<string[]>([]);
  const [touched, setTouched] = useState(false);

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverErrors, setServerErrors] = useState<ServerErrors>({});
  const [generalError, setGeneralError] = useState("");

  // ── client-side validation (mirrors the Zod schema) ──────────────────────
  const errors = useMemo(() => {
    const next: Partial<Record<keyof typeof EMPTY, string>> = {};
    if (!values.name.trim()) next.name = "Please add your name.";
    if (!values.email.trim()) next.email = "Please add an email we can reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "That email doesn't look right.";
    if (!values.message.trim()) next.message = "Tell us a little about the brand.";
    return next;
  }, [values]);

  const set =
    (key: keyof typeof EMPTY) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((prev) => ({ ...prev, [key]: event.target.value }));

  const toggleService = (service: string) =>
    setServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service],
    );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    setServerErrors({});
    setGeneralError("");

    // Read honeypot value directly from the DOM (not in React state).
    const formEl = event.currentTarget;
    const honeypot = (formEl.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, services, website: honeypot }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setSubmitted(true);
        setValues({ ...EMPTY });
        setServices([]);
        setTouched(false);
      } else if (res.status === 400 && json.errors) {
        setServerErrors(json.errors as ServerErrors);
      } else {
        setGeneralError(
          json.message ?? "Something went wrong. Please try again or reach out directly.",
        );
      }
    } catch {
      setGeneralError("Could not reach the server. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const showError = (key: keyof typeof EMPTY) =>
    (touched && errors[key]) || serverErrors[key]?.[0];

  // ── success state ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="w-full py-8">
        <p className="mb-3 font-display text-[1.25rem] font-semibold tracking-tight text-ink">
          Message received — thank you!
        </p>
        <p className="font-body text-[1rem] text-grey">
          We&apos;ll get back to you at <span className="text-ink">{contact.email}</span> shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 font-body text-[0.875rem] text-brand underline-offset-2 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      {/* ── Honeypot — visually hidden, never filled by real users ── */}
      <div aria-hidden="true" className="absolute left-[-9999px] overflow-hidden" tabIndex={-1}>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.name} className={field.name === "link" ? "sm:col-span-2" : undefined}>
            <label
              htmlFor={field.name}
              className="mb-2 block font-display text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-grey"
            >
              {field.label}
              {field.required ? <span className="ml-1 text-brand">*</span> : null}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type ?? "text"}
              value={values[field.name]}
              onChange={set(field.name)}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              disabled={submitting}
              aria-invalid={showError(field.name) ? true : undefined}
              aria-describedby={showError(field.name) ? `${field.name}-error` : undefined}
              className={cn(inputClass, showError(field.name) && "border-brand")}
            />
            {showError(field.name) ? (
              <p id={`${field.name}-error`} className="mt-2 font-body text-[0.8rem] text-brand">
                {showError(field.name)}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      {/* Services interested in */}
      <fieldset className="mt-12">
        <legend className="mb-5 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-grey">
          Services interested in
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {contactPage.serviceOptions.map((service) => {
            const selected = services.includes(service);
            return (
              <label
                key={service}
                data-cursor="hover"
                className={cn(
                  "cursor-pointer select-none rounded-[2px] border px-4 py-2.5 font-body text-[0.875rem] transition-[background-color,border-color,color] duration-400 ease-brand",
                  selected
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-white text-grey hover:border-grey hover:text-ink",
                  submitting && "pointer-events-none opacity-60",
                )}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={selected}
                  onChange={() => toggleService(service)}
                  disabled={submitting}
                />
                {service}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Message */}
      <div className="mt-12">
        <label
          htmlFor="message"
          className="mb-2 block font-display text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-grey"
        >
          Message<span className="ml-1 text-brand">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={set("message")}
          placeholder="Where is the brand stuck, or where is it ready to grow?"
          disabled={submitting}
          aria-invalid={showError("message") ? true : undefined}
          aria-describedby={showError("message") ? "message-error" : undefined}
          className={cn(inputClass, "resize-none", showError("message") && "border-brand")}
        />
        {showError("message") ? (
          <p id="message-error" className="mt-2 font-body text-[0.8rem] text-brand">
            {errors.message ?? serverErrors.message?.[0]}
          </p>
        ) : null}
      </div>

      {/* General server error */}
      {generalError ? (
        <p role="alert" className="mt-6 font-body text-[0.875rem] text-brand">
          {generalError}
        </p>
      ) : null}

      <div className="mt-12 flex flex-wrap items-center gap-4">
        <GlassButtonAction type="submit" disabled={submitting}>
          {submitting ? "Sending…" : "Send Message"}
        </GlassButtonAction>
        <GlassButton href={`https://wa.me/${contact.whatsappHref}`}>
          WhatsApp Us
        </GlassButton>
      </div>
    </form>
  );
}
