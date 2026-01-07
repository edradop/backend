# Workflow: New Feature Module

## Goal
Create a new feature area inside an app.

## Steps
1. Generate the feature module:
   - `pnpm nest g module module/<feature> --project <app-name>`
2. Generate a feature controller and service:
   - `pnpm nest g controller module/<feature>/controller --project <app-name>`
   - `pnpm nest g service module/<feature>/service --project <app-name>`
3. Add a feature `index.ts` barrel file under `module/<feature>/` and export the module.
4. Import the feature module into `<app-name>.module.ts`.

## Checklist
- [ ] Feature module lives under `module/<feature>`.
- [ ] Controller/service generated with Nest CLI.
- [ ] `index.ts` exports the module.
- [ ] Root module imports updated.
