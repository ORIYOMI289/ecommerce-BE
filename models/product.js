const mongoose = require('mongoose') ;

const productSchema = new mongoose.Schema({
    name:{ type: String, required: true, unique: true},
    category : {type: String, required: true} ,
    subcategory: [{
        type: String,
        model: [{
            colour: [{
                name: {type: String},
                img: { type: String, required: true},
            }],
           size : [{
                value: {type: Number},
                price: { type: Number, required: true}
           }]
            
        }],
        description: { type: String, required: true}
    }]
    
}, {timestamps: true}) ;

const products = mongoose.model('products', productSchema) ;

module.exports = products ;
