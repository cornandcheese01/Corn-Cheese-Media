"use client";

import { useMemo, useState } from "react";

import { GlassButton, GlassButtonAction } from "@/components/ui/glass-button";
import { cn } from "@/lib/utils";
import { contact, contactPage } from "@/content/site";

/**
 * Premium contact form.
 *
 * Submission composes a formatted message and hands it to the visitor's mail
 * client, addressed to the official Corn & Cheese address — no third party
 * ever receives the enquiry, and the site needs no backend to go live. To move
 * to a server endpoint later, replace the body of `handleSubmit` with a POST;
 * the field set and validation stay as they are.
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

export function ContactForm() {
  const [values, setValues] = useState({ ...EMPTY });
  const [services, setServices] = useState<string[]>([]);
  const [touched, setTouched] = useState(false);

  const errors = useMemo(() => {
    const next: Partial<Record<keyof typeof EMPTY, string>> = {};
    if (!values.name.trim()) next.name = "Please add your name.";
    if (!values.email.trim()) next.email = "Please add an email we can reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "That email doesn't look right.";
    if (!values.message.trim()) next.message = "Tell us a little about the brand.";
    return next;
  }, [values]);

  const set = (key: keyof typeof EMPTY) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((prev) => ({ ...prev, [key]: event.target.value }));

  const toggleService = (service: string) =>
    setServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service],
    );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    if (Object.keys(errors).length > 0) return;

    const lines = [
      `Name: ${values.name}`,
      values.company && `Company: ${values.company}`,
      `Email: ${values.email}`,
      values.phone && `Phone: ${values.phone}`,
      values.link && `Website / Social: ${values.link}`,
      services.length > 0 && `Services interested in: ${services.join(", ")}`,
      "",
      values.message,
    ].filter(Boolean);

    const subject = `New enquiry — ${values.name}${values.company ? ` (${values.company})` : ""}`;
    window.location.href =
      `mailto:${contact.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  const showError = (key: keyof typeof EMPTY) => touched && errors[key];

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
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
              aria-invalid={showError(field.name) ? true : undefined}
              aria-describedby={showError(field.name) ? `${field.name}-error` : undefined}
              className={cn(inputClass, showError(field.name) && "border-brand")}
            />
            {showError(field.name) ? (
              <p id={`${field.name}-error`} className="mt-2 font-body text-[0.8rem] text-brand">
                {errors[field.name]}
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
                )}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={selected}
                  onChange={() => toggleService(service)}
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
          aria-invalid={showError("message") ? true : undefined}
          aria-describedby={showError("message") ? "message-error" : undefined}
          className={cn(inputClass, "resize-none", showError("message") && "border-brand")}
        />
        {showError("message") ? (
          <p id="message-error" className="mt-2 font-body text-[0.8rem] text-brand">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-4">
        <GlassButtonAction type="submit">Send Message</GlassButtonAction>
        <GlassButton href={`https://wa.me/${contact.whatsappHref}`}>
          WhatsApp Us
        </GlassButton>
      </div>

      <p className="mt-6 font-body text-[0.8rem] text-grey">
        Sending opens your mail app with the message ready for{" "}
        <span className="text-ink">{contact.email}</span>.
      </p>
    </form>
  );
}
