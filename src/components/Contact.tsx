"use client";

import { useState, type FormEvent } from "react";

const WORKER_URL = process.env.NEXT_PUBLIC_CONTACT_WORKER_URL ?? "";

export default function Contact() {
  const [state, setState] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setState(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.success) {
        setState({ success: true });
      } else {
        setState({ error: result.error ?? "Something went wrong." });
      }
    } catch {
      setState({ error: "Failed to send message. Please try again." });
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="px-6 pt-10 pb-10">
      <div className="mx-auto max-w-md">
        {/* Section header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-warm-600">
            Contact
          </p>
          <h2 className="text-embossed text-3xl font-semibold tracking-tight text-warm-600 sm:text-4xl">
            Get in touch
          </h2>
          <p className="mt-3 text-sm text-warm-600/70">
            Have a question, idea, or just want to say&nbsp;hello?
          </p>
        </div>

        {state?.success ? (
          <div className="rounded-2xl border border-warm-400/30 bg-cream-100 px-8 py-10 text-center">
            <p className="font-medium text-warm-600">Message sent</p>
            <p className="mt-2 text-sm text-warm-600/70">
              Thanks for reaching out! We&rsquo;ll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {state?.error && (
              <p className="rounded-2xl bg-red-50 px-5 py-3 text-sm text-red-600">
                {state.error}
              </p>
            )}

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-warm-600"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="w-full rounded-full border border-warm-400/40 bg-cream-50 px-5 py-3 text-sm text-warm-600 placeholder-warm-400/40 outline-none transition-soft focus:border-warm-500 focus:ring-1 focus:ring-warm-400/30"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-warm-600"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-full border border-warm-400/40 bg-cream-50 px-5 py-3 text-sm text-warm-600 placeholder-warm-400/40 outline-none transition-soft focus:border-warm-500 focus:ring-1 focus:ring-warm-400/30"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-warm-600"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full resize-none rounded-3xl border border-warm-400/40 bg-cream-50 px-5 py-3 text-sm text-warm-600 placeholder-warm-400/40 outline-none transition-soft focus:border-warm-500 focus:ring-1 focus:ring-warm-400/30"
                placeholder="What's on your mind?"
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full bg-warm-600 px-6 py-3 text-sm font-medium tracking-wide text-cream-50 transition-soft hover:bg-warm-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {pending ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
