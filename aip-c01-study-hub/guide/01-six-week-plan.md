# 6-Week Study Plan — AIP-C01

Start: 5 Sep 2026. Exam: **Mon 19 Oct 2026.** Front-loaded so Domains 1+2 (57% of the exam)
are done by end of Week 3.

Your rhythm (you're off Sun + Mon, work Tue–Sat):
- **Mon (off): heavy day** — the week's hands-on lab, 2–3 hrs.
- **Tue–Sat (work): light day** — one concept block + 5-question quiz, 60–90 min. Rest 1 day.
- **Sun (off): consolidation** — drill weak areas + a mini-mock + update tracker, ~2 hrs.

Every session opens with a 5-question drill from `weak-areas.md`. Start each with
"Start my study session" and Kiro runs the drill, teaches the day's topic, and quizzes it.

Checkpoint rule: don't leave a week until the tracker shows confidence 2+ on its core
topics. If you slip, say "re-plan my remaining weeks" and Kiro rebalances.

---

## Day 0 — This weekend (Sat–Sun 5–6 Sep): Setup

- [ ] Read `00-exam-blueprint.md` end to end. Skim the AIP-Materials study guide PDF.
- [ ] Get AWS access working for labs — say "help me sign in to AWS." Enable Bedrock model
      access for Claude + Titan Embeddings in us-east-1 (or us-west-2).
- [ ] Do **Lab 1** (Converse API) in `labs/lab-01-bedrock-converse/` — say "Start Lab 1."
- [ ] Take a 10-question diagnostic: "Give me a 10-question mixed diagnostic mock." Log the
      score in the tracker. This tells us your real starting point.

---

## Week 1 (Mon 7 – Sun 13 Sep): Domain 1a — FMs, model selection, data pipelines

Goal: confidently choose and call FMs on Bedrock, design for resilience, and prep data for
FM consumption. Maps to tasks 1.1, 1.2, 1.3.

- [ ] **Mon 7 (heavy):** FMs on Bedrock — Nova, Claude, Titan, Llama, Stable Diffusion; what
      each is for. Converse API vs InvokeModel (and *why Converse*). Extend Lab 1: call two
      different models through Converse and compare. Prompt: "Teach me Domain 1.2 model
      selection with a scenario, then quiz me."
- [ ] **Tue 8 (light):** Model selection — benchmarks, capability/limitation analysis,
      cost/capability tradeoffs. Quiz 5.
- [ ] **Wed 9 (light):** Resilience — Cross-Region Inference profiles, Step Functions circuit
      breaker, graceful degradation, dynamic model switching (Lambda/API Gateway/AppConfig).
      Quiz 5.
- [ ] **Thu 10 (light):** Customization lifecycle — fine-tuning vs RAG (when each), LoRA /
      adapters, SageMaker Model Registry, rollback strategies. Quiz 5.
- [ ] **Fri 11 (light):** Data pipelines for FMs — Glue Data Quality, SageMaker Data Wrangler/
      Processing, Transcribe, multimodal, Comprehend entity extraction, JSON input formatting.
      Quiz 5.
- [ ] **Sat 12 (light or rest):** Catch-up + re-read anything shaky. Quiz 5.
- [ ] **Sun 13 (consolidation):** Weak-area drill + 15-question Domain 1a mock. Update tracker.

End-of-week check: confidence 2+ on model selection, Converse API, Cross-Region Inference,
fine-tuning vs RAG, and data pipeline services.

---

## Week 2 (Mon 14 – Sun 20 Sep): Domain 1b — RAG, vector stores, retrieval, prompts

Goal: design and build RAG properly and control FM behaviour with prompts. Tasks 1.4, 1.5, 1.6.

- [ ] **Mon 14 (heavy):** **Lab 2 — Build a RAG Knowledge Base** (see `labs/`, ask Kiro to
      generate it). Bedrock KB over sample docs; retrieve-and-generate; observe chunking effects.
- [ ] **Tue 15 (light):** Vector stores — Bedrock KB, OpenSearch + Neural plugin, Aurora
      pgvector, DynamoDB; when to pick each; metadata frameworks. Quiz 5.
- [ ] **Wed 16 (light):** Chunking — fixed vs hierarchical vs semantic; advanced (FM-based)
      parsing for tables. Embeddings — Titan V2, dimensionality vs cost. Quiz 5.
- [ ] **Thu 17 (light):** Retrieval quality — hybrid search (keyword + vector), Bedrock
      reranker models, query expansion/decomposition, function-calling + MCP access. Quiz 5.
- [ ] **Fri 18 (light):** Prompt engineering — few-shot, chain-of-thought, structured JSON
      output; Bedrock Prompt Management (templates, versioning, approval, governance). Quiz 5.
- [ ] **Sat 19 (light or rest):** Bedrock Prompt Flows — sequential chains + conditional
      branching. Relate to your existing `AIP-Materials/PromptChaining.json`. Quiz 5.
- [ ] **Sun 20 (consolidation):** Weak-area drill + **25-question Domain 1 (full) mock**.
      Update tracker. This is the big one — Domain 1 is 31%.

End-of-week check: you can design a RAG pipeline end to end and justify every choice
(store, chunking, embeddings, reranking, prompt strategy) against a constraint.

---

## Week 3 (Mon 21 – Sun 27 Sep): Domain 2 — Agents, deployment, integration (26%)

Goal: build agentic solutions and integrate FMs into real architectures. Tasks 2.1–2.5.

- [ ] **Mon 21 (heavy):** **Lab 3 — Build an agent.** AgentCore Harness + a Gateway tool
      (classic Bedrock Agents is maintenance-mode; know it conceptually, build on AgentCore).
- [ ] **Tue 22 (light):** Agentic AI — Strands Agents, AWS Agent Squad (multi-agent),
      MCP (clients + Lambda/ECS MCP servers), ReAct + CoT via Step Functions. Quiz 5.
- [ ] **Wed 23 (light):** Agent safety + deployment — stopping conditions, timeouts, IAM
      boundaries, circuit breakers; Lambda on-demand vs provisioned throughput vs SageMaker
      endpoints; model cascading. Quiz 5.
- [ ] **Thu 24 (light):** FM API integration — streaming (ConverseStream / SSE / WebSockets),
      exponential backoff, rate limiting, fallback, X-Ray; static vs dynamic routing. Quiz 5.
- [ ] **Fri 25 (light):** Enterprise integration — API Gateway + Lambda + EventBridge,
      identity federation + RBAC, Outposts/Wavelength for residency/edge, CI/CD + GenAI
      gateway. Quiz 5.
- [ ] **Sat 26 (light or rest):** Dev tools/UX — Amplify UI, OpenAPI-first, Q Developer,
      Q Business data sources, Bedrock Data Automation. Quiz 5.
- [ ] **Sun 27 (consolidation):** Weak-area drill + **20-question Domain 2 mock**. Update
      tracker. **Milestone: 57% of the exam (D1+D2) now covered.**

End-of-week check: can pick the right deployment + integration pattern for a given
enterprise constraint, and design an agent with proper guardrails.

---

## Week 4 (Mon 28 Sep – Sun 4 Oct): Domain 3 — Safety, Security, Governance (20%)

Goal: safety controls, data protection, governance, responsible AI. Tasks 3.1–3.4.

- [ ] **Mon 28 (heavy):** **Lab 4 — Guardrails + PII pipeline.** Bedrock Guardrails (content/
      topic/PII filters + contextual grounding) + a Comprehend/Macie PII pre-filter; observe
      the CloudWatch-logs PII gap and fix it with KMS.
- [ ] **Tue 29 (light):** Input/output safety — Guardrails modes, custom moderation, defense
      in depth, prompt-injection + jailbreak detection. Quiz 5.
- [ ] **Wed 30 (light):** Hallucination reduction — KB grounding, confidence scoring, semantic
      similarity, JSON Schema enforcement. Quiz 5.
- [ ] **Thu 1 Oct (light):** Data security + privacy — VPC endpoints, IAM least privilege,
      Lake Formation; Comprehend + Macie PII; Guardrails masking + the CloudWatch log gap;
      S3 Lifecycle retention. Quiz 5.
- [ ] **Fri 2 (light):** Governance + compliance — SageMaker model cards, Glue lineage/Data
      Catalog, metadata attribution, CloudTrail, drift/policy detection, token-level redaction.
      Quiz 5.
- [ ] **Sat 3 (light or rest):** Responsible AI — transparency, agent tracing, fairness metrics,
      A/B via Prompt Management/Flows, LLM-as-a-judge. Quiz 5.
- [ ] **Sun 4 (consolidation):** Weak-area drill + **20-question Domain 3 mock**. Update tracker.

End-of-week check: 2+ on Guardrails, PII handling (incl. the logging gap), governance
tooling, and responsible-AI mechanisms.

---

## Week 5 (Mon 5 – Sun 11 Oct): Domains 4 + 5 — Optimization + Testing (12% + 11%)

Goal: cost/latency/monitoring and evaluation/troubleshooting. Tasks 4.1–4.3, 5.1–5.2.

- [ ] **Mon 5 (heavy):** **Lab 5 — Evaluate + observe + break/fix.** Run Bedrock Model
      Evaluations (or LLM-as-a-judge), wire CloudWatch Model Invocation Logs + a token/cost
      dashboard + X-Ray, then deliberately break a prompt/retrieval and diagnose it.
- [ ] **Tue 6 (light):** Cost + token efficiency — CountTokens, context pruning, response
      size controls, cost/capability tiering, provisioned throughput. Quiz 5.
- [ ] **Wed 7 (light):** Caching + latency — prompt caching, semantic caching, latency-
      optimized models, streaming, parallel requests, temperature/top-k/top-p tuning. Quiz 5.
- [ ] **Thu 8 (light):** Monitoring/observability — CloudWatch (token usage, hallucination
      rate), Model Invocation Logs, anomaly + cost anomaly detection, X-Ray, tool/multi-agent
      tracing. Quiz 5.
- [ ] **Fri 9 (light):** Evaluation — metrics (relevance/accuracy/consistency/fluency),
      Bedrock Model Evaluations, RAG eval, LLM-as-a-Judge, agent evals, A/B + canary,
      regression + quality gates. Quiz 5.
- [ ] **Sat 10 (light or rest):** Troubleshooting — context-window overflow + truncation,
      retrieval issues (embedding drift/vectorization), prompt problems, schema validation,
      X-Ray prompt observability. Quiz 5.
- [ ] **Sun 11 (consolidation):** Weak-area drill + **15-question D4+D5 mock**. Update tracker.

End-of-week check: **all five domains now covered.** Every core topic at 2+.

---

## Week 6 (Mon 12 – Sat 18 Oct): Full mocks + remediation + final review

Goal: convert knowledge into exam performance. No new topics — close gaps and build stamina.

- [ ] **Mon 12 (heavy):** Full **75-question timed mock** (180 min). Score it, log it, list
      every miss into `weak-areas.md`.
- [ ] **Tue 13 (light):** Remediate the mock — Kiro re-teaches only what you missed. Re-drill.
- [ ] **Wed 14 (light):** Second full **75-question timed mock** (fresh questions). Log + list misses.
- [ ] **Thu 15 (light):** Remediate mock 2. Focus practice on ordering + matching questions
      (no partial credit — easy points if drilled).
- [ ] **Fri 16 (light):** Targeted weak-area drills across all domains. Re-skim `00-exam-blueprint.md`.
- [ ] **Sat 17 (light):** Light review only — one 20-question mixed mock, review the service
      cheat-points, confirm exam logistics. Stop early.
- [ ] **Sun 18 (rest):** Rest. Skim notes if you must. Sleep well.
- [ ] **Mon 19 Oct — EXAM DAY.** 75 questions, 180 min. Pass = 750. You've got this.

Target before exam: consistently 80%+ on full mocks. If you're not there by Mon 12,
say "re-plan Week 6 to close my gaps" and Kiro reprioritises.

---

## If you fall behind

Protect the weights. In order of priority when time is short: Domain 1 → Domain 2 →
Domain 3 → the practice mocks → Domains 4/5. Never skip the mocks in Week 6. Say
"re-plan my remaining weeks, I have X hours per day" and Kiro rebuilds this schedule.
