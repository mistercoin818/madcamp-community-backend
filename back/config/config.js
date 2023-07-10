const dotenv = require('dotenv');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(__dirname, '../.env.development') });
} else {
  dotenv.config({ path: path.resolve(__dirname, '../.env.production') });
}
const env = process.env;

module.exports = {
  development: {
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    host: env.MYSQL_HOST,
    dialect: 'mysql',
    port: env.MYSQL_PORT,
    logging: console.log,
  },
  test: {
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    host: env.MYSQL_HOST,
    dialect: 'mysql',
    port: env.MYSQL_PORT,
    logging: console.log,
  },
  production: {
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    host: env.MYSQL_HOST,
    dialect: 'mysql',
    port: env.MYSQL_PORT,
    logging: console.log,
  },
};
