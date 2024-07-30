// backend/models/Comment.js

const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Comment = sequelize.define('Comment', {
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    profileId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Comment;
