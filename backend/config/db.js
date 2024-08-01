// backend/config/db.js

var Sequelize = require('sequelize');

var sequelize = new Sequelize('randomdb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port : 8889,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

exports.sequelize = sequelize;
module.exports = Sequelize;