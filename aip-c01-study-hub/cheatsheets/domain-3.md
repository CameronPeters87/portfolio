# Cheat Sheet — Domain 3: AI Safety, Security, Governance (20%)

**Big idea:** stop bad input/output, protect data + PII, and be able to prove what your AI
did and why.

**Remember 3 things:** (1) Guardrails filter both input and output — but PII masking is
response-only, logs still leak. (2) Layer defenses (Comprehend → Guardrails → Lambda).
(3) Governance = model cards + lineage + CloudTrail.

## Concepts in plain English

- **Bedrock Guardrails** — a safety filter around the model. Blocks/filters by word, topic,
  profanity, and **PII** (mask or block), on both the prompt and the response. Includes a
  **contextual grounding check** that flags answers that drift from your retrieved data
  (anti-hallucination). Attach to models, agents, and Knowledge Bases.
- ⚠️ **The PII logging gap** (favourite exam trap) — Guardrails masks PII in the *response*
  only. The original, unmasked text is still written to **CloudWatch Logs** in plaintext.
  Fix for HIPAA/GDPR: **encrypt log groups with KMS**, restrict access with IAM, use Macie.
- **Prompt injection / jailbreak** — users trying to override your instructions. Defend with
  input sanitization, injection/jailbreak detection, and safety classifiers.
- **Defense in depth** — layer it: **Comprehend** (detect/redact PII pre-model) → **Guardrails**
  (model-level) → **Lambda** (post-process/validate) → **API Gateway** (response filter).
- **Hallucination reduction** — ground answers in a **Knowledge Base**, add **confidence
  scoring**, and enforce **JSON Schema** so output is structured and checkable.
- **Data security** — **VPC endpoints / PrivateLink** (keep traffic private), **IAM least
  privilege**, **Lake Formation** (fine-grained data access), **S3 Lifecycle** (retention).
- **PII detection: Comprehend vs Macie** — **Comprehend** finds entities/PII *in text you pass
  it* (NER). **Macie** scans **S3** for sensitive data at rest. Different jobs.
- **Governance & audit** — **SageMaker model cards** (document a model's use/limits), **Glue**
  data lineage + **Data Catalog** (where data came from), **CloudTrail** (who called what),
  drift/policy-violation detection, **token-level redaction**.
- **Responsible AI** — transparency (show reasoning), **Bedrock agent tracing** (see the
  agent's steps), **fairness** (SageMaker **Clarify** bias metrics like Class Imbalance),
  A/B testing, and **LLM-as-a-judge** for automated evaluation.

## Exam traps

- The **CloudWatch PII logging gap** — masking the response is not enough; encrypt the logs.
- **Comprehend (text NER/PII)** vs **Macie (S3 at-rest PII)** — pick the right one.
- **PrivateLink/VPC endpoints** = private connectivity for sensitive fine-tuning/inference
  data (no public internet).
- "Prove the model didn't discriminate / explain a decision" → **Clarify** + **model cards**
  + **agent tracing**, not just logs.
