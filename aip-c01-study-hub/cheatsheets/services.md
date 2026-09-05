# Cheat Sheet — Services One-Liners

The in-scope services, one line each, with the GenAI angle. If you can say what each is *for*
and *when you'd pick it over a sibling*, you're ready.

## Core GenAI / ML

- **Amazon Bedrock** — one API to many FMs (Claude, Nova, Llama, Titan). Serverless, per-token.
- **Bedrock Knowledge Bases** — managed RAG: point at S3, get retrieval. Easiest vector path.
- **Bedrock Guardrails** — content/PII/topic filters + contextual grounding (anti-hallucination).
- **Bedrock Prompt Management / Prompt Flows** — versioned prompts / visual prompt chains.
- **Bedrock AgentCore** — current agent platform (Harness, Gateway, Memory, Identity, Policies).
- **SageMaker AI** — build/train/host your own models; endpoints for custom/self-hosted FMs.
  - **Clarify** (bias + explainability), **Model Monitor** (drift), **Model Registry**
    (versioning), **Ground Truth** (labeling), **JumpStart** (prebuilt models), **Neo** (edge).
- **Comprehend** — NLP: entity recognition + PII detection in text you send it.
- **Textract** — extract text/tables/forms from documents.
- **Transcribe** — speech → text (PII redaction, custom vocab).
- **Rekognition** — image/video analysis.
- **Kendra** — ML-powered enterprise document search (natural language).
- **Q Business / Q Apps** — enterprise RAG assistant + no-code GenAI apps over your data.
- **Q Developer** — AI coding assistant (generate/refactor/debug, security scans).

## Vector / data stores

- **OpenSearch Service** — search + vector store; hybrid search; Neural plugin calls Bedrock.
- **Aurora (pgvector)** — Postgres with vector search; good if you're already on Aurora.
- **S3 Vectors** — simple, cheap vector storage.
- **DynamoDB** — key-value/NoSQL; store metadata + embeddings; DAX for caching; TTL.
- **RDS** — relational; often paired with S3 document repositories.
- **Neptune** — graph DB with vector query support.

## Integration / compute / orchestration

- **Lambda** — serverless glue: call FMs on demand, tool handlers, pre/post-processing.
- **Step Functions** — orchestrate workflows; ReAct loops, circuit breaker, prompt chaining.
- **API Gateway** — front door for FM APIs; streaming, rate limiting, request validation.
- **EventBridge / SNS / SQS** — event-driven + async decoupling (SQS for async FM jobs).
- **AppConfig** — dynamic config, e.g. switch FM without redeploy.
- **AppFlow** — move data between SaaS (Salesforce) and AWS for pipelines.
- **Amplify** — quick front-end/UI for GenAI apps.
- **Step Functions vs Lambda** — Lambda = one step; Step Functions = multi-step orchestration.

## Data pipeline

- **Glue** (+ **Data Quality**, **Data Catalog**) — ETL, data quality checks, lineage.
- **SageMaker Data Wrangler / Processing** — prep and transform data for models.
- **Bedrock Data Automation (BDA)** — extract structured data from docs/images/audio/video.
- **Kinesis** — streaming data ingestion.

## Security / governance / ops

- **IAM** (+ Identity Center, Access Analyzer) — identities, roles, least privilege.
- **KMS** — encryption keys (encrypt CloudWatch Logs for the PII gap!).
- **Macie** — find sensitive data in S3. **Secrets Manager** — store/rotate credentials.
- **Cognito** — app user auth. **WAF** — web app firewall. **PrivateLink/VPC** — private networking.
- **CloudWatch** (+ Logs, Model Invocation Logs) — metrics, logs, token usage, alarms.
- **CloudTrail** — API audit log. **X-Ray** — distributed tracing across FM calls.
- **Lake Formation** — fine-grained data-lake access control.
- **Cost Anomaly Detection / Cost Explorer** — watch and explain spend.

## Deployment / edge

- **Outposts** — AWS hardware on-prem (data residency). **Wavelength** — edge/5G low latency.
- **CodePipeline / CodeBuild / CodeDeploy** — CI/CD for GenAI apps. **CDK** — infra as code.
