// backend/models/Submission.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Gig = require('./Gig');

const Submission = sequelize.define('Submission', {
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending',
    },
});

Submission.belongsTo(User);
Submission.belongsTo(Gig);

module.exports = Submission;
