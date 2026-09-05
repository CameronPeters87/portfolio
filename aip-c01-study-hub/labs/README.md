# Labs

Hands-on builds, one per week, mapped to the highest-weight domains. The exam tests
judgement under constraints, so each lab includes a "break it to learn it" section — you
deliberately cause the failure modes the exam asks about, then diagnose them.

| Lab | Week | Domain | Build |
|-----|------|--------|-------|
| 01 | Day 0 / W1 | D1 | Invoke FMs with the Converse API (model selection, maxTokens, cross-region) |
| 02 | W2 | D1 | RAG Knowledge Base (chunking, embeddings, retrieve-and-generate) — ask Kiro to generate |
| 03 | W3 | D2 | Agent on AgentCore Harness + Gateway tool — ask Kiro to generate |
| 04 | W4 | D3 | Guardrails + Comprehend/Macie PII pipeline + the CloudWatch log gap — ask Kiro |
| 05 | W5 | D4/D5 | Model Evaluations + CloudWatch/X-Ray observability + break/fix — ask Kiro |
| AI Tutor | W3–5 (optional) | D1–D4 | Bedrock + API Gateway + Lambda + DynamoDB backend that powers real LLM tutoring + cross-device sync for the app — see `lab-ai-tutor-backend/` |

Only Lab 1 is written out. When you reach a week, say "Start Lab N" (or "generate Lab N")
and Kiro builds the guide + code in that lab's folder, grounded in current AWS docs.

Cost discipline: Converse calls are pay-per-token (cheap). The billable ones are Lab 2
(OpenSearch Serverless / vector store), Lab 3 (AgentCore runtime), and Lab 5 (any
SageMaker endpoint or provisioned throughput). After a billable lab say "tear down Lab N"
and Kiro lists exactly what to delete.
