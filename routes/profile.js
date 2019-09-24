var express = require('express');
var router = express.Router();
var multer = require('./../models/multer')
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
/* GET home page. */
router.post('/profilePicture', multer.single('profileImg'), (req, res, next)=>{
  if(!req.file){
    res.send({
      status: 404,
      message: 'No file'
    })
  } else {
    res.send({
      status: 200,
      message : 'File uploaded',
      filename: req.file.filename
    })
  }
})

router.get('/', (req, res) => {
  console.log(req.ip)
  Profile.findAll({
    include: [Picture, Status],
    order: [['createdAt', 'DESC']],
    limit : 20
  }).then(result =>{
    res.send(result)
  }).catch(err => res.send(err))
})

router.get('/oneProfile',jwtVerify, (req, res, next)=>{
  Profile.findAll({where:{
    id: parseInt(req.query.id)
  },
include:[Picture, Status],
})
.then(result => res.send(result))
.catch(err => res.send(err))
})

router.put('/', (req, res, next)=>{
  Profile.update({profilePicture: req.body.profilePicture},
    {where:{
      id : req.body.id
    }}).then(result => res.json({'path' : req.body.profilePicture}))
    .catch(err => res.json({'err': 'An error ocured'}))
})

router.delete('/', (req, res, next)=>{
  Profile.destroy({where:{
    id: parseInt(req.query.id)
  }})/*.then(result=> {
    return Picture.destroy({where:{
      profileId: null
    }})
  }).then(result=>{
    return Status.destroy({where:{
      profileId: null
    }})
  }).then(result=>{
    return PictureComment.destroy({where:{
      profileId: null
    }})
  }).then(result=>{
    return PictureLike.destroy({where:{
      profileId: null
    }})
  }).then(result=>{
    return StatusComment.destroy({where:{
      profileId: null
    }})
  }).then(result=>{
    return StatusLike.destroy({where:{
      profileId: null
    }})
  })*/.then(result => res.json({status: 1, msg: 'User Deleted'}))
  .catch(err=> res.json({msg: 'An error ocured'}))
})

module.exports = router;
