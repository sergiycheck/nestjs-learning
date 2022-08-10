## Run in docker

```bash
docker-compose up --build
```

with docker volumes data is persisted. You can connect to each container and see db data and cached data with command.

```bash
docker exec -it 1d6d55b6df35 /bin/bash
```

## Installation

```bash
$ npm install
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

### See cached responses with redis-cli

login into redis

```bash
redis-cli
```

get all keys

```bash
127.0.0.1:6379> keys *
```

and get the value of cached response with command **mget keyName**
