## Description

Project build with NestJS/NodeJS, React/Now_UI/Now_UI_Dashboard, PostgreSQL, Redis
- Website - [https://kampir.com/](https://kampir.com/)
- API - [NestJS](https://kampir.com/api)
- SWagger - [Swagger](https://kampir.com/swagger)
- Customer Page - [Now UI KIT](https://demos.creative-tim.com/now-ui-kit-pro/)
- Admin Page - [Now UI Dashboard](https://demos.creative-tim.com/now-ui-dashboard/examples/dashboard.html)

## Installation

```bash
$ npm install
```

## Pre running the app

```bash
# PostgreSQL and Redis
$ docker-compose up
# run below query in PostgreSQL to prepare uuid extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
# prepare .env file and run migration
$ npx typeorm migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Develop - [Van Hai Son](vhson2006@gmail.com)
