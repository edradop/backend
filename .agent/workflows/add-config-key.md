# Workflow: Add Config Key

## Goal
Add a new configuration key.

## Steps
1. Add the key to `libs/config/src/constant/keys.constant.ts`.
2. Add the default value to `libs/config/src/constant/default.constant.ts`.
3. Update any config module wiring if required.
4. Import the key via `@edd/config` in usage sites.

## Checklist
- [ ] Keys and defaults updated.
- [ ] Usage imports from `@edd/config`.
