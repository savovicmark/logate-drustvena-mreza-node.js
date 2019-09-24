const Sequelize = require('sequelize');

const dbConnection = new Sequelize('projekat', 'root', 'hoven112233', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false
})

module.exports = dbConnection;