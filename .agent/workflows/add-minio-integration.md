# Workflow: Add MinIO Integration

## Goal
Enable MinIO storage in an app.

## Steps
1. Ensure `registerMinioModule` exists in `libs/config/src/util/`.
2. Import `registerMinioModule()` in the app root module.
3. Add MinIO config keys and defaults if missing.
4. Inject and use the MinIO client in services as needed.

## Checklist
- [ ] MinIO module registered in the app.
- [ ] Config keys/defaults present.
- [ ] Service usage verified.
