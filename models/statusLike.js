const Sequelize = require('sequelize');
const dbconnection = require('./db-connection');

const StatusLike = dbconnection.define('statusLike', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
        allowNull: false
    }
},
{
    freezeTableName: true,
    timestamps: false
})

module.exports = StatusLike