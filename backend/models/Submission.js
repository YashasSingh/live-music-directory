const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path if necessary

const Submission = sequelize.define('Submission', {
    // Define your model attributes here
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    GigId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending'
    }
});

Submission.belongsTo(User);
Submission.belongsTo(Gig);

module.exports = Submission;
