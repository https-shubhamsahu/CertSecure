![CertSecure Demo](public/readme-banner.svg)

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-SDK-FFA000?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

CertSecure Demo is a Next.js (App Router) app that showcases certificate upload + verification flows and role-based dashboards, with Firebase Auth + Firestore integration.

## Features

| Area | What you can do |
| --- | --- |
| Authentication | Email/password sign in + sign up via Firebase Auth |
| Dashboards | Admin / University / Employer / Student dashboard entry points |
| Certificate flows | Upload + verification demo UI (includes sample scenarios) |
| Rules tooling | Security rules generator flow (Genkit) |

## Quickstart

Prerequisites:

- Node.js 18+ (recommended)
- npm

Install:

```bash
npm install
```

Run (dev):

```bash
npm run dev
```

Open:

- http://localhost:9002

## Scripts

```bash
npm run dev        # Next.js dev server (Turbopack) on port 9002
npm run lint       # ESLint
npm run typecheck  # TypeScript (tsc --noEmit)
npm run build      # Production build
npm run start      # Serve the production build
```

Genkit (optional):

```bash
npm run genkit:dev
npm run genkit:watch
```

## Architecture (high level)

```mermaid
flowchart LR
	U[User Browser] -->|Next.js App Router| N[Next.js UI]
	N -->|Auth| FA[Firebase Auth]
	N -->|Reads/Writes| FS[Firestore]
	N -->|Uploads| ST[Firebase Storage]
	N -->|Optional| GK[Genkit flows]
```

## Project structure

- `src/app/` — Next.js routes (App Router)
- `src/components/` — UI + feature components
- `src/firebase/` — Firebase initialization, providers, Firestore hooks
- `src/ai/` — Genkit configuration + flows
- `docs/` — blueprint + backend notes

## Firebase configuration

- Client config is in `src/firebase/config.ts`.
- In production on Firebase App Hosting, `initializeApp()` may be auto-configured via hosting-provided environment.
- In local builds, the app falls back to the config object (you may see a build-time warning during prerender; the build still succeeds).

## Troubleshooting

- Port in dev is set in `package.json` (`next dev --port 9002`). If needed, change it there.
