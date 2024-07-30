// backend/models/Like.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Like = sequelize.define('Like', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    profileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Like;
