const router = require('express').Router() ;
const {newOrder, Order, Orders, updateOrder, deleteOrder}  = require('../controller/order')
const access = require('../middleware/accessLoginRole')

router.post("/:id", access.allowIfLoggedin, newOrder) ;

router.get("/:adminId/:userId", access.allowIfLoggedin, access.grantRoleAccess('readAny', 'order'), Order)

router.get("/:adminId/:userId", access.allowIfLoggedin, access.grantRoleAccess('readAny', 'orders'),  Orders)

router.put("/:id/:userId", access.allowIfLoggedin, access.grantRoleAccess('updateOwn', 'order'), updateOrder)

router.delete("/:adminId/:userId", access.allowIfLoggedin, access.grantRoleAccess('deleteAny', 'order'), deleteOrder)

module.exports = router ;