Sequelize = require('sequelize');

const dbname = 'dumb_streaming';
const username = 'root';
const password = 'yourpassword';

const db = new Sequelize(dbname, username, password, {
    host: 'localhost',
    dialect: 'mysql',
    operatorAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

module.exports = db;