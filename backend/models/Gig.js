// backend/models/Gig.js

const { Sequelize, DataTypes } = require('sequelize');
const db = require('./index');

const Gig = db.sequelize.define('Gig', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Gig;
