const Sequelize = require('sequelize');
const dbconnection = require('./db-connection');

const PictureLike = dbconnection.define('pictureLike', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = PictureLike