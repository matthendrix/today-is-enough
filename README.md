# Today Is Enough

A guilt-free daily Bible reading app where each day stands alone. Built with
Next.js (App Router) and designed for calm, pastoral use without streaks or
backlog pressure.

## Features

- Daily Scripture reference (static Psalms + Gospels plan)
- Notes saved locally by date
- Mark-as-read with gentle undo and local timestamp
- Weekly view with simple checkmarks
- Dark mode toggle
- Translation selector for BibleGateway links

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Project Structure

- `app/page.tsx` - Home screen (today, notes, settings)
- `app/week/page.tsx` - Weekly view
- `app/lib/readingPlan.ts` - Reading plan + storage keys
- `app/globals.css` - Theme + typography

## Notes

- This app does not fetch or store Bible text.
- All user data is stored locally in the browser (localStorage).
