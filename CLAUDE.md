# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 app (App Router) with React 19 and Tailwind CSS 4. A guilt-free daily Bible reading app with no backend—all user data stored in localStorage.

### Key Files

- `app/page.tsx` - Home screen: today's reading, notes textarea, settings (translation selector, dark mode toggle)
- `app/week/page.tsx` - Weekly view showing 7 days with checkmarks
- `app/why/page.tsx` - Static "Why this exists" pastoral page
- `app/lib/readingPlan.ts` - Reading plan array (31 Psalms + Gospels), localStorage key generators, date utilities
- `app/globals.css` - CSS variables for light/dark themes, Tailwind config

### Data Model

All state is client-side via localStorage with keys prefixed `today-is-enough.`:
- `today-is-enough.read.{YYYY-MM-DD}` - "true"/"false" for mark-as-read
- `today-is-enough.readAt.{YYYY-MM-DD}` - ISO timestamp when marked
- `today-is-enough.note.{YYYY-MM-DD}` - User's notes for that day
- `today-is-enough.theme` - "light" or "dark"
- `today-is-enough.translation` - Bible translation ID (NIV, ESV, etc.)

### Reading Plan Logic

`getReferenceForDate(date)` calculates day-of-year and indexes into the 31-item `readingPlan` array with modulo, cycling through the plan year-round.

### Theming

Dark mode controlled via `data-theme` attribute on `<html>`. CSS variables in `globals.css` define both palettes. Theme persists to localStorage and respects system preference on first load.

### External Integration

BibleGateway links are constructed dynamically: `https://www.biblegateway.com/passage/?search={reference}&version={translation}`
