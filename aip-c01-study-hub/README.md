# AIP-C01 Study Hub

A simple, self-paced study system for the **AWS Certified Generative AI Developer –
Professional (AIP-C01)** exam. Cheat sheets, a 6-week plan, flashcards, and an adaptive
quiz that tracks your weak areas — all in a single static web app that runs on any device,
online or offline. Built with [Kiro](https://kiro.dev).

> Studying for AIP-C01 too? Fork it, open it, follow the daily ritual. See "Use your own
> copy" below.

## Use it

- **Fastest:** open `index.html` in any browser (double-click it). No install, works offline.
- **Anywhere:** publish to GitHub Pages (below) and open the link on your phone or laptop.
- Progress (checked tasks, quiz results, weak areas) is saved in your browser on that device.

## The method (why it works)

- **Domain-weighted:** Domains 1 + 2 are 57% of the exam, so the plan front-loads them.
- **Active recall:** flashcards + an adaptive quiz that re-tests what you get wrong.
- **Hands-on:** weekly labs build the real Bedrock systems the exam tests.
- **A daily ritual, not a pile of PDFs:** warm up on weak areas → learn today's topic →
  prove it with a quiz. See `START-HERE.md`.

## What's inside

```
index.html, styles.css, app.js, data.js   The web app (edit data.js to add content)
START-HERE.md                              Read this first — the simple daily driver
guide/
  00-exam-blueprint.md                     Official domains, tasks, weights, services
  01-six-week-plan.md                      Dated plan, Week 1 day-by-day
  02-course-map.md                         Udemy course → plan mapping
  progress-tracker.md, weak-areas.md       Manual trackers (the app tracks too)
  quiz-bank.md, driving-kiro.md            Question bank + how to use Kiro as a tutor
cheatsheets/                               Plain-English cheat sheets: domain-1..5, services, exam-day
labs/                                      Hands-on builds (Lab 1 ready; others generated on demand)
```

## Use your own copy (publish to GitHub Pages)

```bash
# from this folder, on a machine logged into your GitHub:
git init && git add -A && git commit -m "AIP-C01 study hub"
git branch -M main
git remote add origin https://github.com/<you>/aip-c01-study-hub.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build from branch → `main` / root**. Your app goes live
at `https://<you>.github.io/aip-c01-study-hub/` within a minute or two.

## Add more content

The app reads everything from `data.js` (schedule, cheat sheets, flashcards, quiz). Ask Kiro
"add 20 quiz questions and 15 flashcards to the app" and it edits `data.js` for you — no code
needed.

## Credits + license

Built by Cameron Peters with Kiro, Sept 2026. Study content is derived from the public AWS
exam guide and general AWS documentation. Shared under the MIT License (see `LICENSE`) so
anyone can learn with it. Not affiliated with or endorsed by AWS.
