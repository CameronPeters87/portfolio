# Cheat Sheet — Exam Day Strategy

**Format:** 75 questions, 180 minutes, pass = 750/1000. That's ~2.4 min/question. Multiple
choice, multiple response (choose N), plus **ordering** and **matching**. **No partial
credit** on multiple-response, ordering, or matching — get the whole thing right.

## The one habit that wins this exam

Every scenario has a **constraint** — cost, latency, least change, compliance, data
residency, availability. Two answers will look technically correct; the right one **best fits
the stated constraint**. Underline the constraint in your head before reading the options.

## Time strategy

- First pass: answer what you know fast. **Flag** anything that takes >2 min and move on.
- 75 questions in ~150 min = leave ~30 min for flagged ones + review.
- Never leave a question blank — no penalty for guessing after eliminating.
- On multiple-response: the question says how many to pick. Match that exactly.

## How to attack a scenario question

1. Read the **last line first** (it's the actual question).
2. Spot the **constraint** (cost? latency? security? least effort?).
3. Eliminate the obviously wrong (wrong service, out-of-scope, deprecated-for-new-builds).
4. Between the final two, pick the one that fits the constraint — not the "most powerful."

## High-frequency trap patterns (from the domains)

- **RAG vs fine-tuning** → changing facts = RAG; style/format = fine-tune; cheap fine-tune = LoRA.
- **Unset `maxTokens`** → the cause of "random throttling with low traffic."
- **Guardrails PII** masks the *response* only → unmasked PII still in **CloudWatch Logs** →
  encrypt with **KMS**.
- **New agent build** → **AgentCore**, not classic Bedrock Agents (deprecating).
- **Slow first token** → **streaming**. **Reduce cost** → caching + smaller model + prune context.
- **Comprehend** (PII in text) vs **Macie** (PII in S3).
- **temperature 0** = deterministic/factual.
- **ROUGE** = summarization overlap; **faithfulness** = grounded to retrieved context.
- **Query KB before ingestion done** = empty results (not an error).
- **PrivateLink / VPC endpoints** = keep sensitive data off the public internet.

## The morning of

- Government-issued ID ready (or check-in early for online proctoring).
- Quiet room, clear desk, stable internet if online.
- Don't cram new topics. Re-skim the 5 domain cheat sheets + this page. Trust the reps.
- Read every question twice. Manage the clock. Flag and move. You've done the work.
