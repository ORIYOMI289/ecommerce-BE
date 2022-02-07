const router = require('express').Router();
const {createProducts, getProducts, getProduct, updateProduct, deleteProduct, queryTest} = require('../controller/product') ;
const {grantRoleAccess, allowIfLoggedin} = require('../middleware/accessLoginRole') ;

router.post('/:id', allowIfLoggedin, grantRoleAccess('createAny','product'), createProducts) ;

router.get('/:productId', allowIfLoggedin, grantRoleAccess('readAny','product'), getProduct) ;

router.get('/', grantRoleAccess('readAny','products'), getProducts) ;

router.put('/:id/:productId', allowIfLoggedin, grantRoleAccess('updateAny','product'), updateProduct) ;

router.delete('/:id/:productId', allowIfLoggedin, grantRoleAccess('deleteAny','product'), deleteProduct) ;

// router.get('/', queryTest)

module.exports = router ;
