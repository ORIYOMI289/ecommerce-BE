const mongoose = require('mongoose') ;

const productSchema = new mongoose.Schema({

    category : { type: String, required: true, unique: false},
    subcategory: { type: String, required:true },
    newproduct: [{
        colour: { type: Array },
        imgPath: { type: String, required: true },
        size : {type: Array},
        price: { type: Number, required: true},
        description: { type: String, required: true}
    }]
    

}, {timestamps: true}) ; 


// const citizen = [{
//     Nigerian : [{
//         yoruba: [{
//             gender: ['male', 'female'],
//             complexion: ['light', 'dark']
//         }]
//     }]
// }]

 
const products = mongoose.model('products', productSchema) ;

module.exports = products ;
