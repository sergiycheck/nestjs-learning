#!/bin/sh
# print all env
env

# TODO: wait untill postgres is ready https://docs.docker.com/compose/startup-order/

if [ "$migrateDevArg" = "1" ]; then
  echo "migrateDevArg = 1 for migration"
  npm run migrate:prod
fi
exec npm run start:prod
