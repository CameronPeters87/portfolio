# Cheat Sheet — Domain 4: Operational Efficiency & Optimization (12%)

**Big idea:** make it cheaper and faster without losing quality — fewer/cheaper tokens,
caching, the right model, good monitoring.

**Remember 3 things:** (1) Cost is mostly **tokens** — prune context, cap output. (2) Caching
+ dynamic routing are the big savers. (3) `temperature`/`top_p`/`top_k` control randomness.

## Concepts in plain English

- **Tokens = cost.** Fewer tokens in and out = less money. Levers:
  - **CountTokens API** (free) — estimate a prompt's tokens *before* you call the model.
  - **Context pruning** — send fewer/again more relevant RAG chunks; summarize old chat.
  - **Response size controls** — set `maxTokens`, or instruct "answer in 50 words."
- **Cost/capability tiering** — use the *smallest model that works*; let RAG/tools do the
  heavy lifting. **Dynamic (intelligent) routing** sends hard queries to big models, easy
  ones to cheap models.
- **Caching** (biggest savers):
  - **Prompt caching** — cache a static prompt prefix (system prompt/instructions) so it
    isn't re-tokenized every call. Cheaper + faster. ⚠️ Zero cache hits usually = the prefix
    changed (timestamps, whitespace, reordered JSON) — keep it byte-identical.
  - **Semantic caching** — reuse a stored answer when a new query means the same thing.
- **Latency levers** — **latency-optimized** Bedrock models, **response streaming** (lower
  time-to-first-token), **parallel requests** for multi-part work.
- **Model parameters** — **temperature** (0 = deterministic/factual, 1 = creative/random),
  **top_p** (nucleus sampling), **top_k** (limit token choices). Low temp for factual tasks.
- **Provisioned throughput** — pre-buy capacity for steady high-volume workloads (tied to a
  model ARN). Otherwise on-demand.
- **Monitoring** — **CloudWatch** (`InputTokenCount`, `OutputTokenCount`, latency/TTFT),
  **Bedrock Model Invocation Logs** (full request/response), **anomaly + cost anomaly
  detection**, **X-Ray** for tracing, tool-calling + multi-agent observability.

## Exam traps

- "Reduce cost but keep quality" → smaller model + RAG, **caching**, context pruning — not
  just "use a cheaper model" blindly.
- **Prompt caching not working** → cache fragmentation (dynamic content in the cached prefix).
- **temperature = 0** for deterministic/factual; high temp for creative. Know the direction.
- **CountTokens is free** and used *before* invoking — don't confuse with billing metrics.
