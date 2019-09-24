var multer = require('multer')
var path = require('path')

var storage = multer.diskStorage({
    destination:(req, file, callback)=>{
        callback(null, path.join(__dirname, './../public/uploads'))
    },
    filename: (req, file, callback)=>{
        callback(null, Date.now() + '-' + file.originalname)
    }
})

var multer = multer({storage: storage})


module.exports = multer