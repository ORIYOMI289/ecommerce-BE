const router = require('express').Router() ;
const {newCarts, getCart, allCarts, updateCart, deleteCart}  = require('../controller/cart')
const access = require('../middleware/accessLoginRole')

router.post("/", newCarts) ;

router.get("/:adminId/:userId", access.allowIfLoggedin, access.grantRoleAccess('readAny', 'cart'), getCart)

router.get("/:adminId", access.allowIfLoggedin, access.grantRoleAccess('readAny', 'carts'),  allCarts)

router.put("/:id/:userId",access.allowIfLoggedin, access.grantRoleAccess('readOwn', 'cart'), updateCart)

router.delete("/:adminId/:cartId",access.allowIfLoggedin, access.grantRoleAccess('deleteAny', 'cart'), deleteCart)

module.exports = router ;