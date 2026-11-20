# AD361 — Counter Application Testing Lab

**Application:** Counter (React + TypeScript + Vite)  
**Testing scope:** Test planning, exploratory test design, state-transition testing, defect management, white-box source analysis, and regression testing.

## Overview

This repository documents a small, reproducible test cycle on the instructor-provided Counter application. A defect in the original `Decrement` event handler was identified through source review, recorded as **DEF-001**, and corrected. Eight test cases exercise the initial value, increment/decrement actions, reset behavior, and multi-step state changes.

The submitted application source contains the one-line correction. The exact unmodified starter component is preserved in `evidence/original-App.tsx` so the defect can be reproduced independently.

## Repository contents

| Location | Description |
| --- | --- |
| `counter-app/` | React + TypeScript source and Jest/React Testing Library suite |
| `docs/test-plan.md` | Objectives, scope, approach, risks, environments, entry/exit criteria |
| `docs/exploratory-session.md` | Exploratory test charter, observations, and retesting notes |
| `docs/test-cases-and-results.md` | Eight test cases and documented execution outcomes |
| `docs/defect-report-DEF-001.md` | Reproduction steps, severity, priority, status, and root cause |
| `docs/white-box-and-coverage.md` | Internal statement mapping and coverage interpretation |
| `evidence/original-App.tsx` | Original component, prior to correction |
| `evidence/baseline-handler-results.txt` | Verified pre-fix state-handler probe |
| `evidence/baseline-repeatability.txt` | Independent repeat of the baseline cases |
| `evidence/postfix-handler-results.txt` | Verified post-fix state-handler probe |
| `scripts/counter-state-harness.cjs` | Reproducible isolated handler probe (not a browser or DOM test) |
| `.github/workflows/test.yml` | GitHub Actions checks for Jest tests, coverage, build, lint and logic probe |

## Tested finding

**DEF-001 — Decrement unexpectedly increases the count.** The starter version implemented both `Increment` and `Decrement` with `setCount(count + 1)`. From a count of zero, clicking `Decrement` produced `1` instead of `-1`. The submitted correction changes that expression to `setCount(count - 1)`.

## Verification status

The source-level event-handler probe was executed before and after the correction in Node.js 22.16.0. The baseline had **5 passing and 3 failing cases**; after correction, **8 of 8 cases passed**. These are isolated state-handler results, **not** browser tests or a Jest coverage report. See the logs and execution limitations documented in `docs/test-cases-and-results.md` and `docs/white-box-and-coverage.md`.

The Jest + React Testing Library tests are implemented in `counter-app/src/App.test.tsx`, with a GitHub Actions check configured for execution after a push; however, the dependencies could not be installed in the authoring environment, so the Jest suite and coverage percentages are **not yet independently verified**. No numerical statement-coverage result is claimed.

## Local development and verification

From `counter-app/`, install dependencies and start the application:

```bash
npm install
npm run dev
```

To execute the DOM tests and obtain measured coverage:

```bash
npm test
npm run test:coverage
```

To reproduce the isolated baseline/post-fix results after dependencies are installed:

```bash
npm run test:logic
```

`npm install` creates the project's lockfile, which should be committed for deterministic subsequent installs. The distributed source intentionally excludes a stale lockfile because the testing dependencies were added without access to the package registry. The starter's direct Linux-only Rolldown binding was also removed so macOS can install the platform-appropriate optional binding.

## Test result summary

| Test environment | Baseline | Corrected version | Status |
| --- | ---: | ---: | --- |
| Isolated component event-handler probe (Node 22.16.0) | 5/8 passed | 8/8 passed | Verified |
| Jest + React Testing Library (jsdom) | Not run | Not run | Pending local install |
| Browser-based manual exploration | Not run | Not run | Pending manual execution |
| Jest statement/branch/function coverage | Not measured | Not measured | Pending coverage run |

The original instructional README is reflected in the documentation, including the test plan, case design, execution records, repeatability checks, and a defect report.
