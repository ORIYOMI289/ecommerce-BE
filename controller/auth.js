const express = require('express')
const bcrypt = require('bcrypt')
const axios = require('axios') ;
const jwt = require('jsonwebtoken') ;
// const _ = require("lodash") ;

const users = require('../models/users') ;
require('dotenv').config()

const { jwtVerifyKey,jwtKey, mailjetApikey, mailJetSecretKey, mailSender} = process.env ;
const mailjet = require('node-mailjet')
.connect(mailjetApikey, mailJetSecretKey)



//register
exports.register = async (req, res) => {
    const newData = new users( 
        {userName, email, password} = req.body  ) ;
        // userName: req.body.userName, 
        // email: req.body.email,
        // password: req.body.password
  
    try {
        const salt = await bcrypt.genSalt(5);
        newData.password = await bcrypt.hash(newData.password, salt)
        await newData.save() ; 
        res.status(200).json(newData) ; 
        // const token = jwt.sign({userName, email}, jwtKey, {expiresIn: '20mins'}) 
        // res.status(200).header('authToken', token).json(newData) ; 
    } 
    catch (error){
        console.error(error)
    }
}

//login
exports.signIn = async (req, res) => {
    try {
        const User = await users.findOne({email: req.body.email})
        if (!User)  return res.status(400).send('you are not a user, kindly register') ;       
        const comparePassword = await bcrypt.compare(req.body.password, User.password) ;
        if (!comparePassword) return res.status(400).send('incorrect password') ;
        const token = jwt.sign({
            id: User._id,
            isAdmin:User.isAdmin
        }, jwtKey, {expiresIn: "3d"})  ;
        res.status(200).header('authToken', token).send('welcome back!')
    }
    catch (err) {
        console.log(err)
    }
}

//forgotPassword


exports.forgotPassword =  (req, res) =>{
    const {email} = req.body ;
    const token = jwt.sign({email}, jwtVerifyKey, {expiresIn:'40m'}) ;
        if (!mailjetApikey || !mailJetSecretKey) { return res.status(500).send('server error occured') } 
          
          else {
            // const {email} = req.body ; 
            // const token = jwt.sign({email}, jwtVerifyKey) ;
           
                mailjet.post('send', { version: 'v3.1' }).request( {
                Messages: [{
                    From: {
                        Email: mailSender,
                        Name: "Jewel",
                    },
                    To: [{
                        Email: email,
                        Name: users.findOne({email}).userName,
                    },],
                    Subject: "Your e-mail reset link!",
                    HTMLpart: `<p>Dear customer, welcome back! kindly copy on your password reset token below <br><strong>>${token}</strong></p>`,
                }]
            })
            .then(res => res.json)
            .catch( err => console.log(err))

        }

     users.findOne({email}, (err, user) => {
        if (err || !user) {  
            return res.status(400).json({error: "user with this email does not exist."})
        }
        user.updateOne({resetToken: token}, (err, user) => {
        (err) ?  res.status(400).json({error: err}) :  res.json({message: "Email has been sent, kindly copy token to change your password"})
    }) 
   })
}

//resetPassword
exports.resetPassword = async(req, res) => {
  let {resetToken, newPassword} = req.body ;
   const salt = await bcrypt.genSalt(6);
    newPassword = await bcrypt.hash(newPassword, salt)

   if(resetToken) {
       jwt.verify(resetToken, jwtVerifyKey, (err, user) => {
           if (err) {
               return res.status(401).json({error: err})
           }

            users.findOne({resetToken}, (err, user) => {

                if (err || !user) {
                    return res.status(400).json({error: err})
                }
                else {

                    users.updateOne({resetToken},{ $set: {password:newPassword, resetToken: "" }}, (err, user) => {
                         (err) ? res.status(400).json({error: "reset password error" }) : res.status(200).json({success: "your password has been changed!" }) 
                    }) 
                }
            })  
       })
   }
   else {
       return res.status(401).json({error: "Authentication error"})
   }
  
}

