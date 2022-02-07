 const cart = require('../models/cart')

 //create cart
exports.newCarts = async (req, res) => {
    const newCart = new cart(req.body);
    try {
        await newCart.save((err, success) => {
            if (err) {console.log(err)}
        }) 
        res.status(200).json(newCart)
    } catch (err) {
        console.log(err)
    }

}

//get one user cart
exports.getCart = async (req, res) => {
    try {
        const Cart= await cart.findOne(req.param.userId) ;
        res.satus(200).json(Cart)
    } catch (err) { console.log(err)}
}

//allCarts
exports.allCarts = async (req, res) => {
    try {
        const allCarts = await cart.find()
        res.satus(200).json(allCarts)
     } catch (err) { console.log(err)}

}

//update cart

exports.updateCart = async (req, res) => {
    try {
       const update = await cart.findByIdAndUpdate(req.params.userId, { $set: req.body})
       res.satus(200).json(update)
    } catch (err) { console.log(err)}
}

//delete cart
exports.deleteCart = async (req, res) => {
    try {
        const deleteCart = await cart.findByIdAndDelete(req.params.cartId)
        res.satus(200).json(deleteCart)
     } catch (err) { console.log(err)}

}

