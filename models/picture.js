const Sequelize = require('sequelize');
const dbconnection = require('./db-connection');

const Picture = dbconnection.define('picture', {
    path : {
        type: Sequelize.STRING,
        allowNull: false, 
        defaultValue: 'https://via.placeholder.com/400',
        
    },
    description : {
        type: Sequelize.TEXT, 
        allowNull: true
    }
}, { 
    freezeTableName : true,
    timestamps: true,
    updatedAt: false
})

module.exports = Picture