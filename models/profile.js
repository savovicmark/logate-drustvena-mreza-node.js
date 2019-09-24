const Sequelize = require('sequelize');
const dbconnection = require('./db-connection');

const Profile = dbconnection.define('profile', {
    username : {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [4, 15]
        }
    },
    password : {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    firstName : {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    profilePicture : {
        type: Sequelize.STRING,
        allowNull: true,
        //unique: true,
        defaultValue: 'https://via.placeholder.com/50'
    }, 
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail : true
        }
    }
    
}, { 
    freezeTableName: true,
    timestamps: true,
    updatedAt: false
})

module.exports = Profile