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

### JWT functionality

1. Allow users to authenticate with username/password, returning a JWT for use in subsequent calls
   to protected API endpoints.
2. Create API routes with are protected base on the present of a valid JWT as a bearer token.
