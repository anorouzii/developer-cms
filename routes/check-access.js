const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../auth');
const bcrypt = require('bcrypt');

router.get('/',auth,(request,response)=> {
    // if jwt token sent in request header then this response will send
    try {
        response.json('valid JWT Token')
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Server error !')
    }
});

router.post('/',async (request,response)=> {
    const {username,password} = request.body;
    if (!username || !password) {
        return response.status(401).json({msg:'Please enter username and password.'})
    }
    try {
        if (username !== config.get('admin.username') || !bcrypt.compare(config.get('admin.password'), password)) {
            return response.status(401).json({msg:'Username or password is not correct.'})
        }
        // Create JWT token
        const saltRounds = 10;
        const hashPassword = bcrypt.hashSync(password, saltRounds); // just for more security

        jwt.sign({username:username,password:hashPassword},config.get('jtw.secretKey'),{
            expiresIn: config.get('jtw.expireToken')
        },(err,token)=> {
            if (err) throw err;
            response.json({token})
        });
    }catch (err) {
        console.error(err.message);
        response.status(500).json({msg:'Server error !'})
    }
});

module.exports = router;
