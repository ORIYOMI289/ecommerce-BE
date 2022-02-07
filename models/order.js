const mongoose = require('mongoose') ;

const orderSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    products: [{
        productId: {type: String}, 
        quantity: { type: Number, default: 1}
    }],
    amount: {type: Number},
    address:{ type:Object, required:true },
    status: { type: String, default: 'pending'}
}, {timestamps: true}) ;

const order = mongoose.model('Orders', orderSchema) ;

module.exports = order ;
