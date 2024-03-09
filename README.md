# EDRADOP

## Description

 Edradop TypeScript starter repository.

## Installation

```bash
# install node packages
$ pnpm install

# Run Redis on Docker
$ docker run --name some-redis -d redis

# Run Minio on Docker
$ docker run \
   -p 9000:9000 \
   -p 9001:9001 \
   --name minio \
   -v /{your-path}/data:/data \
   -e "MINIO_ROOT_USER={{username}}" \
   -e "MINIO_ROOT_PASSWORD={{password}}" \
   quay.io/minio/minio server /data --console-address ":9001" 

# Run Postgres on Docker
$ docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD={{password}} -d postgres

```

## Configuration

- create a bucket on minio. The default bucket name should be *userbucket*.
- If you want change default config look at [default.constant.ts](libs/config/src/constant/default.constant.ts) and [keys.constant.ts](libs/config/src/constant/keys.constant.ts) file.
- define keys in .env file or send them as environment variables.

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Edradop is an MIT-licensed open source project.

## Stay in touch

- Author - [Tone Yavuz](https://toneyavuz.com)

## License

Edradop is [MIT licensed](LICENSE).
