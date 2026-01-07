# Workflow: Add Config Utility

## Goal
Add a new config helper under `libs/config`.

## Steps
1. Create the util under `libs/config/src/util/` (or a subfolder).
2. Export it from `libs/config/src/util/index.ts`.
3. Export from `libs/config/src/index.ts` if it should be public.
4. Use the helper via `@edd/config`.

## Checklist
- [ ] Util added under `libs/config/src/util/`.
- [ ] `util/index.ts` export updated.
- [ ] Public export added when needed.
