const jwt = require('jsonwebtoken') ;

const users = require('../models/users') ;

const verifyToken = async (req, res, next) => {
    const User = await users.findOne({id: req.params.id}, (err, user) => {
        if (err) {console.log(err)} ;

        const authHeader = req.headers.token.split(' ')[1] ; 
        if (authHeader) {
            jwt.verify(authHeader, process.env.jwtKey, (err, data) => {
                if (err) return res.status(403).json(err)
                req.data = data;
    
                next() ;
            })
        }
        else {
            return res.status(401).json("you are not authenticated")
        }
    }) ;
    // console.log(User) ;
   
}

const verifyTokenAndAuth = (req, res, next) => {
    verifyToken(req, res, (req, res) => {
        // console.log(req.data)
        if (req.users.id === req.params.id || req.user.isAdmin) {
            next()
        }
        else {
            res.status(403).json("you are not allowed to do that")
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuth}