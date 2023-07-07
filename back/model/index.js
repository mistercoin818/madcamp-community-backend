// DB 연결
const Sequelize = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

