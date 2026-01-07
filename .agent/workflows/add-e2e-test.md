# Workflow: Add E2E Test

## Goal
Add an end-to-end test scenario.

## Steps
1. Create the e2e test under `apps/<app>/test/`.
2. Add app bootstrap and teardown logic.
3. Verify HTTP interactions.
4. Run `pnpm run test:e2e`.

## Checklist
- [ ] Test file lives under `apps/<app>/test/`.
- [ ] Bootstrap/teardown present.
- [ ] E2E tests pass.
