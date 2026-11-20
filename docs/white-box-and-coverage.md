# White-Box Analysis and Coverage Review

## Component structure

`App.tsx` is a small stateful React function component. It contains:

1. Component execution and `useState(0)` initialization.
2. Heading render from `count`.
3. **Increment** handler: `setCount(count + 1)`.
4. **Decrement** handler: corrected to `setCount(count - 1)`.
5. **Reset** handler: `setCount(0)`.

The original code incorrectly implemented Decrement with `count + 1`. The regression suite exercises all three event-handler paths.

## Statement / handler mapping

| Source element | Covered by cases |
| --- | --- |
| Initial state + heading rendering | TC-001 through TC-008 |
| Increment event handler | TC-002, TC-004, TC-006, TC-008 |
| Decrement event handler | TC-003, TC-004, TC-005, TC-008 |
| Reset event handler | TC-006, TC-007, TC-008 |

**Handler exercise:** 3 of 3 event handlers were invoked in the source-level probe.  
**Measured statement coverage:** **Not available**; the probe is not an instrumented coverage runner.

This file does not equate 3/3 handlers with a 100% statement-coverage score. Statement coverage must be measured by Jest's coverage instrumentation on the submitted component.

## Coverage command

From `counter-app/` after installing the dependencies:

```bash
npm run test:coverage
```

The Jest configuration collects coverage from `src/App.tsx` and writes an HTML report under `coverage/lcov-report/index.html` and machine-readable JSON under `coverage/coverage-summary.json`.

Review the **Statements**, **Branches**, **Functions**, and **Lines** totals in the coverage summary. The target is 100% statements for this small component. Keep the actual result and any uncovered lines in a committed evidence report once the suite has run.

## Limits and interpretation

- All original handlers were exercised during the isolated before/after probe.
- The React Testing Library tests are supplied but were not run in the authoring environment; no numeric coverage result is invented.
- The component has no explicit conditional branches in its application logic. Coverage instrumentation may report zero or non-applicable branches, depending on the tool.
- Full statement coverage on this component would not establish overall application quality, browser compatibility, or absence of defects.
