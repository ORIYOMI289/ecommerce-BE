const mongoose = require('mongoose') ;

const userSchema = new mongoose.Schema({
    userName:{ type: String, required: true, unique: true},
    password: { type: String, unique: true},
    email: { type: String, required: true, unique: true},
    role: { 
        type:String,
        default: 'customer',
        enum: ['customer', 'admin']
     },
    resetToken: { data: String, required: '' }
}, {timestamps: true}) ;

const User = mongoose.model('Users', userSchema) ;
 
module.exports = User ;
 