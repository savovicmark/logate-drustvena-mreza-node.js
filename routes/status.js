var express = require('express');
var router = express.Router();
var jwtVerify = require('./../models/jwt-verify');

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


router.post('/', function(req, res, next) {
  Status.create(req.body).then(result=>{
    return Status.findAll({
      where: {
        profileId : req.body.profileId
      },
      include:[Profile, StatusLike],
      order:[
        ['createdAt', 'DESC']
      ]
    }).then(data => res.json(data))
  }).catch(err => res.json({message: 'An error ocured'}))
});

router.get('/', (req, res, next) => {
  Status.findAll({
    include: [Profile, StatusLike],
    limit: 20, 
    order: [
      ['createdAt', 'DESC']
    ]
  }).then(result =>{
    res.send(result)
  }).catch(err =>{
    res.send(err)
  })
})


router.get('/byId', jwtVerify, (req, res, next)=>{
  Status.findAll({where:{
    profileId: parseInt(req.query.id)
  },
  include:[Profile, StatusLike],
 order: [
   ['createdAt', 'DESC']
 ]})
  .then(result => res.send(result))
  .catch(err=> res.send(err))
})

router.delete('/newStatuses', jwtVerify, (req, res, next)=>{
  Status.destroy({where:{
    id : parseInt(req.query.id)
  }}).then(result=>{
    return Status.findAll({
      include: [Profile, StatusLike],
      limit : 20,
      order:[
        ['createdAt', 'DESC']
      ]
    })
  }).then(data => res.json(data))
  .catch(err=> res.json({'msg': 'An error ocured'}))
})

router.delete('/myStatus', jwtVerify, (req, res, next)=>{
  Status.destroy({where:{
    id: parseInt(req.query.id)
  }}).then(result=>{
   return Status.findAll({where:{
      profileId : parseInt(req.query.profileId)
    },
  include:[Profile, StatusLike],
  order:[
  ['createdAt', 'DESC']
  ]})
  }).then(data => res.json(data))
  .catch(err=> res.json({'msg':'An error ocured'}))
})


module.exports = router;
