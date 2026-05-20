# Contributing to DataGuard

First: thank you. DataGuard only works because people who care about privacy take the time to make it better. Every correction, every new finding, every line of code matters.

This document explains how to contribute effectively. Please read it before opening a pull request or issue.

---

## Table of contents

- [Code of conduct](#code-of-conduct)
- [Ways to contribute](#ways-to-contribute)
- [Submitting a new app for review](#submitting-a-new-app-for-review)
- [Correcting an existing app score](#correcting-an-existing-app-score)
- [Reporting a new incident](#reporting-a-new-incident)
- [Contributing code](#contributing-code)
- [Research contributions](#research-contributions)
- [Translating DataGuard](#translating-dataguard)
- [Review process](#review-process)
- [Style guide](#style-guide)

---

## Code of conduct

DataGuard is a community built around a shared belief: people deserve honest information about how their data is used. We expect everyone who contributes to treat others with that same honesty and respect.

Specifically:

- Be accurate. Cite sources. Do not speculate without stating that you are speculating.
- Be respectful. Disagreements about scores or methodology are welcome; personal attacks are not.
- Be transparent. Disclose any conflict of interest (e.g. if you work for an app you are reviewing or correcting).
- Do not submit false reports. Intentionally submitting false information to harm an app's score is a violation and will result in a permanent ban.

Violations can be reported to conduct@dataguard.app. All reports are handled confidentially.

---

## Ways to contribute

You do not need to write code to make a meaningful contribution. The most valuable contributions are often:

- Submitting an app that should be reviewed
- Correcting a score with new evidence or better sources
- Reporting a regulatory action, fine, or data breach we missed
- Translating the app into a new language
- Improving the scoring methodology documentation

Code contributions are also very welcome, especially for the research tooling and browser extension.

---

## Submitting a new app for review

### Via the app

The easiest way is to use the Submit form in DataGuard itself. Your submission is completely anonymous — we store only the app name and your description, with no metadata attached.

### Via GitHub

Open an issue with the title format: `[App Submission] AppName`

Include:

- **App name and platform** (iOS, Android, web)
- **Category** (Social Media, Shopping, Messaging, etc.)
- **What you observed** — suspicious permissions, concerning policy clauses, news coverage, personal experience
- **Sources** if you have them — links to privacy policies, news articles, regulatory filings, academic papers

You do not need a complete picture. Our research team will do the full analysis. The more context you provide, the faster we can move.

### What happens next

1. A researcher picks up the submission (target: within 72 hours)
2. They analyze the app's privacy policy, App Store/Play Store labels, known data broker relationships, and academic/journalistic coverage
3. A draft score is posted as a pull request for community review
4. After a minimum 48-hour review period and at least one independent check, the score is merged
5. The submission author is credited in the app entry (anonymously if preferred)

---

## Correcting an existing app score

If you believe a score is wrong — too harsh, too lenient, or based on outdated information — we want to know. Scores should reflect reality, not opinions.

### What makes a valid correction

Valid corrections are backed by primary sources:

- Official privacy policies or terms of service (link directly to the clause, not just the document)
- Regulatory decisions or fines (link to the official ruling)
- Academic research (link to the paper)
- Credible investigative journalism (link to the article)
- App store privacy nutrition labels (screenshot + link)

We do not accept corrections based on:

- The company's own marketing or blog posts (inherently self-serving)
- Anecdote alone, unless it is accompanied by supporting evidence
- Other privacy rating services (we must verify independently)

### How to submit a correction

**Via the app:** Use the Community Feedback form on any app's detail page. Select "Correction" and include your source links.

**Via GitHub:** Open an issue with the title format: `[Score Correction] AppName — brief description`

Or, if you are confident in the change, open a pull request directly against the app's data file in `/data/apps/`. See the data file format below.

### Data file format

Each app is stored as a JSON file in `/data/apps/{app-id}.json`:

```json
{
  "id": "tiktok",
  "name": "TikTok",
  "category": "Social Media",
  "score": 8,
  "privacyGrade": "F",
  "sellsData": true,
  "misleadingAds": true,
  "thirdPartyCount": 47,
  "dataTypes": [
    "Precise Location",
    "Contacts",
    "Biometrics",
    "Face Data",
    "Browsing History",
    "Keystrokes",
    "Device ID",
    "Financial Info",
    "Clipboard Contents",
    "App Usage"
  ],
  "summary": "One of the most aggressive data collectors on any platform...",
  "sources": [
    {
      "title": "WSJ Investigation: TikTok Tracked Users' Location",
      "url": "https://www.wsj.com/...",
      "date": "2021-06-17"
    }
  ],
  "knownIncidents": [
    {
      "description": "$5.4M GDPR fine for children's data violations",
      "date": "2023-09-15",
      "source": "https://www.irishregulator.ie/..."
    }
  ],
  "headquarters": "Beijing, China",
  "founded": "2016",
  "lastReviewed": "2025-11-01",
  "communityVerified": true
}
```

When submitting a pull request to change a score, you must:

1. Update the relevant fields in the JSON file
2. Add or update sources to reflect your evidence
3. Update `lastReviewed` to today's date
4. Write a clear PR description explaining what changed and why, with links to your sources

Pull requests that change a score without adequate sourcing will be closed.

---

## Reporting a new incident

Regulatory fines, data breaches, and documented privacy violations are tracked in each app's `knownIncidents` array.

To report a new incident:

**Via the app:** Use the Community Feedback form and select "New Finding."

**Via GitHub:** Open an issue with the title format: `[Incident] AppName — brief description`

Include:

- The incident description (one clear sentence)
- The date it was reported or occurred
- A link to the primary source (official regulator website, SEC filing, court document, or credible news outlet)

Incidents from company blog posts or PR statements are generally not eligible — we track what happened, not what companies say happened.

---

## Contributing code

### Before you start

- Check open issues for anything tagged `good first issue` or `help wanted`
- For significant new features, open an issue first to discuss the approach before writing code — this saves everyone time
- For bug fixes, you can go straight to a pull request

### Development setup

See [README.md](README.md) for full setup instructions.

### Pull request process

1. Fork the repository and create a branch from `main`
   ```bash
   git checkout -b fix/your-description
   # or
   git checkout -b feature/your-description
   ```

2. Make your changes. Write clear, readable code with comments where the intent is not obvious.

3. If you are adding a new feature, add tests.

4. Run the test suite:
   ```bash
   npm test
   ```

5. Run the linter:
   ```bash
   npm run lint
   ```

6. Commit with a clear message:
   ```bash
   git commit -m "fix: correct score display on mobile at narrow widths"
   # or
   git commit -m "feat: add policy diff tool to app detail view"
   ```
   We follow [Conventional Commits](https://www.conventionalcommits.org/).

7. Push and open a pull request against `main`. Fill in the PR template completely.

### What we look for in code reviews

- Does it work? Is it tested?
- Is it readable? Will someone new to the codebase understand it in six months?
- Does it respect user privacy? No new analytics, tracking, or third-party dependencies without discussion.
- Does it match the existing code style?
- Is it the simplest solution that solves the problem?

We aim to review pull requests within five business days. If you have not heard back after a week, feel free to ping the thread.

### Dependencies policy

We are careful about adding new dependencies. Every dependency is a potential supply chain risk and a maintenance burden. Before adding a new package, ask yourself: can this be done with what we already have, or with a small amount of custom code?

New dependencies require approval from a maintainer and must be:

- Actively maintained
- Open source
- Free of analytics or telemetry
- Added to the security audit scope

---

## Research contributions

The most impactful contributions to DataGuard are not code — they are research.

We especially need help with:

- **Privacy policy analysis** — reading and interpreting privacy policies is time-consuming and requires attention to legal language. If you have a legal or policy background, we need you.
- **Regulatory monitoring** — tracking decisions from the FTC, European DPAs, ICO, CNIL, and other regulators. Many fines and rulings are published without much fanfare.
- **Academic literature** — privacy research is published constantly. We want to incorporate findings from peer-reviewed work into our scores.
- **App store label verification** — cross-referencing app store privacy nutrition labels against actual app behavior.

To get involved in research, open an issue tagged `research` or email research@dataguard.app.

Research contributors are credited in the app entries they contribute to and in our [contributors list](CONTRIBUTORS.md).

---

## Translating DataGuard

Privacy is a universal right. We want DataGuard to be accessible regardless of language.

Translations live in `/locales/{language-code}/`. Copy `/locales/en/` as a starting point.

Before starting a translation, check the open issues to make sure no one is already working on that language. If not, open an issue to claim it — this prevents duplicate work.

Translation pull requests are reviewed by a native speaker where possible. If you can both translate and review, please say so in your PR.

---

## Review process

All contributions go through review before being merged. Here is what to expect:

| Contribution type | Typical review time | Who reviews |
|---|---|---|
| App score correction | 3–5 days | Research team + 1 community reviewer |
| New app submission | 72 hours (initial triage), 7 days (full score) | Research team |
| New incident report | 24–48 hours | Research team |
| Bug fix | 2–5 days | Maintainer |
| New feature | 5–10 days | Maintainer + community |
| Translation | 5–10 days | Native speaker reviewer if available |

Scores that affect an app by more than 10 points in either direction require two independent researcher sign-offs before merging.

---

## Style guide

### Writing app summaries

Summaries appear on each app's detail page. They should be:

- **Plain language.** Write for someone who has never read a privacy policy. Avoid jargon.
- **Factual and sourced.** Every claim in the summary should be traceable to a source in the sources array.
- **Specific.** "Shares data with third parties" is weak. "Shares location and device ID with 47 advertising partners, including known data brokers LiveRamp and Acxiom" is strong.
- **Neutral in tone.** We state what apps do, not what we think of them morally. The score expresses our judgment; the summary states facts.
- **Around 60–100 words.** Long enough to be meaningful, short enough to be read.

### Describing data types

Use the standardized data type labels below for consistency:

| Label | Covers |
|---|---|
| Precise Location | GPS coordinates, real-time location tracking |
| Approximate Location | City or region-level location |
| Contacts | Address book, contact names and numbers |
| Browsing History | In-app and cross-app web browsing |
| Purchase History | Transaction records, shopping behavior |
| Financial Info | Bank accounts, credit cards, payment data |
| Health Data | Medical records, fitness, menstrual tracking |
| Biometrics | Fingerprints, face scans, voice prints |
| Device ID | IMEI, advertising ID, hardware identifiers |
| Clipboard Contents | Text copied to the system clipboard |
| Keystrokes | Typing patterns and content |
| App Usage | Which apps are installed and how often used |
| Search History | In-app search queries |
| Voice Data | Audio recordings, voice commands |
| Face Data | Facial geometry, expressions, appearance |

If you need to add a new data type, open an issue first.

---

Thank you for making DataGuard better. What you do here is real — it helps real people make real decisions about their digital privacy.

Questions? Email contribute@dataguard.app or open a discussion on GitHub.
