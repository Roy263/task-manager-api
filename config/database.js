const mysql = require('mysql2');
require('dotenv').config()

dbHost=process.env.db_host;
dbName=process.env.db_name;
dbUser=process.env.db_user;
dbPass=process.env.db_pass;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(dbName, dbUser , dbPass, {
    host: dbHost,
    dialect: 'mysql', // Use the appropriate dialect for your database
});

module.exports = sequelize;