# Defect Report DEF-001

**Title:** Decrement button increases the displayed counter instead of decreasing it  
**Related test cases:** TC-003, TC-004, TC-005  
**Test object:** Counter application, `src/App.tsx`  
**Test environment:** Instructor-provided TSX source; isolated state-handler probe in Node.js 22.16.0 with TypeScript transpilation. Browser and Jest reproduction not yet independently verified.  
**Severity:** Medium — central counter function is incorrect, but the small app has no data-loss or safety implications.  
**Priority:** High — fix before accepting the core behavior of the exercise.  
**Status:** **Fixed; source-level confirmation passed. DOM confirmation pending.**

## Preconditions

Start with a freshly rendered counter at `Count: 0`.

## Steps to reproduce

1. Load the unmodified starter implementation in `evidence/original-App.tsx`.
2. Render the counter with an initial count of `0`.
3. Activate the **Decrement** button once.
4. Observe the displayed count.

## Expected result

The heading should display `Count: -1`.

## Actual result (original source)

The heading becomes `Count: 1`. The result is reproducible in the isolated handler probe and also causes multi-action test cases TC-004 and TC-005 to fail.

## Evidence

- Original source: `evidence/original-App.tsx`.
- Baseline execution: `evidence/baseline-handler-results.txt`.
- Corrected source: `counter-app/src/App.tsx`.
- Regression execution: `evidence/postfix-handler-results.txt`.

## Root-cause analysis

Both Increment and Decrement initially used the same expression:

```tsx
setCount(count + 1)
```

This was a copy/paste or arithmetic-operator error in Decrement's click handler. The correct operation is `count - 1`.

## Correction and confirmation

The submitted `App.tsx` changes only the Decrement handler to `setCount(count - 1)`. The isolated handler regression suite passed all eight tests after the change, including the three cases that failed before it.

**Remaining verification:** Run Jest/React Testing Library against the rendered component, review the generated coverage results, and optionally repeat the steps in a browser before formally closing the defect for the target UI environment.
