# The Elemental Garden

Next.js + TypeScript foundation for a weather-driven idle creature collector.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- PostgreSQL (Neon compatible) via `pg`
- OpenWeather API (server-side only)

## Environment Variables

Create `.env.local`:

```bash
DATABASE_URL="postgresql://..."
OPENWEATHER_API_KEY="..."
OPENWEATHER_DEFAULT_CITY="Oslo"
OPENWEATHER_DEFAULT_COUNTRY="NO"
```

## Run

```bash
npm install
npm run dev
```

## Database bootstrap

Run SQL from:

- `lib/db/migrations/001_init.sql`

## API

### `GET /api/weather`

Server-authoritative weather endpoint.

Optional query params:

- `city`
- `country` (2-letter ISO code)

All OpenWeather key handling is server-side only.

## Project structure

- `app/api/weather/route.ts` — secure weather endpoint
- `lib/server/weather/*` — weather fetch + game mapping
- `lib/db/*` — connection, schema types, repositories
- `types/game.ts` — game domain types

## Repository note

This repository avoids binary assets in app metadata so patch-based PR tooling works cleanly. The app icon is provided as `app/icon.svg` (text file) instead of a binary `.ico`.
