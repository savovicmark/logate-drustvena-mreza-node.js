const Sequelize = require('sequelize');
const dbconnection = require('./db-connection');

const StatusComment = dbconnection.define('statusComment', {
    comment: {
        type: Sequelize.TEXT,
        allowNull: false
    }
},
{
    freezeTableName: true, 
    timestamps: true,
    updatedAt: false
})

module.exports = StatusComment