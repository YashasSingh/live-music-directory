// backend/models/User.js


const { Sequelize, DataTypes } = require('sequelize');
const db = require('./index');

const User = db.sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    bandPicture: {
        type: DataTypes.STRING,
        allowNull: true
    },
    video: {
        type: DataTypes.STRING,
        allowNull: true
    },
    socialMediaLinks: {
        type: DataTypes.JSON,
        allowNull: true
    },
    streamingData: {
        type: DataTypes.JSON,
        allowNull: true
    }
});

module.exports = User;

