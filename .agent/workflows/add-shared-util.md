# Workflow: Add Shared Utility

## Goal
Add a shared utility function.

## Steps
1. Create a new file under `libs/common/src/util/`.
2. Export it from `libs/common/src/index.ts`.
3. Import it via `@edd/common` in usage sites.
4. Add tests if needed.

## Checklist
- [ ] Utility lives in `libs/common`.
- [ ] `index.ts` export updated.
- [ ] Imports use the alias.
