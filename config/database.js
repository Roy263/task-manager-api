const mysql = require('mysql2');
require('dotenv').config()

dbHost=process.env.DB_HOST;
dbName=process.env.DB_NAME;
dbUser=process.env.DB_USER;
dbPass=process.env.DB_PASSWORD;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(dbName, dbUser , dbPass, {
    host: dbHost,
    dialect: 'mysql', // Use the appropriate dialect for your database
});

module.exports = sequelize;