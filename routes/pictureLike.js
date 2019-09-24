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
/* GET home page. */
router.post('/', function(req, res, next) {
  PictureLike.create(req.body).then(result => {
    return PictureLike.findAll({
      where:{
        pictureId: req.body.pictureId
      }
    })
  }).then(data => res.json(data))
  .catch(err=> res.send(err))
});

router.delete('/', function(req, res, next){
  PictureLike.destroy({where:{
    pictureId: parseInt(req.query.pictureId),
    profileId: parseInt(req.query.profileId)
  }}).then(data =>{
    return PictureLike.findAll({
    where:{
      pictureId: parseInt(req.query.pictureId)
    }
  }).then(likes => res.json(likes))
  })
  .catch(err=>res.send(err))
})

router.get('/', (req, res, next)=>{
  PictureLike.findAll({where:{
    pictureId: parseInt(req.query.pictureId)
  },
  include: [Profile]}).then(result => res.json(result))
  .catch(err=> res.json({'msg': 'An error ocured'}))
})

module.exports = router;
