# Influencer Compass

A polished influencer discovery experience built with React, TypeScript, Vite, Tailwind CSS, and Zustand. The app now lets users browse creators by platform, open detailed profile pages, and build a persistent shortlist of selected profiles.

## What changed

- Replaced placeholder UI states with a modern, responsive experience.
- Added a Zustand-backed shortlist that persists in local storage.
- Implemented add/remove behavior with duplicate prevention.
- Refactored search and detail pages to use memoized data flows and cleaner component boundaries.
- Added a small store test for the shortlist logic.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173 to view the app.

## Available scripts

- `npm run dev` — start the Vite development server
- `npm run build` — create a production build
- `npm run test` — run the shortlist store test

## Notes

- The saved shortlist is persisted in browser storage so it survives refreshes.
- Profile data is loaded from the bundled JSON datasets in the project.
- The build was verified successfully with `npm run build`.
