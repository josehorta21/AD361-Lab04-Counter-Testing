# Test Plan — Counter Application

**Plan ID:** TP-COUNTER-001  
**System under test:** Instructor-provided React + TypeScript Counter application  
**Scope of exercise:** Small UI component with three state-changing controls

## Objectives

1. Verify that the counter starts at zero.
2. Verify that **Increment** adds one to the current count and **Decrement** subtracts one.
3. Verify that **Reset** restores the current count to zero after positive or negative values.
4. Verify that sequences of actions produce the correct state and displayed value.
5. Identify, reproduce, and document any defect; test the fix for regression.
6. Inspect the component's statements and run automated tests suitable for generating coverage.

## Scope

**In scope:** `src/App.tsx`, visible heading, the Increment/Decrement/Reset buttons, React state transitions, defect reproduction, source inspection, and Jest + React Testing Library regression tests.

**Out of scope:** Authentication, persistence, APIs, cross-browser performance benchmarking, device-specific rendering, and accessibility audits beyond querying controls by their accessible names. This minimal starter does not implement those features.

## Approach

- **Exploratory:** Inspect each control and try positive, negative, reset, and mixed action sequences.
- **Black-box / state-transition:** Derive expected counts from button labels and the common behavior of a counter. Verify the displayed count after actions.
- **White-box:** Review the actual statements in `App.tsx`, including its three event handlers, and build automated tests that exercise each handler.
- **Defect management:** Record a discrepancy with reproduction steps, expected versus actual outcome, impact, priority, status, and suspected cause.
- **Confirmation/regression:** Execute the same test cases against the baseline and the corrected version.

## Environments and tools

- **Application:** React 19, TypeScript, Vite, as provided by the instructor.
- **Automated DOM test environment (configured but not executed here):** Jest, React Testing Library, `jest-environment-jsdom`, Babel, and `@testing-library/jest-dom`.
- **Isolated executable state-transition probe (executed):** Node.js 22.16.0, TypeScript `transpileModule`, mocked `useState` and JSX runtime. This executes the original component's event handlers but does not mount a real React DOM.
- **Coverage tool (configured, not executed here):** Jest/Babel coverage, focused on `src/App.tsx`.

## Product risks

| Risk | Likelihood | Impact | Response |
| --- | --- | --- | --- |
| Decrement produces an incorrect value | Observed in starter | High for core functionality | Record DEF-001, correct handler, retest |
| Mixed actions produce unexpected state | Medium | Medium | Exercise multi-action cases TC-004 and TC-008 |
| Reset fails after negative states | Low | Medium | Exercise TC-008 |
| Test results are confused with actual browser behavior | Medium | Medium | Distinguish isolated handler results from Jest/browser results |

## Entry criteria

1. Starter source and expected behavior are available.
2. Test cases have identifiers, actions, initial states, and expected results.
3. A runnable environment is established for the selected test method.

## Exit criteria

1. All eight test cases pass in the target Jest/React Testing Library environment.
2. No unresolved high- or critical-severity defects remain.
3. The identified defect is documented and its correction is confirmed with reproducible evidence.
4. A measured statement-coverage report is produced and reviewed, with a target of **100%** for `src/App.tsx`.

**Current assessment:** Isolated handler probe passes all eight cases after the correction. Full exit criteria remain **open** until the Jest suite and its coverage report are executed and reviewed locally.
