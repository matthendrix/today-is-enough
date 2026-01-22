"use client";

import Link from "next/link";

export default function WhyPage() {
  return (
    <div className="min-h-screen px-6 py-10 text-[var(--foreground)] sm:px-12 lg:px-20">
      <main className="mx-auto w-full max-w-3xl rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
          Why this exists
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold">
          Grace for today.
        </h1>
        <p className="mt-5 text-lg text-[var(--muted)]">
          This space is here for the days when the heart feels heavy and the
          calendar feels full. It’s a quiet invitation to meet God in the
          ordinary — one verse, one breath at a time.
        </p>
        <p className="mt-4 text-lg text-[var(--muted)]">
          There are no streaks to keep, no backlog to chase, no pressure to
          prove. Only a gentle step of faith for today.
        </p>
        <p className="mt-6 text-sm text-[var(--muted)]">
          You’re welcome here, even if today is all you can bring.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--foreground)]"
        >
          Back to today
        </Link>
      </main>
    </div>
  );
}
