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

### Make script executable

```bash
$ chmod a+rx my-script.sh
$ ./my-script.sh
```

#### make file executable alternative

```bash
chmod 755 first.sh
```

### prerequisites

generate localhost private key and public certificate with **mkcert** tool

delete multiple redis keys

```bash
redis-cli --scan --pattern 'Product:*:*' | xargs redis-cli DEL
```

migrate database

```bash
npx sequelize-cli db:migrate
```

docker-compose managing commands

```bash
docker-compose up --build
```

Stop the container(s) using the following command:

```bash
docker-compose down
```

Delete all containers using the following command:

```bash
docker rm -f $(docker ps -a -q)
```

Delete all volumes using the following command:

```bash
docker volume rm $(docker volume ls -q)
```

Restart the containers using the following command:

```bash
docker-compose up -d
```

check open port [link](https://www.cyberciti.biz/faq/unix-linux-check-if-port-is-in-use-command/)

```bash
sudo lsof -i -P -n | grep LISTEN
```

main docker, docker-compose tutorial
[docker link](https://docs.docker.com/get-started/05_persisting_data/)

redis docker compose tutorial
[link](https://geshan.com.np/blog/2022/01/redis-docker/)

library for sequelize migrations umzug github
[link](https://github.com/sequelize/umzug)

if the database state is equal to provided
migrations, not migration applied
