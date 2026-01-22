"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  bibleTranslations,
  formatDateKey,
  formatLongDate,
  getNoteKey,
  getReadAtKey,
  getReadKey,
  getReferenceForDate,
  themeKey,
  translationKey,
} from "./lib/readingPlan";

type ThemeMode = "light" | "dark";

export default function Home() {
  const today = useMemo(() => new Date(), []);
  const dateKey = useMemo(() => formatDateKey(today), [today]);
  const reference = useMemo(() => getReferenceForDate(today), [today]);
  const readKey = useMemo(() => getReadKey(dateKey), [dateKey]);
  const readAtKey = useMemo(() => getReadAtKey(dateKey), [dateKey]);
  const noteKey = useMemo(() => getNoteKey(dateKey), [dateKey]);

  const [note, setNote] = useState("");
  const [isRead, setIsRead] = useState(false);
  const [readAt, setReadAt] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [translation, setTranslation] = useState("NIV");
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");

  const safeGet = (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const safeSet = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignore storage failures (e.g., privacy modes); UI should still update.
    }
  };

  const safeRemove = (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore storage failures (e.g., privacy modes); UI should still update.
    }
  };

  useEffect(() => {
    const storedNote = safeGet(noteKey);
    const storedRead = safeGet(readKey);
    setNote(storedNote ?? "");
    setIsRead(storedRead === "true");
    setReadAt(safeGet(readAtKey));

    const storedTheme = safeGet(themeKey) as ThemeMode | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = storedTheme ?? (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);

    const storedTranslation = safeGet(translationKey);
    setTranslation(storedTranslation ?? "NIV");
  }, [noteKey, readKey, readAtKey]);

  const handleRead = () => {
    const nextValue = !isRead;
    setIsRead(nextValue);
    if (nextValue) {
      safeSet(readKey, "true");
      const timestamp = new Date().toISOString();
      safeSet(readAtKey, timestamp);
      setReadAt(timestamp);
    } else {
      safeSet(readKey, "false");
      safeRemove(readAtKey);
      setReadAt(null);
    }
  };

  const handleNoteChange = (value: string) => {
    setNote(value);
    safeSet(noteKey, value);
  };

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    safeSet(themeKey, nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const handleTranslationChange = (value: string) => {
    setTranslation(value);
    safeSet(translationKey, value);
  };

  const formattedReadAt = readAt
    ? new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date(readAt))
    : null;

  const shareText = `Today is enough. One verse, one breath.\n${formatLongDate(
    today
  )} — ${reference}`;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Today Is Enough",
          text: shareText,
          url: window.location.href,
        });
        return;
      }
      await navigator.clipboard.writeText(shareText);
      setShareStatus("copied");
      window.setTimeout(() => setShareStatus("idle"), 2000);
    } catch {
      // If sharing fails, silently ignore to keep the tone gentle.
    }
  };

  const bibleGatewayUrl = `https://www.biblegateway.com/passage/?search=${encodeURIComponent(
    reference
  )}&version=${encodeURIComponent(translation)}`;

  return (
    <div className="min-h-screen px-6 py-10 text-[var(--foreground)] sm:px-12 lg:px-20">
      <header className="mx-auto flex w-full max-w-4xl items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
            Today Is Enough
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            {formatLongDate(today)}
          </h1>
          <p className="mt-3 text-base text-[var(--muted)]">
            One short passage each day. No streaks. Just grace.
          </p>
          <Link
            href="/why"
            className="mt-3 inline-flex text-sm font-semibold text-[var(--accent)]"
          >
            Why this exists
          </Link>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--foreground)]"
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </header>

      <main className="mx-auto mt-12 grid w-full max-w-4xl gap-10 lg:grid-cols-[minmax(0,_1.15fr)_minmax(0,_0.85fr)]">
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow)]">
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--muted)]">
            Today’s reading
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-[var(--foreground)]">
            {reference}
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">Today is enough.</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            One verse, one breath. Rest, not rush.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={bibleGatewayUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-[var(--accent-foreground)] shadow-sm transition hover:opacity-90"
            >
              Open passage
            </a>
            <button
              type="button"
              onClick={handleRead}
              className="inline-flex items-center justify-center rounded-full border border-[var(--accent)] px-5 py-2 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
            >
              {isRead ? "Marked for today (undo)" : "Mark today as read"}
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-5 py-2 text-sm font-semibold text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--foreground)]"
            >
              {shareStatus === "copied" ? "Copied" : "Share today"}
            </button>
          </div>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Open the passage, read at your pace, then mark it if you want.
          </p>
          {isRead && formattedReadAt ? (
            <p className="mt-3 text-sm text-[var(--muted)]">
              Marked at {formattedReadAt}.
            </p>
          ) : null}
        </section>

        <section className="grid gap-6">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--note)] p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-semibold">Notes</h3>
              <Link
                href="/week"
                className="text-sm font-semibold text-[var(--accent)]"
              >
                Weekly view
              </Link>
            </div>
            <label
              htmlFor="notes"
              className="mt-4 block text-sm font-semibold text-[var(--muted)]"
            >
              What stood out today?
              <span className="ml-2 text-xs font-normal text-[var(--muted)]">
                Optional
              </span>
            </label>
            <textarea
              id="notes"
              rows={8}
              value={note}
              onChange={(event) => handleNoteChange(event.target.value)}
              placeholder="A word, a comfort, a question..."
              className="mt-3 w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm leading-6 text-[var(--foreground)] shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
            />
            <p className="mt-3 text-xs text-[var(--muted)]">
              Saved locally for {formatLongDate(today)}.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]">
            <h3 className="font-serif text-2xl font-semibold">Settings</h3>
            <label
              htmlFor="translation"
              className="mt-4 block text-sm font-semibold text-[var(--muted)]"
            >
              Bible translation
            </label>
            <select
              id="translation"
              value={translation}
              onChange={(event) => handleTranslationChange(event.target.value)}
              className="mt-3 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
            >
              {bibleTranslations.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="mt-3 text-xs text-[var(--muted)]">
              Used when opening passages on BibleGateway.
            </p>
          </div>
        </section>
      </main>

      <footer className="mx-auto mt-10 w-full max-w-4xl text-sm text-[var(--muted)]">
        <p>
          No streaks. No backlog. Just grace for today and the next gentle step
          forward.
        </p>
      </footer>
    </div>
  );
}
