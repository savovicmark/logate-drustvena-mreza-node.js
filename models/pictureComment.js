const Sequelize = require('sequelize');
const dbconnection = require('./db-connection');

const PictureComment = dbconnection.define('pictureComment', {
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

module.exports = PictureComment