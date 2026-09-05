# Cheat Sheet — Domain 1: FM Integration, Data, Compliance (31%)

**Big idea:** pick the right foundation model, feed it good data, and give it your knowledge
through RAG — safely.

**Remember 3 things:** (1) Converse API + always set `maxTokens`. (2) RAG = look it up;
fine-tune = retrain. (3) Chunking + embeddings decide RAG quality.

## Concepts in plain English

- **Foundation Model (FM)** — a big pre-trained model you rent, not train. On Bedrock you
  get many: **Claude** (reasoning/chat), **Nova** (Amazon's own), **Llama** (open),
  **Titan** (text + embeddings), **Stable Diffusion** (images).
- **Amazon Bedrock** — one API to all those models. No servers. Pay per token.
- **Converse API** — the one unified way to call any chat model on Bedrock. Use it instead
  of InvokeModel (which needs a different body per model). ⚠️ Always set `maxTokens` — if
  you don't, it reserves the model's max and you get random ThrottlingExceptions.
- **Cross-Region Inference** — use a profile ID with a `us.` / `eu.` prefix so calls spread
  across regions. Fewer throttles, higher availability. It's a resilience lever.
- **Fine-tuning vs RAG** (classic exam choice):
  - **RAG** = give the model your facts *at question time* by retrieving them. Cheap, easy
    to update (just update the data), best for changing/proprietary knowledge.
  - **Fine-tuning** = retrain the model on your data. For *style/format/tone/domain skill*,
    not fast-changing facts. Costs more.
  - **LoRA / adapters** = cheap fine-tuning — trains a small add-on, not the whole model.
- **RAG (Retrieval-Augmented Generation)** — an open-book exam for the LLM. Steps: embed
  your docs → store vectors → at query time find the most relevant chunks → paste them into
  the prompt. Reduces hallucination.
- **Vector store** — a database of "meaning vectors." Pick by need: **Bedrock Knowledge
  Bases** (managed, easiest — start here), **OpenSearch** (scale + hybrid search), **Aurora
  pgvector** (already on Postgres), **S3 Vectors** (cheap/simple), **DynamoDB** (metadata).
- **Embeddings** — turn text into vectors so similar meaning = close vectors. Use **Titan
  Embeddings V2**. Higher dimensions = more accurate but more cost/storage.
- **Chunking** — how you split docs before embedding. **Fixed** (simple), **semantic** (split
  by meaning), **hierarchical** (small chunks for precision, parent chunks for context).
  ⚠️ Table-heavy PDFs → use **advanced/FM-based parsing** or you lose the structure.
- **Hybrid search + re-rankers** — combine keyword + vector search, then a **reranker** model
  re-sorts results by relevance. Both boost retrieval quality.
- **Prompt engineering** — a prompt = instructions + context + input + output format.
  **Few-shot** (give examples), **chain-of-thought** ("think step by step"), enforce
  **JSON output** by describing the schema.
- **Bedrock Prompt Management** — store, version, and govern reusable prompt templates.
- **Bedrock Prompt Flows** — visually chain prompts/models/conditions (branching workflows).
- **AWS Well-Architected GenAI Lens** — the design checklist for GenAI on AWS.

## Exam traps

- Unset `maxTokens` causing throttling — it's a *quota reservation* issue, not rate.
- Picking fine-tuning when the real need is *current facts* → that's RAG.
- Confusing the **embedding** model with the **generation** model — different jobs.
- Querying a Knowledge Base **before ingestion finishes** → returns empty (not broken).
- "Improve RAG accuracy" almost always = better **chunking/parsing + reranking + grounding**,
  not a bigger model or more `maxTokens`.
