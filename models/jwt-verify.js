const jwt = require ('jsonwebtoken')


module.exports = (req, res, next)=>{

    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'SECRET');
        req.userData = decodedToken
    } catch(error) {
        return res.status(401).json({'msg': 'Could not verify token' })
    }

    next()
}