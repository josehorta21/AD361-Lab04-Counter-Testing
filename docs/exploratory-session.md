# Exploratory Test Session — Counter

**Session ID:** EXP-COUNTER-001  
**Charter:** Explore state changes, especially inconsistent button behavior, boundary states around zero, and multi-action sequences.  
**Test basis:** UI labels and the provided React source code.  
**Execution environment:** Isolated Node.js 22.16.0 state-handler probe using the actual TSX component source with mocked React hooks and JSX runtime; not a browser session.

## Exploration and observations

| Exploration | Observation in original component | Consequence |
| --- | --- | --- |
| Start app state | Heading starts at 0 | Expected |
| Increment from 0 | Display becomes 1 | Expected |
| Decrement from 0 | Display becomes 1, not -1 | DEF-001, unexpected |
| Increment twice then Decrement | Display becomes 3, not 1 | Reproduces DEF-001 after multiple actions |
| Decrement twice from 0 | Display becomes 2, not -2 | Reproduces DEF-001 repeatedly |
| Reset after two increments | Display becomes 0 | Expected |
| Reset twice | Display remains 0 | Expected |
| Decrement, Reset, Increment | Final display becomes 1 | Pass, but Reset masks the earlier fault |

## Follow-up investigation

Source inspection showed that both Increment and Decrement called `setCount(count + 1)`. This directly explains the incorrect Decrement results. The failed cases were reproduced in a repeat baseline execution before changing the code.

## Correction and retest

Decrement was changed to `setCount(count - 1)`. All eight isolated handler cases passed in the rerun. The original component is retained under `evidence/` and the correction is in `counter-app/src/App.tsx`.

## Limitations and next checks

These observations are from the isolated state-transition probe and do not demonstrate actual browser UI behavior. Jest/React Testing Library tests and a real browser check are still necessary for DOM-level and interactive confidence.
