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


router.post('/', function(req, res, next) {
  StatusLike.create(req.body).then(result => {
    return StatusLike.findAll({where:{
      statusId: req.body.statusId
    }})
  }).then(data=> res.json(data))
  .catch(err=> res.json({'message': 'An error ocured'}))
});

router.delete('/', (req, res, next)=>{
  StatusLike.destroy({where:{
    statusId: parseInt(req.query.statusId),
    profileId: parseInt(req.query.profileId)
  }}).then(result=>{
    return StatusLike.findAll({where:{
      statusId: parseInt(req.query.statusId)
    }})
  }).then(data=> res.json(data))
  .catch(err=> res.json({'message': 'An error ocured'}))
})

router.get('/', (req, res, next)=>{
  console.log(req.query)
  StatusLike.findAll({where:{
    statusId: parseInt(req.query.statusId)
  },
  include: [Profile]}).then(result => res.json(result))
  .catch(err=> res.json({'msg': 'An error ocured'}))
})


module.exports = router;
