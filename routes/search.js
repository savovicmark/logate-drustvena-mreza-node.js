var express = require('express');
var router = express.Router();

//=======================================================================
const Sequelize = require('sequelize');
const dbConnection = require('./../models/db-connection');
const Picture = require('./../models/picture')
const PictureComment = require('./../models/pictureComment')
const PictureLike = require('./../models/pictureLike')
const Profile = require('./../models/profile')
const Status = require('./../models/status')
const StatusComment = require('./../models/statusComment')
const StatusLike = require('./../models/statusLike')
//===============================================================================


router.get('/', (req, res, next)=>{
    Profile.findAll({where:{
        [Sequelize.Op.or] :[
            {firstName : {[Sequelize.Op.like] : '%' + req.query.firstName}},
            {lastName: {[Sequelize.Op.like] : '%' + req.query.lastName}},
            {username : {[Sequelize.Op.like] : '%' + req.query.username}}
        ]
    },
 include:[Status, Picture]})
 .then(result => res.json(result))
 .catch(err => res.json({'msg': 'An error ocured'}))
})







module.exports = router