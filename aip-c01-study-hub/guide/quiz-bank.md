# Quiz Bank

Scenario questions in the real AIP-C01 style: constraint-driven, plausible distractors,
no "which service does X" softballs. Answers are hidden below each question — cover them.

How to use with Kiro:
- "Quiz me on Domain 1" → I generate 5 fresh questions, wait for your answers, then grade
  with explanations and log misses to weak-areas.md.
- "Add these to the quiz bank" → I append the day's questions here so the bank grows.
- "Give me a 15-question mixed mock weighted like the exam" → 31/26/20/12/11 split.

Difficulty tags: [F]undamental, [S]cenario, [T]ricky. Question types mirror the exam:
MCQ (one answer), MRQ (choose N, no partial credit), ORDER (sequence), MATCH (pair).

---

## Q1 [S] MCQ — Domain 1 (model selection / resilience)

A production chat feature uses Claude Sonnet on Bedrock in us-east-1. During regional
demand spikes the app intermittently throws ThrottlingException even though request
volume is flat. Latency is not a concern. Which change best restores reliability with the
least code?

A. Switch to InvokeModel and add a manual retry loop
B. Move to a SageMaker real-time endpoint with auto-scaling
C. Use a cross-region inference profile (e.g. `us.` prefix) and set `maxTokens` explicitly
D. Purchase provisioned throughput for the model

<details><summary>Answer</summary>

**C.** Flat request volume with ThrottlingException is the classic signature of unset
`maxTokens` silently reserving the model's maximum output tokens, compounded by
single-region quota. Setting `maxTokens` explicitly and using a cross-region inference
profile spreads load across regions with no app rewrite. D works but costs more and is
overkill when latency isn't the issue; B is a heavier migration; A doesn't address quota
reservation. (Skills 1.2.2/1.2.3, Domain 4 caching/quota.)
</details>

---

## Q2 [S] MRQ — Domain 1 (RAG quality)

A RAG assistant over dense PDF contracts (many tables) returns answers that miss
clauses and occasionally invents terms. Which TWO changes most directly improve
retrieval faithfulness? (Choose two.)

A. Increase `maxTokens` on the generation model
B. Use advanced (FM-based) parsing + semantic or hierarchical chunking
C. Add a Bedrock Guardrail contextual grounding check
D. Switch the embedding model to a larger general-purpose LLM
E. Raise the generation temperature to 0.9

<details><summary>Answer</summary>

**B and C.** Table-heavy PDFs lose structure with naive fixed chunking, so FM-based
parsing + semantic/hierarchical chunking fixes the "misses clauses" half. A contextual
grounding check catches responses that drift from retrieved context (the "invents terms"
half). A only lengthens output; D confuses embeddings with generation and larger ≠ better
for embeddings; E increases hallucination. (Skills 1.4/1.5, 3.1.3.)
</details>

---

## Q3 [T] MCQ — Domain 3 (PII compliance gotcha)

A healthcare app uses Bedrock Guardrails to mask PII in model responses. An auditor still
finds patient identifiers in plaintext. Where are they, and what's the fix?

A. Guardrails failed; raise the PII filter strength
B. In CloudWatch Logs — Guardrails masks the response, not the logged input; encrypt logs
   with KMS and restrict access
C. In the vector store; enable encryption at rest
D. In the S3 source bucket; apply a bucket policy

<details><summary>Answer</summary>

**B.** Guardrails PII masking applies to the API response only. The original unmasked
content is still written to CloudWatch Logs in plaintext. For HIPAA/GDPR, encrypt the log
groups with KMS, restrict access with IAM, and consider Macie for detection. This is a
frequently-tested nuance. (Skill 3.2.2 + Bedrock Critical Warnings.)
</details>

---

## Q4 [S] MCQ — Domain 2 (agentic design, current best practice)

You are building a NEW autonomous agent that calls internal REST APIs as tools and needs
a managed run loop without writing orchestration code. Which approach fits best today?

A. Classic Bedrock Agents with action groups
B. An AgentCore Harness (config-based loop) with a Gateway exposing the APIs as tools
C. A single Lambda that prompt-chains manually
D. Amazon Q Business with plugins

<details><summary>Answer</summary>

**B.** Classic Bedrock Agents is in maintenance mode and closed to new customers, so new
builds use AgentCore — the Harness gives a managed config-based loop, and Gateway turns
REST APIs into agent tools. C loses managed orchestration; D is an end-user assistant, not
a custom-tool agent. Watch the exam wording: it still tests classic Agents concepts, but
"new build / best practice today" points to AgentCore. (Skill 2.1, AgentCore services.)
</details>

---

## Q5 [S] ORDER — Domain 1/5 (build a RAG KB)

Put these steps to stand up and validate a Bedrock Knowledge Base in the correct order:

1. Run a retrieval quality test against a golden question set
2. Create the vector store and Knowledge Base pointing at the S3 data source
3. Choose chunking + embedding strategy for the document type
4. Start the ingestion job and wait for completion
5. Upload/prepare source documents in S3

<details><summary>Answer</summary>

**5 → 3 → 2 → 4 → 1.** Prepare data, decide chunking/embeddings, create the KB, ingest
(querying before ingestion completes returns empty), then evaluate retrieval quality.
Ordering questions have no partial credit — the whole sequence must be right.
</details>

---

## Q6 [S] MATCH — Domain 4 (pick the optimization lever)

Match each symptom to the best first lever:

Symptoms: (a) repeated identical system prompts inflating cost; (b) simple queries hitting
an expensive model; (c) streaming UI feels slow to first token; (d) cost spikes from
oversized outputs.

Levers: (i) intelligent/dynamic model routing to a cheaper model; (ii) prompt caching;
(iii) latency-optimized model + response streaming; (iv) response size controls / maxTokens.

<details><summary>Answer</summary>

a-ii, b-i, c-iii, d-iv. Prompt caching discounts a repeated static prefix; dynamic routing
sends simple queries to cheaper models; latency-optimized models + streaming cut
time-to-first-token; response size controls cap output cost. (Domain 4.1/4.2.)
</details>

---

_Add new questions below this line as the bank grows._
