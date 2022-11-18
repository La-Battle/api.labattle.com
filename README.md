<p align="center"><h1 align="center">
  api.labattle.com
</h1>

<p align="center">
    <a href="https://github.com/La-Battle/api.labattle.com">
        <img src="https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/La-Battle/api.labattle.com/main/package.json&query=$.version&label=Version">
    </a>
    <a href="https://github.com/La-Battle/api.labattle.com">
        <img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" alt="maintenance">
    </a>
    <a href="https://github.com/La-Battle/api.labattle.com">
        <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
    </a>
    
</p>

## Requirements

Since the project is based on version 5 of the AdonisJS framework, you must need to have at least version v14 of Node.js installed.

- [Node.js](https://nodejs.org/en/) v14 or higher
- [Docker](https://www.docker.com/)
- [Yarn](hhttps://yarnpkg.com)

## Available services in docker

- PostgreSQL v15
- Redis v7
- Mercure

## Getting Started

```bash
$ yarn
# or
$ yarn install
```

Before running the AdoniJs development server `node ace serve --watch`, make sure you have set your environment variables (by renaming the `.env.example` file to `.env`), some of them are used in the `dcompose.yml` present in the project (look inside once created to know which ones).
The variables in your.env file:

```
DB_CONNECTION=pg
PG_HOST=localhost
PG_PORT=5432
PG_USER=root
PG_PASSWORD=root
PG_DB_NAME=battle
```

Once done, you need to launch your docker container by running the following command `docker-compose up -d`.
You can finally launch your development server.
