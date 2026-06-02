# 🛡️ DataGuard

**The app that watches the apps watching you.**

DataGuard is an open-source privacy watchdog that scores apps based on how aggressively they collect, share, and sell user data. Built by the community, for the community — with zero irony: DataGuard itself collects no data about you.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Apps Reviewed](https://img.shields.io/badge/Apps%20Reviewed-390%2B-blue)](https://dataguard-six.vercel.app)
[![Privacy](https://img.shields.io/badge/Tracking-None-brightgreen)](https://dataguard-six.vercel.app)
[![Price](https://img.shields.io/badge/Web-%247%20one--time-brightgreen)](https://dataguard-six.vercel.app)

---

## Why DataGuard exists

Most apps today don't exist to provide value — they exist to harvest and monetize your personal data. Location, contacts, browsing history, biometrics, financial information: all collected, packaged, and sold to the highest bidder, often without meaningful disclosure.

App store privacy labels are self-reported and unverified. Privacy policies are written by lawyers to obscure, not inform. Independent research is scattered across academic papers, journalism, and regulator filings that ordinary users will never read.

DataGuard closes that gap. It pulls together public research, regulatory findings, breach reports, and privacy-label analysis into a single, plain-language privacy score for every app in the database.

---

## Features

- **Privacy Score (0–100)** with a letter grade (A+ to F) for each app
- **Data collection breakdown** — every type of data an app harvests, listed plainly
- **Third-party count** — how many companies receive your data
- **Incident history** — known fines, data breaches, and regulatory actions, with sources
- **Community submissions** — anyone can flag a finding or request a new app; submissions are anonymous and voluntary
- **390+ apps** already reviewed, spanning social media, shopping, food delivery, banking, games, streaming, and more

---

## Our promises

DataGuard was built on a simple principle: a privacy app that collects your data is a fraud.

- **No tracking, ever.** We don't track you, profile you, or collect personal data — no analytics, no telemetry, no crash reports that phone home. Community submissions (app reports and requests) are anonymous and voluntary.
- **No advertising.** No sponsored results, no affiliate links, no promoted apps. Ever.
- **$7 one-time on the web.** No subscription. No freemium upsell. No dark patterns.
- **Fully open source.** Every line of code is in this repository. Audit it yourself.
- **Independent.** Not affiliated with, sponsored by, or paid by any app reviewed.

---

## How scoring works

Each app is scored from 0 to 100 across five weighted dimensions:

| Dimension | Weight | What it looks at |
|---|---|---|
| Data types collected | 30% | Count and sensitivity of data categories (biometrics weighted highest) |
| Data selling & sharing | 25% | Whether data is sold to brokers or shared with undisclosed third parties |
| Third-party recipients | 20% | Number and type of companies that receive user data |
| Deceptive practices | 15% | Dark patterns, misleading privacy labels, forced consent |
| Incident history | 10% | Regulatory fines, data breaches, documented violations |

Scores are compiled from public sources — privacy policies, app-store data-safety labels, regulatory filings, breach disclosures, and reputable journalism — and each app entry lists the sources behind it. Community submissions help surface corrections and new findings.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Mobile | Capacitor (wraps the web app as a native Android build) |
| Data | Curated dataset bundled in the app; Supabase (PostgreSQL) stores community submissions |
| Payments (web) | Stripe (one-time) — the Android app is free |
| Hosting (web) | Vercel |
| CI/CD | GitHub Actions (builds the signed Android app bundle) |

---

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/TorstenBrass/dataguard.git
cd dataguard

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`) to see the app.

### Building

```bash
# Build the web app
npm run build

# Add / sync the Android project (Capacitor)
npm run android:sync

# Produce a release Android App Bundle
npm run android:release
```

> Note: the app's curated privacy dataset currently lives in `src/DataGuard.jsx`. Community submissions are sent to Supabase.

---

## Project structure

```
dataguard/
├── index.html                # app entry / viewport
├── src/
│   ├── main.jsx              # React entry point
│   └── DataGuard.jsx         # the entire app + curated app dataset
├── public/                   # static assets
├── capacitor.config.json     # Android (Capacitor) wrapper config
├── vite.config.js
├── package.json
├── playstore/                # Google Play listing assets
└── .github/
    └── workflows/            # GitHub Actions: builds the signed Android .aab
```

---

## Supabase tables

Community submissions are stored in two tables. No personal data is collected — submissions are anonymous.

```sql
-- App review requests
create table app_submissions (
  id uuid primary key default gen_random_uuid(),
  app_name text not null,
  category text,
  details text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Community reports (corrections, new findings, false positives)
create table community_reports (
  id uuid primary key default gen_random_uuid(),
  app_id text,
  report_type text,
  content text not null,
  status text default 'pending',
  created_at timestamptz default now()
);
```

---

## Contributing

Contributions of all kinds are welcome.

The quickest ways to help:

- **Submit an app** you believe should be reviewed — through the app, or by opening a GitHub issue
- **Correct a score** by opening a pull request that edits the relevant entry in `src/DataGuard.jsx`, with sources
- **Report a new incident** — a regulatory fine, data breach, or policy change, with a link
- **Improve the UI or accessibility**

Please include a source for any factual claim about an app.

---

## Roadmap

- [x] Android app (via Capacitor)
- [ ] Browser extension (shows score on App Store / Play Store pages)
- [ ] iOS app
- [ ] Public read-only API for researchers
- [ ] Score changelog — history of why a score changed
- [ ] Multilingual support

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

## Acknowledgements

DataGuard stands on the shoulders of years of investigative journalism, regulatory work, and privacy research. Sources include the Electronic Frontier Foundation, the Norwegian Consumer Council, data protection authorities, the FTC, and the many journalists who have documented the data economy.

---

*DataGuard is not affiliated with any of the apps it reviews. All scores reflect independent research and community input. Corrections are welcome — see CONTRIBUTING.md.*
