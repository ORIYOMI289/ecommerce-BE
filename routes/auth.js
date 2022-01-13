
const {register, signIn, forgotPassword, resetPassword} = require('../controller/auth') ;

const express = require('express')
const router = express.Router() ;



//register
router.post('/register', register) ;
//login
router.post('/signIn',signIn ) ;
//forgotPassword
router.put('/forgotpassword', forgotPassword);
//reset Password link
router.put('/resetPassword',resetPassword)
 
module.exports = router
