# Workflow: New Library

## Goal
Add a shared library under `libs/`.

## Steps
1. Generate the library with Nest CLI:
   - `pnpm nest g lib <lib-name>`
2. Ensure `libs/<lib-name>/src/index.ts` exists.
3. Update `tsconfig.json` `paths` with the new alias if needed.
4. Confirm `nest-cli.json` includes the new library project.

## Checklist
- [ ] `libs/<lib-name>/src/index.ts` exists.
- [ ] `nest-cli.json` updated.
- [ ] `tsconfig.json` `paths` updated.
