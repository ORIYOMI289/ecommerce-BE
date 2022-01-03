// // const axios = require('axios') ;
// const jwt = require('jsonwebtoken') ;

// const users = require('../models/users') ;

// require('dotenv').config()
//  const {mailjetApikey, mailJetSecretKey, mailSender, jwtVerifyKey} = process.env

//  const mailjet = require('node-mailjet')
// .connect(mailjetApikey, mailJetSecretKey)

// function mail(name) {
//     return (req, res, next) => {
//         if (!mailjetApikey || !mailJetSecretKey) { return res.status(500).send('server error occured') } 
         
//         else {
//             const {email} = req.body ; 
//             // const token = jwt.sign({email}, jwtVerifyKey) ;
//             // const token = jwt.sign({email}, jwtResetPasswordKey, {expiresIn:'20m'}) ;
//                 mailjet.post('send', { version: 'v3.1' }).request( {
//                 Messages: [{
//                     From: {
//                         Email: mailSender,
//                         Name: name,
//                     },
//                     To: [{
//                         Email: email,
//                         Name: users.findOne({email}).userName,
//                     },],
//                     Subject: "Your e-mail reset link!",
//                     HTMLpart: `<p>Dear customer, welcome back! kindly copy on your password reset token below <br><strong>>${token}</strong></p>`,
//                 }]
//             })
//             .then(res => res.json)
//             .catch( err => console.log(err))
//             next() ;
//         }
//     }
// }



// module.exports = { mail }