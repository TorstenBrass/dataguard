# 🛡️ DataGuard

**The app that watches the apps watching you.**

DataGuard is an open-source privacy watchdog that scores apps based on how aggressively they collect, share, and sell user data. Built by the community, for the community — with zero irony: DataGuard itself collects no data about you.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Community Reports](https://img.shields.io/badge/Community%20Reports-18%2C000%2B-red)](https://dataguard.app/reports)
[![Apps Reviewed](https://img.shields.io/badge/Apps%20Reviewed-10%2B-blue)](https://dataguard.app/browse)
[![Price](https://img.shields.io/badge/Price-%243%20one--time-brightgreen)](https://dataguard.app)

---

## Why DataGuard exists

Most apps today don't exist to provide value — they exist to harvest and monetize your personal data. Location, contacts, browsing history, biometrics, financial information: all collected, packaged, and sold to the highest bidder, often without meaningful disclosure.

App store privacy labels are self-reported and unverified. Privacy policies are written by lawyers to obscure, not inform. Independent research is scattered across academic papers, journalism, and regulator filings that ordinary users will never read.

DataGuard closes that gap. We synthesize research, regulatory findings, community reports, and source code analysis into a single, honest privacy score for every app we review.

---

## Features

- **Privacy Score (0–100)** with a letter grade (A+ to F) for each app
- **Data collection breakdown** — every type of data an app harvests, listed plainly
- **Third-party map** — how many (and which) companies receive your data
- **Incident history** — known fines, data breaches, and regulatory actions with sources
- **Community reports** — users flag new findings; everything is reviewed transparently
- **Watchlist & alerts** — follow apps you use and get notified when scores change
- **Submit new apps** — anyone can request a review; researchers respond within 72 hours
- **Community feedback** — corrections, new findings, and false positives all welcome

---

## Our promises

DataGuard was built on a simple principle: a privacy app that collects your data is a fraud.

- **Zero data collection.** No analytics, no telemetry, no logs, no crash reports that phone home. Nothing.
- **No advertising.** No sponsored results, no affiliate links, no promoted apps. Ever.
- **$3 one-time purchase.** No subscription. No freemium upsell. No dark patterns.
- **Fully open source.** Every line of code is in this repository. Audit it yourself.
- **Community-funded.** Every dollar goes to maintaining the database and funding research. No investors, no VCs.

---

## How scoring works

Each app is scored from 0 to 100 across five weighted dimensions:

| Dimension | Weight | What we look at |
|---|---|---|
| Data types collected | 30% | Count and sensitivity of data categories (biometrics weighted highest) |
| Data selling & sharing | 25% | Whether data is sold to brokers or shared with undisclosed third parties |
| Third-party recipients | 20% | Number and type of companies that receive user data |
| Deceptive practices | 15% | Dark patterns, misleading privacy labels, forced consent |
| Incident history | 10% | Regulatory fines, data breaches, documented violations |

Scores are calculated by our research team and validated by community reports. All methodology is documented in [`/docs/scoring.md`](docs/scoring.md).

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React (web), React Native (mobile) |
| Backend | Supabase (PostgreSQL + Auth + Realtime) |
| Payments | Stripe (one-time payment, no subscription) |
| Hosting | Vercel |
| Search | Supabase full-text search |
| CI/CD | GitHub Actions |

---

## Getting started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Supabase account (free tier works)
- A Stripe account (test mode for development)

### Installation

```bash
# Clone the repository
git clone https://github.com/dataguard/dataguard.git
cd dataguard

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Environment variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Running locally

```bash
# Start development server
npm run dev

# Run database migrations
npm run db:migrate

# Seed with example app data
npm run db:seed
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Database schema

```sql
-- Apps table
create table apps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  score integer not null check (score between 0 and 100),
  privacy_grade text not null,
  sells_data boolean default false,
  misleading_ads boolean default false,
  third_party_count integer default 0,
  data_types text[] default '{}',
  summary text,
  sources text[] default '{}',
  known_incidents text[] default '{}',
  community_flags integer default 0,
  community_verified boolean default false,
  founded text,
  headquarters text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Community reports
create table community_reports (
  id uuid primary key default gen_random_uuid(),
  app_id uuid references apps(id),
  report_type text check (report_type in ('correction', 'new-finding', 'false-positive', 'praise')),
  content text not null,
  status text default 'pending' check (status in ('pending', 'reviewed', 'accepted', 'rejected')),
  created_at timestamptz default now()
);

-- App submissions
create table app_submissions (
  id uuid primary key default gen_random_uuid(),
  app_name text not null,
  category text,
  details text,
  status text default 'pending',
  created_at timestamptz default now()
);
```

---

## Project structure

```
dataguard/
├── app/                  # Next.js app router pages
│   ├── page.tsx          # Landing page
│   ├── browse/           # App browser
│   ├── app/[id]/         # App detail page
│   └── submit/           # Submit an app
├── components/           # Reusable UI components
│   ├── ScoreRing.tsx
│   ├── AppCard.tsx
│   ├── AppDetail.tsx
│   └── FeedbackForm.tsx
├── lib/                  # Utilities and API clients
│   ├── supabase.ts
│   ├── stripe.ts
│   └── scoring.ts
├── docs/                 # Documentation
│   ├── scoring.md        # Full scoring methodology
│   ├── contributing.md   # Contribution guide
│   └── api.md            # Public API docs
├── scripts/              # Research and data tools
│   └── analyze-app.py    # Privacy policy analyzer
└── supabase/
    └── migrations/       # Database migrations
```

---

## Public API

DataGuard provides a free, read-only public API for researchers and developers.

```bash
# Get all apps
GET https://api.dataguard.app/v1/apps

# Get a specific app
GET https://api.dataguard.app/v1/apps/{id}

# Search apps
GET https://api.dataguard.app/v1/apps?q=tiktok&filter=sells_data

# Get community reports for an app
GET https://api.dataguard.app/v1/apps/{id}/reports
```

Full API documentation: [docs.dataguard.app](https://docs.dataguard.app)

---

## Contributing

We welcome contributions of all kinds. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

The quickest ways to help:

- **Submit an app** you believe should be reviewed via the app or a GitHub issue
- **Correct a score** by opening a pull request with sources in [`/data/apps/`](data/apps/)
- **Report a new incident** — regulatory fine, data breach, policy change
- **Improve the research tooling** in [`/scripts/`](scripts/)
- **Translate the app** — see open issues tagged `i18n`

---

## Roadmap

- [ ] Browser extension (shows score on App Store / Play Store pages)
- [ ] iOS and Android native apps
- [ ] Email digest — weekly summary of score changes for watchlisted apps
- [ ] Bulk CSV export for researchers
- [ ] Score changelog — full history of why a score changed
- [ ] Policy diff tool — compare an app's current and previous privacy policy
- [ ] Multilingual support

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

## Acknowledgements

DataGuard stands on the shoulders of years of investigative journalism, regulatory work, and privacy research. Key sources include the Electronic Frontier Foundation, the Norwegian Consumer Council, the Irish Data Protection Commission, the FTC, and the countless journalists who have documented the data economy at personal professional risk.

---

*DataGuard is not affiliated with any of the apps it reviews. All scores reflect independent research and community input. We welcome corrections — see CONTRIBUTING.md.*
