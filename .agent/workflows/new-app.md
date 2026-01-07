# Workflow: New App

## Goal
Add a new NestJS application to the monorepo.

## Steps
1. Generate the app with Nest CLI:
   - `pnpm nest g app <app-name>`
2. Verify `apps/<app-name>/src/main.ts` and `<app-name>.module.ts` exist.
3. Ensure default folders exist: `controller/`, `service/`, `module/`, `guard/`, `pipe/`, `filter/`, `middleware/`.
4. Add barrel files (`index.ts`) in `controller/` and `service/` if missing.
5. Confirm `nest-cli.json` contains the new app entry.

## Checklist
- [ ] `apps/<app-name>/src/main.ts` exists.
- [ ] `<app-name>.module.ts` is the root module.
- [ ] `nest-cli.json` updated.
- [ ] Barrel files created.
