# Lab 1 — Invoke Foundation Models with the Converse API

Your first hands-on rep. Small, cheap, and it teaches four things the exam leans on hard.

## What you'll learn (and where it's tested)

- Converse API vs InvokeModel, and why Converse is the default — Domain 1.3, 2.4.
- Model selection + cross-region inference profiles for availability/residency — Domain 1.2.
- Why `maxTokens` must be set explicitly (quota reservation → ThrottlingException) — Domain 4.1.
- Reading token usage from the response for cost/latency monitoring — Domain 4.3.
- Streaming (ConverseStream) for time-to-first-token — Domain 2.4, 4.2.

## Prerequisites

1. AWS credentials configured. If not, ask Kiro: "help me sign in to AWS."
2. Bedrock model access enabled for a Claude model and Titan Embeddings in your region
   (us-east-1 or us-west-2). Console → Bedrock → Model access.
3. Python 3.9+ and boto3 ≥ 1.34: `pip install -r requirements.txt`

## Steps

1. **Confirm access + discover current model IDs** (never hard-code a stale ID):
   ```bash
   aws bedrock list-foundation-models --region us-east-1 --query "modelSummaries[?contains(modelId,'claude')].modelId" --output table
   aws bedrock list-inference-profiles --region us-east-1 --query "inferenceProfileSummaries[].inferenceProfileId" --output table
   ```
   Pick a current cross-region profile id (starts with `us.`). Update `MODEL_ID` in `invoke.py`.

2. **Run a basic Converse call:**
   ```bash
   python invoke.py "Explain retrieval-augmented generation in two sentences."
   ```
   Note the printed token usage — that's what CloudWatch tracks for cost (Domain 4).

3. **Stream the same prompt** (watch tokens arrive incrementally):
   ```bash
   python invoke.py --stream "Explain retrieval-augmented generation in two sentences."
   ```

4. **Compare two models** on the same prompt (model selection reps):
   ```bash
   python invoke.py --compare "Summarise the tradeoff between fine-tuning and RAG."
   ```
   Observe quality vs token count vs latency — the exam's cost/capability tradeoff.

## Break it to learn it (Domain 5 troubleshooting reps)

Do these on purpose so you recognise them on the exam:

- **Drop the `us.` prefix** from `MODEL_ID` (use a bare model id for a cross-region-only
  model). Run it. You should hit `ResourceNotFoundException` or `AccessDeniedException`.
  Lesson: cross-region inference needs the geographic profile id.
- **Use the `bedrock` client instead of `bedrock-runtime`** (edit the client line). You'll
  get `UnknownOperationException`. Lesson: runtime = inference, control plane = management.
- **Read the maxTokens note in `invoke.py`.** Understand why leaving it unset silently
  reserves ~43x quota and triggers ThrottlingException under load. This is a favourite
  exam gotcha — it's a quota-reservation issue, not a rate issue.

After each break, say to Kiro: "quiz me on what just failed and why" to lock it in.

## Teardown

Nothing persistent or billable is created — Converse is pay-per-token. Do NOT create
provisioned throughput for this lab. If you experimented with it, say "tear down Lab 1".

## Self-check

When done, say: "Quiz me on Lab 1 concepts" — Kiro asks 5 scenario questions on Converse,
cross-region inference, maxTokens, and token monitoring, then logs any misses.

## Run this lab with Kiro

Say **"Start Lab 1"** and Kiro walks you through each step, checks your output, explains
errors, and adapts if your account/region differs.
