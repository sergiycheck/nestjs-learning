/*eslint-disable */
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.PG_DB_HOST,
    port: +process.env.PG_DB_PORT,
    username: process.env.PG_DB_USERNAME,
    password: process.env.PG_DB_PASSWORD,
    database: process.env.PG_DB_DATABASE,
  },
  test: {
    dialect: 'postgres',
    host: process.env.PG_DB_HOST,
    port: +process.env.PG_DB_PORT,
    username: process.env.PG_DB_USERNAME,
    password: process.env.PG_DB_PASSWORD,
    database: process.env.PG_DB_DATABASE,
  },
  production: {
    dialect: 'postgres',
    host: process.env.PG_DB_HOST,
    port: +process.env.PG_DB_PORT,
    username: process.env.PG_DB_USERNAME,
    password: process.env.PG_DB_PASSWORD,
    database: process.env.PG_DB_DATABASE,
  },
};
