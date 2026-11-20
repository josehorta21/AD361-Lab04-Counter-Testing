# Counter Application

React + TypeScript + Vite starter application used for AD361 application testing.

## Behavior

The counter starts at zero. Increment increases the value by one; Decrement decreases it by one; Reset restores zero. A decrement-handler defect found in the provided starter was corrected and documented in the repository root (`docs/defect-report-DEF-001.md`).

## Scripts

```bash
npm install
npm run dev
npm test
npm run test:coverage
npm run test:logic
npm run build
npm run lint
```

- `npm test`: Jest + React Testing Library behavior tests.
- `npm run test:coverage`: produces the test coverage report under `coverage/`.
- `npm run test:logic`: isolated source-level behavior probe for the original and corrected component.

The source-level probe does not execute React's real DOM behavior. For the test plan and executed-versus-pending evidence, see the root documentation.
