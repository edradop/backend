# Workflow: Add Validation

## Goal
Add or tighten validation for an existing route or DTO.

## Steps
1. Add `class-validator` decorators to the DTO fields.
2. Ensure `ValidationPipe` is enabled (globally or at route level).
3. Standardize error messages if required.

## Checklist
- [ ] DTO validation decorators added.
- [ ] `ValidationPipe` is active.
