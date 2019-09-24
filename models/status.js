const Sequelize = require('sequelize');
const dbconnection = require('./db-connection');

const Status = dbconnection.define('status', {
    status: {
        type: Sequelize.TEXT,
        allowNull: false
    }
},
{
    freezeTableName: true,
    timestamps: true,
    updatedAt: false
})


module.exports = Status