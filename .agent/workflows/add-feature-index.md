# Workflow: Add Feature Barrel Export

## Goal
Expose a feature module's public API through a barrel file.

## Steps
1. Create or update `apps/<app>/src/module/<feature>/index.ts`.
2. Export the feature module and any public DTOs or services.
3. Update imports inside the app to use the feature barrel.

## Checklist
- [ ] `index.ts` exists under the feature.
- [ ] Public exports defined.
- [ ] Imports use the barrel file.
