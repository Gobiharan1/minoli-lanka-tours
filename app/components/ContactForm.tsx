"use client";

import { FormEvent, useState } from "react";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
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
    <form className={`inquiry-form ${compact ? "compact" : ""}`} onSubmit={submit}>
      <div className="form-grid">
        <label>
          Full Name *
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          Email Address *
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          WhatsApp / Phone Number
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label>
          Travel Dates (if known)
          <input name="dates" placeholder="e.g. 12–22 December" />
        </label>
        <label>
          Number of Travelers
          <input name="travelers" type="number" min="1" />
        </label>
        <label>
          Type of Tour Interested In
          <select name="tourType" defaultValue="Tailor-Made">
            <option>Day Tour</option>
            <option>Round Tour</option>
            <option>Tailor-Made</option>
            <option>Other</option>
          </select>
        </label>
      </div>
      <label>
        Your Message / Special Requests *
        <textarea name="message" rows={compact ? 4 : 6} required />
      </label>
      <button className="button button-gold" type="submit">Submit Inquiry <span aria-hidden="true">↗</span></button>
      {sent && <p className="form-note" role="status">Your email app is opening with your inquiry ready to send.</p>}
    </form>
  );
}

