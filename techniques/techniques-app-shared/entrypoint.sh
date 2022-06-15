#!/bin/sh
# print all env
env

set -e

until PGPASSWORD=$PG_DB_PASSWORD psql -h "$PG_DB_HOST" -U "$PG_DB_USERNAME" -c '\q'; do
  >&1 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&1 echo "Postgres is up - executing command"

if [ "$migrateDevArg" = "1" ]; then
  >&1 echo "migrateDevArg = 1 for migration"
  command npx sequelize db:migrate --env production
fi
exec npm run start:prod
