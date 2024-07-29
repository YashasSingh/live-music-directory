// backend/models/Comment.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Comment = sequelize.define('Comment', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
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

module.exports = Comment;
