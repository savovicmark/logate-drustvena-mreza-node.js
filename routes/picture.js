var express = require('express');
var router = express.Router();
var multer = require('./../models/multer');
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
router.post('/upload', multer.single('img') ,(req, res, next)=>{
    if(!req.file){
      res.send({
        status: 404,
        message : 'No file'
      })
    } else {
        res.send({
          status: 200,
          message: 'File uploaded',
          filename: req.file.filename
        })
      }
      
    }
)

router.post('/', jwtVerify, function(req, res, next) {
  Picture.create(req.body).then(result=>{
    return Picture.findAll({
      where:{
        profileId: req.body.profileId
      },
      include:[Profile, PictureLike],
      order:[
        ['createdAt', 'DESC']
      ]
    })
  }).then(data => {
    res.json(data)
  }).catch(err => res.json({message: 'An error ocured'}))
});
router.get('/', function(req, res, next){
  //console.log(req.url);
  
  Picture.findAll({
    include: [{
      model : Profile,
      attributes: ['firstName', 'lastName', 'profilePicture', 'id']
    },
  {model: PictureLike}],
    limit: 15, 
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
  Picture.findAll({where:{
    profileId : parseInt(req.query.id)
  },
  include: [Profile, PictureLike],
  order:[
    ['createdAt', 'DESC']
  ]})
  .then(result => res.send(result))
  .catch(err=> res.send(err))
})


router.delete('/newPictures', jwtVerify, (req, res, next)=>{
  Picture.destroy({where:{
    id: parseInt(req.query.id)
  }}).then(result=>{
    return Picture.findAll({
      include: [{
        model : Profile,
        attributes: ['firstName', 'lastName', 'profilePicture', 'id']
      },
    {model: PictureLike}],
      limit: 10, 
      order: [
        ['createdAt', 'DESC']
      ]
  })
}).then(data=> res.json(data))
.catch(err=> res.send(err))
})

router.delete('/myPictures', jwtVerify, (req,res, next)=>{
  Picture.destroy({where:{
    id:parseInt(req.query.id)
  }}).then(result=> {
    return Picture.findAll({where:{
      profileId: parseInt(req.query.profileId)
    },
  include :[Profile, PictureLike],
order:[
  ['createdAt', 'DESC']
]})
  }).then(data=>res.json(data))
  .catch(err=> res.send(err))
})







module.exports = router;
