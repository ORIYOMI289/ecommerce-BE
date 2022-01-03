const mongoose = require('mongoose') ;

const productSchema = new mongoose.Schema({
    title:{ type: String, required: true, unique: true},
    desc: { type: String, required: true},
    img: { type: String, required: true},
    categories: { type: Array, required: true},
    size: { type: String, required: true},
    color: { type: String, required: true},
    price: { type: Number, required: true}
}, {timestamps: true}) ;

const products = mongoose.model('products', uproductSchema) ;

module.exports = products ;
