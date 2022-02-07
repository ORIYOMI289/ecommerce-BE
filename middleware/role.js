const accessControl = require('accesscontrol');
const ac = new accessControl() ;

exports.role = (function () {
    ac.grant('customer')
        .readOwn('profile')
        .updateOwn('profile') ;
    
    ac.grant('admin')
        .extend('customer')
        .readAny('profile')
        .updateOwn('profile') 
        .deleteAny('profile') 
        .createAny('product')
        .readAny('products')
        .readAny('products')
        .updateAny('product')
        .deleteAny('product')

        .readAny('cart')
        .readAny('carts')
        .updateOwn('cart')
        .deleteAny('cart')

        .readAny('order')
        .readAny('orders')
        .updateOwn('order')
        .deleteAny('order')

        return ac ;
})() 