# Workflow: Add Health Endpoint

## Goal
Add a simple health endpoint to an app.

## Steps
1. Generate a health controller with Nest CLI:
   - `pnpm nest g controller health --project <app-name>`
2. Add a `GET /health` route that returns a minimal payload.
3. Add a unit test for the controller.

## Checklist
- [ ] Health controller generated with Nest CLI.
- [ ] `GET /health` responds with a simple payload.
- [ ] Unit test added.
