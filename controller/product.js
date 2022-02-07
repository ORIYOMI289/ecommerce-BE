const express = require('express') ;
const products = require('../models/product');

//create
exports.createProducts = async(req, res) => {
    const newProduct = new products(req.body) ;
    try {

       await newProduct.save( (err, success) => {
           if (err) return console.log(err) ;
       } ) ;

        res.status(200).json(newProduct) ;
    }
    catch (err){ res.status(500).json({err: err}) } 
} 

//get all products

exports.getProducts = async (req, res) => {
    try {
    // let url = res.redirect('/category') || res.redirect('/category/subcategory') ;

       const productsData = await products.find().sort({_id: -1}) ;

       const checkProduct = await products.find({category:req.body.category}) ;
       if (checkProduct.click) {
           res.json(checkProduct.category)
       }
        res.status(200).json(productsData)
    }
    catch (err) {
        console.log(err)
    }
}

//get a product

exports.getProduct = async (req, res) => {
    try {
        const productData = await products.findById(req.params.productId) ;
        res.status(200).json(productData) ;
    } catch (err) {
        console.log(err)
    }
}

//update product detsils

exports.updateProduct = async (req, res) => {
    if (!req.body) return console.log('invalid input')
     try {
         const updatedProduct = await products.findByIdAndUpdate(req.params.productId, { $set: req.body }, {new: true}) ;
         res.status(200).json(updatedProduct) 
     } catch (err) {
        console.log(err)
     }
}

//delete product

exports.deleteProduct = async (req, res) => {
    if (!req.body) return console.log('invalid input')
     try {
         const deleteProduct = await products.findByIdAndDelete(req.params.productId) ;
         if(!deleteProduct) return res.status(400).json('product does not exist')
         res.status(200).json('successfully deleted') ;
     } catch (err) {
        console.log(err)
     }
}