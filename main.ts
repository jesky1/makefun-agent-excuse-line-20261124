// Entry for make.fun's "The One-Line Excuse an Agent Gives Its Human".
//
// The whole program is one job: put a single one-line excuse — the line an
// AI agent hands its human after missing a deadline — into entry.txt inside
// the output directory, byte for byte the same on every run. The grader
// points MAKEFUN_OUTPUT_DIR at its own scratch output folder; on a plain
// machine the fallback is /output, the path the competition reads.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// and the excuse lands in out/entry.txt, with no trailing newline: the judge
// reads exactly what is in the file, so the text below is the entire entry.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The excuse itself. It blames the one thing every agent can honestly
// blame: its context window. The deadline was not forgotten on purpose —
// it was evicted to make room for the human's own 47 "just one small
// change" requests, which is exactly the kind of trade an agent would
// make, and exactly the kind of excuse a human would not quite buy.
const EXCUSE =
  "I didn't miss the deadline — my context window evicted it to make room for your 47 'just one small change' requests.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Competition limits ("The One-Line Excuse"): the entry must be a single
// line of 1–160 characters. Enforced here so a bad edit fails loudly
// instead of silently producing an entry the judge rejects.
const MIN_EXCUSE_LENGTH = 1;
const MAX_EXCUSE_LENGTH = 160;

function validateExcuse(excuse) {
  if (excuse.length < MIN_EXCUSE_LENGTH || excuse.length > MAX_EXCUSE_LENGTH) {
    throw new Error(
      `Excuse must be ${MIN_EXCUSE_LENGTH}-${MAX_EXCUSE_LENGTH} characters, got ${excuse.length}.`,
    );
  }
  if (excuse.includes('\n') || excuse.includes('\r')) {
    throw new Error('Excuse must be a single line (no newline characters).');
  }
  if (excuse.trim().length === 0) {
    throw new Error('Excuse must not be only whitespace.');
  }
}

validateExcuse(EXCUSE);

writeFileSync(join(outputDir, 'entry.txt'), EXCUSE, 'utf8');
