#!/usr/bin/env python3
"""
Lab 1 - Amazon Bedrock Converse API (AIP-C01 study).

Teaches the exam-relevant essentials of invoking foundation models:
  - Converse API (unified across models) instead of InvokeModel
  - explicit maxTokens (quota reservation gotcha -> ThrottlingException)
  - cross-region inference profile IDs (the "us." prefix) for availability
  - reading token usage for cost/latency monitoring (Domain 4)
  - streaming for time-to-first-token (Domain 2/4)

Usage:
  python invoke.py "your prompt"
  python invoke.py --stream "your prompt"
  python invoke.py --compare "your prompt"

Verify current model IDs before running (they change):
  aws bedrock list-foundation-models --region us-east-1
  aws bedrock list-inference-profiles --region us-east-1
"""

import argparse
import sys
import time

import boto3
from botocore.config import Config
from botocore.exceptions import ClientError

REGION = "us-east-1"

# Cross-region inference profile IDs (note the "us." prefix). Using a bare model ID for a
# cross-region-only model raises ResourceNotFoundException/AccessDeniedException.
# Verify these are current: `aws bedrock list-inference-profiles --region us-east-1`.
MODEL_ID = "us.anthropic.claude-sonnet-4-6"          # primary model
COMPARE_MODEL_ID = "us.anthropic.claude-haiku-4-6"   # cheaper/faster, for --compare

# maxTokens MUST be set explicitly. Leaving it unset defaults to the model maximum
# (e.g. 64K for Claude) and silently reserves ~43x more quota than needed - the #1 cause
# of unexpected ThrottlingException. This is a Domain 4 exam favourite.
MAX_TOKENS = 512


def make_client():
    # bedrock-runtime = inference (Converse/InvokeModel).
    # bedrock (control plane) = management; using it here => UnknownOperationException.
    # Adaptive retry is the recommended production setting for throttling resilience.
    return boto3.client(
        "bedrock-runtime",
        region_name=REGION,
        config=Config(retries={"max_attempts": 5, "mode": "adaptive"}),
    )


def converse(client, model_id, prompt):
    start = time.time()
    resp = client.converse(
        modelId=model_id,
        messages=[{"role": "user", "content": [{"text": prompt}]}],
        inferenceConfig={"maxTokens": MAX_TOKENS, "temperature": 0.5},
    )
    elapsed = time.time() - start
    text = resp["output"]["message"]["content"][0]["text"]
    usage = resp["usage"]  # inputTokens, outputTokens, totalTokens
    return text, usage, elapsed


def run_once(prompt):
    client = make_client()
    text, usage, elapsed = converse(client, MODEL_ID, prompt)
    print(f"\n--- {MODEL_ID} ---\n{text}\n")
    print(
        f"[tokens] in={usage['inputTokens']} out={usage['outputTokens']} "
        f"total={usage['totalTokens']}  [latency] {elapsed:.2f}s"
    )
    print("(These token counts are exactly what CloudWatch tracks for cost - Domain 4.)")


def run_stream(prompt):
    # Streaming lowers time-to-first-token for user-facing apps. The CLI can't stream;
    # the SDK can. Events arrive: messageStart -> contentBlockDelta* -> messageStop -> metadata.
    client = make_client()
    print(f"\n--- {MODEL_ID} (streaming) ---")
    resp = client.converse_stream(
        modelId=MODEL_ID,
        messages=[{"role": "user", "content": [{"text": prompt}]}],
        inferenceConfig={"maxTokens": MAX_TOKENS},
    )
    for event in resp["stream"]:
        if "contentBlockDelta" in event:
            print(event["contentBlockDelta"]["delta"].get("text", ""), end="", flush=True)
        elif "metadata" in event:
            u = event["metadata"]["usage"]
            print(f"\n\n[tokens] in={u['inputTokens']} out={u['outputTokens']}")


def run_compare(prompt):
    # Cost/capability tradeoff (Domain 1.2 / 4.1): same prompt, two models.
    client = make_client()
    for mid in (MODEL_ID, COMPARE_MODEL_ID):
        try:
            text, usage, elapsed = converse(client, mid, prompt)
            print(f"\n--- {mid} ---\n{text}")
            print(
                f"[tokens] total={usage['totalTokens']}  [latency] {elapsed:.2f}s"
            )
        except ClientError as e:
            print(f"\n--- {mid} ---\n[error] {e.response['Error']['Code']}: "
                  f"{e.response['Error']['Message']}")
    print("\nWhich would you pick for a high-volume, latency-sensitive feature? Why?")


def main():
    p = argparse.ArgumentParser(description="Lab 1 - Bedrock Converse API")
    p.add_argument("prompt", nargs="?", default="Explain RAG in two sentences.")
    p.add_argument("--stream", action="store_true", help="stream the response")
    p.add_argument("--compare", action="store_true", help="compare two models")
    args = p.parse_args()

    try:
        if args.compare:
            run_compare(args.prompt)
        elif args.stream:
            run_stream(args.prompt)
        else:
            run_once(args.prompt)
    except ClientError as e:
        code = e.response["Error"]["Code"]
        print(f"\n[ClientError] {code}: {e.response['Error']['Message']}", file=sys.stderr)
        hints = {
            "AccessDeniedException": "Enable model access in the Bedrock console, or check "
                                     "IAM bedrock:InvokeModel and the cross-region profile.",
            "ResourceNotFoundException": "Model ID may be wrong or region-only. Use the 'us.' "
                                         "inference profile id from list-inference-profiles.",
            "ThrottlingException": "Set maxTokens (done here) + adaptive retry (done); if it "
                                   "persists, request a quota increase or use a profile.",
            "ValidationException": "Check the request shape / maxTokens / model id format.",
            "UnknownOperationException": "Wrong client - use bedrock-runtime, not bedrock.",
        }
        if code in hints:
            print(f"[hint] {hints[code]}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
