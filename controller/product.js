const express = require('express') ;
const{ products} = require('../models/product')


exports.Products = async ((req, res) => {
    try {

        let subCategory = [{
            type: req.body,
            model: [{
                colour: [{
                    name: req.body, 
                    img:req.body
                }],
                size: [{
                    value: req.body,
                     price: req.body
                }]
            }]
        }]
        const newProducts = new products({
            name: req.body,
            category:req.body,
            subcategory: subCategory,
            description:req.body
        })
        await newProducts.save() ;
    }
    catch (err){ console.log(err.message) }

    

})