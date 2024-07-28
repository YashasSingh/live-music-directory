// backend/models/Submission.js

const { Sequelize, DataTypes } = require('sequelize');
const db = require('./index');
const User = require('./User');
const Gig = require('./Gig');

const Submission = db.sequelize.define('Submission', {
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending'
    }
});

User.hasMany(Submission);
Submission.belongsTo(User);

Gig.hasMany(Submission);
Submission.belongsTo(Gig);

module.exports = Submission;
