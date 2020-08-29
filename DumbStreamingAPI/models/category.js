const Sequelize = require('sequelize');
const db = require('../config/database');

const Category = db.define('category', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    tableName: 'categories',
    timestamps: false
})

module.exports = Category;