var express = require('express');
var router = express.Router();
var multer = require('./../models/multer')

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

router.post('/', multer.single('photo') ,(req, res, next)=> {
    if(!req.file){
        res.status(500).json({
            message: 'No file uploaded'
        })
    }
    else{
        res.status(200).json({
            message: 'File Uploaded!!!',
            filename: req.file.filename
        })
    }
})




module.exports = router