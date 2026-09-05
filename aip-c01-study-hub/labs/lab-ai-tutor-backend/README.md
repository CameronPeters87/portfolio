# Lab (optional) — AI Tutor Backend: real LLM tutoring + cross-device progress

This is the "add real AI + sync across devices" upgrade to the study app. It's **optional**
and it's the perfect capstone: you build the exact kind of GenAI app the exam tests, in your
own AWS account, and end up with a smarter study tool.

Do this around **Week 3–5**, once you've done Labs 1–2 (Converse + Knowledge Bases). Until
then, **Kiro is your AI tutor** — it reads your tracker/weak areas and adapts. This lab just
moves that capability into the app itself.

## What you'll build (and where it's tested)

A tiny serverless backend the static app calls:

```
Study app (browser)
   │  HTTPS
   ▼
API Gateway  ──►  Lambda  ──►  Bedrock (Converse API)      # explain concepts, generate questions
   │                    └──►  DynamoDB                      # progress + weak areas, synced across devices
   └── Cognito (auth)                                       # so it's your data, not the world's
```

- Bedrock Converse for tutoring/question generation — **Domain 1** (FM integration, prompts).
- API Gateway + Lambda + streaming — **Domain 2** (API integration).
- DynamoDB for progress — **Domain 2** (state), replaces browser-only localStorage.
- Cognito auth + least-privilege IAM + Secrets Manager — **Domain 3** (security).
- CloudWatch token metrics + a cost guard — **Domain 4** (cost/monitoring).

So building it *is* studying Domains 1–4.

## Build it with Kiro (when ready)

Say **"Build the AI tutor backend lab"** and Kiro will, step by step:
1. Scaffold a Lambda that calls Bedrock Converse (explain-a-concept + generate-questions),
   with `maxTokens` set and adaptive retries.
2. Put it behind API Gateway (HTTP API) with a Cognito authorizer.
3. Add a DynamoDB table for `userId → progress/weakAreas` (cross-device sync).
4. Wire the static app to call it (feature-flag: falls back to localStorage if the backend
   is off), so the app still works offline.
5. Add a CloudWatch dashboard for token usage + an AWS Budgets alarm.

## Guardrails (important)

- **No credentials in the browser.** The app calls API Gateway; only Lambda talks to Bedrock
  via its IAM role. Never put AWS keys in `app.js`/`data.js`.
- **Cost:** Bedrock is pay-per-token and DynamoDB/Lambda have free tiers, so this is cheap —
  but set an **AWS Budgets** alarm and cap `maxTokens`. Say "tear down the AI tutor backend"
  to delete API Gateway, Lambda, DynamoDB, and Cognito when done.
- **Keep the static app working without it** — the backend is an enhancement, not a
  dependency. Your studying never blocks on infrastructure.

## Why not build it first?

Don't let building the app become procrastination from studying. The static app + Kiro
already cover learning, quizzing, and weak-area tracking. Add this only once the core
Bedrock concepts click — then it's revision, not a detour.
