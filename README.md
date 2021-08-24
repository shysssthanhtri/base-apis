<!-- TABLE OF CONTENTS -->
# Table of contents

- [Table of contents](#table-of-contents)
- [Introduction](#introduction)
- [Getting start](#getting-start)
  - [Developing](#developing)
    - [Docker compose](#docker-compose)
    - [Regular start up](#regular-start-up)
  - [Linting](#linting)
  - [Testing](#testing)
- [Todo](#todo)

<!-- INTRODUCTION -->
# Introduction

This is template APIs which is setup with Typescript, ExpressJS, Sequelize, Inversify, Jest, docker-compose for developing, docker for building to production image, github action for ci/cd, terraform for deploying, ext.

This template is builded base on the idea of automation. You just need to write code. Doing unit test, linting, deploying, setting up infrastructure will be handled automatically.

<!-- GETTING START -->
# Getting start

This is guideline to use the template.

## Developing

### Docker compose

Build up every resources that needed for the project

```sh
  docker compose up --build
```

### Regular start up

If you have enough resources that needed for the project

```sh
  npm run dev
```

## Linting

```sh
  npm run lint
```

## Testing

```sh
  npm run test
```

or testing in watch mode

```sh
  npm run test:watch
```

# Todo

- OpenAPI

- Update unit test: mock template

- Setting up infrastructure with terraform: setting up a ready-production web application

- Auto generate changelog

- Monitoring system
