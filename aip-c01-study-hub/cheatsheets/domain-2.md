# Cheat Sheet — Domain 2: Implementation and Integration (26%)

**Big idea:** turn a model into a real system — agents that use tools, deployed the right
way, wired into APIs and enterprise apps, resiliently.

**Remember 3 things:** (1) New agents → **AgentCore**, not classic Bedrock Agents. (2) Match
the deployment to the need (Lambda vs provisioned vs SageMaker). (3) Resilience = backoff +
retries + fallback + streaming.

## Concepts in plain English

- **Agent** — an FM that can *plan, use tools, and remember*. It decides which tool/API to
  call to get something done.
- **Bedrock Agents (classic)** — the original way (action groups + OpenAPI schema). ⚠️ Now in
  **maintenance mode / deprecating** — know it conceptually, but build new on AgentCore.
- **Amazon Bedrock AgentCore** — the current agent platform:
  - **Harness** = managed run loop from config, no orchestration code (fastest path).
  - **Gateway** = turns your REST APIs / Lambdas into agent tools.
  - **Memory** = short-term (this chat) + long-term (across sessions).
  - **Identity / Policies** = who the agent acts as, and its guardrails.
- **Strands Agents / AWS Agent Squad** — AWS frameworks for building single and **multi-agent**
  systems (an orchestrator delegates to worker agents).
- **MCP (Model Context Protocol)** — a universal plug for agent↔tool communication. Build MCP
  servers on **Lambda** (light tools) or **ECS** (heavy tools).
- **ReAct / chain-of-thought orchestration** — the agent reasons then acts in a loop; you can
  orchestrate this with **Step Functions**.
- **Agent safety** — stopping conditions, timeouts (Lambda), IAM resource boundaries, circuit
  breakers. Always cap what an autonomous agent can do.
- **Deployment choices** (classic exam question):
  - **Lambda** → on-demand, spiky, pay-per-call.
  - **Bedrock provisioned throughput** → steady high volume needing guaranteed capacity.
  - **SageMaker endpoint** → you host your own/custom model (GPU, big memory).
  - **Model cascading** → cheap model first, escalate to expensive only when needed.
- **Enterprise integration** — API Gateway + Lambda + **EventBridge** (event-driven, loose
  coupling); identity federation + RBAC + least privilege; **Outposts** (on-prem) /
  **Wavelength** (edge) for data-residency/latency.
- **FM API integration** — **streaming** (ConverseStream / SSE / WebSockets) for fast
  time-to-first-token; **exponential backoff** + rate limiting + fallback for resilience;
  **X-Ray** to trace across services.
- **Routing** — **static** (fixed rules) vs **dynamic** (Step Functions / metrics send hard
  queries to big models, easy ones to cheap models).
- **Dev tools** — **Amplify** (quick UI), **OpenAPI-first** design, **Q Developer** (code
  gen/refactor/debug), **Q Business** (enterprise RAG assistant over your data sources).

## Exam traps

- Choosing classic **Bedrock Agents** for a *new* build → prefer **AgentCore**.
- Confusing **provisioned throughput** (Bedrock capacity) with a **SageMaker endpoint**
  (self-hosted model). Different problems.
- Forgetting agent **guardrails/stopping conditions** — the exam loves "runaway agent" risk.
- "Slow first token in a chat UI" → **streaming**, not a bigger instance.
- Backoff/retry is for **throttling/timeouts**; don't retry ValidationException/AccessDenied.
