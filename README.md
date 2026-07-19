# CertSecure

A role-based certificate issuance and verification platform for academic and professional credentials.

![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth_%2B_Firestore-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0EA5E9?style=flat-square&logo=tailwindcss&logoColor=white)
![Genkit](https://img.shields.io/badge/Genkit-Google_AI-4285F4?style=flat-square&logo=google&logoColor=white)

## Overview

Academic and professional certificate verification is typically slow, manual, and vulnerable to forgery — institutions, employers, and candidates each work from fragmented, disconnected processes. CertSecure centralizes that lifecycle: certificates are uploaded, verified, and made queryable behind role-scoped dashboards for Admins, Universities, Employers, and Students, backed by Firebase for identity and data.

## Features

- **Role-based dashboards** — distinct experiences for Admin, University, Employer, and Student roles
- **Certificate upload & verification** — dropzone upload to Firebase Storage with a verification flow
- **Student & user management** — dedicated admin views for students and users
- **Analytics dashboard** — charts (Recharts, D3 scale) and a map view (react-simple-maps) for verification activity
- **QR-based verification** — `qrcode.react` for shareable/scannable certificate checks
- **PDF export** — `jspdf` for generating verification records
- **AI-assisted security rules** — a Genkit flow (`generate-security-rules.ts`) to help draft Firestore/Storage security rules
- **Auth & access control** — Firebase Authentication with Firestore-backed role rules

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router), React 18, TypeScript |
| Styling / UI | Tailwind CSS, Radix UI primitives, shadcn-style components |
| Forms | react-hook-form + resolvers |
| Backend services | Firebase Auth, Firestore, Firebase Storage |
| AI / Automation | Genkit (`@genkit-ai/googleai`) |
| Data viz | Recharts, d3-scale, react-simple-maps |
| Other | jspdf (PDF export), qrcode.react, react-dropzone |

## Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project with Auth, Firestore, and Storage enabled

### Installation

```bash
git clone https://github.com/https-shubhamsahu/CertSecure.git
cd CertSecure
npm install
```

Configure your Firebase credentials (see `src/firebase/`) and any Genkit/Google AI API keys required by `src/ai/flows`.

### Run locally

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002).

### Genkit flows (optional, for AI-assisted security rules)

```bash
npm run genkit:dev
```

### Production build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── app/                # Authenticated dashboard routes
│   │   ├── analytics/
│   │   ├── settings/
│   │   ├── students/
│   │   ├── upload/
│   │   ├── users/
│   │   └── verify/
│   ├── demo/                # Public demo flow
│   ├── login/
│   └── register/
├── ai/
│   └── flows/
│       └── generate-security-rules.ts
├── components/
│   ├── features/dashboards/  # Role-specific dashboard UI
│   ├── layout/
│   └── ui/                   # Radix/shadcn primitives
├── firebase/
│   └── firestore/
├── hooks/
└── lib/
firestore.rules
apphosting.yaml
```

## Deployment

Configured for Firebase App Hosting (`apphosting.yaml`) with Firestore security rules in `firestore.rules`.

## Roadmap

- Production-grade cryptographic signing/verification for certificates
- Immutable audit trails for verification events
- Organization-level onboarding and management workflows
- API integrations for external university and HR systems

## License

No license file is currently present in this repository.
