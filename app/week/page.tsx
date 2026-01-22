"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  formatDateKey,
  formatLongDate,
  getReadKey,
  getReferenceForDate,
  themeKey,
} from "../lib/readingPlan";

type DayStatus = {
  date: Date;
  dateKey: string;
  reference: string;
  read: boolean;
};

const formatShortDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);

const getWeekDates = (date: Date) => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = day === 0 ? 6 : day - 1;
  start.setDate(start.getDate() - diff);
  return Array.from({ length: 7 }, (_, index) => {
    const next = new Date(start);
    next.setDate(start.getDate() + index);
    return next;
  });
};

export default function WeekPage() {
  const today = useMemo(() => new Date(), []);
  const weekDates = useMemo(() => getWeekDates(today), [today]);
  const [days, setDays] = useState<DayStatus[]>([]);

  useEffect(() => {
    const storedTheme = localStorage.getItem(themeKey);
    if (storedTheme) {
      document.documentElement.setAttribute("data-theme", storedTheme);
    }

    const nextDays = weekDates.map((date) => {
      const dateKey = formatDateKey(date);
      const readKey = getReadKey(dateKey);
      const read = localStorage.getItem(readKey) === "true";
      return {
        date,
        dateKey,
        reference: getReferenceForDate(date),
        read,
      };
    });
    setDays(nextDays);
  }, [weekDates]);

  return (
    <div className="min-h-screen px-6 py-10 text-[var(--foreground)] sm:px-12 lg:px-20">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
            Weekly view
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            {formatLongDate(today)}
          </h1>
        </div>
        <Link
          href="/"
          className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--foreground)]"
        >
          Back to today
        </Link>
      </header>

      <main className="mx-auto mt-10 w-full max-w-3xl rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]">
        <p className="text-sm text-[var(--muted)]">
          A gentle glance at this week — just checkmarks, no metrics.
        </p>
        <div className="mt-6 grid gap-4">
          {days.map((day) => (
            <div
              key={day.dateKey}
              className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--note)] px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-[var(--muted)]">
                  {formatShortDate(day.date)}
                </p>
                <p className="font-serif text-lg">{day.reference}</p>
              </div>
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-lg"
                aria-label={day.read ? "Read" : "Not read"}
              >
                {day.read ? "✓" : " "}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
