FROM node:alpine AS base

ENV DIR /app
WORKDIR $DIR
ARG PORT
ARG NAME

RUN apk add --no-cache git
RUN npm install -g pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS dev

ENV NODE_ENV=development

COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

EXPOSE $PORT
CMD ["pnpm", "run", "start", $NAME]

FROM base AS production

ENV NODE_ENV=production
ENV USER=node

COPY . $DIR
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm run build user

EXPOSE $PORT
CMD ["node", "dist/apps/${NAME}/main.js"]