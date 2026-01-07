# Workflow: Add Microservice Client

## Goal
Register a new microservice client.

## Steps
1. Add a register function under `libs/config/src/util/client-proxy/`.
2. Export it from `libs/config/src/util/index.ts`.
3. Register the client with `ClientsModule.registerAsync` in the app module.
4. Inject the client token in the consuming service.
5. Add config/env keys if required.

## Checklist
- [ ] Client register util added and exported.
- [ ] Module imports updated.
- [ ] Token usage verified.
