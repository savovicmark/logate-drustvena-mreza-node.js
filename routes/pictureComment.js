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
  PictureComment.create(req.body).then(result => {
    return PictureComment.findAll({where:{
      pictureId : req.body.pictureId
    },
  include:[Profile, Picture]}).then(data => res.json(data))
  })
});

router.get('/',(req, res, next)=>{
  
  console.log(req.query)
  
  PictureComment.findAll({where : {
    pictureId : parseInt(req.query.pictureId)
  },
  include: [Profile, Picture],
  order: [
    ['createdAt', 'ASC']
  ]
}).then(result => res.send(result))
.catch(err=> res.send(err))
})

router.delete('/', (req, res, next)=>{
  PictureComment.destroy({where:{
    id : parseInt(req.query.commentId)
  }}).then(result => {
    return PictureComment.findAll({where:{
      pictureId: parseInt(req.query.pictureId)
    },
    include:[Profile, Picture],
    order:[
      ['createdAt', 'ASC']
    ]})
  }).then(data => res.json(data))
  .catch(err => res.json({'msg': 'An error ocured' }))
})




module.exports = router;
