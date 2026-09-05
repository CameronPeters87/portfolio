# Cheat Sheet — Domain 5: Testing, Validation, Troubleshooting (11%)

**Big idea:** GenAI is non-deterministic, so you test differently — measure quality, catch
drift, and debug the specific ways LLMs fail.

**Remember 3 things:** (1) Know which metric measures what. (2) Use golden datasets +
regression tests to catch drift on every deploy. (3) Most failures = context window,
retrieval, or prompt.

## Concepts in plain English

- **Quality metrics** — relevance, accuracy, consistency, fluency. For **RAG** specifically:
  **correctness, completeness, and faithfulness** (how well the answer sticks to the
  retrieved text = grounding).
- **Overlap metrics** — **ROUGE** and **BLEU** measure word/phrase overlap with a reference
  answer (summarization/translation). **BERTScore** compares meaning, not just words.
- **Bedrock Model Evaluations** — run automated, human, or **LLM-as-a-judge** evaluations
  against a prompt dataset (optionally with "reference responses" = ground truth).
- **RAG evaluation** — score retrieval + generation together (is the right context retrieved,
  and is the answer faithful to it?).
- **Agent evaluation** — task completion rate, tool-usage effectiveness, reasoning quality in
  multi-step workflows.
- **A/B + canary testing** — compare model/prompt versions on real traffic; roll out slowly.
- **Regression testing + quality gates** — re-run a fixed test set on every change; block the
  deploy if quality drops. **Golden datasets** catch hallucination/semantic drift.
- **Deployment validation** — synthetic user workflows + output checks (hallucination rate,
  semantic drift, response consistency) before/after a model update.
- **Troubleshooting the 3 common failures:**
  - **Context-window overflow / truncation** → dynamic chunking, trim the prompt, summarize.
  - **Retrieval problems** (wrong/irrelevant chunks) → embedding-quality diagnostics, drift
    monitoring, fix chunking/vectorization, hybrid search.
  - **Prompt problems** (inconsistent output) → prompt version comparison, **schema
    validation**, systematic refinement; **X-Ray** for prompt observability, CloudWatch Logs
    Insights to analyze prompts/responses.

## Exam traps

- Match the metric: **ROUGE** = summarization overlap; **faithfulness** = grounding to
  retrieved context; **BERTScore** = semantic similarity.
- **Human evaluation** is needed for subjective quality (creativity, UX) — automation can't
  judge everything.
- "Answer cut off / missing info" → **context-window overflow**, fix chunking/truncation.
- "Answers went bad after a model update" → **regression test + golden dataset + canary**,
  not just eyeballing.
