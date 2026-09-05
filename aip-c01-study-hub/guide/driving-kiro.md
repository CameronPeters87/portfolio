# AIP-C01 Study System (driven by Kiro)

Your complete study system for the AWS Certified Generative AI Developer – Professional
exam. Built 5 Sep 2026. Exam: Mon 19 Oct 2026 (6 weeks).

The idea: you don't study *at* Kiro, you study *with* it. Kiro is your tutor (explains
concepts from live AWS docs), your examiner (generates and grades scenario questions),
your lab partner (builds the Bedrock systems the exam tests), and your tracker (knows
what you're weak on). You bring the reps.

## The files

| File | What it's for |
|------|---------------|
| `00-exam-blueprint.md` | Reference: every domain, task, weight, and in-scope service |
| `01-six-week-plan.md` | Week-by-week plan; Week 1 is detailed day-by-day |
| `progress-tracker.md` | Your confidence (0–3) per topic + practice-exam scores |
| `weak-areas.md` | Spaced-repetition queue of things you missed |
| `quiz-bank.md` | Growing bank of exam-style questions with explanations |
| `labs/` | Hands-on Bedrock builds, one folder per lab |

## Weekly rhythm

- Weeks 1–2: Domain 1 (31%) — Bedrock, data, RAG, prompts
- Week 3: Domain 2 (26%) — agents, deployment, integration
- Week 4: Domain 3 (20%) — safety, security, governance
- Week 5: Domains 4 + 5 (12% + 11%) — optimization, monitoring, evaluation, troubleshooting
- Week 6: full practice exams + weak-area remediation + final review

Suggested cadence (adjust to your life — you're off Sun/Mon):
- Weekday session (~60–90 min): 1 concept block + a 5-question quiz + log misses.
- Weekend / day-off session (2–3 hrs): one hands-on lab + re-drill weak areas.
- Every session starts with a 5-question drill from `weak-areas.md`. That's the spaced
  repetition that makes it stick.

## How to drive Kiro — copy these prompts

Concepts (Kiro pulls real AWS docs, doesn't guess):
- "Explain Bedrock Knowledge Bases chunking strategies for AIP-C01, with a scenario."
- "Compare Converse API vs InvokeModel and when the exam would pick each."
- "I don't get Cross-Region Inference profiles — explain like I'll be tested on it."

Quizzing + grading:
- "Quiz me on Domain 1." → 5 questions, you answer, Kiro grades + explains + logs misses.
- "Drill my weak areas." → pulls from weak-areas.md first.
- "Give me a 15-question mixed mock weighted like the exam."
- "Grade this: <your answer>." → Kiro explains why right/wrong.

Tracking:
- "Update my tracker — I'm at 2 on RAG chunking."
- "What am I weakest on and what should I do tonight?"
- "Log my practice exam: 68%, weak on Domain 3 and 5."

Hands-on labs:
- "Start Lab 1." → Kiro walks you through building it in your AWS account, step by step.
- "Break this lab so I learn to troubleshoot it." → deliberate failure + diagnosis reps.
- "What lab should I build for Domain 2?"

Progress + planning:
- "Where am I against the plan?" → Kiro reads the tracker + plan and tells you.
- "Re-plan my remaining weeks — I lost last week." → Kiro rebalances the schedule.

## Session ritual (do this every time)

1. Open this folder in Kiro.
2. Say: "Start my study session." Kiro will: drill 5 weak-area questions, tell you today's
   topic from the plan, and teach + quiz it.
3. End: say "log misses and update my tracker."

## AWS account for labs

Labs need Bedrock model access in your account (Claude + Titan Embeddings enabled in the
region you use — us-east-1 or us-west-2 are safest). If credentials aren't set up, say
"help me sign in to AWS" and Kiro will walk you through it. Keep everything in one region,
tear down billable resources (OpenSearch Serverless, provisioned throughput, SageMaker
endpoints) after each lab — say "tear down Lab N" and Kiro lists exactly what to delete.

## Ground rules that match the exam

- Prioritise by weight: Domain 1+2 first, always.
- Learn by building + breaking, not just reading — the exam tests judgement under
  constraints.
- No partial credit on multiple-response, ordering, or matching questions. Practice them.
- When two answers look right, the exam rewards the one that best fits the *stated
  constraint* (cost vs latency vs least-change vs compliance). Train that reflex.
