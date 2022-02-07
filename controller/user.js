const users = require('../models/users') ;
const bcrypt = require('bcrypt')

//update user
exports.userUpdate = async(req, res) => {
    if(!req.body) return res.send("invalid request")
    if (req.body.password) {
        const salt = await bcrypt.genSalt(5);
            req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try { 
        const updatedUser = await users.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new:true}) ;
            
        res.status(200).send(updatedUser)
        
    }
    catch (err) { res.status(500).json(err) }
}

//Get all users

exports.getUsers = async(req, res ) => {
    try {
        const Users = await users.find();
        res.status(200).send(Users);
    }
    catch (err) {
        res.status(400).send(err)
    }
}

//get One user

exports.User = async (req, res) => {
    try {
       const user = await users.findById(req.params.id) ;
       if (!user) return res.status(400).send('user does not exist')
       res.status(200).send(user)
    }
    catch (err) {
        res.status(400).send(err)
    }
}

//delete user
exports.deleteUser = async (req, res) => {
    try {
       const user = await users.findByIdAndDelete(req.params.id) ;
       if (!user) return res.status(400).send('user does not exist')
       res.status(200).send(user)
    }
    catch (err) {
        res.status(400).send(err)
    }
}
