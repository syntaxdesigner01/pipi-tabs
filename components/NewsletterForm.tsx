"use client";

import { FormEvent, useEffect, useState } from "react";

const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyRYMO-zUloeDKTQNAHrAfXY_YAYIvxaIu1uIgw-V1Rwwa6PcGwNwlSs6HPMCVO7cQ8/exec";

export default function NewsletterForm() {
  const [joined, setJoined] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [toast, setToast] = useState<{ text: string; color: string } | null>(null);

  useEffect(() => {
    setJoined(localStorage.getItem("pipi_newsletter_joined") === "true");
  }, []);

  function showToast(text: string, color: string) {
    setToast({ text, color });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address.", "bg-red-500");
      return;
    }

    setSubmitting(true);
    setFormMessage("Submitting…");

    try {
      const res = await fetch(ENDPOINT, { method: "POST", body: new FormData(form) });
      const data = await res.json();

      if (data.status === "success") {
        showToast("🎉 You're subscribed! Check your inbox.", "bg-green-500");
        form.reset();
        setJoined(true);
        localStorage.setItem("pipi_newsletter_joined", "true");
      } else if (data.status === "duplicate") {
        showToast("😉 You're already subscribed. Check your inbox.", "bg-gray-500");
        setJoined(true);
        localStorage.setItem("pipi_newsletter_joined", "true");
      } else {
        showToast("Something went wrong — please try again.", "bg-red-500");
      }
    } catch {
      showToast("Network error — please try again later.", "bg-red-500");
    } finally {
      setFormMessage(null);
      setSubmitting(false);
    }
  }

  if (joined) {
    return (
      <button
        disabled
        className="w-full bg-black dark:bg-white dark:text-black text-white py-3 rounded-lg opacity-50 cursor-not-allowed flex items-center justify-center gap-2"
      >
        <span>Subscribed! 🚀</span>
      </button>
    );
  }

  return (
    <>
      <form id="newsletterForm" className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          className="w-full border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-colors"
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          className="w-full border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-colors"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your phone number"
          required
          className="w-full border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-black dark:bg-white dark:text-black text-white py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Subscribe</span>
          {submitting && <i className="fa-solid fa-spinner fa-spin" />}
        </button>
      </form>
      {formMessage && <p className="mt-4 text-sm text-gray-600">{formMessage}</p>}
      {toast && (
        <section
          className={`text-center text-white p-4 rounded-md fixed top-[20vh] right-0 -translate-x-4 z-50 shadow-md border border-slate-200 capitalize font-semibold ${toast.color}`}
        >
          {toast.text}
        </section>
      )}
    </>
  );
}
