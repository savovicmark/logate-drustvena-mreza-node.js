
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

//================================================================================
const Sequelize = require('sequelize');
const dbConnection = require('./models/db-connection');
const Picture = require('./models/picture')
const PictureComment = require('./models/pictureComment')
const PictureLike = require('./models/pictureLike')
const Profile = require('./models/profile')
const Status = require('./models/status')
const StatusComment = require('./models/statusComment')
const StatusLike = require('./models/statusLike')
//=================================================================================

// Routeri
var profileRouter = require('./routes/profile');
var statusRouter = require('./routes/status');
var statusLikeRouter = require('./routes/statusLike');
var statusCommentRouter = require('./routes/statusComment')
var pictureRouter = require('./routes/picture')
var pictureLikeRouter = require('./routes/pictureLike')
var pictureCommentRouter = require('./routes/pictureComment')
var registerRouter = require('./routes/register')
var loginRouter = require('./routes/login')
var uploadRouter = require('./routes/upload')
var searchRouter = require('./routes/search')

var app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Content-type, X-Requested-With, Origin, Authorization');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

    next();
})

app.use('/status', statusRouter);
app.use('/profile', profileRouter);
app.use('/statusLike', statusLikeRouter)
app.use('/statusComment', statusCommentRouter)
app.use('/picture', pictureRouter)
app.use('/pictureLike', pictureLikeRouter)
app.use('/pictureComment', pictureCommentRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/upload', uploadRouter)
app.use('/search', searchRouter)



//======================================================================
Profile.hasMany(Picture, {foreignKey: 'profileId', onDelete: 'cascade', hooks: true})
Profile.hasMany(PictureLike, {foreignKey: 'profileId', onDelete: 'cascade', hooks: true})
Profile.hasMany(PictureComment, {foreignKey: 'profileId', onDelete: 'cascade', hooks: true})
Profile.hasMany(Status , {foreignKey: 'profileId', onDelete: 'cascade', hooks: true})
Profile.hasMany(StatusLike , {foreignKey: 'profileId', onDelete: 'cascade', hooks: true})
Profile.hasMany(StatusComment , {foreignKey: 'profileId', onDelete: 'cascade', hooks: true})
Picture.hasMany(PictureLike, {foreignKey: 'pictureId', onDelete: 'cascade', hooks: true})
Picture.hasMany(PictureComment, {foreignKey: 'pictureId', onDelete: 'cascade', hooks: true})
Status.hasMany(StatusLike, {foreignKey: 'statusId', onDelete: 'cascade', hooks: true})
Status.hasMany(StatusComment, {foreignKey: 'statusId', onDelete: 'cascade', hooks: true})
//============================================================================
Picture.belongsTo(Profile);
PictureComment.belongsTo(Profile);
PictureLike.belongsTo(Profile);
Status.belongsTo(Profile);
StatusLike.belongsTo(Profile);
StatusComment.belongsTo(Profile);
PictureLike.belongsTo(Picture);
PictureComment.belongsTo(Picture);
StatusLike.belongsTo(Status);
StatusComment.belongsTo(Status)
//==================================================================================

dbConnection.sync()

module.exports = app;
