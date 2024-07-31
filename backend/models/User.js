// backend/models/User.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,   
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type: DataTypes.TEXT,
    },
    bandPicture: {
        type: DataTypes.STRING,
    },
    video: {
        type: DataTypes.STRING,
    },
    socialMediaLinks: {
        type: DataTypes.JSON,
    },
    streamingData: {
        type: DataTypes.JSON,
    },
});

module.exports = User;
