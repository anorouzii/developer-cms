const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req,res,next) {
    const token = req.header('Authorization');
    if (!token) {
        res.status(401).json({msg:'Access Token is NOT specified in request header'})
    }
    try {
        const decode = jwt.verify(token,config.get('jtw.secretKey'));
        req.username = decode.username;
        req.password = decode.password;
        next()
    } catch(err) {
        res.status(401).json({msg:'Token is not valid'})
    }
};
