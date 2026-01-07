# Workflow: Add Database Integration

## Goal
Wire a database module for an app.

## Steps
1. Add or update the database register util under `libs/config/src/util/database/`.
2. Export it from `libs/config/src/util/index.ts`.
3. Import the register util in the app module and add it to `imports`.
4. Add required config keys and defaults.

## Checklist
- [ ] Database register util exists and is exported.
- [ ] App module imports updated.
- [ ] Config keys/defaults added.
