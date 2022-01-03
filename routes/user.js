const { verifyToken, verifyTokenAndAuth } = require("../middleware/verifyToken") ;
const users = require('../models/users') ;

const bcrypt = require('bcrypt')
const router = require('express').Router() ;

router.put('/:id', verifyTokenAndAuth, async(req, res) => {
    if (req.body.password) {
        const salt = await bcrypt.genSalt(5);
            req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try {
        const updatedUser = await users.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true})
    }
    catch (err) { res.status(500).json(err) }
})

module.exports = router