var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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

router.post('/', (req, res, next) =>{
    Profile.findAll({where:{
        username: req.body.username
    }})
    .then(result => {
        if(result.length > 0){
            res.status(500).json({error:'Authentication error'})
        }
        bcrypt.hash(req.body.password, 10, (err, hash)=> {
            if(err){
                res.status(500).json({error: 'An unexpected error occured'})
            }
            req.body.password = hash;
            Profile.create(req.body)
            .then(result => {
                Profile.findAll({where:{
                    username : req.body.username
                }}).then(result =>{
                    const token = jwt.sign({
                    username : result[0].username,
                    id : result[0].id
                    }, 
                    'SECRET',
                    {expiresIn: "10h"});
                res.status(200).json({token : token})
            })
            
        })
    })
  }).catch(err => res.status(500).json({error: err}))
})


module.exports = router