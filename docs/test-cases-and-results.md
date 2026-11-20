# Test Cases and Execution Results

**Source:** `counter-app/src/App.tsx`  
**Evidence:** `evidence/baseline-handler-results.txt`, `evidence/baseline-repeatability.txt`, and `evidence/postfix-handler-results.txt`  
**Execution method:** Real starter and corrected TSX handlers transpiled and exercised using a minimal mocked React state hook and JSX element tree. This is isolated logic verification; results are **not** an assertion about browser or jsdom execution.

## Cases

| ID | Starting state | Actions (in order) | Expected result | Baseline actual | Baseline | Corrected actual | Corrected |
| --- | --- | --- | ---: | ---: | --- | ---: | --- |
| TC-001 | Initial render, 0 | No actions | 0 | 0 | Pass | 0 | Pass |
| TC-002 | Fresh render, 0 | Increment | 1 | 1 | Pass | 1 | Pass |
| TC-003 | Fresh render, 0 | Decrement | -1 | 1 | **Fail** | -1 | Pass |
| TC-004 | Fresh render, 0 | Increment → Increment → Decrement | 1 | 3 | **Fail** | 1 | Pass |
| TC-005 | Fresh render, 0 | Decrement → Decrement | -2 | 2 | **Fail** | -2 | Pass |
| TC-006 | Fresh render, 0 | Increment → Increment → Reset | 0 | 0 | Pass | 0 | Pass |
| TC-007 | Fresh render, 0 | Reset → Reset | 0 | 0 | Pass | 0 | Pass |
| TC-008 | Fresh render, 0 | Decrement → Reset → Increment | 1 | 1 | Pass | 1 | Pass |

**Baseline (original source):** 5 passed, 3 failed.  
**After code correction:** 8 passed, 0 failed.

> TC-008 passing against the baseline does **not** show that Decrement works: Reset masks the incorrect intermediate state. TC-003, TC-004 and TC-005 check the faulty behavior directly.

## Repeatability of failed cases

The failed cases were rerun as separate fresh component instances in the repeatability check. TC-003, TC-004 and TC-005 again produced `1`, `3` and `2` respectively in the original source. The defect is therefore reproducible under the defined isolated state-handler test method.

## Defect confirmation

- **Observed defect:** Decrement uses `count + 1`, so its behavior contradicts its label.
- **Correction:** Change to `count - 1` in the Decrement handler.
- **Confirmation:** Re-executed all eight state-handler cases against the corrected `App.tsx`; all passed.

## Test method boundaries

The isolated component handler probe exercises the actual JavaScript behavior emitted from the TSX source. It is not a substitute for rendering via React, and it does not verify CSS, actual DOM events, browser interaction, or measured Jest coverage. The accompanying `src/App.test.tsx` suite implements these cases against a rendered component, but its results remain unverified in the authoring environment until dependencies are installed and Jest is run.
