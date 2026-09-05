# Udemy Course → Plan Map

Your Udemy course ("Ultimate AWS Certified Generative AI Developer – Professional",
Frank Kane + Stéphane Maarek, 21 sections, ~25 hrs, 2 full practice exams). This maps each
course section to the exam domain and the week you should watch it. Watch at 1.25–1.5x.

Rule: **watch the section, then read the matching cheat sheet, then quiz yourself.** Don't
just watch passively — the exam is scenarios, not recall.

| Course section | Exam domain | Watch in | Hands-on |
|----------------|-------------|----------|----------|
| 1. Bedrock & GenAI Fundamentals (Bedrock, Converse, fine-tuning/LoRA, RAG, KBs, chunking, embeddings, Guardrails, Prompt Mgmt/Flows, prompt engineering, WA GenAI Lens) | D1 (+D3 guardrails) | **Week 1–2** | Lab 1 (Converse), Lab 2 (RAG KB), Bedrock KB hands-on |
| 2. Managing Data for GenAI (structured data, BDA, Data Wrangler, Glue, CloudWatch, Transcribe, Comprehend, OpenSearch, S3 Vectors, RDS, Aurora pgvector, DynamoDB, re-rankers, S3 classes/lifecycle/replication/encryption) | D1 | **Week 2** | KB + vector store hands-on |
| 3. Agentic AI (Bedrock Agents classic, multi-agent, memory, Strands, Agent Squad, AgentCore, MCP, OpenAPI, HITL, Q Business, Q Apps, Amazon Quick) | D2 | **Week 3** | Lab 3 (agent on AgentCore) |
| 4. Operational Efficiency & Optimization (token efficiency, model selection, caching, responsive systems, retrieval perf, backoff, Cross-Region Inference) | D4 | **Week 5** | Lab 5 (optimize) |
| 5. Managing Models with SageMaker AI (deployment safeguards, Ground Truth, Model Monitor/Clarify, Model Registry, lineage, Neo, Unified Studio, Pipelines, JumpStart) | D1/D2 (+governance) | **Week 3** (skim), **Week 5** (governance) | JumpStart hands-on |
| 6. More Tools (Lambda, API Gateway, AppConfig, Step Functions, CodePipeline/Build/Deploy, MLFlow, AppSync, Outposts, Wavelength, SQS, Amplify, EventBridge, SNS, AppFlow) | D2 | **Week 3** | Step Functions prompt-chaining lab |
| 7. Governance & QA (agent tracing, eval techniques, ROUGE/BLEU/BERT, Bedrock Model Evaluations, deployment validation, responsible AI, CloudWatch, CloudTrail, X-Ray, Lake Formation) | D5 (+D3, D4) | **Week 4–5** | Lab 5 (evaluate + observe) |
| 8. Security, Identity, Compliance (least privilege, data masking, IAM, KMS, Macie, Secrets Manager, Cognito, WAF, VPC, PrivateLink) | D3 | **Week 4** | Lab 4 (Guardrails + PII) |
| 9. Analytics/Other (Athena, EMR, QuickSight, Kinesis, MSK) | cross-domain | **Week 5** | — |

## The two practice exams (your most valuable asset)

The course includes **two full 75-question practice exams**. Use them like this:
- **Practice Exam 1 → early, as a diagnostic** (Day 0 / end of Week 1). Expect a low score;
  it just shows your starting point. Log it in the tracker.
- **Practice Exam 2 → Week 6, timed (180 min)** as your real readiness check. Target 80%+.
- After each: put **every missed topic** into the app's weak areas (or tell Kiro "log these
  misses"), then re-drill until they're green.
- Also do the **section quizzes** (120 questions across the course) as you finish each section.

## Two things the course flags that match the exam's modern slant

- Bedrock **Agents classic is being deprecated** — learn it conceptually, but build new
  agents on **AgentCore** (Harness, Gateway, Memory, Identity, Policies).
- The course covers **Amazon Quick, S3 Vectors, Strands, Agent Squad** — all newer, all
  fair game. Don't skip section 3.
