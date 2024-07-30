// backend/config/db.js

const { Sequelize } = require('sequelize');
const path = require('path');

// SQLite connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite')
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectDB };
