// backend/models/Gig.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Gig = sequelize.define('Gig', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = Gig;
