"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type FormErrors = Partial<Record<"name" | "email" | "phone" | "travelers" | "tourType" | "message", string>>;

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  function clearFieldError(event: ChangeEvent<HTMLFormElement>) {
    const field = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    if (!field.name || !errors[field.name as keyof FormErrors]) return;
    setErrors((current) => ({ ...current, [field.name]: undefined }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const travelers = String(form.get("travelers") || "").trim();
    const tourType = String(form.get("tourType") || "");
    const message = String(form.get("message") || "").trim();
    const nextErrors: FormErrors = {};

    if (name.length < 2) nextErrors.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email address.";
    if (phone && phone.replace(/\D/g, "").length < 7) nextErrors.phone = "Please enter a valid phone or WhatsApp number.";
    if (travelers && (!/^\d+$/.test(travelers) || Number(travelers) < 1 || Number(travelers) > 50)) nextErrors.travelers = "Please enter between 1 and 50 travelers.";
    if (!tourType) nextErrors.tourType = "Please select a tour type.";
    if (message.length < 10) nextErrors.message = "Please tell us a little more about your travel plans.";

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setSent(false);
      const firstInvalid = event.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`);
      firstInvalid?.focus();
      return;
    }

    setErrors({});
    const subject = encodeURIComponent("Sri Lanka tour inquiry from " + (form.get("name") || "a guest"));
    const body = encodeURIComponent(
      [
        `Full Name: ${form.get("name") || ""}`,
        `Email Address: ${form.get("email") || ""}`,
        `WhatsApp / Phone Number: ${form.get("phone") || ""}`,
        `Travel Dates: ${form.get("dates") || ""}`,
        `Number of Travelers: ${form.get("travelers") || ""}`,
        `Type of Tour Interested In: ${form.get("tourType") || ""}`,
        "",
        String(form.get("message") || ""),
      ].join("\n"),
    );
    setSent(true);
    window.location.href = `mailto:info@minolilankatours.com?subject=${subject}&body=${body}`;
  }

  return (
    <form className={`inquiry-form ${compact ? "compact" : ""}`} onSubmit={submit} onChange={clearFieldError} noValidate>
      {Object.keys(errors).length > 0 && <p className="form-error-summary" role="alert">Please check the highlighted fields and try again.</p>}
      <div className="form-grid">
        <label>
          Full Name *
          <input name="name" autoComplete="name" maxLength={100} required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
          {errors.name && <span className="field-error" id="name-error">{errors.name}</span>}
        </label>
        <label>
          Email Address *
          <input name="email" type="email" autoComplete="email" maxLength={160} required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email && <span className="field-error" id="email-error">{errors.email}</span>}
        </label>
        <label>
          WhatsApp / Phone Number
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={30} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
          {errors.phone && <span className="field-error" id="phone-error">{errors.phone}</span>}
        </label>
        <label>
          Travel Dates (if known)
          <input name="dates" maxLength={100} placeholder="e.g. 12–22 December" />
        </label>
        <label>
          Number of Travelers
          <input name="travelers" type="number" min="1" max="50" inputMode="numeric" aria-invalid={Boolean(errors.travelers)} aria-describedby={errors.travelers ? "travelers-error" : undefined} />
          {errors.travelers && <span className="field-error" id="travelers-error">{errors.travelers}</span>}
        </label>
        <label>
          Type of Tour Interested In *
          <select name="tourType" defaultValue="" required aria-invalid={Boolean(errors.tourType)} aria-describedby={errors.tourType ? "tour-type-error" : undefined}>
            <option value="" disabled>Select a tour type</option>
            <option>Day Tour</option>
            <option>Round Tour</option>
            <option>Tailor-Made</option>
            <option>Other</option>
          </select>
          {errors.tourType && <span className="field-error" id="tour-type-error">{errors.tourType}</span>}
        </label>
      </div>
      <label>
        Your Message / Special Requests *
        <textarea name="message" rows={compact ? 4 : 6} minLength={10} maxLength={2000} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
        {errors.message && <span className="field-error" id="message-error">{errors.message}</span>}
      </label>
      <button className="button button-gold" type="submit">Submit Inquiry <span aria-hidden="true">↗</span></button>
      {sent && <p className="form-note" role="status">Your email app is opening with your inquiry ready to send.</p>}
    </form>
  );
}
