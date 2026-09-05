# AIP-C01 Exam Blueprint (reference)

The single source of truth for what the exam covers. Everything in the study plan maps
back to a domain and task here. Source: official AWS Certified Generative AI Developer –
Professional exam guide (Version 1.0 AIP-C01) plus the AIP-Materials study guide.

## Exam facts

- Certification: AWS Certified Generative AI Developer – Professional
- Exam code: AIP-C01
- Questions: 75 (scored + a few unscored)
- Time: 180 minutes
- Cost: 300 USD
- Scoring: 100–1,000, pass mark 750 (compensatory — a weak domain still hurts the total)
- Question types: multiple choice, multiple response (no partial credit), and two NEW
  types — ordering (place 3–5 steps in sequence) and matching (pair items across two
  lists). No partial credit on the new types either.
- Target profile: 2+ years building production apps on AWS, 1 year hands-on GenAI.

## The five domains (weights)

| # | Domain | Weight | Weeks |
|---|--------|--------|-------|
| 1 | Foundation Model Integration, Data Management, and Compliance | 31% | 1–2 |
| 2 | Implementation and Integration | 26% | 3 |
| 3 | AI Safety, Security, and Governance | 20% | 4 |
| 4 | Operational Efficiency and Optimization for GenAI Applications | 12% | 5 |
| 5 | Testing, Validation, and Troubleshooting | 11% | 5 |

Domains 1 + 2 are 57% of the exam. That is why the plan spends the first three weeks
there. The exam is scenario- and architecture-driven — expect "given these constraints,
which design/service/parameter is correct," not "which service does X."

## Domain 1 — Foundation Model Integration, Data Management, Compliance (31%)

- 1.1 Analyze requirements and design GenAI solutions (FMs, integration patterns,
  deployment strategies; PoCs on Bedrock; AWS Well-Architected GenAI Lens).
- 1.2 Select and configure FMs (benchmarks/capability analysis; dynamic model selection
  via Lambda/API Gateway/AppConfig; resilience via Step Functions circuit breakers and
  Bedrock Cross-Region Inference; customization lifecycle — LoRA/adapters, SageMaker
  Model Registry, rollback).
- 1.3 Data validation + processing pipelines for FM consumption (Glue Data Quality,
  SageMaker Data Wrangler/Processing, Transcribe, multimodal, JSON formatting,
  Comprehend entity extraction, Lambda normalization).
- 1.4 Vector store solutions (Bedrock Knowledge Bases, OpenSearch + Neural plugin,
  Aurora/RDS, DynamoDB; metadata frameworks; sharding/hierarchical indexing;
  incremental update/sync).
- 1.5 Retrieval mechanisms (chunking — fixed/hierarchical/semantic; Titan embeddings
  and dimensionality; OpenSearch/Aurora pgvector/Bedrock KB vector search; hybrid
  search + Bedrock reranker models; query expansion/decomposition; function-calling +
  MCP access patterns).
- 1.6 Prompt engineering + governance (Bedrock Prompt Management templates/versioning/
  approval; Guardrails; CoT and structured components; QA and regression via Lambda/
  Step Functions/CloudWatch; Bedrock Prompt Flows for chains + branching).

## Domain 2 — Implementation and Integration (26%)

- 2.1 Agentic AI + tool integration (Strands Agents, AWS Agent Squad, MCP; ReAct + CoT
  via Step Functions; stopping conditions/timeouts/IAM boundaries/circuit breakers;
  model ensembles; human augmentation; Lambda/ECS MCP servers).
- 2.2 Model deployment strategies (Lambda on-demand, Bedrock provisioned throughput,
  SageMaker endpoints; container patterns for GPU/memory/token throughput; model
  cascading).
- 2.3 Enterprise integration (API/event-driven with legacy systems; API Gateway + Lambda
  + EventBridge; identity federation + RBAC + least privilege; Outposts/Wavelength for
  data residency/edge; CI/CD + GenAI gateway abstraction layers).
- 2.4 FM API integrations (Bedrock APIs sync + SQS async; streaming APIs / WebSockets /
  SSE; exponential backoff + rate limiting + fallback + X-Ray; static vs dynamic routing).
- 2.5 App integration patterns + dev tools (API Gateway streaming/token limits; Amplify
  UI; OpenAPI-first; Prompt Flows no-code; Q Business data sources; Q Developer for
  code gen/refactor/troubleshooting; CloudWatch Logs Insights + X-Ray for FM debugging).

## Domain 3 — AI Safety, Security, and Governance (20%)

- 3.1 Input/output safety (Guardrails filtering; custom moderation via Step Functions/
  Lambda; hallucination reduction via KB grounding + confidence scoring + JSON Schema;
  defense-in-depth with Comprehend pre-filter; prompt-injection + jailbreak detection).
