const Sequelize = require('sequelize');
const db = require('../config/database');

const Video = db.define('video', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    category_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'category',
            key: 'id',
        },
    },
    attache: {
        type: Sequelize.STRING,
    },
    thumbnail: {
        type: Sequelize.STRING,
    },
}, {
    tableName: 'videos',
    timestamps: false
});

module.exports = Video;