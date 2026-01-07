# NestJS Rules (Edradop Monorepo)

This repository is a NestJS monorepo. Keep the existing structure and follow the rules below.

## Repository Layout
- Applications live in `apps/<app>/src`.
- Shared libraries live in `libs/common` and `libs/config`.
- Use path aliases: `@edd/common` and `@edd/config`.

## Application Structure
- `apps/<app>/src/main.ts` is the application entry.
- The root module is `<app>.module.ts`.
- Application folders:
  - `controller/` → HTTP/transport layer.
  - `service/` → business logic.
  - `module/` → feature modules.
  - `guard/`, `pipe/`, `filter/`, `middleware/` → cross-cutting concerns.
- Use `index.ts` barrel files in folders and import from them.

## Feature Module Structure
- Features live under `module/<feature>/`.
- Each feature module contains:
  - `<feature>.module.ts`
  - `controller/`, `service/`
  - `index.ts` barrel file
- Public exports must go through `index.ts`.

## CLI Usage
- Use Nest CLI to generate framework files (modules, controllers, services, guards, pipes, filters, middleware, apps, libs).
- Prefer `pnpm nest g ...` with `--project <app>` in the monorepo.

## Code Standards
- File and folder names use `kebab-case`.
- Class names use `PascalCase`, variables/functions use `camelCase`.
- Filenames must follow `*.controller.ts`, `*.service.ts`, `*.module.ts`.
- Tests live next to the implementation as `*.spec.ts`.
- Shared configuration belongs in `libs/config`; new keys go under `libs/config/src/constant`.

## Dependencies and DI
- Use `@edd/common` for shared helpers beyond `@nestjs/*`.
- Use NestJS decorators (`@Injectable`, `@Module`, `@Controller`) consistently.
- Prefer `EnvironmentModule` and `register*Module` helpers for configuration.

## Monorepo Consistency
- When adding a new app or lib, update `nest-cli.json` `projects`.
- When adding a new lib, update `tsconfig.json` `paths`.
- Do not change top-level directory structure.