- 3.2 Data security + privacy (VPC endpoints, IAM least privilege, Lake Formation;
  Comprehend + Macie PII detection; Bedrock data privacy; Guardrails PII masking; S3
  Lifecycle retention). NOTE: Guardrails PII masking applies to the response only —
  unmasked PII is still written to CloudWatch Logs, so encrypt logs with KMS.
- 3.3 Governance + compliance (SageMaker model cards; Glue data lineage + Data Catalog;
  metadata tagging for source attribution; CloudTrail audit logging; drift/policy-violation
  detection; token-level redaction; response logging).
- 3.4 Responsible AI (transparency + reasoning displays; Bedrock agent tracing;
  fairness metrics in CloudWatch; A/B testing via Prompt Management/Flows;
  LLM-as-a-judge; model cards for limitations).

## Domain 4 — Operational Efficiency and Optimization (12%)

- 4.1 Cost + token efficiency (CountTokens API; context window optimization; response
  size controls; prompt compression + context pruning; cost/capability tiering;
  provisioned throughput; semantic/prompt caching).
- 4.2 Performance (latency-cost tradeoffs; latency-optimized Bedrock models; parallel
  requests; response streaming; index/query optimization + hybrid search; batch inference;
  temperature and top-k/top-p tuning; auto-scaling for GenAI traffic).
- 4.3 Monitoring (CloudWatch token usage / prompt effectiveness / hallucination rate;
  Bedrock Model Invocation Logs; anomaly + cost anomaly detection; X-Ray tracing;
  tool-calling + multi-agent observability; golden datasets + output diffing).

## Domain 5 — Testing, Validation, and Troubleshooting (11%)

- 5.1 Evaluation (relevance/accuracy/consistency/fluency metrics; Bedrock Model
  Evaluations; A/B + canary; RAG evaluation; LLM-as-a-Judge; agent evaluations —
  task completion + tool usage; regression testing + quality gates; deployment
  validation for hallucination/semantic drift).
- 5.2 Troubleshooting (context-window overflow + dynamic chunking + truncation; FM API
  integration errors; prompt-engineering problems + version comparison; retrieval issues —
  embedding quality/drift/vectorization/chunking; template testing + X-Ray prompt
  observability + schema validation).

## Concepts likely to appear

RAG, vector DBs + embeddings, prompt engineering/management, FM integration, agentic AI,
responsible AI, content safety/moderation, model evaluation/validation, cost optimization,
performance tuning, monitoring/observability, security/governance, API design patterns,
event-driven architecture, serverless, container orchestration, IaC, CI/CD for AI, hybrid
cloud, enterprise integration.

## In-scope AWS services (study these; ignore the rest)

- ML / GenAI (highest yield): Amazon Bedrock, Bedrock AgentCore, Bedrock Knowledge
  Bases, Bedrock Prompt Management, Bedrock Prompt Flows, Comprehend, Kendra, Lex,
  Q Business, Q Business Apps, Q Developer, Rekognition, SageMaker AI (Clarify, Data
  Wrangler, Ground Truth, JumpStart, Model Monitor, Model Registry, Neo, Processing,
  Unified Studio), Textract, Titan, Transcribe, Amazon Augmented AI (A2I).
- Application Integration: AppFlow, AppConfig, EventBridge, SNS, SQS, Step Functions.
- Compute: App Runner, EC2, Lambda, Lambda@Edge, Outposts, Wavelength.
- Containers: ECR, ECS, EKS, Fargate.
- Database: Aurora (pgvector), DocumentDB, DynamoDB + Streams, ElastiCache, Neptune, RDS.
- Developer Tools: Amplify, CDK, CLI, CloudFormation, CodeArtifact, CodeBuild,
  CodeDeploy, CodePipeline, SDKs, X-Ray.
- Networking/CDN: API Gateway, AppSync, CloudFront, ELB, Global Accelerator,
  PrivateLink, Route 53, VPC.
- Security: Cognito, Encryption SDK, IAM, IAM Access Analyzer, IAM Identity Center, KMS,
  Macie, Secrets Manager, WAF.
- Mgmt/Governance: Auto Scaling, Chatbot, CloudTrail, CloudWatch, CloudWatch Logs,
  CloudWatch Synthetics, Cost Anomaly Detection, Cost Explorer, Managed Grafana,
  Service Catalog, Systems Manager, Well-Architected Tool.
- Storage: EBS, EFS, S3 (+ Intelligent-Tiering, Lifecycle, Cross-Region Replication).
- Analytics: Athena, EMR, Glue, Kinesis, OpenSearch Service, QuickSight, MSK.
- Migration/Transfer: DataSync, Transfer Family.
- Customer Engagement: Connect.

## Notable OUT-of-scope (do not waste time)

Redshift, QLDB, Keyspaces, Timestream, most IoT, DeepRacer/DeepComposer, Forecast,
Fraud Detector, the Lookout family, Elastic Beanstalk, Lightsail, GuardDuty, Shield,
Security Hub, Backup, FSx, S3 Glacier, Snow Family, MQ, most Media Services.
