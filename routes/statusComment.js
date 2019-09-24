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
  StatusComment.create(req.body).then(result=>{
    return StatusComment.findAll({where:{
      statusId : req.body.statusId
    },
    include: [Profile, Status]})
  }).then(data => res.json(data))
  .catch(err => res.json({message: 'Error ocured'}))
});

router.get('/',(req, res, next)=>{
  console.log(req.query);
  StatusComment.findAll({where : {
    statusId : parseInt(req.query.statusId)
  },
  include: [Profile, Status],
  order: [
    ['createdAt', 'ASC']
  ]
}).then(result => res.send(result))
.catch(err=> res.send(err))
})

router.delete('/', (req, res, next)=>{
  StatusComment.destroy({where:{
    id : parseInt(req.query.commentId)
  }}).then(result=>{
    return StatusComment.findAll({where:{
      statusId : parseInt(req.query.statusId)
    },
    include:[Profile, Status],
    order: [
      ['createdAt', 'ASC']
    ]})
  }).then(data => res.json(data))
  .catch(err=> res.json({'msg':'An error ocured'}))
})

module.exports = router;
